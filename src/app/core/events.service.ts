import { Injectable, computed, signal } from '@angular/core';
import { DojoEvent, EVENTS } from './site-data';

const STORAGE_KEY = 'dojo-ldkpom.events.v1';

/**
 * Client-managed events/competitions state.
 *
 * Seeds from the published `EVENTS`, and lets the dojo owner announce new
 * events or remove existing ones. Persisted in `localStorage` for the demo;
 * replace `persist`/`load` with an API call to share events with all visitors.
 */
@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly eventsSignal = signal<readonly DojoEvent[]>(this.sorted(EVENTS));

  readonly events = this.eventsSignal.asReadonly();
  readonly upcoming = computed(() => this.eventsSignal().filter((event) => this.isUpcoming(event)));
  readonly next = computed(() => this.upcoming()[0] ?? null);

  constructor() {
    this.load();
  }

  /** Announce a new event. */
  add(input: Omit<DojoEvent, 'id'>): DojoEvent {
    const event: DojoEvent = {
      ...input,
      id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      published: true,
    };
    this.eventsSignal.update((events) => this.sorted([...events, event]));
    this.persist(this.eventsSignal());
    return event;
  }

  remove(id: string): void {
    this.eventsSignal.update((events) => events.filter((event) => event.id !== id));
    this.persist(this.eventsSignal());
  }

  /** Human-friendly countdown label, e.g. "en 12 días". */
  daysUntil(event: DojoEvent): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(`${event.date}T00:00:00`);
    return Math.round((target.getTime() - today.getTime()) / 86_400_000);
  }

  private isUpcoming(event: DojoEvent): boolean {
    return this.daysUntil(event) >= 0;
  }

  private sorted(events: readonly DojoEvent[]): readonly DojoEvent[] {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  }

  private load(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.every(isDojoEvent)) {
        this.eventsSignal.set(this.sorted(parsed));
      }
    } catch {
      // Corrupt storage — keep seeds.
    }
  }

  private persist(events: readonly DojoEvent[]): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // Quota exceeded — events stay in memory for this session only.
    }
  }
}

function isDojoEvent(value: unknown): value is DojoEvent {
  if (typeof value !== 'object' || value === null) return false;
  const event = value as Record<string, unknown>;
  return (
    typeof event['id'] === 'string' &&
    typeof event['title'] === 'string' &&
    typeof event['date'] === 'string' &&
    typeof event['kind'] === 'string'
  );
}

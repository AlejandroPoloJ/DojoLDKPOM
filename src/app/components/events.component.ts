import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { EventsService } from '../core/events.service';
import { DojoEvent, EventKind } from '../core/site-data';

const KIND_META: Record<EventKind, { label: string; icon: 'competition' | 'medal' | 'users' | 'star' | 'heart' }> = {
  competencia: { label: 'Competencia', icon: 'competition' },
  torneo: { label: 'Torneo', icon: 'star' },
  examen: { label: 'Examen de grado', icon: 'medal' },
  seminario: { label: 'Seminario', icon: 'users' },
  social: { label: 'Evento social', icon: 'heart' },
};

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="eventos" class="relative bg-ink-900 py-24 lg:py-32">
      <div class="dojo-container">
        <header class="mx-auto max-w-2xl text-center">
          <p class="eyebrow justify-center" appReveal>Agenda</p>
          <h2
            class="mt-5 font-display text-4xl leading-tight text-balance text-paper sm:text-5xl lg:text-6xl"
            appReveal
            [appReveal]="80"
          >
            Eventos y
            <span class="text-gold-400">competencias</span>
          </h2>
          <p class="mt-5 text-lg text-pretty text-muted" appReveal [appReveal]="140">
            Torneos, exámenes y seminarios del dojo. Enterate de las próximas fechas y reserva tu
            participación.
          </p>
        </header>

        <!-- Next event highlight -->
        @if (events.next(); as next) {
          <article
            class="card relative mt-12 overflow-hidden border-gold-400/40 p-7 sm:p-9"
            appReveal
            [appReveal]="180"
            aria-label="Próximo evento"
          >
            <div
              class="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-gold-500/20 blur-3xl"
              aria-hidden="true"
            ></div>
            <div class="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span
                  class="inline-flex items-center gap-2 rounded-full bg-gold-400 px-3 py-1 text-[0.68rem] font-bold tracking-wider text-ink-950 uppercase"
                >
                  <app-icon name="bell" [size]="14" />
                  Próximo evento
                </span>
                <h3 class="mt-4 font-display text-3xl leading-tight text-paper sm:text-4xl">
                  {{ next.title }}
                </h3>
                <p class="mt-3 max-w-2xl text-pretty text-muted">{{ next.description }}</p>
                <ul class="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/85">
                  <li class="inline-flex items-center gap-2">
                    <app-icon name="calendar" [size]="16" class="text-gold-400" />
                    {{ formatDate(next.date) }}
                  </li>
                  <li class="inline-flex items-center gap-2">
                    <app-icon name="clock" [size]="16" class="text-gold-400" />
                    {{ next.time }}
                  </li>
                  <li class="inline-flex items-center gap-2">
                    <app-icon name="pin" [size]="16" class="text-gold-400" />
                    {{ next.location }}
                  </li>
                </ul>
              </div>

              <div class="flex flex-col items-start gap-3 lg:items-end">
                <span class="font-display text-6xl leading-none text-gold-400">
                  {{ countdown(next) }}
                </span>
                @if (next.ctaLabel) {
                  <a [href]="next.ctaHref || '#contacto'" class="btn btn-accent">
                    {{ next.ctaLabel }}
                  </a>
                }
              </div>
            </div>
          </article>
        }

        <!-- Toolbar -->
        <div
          class="mt-10 flex flex-wrap items-center justify-between gap-4"
          appReveal
          [appReveal]="220"
        >
          <h3 class="font-display text-2xl tracking-wide text-paper">Próximas fechas</h3>
          <button
            type="button"
            class="btn btn-ghost !min-h-0 !px-4 !py-2.5 !text-sm"
            [attr.aria-expanded]="panelOpen()"
            aria-controls="event-panel"
            (click)="togglePanel()"
          >
            <app-icon name="plus" [size]="16" />
            Anunciar evento
          </button>
        </div>

        <!-- Announce panel (dojo owner) -->
        <div
          id="event-panel"
          class="overflow-hidden transition-[max-height,opacity] duration-300"
          [class.max-h-0]="!panelOpen()"
          [class.max-h-[52rem]]="panelOpen()"
          [class.opacity-0]="!panelOpen()"
          [class.opacity-100]="panelOpen()"
          [attr.aria-hidden]="!panelOpen()"
        >
          <form
            class="card mt-6 p-6 sm:p-7"
            [formGroup]="form"
            (ngSubmit)="submit()"
            novalidate
            [attr.inert]="!panelOpen() ? '' : null"
          >
            <h3 class="font-display text-2xl tracking-wide text-paper">Panel del dojo</h3>
            <p class="mt-1 text-sm text-muted">
              Publicá un evento o competencia. Se guarda en este navegador para la demo.
            </p>

            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label for="ev-title" class="mb-1.5 block text-sm font-semibold text-paper">
                  Título del evento
                </label>
                <input
                  id="ev-title"
                  type="text"
                  formControlName="title"
                  placeholder="Ej: Copa Metropolitana de Karate"
                  class="w-full rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 focus:border-gold-400"
                />
              </div>

              <div>
                <label for="ev-kind" class="mb-1.5 block text-sm font-semibold text-paper">
                  Tipo
                </label>
                <select
                  id="ev-kind"
                  formControlName="kind"
                  class="w-full cursor-pointer rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper focus:border-gold-400"
                >
                  @for (kind of kinds; track kind) {
                    <option [value]="kind">{{ kindLabel(kind) }}</option>
                  }
                </select>
              </div>

              <div>
                <label for="ev-date" class="mb-1.5 block text-sm font-semibold text-paper">
                  Fecha
                </label>
                <input
                  id="ev-date"
                  type="date"
                  formControlName="date"
                  class="w-full cursor-pointer rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper focus:border-gold-400"
                />
              </div>

              <div>
                <label for="ev-time" class="mb-1.5 block text-sm font-semibold text-paper">
                  Horario
                </label>
                <input
                  id="ev-time"
                  type="text"
                  formControlName="time"
                  placeholder="Ej: 09:00 a 18:00"
                  class="w-full rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 focus:border-gold-400"
                />
              </div>

              <div>
                <label for="ev-location" class="mb-1.5 block text-sm font-semibold text-paper">
                  Lugar
                </label>
                <input
                  id="ev-location"
                  type="text"
                  formControlName="location"
                  placeholder="Ej: Tatami principal"
                  class="w-full rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 focus:border-gold-400"
                />
              </div>

              <div class="sm:col-span-2">
                <label for="ev-desc" class="mb-1.5 block text-sm font-semibold text-paper">
                  Descripción
                </label>
                <textarea
                  id="ev-desc"
                  formControlName="description"
                  rows="3"
                  placeholder="Contá de qué se trata el evento..."
                  class="w-full resize-none rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 focus:border-gold-400"
                ></textarea>
              </div>

              <div>
                <label for="ev-cta" class="mb-1.5 block text-sm font-semibold text-paper">
                  Texto del botón <span class="font-normal text-muted">(opcional)</span>
                </label>
                <input
                  id="ev-cta"
                  type="text"
                  formControlName="ctaLabel"
                  placeholder="Ej: Inscribirme"
                  class="w-full rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 focus:border-gold-400"
                />
              </div>

              <div>
                <label for="ev-featured" class="mb-1.5 block text-sm font-semibold text-paper">
                  Destacado
                </label>
                <select
                  id="ev-featured"
                  formControlName="featured"
                  class="w-full cursor-pointer rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper focus:border-gold-400"
                >
                  <option value="no">No</option>
                  <option value="si">Sí, destacar en la agenda</option>
                </select>
              </div>
            </div>

            @if (error()) {
              <p class="mt-4 rounded-sm border border-blood-500/40 bg-blood-600/10 px-4 py-3 text-sm text-blood-400" role="alert">
                {{ error() }}
              </p>
            }

            <button type="submit" class="btn btn-accent mt-6 w-full sm:w-auto">
              <app-icon name="bell" [size]="18" />
              Publicar evento
            </button>
          </form>
        </div>

        <!-- Events grid -->
        @if (events.upcoming().length > 0) {
          <ul class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            @for (event of events.upcoming(); track event.id; let i = $index) {
              <li class="card group flex flex-col p-6" appReveal [appReveal]="(i % 3) * 90">
                <div class="flex items-start justify-between gap-3">
                  <span
                    class="inline-flex items-center gap-2 rounded-sm bg-ink-800 px-3 py-1.5 text-xs font-semibold text-gold-400"
                  >
                    <app-icon [name]="kindIcon(event.kind)" [size]="14" />
                    {{ kindLabel(event.kind) }}
                  </span>
                  <div class="text-right">
                    <span class="block font-display text-2xl leading-none text-paper">
                      {{ dayOf(event.date) }}
                    </span>
                    <span class="text-xs tracking-wide text-muted uppercase">
                      {{ monthOf(event.date) }}
                    </span>
                  </div>
                </div>

                <h4 class="mt-4 font-display text-2xl leading-tight text-paper">{{ event.title }}</h4>
                <p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{{ event.description }}</p>

                <ul class="mt-4 space-y-2 text-sm text-paper/80">
                  <li class="flex items-center gap-2.5">
                    <app-icon name="clock" [size]="15" class="text-muted" />
                    {{ event.time }}
                  </li>
                  <li class="flex items-center gap-2.5">
                    <app-icon name="pin" [size]="15" class="text-muted" />
                    <span class="truncate">{{ event.location }}</span>
                  </li>
                </ul>
              </li>
            }
          </ul>
        } @else {
          <p class="mt-14 rounded-sm border border-dashed border-white/15 py-16 text-center text-muted">
            No hay eventos próximos por ahora.
          </p>
        }
      </div>
    </section>
  `,
})
export class EventsComponent {
  protected readonly events = inject(EventsService);
  protected readonly kinds: readonly EventKind[] = [
    'competencia',
    'torneo',
    'examen',
    'seminario',
    'social',
  ];

  protected readonly panelOpen = signal(false);
  protected readonly error = signal('');

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    kind: this.fb.nonNullable.control<EventKind>('competencia'),
    date: ['', Validators.required],
    time: [''],
    location: [''],
    description: ['', Validators.required],
    ctaLabel: [''],
    featured: ['no'],
  });

  protected togglePanel(): void {
    this.panelOpen.update((open) => !open);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Completá al menos el título, la fecha y la descripción.');
      return;
    }

    const value = this.form.getRawValue();
    this.events.add({
      title: value.title.trim(),
      kind: value.kind,
      date: value.date,
      time: value.time.trim() || 'A confirmar',
      location: value.location.trim() || 'Dojo LDKPOM',
      description: value.description.trim(),
      ctaLabel: value.ctaLabel.trim() || undefined,
      ctaHref: value.ctaLabel.trim() ? '#contacto' : undefined,
      featured: value.featured === 'si',
      published: true,
    });

    this.form.reset({ kind: 'competencia', featured: 'no' });
    this.error.set('');
    this.panelOpen.set(false);
  }

  protected countdown(event: DojoEvent): string {
    const days = this.events.daysUntil(event);
    if (days === 0) return '¡Hoy!';
    if (days === 1) return '1 día';
    return `${days} días`;
  }

  protected kindLabel(kind: EventKind): string {
    return KIND_META[kind].label;
  }

  protected kindIcon(kind: EventKind): (typeof KIND_META)[EventKind]['icon'] {
    return KIND_META[kind].icon;
  }

  protected formatDate(iso: string): string {
    return new Date(`${iso}T00:00:00`).toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  protected dayOf(iso: string): string {
    return String(new Date(`${iso}T00:00:00`).getDate()).padStart(2, '0');
  }

  protected monthOf(iso: string): string {
    return new Date(`${iso}T00:00:00`)
      .toLocaleDateString('es-AR', { month: 'short' })
      .replace('.', '');
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { COACHES } from '../core/site-data';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="equipo" class="bg-ink-900 py-24 lg:py-32">
      <div class="dojo-container">
        <header class="mx-auto max-w-2xl text-center">
          <p class="eyebrow justify-center" appReveal>El Equipo</p>
          <h2
            class="mt-5 font-display text-4xl leading-tight text-balance text-paper sm:text-5xl lg:text-6xl"
            appReveal
            [appReveal]="80"
          >
            Maestros que
            <span class="text-gold-400">dejan huella</span>
          </h2>
          <p class="mt-5 text-lg text-pretty text-muted" appReveal [appReveal]="140">
            Un cuerpo de instructores certificados, con experiencia competitiva y vocación
            docente.
          </p>
        </header>

        <ul class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (coach of coaches; track coach.id; let i = $index) {
            <li class="card group overflow-hidden" appReveal [appReveal]="i * 100">
              <div
                class="relative flex h-44 items-center justify-center bg-gradient-to-br from-ink-800 to-ink-850"
              >
                <div
                  class="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style="background: radial-gradient(circle at 50% 120%, rgba(220,38,38,0.35), transparent 60%)"
                  aria-hidden="true"
                ></div>
                <span
                  class="relative grid h-24 w-24 place-items-center rounded-full border-2 border-white/10 bg-ink-900 font-display text-4xl text-paper"
                  aria-hidden="true"
                >
                  {{ coach.initials }}
                </span>
              </div>

              <div class="p-6">
                <h3 class="font-display text-2xl tracking-wide text-paper">{{ coach.name }}</h3>
                <p class="mt-1 text-sm font-semibold text-blood-400">{{ coach.role }}</p>
                <p
                  class="mt-3 inline-flex items-center gap-2 rounded-full bg-gold-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-gold-400"
                >
                  <app-icon name="medal" [size]="14" />
                  {{ coach.rank }}
                </p>
                <p class="mt-4 text-sm leading-relaxed text-muted">{{ coach.bio }}</p>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class CoachesComponent {
  protected readonly coaches = COACHES;
}

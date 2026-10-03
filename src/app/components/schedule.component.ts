import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { SCHEDULE } from '../core/site-data';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="horarios" class="border-t border-white/5 bg-ink-950 py-24 lg:py-32">
      <div class="dojo-container">
        <header class="mx-auto max-w-2xl text-center">
          <p class="eyebrow justify-center" appReveal>Horarios</p>
          <h2
            class="mt-5 font-display text-4xl leading-tight text-balance text-paper sm:text-5xl lg:text-6xl"
            appReveal
            [appReveal]="80"
          >
            Tu semana en el
            <span class="text-blood-500">tatami</span>
          </h2>
          <p class="mt-5 text-lg text-pretty text-muted" appReveal [appReveal]="140">
            Grilla de clases por día. Los cupos son limitados por grupo para garantizar la calidad
            de la enseñanza.
          </p>
        </header>

        <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          @for (item of schedule; track item.day; let i = $index) {
            <article
              class="card overflow-hidden"
              appReveal
              [appReveal]="(i % 3) * 90"
              [attr.aria-labelledby]="'day-' + item.day"
            >
              <h3
                [id]="'day-' + item.day"
                class="flex items-center gap-3 border-b border-white/10 bg-ink-800/60 px-6 py-4 font-display text-2xl tracking-wide text-paper"
              >
                <app-icon name="clock" [size]="18" class="text-gold-400" />
                {{ item.day }}
              </h3>
              <ul class="divide-y divide-white/5">
                @for (session of item.sessions; track session.time + session.program) {
                  <li class="flex items-center gap-4 px-6 py-4">
                    <span class="w-14 shrink-0 font-display text-xl text-gold-400">
                      {{ session.time }}
                    </span>
                    <span class="min-w-0">
                      <span class="block truncate text-sm font-semibold text-paper">
                        {{ session.program }}
                      </span>
                      <span class="block text-xs text-muted">Sensei {{ session.coach }}</span>
                    </span>
                  </li>
                }
              </ul>
            </article>
          }
        </div>

        <p
          class="mt-10 flex flex-wrap items-center justify-center gap-3 text-center text-sm text-muted"
          appReveal
        >
          <app-icon name="pin" [size]="18" class="text-blood-400" />
          Todos los entrenamientos se dictan en el tatami principal del dojo.
          <a
            href="#contacto"
            class="font-semibold text-gold-400 underline-offset-4 hover:underline"
          >
            Confirma tu cupo
          </a>
        </p>
      </div>
    </section>
  `,
})
export class ScheduleComponent {
  protected readonly schedule = SCHEDULE;
}

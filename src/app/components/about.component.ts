import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { DOJO, STATS, VALUES } from '../core/site-data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="dojo" class="relative border-t border-white/5 bg-ink-950 py-24 lg:py-32">
      <div class="dojo-container grid gap-14 lg:grid-cols-2 lg:gap-20">
        <!-- Narrative -->
        <div>
          <p class="eyebrow" appReveal>El Dojo</p>
          <h2
            class="mt-5 font-display text-4xl leading-tight text-balance text-paper sm:text-5xl lg:text-6xl"
            appReveal
            [appReveal]="80"
          >
            Más que un deporte,
            <span class="text-blood-500">un camino</span>
          </h2>

          <div class="mt-6 space-y-4 text-lg text-pretty text-muted" appReveal [appReveal]="160">
            <p>
              El {{ dojo.name }} nació en {{ dojo.founded }} con una idea simple: formar personas a
              través del Karate, no solo atletas. El tatami es el aula donde se aprende a
              levantarse, a respetar y a perseguir una meta con constancia.
            </p>
            <p>
              Nuestro método combina la tradición del <strong class="text-paper">Shotokan</strong>
              con una pedagogía moderna, grupos por edad y un seguimiento cercano de cada familia.
            </p>
          </div>

          <!-- Stats (mobile only — the hero shows them on large screens) -->
          <dl
            class="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 lg:hidden"
            appReveal
            [appReveal]="220"
          >
            @for (stat of stats; track stat.label) {
              <div>
                <dd class="font-display text-4xl text-gold-400">{{ stat.value }}</dd>
                <dt class="mt-1 text-sm text-muted">{{ stat.label }}</dt>
              </div>
            }
          </dl>
        </div>

        <!-- Values grid -->
        <ul class="grid gap-5 sm:grid-cols-2">
          @for (value of values; track value.title; let i = $index) {
            <li
              class="card group p-6 transition-colors duration-300 hover:border-blood-500/40"
              appReveal
              [appReveal]="i * 90"
            >
              <span
                class="grid h-12 w-12 place-items-center rounded-sm bg-blood-600/15 text-blood-400 transition-colors duration-300 group-hover:bg-blood-600 group-hover:text-white"
              >
                <app-icon [name]="value.icon" [size]="24" />
              </span>
              <h3 class="mt-5 font-display text-2xl tracking-wide text-paper">
                {{ value.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ value.description }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly dojo = DOJO;
  protected readonly stats = STATS;
  protected readonly values = VALUES;
}

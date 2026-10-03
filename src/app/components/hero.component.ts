import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { DOJO, STATS } from '../core/site-data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="inicio"
      class="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
      aria-labelledby="hero-title"
    >
      <!-- Background layers -->
      <div
        class="absolute inset-0 -z-20 bg-gradient-to-b from-ink-950 via-ink-950 to-ink-900"
        aria-hidden="true"
      ></div>
      <div
        class="absolute -top-40 -right-32 -z-10 h-[36rem] w-[36rem] rounded-full bg-blood-700/25 blur-[120px]"
        aria-hidden="true"
      ></div>
      <div
        class="absolute bottom-[-10rem] left-[-8rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-[130px]"
        aria-hidden="true"
      ></div>
      <div class="grain absolute inset-0 -z-10 opacity-40" aria-hidden="true"></div>
      <!-- Kanji watermark -->
      <span
        class="pointer-events-none absolute top-1/2 right-4 -z-10 -translate-y-1/2 font-display text-[32vw] leading-none text-white/[0.03] select-none lg:right-20 lg:text-[24rem]"
        aria-hidden="true"
        >空手</span
      >

      <div class="dojo-container grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <!-- Copy -->
        <div>
          <p class="eyebrow" appReveal>{{ dojo.style }}</p>

          <h1
            id="hero-title"
            class="mt-5 font-display text-5xl leading-[0.95] text-balance text-paper sm:text-6xl md:text-7xl xl:text-8xl"
            appReveal
            [appReveal]="80"
          >
            Forjamos cuerpo,
            <span class="text-blood-500">mente</span>
            y <span class="text-gold-400">carácter</span>
          </h1>

          <p class="mt-6 max-w-xl text-lg text-pretty text-muted" appReveal [appReveal]="160">
            Desde {{dojo.founded}}, el {{ dojo.name }} entrena Karate Shotokan con método, respeto y pasión.
            Clases para todas las edades, con instructor certificados y un ambiente donde cada
            alumno crece a su ritmo.
          </p>

          <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" appReveal [appReveal]="240">
            <a href="#contacto" class="btn btn-primary">
              Reserva tu clase de prueba
              <app-icon name="arrow-right" [size]="18" />
            </a>
            <a href="#programas" class="btn btn-ghost">Ver programas</a>
          </div>

          <!-- Mini trust row -->
          <ul
            class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
            appReveal
            [appReveal]="320"
          >
            @for (item of trust; track item) {
              <li class="inline-flex items-center gap-2">
                <app-icon name="check" [size]="16" class="text-gold-400" />
                {{ item }}
              </li>
            }
          </ul>
        </div>

        <!-- Visual card -->
        <div class="relative mx-auto w-full max-w-md" appReveal [appReveal]="200">
          <div class="card relative overflow-hidden p-7">
            <div
              class="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blood-600/30 blur-3xl"
              aria-hidden="true"
            ></div>

            <div class="relative flex items-center justify-between">
              <span class="eyebrow !text-gold-400">Dojo Life</span>
              <span class="inline-flex items-center gap-1 text-sm text-gold-400">
                <app-icon name="star" [size]="15" />
                4.9
              </span>
            </div>

            <p class="relative mt-6 font-display text-4xl leading-none text-paper">
              Disciplina que
              <br />
              se nota fuera
              <br />
              del tatami
            </p>

            <!-- Belt progression -->
            <div class="relative mt-8 space-y-3">
              @for (belt of belts; track belt.name) {
                <div class="flex items-center gap-3">
                  <span
                    class="h-3 w-10 shrink-0 rounded-full border-white border-2"
                    [style.background]="belt.color"
                    aria-hidden="true"
                  ></span>
                  <span class="text-sm font-medium text-paper/90">{{ belt.name }}</span>
                  <span class="ml-auto text-xs tracking-wider text-muted uppercase">
                    {{ belt.kyu }}
                  </span>
                </div>
              }
            </div>

            <div class="relative mt-8 border-t border-white/10 pt-6">
              <p class="text-sm text-muted">
                Empieza hoy sin experiencia previa.
                <span class="font-semibold text-paper">Primera clase sin cargo.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="dojo-container absolute inset-x-0 bottom-0 hidden pb-8 lg:block">
        <dl class="grid grid-cols-4 gap-6 border-t border-white/10 pt-6" appReveal>
          @for (stat of stats; track stat.label) {
            <div>
              <dt class="sr-only">{{ stat.label }}</dt>
              <dd class="font-display text-3xl text-paper">{{ stat.value }}</dd>
              <dd class="mt-1 text-xs tracking-wide text-muted uppercase">{{ stat.label }}</dd>
            </div>
          }
        </dl>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly dojo = DOJO;
  protected readonly stats = STATS;

  protected readonly trust = [
    'Instructores certificados',
    'Grupos por edad y nivel',
    'Ambiente familiar',
  ];

  protected readonly belts = [
    { name: 'Cinturón blanco', kyu: '9º Kyu', color: '#f6f6f5' },
    { name: 'Cinturón naranja', kyu: '7º Kyu', color: '#f97316' },
    { name: 'Cinturón verde', kyu: '5º Kyu', color: '#16a34a' },
    { name: 'Cinturón negro', kyu: '1º Dan', color: '#111113' },
  ];
}

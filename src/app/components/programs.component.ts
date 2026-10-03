import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { Program, PROGRAMS } from '../core/site-data';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="programas" class="relative bg-ink-900 py-24 lg:py-32">
      <div class="dojo-container">
        <header class="mx-auto max-w-2xl text-center">
          <p class="eyebrow justify-center" appReveal>Programas</p>
          <h2
            class="mt-5 font-display text-4xl leading-tight text-balance text-paper sm:text-5xl lg:text-6xl"
            appReveal
            [appReveal]="80"
          >
            Elige el camino que
            <span class="text-gold-400">te representa</span>
          </h2>
          <p class="mt-5 text-lg text-pretty text-muted" appReveal [appReveal]="140">
            Programas divididos por edad, nivel e interés. Todos incluyen una clase de prueba
            gratuita y acompañamiento personalizado.
          </p>
        </header>

        <ul class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (program of programs; track program.id; let i = $index) {
            <li
              class="card group flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blood-500/40"
              [class.ring-2]="program.featured"
              [class.ring-gold-400/60]="program.featured"
              appReveal
              [appReveal]="(i % 3) * 90"
            >
              <div class="flex items-start justify-between">
                <span
                  class="grid h-14 w-14 place-items-center rounded-sm bg-ink-800 text-blood-400 transition-colors duration-300 group-hover:bg-blood-600 group-hover:text-white"
                >
                  <app-icon [name]="program.icon" [size]="28" />
                </span>
                @if (program.featured) {
                  <span
                    class="rounded-full bg-gold-400 px-3 py-1 text-[0.68rem] font-bold tracking-wider text-ink-950 uppercase"
                  >
                    Más elegido
                  </span>
                }
              </div>

              <h3 class="mt-6 font-display text-3xl tracking-wide text-paper">
                {{ program.title }}
              </h3>
              <p class="mt-1 text-sm font-semibold tracking-wide text-gold-400 uppercase">
                {{ program.audience }}
              </p>
              <p class="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {{ program.description }}
              </p>

              <dl class="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
                <div class="flex items-center gap-2.5 text-paper/80">
                  <app-icon name="users" [size]="16" class="text-muted" />
                  <dt class="sr-only">Edad</dt>
                  <dd>{{ program.age }}</dd>
                </div>
                <div class="flex items-center gap-2.5 text-paper/80">
                  <app-icon name="clock" [size]="16" class="text-muted" />
                  <dt class="sr-only">Días</dt>
                  <dd>{{ program.schedule }}</dd>
                </div>
              </dl>

              <a
                href="#contacto"
                class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-paper transition-colors duration-200 hover:text-gold-400"
                [attr.aria-label]="'Consultar por el programa ' + program.title"
              >
                Consultar disponibilidad
                <app-icon name="arrow-right" [size]="16" />
              </a>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class ProgramsComponent {
  protected readonly programs: readonly Program[] = PROGRAMS;
}

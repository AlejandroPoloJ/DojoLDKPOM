import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { DOJO, NAV_LINKS, PROGRAMS } from '../core/site-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-white/10 bg-ink-950">
      <div class="dojo-container grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3">
            <span
              class="grid h-11 w-11 place-items-center rounded-sm bg-blood-600 font-display text-2xl leading-none text-white"
              aria-hidden="true"
            >
              LK
            </span>
            <span class="font-display text-2xl tracking-wide text-paper">{{ dojo.name }}</span>
          </div>
          <p class="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Escuela de {{ dojo.style }} fundada en {{ dojo.founded }}. Forjamos disciplina, respeto
            y carácter en cada generación.
          </p>
          <div class="mt-6 flex gap-3">
            <a
              href="https://www.instagram.com/karate.pomalca"
              target="_blank"
              rel="noopener"
              class="grid h-11 w-11 place-items-center rounded-sm border border-white/15 text-paper transition-colors hover:border-gold-400 hover:text-gold-400"
              aria-label="Instagram del dojo"
            >
              <app-icon name="instagram" [size]="20" />
            </a>
            <a
              href="https://www.facebook.com/Karate.pomalca/"
              target="_blank"
              rel="noopener"
              class="grid h-11 w-11 place-items-center rounded-sm border border-white/15 text-paper transition-colors hover:border-gold-400 hover:text-gold-400"
              aria-label="Facebook del dojo"
            >
              <app-icon name="facebook" [size]="20" />
            </a>
          </div>
        </div>

        <!-- Nav -->
        <nav aria-label="Enlaces del sitio">
          <h3 class="text-sm font-bold tracking-wider text-paper uppercase">Navegación</h3>
          <ul class="mt-4 space-y-3">
            @for (link of links; track link.href) {
              <li>
                <a
                  [href]="link.href"
                  class="text-sm text-muted transition-colors hover:text-gold-400"
                >
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- Programs -->
        <nav aria-label="Programas">
          <h3 class="text-sm font-bold tracking-wider text-paper uppercase">Programas</h3>
          <ul class="mt-4 space-y-3">
            @for (program of programs; track program.id) {
              <li>
                <a
                  href="#programas"
                  class="text-sm text-muted transition-colors hover:text-gold-400"
                >
                  {{ program.title }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-bold tracking-wider text-paper uppercase">Contacto</h3>
          <ul class="mt-4 space-y-3 text-sm text-muted">
            <li class="flex items-start gap-2.5">
              <app-icon name="pin" [size]="16" class="mt-0.5 shrink-0 text-blood-400" />
              {{ dojo.address }}
            </li>
            <li>
              <a [href]="dojo.phoneHref" class="flex items-center gap-2.5 hover:text-gold-400">
                <app-icon name="phone" [size]="16" class="shrink-0 text-blood-400" />
                {{ dojo.phone }}
              </a>
            </li>
            <li>
              <a [href]="dojo.emailHref" class="flex items-center gap-2.5 hover:text-gold-400">
                <app-icon name="mail" [size]="16" class="shrink-0 text-blood-400" />
                {{ dojo.email }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10">
        <div
          class="dojo-container flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted sm:flex-row"
        >
          <p>© {{ year }} {{ dojo.name }}. Todos los derechos reservados.</p>
          <p class="flex items-center gap-2">
            <span class="font-display tracking-widest text-gold-400">押忍 · OSS</span>
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly dojo = DOJO;
  protected readonly links = NAV_LINKS;
  protected readonly programs = PROGRAMS;
  protected readonly year = new Date().getFullYear();
}

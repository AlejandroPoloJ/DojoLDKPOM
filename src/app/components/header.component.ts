import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { DOJO, NAV_LINKS } from '../core/site-data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      [class.bg-ink-950/90]="scrolled()"
      [class.backdrop-blur-md]="scrolled()"
      [class.border-b]="scrolled()"
      [class.border-white/10]="scrolled()"
      [class.py-2]="scrolled()"
      [class.py-3.5]="!scrolled()"
    >
      <nav
        class="dojo-container flex items-center justify-between gap-4"
        aria-label="Navegación principal"
      >
        <!-- Brand -->
        <a
          href="#inicio"
          class="group flex items-center gap-3"
          aria-label="Dojo LDKPOM — inicio"
        >
          <span
            class="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-blood-600 font-display text-2xl leading-none text-white shadow-lg shadow-blood-600/30 transition-transform duration-200 group-hover:scale-105"
            aria-hidden="true"
          >
            LK
          </span>
          <span class="flex flex-col leading-none">
            <span class="font-display text-xl tracking-wide text-paper">{{ dojo.name }}</span>
            <span class="text-[0.68rem] font-semibold tracking-[0.2em] text-gold-400 uppercase">
              {{ dojo.style }}
            </span>
          </span>
        </a>

        <!-- Desktop links -->
        <ul class="hidden items-center gap-1 lg:flex">
          @for (link of links; track link.href) {
            <li>
              <a
                [href]="link.href"
                class="rounded-sm px-3.5 py-2 text-sm font-semibold text-paper/80 transition-colors duration-200 hover:bg-white/5 hover:text-paper"
              >
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <!-- Desktop CTA -->
        <div class="hidden items-center gap-3 lg:flex">
          <a
            [href]="dojo.phoneHref"
            class="btn btn-ghost !min-h-0 !px-4 !py-2.5 !text-sm xl:inline-flex hidden"
          >
            <app-icon name="phone" [size]="16" />
            {{ dojo.phone }}
          </a>
          <a href="#contacto" class="btn btn-accent !min-h-0 !px-5 !py-2.5 !text-sm">
            Clase de prueba
          </a>
        </div>

        <!-- Mobile toggle -->
        <button
          type="button"
          class="grid h-11 w-11 cursor-pointer place-items-center rounded-sm border border-white/15 text-paper transition-colors duration-200 hover:bg-white/10 lg:hidden"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          [attr.aria-label]="menuOpen() ? 'Cerrar menú' : 'Abrir menú'"
          (click)="toggleMenu()"
        >
          <app-icon [name]="menuOpen() ? 'close' : 'menu'" [size]="22" />
        </button>
      </nav>

      <!-- Mobile panel -->
      <div
        id="mobile-menu"
        class="overflow-hidden bg-ink-950/98 backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden"
        [class.max-h-0]="!menuOpen()"
        [class.max-h-[32rem]]="menuOpen()"
        [class.opacity-0]="!menuOpen()"
        [class.opacity-100]="menuOpen()"
        [attr.aria-hidden]="!menuOpen()"
      >
        <ul class="dojo-container flex flex-col gap-1 py-4">
          @for (link of links; track link.href) {
            <li>
              <a
                [href]="link.href"
                class="block rounded-sm px-3 py-3 text-base font-semibold text-paper/90 transition-colors hover:bg-white/5 hover:text-paper"
                (click)="closeMenu()"
              >
                {{ link.label }}
              </a>
            </li>
          }
          <li class="mt-3 flex flex-col gap-3">
            <a href="#contacto" class="btn btn-accent w-full" (click)="closeMenu()">
              Reservar clase de prueba
            </a>
            <a [href]="dojo.phoneHref" class="btn btn-ghost w-full">
              <app-icon name="phone" [size]="16" />
              {{ dojo.phone }}
            </a>
          </li>
        </ul>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly dojo = DOJO;
  protected readonly links = NAV_LINKS;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}

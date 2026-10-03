import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { FAQS } from '../core/site-data';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="faq" class="border-t border-white/5 bg-ink-900 py-24 lg:py-32">
      <div class="dojo-container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <!-- Intro -->
        <div>
          <p class="eyebrow" appReveal>Preguntas frecuentes</p>
          <h2
            class="mt-5 font-display text-4xl leading-tight text-balance text-paper sm:text-5xl"
            appReveal
            [appReveal]="80"
          >
            Todo lo que
            <span class="text-gold-400">necesitas saber</span>
          </h2>
          <p class="mt-5 text-lg text-pretty text-muted" appReveal [appReveal]="140">
            Si tu duda no está acá, escríbenos y te respondemos a la brevedad.
          </p>
          <a href="#contacto" class="btn btn-ghost mt-7" appReveal [appReveal]="200">
            Hacer una consulta
            <app-icon name="arrow-right" [size]="18" />
          </a>
        </div>

        <!-- Accordion -->
        <ul class="divide-y divide-white/10 border-y border-white/10">
          @for (faq of faqs; track faq.id; let i = $index) {
            <li appReveal [appReveal]="i * 60">
              <h3>
                <button
                  type="button"
                  class="flex w-full cursor-pointer items-center gap-4 py-5 text-left transition-colors duration-200 hover:text-gold-400"
                  [attr.aria-expanded]="isOpen(faq.id)"
                  [attr.aria-controls]="'panel-' + faq.id"
                  [id]="'trigger-' + faq.id"
                  (click)="toggle(faq.id)"
                >
                  <span class="flex-1 text-lg font-semibold text-paper">{{ faq.question }}</span>
                  <span
                    class="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-paper transition-transform duration-300"
                    [class.rotate-180]="isOpen(faq.id)"
                    aria-hidden="true"
                  >
                    <app-icon name="chevron-down" [size]="18" />
                  </span>
                </button>
              </h3>
              <div
                [id]="'panel-' + faq.id"
                role="region"
                [attr.aria-labelledby]="'trigger-' + faq.id"
                [attr.hidden]="!isOpen(faq.id) ? true : null"
                class="overflow-hidden"
              >
                <p class="pb-6 pr-12 text-pretty text-muted">{{ faq.answer }}</p>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class FaqComponent {
  protected readonly faqs = FAQS;
  private readonly openId = signal<string | null>(FAQS[0]?.id ?? null);

  protected isOpen(id: string): boolean {
    return this.openId() === id;
  }

  protected toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}

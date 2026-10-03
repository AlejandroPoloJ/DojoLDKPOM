import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { TESTIMONIALS } from '../core/site-data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="border-t border-white/5 bg-ink-950 py-24 lg:py-32" aria-labelledby="testi-title">
      <div class="dojo-container">
        <header class="mx-auto max-w-2xl text-center">
          <p class="eyebrow justify-center" appReveal>Testimonios</p>
          <h2
            id="testi-title"
            class="mt-5 font-display text-4xl leading-tight text-balance text-paper sm:text-5xl lg:text-6xl"
            appReveal
            [appReveal]="80"
          >
            Familias que ya
            <span class="text-blood-500">son parte</span>
          </h2>
        </header>

        <ul class="mt-14 grid gap-6 lg:grid-cols-3">
          @for (testimonial of testimonials; track testimonial.id; let i = $index) {
            <li class="card flex flex-col p-7" appReveal [appReveal]="i * 100">
              <div class="flex gap-0.5 text-gold-400" role="img" aria-label="5 de 5 estrellas">
                @for (star of [1, 2, 3, 4, 5]; track star) {
                  <app-icon name="star" [size]="16" />
                }
              </div>
              <blockquote class="mt-5 flex-1 text-pretty text-paper/90">
                “{{ testimonial.quote }}”
              </blockquote>
              <footer class="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span
                  class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blood-600/20 font-display text-lg text-blood-400"
                  aria-hidden="true"
                >
                  {{ initials(testimonial.author) }}
                </span>
                <span>
                  <cite class="block text-sm font-semibold not-italic text-paper">
                    {{ testimonial.author }}
                  </cite>
                  <span class="block text-xs text-muted">{{ testimonial.relation }}</span>
                </span>
              </footer>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class TestimonialsComponent {
  protected readonly testimonials = TESTIMONIALS;

  protected initials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('');
  }
}

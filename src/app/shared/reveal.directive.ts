import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';

/**
 * Adds a scroll-reveal animation to the host element.
 * The delay (ms) can be passed as the directive value: `[appReveal]="120"`.
 * Honors `prefers-reduced-motion` via CSS, requires no external library and
 * runs its DOM work in `afterNextRender` so SSR/pre-render stays safe.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  /**
   * Stagger delay in milliseconds. Accepts both `[appReveal]="120"` and the
   * bare boolean form `appReveal` (which Angular passes as an empty string).
   */
  readonly delay = input<number | string>(0, { alias: 'appReveal' });

  private readonly stagger = () => {
    const value = Number(this.delay());
    return Number.isFinite(value) ? value : 0;
  };

  constructor() {
    afterNextRender(() => {
      const node = this.host.nativeElement;
      node.classList.add('reveal');

      // Graceful fallback when IntersectionObserver is unavailable.
      if (typeof IntersectionObserver === 'undefined') {
        node.classList.add('is-visible');
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            window.setTimeout(() => node.classList.add('is-visible'), this.stagger());
            this.observer?.unobserve(node);
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
      );

      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { GALLERY, GALLERY_CATEGORIES } from '../core/site-data';
import { GalleryCategory, GalleryPhoto } from '../core/site-data';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="galeria" class="border-t border-white/5 bg-ink-950 py-24 lg:py-32">
      <div class="dojo-container">
        <header class="mx-auto max-w-2xl text-center">
          <p class="eyebrow justify-center" appReveal>Galería</p>
          <h2
            class="mt-5 font-display text-4xl leading-tight text-balance text-paper sm:text-5xl lg:text-6xl"
            appReveal
            [appReveal]="80"
          >
            La vida del
            <span class="text-blood-500">dojo en imágenes</span>
          </h2>
          <p class="mt-5 text-lg text-pretty text-muted" appReveal [appReveal]="140">
            Clases, torneos, exámenes y eventos. Un recorrido por los momentos que hacen a
            nuestra historia.
          </p>
        </header>

        <!-- Filters -->
        <div
          class="mt-10 flex flex-wrap items-center justify-between gap-4"
          appReveal
          [appReveal]="180"
        >
          <div class="flex flex-wrap gap-2" role="group" aria-label="Filtrar galería por categoría">
            @for (category of categories; track category.id) {
              <button
                type="button"
                class="cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200"
                [class.border-gold-400]="activeCategory() === category.id"
                [class.bg-gold-400]="activeCategory() === category.id"
                [class.text-ink-950]="activeCategory() === category.id"
                [class.border-white/15]="activeCategory() !== category.id"
                [class.text-paper/80]="activeCategory() !== category.id"
                [class.hover:border-white/40]="activeCategory() !== category.id"
                [attr.aria-pressed]="activeCategory() === category.id"
                (click)="setCategory(category.id)"
              >
                {{ category.label }}
              </button>
            }
          </div>
        </div>

        <!-- Grid -->
        @if (filtered().length > 0) {
          <ul class="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            @for (photo of filtered(); track photo.id; let i = $index) {
              <li class="break-inside-avoid" appReveal [appReveal]="(i % 3) * 80">
                <figure class="group card relative overflow-hidden">
                  <button
                    type="button"
                    class="block w-full cursor-zoom-in"
                    (click)="openLightbox(photo)"
                    [attr.aria-label]="'Ampliar foto: ' + photo.alt"
                  >
                    <img
                      [src]="photo.src"
                      [alt]="photo.alt"
                      loading="lazy"
                      decoding="async"
                      class="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      class="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    ></span>
                    <span
                      class="absolute bottom-3 left-4 text-xs font-semibold tracking-wide text-paper uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      {{ categoryLabel(photo.category) }}
                    </span>
                  </button>
                </figure>
              </li>
            }
          </ul>
        } @else {
          <p class="mt-14 rounded-sm border border-dashed border-white/15 py-16 text-center text-muted">
            Todavía no hay fotos en esta categoría.
          </p>
        }
      </div>

      <!-- Lightbox -->
      @if (lightboxPhoto(); as photo) {
        <div
          class="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de foto"
          (click)="closeLightbox()"
        >
          <button
            type="button"
            class="absolute top-5 right-5 grid h-11 w-11 cursor-pointer place-items-center rounded-sm border border-white/20 text-paper transition-colors hover:bg-white/10"
            aria-label="Cerrar visor"
            (click)="closeLightbox()"
          >
            <app-icon name="close" [size]="22" />
          </button>

          <figure class="max-h-[85vh] max-w-4xl" (click)="$event.stopPropagation()">
            <img
              [src]="photo.src"
              [alt]="photo.alt"
              class="max-h-[75vh] w-auto rounded-sm object-contain"
            />
            <figcaption class="mt-4 text-center text-sm text-muted">
              {{ photo.alt }}
              <span class="text-gold-400"> · {{ categoryLabel(photo.category) }}</span>
            </figcaption>
          </figure>

          <button
            type="button"
            class="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-sm border border-white/20 text-paper transition-colors hover:bg-white/10"
            aria-label="Foto anterior"
            (click)="step(-1); $event.stopPropagation()"
          >
            <app-icon name="arrow-right" [size]="22" class="rotate-180" />
          </button>
          <button
            type="button"
            class="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-sm border border-white/20 text-paper transition-colors hover:bg-white/10"
            aria-label="Foto siguiente"
            (click)="step(1); $event.stopPropagation()"
          >
            <app-icon name="arrow-right" [size]="22" />
          </button>
        </div>
      }
    </section>
  `,
  host: {
    '(document:keydown.escape)': 'closeLightbox()',
    '(document:keydown.arrowleft)': 'onArrow(-1)',
    '(document:keydown.arrowright)': 'onArrow(1)',
  },
})
export class GalleryComponent {
  protected readonly categories = GALLERY_CATEGORIES;

  protected readonly activeCategory = signal<GalleryCategory | 'todas'>('todas');
  protected readonly lightboxPhoto = signal<GalleryPhoto | null>(null);

  protected readonly filtered = computed(() => {
    const category = this.activeCategory();
    return category === 'todas' ? GALLERY : GALLERY.filter((p) => p.category === category);
  });

  protected setCategory(category: GalleryCategory | 'todas'): void {
    this.activeCategory.set(category);
  }

  protected categoryLabel(category: GalleryCategory): string {
    return this.categories.find((c) => c.id === category)?.label ?? category;
  }

  protected openLightbox(photo: GalleryPhoto): void {
    this.lightboxPhoto.set(photo);
  }

  protected closeLightbox(): void {
    this.lightboxPhoto.set(null);
  }

  protected onArrow(direction: -1 | 1): void {
    if (this.lightboxPhoto()) this.step(direction);
  }

  protected step(direction: -1 | 1): void {
    const photos = this.filtered();
    const current = this.lightboxPhoto();
    if (!current || photos.length === 0) return;
    const index = photos.findIndex((p) => p.id === current.id);
    const next = (index + direction + photos.length) % photos.length;
    this.lightboxPhoto.set(photos[next]);
  }
}

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { DOJO, PROGRAMS } from '../core/site-data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contacto" class="relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <div
        class="absolute -top-32 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-blood-700/20 blur-[130px]"
        aria-hidden="true"
      ></div>

      <div class="dojo-container relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <!-- Info -->
        <div>
          <p class="eyebrow" appReveal>Contacto</p>
          <h2
            class="mt-5 font-display text-4xl leading-tight text-balance text-paper sm:text-5xl lg:text-6xl"
            appReveal
            [appReveal]="80"
          >
            Reserva tu
            <span class="text-blood-500">clase de prueba</span>
          </h2>
          <p class="mt-5 max-w-md text-lg text-pretty text-muted" appReveal [appReveal]="140">
            Completa el formulario y coordinamos tu primera clase sin cargo. También puedes
            escribirnos directamente por WhatsApp.
          </p>

          <ul class="mt-10 space-y-5" appReveal [appReveal]="200">
            <li>
              <a
                [href]="dojo.phoneHref"
                class="group flex items-center gap-4 text-paper transition-colors hover:text-gold-400"
              >
                <span
                  class="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-ink-800 text-blood-400 transition-colors group-hover:bg-blood-600 group-hover:text-white"
                >
                  <app-icon name="phone" [size]="20" />
                </span>
                <span>
                  <span class="block text-xs tracking-wider text-muted uppercase">Teléfono</span>
                  <span class="font-semibold">{{ dojo.phone }}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                [href]="dojo.emailHref"
                class="group flex items-center gap-4 text-paper transition-colors hover:text-gold-400"
              >
                <span
                  class="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-ink-800 text-blood-400 transition-colors group-hover:bg-blood-600 group-hover:text-white"
                >
                  <app-icon name="mail" [size]="20" />
                </span>
                <span>
                  <span class="block text-xs tracking-wider text-muted uppercase">Email</span>
                  <span class="font-semibold">{{ dojo.email }}</span>
                </span>
              </a>
            </li>
            <li class="flex items-center gap-4 text-paper">
              <span
                class="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-ink-800 text-blood-400"
              >
                <app-icon name="pin" [size]="20" />
              </span>
              <span>
                <span class="block text-xs tracking-wider text-muted uppercase">Dirección</span>
                <span class="font-semibold">{{ dojo.address }}</span>
              </span>
            </li>
          </ul>

          <a
            href="https://wa.me/51960105319"
            target="_blank"
            rel="noopener"
            class="btn btn-accent mt-8"
            appReveal
            [appReveal]="260"
          >
            <app-icon name="whatsapp" [size]="18" />
            Escribir por WhatsApp
          </a>
        </div>

        <!-- Form -->
        <div class="card p-7 sm:p-9" appReveal [appReveal]="160">
          @if (sent()) {
            <div class="flex flex-col items-center py-10 text-center" role="status">
              <span
                class="grid h-16 w-16 place-items-center rounded-full bg-gold-400 text-ink-950"
              >
                <app-icon name="check" [size]="32" />
              </span>
              <h3 class="mt-5 font-display text-3xl text-paper">¡Consulta enviada!</h3>
              <p class="mt-2 max-w-sm text-muted">
                Gracias {{ form.controls.name.value }}. Te vamos a contactar dentro de las próximas
                24 horas para coordinar tu clase de prueba.
              </p>
              <button type="button" class="btn btn-ghost mt-6" (click)="reset()">
                Enviar otra consulta
              </button>
            </div>
          } @else {
            <h3 class="font-display text-3xl tracking-wide text-paper">Formulario de inscripción</h3>
            <p class="mt-1 text-sm text-muted">Todos los campos marcados son obligatorios.</p>

            <form class="mt-7 space-y-5" [formGroup]="form" (ngSubmit)="submit()" novalidate>
              <!-- Nombre -->
              <div>
                <label for="name" class="mb-1.5 block text-sm font-semibold text-paper">
                  Nombre y apellido
                </label>
                <input
                  id="name"
                  type="text"
                  formControlName="name"
                  autocomplete="name"
                  placeholder="Ej: Ana Martínez"
                  class="w-full rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 transition-colors focus:border-gold-400"
                  [attr.aria-invalid]="invalid('name')"
                  [attr.aria-describedby]="invalid('name') ? 'err-name' : null"
                />
                @if (invalid('name')) {
                  <p id="err-name" class="mt-1.5 text-sm text-blood-400">
                    Ingresá tu nombre completo.
                  </p>
                }
              </div>

              <!-- Email / Teléfono -->
              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="email" class="mb-1.5 block text-sm font-semibold text-paper">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    autocomplete="email"
                    placeholder="ana@email.com"
                    class="w-full rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 transition-colors focus:border-gold-400"
                    [attr.aria-invalid]="invalid('email')"
                    [attr.aria-describedby]="invalid('email') ? 'err-email' : null"
                  />
                  @if (invalid('email')) {
                    <p id="err-email" class="mt-1.5 text-sm text-blood-400">
                      Ingresa un email válido.
                    </p>
                  }
                </div>
                <div>
                  <label for="phone" class="mb-1.5 block text-sm font-semibold text-paper">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    formControlName="phone"
                    autocomplete="tel"
                    placeholder="999 000 111"
                    class="w-full rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 transition-colors focus:border-gold-400"
                  />
                </div>
              </div>

              <!-- Programa -->
              <div>
                <label for="program" class="mb-1.5 block text-sm font-semibold text-paper">
                  Programa de interés
                </label>
                <select
                  id="program"
                  formControlName="program"
                  class="w-full cursor-pointer rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper transition-colors focus:border-gold-400"
                  [attr.aria-invalid]="invalid('program')"
                  [attr.aria-describedby]="invalid('program') ? 'err-program' : null"
                >
                  <option value="" disabled>Selecciona una opción</option>
                  @for (program of programs; track program.id) {
                    <option [value]="program.title">{{ program.title }}</option>
                  }
                  <option value="Aún no lo sé">Aún no lo sé</option>
                </select>
                @if (invalid('program')) {
                  <p id="err-program" class="mt-1.5 text-sm text-blood-400">
                    Elige un programa.
                  </p>
                }
              </div>

              <!-- Mensaje -->
              <div>
                <label for="message" class="mb-1.5 block text-sm font-semibold text-paper">
                  Mensaje <span class="font-normal text-muted">(opcional)</span>
                </label>
                <textarea
                  id="message"
                  formControlName="message"
                  rows="3"
                  placeholder="Cuéntanos tu experiencia o consulta..."
                  class="w-full resize-none rounded-sm border border-white/15 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 transition-colors focus:border-gold-400"
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-full">
                Enviar consulta
                <app-icon name="arrow-right" [size]="18" />
              </button>
            </form>
          }
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected readonly dojo = DOJO;
  protected readonly programs = PROGRAMS;
  protected readonly sent = signal(false);

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    phone: this.fb.nonNullable.control(''),
    program: this.fb.nonNullable.control('', Validators.required),
    message: this.fb.nonNullable.control(''),
  });

  protected invalid(controlName: 'name' | 'email' | 'program'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Demo: no backend. In a real app, send `form.getRawValue()` to an API.
    this.sent.set(true);
  }

  protected reset(): void {
    this.form.reset();
    this.sent.set(false);
  }
}

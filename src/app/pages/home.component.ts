import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../components/header.component';
import { HeroComponent } from '../components/hero.component';
import { AboutComponent } from '../components/about.component';
import { ProgramsComponent } from '../components/programs.component';
import { ScheduleComponent } from '../components/schedule.component';
import { EventsComponent } from '../components/events.component';
import { GalleryComponent } from '../components/gallery.component';
import { CoachesComponent } from '../components/coaches.component';
import { TestimonialsComponent } from '../components/testimonials.component';
import { FaqComponent } from '../components/faq.component';
import { ContactComponent } from '../components/contact.component';
import { FooterComponent } from '../components/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ProgramsComponent,
    ScheduleComponent,
    EventsComponent,
    GalleryComponent,
    TestimonialsComponent,
    FaqComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-header />
    <main id="contenido">
      <app-hero />
      <app-about />
      <app-programs />
      <app-schedule />
      <app-events />
      <app-gallery />
      <!-- <app-coaches /> -->
      <app-testimonials />
      <app-faq />
      <app-contact />
    </main>
    <app-footer />
  `,
})
export class HomeComponent {}

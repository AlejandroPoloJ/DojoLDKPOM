import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'child'
  | 'youth'
  | 'adult'
  | 'combat'
  | 'kata'
  | 'competition'
  | 'shield'
  | 'heart'
  | 'target'
  | 'medal'
  | 'menu'
  | 'close'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'whatsapp'
  | 'arrow-right'
  | 'check'
  | 'chevron-down'
  | 'clock'
  | 'users'
  | 'star'
  | 'instagram'
  | 'facebook'
  | 'upload'
  | 'trash'
  | 'plus'
  | 'calendar'
  | 'bell'
  | 'image';

/**
 * Lightweight inline-SVG icon set (stroke-based, currentColor aware).
 * No icon font, no emoji, no runtime dependency — accessible by default:
 * icons are decorative (`aria-hidden`) unless a `label` is provided.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex' },
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.aria-hidden]="label() ? null : 'true'"
      [attr.aria-label]="label() || null"
      [attr.role]="label() ? 'img' : null"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      @switch (name()) {
        @case ('child') {
          <circle cx="12" cy="7" r="3" />
          <path d="M6 21v-3a6 6 0 0 1 12 0v3M9 13.5 7 21m8-7.5L17 21" />
        }
        @case ('youth') {
          <circle cx="12" cy="6" r="3" />
          <path d="M5 21l3-7 4 2 4-2 3 7M8 14V9m8 5V9" />
        }
        @case ('adult') {
          <circle cx="12" cy="5" r="3" />
          <path d="M12 8v6m0 0-4 7m4-7 4 7M5 11h14" />
        }
        @case ('combat') {
          <path d="M14.5 3.5 20 9l-2 2-6.5-6.5a1.8 1.8 0 0 0-2.5 2.5L15.5 14 14 15.5 3.5 5 5 3.5z" />
          <path d="m9 18 3 3M4 21l3-3M18 15l3 3" />
        }
        @case ('kata') {
          <path d="M12 3v4m0 0-3 4 3 3 3-3zM9 21l3-7 3 7M7 9l-4 3m14-3 4 3" />
        }
        @case ('competition') {
          <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0z" />
          <path d="M7 5H4v2a3 3 0 0 0 3 3m10-5h3v2a3 3 0 0 1-3 3" />
        }
        @case ('shield') {
          <path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6z" />
          <path d="m9 12 2 2 4-4" />
        }
        @case ('heart') {
          <path
            d="M12 20s-7-4.3-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 3.5C19 15.7 12 20 12 20z"
          />
        }
        @case ('target') {
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
        }
        @case ('medal') {
          <path d="M8 3 5 9m11-6 3 6M8 3h8" />
          <circle cx="12" cy="15" r="5" />
          <path d="m12 13 .9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2L9 15.1l2-.3z" />
        }
        @case ('menu') {
          <path d="M4 6h16M4 12h16M4 18h16" />
        }
        @case ('close') {
          <path d="M6 6l12 12M18 6 6 18" />
        }
        @case ('phone') {
          <path
            d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z"
          />
        }
        @case ('mail') {
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3.5 7 8.5 6 8.5-6" />
        }
        @case ('pin') {
          <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        }
        @case ('whatsapp') {
          <path
            d="M4 20l1.4-4A8 8 0 1 1 8 18.6z"
          />
          <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-.5l-1.5-1.5-1.2.6a5 5 0 0 1-2.4-2.4l.6-1.2L9.5 9s-.5.4-.5.5z" />
        }
        @case ('arrow-right') {
          <path d="M5 12h14M13 6l6 6-6 6" />
        }
        @case ('check') {
          <path d="m5 12.5 4.5 4.5L19 7" />
        }
        @case ('chevron-down') {
          <path d="m6 9 6 6 6-6" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        }
        @case ('users') {
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0M16 5.2a3 3 0 0 1 0 5.6m1 3.2a6 6 0 0 1 4 6" />
        }
        @case ('star') {
          <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z" />
        }
        @case ('instagram') {
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
        }
        @case ('facebook') {
          <path d="M14 8h2.5V4.5H14A4 4 0 0 0 10 8.5V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V9a1 1 0 0 1 1-1z" />
        }
        @case ('upload') {
          <path d="M12 15V4m0 0L8 8m4-4 4 4" />
          <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        }
        @case ('trash') {
          <path d="M4 7h16M9 7V4h6v3m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
          <path d="M10 11v6m4-6v6" />
        }
        @case ('plus') {
          <path d="M12 5v14M5 12h14" />
        }
        @case ('calendar') {
          <rect x="3.5" y="5" width="17" height="16" rx="2" />
          <path d="M3.5 10h17M8 3v4m8-4v4" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
        }
        @case ('bell') {
          <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
          <path d="M10.5 20a2 2 0 0 0 3 0" />
        }
        @case ('image') {
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="m4 17 5-5 4 4 3-3 4 4" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(24);
  /** When set, the icon becomes meaningful (role="img" + aria-label). */
  readonly label = input<string>('');
}

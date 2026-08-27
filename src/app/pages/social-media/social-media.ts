import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SocialPlatform {
  name: string;
  username: string;
  description: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-media.html',
  styleUrl: './social-media.css',
})
export class SocialMedia implements AfterViewInit, OnDestroy {
// ============================================================
// REPLACE THESE WITH THE OFFICIAL PROFILE URLS
// ============================================================
facebookUrl = 'https://www.facebook.com/people/The-Legend-Achyuta-Samanta/61573749980217/';
instagramUrl = 'https://www.instagram.com/the_legend_achyutasamanta/';

 facebook: SocialPlatform = {
  name: 'FACEBOOK',
  username: 'The_Legend_Achyutasamanta',
  description: 'Official Facebook presence',
  url: this.facebookUrl,
  icon: 'f',
};

instagram: SocialPlatform = {
  name: 'INSTAGRAM',
  username: 'The_Legend_Achyutasamanta',
  description: 'Official Instagram presence',
  url: this.instagramUrl,
  icon: '\u25CB',
};

  // Facebook Page Plugin embed — official, no SDK required.
  // Built only if a real facebookUrl has been provided (not the placeholder).
  facebookEmbedUrl: SafeResourceUrl | null = null;
  facebookEmbedFailed = signal(false);

  // Instagram has no public no-auth embed for a scrollable feed
  // (requires Meta Graph API + access token + backend).
  // This stays as a graceful fallback until that integration is added.
  instagramEmbedAvailable = signal(false);

  prefersReducedMotion = false;

  private ctx?: gsap.Context;

  constructor(private el: ElementRef<HTMLElement>, private sanitizer: DomSanitizer) {}

  ngAfterViewInit(): void {
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    this.buildFacebookEmbed();

    this.ctx = gsap.context(() => {
      if (this.prefersReducedMotion) {
        gsap.set(
          '.sm-eyebrow, .sm-heading, .sm-subtitle, .sm-card',
          { opacity: 1, y: 0 }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.social-media-section',
          start: 'top 70%',
        },
      });

      tl.fromTo('.sm-eyebrow', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo('.sm-heading', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo('.sm-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo(
          '.sm-card',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
          '-=0.3'
        );
    }, this.el);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  private buildFacebookEmbed(): void {
    if (!this.facebookUrl || this.facebookUrl.startsWith('PASTE_')) {
      this.facebookEmbedFailed.set(true);
      return;
    }

    const encodedHref = encodeURIComponent(this.facebookUrl);
    const rawUrl =
      `https://www.facebook.com/plugins/page.php?href=${encodedHref}` +
      `&tabs=timeline&width=500&height=560&small_header=true` +
      `&adapt_container_width=true&hide_cover=false&show_facepile=false`;

    // Trusted, official Meta embed URL — safe to bypass sanitization for this
    // specific, controlled, non-user-generated URL only.
    this.facebookEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }

  onFacebookEmbedError(): void {
    this.facebookEmbedFailed.set(true);
  }
}

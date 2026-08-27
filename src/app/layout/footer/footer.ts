import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements AfterViewInit, OnDestroy {
  // ============================================================
  // REPLACE THESE WITH THE OFFICIAL URLS / EMAIL
  // ============================================================
  facebookUrl = 'https://www.facebook.com/people/The-Legend-Achyuta-Samanta/61573749980217/';
  instagramUrl = 'https://www.instagram.com/the_legend_achyutasamanta/';
  officialWebsiteUrl = 'https://achyutasamanta.com';
  email = 'YOUR_EMAIL_HERE';

  currentYear = new Date().getFullYear();
  prefersReducedMotion = false;

  private ctx?: gsap.Context;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    this.ctx = gsap.context(() => {
      if (this.prefersReducedMotion) {
        gsap.set(
          '.footer-watermark, .fc-eyebrow, .fc-heading, .fc-paragraph, .ft-eyebrow, .ft-heading, .ft-sub, .ft-paragraph, .gold-line, .footer-col, .footer-social a, .footer-final-line, .footer-bottom',
          { opacity: 1, x: 0, y: 0, scaleX: 1 }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 75%',
        },
      });

      tl.fromTo('.footer-watermark', { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power3.out' })
        .fromTo('.fc-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=1.2')
        .fromTo('.fc-heading', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.7')
        .fromTo('.fc-paragraph', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
        .fromTo('.ft-eyebrow', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo('.ft-heading', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
        .fromTo('.ft-sub', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo('.ft-paragraph', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
        .fromTo('.gold-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left center' }, '-=0.3')
        .fromTo('.footer-col', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, '-=0.5')
        .fromTo('.footer-social a', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
        .fromTo('.footer-final-line', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1 }, '-=0.2')
        .fromTo('.footer-bottom', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3');

      // slow ambient glow drift
      gsap.to('.footer-ambient', {
        x: 40,
        y: -20,
        scale: 1.1,
        duration: 12,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, this.el);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  scrollToSection(id: string, event: Event): void {
    event.preventDefault();

    if (window.location.pathname === '/') {
      const el = document.getElementById(id);

      el?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      window.location.href = `/#${id}`;
    }
  }

  backToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

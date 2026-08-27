import { Component, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SlideImage {
  image: string;
  caption: string;
}

interface Particle {
  left: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-spiritual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spiritual.html',
  styleUrl: './spiritual.css',
})
export class Spiritual implements AfterViewInit, OnDestroy {
  particles: Particle[] = Array.from({ length: 16 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 9 + Math.random() * 10,
  }));

  slides: SlideImage[] = [
    { image: 'assets/images/spiritual-1.jpg', caption: 'Rath Yatra Celebration' },
    { image: 'assets/images/spiritual-9.jpeg', caption: 'Temple Construction' },
    { image: 'assets/images/spiritual-3.png', caption: 'Dedicate to devine service' },
    { image: 'assets/images/spiritual-4.jpeg', caption: 'Spiritually Devoted' },
    { image: 'assets/images/spiritual-5.jpeg', caption: 'Spiritual Service' },
  ];

  currentIndex = signal(0);
  private autoplayTimer: any;
  private ctx?: gsap.Context;

  constructor(private el: ElementRef<HTMLElement>, private router: Router) {}

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      gsap.to('.spiritual-header .eyebrow, .spiritual-header h2, .spiritual-header .subtitle, .spiritual-highlight', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: { trigger: '.spiritual-section', start: 'top 75%' },
      });

      gsap.from('.slider-track', {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: { trigger: '.slider-wrap', start: 'top 82%' },
      });

      gsap.to('.ambient-glow', {
        opacity: 0.55,
        scale: 1.08,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, this.el);

    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    clearInterval(this.autoplayTimer);
  }

  startAutoplay() {
    clearInterval(this.autoplayTimer);
    this.autoplayTimer = setInterval(() => this.next(), 4000);
  }

  pauseAutoplay() {
    clearInterval(this.autoplayTimer);
  }

  next() {
    this.currentIndex.set((this.currentIndex() + 1) % this.slides.length);
  }

  prev() {
    this.currentIndex.set(
      (this.currentIndex() - 1 + this.slides.length) % this.slides.length
    );
  }

  goTo(i: number) {
    this.currentIndex.set(i);
  }

  goToSpiritualJourney() {
  this.router.navigate(['/spiritual-journey']).then(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  });
}
}

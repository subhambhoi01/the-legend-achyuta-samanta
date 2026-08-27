import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Counter {
  target: number;
  suffix: string;
  label: string;
}

interface CountryTag {
  name: string;
  top: string;
  left: string;
  info: string[];
}

interface Particle {
  left: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-global-impact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-impact.html',
  styleUrl: './global-impact.css',
})
export class GlobalImpact implements AfterViewInit, OnDestroy {
  particles: Particle[] = Array.from({ length: 40 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 10 + Math.random() * 14,
  }));

  counters: Counter[] = [
    { target: 40000, suffix: '+', label: 'Tribal Students Receiving Free Education' },
    { target: 100000, suffix: '+', label: 'Students Across Institutions' },
    { target: 30000, suffix: '+', label: 'Employment Opportunities Created' },
    { target: 30, suffix: '+', label: 'Countries Connected' },
    { target: 0, suffix: '', label: 'Lives Transformed' },
  ];

  // Odisha source point (approx lat 20.9, lon 85.8 → equirectangular %)
  originX = 74;
  originY = 38;

countries: CountryTag[] = [
  { name: 'USA', top: '24%', left: '14%', info: ['Honorary Doctorates', 'Academic Partnerships'] },
  { name: 'UK', top: '14%', left: '46%', info: ['International Collaborations', 'Research Exchange'] },
  { name: 'Canada', top: '18%', left: '16%', info: ['Educational Recognition', 'Student Exchange'] },
  { name: 'Japan', top: '26%', left: '90%', info: ['Academic MOUs', 'Cultural Exchange'] },
  { name: 'Australia', top: '78%', left: '92%', info: ['Research Partnerships', 'Global Rankings'] },
  { name: 'Nepal', top: '38%', left: '68%', info: ['Regional Outreach', 'Scholarship Programs'] },
];
  private ctx?: gsap.Context;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      this.buildTimeline();
    }, this.el);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  private buildTimeline() {
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: '.cinema-stage',
        start: 'top top',
        end: '+=4500',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // ---- STAGE 0: origin dot breathing ----
    master.to('.origin-dot', { scale: 1.4, opacity: 1, duration: 1 });

    // ---- STAGE 1: One Village ----
    master.to('.stage-text.village', { opacity: 1, y: 0, duration: 1 });
    master.to('.stage-text.village', { opacity: 0, y: -20, duration: 0.8 }, '+=0.5');

    // ---- STAGE 2: One State ----
    master.to('.odisha-glow', { opacity: 1, scale: 1, duration: 1.2 }, '<');
    master.to('.stage-text.state', { opacity: 1, y: 0, duration: 1 }, '<0.3');
    master.to('.stage-text.state', { opacity: 0, y: -20, duration: 0.8 }, '+=0.5');

    // ---- STAGE 3: One Nation ----
    master.to('.india-glow', { opacity: 1, scale: 1, duration: 1.2 }, '<');
    master.to('.stage-text.nation', { opacity: 1, y: 0, duration: 1 }, '<0.3');
    master.to('.stage-text.nation', { opacity: 0, y: -20, duration: 0.8 }, '+=0.5');

    // ---- STAGE 4: Earth reveal ----
    master.to('.origin-scene', { opacity: 0, duration: 1 }, '<');
    master.fromTo(
      '.globe-wrap',
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' },
      '<0.2'
    );

    // ---- STAGE 5: connection lines draw + country tags ----
    master.fromTo(
      '.conn-line',
      { strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1.6, stagger: 0.15 },
      '+=0.3'
    );
    master.fromTo(
      '.country-tag',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12 },
      '<0.2'
    );

    // ---- STAGE 6: globe fully illuminated ----
    master.to('.globe-sphere', { filter: 'brightness(1.4)', duration: 1 }, '+=0.4');
    master.to('.globe-map', { opacity: 1, duration: 1 }, '<');
    master.to('.stage-text.borders', { opacity: 1, y: 0, duration: 1 }, '<0.2');
    master.to('.stage-text.borders', { opacity: 0, y: -20, duration: 0.8 }, '+=0.6');

    master.to('.stage-text.inspires', { opacity: 1, y: 0, duration: 1 }, '<0.1');
    master.to('.stage-text.inspires', { opacity: 0, y: -20, duration: 0.8 }, '+=0.6');

    // ---- STAGE 7: finale zoom out ----
    master.to('.globe-wrap', { scale: 0.08, opacity: 0.9, duration: 2, ease: 'power2.inOut' }, '+=0.2');
    master.to('.finale-star', { opacity: 1, scale: 1, duration: 1 }, '<1');
    master.fromTo(
      '.finale-quote .word',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
      '+=0.3'
    );
    master.to('.finale-quote', { opacity: 1, duration: 0.1 }, '<');
    master.to('.finale-line', { opacity: 1, duration: 1 }, '+=0.6');

    master.to('.cinema-stage', { backgroundColor: '#000000', duration: 1 }, '+=0.6');
    master.to('.finale-wrap', { opacity: 0, duration: 0.8 }, '<0.2');

    // ---- COUNTERS SECTION ----
    gsap.utils.toArray<HTMLElement>('.counter-block').forEach((block) => {
      const valueEl = block.querySelector('.counter-value') as HTMLElement;
      const target = Number(valueEl.dataset['target'] || 0);
      const proxy = { val: 0 };

      gsap.fromTo(
        block,
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 78%',
          },
          onStart: () => {

  if (target === 0) {
    valueEl.textContent = 'Millions';
  } else {
    gsap.to(proxy, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        valueEl.textContent =
          Math.floor(proxy.val).toLocaleString('en-IN');
      },
    });
  }

  this.spawnBurst(block);
},
        }
      );
    });
  }

  private spawnBurst(container: HTMLElement) {
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('span');
      dot.className = 'counter-burst';
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 80;
      container.appendChild(dot);

      gsap.to(dot, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 0,
        duration: 1 + Math.random() * 0.5,
        ease: 'power2.out',
        onComplete: () => dot.remove(),
      });
    }
  }
}

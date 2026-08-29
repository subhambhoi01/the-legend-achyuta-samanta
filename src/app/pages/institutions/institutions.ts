import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface InstitutionNode {
  id: string;
  key: 'kiit' | 'kiss' | 'kims' | 'giving';
  icon: string;
  logo: string;
  name: string;
  tagline: string;
  accent: string;
  heroImage: string;
  stats: Stat[];
  storyParagraphs: string[];
  closingLine: string;
}

interface Particle {
  left: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-institutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './institutions.html',
  styleUrl: './institutions.css',
})
export class Institutions implements AfterViewInit {
  @ViewChildren('nodeEl') nodeEls!: QueryList<ElementRef<HTMLElement>>;

  particles: Particle[] = Array.from({ length: 30 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 10,
  }));

  activeNode = signal<InstitutionNode | null>(null);

  nodes: InstitutionNode[] = [
    {
      id: 'kiit',
      key: 'kiit',
      icon: '🎓',
      logo: 'assets/images/logo-kiit.png',
      name: 'KIIT',
      tagline: 'From a rented room with ₹5000 to a world-ranked university.',
      accent: '#e8c553',
      heroImage: 'assets/images/kiit-campus.jpeg',
      stats: [
        { value: 1992, suffix: '', label: 'Founded' },
        { value: 30000, suffix: '+', label: 'Students' },
        { value: 60, suffix: '+', label: 'Countries Represented' },
      ],
      storyParagraphs: [
        'In 1992, in a small rented apartment, with nothing but ₹5000, Achyuta Samanta founded the Kalinga Institute of Industrial Technology.',
        'There was no land, no building, no investors. Only a conviction that education could rewrite destinies — because it had already rewritten his own.',
        'Today, KIIT stands as a multidisciplinary university with students from across India and dozens of countries, built entirely on the belief that opportunity should never depend on birth.',
      ],
      closingLine: 'One dream. One room. One university that changed everything.',
    },
    {
      id: 'kiss',
      key: 'kiss',
      icon: '🏫',
      logo: 'assets/images/logo-kiss.png',
      name: 'KISS',
      tagline: 'Free education, food, and shelter for tribal children — since 1993.',
      accent: '#d8b35a',
      heroImage: 'assets/images/kiss-campus.jpg',
      stats: [
        { value: 1993, suffix: '', label: 'Founded' },
        { value: 30000, suffix: '+', label: 'Tribal Students' },
        { value: 100, suffix: '%', label: 'Free Education' },
      ],
      storyParagraphs: [
        'Remembering his own childhood without means, Achyuta Samanta founded the Kalinga Institute of Social Sciences in 1993 — a fully residential school for tribal children.',
        'Education, food, clothing, and healthcare — all completely free, for children who otherwise may never have entered a classroom.',
        'What began with a handful of students has grown into one of the largest institutions for indigenous children anywhere in the world.',
      ],
      closingLine: 'Every child deserves a chance. KISS makes sure they get one.',
    },
    {
      id: 'kims',
      key: 'kims',
      icon: '🏥',
      logo: 'assets/images/logo-kims.png',
      name: 'KIMS',
      tagline: 'Advanced healthcare, built to serve — not just to profit.',
      accent: '#c9a227',
      heroImage: 'assets/images/kims-campus.jpg',
      stats: [
        { value: 2007, suffix: '', label: 'Founded' },
        { value: 2500, suffix: '+', label: 'Beds' },
        { value: 1000, suffix: '+', label: 'Doctors & Staff' },
      ],
      storyParagraphs: [
        'Healthcare, like education, was never meant to be a privilege reserved for the few. Kalinga Institute of Medical Sciences was founded to bring advanced treatment within everyone\u2019s reach.',
        'From routine care to complex specialties, KIMS has grown into a major healthcare institution — training the doctors of tomorrow while treating the patients of today.',
        'Behind every successful treatment is the same philosophy that built KIIT and KISS: service before self.',
      ],
      closingLine: 'Healing hands, guided by the same vision that never stopped giving.',
    },
    {
      id: 'giving',
      key: 'giving',
      icon: '❤️',
      logo: 'assets/images/logo-art-of-giving.png',
      name: 'Art of Giving',
      tagline: 'A movement, not a moment — kindness carried forward by thousands.',
      accent: '#f5dfa0',
      heroImage: 'assets/images/art-of-givingp.jpg',
      stats: [
        { value: 100000, suffix: '+', label: 'Volunteers Inspired' },
        { value: 50, suffix: '+', label: 'Community Initiatives' },
        { value: 0, suffix: '', label: 'Expectations in Return' },
      ],
      storyParagraphs: [
        'Beyond the walls of any single institution, Achyuta Samanta championed something larger — a philosophy called the "Art of Giving".',
        'Initiatives like "India Against Negativity" and "Kampashn" turned individual compassion into a collective movement, encouraging ordinary people to give back in ordinary, everyday ways.',
        'What started as one man  example has become a culture — proof that kindness, once modeled, multiplies on its own.',
      ],
      closingLine: 'Giving was never the goal. It was always the beginning.',
    },
  ];

  ngAfterViewInit(): void {
    // entrance animation for the ecosystem
    gsap.from('.hub-node', {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.6)',
      scrollTrigger: {
        trigger: '.ecosystem',
        start: 'top 75%',
      },
    });

    gsap.from(
      this.nodeEls.map((n) => n.nativeElement),
      {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 0.3,
        scrollTrigger: {
          trigger: '.ecosystem',
          start: 'top 75%',
        },
      }
    );

    gsap.from('.energy-line', {
      strokeDashoffset: 400,
      duration: 1.4,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '.ecosystem',
        start: 'top 75%',
      },
    });

    // idle floating for each node
    this.nodeEls.forEach((n, i) => {
      gsap.to(n.nativeElement, {
        y: -10,
        duration: 2.4 + i * 0.3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    // idle hub pulse
    gsap.to('.hub-glow', {
      scale: 1.15,
      opacity: 0.5,
      duration: 2.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }

  onNodeMouseMove(event: MouseEvent, el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    el.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  }

  openNode(node: InstitutionNode) {
    this.activeNode.set(node);

    setTimeout(() => {
      const overlay = document.querySelector('.institution-overlay') as HTMLElement;
      const panel = document.querySelector('.institution-panel') as HTMLElement;
      const bg = document.querySelector('.institution-bg') as HTMLElement;
      if (!overlay || !panel || !bg) return;

      gsap.set(overlay, { display: 'flex' });
      gsap.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(
        panel,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      // animate counters
      document.querySelectorAll<HTMLElement>('.stat-value').forEach((elm) => {
        const target = Number(elm.dataset['target'] || 0);
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.6,
          delay: 0.3,
          ease: 'power2.out',
          onUpdate: () => {
            elm.textContent = Math.floor(proxy.val).toLocaleString('en-IN');
          },
        });
      });
    }, 0);
  }

  closeNode() {
    const panel = document.querySelector('.institution-panel') as HTMLElement;
    const bg = document.querySelector('.institution-bg') as HTMLElement;
    if (!panel || !bg) {
      this.activeNode.set(null);
      return;
    }

    const tl = gsap.timeline({ onComplete: () => this.activeNode.set(null) });
    tl.to(panel, { opacity: 0, scale: 0.92, y: 30, duration: 0.5, ease: 'power2.in' })
      .to(bg, { opacity: 0, duration: 0.4 }, '<');
  }
}

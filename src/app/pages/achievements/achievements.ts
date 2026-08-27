import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HonourItem {
  name: string;
  meta: string;
}

interface HonourCategory {
  key: string;
  icon: string;
  title: string;
  countLabel: string;
  image: string;
  accent: string;
  intro: string;
  items: HonourItem[];
}

interface Particle {
  left: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.html',
  styleUrl: './achievements.css',
})
export class Achievements implements AfterViewInit, OnDestroy {
  particles: Particle[] = Array.from({ length: 35 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 10 + Math.random() * 12,
  }));

  activeCategory = signal<HonourCategory | null>(null);
  inHall = signal(false);

  categories: HonourCategory[] = [
    {
      key: 'doctorates',
      icon: '🎓',
      title: 'Honorary Doctorates',
      countLabel: '75+',
      image: 'assets/images/room-doctorates.jpg',
      accent: '#e8c553',
      intro: 'Over 75 honorary doctorates from universities across more than 20 countries — recognising three decades of relentless work in education and social transformation.',
      items: [
        { name: 'Open International University, Colombo', meta: 'Sri Lanka — Honorary PhD, 2002; D.Sc., 2005' },
        { name: 'National University', meta: 'Cambodia — 2009' },
        { name: 'Hanseo University', meta: 'South Korea — 2010' },
        { name: 'National Formosa University', meta: 'Taiwan — 2012' },
        { name: 'Chosun University', meta: 'South Korea — 2014' },
        { name: 'Tabriz University', meta: 'Iran — 2014' },
        { name: 'Modern University of Humanities, Moscow', meta: 'Russia — 2014' },
        { name: 'Ala-Too International University', meta: 'Kyrgyzstan — 2017' },
        { name: 'Nanhua University', meta: 'Taiwan — 2017' },
        { name: 'Berhampur University', meta: 'Odisha, India — 2018' },
        { name: 'World Academy of Arts and Culture (WAAC)', meta: 'Recognised by UNESCO — 2018' },
        { name: 'Vitebsk State University', meta: 'Belarus — 2019' },
        { name: 'Utkal University, Bhubaneswar', meta: 'Odisha, India — 2022' },
        { name: 'Mahapurusha Srimanta Sankaradeva Viswavidyalaya', meta: 'Assam, India — 2023' },
        { name: 'Shree Jagannath Sanskrit University, Puri', meta: 'Odisha, India — 2023' },
        { name: 'Koyasan University', meta: 'Japan — 2024' },
        { name: 'Alliance University, Bengaluru', meta: 'Karnataka, India — 2024' },
        { name: 'University of Buckingham', meta: 'United Kingdom — 2025' },
        { name: 'Chaoyang University of Technology', meta: 'Taiwan — 2025' },
        { name: 'SRM University, Sonepat', meta: 'India — 2025' },
        { name: 'University of Craiova', meta: 'Romania — 2026' },
        { name: 'Maharaja Ganga Singh University, Bikaner', meta: 'Rajasthan, India — 2026 (75th doctorate)' },
      ],
    },
    {
      key: 'national',
      icon: '🏅',
      title: 'National Awards',
      countLabel: 'India',
      image: 'assets/images/room-national.jpg',
      accent: '#d8b35a',
      intro: 'From the President of India to leading national institutions — recognition for three decades of nation-building through education.',
      items: [
        { name: 'Padma Shri', meta: 'Government of India' },
        { name: 'National Award for the Welfare of Children', meta: 'Presented by President Ram Nath Kovind — 2017' },
        { name: 'Rashtriya Khel Protsahan Puraskar', meta: 'Government of India — 2022' },
        { name: 'Mahatma Award for Social Good', meta: 'Aditya Birla Group — 2024' },
        { name: 'Kautilya Award', meta: 'Indian Economic Association — 2017' },
        { name: 'NCST Leadership Award', meta: 'National Commission for Scheduled Tribes — 2019' },
        { name: 'Businessline Changemaker Award', meta: 'Social Transformation Category — 2019' },
        { name: 'Personality of the Year', meta: 'FICCI Higher Education Awards — 2019' },
        { name: 'Economic Times Award', meta: 'Top 50 Successful Entrepreneurs in India — 2015' },
        { name: 'ICON of Odisha', meta: 'Times of India — 2011' },
        { name: 'Dainik Bhaskar India Pride Award', meta: 'Social Development & Equity — 2011' },
        { name: 'Gurudev Rabindranath Tagore Samman', meta: '2011' },
        { name: 'Jawaharlal Nehru Award', meta: 'Indian Science Congress — 2012' },
        { name: 'Swami Vivekananda National Award', meta: 'Government of Karnataka — 2010' },
        { name: 'Sandipani Maharshi Samman', meta: 'Sandipani Vidya Niketan, Gujarat — 2020' },
        { name: 'Legendary Humanitarian Award', meta: 'Governor of Odisha — 2023' },
        { name: 'Ramachandra Mardaraj Samman', meta: '2023' },
        { name: '\u2018Odia Asmita Samman\u2019', meta: 'Asmita Odisha Conclave' },
        { name: 'Ananya Samman', meta: 'Zee Media — Contribution to Social Work' },
        { name: 'Priya Odiya', meta: 'Most Endeared Personality of Odisha — 2007' },
      ],
    },
    {
      key: 'international',
      icon: '🌍',
      title: 'International Recognition',
      countLabel: '20+ Countries',
      image: 'assets/images/room-international.jpg',
      accent: '#c9a227',
      intro: 'A dream born in a small Odisha village has been honoured by nations across continents — proof that compassion knows no borders.',
      items: [
        { name: 'ISA Award for Service to Humanity', meta: 'Highest Civilian Award, Kingdom of Bahrain — 2015' },
        { name: 'Gusi Peace Prize International', meta: 'Manila, Philippines — 2014' },
        { name: 'World of Difference Award', meta: 'The International Alliance for Women (TIAW), USA — 2013' },
        { name: 'Asia\u2019s Best Social Entrepreneur', meta: 'World HRD Congress, Singapore — 2010' },
        { name: 'Certificate of Excellence', meta: 'Government of Cambodia — 2010' },
        { name: 'Humanitarian Award', meta: 'Johannesburg, South Africa — 2004' },
        { name: 'Recognition as Social Entrepreneur', meta: 'Skoll Foundation — 2007' },
        { name: '\u2018Hall of Fame\u2019 Award', meta: 'World CSR Congress — 2015' },
        { name: 'GOPIO International Award', meta: 'Malaysia — 2017' },
        { name: 'Silver Medal for Outstanding Contribution', meta: 'Ministry of Foreign Affairs, Czech Republic' },
        { name: 'International Certificate of Excellence', meta: 'Muscat, Oman — 2010' },
        { name: 'FIVB Grand Cross', meta: 'Highest Award, Fédération Internationale de Volleyball — 2024' },
        { name: 'Lifetime Achievement Award', meta: 'World Academy of Art and Culture, recognised by UNESCO — 2024' },
        { name: 'Golden Gavel', meta: 'World Academy of Arts and Culture (WAAC), UNESCO' },
        { name: 'AAPI Award', meta: 'American Association of Physicians of Indian Origin, USA — 2026' },
      ],
    },
    {
      key: 'humanitarian',
      icon: '❤️',
      title: 'Humanitarian Honours',
      countLabel: 'Millions',
      image: 'assets/images/room-humanitarian.jpg',
      accent: '#f5dfa0',
      intro: 'The most personal recognitions — not for buildings raised, but for lives quietly rebuilt, one child at a time.',
      items: [
        { name: 'ISA Award for Service to Humanity', meta: 'Kingdom of Bahrain — Gold Medal & Certificate, 2015' },
        { name: 'National Award for the Welfare of Children', meta: 'President of India — 2017' },
        { name: 'Legendary Humanitarian Award', meta: 'Governor of Odisha — 2023' },
        { name: 'Humanitarian Award', meta: 'Johannesburg, South Africa — 2004' },
        { name: 'Gandhi Seva Medal', meta: 'Philanthropy and Charity — 2009' },
        { name: 'The MacJannet Prize', meta: 'Awarded to the \u2018Art of Giving\u2019 initiative — 2021' },
        { name: 'Gandhi Mandela Peace Award', meta: '2019' },
      ],
    },
  ];

  private ctx?: gsap.Context;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      // opening text
      gsap.to('.opening-text', {
        opacity: 1,
        duration: 1.5,
        scrollTrigger: { trigger: '.hall-intro', start: 'top 70%' },
      });

      // door reveal
      gsap.to('.door-frame', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        scrollTrigger: { trigger: '.door-scene', start: 'top 75%' },
      });

      // pinned door-open + camera fly-through timeline
      const doorTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.door-scene',
          start: 'top top',
          end: '+=1600',
          scrub: 1,
          pin: true,
          onLeave: () => this.inHall.set(true),
          onEnterBack: () => this.inHall.set(false),
        },
      });
      doorTl
        .to('.door-left', { rotateY: -102, duration: 1, ease: 'power2.inOut' })
        .to('.door-right', { rotateY: 102, duration: 1, ease: 'power2.inOut' }, '<')
        .to('.door-light', { opacity: 1, scale: 4, duration: 1 }, '<0.2')
        .to('.door-scene-label', { opacity: 0, duration: 0.3 }, '<')
        .to('.door-plaque', { opacity: 0, duration: 0.3 }, '<')
        .to('.door-scene', { scale: 2.4, opacity: 0, duration: 1.2, ease: 'power2.in' }, '+=0.1');

            ScrollTrigger.create({
      trigger: '.honours-finale',
      start: 'bottom bottom',
      onEnter: () => this.inHall.set(false),
      onLeaveBack: () => this.inHall.set(true),
    });

      // hall entrance content
      gsap.from('.honour-frame', {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.museum-hall', start: 'top 65%' },
      });

      // idle floating for each frame
      gsap.utils.toArray<HTMLElement>('.honour-frame').forEach((frame, i) => {
        gsap.to(frame, {
          y: -10,
          duration: 2.6 + i * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      // finale
      gsap.fromTo(
        '.finale-msg .line',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.6,
          scrollTrigger: { trigger: '.honours-finale', start: 'top 60%' },
        }
      );
    }, this.el);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  openCategory(cat: HonourCategory) {
    this.activeCategory.set(cat);
    setTimeout(() => {
      const bg = document.querySelector('.honour-bg') as HTMLElement;
      const panel = document.querySelector('.honour-panel') as HTMLElement;
      if (!bg || !panel) return;
      gsap.set('.honour-overlay', { display: 'flex' });
      gsap.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(
        panel,
        { opacity: 0, scale: 0.9, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }, 0);
  }

  closeCategory() {
    const bg = document.querySelector('.honour-bg') as HTMLElement;
    const panel = document.querySelector('.honour-panel') as HTMLElement;
    if (!bg || !panel) {
      this.activeCategory.set(null);
      return;
    }
    const tl = gsap.timeline({ onComplete: () => this.activeCategory.set(null) });
    tl.to(panel, { opacity: 0, scale: 0.92, y: 30, duration: 0.5, ease: 'power2.in' })
      .to(bg, { opacity: 0, duration: 0.4 }, '<');
  }

  exitMuseum() {
    const introEl = document.querySelector('.hall-intro') as HTMLElement;
    introEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

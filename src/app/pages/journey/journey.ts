
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

interface Chapter {
  num: string;
  title: string;
  subtitle: string;
  year: string;
  location: string;
  photo: string;
  paragraphs: string[];
  highlight?: string; // e.g. ₹5000 dramatic number
  quote?: string;
}

interface Particle {
  left: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey.html',
  styleUrl: './journey.css',
})
export class Journey implements AfterViewInit {
  @ViewChild('bookEl') bookEl!: ElementRef<HTMLElement>;
  @ViewChild('coverEl') coverEl!: ElementRef<HTMLElement>;
  @ViewChild('pagesWrap') pagesWrap!: ElementRef<HTMLElement>;
  @ViewChild('backCoverEl') backCoverEl!: ElementRef<HTMLElement>;
  @ViewChildren('pageEl') pageEls!: QueryList<ElementRef<HTMLElement>>;

  particles: Particle[] = Array.from({ length: 30 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
  }));

  isOpened = signal(false);
  isClosed = signal(false);
  currentPage = signal(0); // number of pages currently flipped
  showBackCover = signal(false);

  chapters: Chapter[] = [
    {
      num: 'Chapter 01',
      title: 'Born',
      subtitle: 'A Child of the Soil',
      year: '1965',
      location: 'Kalarabanka, Cuttack District, Odisha',
      photo: 'Book1.png',
      paragraphs: [
        'In the quiet village of Kalarabanka, in the Cuttack district of Odisha, a child was born to Anadi Charan Samanta and Nilima Rani Samanta — Achyutananda Samanta.',
        'No one in that small thatched home could have known that this ordinary birth in the year 1965 carried within it an extraordinary destiny — one that would one day touch the lives of millions.',
        'The soil of Kalarabanka, the river breeze of rural Odisha, and the quiet resilience of village life shaped the earliest years of a dream that had not yet found its voice.',
      ],
    },
    {
      num: 'Chapter 02',
      title: 'The Hardest Days',
      subtitle: 'A Widow, Seven Children, No Roof',
      year: '1969',
      location: 'Kalarabanka Village',
      photo: 'Book2.png',
      paragraphs: [
        'When Achyuta was barely four years old, tragedy struck — his father, Anadi Charan Samanta, died in a train accident. The family, then living away from the village, returned to Kalarabanka with nothing but grief.',
        'His widowed mother, Nilima Rani, was left to raise him and his six siblings alone, in a thatched house with no electricity, no land, and barely enough food for the family.',
        'From the age of five, young Achyuta began doing menial jobs — working the fields, running errands — anything to bring a few coins home. Yet even in this darkness, a small light of ambition refused to go out.',
      ],
    },
    {
      num: 'Chapter 03',
      title: 'Education',
      subtitle: 'Eight Kilometers, Every Single Day',
      year: '1970s',
      location: 'Raghunathpur High School',
      photo: 'Book3.png',
      paragraphs: [
        'Every morning, the boy walked nearly eight kilometers to reach Raghunathpur High School — rain or shine — because education, to him, was the only road out of poverty.',
        'Despite financial distress that would have broken most families, Achyuta completed his Intermediate with distinction, later earning his graduation from SCS College, Puri.',
        'He went on to complete his Master degree in Chemistry from Utkal University, Bhubaneswar — proof that hunger could slow him, but never stop him.',
      ],
    },
    {
      num: 'Chapter 04',
      title: 'Teacher',
      subtitle: 'Before He Built Institutions, He Built Minds',
      year: '1980s',
      location: 'Odisha',
      photo: 'Book4.png',
      paragraphs: [
        'To fund his own education and support his family, Achyuta took up private tuitions and later worked as a Chemistry lecturer.',
        'In every classroom he stood in, he saw a reflection of his own childhood — bright minds trapped by circumstance. Teaching was no longer just a livelihood; it had become a calling.',
        'It was here, chalk in hand before a blackboard, that the seed of a much larger mission quietly took root.',
      ],
    },
    {
      num: 'Chapter 05',
      title: 'The ₹5000 Dream',
      subtitle: 'No Land. No Building. No Investors. Only Vision.',
      year: '1992',
      location: 'A Rented Apartment, Bhubaneswar',
      photo: 'Book5.png',
      highlight: '₹5000',
      paragraphs: [
        'In 1992, in a small rented apartment, with nothing but ₹5000 in hand, Achyuta Samanta founded the Kalinga Institute of Industrial Technology.',
        'There was no land. No building. No investors lined up to help. There was only an unshakeable belief that education could change destinies the way it had changed his own.',
        'What began as a single rented room would, in time, rise into one of India most respected institutions of learning.',
      ],
    },
    {
      num: 'Chapter 06',
      title: 'Birth of KIIT',
      subtitle: 'From One Room to a University',
      year: '1992 — 2004',
      location: 'Bhubaneswar, Odisha',
      photo: 'Book6.png',
      paragraphs: [
        'Year after year, the small institute grew — new courses, new buildings, new students arriving with dreams of their own.',
        'By 2004, what had started as a modest technical institute earned university status, becoming the Kalinga Institute of Industrial Technology (KIIT) — a full-fledged, multidisciplinary university.',
        'Today, KIIT stands among India leading universities, its campuses home to students who arrived exactly as Achyuta once did — hopeful, and hungry to learn.',
      ],
    },
    {
      num: 'Chapter 07',
      title: 'KISS',
      subtitle: 'Education, Food, Shelter — Free, For Every Tribal Child',
      year: '1993',
      location: 'Bhubaneswar, Odisha',
      photo: 'Book7.png',
      paragraphs: [
        'In 1993, remembering his own childhood without means, Achyuta founded the Kalinga Institute of Social Sciences (KISS) — a fully residential institution for tribal children.',
        'Education, food, clothing, and healthcare — all provided completely free, to children who otherwise would never have set foot in a classroom.',
        'From a handful of students, KISS has grown into one of the largest institutions for indigenous children anywhere in the world — a living monument to a promise kept.',
      ],
    },
    {
      num: 'Chapter 08',
      title: 'Art of Giving',
      subtitle: 'A Philosophy Beyond Institutions',
      year: 'Ongoing',
      location: 'Odisha & Beyond',
      photo: 'Book8.png',
      paragraphs: [
        'Beyond the walls of KIIT and KISS, Achyuta Samanta championed a wider movement — the "Art of Giving" — encouraging thousands of volunteers and well-wishers to give back to society.',
        'Initiatives like "India Against Negativity" and "Kampashn" — a charity store for garments and daily essentials — extended his mission of compassion into everyday life.',
        'What began as one man vision slowly became a community movement, powered by ordinary people choosing kindness.',
      ],
    },
    {
      num: 'Chapter 09',
      title: 'Awards & Recognition',
      subtitle: 'Honoured Across Nations',
      year: '1990s — Present',
      location: 'India & the World',
      photo: 'Book9.png',
      paragraphs: [
        'Over the decades, Achyuta Samanta has received numerous honorary doctorates and national and international recognitions for his contribution to education and tribal welfare.',
        'He holds a place in the Limca Book of Records as the youngest chancellor of any university in India, and later went on to represent Odisha\u2019s Kandhamal constituency in the Lok Sabha.',
        'Yet, for a man raised without a roof of his own, the greatest reward remained the same as always — a child, once voiceless, learning to read.',
      ],
    },
    {
  num: 'Chapter 10',
  title: 'Mother',
  subtitle: 'The Woman Behind the Journey',
  year: 'A Lifelong Bond',
  location: 'Kalarabanka, Odisha',
  photo: 'Book10.png',
  quote: 'A mother’s strength can become the foundation of a lifetime.',
  paragraphs: [
    'Behind Achyuta Samanta’s extraordinary journey stands a woman whose strength, sacrifice and love shaped his earliest years — his mother, Nilima Rani Samanta.',
    'After losing her husband, she raised seven children through some of the hardest years of their lives. With very little in her hands, she gave her children something far greater — courage, values, faith and the determination to keep moving forward.',
    'Achyuta’s deep affection and enduring respect for his mother have remained a defining part of his life. The hardships she endured, the sacrifices she made and the strength she showed became lessons he carried with him long after he left the small thatched home of his childhood.',
    'For him, success has never been separate from the woman who stood beside him at the very beginning. His mother was not simply a part of his story — she was one of the reasons the story became possible.'
  ],
},
    {
      num: 'Chapter 11',
      title: 'Legacy',
      subtitle: 'Millions of Lives, One Vision',
      year: '1965 — Present',
      location: 'A Story Still Being Written',
      photo: 'Book11.png',
      quote: 'Education is the Third Eye of Humanity.',
      paragraphs: [
        'From a fatherless four-year-old in a thatched hut, to the founder of institutions educating over a hundred thousand students — the journey of Achyuta Samanta is not just a biography. It is a testament.',
        'Thousands of employees, millions of lives touched, and a native village transformed into a model of modern development — his legacy is written not in stone, but in the futures of the students he lifted.',
      ],
    },
  ];

  totalPages = this.chapters.length;

  ngAfterViewInit(): void {
    // idle breathing animation for the closed book
    gsap.to(this.bookEl.nativeElement, {
      y: -8,
      duration: 3.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }

  // ---------- MOUSE PARALLAX ----------
  onMouseMove(event: MouseEvent) {
    if (this.isOpened()) return;
    const rect = this.bookEl.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    gsap.to(this.bookEl.nativeElement, {
      rotateX,
      rotateY,
      duration: 0.6,
      ease: 'power2.out',
    });
  }

  onMouseLeave() {
    if (this.isOpened()) return;
    gsap.to(this.bookEl.nativeElement, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  // ---------- OPEN BOOK ----------
openBook() {

  if (this.isOpened()) return;

  this.spawnGoldBurst();

  this.isOpened.set(true);

  gsap.timeline()

  .to(this.bookEl.nativeElement,{
    rotateX:0,
    rotateY:0,
    duration:0.4
  })

  .to(this.coverEl.nativeElement,{
    rotateY:-180,
    duration:1.6,
    ease:"power3.inOut",
    transformOrigin:"left center"
  })

  .to(this.pagesWrap.nativeElement,{
    opacity:1,
    duration:.5
  },"-=0.7");

}
  // ---------- PAGE TURNING ----------
  nextPage() {
    const idx = this.currentPage();
    if (idx >= this.totalPages) return;

    const pageEl = this.pageEls.toArray()[idx]?.nativeElement;
    if (!pageEl) return;

    this.spawnGoldBurst();
    this.playPaperSound();

    gsap.to(pageEl, {
      rotateY: -175,
      duration: 1.1,
      ease: 'power2.inOut',
      transformOrigin: 'left center',
      onStart: () => {
        pageEl.style.zIndex = `${this.totalPages + 10}`;
      },
      onComplete: () => {
        pageEl.style.zIndex = `${idx}`;
      },
    });

    this.currentPage.set(idx + 1);

    if (idx + 1 === this.totalPages) {
      setTimeout(() => this.showBackCover.set(true), 900);
    }
  }

  prevPage() {
    const idx = this.currentPage();
    if (idx <= 0) return;

    this.showBackCover.set(false);
    const pageEl = this.pageEls.toArray()[idx - 1]?.nativeElement;
    if (!pageEl) return;

    this.spawnGoldBurst();
    this.playPaperSound();

    gsap.to(pageEl, {
      rotateY: 0,
      duration: 1.1,
      ease: 'power2.inOut',
      transformOrigin: 'left center',
      onStart: () => {
        pageEl.style.zIndex = `${this.totalPages + 10}`;
      },
      onComplete: () => {
        pageEl.style.zIndex = `${this.totalPages - idx}`;
      },
    });

    this.currentPage.set(idx - 1);
  }

 closeBook() {
  const tl = gsap.timeline();

  // flip all pages back instantly AND restore original stacking order
  this.pageEls.forEach((p, i) => {
    gsap.set(p.nativeElement, { rotateY: 0 });
    p.nativeElement.style.zIndex = `${this.totalPages - i}`;
  });
  this.currentPage.set(0);
  this.showBackCover.set(false);

  tl.to(this.pagesWrap.nativeElement, { opacity: 0, duration: 0.4 })
    .call(() => this.isOpened.set(false))
    .to(this.coverEl.nativeElement, {
      opacity: 1,
      rotateY: 0,
      duration: 1.2,
      ease: 'power3.inOut',
    });
}

  // ---------- FX HELPERS ----------
  private spawnGoldBurst() {
    const container = this.bookEl.nativeElement;
    for (let i = 0; i < 14; i++) {
      const dot = document.createElement('span');
      dot.className = 'burst-particle';
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 120;
      dot.style.left = '50%';
      dot.style.top = '50%';
      container.appendChild(dot);

      gsap.to(dot, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 0,
        duration: 1 + Math.random() * 0.6,
        ease: 'power2.out',
        onComplete: () => dot.remove(),
      });
    }
  }

  private playPaperSound() {
    try {
      const audio = new Audio('assets/sounds/page-flip.mp3');
      audio.volume = 0.35;
      audio.play().catch(() => {});
    } catch {
      // audio not available — silently ignore
    }
  }
}

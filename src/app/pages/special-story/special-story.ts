import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  HostListener,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

interface WitnessObject {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  storyPhoto: string;
  storyParagraphs: string[];
  handwrittenLine: string;
  closingQuote: string;
}

interface Particle {
  left: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-special-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './special-story.html',
  styleUrl: './special-story.css',
})
export class SpecialStory implements AfterViewInit {
  @ViewChildren('cardEl') cardEls!: QueryList<ElementRef<HTMLElement>>;

  particles: Particle[] = Array.from({ length: 25 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 10,
  }));

  activeObject = signal<WitnessObject | null>(null);

  // Tracks whether WE pushed a history entry for the currently open overlay,
  // so we know whether closeStory() should trigger history.back() or just
  // run the close animation directly (e.g. when popstate already fired it).
  private historyPushed = false;

  objects: WitnessObject[] = [
    {
      id: 'pen',
      image: 'assets/images/pen.png',
      title: 'The Pen That Wrote Dreams',
      subtitle: 'Every revolution begins with a single line.',
      storyPhoto: 'assets/images/pen-photo.jpg',
      storyParagraphs: [
        'For decades, the pen has been a quiet companion in Dr. Achyuta Samanta’s journey — always close, resting beside the white shirt that has become a part of his identity.',

        'With this pen, ideas became plans, letters became possibilities, and dreams slowly became institutions. From the earliest days of his journey to the growth of KIIT and KISS, it has remained a small but constant witness to his work, his struggles, and his vision.',

        'Every year, before his students step into their Class 10 examinations, he places a pen in their hands — not simply as a gift, but as a blessing. A reminder to write with confidence, stay focused, and believe in the future they are about to create.',

        'The same pen that has travelled with him through decades of growth is now passed on to the next generation. For him, it is more than an instrument of writing. It carries memories, faith, and a simple message: every great story begins with a single line.',
      ],
      handwrittenLine: 'Some dreams are written before they are ever spoken aloud.',
      closingQuote: 'Every institution was once only an idea. Ideas begin with ink.',
    },
    {
      id: 'bike',
      image: 'assets/images/bike.png',
      title: 'The Bike That Never Gave Up',
      subtitle: 'It carried more than a rider. It carried a vision.',
      storyPhoto: 'assets/images/bike-photo.jpeg',
      storyParagraphs: [
        'This is not just a bike. It is an emotion — a companion that has grown with me and stayed beside me through every stage of my journey. Day after day, road after road, it has carried me through countless places, meetings, villages, and moments that became part of my story.',

        'I have ridden it hundreds of kilometres/day, travelled wherever I needed to go, and taken it to people and places that shaped my work and my life. Through every journey, it has never left my side, never failed me, and never asked for anything in return. In many ways, its journey has become a part of my own growth.',

        'Every Durga Puja, I still worship it before taking it out for a ride. Perhaps I may not ride it every day anymore, but it is still with me — like a brother who has quietly stood beside me through the years. It is more than a machine. It is a piece of my journey, my memories, and my life.',
      ],
      handwrittenLine: 'The road was long. The will was longer.',
      closingQuote: 'Persistence has no shortcuts — only distance covered, one mile at a time.',
    },
    {
      id: 'phone',
      image: 'assets/images/phone.png',
      title: 'The Phone That Connected Dreams',
      subtitle: 'Sometimes one phone call changes thousands of lives.',
      storyPhoto: 'assets/images/phone-photo.jpeg',
      storyParagraphs: [
        'In an age of smartphones, artificial intelligence, and endless technology, there is still one small phone that remains close to me. For nearly 25 years, this phone has travelled with me — through the growth of my institutions, my work, and the countless people who became part of my journey.',

        'On this very phone came calls from students, staff, officials, well-wishers, mothers, and people who simply needed someone to listen. From managing the needs of thousands of tribal students at KISS to staying connected with a staff community of more than 20,000 people, and from KIIT to the medical and dental institutions, this little phone has been a constant companion through it all.',

        'It has never been about having the latest technology. Even in the age of AI, I still use the phone that has been with me for decades. Its keys have carried countless conversations, its ringing has marked important moments, and its worn body carries memories that no new smartphone could ever replace.',

        'For almost 25 years, this phone has never simply been a device in my pocket. It has been a bridge — between a promise and the person waiting for it, between a problem and its solution, between a dream and the people who helped make it possible. And even today, it remains with me, quietly reminding me that technology may change with time, but a promise made to someone should never be forgotten.',
      ],
      handwrittenLine: 'One call. One promise kept. One life changed.',
      closingQuote: 'Technology was never the mission. People were.',
    },
  ];

  ngAfterViewInit(): void {
    // entrance animation
    gsap.from(
      this.cardEls.map((c) => c.nativeElement),
      {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: 'power3.out',
      }
    );

    // idle floating breathing per card
    this.cardEls.forEach((c, i) => {
      const floatEl = c.nativeElement.querySelector(
        '.object-float'
      ) as HTMLElement;
      if (!floatEl) return;
      gsap.to(floatEl, {
        y: -14,
        duration: 2.6 + i * 0.3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });
  }

  // ---------- MOUSE PARALLAX + GLOW ----------
  onCardMouseMove(event: MouseEvent, cardEl: HTMLElement) {
    const rect = cardEl.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    cardEl.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    cardEl.style.setProperty('--my', `${(y / rect.height) * 100}%`);

    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    gsap.to(cardEl, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  onCardMouseLeave(cardEl: HTMLElement) {
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }

  // ---------- OPEN / CLOSE STORY ----------
  openStory(obj: WitnessObject) {
    this.spawnGoldBurst();
    this.activeObject.set(obj);

    // Push a history entry so the phone's hardware/gesture back button
    // closes the overlay instead of navigating away from the site.
    history.pushState({ storyOverlay: true }, '');
    this.historyPushed = true;

    // wait a tick for *ngIf to render the overlay
    setTimeout(() => {
      const overlay = document.querySelector('.story-overlay') as HTMLElement;
      const diary = document.querySelector('.diary') as HTMLElement;
      const bg = document.querySelector('.overlay-bg') as HTMLElement;
      if (!overlay || !diary || !bg) return;

      gsap.set(overlay, { display: 'flex' });
      gsap.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(
        diary,
        { opacity: 0, scale: 0.85, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    }, 0);
  }

  closeStory() {
    // Closed via the X button or an outside click — go back through history
    // so the pushState entry from openStory() is consumed. This triggers
    // popstate, and onPopState() below runs the actual close animation.
    if (this.historyPushed) {
      this.historyPushed = false;
      history.back();
      return;
    }
    this.runCloseAnimation();
  }

  @HostListener('window:popstate')
  onPopState() {
    // Phone's hardware/gesture back button was pressed. If the overlay is
    // open, close it here instead of letting the browser navigate away
    // from the page.
    if (this.activeObject()) {
      this.historyPushed = false;
      this.runCloseAnimation();
    }
  }

  private runCloseAnimation() {
    const overlay = document.querySelector('.story-overlay') as HTMLElement;
    const diary = document.querySelector('.diary') as HTMLElement;
    const bg = document.querySelector('.overlay-bg') as HTMLElement;
    if (!overlay || !diary || !bg) {
      this.activeObject.set(null);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => this.activeObject.set(null),
    });

    tl.to(diary, {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.5,
      ease: 'power2.in',
    }).to(bg, { opacity: 0, duration: 0.4 }, '<');
  }

  // ---------- FX ----------
  private spawnGoldBurst() {
    const container = document.querySelector('.witnesses') as HTMLElement;
    if (!container) return;
    for (let i = 0; i < 16; i++) {
      const dot = document.createElement('span');
      dot.className = 'burst-particle';
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 160;
      dot.style.left = '50%';
      dot.style.top = '40%';
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
}

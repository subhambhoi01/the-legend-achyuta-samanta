import { Component, ElementRef, AfterViewInit, OnDestroy, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

interface VideoItem {
  thumbnail: string;
  title: string;
  embedUrl: string;
}

interface GalleryPhoto {
  image: string;
  size: 'wide' | 'tall' | 'landscape' | 'portrait' | 'square';
}

interface TimelineStep {
  label: string;
}

@Component({
  selector: 'app-spiritual-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spiritual-journey.html',
  styleUrl: './spiritual-journey.css',
})
export class SpiritualJourney implements AfterViewInit, OnDestroy {
  isPlaying = false;
    @ViewChild('heroVideo') heroVideoRef?: ElementRef<HTMLVideoElement>;

toggleFeaturedVideo(video: HTMLVideoElement) {
  if (video.paused || video.ended) {
    this.heroVideoRef?.nativeElement.pause();
    video.play();
    this.isPlaying = true;
  } else {
    video.pause();
    this.isPlaying = false;
    this.onFeaturedVideoStopped();
  }
}

onFeaturedVideoStopped() {
  this.heroVideoRef?.nativeElement.play();
}
  featuredVideo: VideoItem = {
    thumbnail: 'assets/images/sj-2.jpg',
    title: 'Rathayatra at KISS Jagannath Temple',
    embedUrl: '',

  };


  videos: VideoItem[] = [
    { thumbnail: 'assets/images/video-temple.jpg', title: 'Temple Visit', embedUrl: '' },
    { thumbnail: 'assets/images/video-rathyatra.jpg', title: 'Rath Yatra, Florida', embedUrl: '' },
    { thumbnail: 'assets/images/video-devotion.jpg', title: 'Jagannath Devotion', embedUrl: '' },
  ];
  playingVideo = signal<string | null>(null);

  gallery: GalleryPhoto[] = [
    { image: 'assets/images/sj-1.png', size: 'wide' },
    { image: 'assets/images/sj-2.jpg', size: 'tall' },
    { image: 'assets/images/sj-3.jpg', size: 'landscape' },
    { image: 'assets/images/sj-4.jpg', size: 'portrait' },
    { image: 'assets/images/sj-5.jpeg', size: 'square' },
    { image: 'assets/images/sj-6.jpeg', size: 'landscape' },
    { image: 'assets/images/sj-7.jpeg', size: 'square' },
    { image: 'assets/images/sj-11.png', size: 'tall' },
    { image: 'assets/images/sj-9.jpg', size: 'landscape' },
    { image: 'assets/images/sj-10.jpg', size: 'square' },
    { image: 'assets/images/sj-8.jpg', size: 'wide' },
    { image: 'assets/images/sj-12.png', size: 'square' },
    { image: 'assets/images/sj-13.jpg', size: 'landscape' },
    { image: 'assets/images/sj-14.png', size: 'portrait' },
    { image: 'assets/images/sj-15.jpg', size: 'square' },
    { image: 'assets/images/sj-16.jpeg', size: 'landscape' },
    { image: 'assets/images/sj-17.jpeg', size: 'square' },
    { image: 'assets/images/sj-18.jpeg', size: 'tall' },
    { image: 'assets/images/sj-19.jpeg', size: 'landscape' },
    { image: 'assets/images/sj-20.jpeg', size: 'wide' },
  ];
  lightboxIndex = signal<number | null>(null);

  timeline: TimelineStep[] = [
    { label: 'Day start' },
    { label: 'Prayer' },
    { label: 'Temple Visits' },
    { label: 'Mahaprabu Blessings' },
    { label: 'Service to Humanity' },
  ];

  private ctx?: gsap.Context;

  constructor(private el: ElementRef<HTMLElement>, private router: Router) {}

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
     gsap.fromTo('.hero-title, .hero-subtitle',
  { opacity: 0, y: 30 },
  {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.2,
    delay: 0.3,
    clearProps: 'opacity,transform',
  }
);

      gsap.from('.video-hero-media, .video-hero-text > *', {
        opacity: 0, y: 30, duration: 1, stagger: 0.1,
        scrollTrigger: { trigger: '.video-hero-section', start: 'top 75%' },
      });

      gsap.from('.video-card', {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.12,
        scrollTrigger: { trigger: '.videos-row', start: 'top 85%' },
      });

      gsap.from('.gallery-item', {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.05,
        scrollTrigger: { trigger: '.masonry-gallery', start: 'top 85%' },
      });

      gsap.utils.toArray<HTMLElement>('.story-block').forEach((block) => {
        gsap.from(block, {
          opacity: 0, y: 40, duration: 1,
          scrollTrigger: { trigger: block, start: 'top 80%' },
        });
      });

      gsap.from('.timeline-step', {
        opacity: 0, y: 20, duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: '.timeline-row', start: 'top 82%' },
      });

      gsap.from('.quote-text', {
        opacity: 0, duration: 1.4,
        scrollTrigger: { trigger: '.quote-section', start: 'top 75%' },
      });

      gsap.from('.ending-content', {
        opacity: 0, y: 30, duration: 1.2,
        scrollTrigger: { trigger: '.ending-section', start: 'top 80%' },
      });
    }, this.el);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  playVideo(v: VideoItem) {
    if (!v.embedUrl) return;
    this.playingVideo.set(v.embedUrl);
  }

  openLightbox(i: number) {
    this.lightboxIndex.set(i);
  }

  closeLightbox() {
    this.lightboxIndex.set(null);
  }

  nextPhoto() {
    const i = this.lightboxIndex();
    if (i === null) return;
    this.lightboxIndex.set((i + 1) % this.gallery.length);
  }

  prevPhoto() {
    const i = this.lightboxIndex();
    if (i === null) return;
    this.lightboxIndex.set((i - 1 + this.gallery.length) % this.gallery.length);
  }

  continueToLivingMemories() {
    // update this once the Living Memories route/section exists
    this.router.navigate(['/'], { fragment: 'living-memories' });
  }
}

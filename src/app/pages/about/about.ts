import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit, OnDestroy {

  storyMessages = [
    { gold: "40,000+", white: "Tribal Students Received Free Quality Education." },
    { gold: "Education", white: "is the Third Eye of a Child." },
    { gold: "One Vision.", white: "Millions of Lives Transformed." },
    { gold: "Founded KIIT,", white: "KISS, KIMS & Art of Giving." },
    { gold: "Creating Equal Opportunities", white: "Through Education." },
    { gold: "Empowering Rural & Tribal Communities", white: "with Knowledge." },
    { gold: "30,000+", white: "Employment Opportunities Created Through KIIT." },
    { gold: "40+ Years", white: "of Selfless Service to Society." }
  ];

  currentMessage = signal(0);
  animate = signal(true);

  private timer: any;
  private readonly INTERVAL = 5000; // ms — CSS animation duration se match

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.animate.set(false); // animation restart ke liye pehle band karo

      requestAnimationFrame(() => {
        this.currentMessage.update(v => (v + 1) % this.storyMessages.length);
        requestAnimationFrame(() => this.animate.set(true)); // fir se chalao
      });
    }, this.INTERVAL);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}

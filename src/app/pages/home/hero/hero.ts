import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

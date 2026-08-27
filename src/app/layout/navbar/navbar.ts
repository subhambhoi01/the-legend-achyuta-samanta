import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isMenuOpen = false;
  isHidden = false;
  private lastScrollY = 0;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // Reliable scroll-to-section — works regardless of Angular's fragment routing
  scrollToSection(id: string, event: Event) {
    event.preventDefault();
    this.closeMenu();

    if (this.router.url === '/' || this.router.url.startsWith('/?') ) {
      this.performScroll(id);
    } else {
      // navigate to home first, then scroll once the page has rendered
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.performScroll(id), 150);
      });
    }
  }

  private performScroll(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const currentY = window.scrollY;

    if (currentY < 80) {
      this.isHidden = false;
    } else if (currentY > this.lastScrollY + 4) {
      this.isHidden = true;
    } else if (currentY < this.lastScrollY - 4) {
      this.isHidden = false;
    }

    this.lastScrollY = currentY;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHidden = false;
  }
  @HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  if (!this.isMenuOpen) return;

  const target = event.target as HTMLElement;

  const clickedInsideMenu = target.closest('.mobile-menu');
  const clickedHamburger = target.closest('.hamburger');

  if (!clickedInsideMenu && !clickedHamburger) {
    this.closeMenu();
  }
}
}

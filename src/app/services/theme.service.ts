import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setDarkTheme(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkTheme(prefersDark);
    }
  }

  toggleTheme() {
    this.setDarkTheme(!this.isDarkTheme.value);
  }

  private setDarkTheme(isDark: boolean) {
    this.isDarkTheme.next(isDark);
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}

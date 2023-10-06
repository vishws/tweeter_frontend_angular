import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(private router: Router) {}

  backToLogin(): void {
    // Navigate to the login page and replace the history entry
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  ngOnInit(): void {
    // Subscribe to the NavigationEnd event and replace the history entry
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1) // Ensure subscription is automatically unsubscribed after the first event
      )
      .subscribe(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-login-app';

  constructor(private router: Router) {}

  profile(): void {
    this.router.navigate(['/user-profile']);
  }
}

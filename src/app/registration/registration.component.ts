import { Component } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  userData: any = {};
  responseMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  registerUser(): void {
    this.responseMessage = null;
    this.errorMessage = null;

    // Check if userData is empty
    if (Object.keys(this.userData).length === 0) {
      alert('Please enter user data before registering.');
      return;
    }

    this.registrationService.registerUser(this.userData).subscribe(
      (response: any) => {
        // Handle a successful registration response here
        console.log(response);

        if (response.Status === 'Success') {
          // Show an alert for successful registration with the message
          alert('Registration successful: ' + response.Message);

          // Set this.responseMessage after successful registration
          this.responseMessage = 'Registration successful: ' + response.Message;

          // Clear the text fields by resetting userData
          this.userData = {};
        } else if (response.Status === 'Error') {
          // Show an alert for registration error with the message and errors
          alert(
            'Registration failed: ' +
              response.Message +
              '\nErrors: ' +
              JSON.stringify(response.Errors)
          );

          // Set this.errorMessage for display (if needed)
          this.errorMessage = 'Registration failed: ' + response.Message;

          // Clear the text fields by resetting userData
          this.userData = {};
        }
      },
      (error) => {
        // Handle registration errors here
        this.errorMessage = 'Registration failed: ' + error.message;

        // Show an alert for registration error with the error message
        alert('Registration failed: ' + error.message);

        // Clear the text fields by resetting userData
        this.userData = {};

        console.error(error);
      }
    );
  }
  goBackToLogin(): void {
    // Use the Router to navigate back to the login page
    this.router.navigate(['/login']); // Replace '/login' with the actual path to your login component
  }
}

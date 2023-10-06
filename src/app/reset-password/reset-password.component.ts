import { Component } from '@angular/core';
import { ResetPasswordService } from '../reset-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetData: any = {
    username: '',
    newPassword: '',
  };

  constructor(
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ) {}

  validateAndReset(): void {
    if (!this.resetData.username || !this.resetData.newPassword) {
      alert('Please fill in all fields.');
    } else {
      this.resetPassword(); // Call your actual reset password method if fields are not blank
    }
  }

  goBackToLogin(): void {
    this.router.navigate(['/login']);
  }

  resetPassword(): void {
    this.resetPasswordService
      .resetPassword(this.resetData.username, this.resetData.newPassword)
      .subscribe(
        (response) => {
          console.log('API Response:', response);

          // Check if the response is valid JSON
          if (typeof response === 'object') {
            // Check if the response indicates a successful reset
            if (response.Status === 'Success') {
              alert(
                `Password reset successful for user: ${this.resetData.username}`
              );
            } else if (response.Status === 'Error') {
              alert(
                `Password reset failed for user ${this.resetData.username}. 
                Reason: ${response.Message}`
              );
            }
          } else {
            console.error('Invalid JSON response:', response);
            alert('Invalid response format. Please try again.');
          }

          // Clear the text fields by resetting resetData
          this.resetData = {
            username: '',
            newPassword: '',
          };

          // Navigate to the login page
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Password reset failed:', error);

          // Log the entire error object
          console.error('Complete Error Object:', error);

          // Check if the error object has a property 'error' (common in Angular HttpClient)
          if (error.error && error.error.Message && error.error.Errors) {
            alert(
              `Password reset failed for user: ${this.resetData.username} Reason: ${error.error.Errors}`
            );
          } else if (error.error && error.error.Message) {
            alert(
              `Password reset failed for user: ${this.resetData.username} Reason: ${error.error.Message}`
            );
          } else {
            alert(
              `Password reset failed for user ${this.resetData.username}. Please try again.`
            );
          }

          // Clear the text fields by resetting resetData
          this.resetData = {
            username: '',
            newPassword: '',
          };

          // Navigate to the login page
          //this.router.navigate(['/login']);
        }
      );
  }
}

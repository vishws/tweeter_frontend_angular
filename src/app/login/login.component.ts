import { Component } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
    rememberMe: false,
  };
  // Define an empty object to hold login data

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    const rememberedPassword = localStorage.getItem('rememberedPassword');

    if (rememberedUsername && rememberedPassword) {
      this.loginData.username = rememberedUsername;
      this.loginData.password = rememberedPassword;
      this.loginData.rememberMe = true;
    }
  }

  loginUser(): void {
    if (this.loginData.rememberMe) {
      localStorage.setItem('rememberedUsername', this.loginData.username);
      localStorage.setItem('rememberedPassword', this.loginData.password);
    } else {
      // If not checked, remove from local storage
      localStorage.removeItem('rememberedUsername');
      localStorage.removeItem('rememberedPassword');
    }

    // Pass the login data to the service method
    this.registrationService.loginUser(this.loginData).subscribe(
      (response: any) => {
        // Handle a successful login response here (if needed)
        console.log(response);

        if (response && response.token) {
          // Store the token securely (you can use localStorage or a service)

          const message = response.Message;
          alert('Login Successful: ' + message);
          try {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
          } catch (e) {
            console.error('Error storing data in local storage:', e);
            // Handle the error as needed
          }

          // console.log('Token:', response.Token);
          // console.log('UserId:', response.UserId);

          // Store the userId in local storage
          //localStorage.setItem('userId', '1019'); // Replace '1019' with the actual user ID

          // Clear the text fields by resetting loginData
          this.loginData = {
            username: '',
            password: '',
            rememberMe: false,
          };

          // You can redirect to another page or perform other actions upon successful login
        } else {
          alert('Login Successful');

          // Clear the text fields by resetting loginData
          this.loginData = {
            username: '',
            password: '',
            rememberMe: false,
          };
        }

        // Display the entire JSON response in the alert
        alert('API Response:\n' + JSON.stringify(response, null, 2));
        this.router.navigate(['/dashboard']);
        console.log('Navigating to dashboard...');
        try {
          localStorage.setItem('Token', response.Token);
          localStorage.setItem('UserId', response.UserId);
          localStorage.setItem('UserName', response.UserName);
        } catch (e) {
          console.error('Error storing data in local storage:', e);
          // Handle the error as needed
        }

        console.log('Token:', response.Token);
        console.log('UserId:', response.UserId);
        console.log('UserName:', localStorage.getItem('UserName'));
      },
      (error) => {
        // Handle login errors here
        console.error(error);

        if (error.error && error.error.Message) {
          alert('Login Error: ' + error.error.Message);
        } else {
          alert('Login Error');
        }

        // Clear the text fields by resetting loginData
        this.loginData = {
          username: '',
          password: '',
          rememberMe: false,
        };
      }
    );
  }
  forgotPassword(): void {
    // Implement your logic for initiating password reset
    // This might involve sending a reset link or navigating to a reset password page
    // For now, let's navigate to the reset password page
    this.router.navigate(['/reset-password']);
  }
}

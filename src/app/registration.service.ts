import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:53678'; // Replace with your API URL

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  registerUser(userData: any) {
    return this.http.post(`${this.apiUrl}/Api/Login/createcontact`, userData);
    //console.log('Register button clicked');
  }

  loginUser(loginData: any) {
    console.log('inside loginUser');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    return this.http.post(`${this.apiUrl}/Api/Login/UserLogin`, loginData, {
      headers,
    });
  }

  getUserDetails(username: string) {
    return this.http.get(
      `${this.apiUrl}/Api/Login/GetUserDetails?username=${username}`
    );
  }
}

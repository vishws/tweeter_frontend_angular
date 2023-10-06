// user-profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://localhost:53678/Api';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<any> {
    if (!userId) {
      // Handle the case where userId is not available
      console.error('User ID not found.');
      return new Observable(); // You might want to handle this case differently
    }

    // Make an HTTP request to fetch user profile based on userId
    return this.http.get(
      `${this.apiUrl}/Login/GetUserProfile/?userid=${userId}`
    );
  }
  updateUserProfile(userId: string, updatedData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/UserProfile/createprofile`,
      updatedData
    );
  }
}

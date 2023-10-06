import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private apiUrl = 'http://localhost:53678/Api/Login/';

  constructor(private http: HttpClient) {}

  resetPassword(username: string, newPassword: string): Observable<any> {
    const resetUrl = `${this.apiUrl}ResetPassword`;

    // You can customize the request headers, body, etc., based on your API requirements
    const body = {
      UserName: username,
      NewPassword: newPassword,
    };

    return this.http.post(resetUrl, body);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MypostsComponent } from './myposts/myposts.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordService } from './reset-password.service';
import { LogoutComponent } from './logout/logout.component';
import { UserProfileService } from './user-profile-service.service';
import { UserProfileComponent } from './user-profile-component/user-profile-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    MypostsComponent,
    ResetPasswordComponent,
    LogoutComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ], // Add FormsModule and HttpClientModule
  providers: [ResetPasswordService, UserProfileService],
  bootstrap: [AppComponent],
})
export class AppModule {}

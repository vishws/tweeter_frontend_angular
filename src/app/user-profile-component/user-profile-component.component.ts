// import { Component, OnInit } from '@angular/core';

// import { UserProfileService } from '../user-profile-service.service';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile-component.component.html',
//   styleUrls: ['./user-profile-component.component.css'],
// })
// export class UserProfileComponent implements OnInit {
//   userProfile: any;

//   constructor(private userProfileService: UserProfileService) {}

//   ngOnInit(): void {
//     const userId = localStorage.getItem('UserId')?.toString();
//     if (userId) {
//       this.loadUserProfile(userId);
//     }
//   }

//   loadUserProfile(userId: string): void {
//     this.userProfileService.getUserProfile(userId).subscribe(
//       (profile: any) => {
//         this.userProfile = profile;
//       },
//       (error: any) => {
//         console.error('Error fetching user profile:', error);
//       }
//     );
//   }
// }

// user-profile.component.ts
// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile-component.component.html',
  styleUrls: ['./user-profile-component.component.css'],
})
export class UserProfileComponent implements OnInit {
  userProfile: any;
  editingBio = false;
  editedBio = '';
  editingProfilePicture = false;
  editedProfilePicture = '';
  defaultProfileImage: string = 'C:Users/vishwsDownloads/tweeter.jpg';
  previewImage: string =
    localStorage.getItem('userProfileImage') || this.defaultProfileImage;
  UserName: string = localStorage.getItem('UserName') ?? '';

  constructor(
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('UserId')?.toString();
    if (userId) {
      this.loadUserProfile(userId);
    }
  }

  loadUserProfile(userId: string): void {
    this.userProfileService.getUserProfile(userId).subscribe(
      (profile: any) => {
        this.userProfile = profile;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  startEditing(field: string): void {
    if (field === 'bio') {
      this.editedBio = this.userProfile.Bio;
      this.editingBio = true;
    } else if (field === 'profilePicture') {
      this.editedProfilePicture = this.userProfile.profilepictureurl;
      this.editingProfilePicture = true;
    }
  }

  saveChanges(field: string): void {
    const userId = localStorage.getItem('UserId')?.toString();
    if (!userId) {
      console.error('User ID not found.');
      return;
    }

    if (field === 'bio') {
      this.userProfile.Bio = this.editedBio;
    } else if (field === 'profilePicture') {
      this.userProfile.profilepictureurl = this.editedProfilePicture;
    }

    // Save changes to the server using the service
    this.userProfileService
      .updateUserProfile(userId, this.userProfile)
      .subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.editingBio = false;
          this.editingProfilePicture = false;
        },
        (error) => {
          console.error('Error updating user profile:', error);
        }
      );
  }

  cancelEditing(field: string): void {
    if (field === 'bio') {
      this.editingBio = false;
    } else if (field === 'profilePicture') {
      this.editingProfilePicture = false;
    }
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    // Perform any necessary operations with the selected file
    // ...

    // Convert the image to a Base64-encoded string
    this.convertImageToBase64(file);
  }

  convertImageToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Update the previewImage with the Base64-encoded string
      this.previewImage = reader.result as string;

      // Store the Base64-encoded string in localStorage
      localStorage.setItem('userProfileImage', this.previewImage);
    };
    reader.readAsDataURL(file);
  }

  ResetPassword(): void {
    // Implement your logic for initiating password reset
    // This might involve sending a reset link or navigating to a reset password page
    // For now, let's navigate to the reset password page
    this.router.navigate(['/reset-password']);
  }

  gobacktohome(): void {
    // Implement your logic for initiating password reset
    // This might involve sending a reset link or navigating to a reset password page
    // For now, let's navigate to the reset password page
    this.router.navigate(['/dashboard']);
  }
}

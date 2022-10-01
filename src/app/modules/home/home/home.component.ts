import { Component, OnInit } from '@angular/core';
import { PhotoItem, User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user!: User;
  photoList: PhotoItem[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {
    // Set the user.
    this.user = this.authService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    // Log the user.
  }

  /**
   * This method handles file input.
   * @method handleFileInput
   */
  handleFileInput(event: any) {
    // File input.
    const file = event.target.files[0];
    // Image to base64.
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Set file item
      const fileItem = {
        id: file.name.split(' ').join('-').toLowerCase().split('.')[0],
        title: file.name.split('.')[0],
        url: reader.result as string,
        albumId: 1,
      };
      // Add the photo to the list.
      this.photoList.push(fileItem);
      // Save the image.
      this.storageService.saveImage(fileItem);
    };
  }

  /**
   * This method handles logout.
   * @method logout
   */
  logout() {
    // Logout.
    this.authService.logout();
  }
}

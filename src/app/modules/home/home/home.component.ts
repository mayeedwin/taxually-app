import { Component, OnInit } from '@angular/core';
import { PhotoItem, User } from 'src/app/models/index.model';
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
  originalList: PhotoItem[] = [];
  searchText: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {
    // Set the user.
    this.user = this.authService.getCurrentUser() as User;
    this.photoList = this.storageService.getSavedPhotos(this.user.email);
    this.originalList = this.photoList;
  }

  ngOnInit(): void {
    // Log the user.
  }

  /**
   * This method handles file search.
   * @method searchFile
   */
  searchFile() {
    // Search the photo list.
    this.photoList = this.originalList.filter((photo) =>
      photo.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  /**
   * This method clears the search text.
   * @method clearSearchText
   */
  clearSearchText() {
    if (this.searchText.length < 3) {
      this.photoList = this.originalList;
    }
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
        userId: this.user.email,
        title: file.name.split('.')[0],
        url: reader.result as string,
        albumId: 1,
      };
      // Add the photo to the list.
      this.photoList.push(fileItem);
      // Save the image.
      this.storageService.saveImage(fileItem);
      // Reset the file input after the image is saved.
      setTimeout(() => {
        event.target.value = '';
      }, 1000);
    };
  }

  /**
   * This method handles image delete.
   * @method deleteFile
   */
  deleteFile(id: string) {
    // Delete the photo.
    this.photoList = this.photoList.filter((photo) => photo.id !== id);
    this.originalList = this.originalList.filter((photo) => photo.id !== id);
    // Save the photo list.
    this.storageService.setStorage(this.originalList);
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

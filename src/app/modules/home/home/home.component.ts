import { Component, OnInit } from '@angular/core';
import { PhotoItem, User } from 'src/app/models/index.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
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
  sortType = 'date-asc' as 'size-asc' | 'size-desc' | 'date-asc' | 'date-desc';
  filterType = 'all' as 'all' | 'smallest' | 'largest';
  uploading = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private globalService: GlobalService
  ) {
    // Set the user.
    this.user = this.authService.getCurrentUser() as User;
    if (this.user) {
      this.photoList = this.storageService.getSavedPhotos(this.user.email);
      this.originalList = this.photoList;
    }
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
   * This method sorts the photo list.
   * @method sortFiles
   */
  sortFiles() {
    // Sort the photo list.
    switch (this.sortType) {
      case 'size-asc':
        this.photoList = this.photoList.sort((a, b) => a.size - b.size);
        break;
      case 'size-desc':
        this.photoList = this.photoList.sort((a, b) => b.size - a.size);
        break;
      case 'date-asc':
        this.photoList = this.photoList.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case 'date-desc':
        this.photoList = this.photoList.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
    }
  }

  /**
   * This method filters the photo list.
   * @method filterFiles
   */
  filterFiles() {
    // Filter the photo list.
    switch (this.filterType) {
      case 'all':
        this.photoList = this.originalList;
        break;
      case 'smallest':
        this.photoList = [this.originalList.sort((a, b) => a.size - b.size)[0]];
        break;
      case 'largest':
        this.photoList = [this.originalList.sort((a, b) => b.size - a.size)[0]];
        break;
    }
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
    // Check if the file is an image.
    if (file.type.includes('image')) {
      // Set uploading to true.
      this.uploading = true;
      // Check if image sixe is less than 1MB.
      if (file.size < 1000000) {
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
            createdAt: new Date().toISOString(),
            size: file.size,
            sizeInKb: Math.round(file.size / 1024),
          };
          // Save the image.
          this.photoList = this.storageService.saveImage(
            fileItem,
            this.user.email
          );
          // Reset the file input after the image is saved.
          setTimeout(() => {
            // Set uploading to false.
            this.uploading = false;
            event.target.value = '';
          }, 1000);
        };
      } else {
        // Show error message.
        this.globalService.setShowAlert.next({
          show: true,
          message: 'Image size should be less than 1MB.',
          type: 'error',
        });
        // Reset the file input.
        event.target.value = '';
        // Set uploading to false.
        this.uploading = false;
      }
    } else {
      // Show error message.
      this.globalService.setShowAlert.next({
        show: true,
        message: 'Please upload an image file.',
        type: 'error',
      });
      // Reset the file input.
      event.target.value = '';
      // Set uploading to false.
      this.uploading = false;
    }
  }

  /**
   * This method handles image delete.
   * @method deleteFile
   */
  deleteFile(id: string) {
    // Delete the image.
    const list = this.storageService.deletePhoto(id, this.user.email);
    // Update the photo list.
    this.photoList = list;
    this.originalList = list;
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

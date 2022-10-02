import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PhotoItem, User } from 'src/app/models/index.model';
import {
  addPhoto,
  filterPhotos,
  loadPhotos,
  removePhoto,
  sortPhotos,
} from 'src/app/state/actions/index.actions';
import { selectPhotosState } from 'src/app/state/index.state';
import { AuthService } from '../../../services/auth/auth.service';
import { GlobalService } from '../../../services/global/global.service';
import { StorageService } from '../../../services/storage/storage.service';

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
  photos$ = this.store.select(selectPhotosState);

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private globalService: GlobalService,
    private store: Store
  ) {
    // Set the user.
    this.user = this.authService.getCurrentUser() as User;
    if (this.user) {
      this.photoList = this.storageService.getSavedPhotos(this.user.email);
      this.originalList = this.storageService.getSavedPhotos(this.user.email);
      // Dispatch the action to load the photos.
      this.store.dispatch(
        loadPhotos({
          photos: this.storageService.getSavedPhotos(this.user.email),
        })
      );
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
    // Dispatch the action to sort the photos.
    this.store.dispatch(sortPhotos({ sortType: this.sortType }));
  }

  /**
   * This method filters the photo list.
   * @method filterFiles
   */
  filterFiles() {
    // Get original list.
    this.originalList = this.storageService.getSavedPhotos(this.user.email);
    // Dispatch the action to filter the photos.
    this.store.dispatch(
      filterPhotos({ filterType: this.filterType, data: this.originalList })
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
          this.storageService.saveImage(fileItem, this.user.email);
          // Dispatch the action to add a photo.
          this.store.dispatch(addPhoto({ photo: fileItem }));
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
    this.storageService.deletePhoto(id, this.user.email);
    // Dispatch the action remove the photo.
    this.store.dispatch(removePhoto({ id }));
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

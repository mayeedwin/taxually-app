import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PhotoItem, User } from 'src/app/models/index.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import {
  addPhoto,
  filterPhotos,
  loadPhotos,
  removePhoto,
  sortPhotos,
} from 'src/app/state/actions/index.actions';
import { selectPhotosState } from 'src/app/state/selectors/index.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user!: User;
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
  }

  ngOnInit(): void {
    // Log the user.
    if (this.user) {
      // Dispatch the action to load the photos.
      this.store.dispatch(
        loadPhotos({
          userId: this.user.email,
        })
      );
    }
  }

  /**
   * This method sorts the photo list.
   * @method sortFiles
   */
  sortFiles() {
    // Dispatch the action to sort the photos.
    this.store.dispatch(
      sortPhotos({ sortType: this.sortType, userId: this.user.email })
    );
  }

  /**
   * This method filters the photo list.
   * @method filterFiles
   */
  filterFiles() {
    // Dispatch the action to filter the photos.
    this.store.dispatch(
      filterPhotos({ filterType: this.filterType, userId: this.user.email })
    );
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
      // Check if the image is of type jpeg or png.
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
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
            // Dispatch the action to add a photo.
            this.store.dispatch(
              addPhoto({ photo: fileItem, userId: this.user.email })
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
            message: 'Image size should be less than or max 1MB.',
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
          message: 'Image type should be jpeg or png.',
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
    // Dispatch the action remove the photo.
    this.store.dispatch(removePhoto({ id, userId: this.user.email }));
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

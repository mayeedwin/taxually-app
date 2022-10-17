import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoItem } from 'src/app/models/index.model';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Properties.
  photoList: PhotoItem[] = [];

  constructor(private globalService: GlobalService) {
    // Get the photo list from local storage.
    const savedPhotoList = JSON.parse(
      localStorage.getItem('photoList') || '[]'
    );
    // Set the photo list.
    this.photoList = savedPhotoList;
  }

  /**
   * This method saves an image file.
   * @method saveImage
   */
  saveImage(image: PhotoItem, userId: string | number) {
    // Get current list.
    const currentList = this.getSavedPhotosList();
    // Check if image exists.
    const imageExists = currentList.find(
      (item) => item.id === image.id && item.userId === userId
    );
    // If image exists, return.
    if (imageExists) {
      // Show alert.
      this.globalService.setShowAlert.next({
        show: true,
        message: 'Image already exists.',
        type: 'error',
      });
      // Return the photo list.
      return this.getSavedPhotos(userId);
    } else {
      // Save the image to local storage.
      currentList.push(image);
      // Save the photo list to local storage.
      this.setStorage(currentList);
      // Show alert.
      this.globalService.setShowAlert.next({
        show: true,
        message: 'Image saved successfully.',
        type: 'success',
      });
      // Return the photo list.
      return this.getSavedPhotos(userId);
    }
  }

  /**
   * This method sets storage.
   * @method setStorage
   */
  setStorage(files: PhotoItem[]) {
    // Save the photo list to local storage.
    localStorage.setItem('photoList', JSON.stringify(files));
  }

  /**
   * This method gets the saved photos.
   * @method getSavedPhotos
   * @returns {PhotoItem[]}
   */
  getSavedPhotosList(): PhotoItem[] {
    return JSON.parse(localStorage.getItem('photoList') || '[]');
  }

  /**
   * This method returns saved photos.
   * @method getSavedPhotos
   */
  getSavedPhotos(userId?: string | number): Observable<PhotoItem[]> {
    return new Observable((observable) => {
      // Get the photo list from local storage.
      const savedPhotoList = this.getSavedPhotosList();
      // Set the photo list, for a specific user.
      this.photoList = userId
        ? savedPhotoList.filter(
            (saved: { userId: string | number }) => saved.userId === userId
          )
        : savedPhotoList;
      // Send data to the observable.
      observable.next(
        this.photoList.sort((a, b) => {
          const dateA = new Date(a.createdAt) as Date;
          const dateB = new Date(b.createdAt) as Date;
          return dateA.getTime() - dateB.getTime();
        })
      );
    });
  }

  /**
   * This method deletes a photo.
   * @method deletePhoto
   */
  deletePhoto(
    id: string | number,
    userId: string | number
  ): Observable<PhotoItem[]> {
    // Delete the photo from the list, for a specific user.
    const newList = this.getSavedPhotosList();
    // Get index of photo to delete.
    const index = newList.findIndex(
      (item) => item.id === id && item.userId === userId
    );
    // Delete the photo.
    newList.splice(index, 1);
    // Set the storage.
    this.setStorage(newList);
    // Show alert.
    this.globalService.setShowAlert.next({
      show: true,
      message: 'Image deleted successfully.',
      type: 'success',
    });
    // Return the photo list.
    return this.getSavedPhotos(userId);
  }

  /**
   * This method sorts the photo list.
   * @method sortPhotoList
   */
  sortPhotoList(
    sortBy: string,
    userId: string | number
  ): Observable<PhotoItem[]> {
    return new Observable((observable) => {
      // Sort the photo list.
      this.photoList = this.getSavedPhotosList().filter(
        (item) => item.userId === userId
      );
      // Sort the list of photos based on the sort type.
      switch (sortBy) {
        case 'size-asc':
          observable.next(this.photoList.sort((a, b) => a.size - b.size));
          break;
        case 'size-desc':
          observable.next(this.photoList.sort((a, b) => b.size - a.size));
          break;
        case 'date-asc':
          observable.next(
            this.photoList.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateA.getTime() - dateB.getTime();
            })
          );
          break;
        case 'date-desc':
          observable.next(
            this.photoList.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateB.getTime() - dateA.getTime();
            })
          );
          break;
        default:
          observable.next(this.photoList);
          break;
      }
    });
  }

  /**
   * This method filters the photo list.
   * @method filterPhotoList
   * @returns {PhotoItem[]}
   */
  filterPhotoList(
    filterBy: string,
    userId: string | number
  ): Observable<PhotoItem[]> {
    return new Observable((observable) => {
      // Filter the photo list.
      this.photoList = this.getSavedPhotosList().filter(
        (item) => item.userId === userId
      );
      // Filter the photo list.
      switch (filterBy) {
        case 'all':
          return observable.next(this.photoList);
        case 'smallest':
          return observable.next(
            this.photoList.sort((a, b) => a.size - b.size).slice(0, 1)
          );
        case 'largest':
          return observable.next(
            this.photoList.sort((a, b) => b.size - a.size).slice(0, 1)
          );
        default:
          return observable.next(this.photoList);
      }
    });
  }
}

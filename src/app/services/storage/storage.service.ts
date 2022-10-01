import { Injectable } from '@angular/core';
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
    const currentList = this.getSavedPhotos();
    // Check if image exists.
    const imageExists = currentList.find((item) => item.id === image.id);
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
   * This method returns saved photos.
   * @method getSavedPhotos
   */
  getSavedPhotos(userId?: string | number) {
    // Get the photo list from local storage.
    const savedPhotoList = JSON.parse(
      localStorage.getItem('photoList') || '[]'
    );
    // Set the photo list, for a specific user.
    this.photoList = userId
      ? savedPhotoList.filter(
          (saved: { userId: string | number }) => saved.userId === userId
        )
      : savedPhotoList;
    // Return the photo list sorted by date created.
    return this.photoList.sort((a, b) => {
      const dateA = new Date(a.createdAt) as Date;
      const dateB = new Date(b.createdAt) as Date;
      return dateA.getTime() - dateB.getTime();
    });
  }

  /**
   * This method deletes a photo.
   * @method deletePhoto
   */
  deletePhoto(id: string | number, userId: string | number) {
    // Delete the photo from the list.
    const newList = this.getSavedPhotos();
    const filteredList = newList.filter((item) => item.id !== id);
    // Set the photo list.
    this.setStorage(filteredList);
    // Show alert.
    this.globalService.setShowAlert.next({
      show: true,
      message: 'Image deleted successfully.',
      type: 'success',
    });
    // Return the photo list.
    return this.getSavedPhotos(userId);
  }
}

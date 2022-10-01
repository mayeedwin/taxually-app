import { Injectable } from '@angular/core';
import { PhotoItem } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Properties.
  photoList: PhotoItem[] = [];

  constructor() {
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
  saveImage(image: PhotoItem) {
    // Check if image exists.
    const imageExists = this.getSavedPhotos().find(
      (item) => item.id === image.id
    );
    // If image exists, return.
    if (imageExists) {
      console.log('Image already exists.');
      // Update the image.
      this.photoList = this.photoList.map((item) => {
        if (item.id === image.id) {
          item = image;
        }
        return item;
      });
    } else {
      // Save the image to local storage.
      this.setStorage([...this.photoList, image]);
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
  getSavedPhotos() {
    // Get the photo list from local storage.
    const savedPhotoList = JSON.parse(
      localStorage.getItem('photoList') || '[]'
    );
    // Set the photo list.
    this.photoList = savedPhotoList;
    // Return the photo list.
    return this.photoList;
  }

  /**
   * This method deletes a photo.
   * @method deletePhoto
   */
  deletePhoto(photo: PhotoItem) {
    // Delete the photo from the list.
    this.photoList = this.photoList.filter((item) => item.id !== photo.id);
    // Set the photo list to local storage.
    localStorage.setItem('photoList', JSON.stringify(this.photoList));
    // Return the photo list.
    return this.photoList;
  }
}

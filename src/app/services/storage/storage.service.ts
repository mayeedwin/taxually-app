import { Injectable } from '@angular/core';
import { PhotoItem } from 'src/app/models/index.model';

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
  deletePhoto(photo: PhotoItem) {
    // Delete the photo from the list.
    this.photoList = this.photoList.filter((item) => item.id !== photo.id);
    // Set the photo list to local storage.
    localStorage.setItem('photoList', JSON.stringify(this.photoList));
    // Return the photo list.
    return this.photoList;
  }
}

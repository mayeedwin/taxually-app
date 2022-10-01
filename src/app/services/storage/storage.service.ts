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
    // Save the image to local storage.
    this.setStorage([image]);
  }

  /**
   * This method sets storage.
   * @method setStorage
   */
  setStorage(files: PhotoItem[]) {
    // Save the photo list to local storage.
    localStorage.setItem(
      'photoList',
      JSON.stringify([...this.photoList, ...files])
    );
  }
}

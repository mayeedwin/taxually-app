import { Component, Input, OnInit } from '@angular/core';
import { PhotoItem } from 'src/app/models';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  // Input.
  @Input() data!: PhotoItem;

  constructor() {}

  ngOnInit(): void {}

  /**
   * This method handles image delete.
   * @method deleteFile
   */
  deleteFile() {
    const id = this.data.id;
    console.log(id);
  }
}

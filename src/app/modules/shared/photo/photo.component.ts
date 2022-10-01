import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PhotoItem } from 'src/app/models/index.model';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  // Input.
  @Input() data!: PhotoItem;
  @Output() deleteFileEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  /**
   * This method handles image delete.
   * @method deleteFile
   */
  deleteFile() {
    const id = this.data.id;
    this.deleteFileEvent.emit(id);
  }
}

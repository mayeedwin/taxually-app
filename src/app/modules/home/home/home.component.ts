import { Component, OnInit } from '@angular/core';
import { PhotoItem } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  photoList: PhotoItem[] = [
    {
      id: 1,
      title: 'Photo 1',
      url: 'https://via.placeholder.com/600/92c952',
      albumId: 1,
    },
    {
      id: 2,
      title: 'Photo 2',
      url: 'https://via.placeholder.com/600/771796',
      albumId: 1,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

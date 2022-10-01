import { Component, OnInit } from '@angular/core';
import { PhotoItem, User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user!: User;
  photoList: PhotoItem[] = [
    // {
    //   id: 1,
    //   title: 'Photo 1',
    //   url: 'https://via.placeholder.com/600/92c952',
    //   albumId: 1,
    // },
    // {
    //   id: 2,
    //   title: 'Photo 2',
    //   url: 'https://via.placeholder.com/600/771796',
    //   albumId: 1,
    // },
  ];
  constructor(private authService: AuthService) {
    // Set the user.
    this.user = this.authService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    // Log the user.
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

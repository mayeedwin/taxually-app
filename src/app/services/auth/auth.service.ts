import { Injectable } from '@angular/core';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Properties.
  usersDB = [] as User[];

  constructor() {
    // Check if there are users in local storage.
    const users = localStorage.getItem('users');
    // Set the users.
    const usersInDB = users
      ? JSON.parse(users)
      : [
          {
            id: 1,
            firstName: 'Maye',
            lastName: 'Edwin',
            email: 'em@sky.garden',
            password: '123456',
          },
        ];
    // Set the users in the database.
    this.usersDB = usersInDB;
  }

  /**
   * This  method logs in a user.
   * @method login
   */
  login(
    email: string,
    password: string
  ): { status: 'success' | 'error'; message: string; data: User | null } {
    // Find the user.
    const user = this.usersDB.find((user) => user.email === email);
    // Check if the user exists.
    if (user) {
      // Check if the password is correct.
      if (user.password === password) {
        // Set the user in local storage.
        localStorage.setItem('user', JSON.stringify(user));
        return {
          status: 'success',
          message: 'Login successful',
          data: user,
        };
      } else {
        return {
          status: 'error',
          message: 'Incorrect password',
          data: null,
        };
      }
    } else {
      return {
        status: 'error',
        message: 'User not found',
        data: null,
      };
    }
  }

  /**
   * This method logs out a user.
   * @method logout
   */
  logout() {
    // Remove the user from local storage.
    localStorage.removeItem('user');
  }
}

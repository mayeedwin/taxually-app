import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Properties.
  usersDB = [] as User[];

  constructor(private router: Router) {
    // Check if there are users in local storage.
    const users = localStorage.getItem('users');
    // Set the users.
    const usersInDB = users ? JSON.parse(users) : [];
    // Set the users in the database.
    this.setUsers(usersInDB);
  }

  /**
   * This method returns the current user.
   * @method getCurrentUser
   */
  getCurrentUser(): User | null {
    // Get the user from local storage.
    const user = localStorage.getItem('user');
    // Check if the user exists.
    return user ? JSON.parse(user) : null;
  }

  /**
   * This method sets the users in the database.
   * @method setUsers
   */
  setUsers(users: User[]) {
    // Save to local storage.
    localStorage.setItem('users', JSON.stringify(users));
    // Set state.
    this.usersDB = users;
  }

  /**
   * This method signs up a user.
   * @method signup
   */
  signup(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    // Save the user to local storage.
    const currentUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if the user exists.
    const userExists = currentUsers.find(
      (user: { email: string }) => user.email === data.email
    );
    // Check if the user exists.
    if (userExists) {
      return {
        status: 'error',
        message: 'Sorry, email provided already in use',
        data: null,
      };
    } else {
      // Create the user.
      const user = {
        id: currentUsers.length + 1,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };
      // Save the user to local storage.
      this.setUsers([...currentUsers, user]);
      return {
        status: 'success',
        message: 'Signup successful',
        data: user,
      };
    }
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
          message: 'Congrats! You are logged in',
          data: user,
        };
      } else {
        return {
          status: 'error',
          message: 'Please check your password',
          data: null,
        };
      }
    } else {
      return {
        status: 'error',
        message: 'Sorry, user does not exist',
        data: null,
      };
    }
  }

  /**
   * This method checks if user is logged in.
   * @method isLoggedIn
   */
  isLoggedIn(): boolean {
    // Check if the user exists.
    return this.getCurrentUser() ? true : false;
  }

  /**
   * This method logs out a user.
   * @method logout
   */
  logout() {
    // Remove the user from local storage.
    localStorage.removeItem('user');
    // Navigate to the login page.
    this.router.navigate(['/login']);
  }
}

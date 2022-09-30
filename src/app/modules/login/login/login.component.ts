import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Properties.
  loginForm: FormGroup;
  signupForm: FormGroup;
  showLogin: boolean = false;

  constructor(private fb: FormBuilder) {
    // Set up the login form.
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // Setup signup form.
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  /**
   * This method handles form submission.
   * @method onSubmit
   */
  onSubmit(action: 'signin' | 'signup') {
    // Switch on the action.
    switch (action) {
      case 'signin':
        // Sign in.
        console.log('Sign in', this.loginForm.value);
        console.log('Status', this.loginForm.status);
        break;
      case 'signup':
        // Sign up.
        console.log('Sign up', this.signupForm.value);
        break;
      default:
        break;
    }
  }

  /**
   * This method returns the email control.
   * @method emailControl
   */
  get emailControl() {
    return this.loginForm.get('email');
  }

  /**
   * This method returns the password control.
   * @method passwordControl
   */
  get passwordControl() {
    return this.loginForm.get('password');
  }

  /**
   * This method returns the first name control.
   * @method firstNameControl
   */
  get firstNameControl() {
    return this.signupForm.get('firstName');
  }

  /**
   * This method returns the last name control.
   * @method lastNameControl
   */
  get lastNameControl() {
    return this.signupForm.get('lastName');
  }

  /**
   * This method returns the email control.
   * @method signupEmailControl
   */
  get signupEmailControl() {
    return this.signupForm.get('email');
  }

  /**
   * This method returns the password control.
   * @method signupPasswordControl
   */
  get signupPasswordControl() {
    return this.signupForm.get('password');
  }

  /**
   * This method returns the confirm password control.
   * @method confirmPasswordControl
   */
  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword');
  }
}

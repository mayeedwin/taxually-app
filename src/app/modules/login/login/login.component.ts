import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Properties.
  loginForm: FormGroup;
  signupForm: FormGroup;
  showLogin: boolean = true;
  alert: {
    show: boolean;
    message: string;
  } = {
    show: false,
    message: '',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
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
        const { email, password } = this.loginForm.value;
        // Authenticate the user.
        const res = this.authService.login(email, password);
        // Check the response.
        if (res.status === 'success') {
          // Navigate to the dashboard.
          this.router.navigate(['/']);
        } else {
          // Show an error message.
          this.alert = {
            show: true,
            message: res.message,
          };
          // Hide the alert after 3 seconds.
          setTimeout(() => {
            this.alert.show = false;
          }, 3000);
        }
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

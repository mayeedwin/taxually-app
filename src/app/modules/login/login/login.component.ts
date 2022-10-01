import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
    private router: Router,
    private titleService: Title
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
      signupEmail: ['', [Validators.required, Validators.email]],
      signupPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Set the page title.
    this.titleService.setTitle('Login - Taxually Assessment');
  }

  /**
   * This method sets auth view.
   * @method setAuthView
   */
  setAuthView(view: 'login' | 'signup') {
    // Set the view.
    this.showLogin = view === 'login' ? true : false;
    // Set the page title.
    this.titleService.setTitle(
      this.showLogin
        ? 'Login - Taxually Assessment'
        : 'Signup - Taxually Assessment'
    );
  }

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
        const { firstName, lastName, signupEmail, signupPassword } =
          this.signupForm.value;
        const signupRes = this.authService.signup({
          // Sign up the user.
          firstName,
          lastName,
          email: signupEmail,
          password: signupPassword,
        });
        // Check the response.
        if (signupRes.status === 'success') {
          // Authenticate the user.
          this.authService.login(signupEmail, signupPassword);
          // Navigate to the dashboard.
          this.router.navigate(['/']);
        } else {
          // Show an error message.
          this.alert = {
            show: true,
            message: signupRes.message,
          };
          // Hide the alert after 3 seconds.
          setTimeout(() => {
            this.alert.show = false;
          }, 3000);
        }
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

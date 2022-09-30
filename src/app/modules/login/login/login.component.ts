import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    // Set up the login form.
    this.loginForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
    // Setup signup form.
    this.signupForm = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  ngOnInit(): void {}
}

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/modules/login/login/login.component';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('user can be authenticated', () => {
    const user = {
      email: 'me@hmail.com',
      password: '123456',
    };
    const res = service.login(user.email, user.password);
    expect(res.message).toBe('Sorry, user does not exist');
  });

  test('user can be logged out', () => {
    service.logout();
  });

  test('can get loggedin status', () => {
    const res = service.isLoggedIn();
    expect(res).toBe(false);
  });
});

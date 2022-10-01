import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let dom: any;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, SharedModule],
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dom = fixture.nativeElement;
  });

  test(`should have 'Taxually.com' size alert `, () => {
    fixture.detectChanges();
    expect(dom.innerHTML).toContain('Taxually.com');
    expect(dom.innerHTML).toContain('Note : Max file size for upload is 1MB');
  });

  test(`should have file input`, () => {
    fixture.detectChanges();
    // Check it has an file input.
    expect(dom.querySelector('input[type="file"]')).toBeTruthy();
  });

  test(`renders a list of photo item`, () => {
    fixture.detectChanges();
    // Check it has an element with class 'photo' after 5 seconds.
    setTimeout(() => {
      expect(dom.querySelector('.photo')).toBeTruthy();
    }, 4000);
  });

  test(`all img tags should have src attribute and alt attribute`, () => {
    fixture.detectChanges();
    // Check it has an element with class 'photo' after 5 seconds.
    setTimeout(() => {
      const images = dom.querySelectorAll('img');
      // Check if all images have src and alt attributes.
      images.forEach((image: any) => {
        expect(image.src).toBeTruthy();
        expect(image.alt).toBeTruthy();
      });
    }, 5000);
  });
});

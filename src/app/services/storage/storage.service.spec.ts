import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  // Set initial data.
  const initial = [
    {
      id: '1',
      url: 'https://www.google.com',
      title: 'Google',
      albumId: 1,
      userId: '1',
      createdAt: '2020-01-01',
      size: 100,
      sizeInKb: 100,
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('can get data & save data', () => {
    // Get saved data.
    const res = service.getSavedPhotos();
    expect(res).toEqual([]);
    // Save data.
    service.setStorage(initial);
    // Get saved data again.
    const res2 = service.getSavedPhotos();
    expect(res2).toEqual(initial);
  });

  test('can save and delete a photo', () => {
    // Save data.
    service.saveImage(initial[0], 'em@taxually.com');
    // Delete data.
    service.deletePhoto(initial[0].id, 'em@taxually.com');
  });
});

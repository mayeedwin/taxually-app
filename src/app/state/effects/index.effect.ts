import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  EMPTY,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import {
  addPhoto,
  filterPhotos,
  loadPhotos,
  photoAdded,
  photoRemoved,
  photosFiltered,
  photosLoaded,
  photosSorted,
  removePhoto,
  sortPhotos,
} from '../actions/index.actions';

@Injectable()
export class photosEffects {
  constructor(
    private storageService: StorageService,
    private actions: Actions
  ) {}

  /**
   * Load saved photos effect.
   */
  loadPhotos$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadPhotos),
      exhaustMap(() =>
        this.storageService
          .getSavedPhotos()
          .pipe(map((photos) => photosLoaded({ photos })))
      ),
      catchError(() => EMPTY)
    )
  );

  /**
   * Add photo effect.
   */
  addPhoto$ = createEffect(() =>
    this.actions.pipe(
      ofType(addPhoto),
      mergeMap((action) =>
        this.storageService
          .saveImage(action.photo, action.userId)
          .pipe(map((photos) => photoAdded({ photos })))
      ),
      catchError(() => EMPTY)
    )
  );

  /**
   * Remove photo effect.
   */
  removePhoto$ = createEffect(() =>
    this.actions.pipe(
      ofType(removePhoto),
      mergeMap((action) =>
        this.storageService
          .deletePhoto(action.id, action.userId)
          .pipe(map((photos) => photoRemoved({ photos })))
      ),
      catchError(() => EMPTY)
    )
  );

  /**
   * Sort photos effect.
   */
  sortPhotos$ = createEffect(() =>
    this.actions.pipe(
      ofType(sortPhotos),
      switchMap((action) =>
        this.storageService
          .sortPhotoList(action.sortType, action.userId)
          .pipe(map((photos) => photosSorted({ photos })))
      ),
      catchError(() => EMPTY)
    )
  );

  /**
   * Filter photos effect.
   */
  filterPhotos$ = createEffect(() => {
    return this.actions.pipe(
      ofType(filterPhotos),
      switchMap((action) =>
        this.storageService
          .filterPhotoList(action.filterType, action.userId)
          .pipe(map((photos) => photosFiltered({ photos })))
      ),
      catchError(() => EMPTY)
    );
  });
}

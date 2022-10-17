import { createAction, props } from '@ngrx/store';
import { PhotoItem } from 'src/app/models/index.model';

/**
 * Action to load all list of saved photos
 */
export const loadPhotos = createAction(
  '[Photos] Load Photos(User)',
  props<{ userId: string }>()
);

/**
 * Action when all saved photos are loaded successfully
 */
export const photosLoaded = createAction(
  '[Photos] Load Photos Success',
  props<{ photos: PhotoItem[] }>()
);

/**
 * Action to add a new photo to the list of saved photos
 */
export const addPhoto = createAction(
  '[Photos] Add Photo',
  props<{ photo: PhotoItem; userId: string }>()
);

/**
 * Action when a new photo is added successfully
 */

export const photoAdded = createAction(
  '[Photos] Add Photo Success',
  props<{ photos: PhotoItem[] }>()
);

/**
 * Action to remove a photo from the list of saved photos
 */
export const removePhoto = createAction(
  '[Photos] Remove Photo',
  props<{ id: string; userId: string }>()
);

/**
 * Action when a photo is removed successfully
 */

export const photoRemoved = createAction(
  '[Photos] Remove Photo Success',
  props<{ photos: PhotoItem[] }>()
);

/**
 * Action to sort the list of saved photos
 */
export const sortPhotos = createAction(
  '[Photos] Sort Photos',
  props<{
    sortType: 'size-asc' | 'size-desc' | 'date-asc' | 'date-desc';
    userId: string;
  }>()
);

/**
 * Action when the list of saved photos is sorted successfully
 */

export const photosSorted = createAction(
  '[Photos] Sort Photos Success',
  props<{ photos: PhotoItem[] }>()
);

/**
 * Action to filter the list of saved photos
 */
export const filterPhotos = createAction(
  '[Photos] Filter Photos',
  props<{
    filterType: 'all' | 'smallest' | 'largest';
    userId: string;
  }>()
);

/**
 * Action when the list of saved photos is filtered successfully
 */

export const photosFiltered = createAction(
  '[Photos] Filter Photos Success',
  props<{ photos: PhotoItem[] }>()
);

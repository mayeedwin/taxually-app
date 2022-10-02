import { createAction, props } from '@ngrx/store';
import { PhotoItem } from 'src/app/models/index.model';

/**
 * Action to load all list of saved photos
 *
 */
export const loadPhotos = createAction(
  '[Photos] Load Photos(User)',
  props<{ photos: PhotoItem[] }>()
);

/**
 * Action to add a new photo to the list of saved photos
 */
export const addPhoto = createAction(
  '[Photos] Add Photo',
  props<{ photo: PhotoItem }>()
);

/**
 * Action to remove a photo from the list of saved photos
 */
export const removePhoto = createAction(
  '[Photos] Remove Photo',
  props<{ id: string }>()
);

/**
 * Action to sort the list of saved photos
 */
export const sortPhotos = createAction(
  '[Photos] Sort Photos',
  props<{ sortType: 'size-asc' | 'size-desc' | 'date-asc' | 'date-desc' }>()
);

/**
 * Action to filter the list of saved photos
 */
export const filterPhotos = createAction(
  '[Photos] Filter Photos',
  props<{ filterType: 'all' | 'smallest' | 'largest'; data: PhotoItem[] }>()
);

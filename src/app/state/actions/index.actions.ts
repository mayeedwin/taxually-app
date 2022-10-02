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

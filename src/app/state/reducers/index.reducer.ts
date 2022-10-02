import { createReducer, on } from '@ngrx/store';
import { PhotoItem } from 'src/app/models/index.model';
import { addPhoto, loadPhotos, removePhoto } from '../actions/index.actions';

// Define initial state for the photos reducer.
export const initialState: PhotoItem[] = [];

/**
 * Reducer to handle the actions related to the photos.
 */
export const photosReducer = createReducer(
  initialState,
  on(
    loadPhotos,
    (state, { photos }) =>
      // Return the list of photos from the action.
      photos
  ),
  on(addPhoto, (state, { photo }) =>
    // Check if the photo already exists, if not add it to the list.
    state.find((item) => item.id === photo.id) ? state : [...state, photo]
  ),
  on(removePhoto, (state, { id }) =>
    // Filter out the photo with the given id.
    state.filter((item) => item.id !== id)
  )
);

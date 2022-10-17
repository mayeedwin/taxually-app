import { createReducer, on } from '@ngrx/store';
import { PhotoItem } from 'src/app/models/index.model';
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

// Define initial state for the photos reducer.
export const initialState: PhotoItem[] = [];

/**
 * Reducer to handle the actions related to the photos.
 */
export const photosReducer = createReducer(
  initialState,
  on(loadPhotos, (state) => state),
  on(photosLoaded, (state, { photos }) => {
    return [...state, ...photos];
  }),
  on(addPhoto, (state) => state),
  on(photoAdded, (state, { photos }) =>  photos),
  on(removePhoto, (state) => state),
  on(photoRemoved, (state, { photos }) => photos),
  on(sortPhotos, (state) => state),
  on(photosSorted, (state, { photos }) => photos),
  on(filterPhotos, (state) => state),
  on(photosFiltered, (state, { photos }) => photos)
);

import { createReducer, on } from '@ngrx/store';
import { PhotoItem } from 'src/app/models/index.model';
import {
  addPhoto,
  filterPhotos,
  loadPhotos,
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
  ),
  on(sortPhotos, (state, { sortType }) => {
    // Sort the list of photos based on the sort type.
    switch (sortType) {
      case 'size-asc':
        return [...state].sort((a, b) => a.size - b.size);
      case 'size-desc':
        return [...state].sort((a, b) => b.size - a.size);
      case 'date-asc':
        return [...state].sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA.getTime() - dateB.getTime();
        });
      case 'date-desc':
        return [...state].sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
      default:
        return state;
    }
  }),
  on(filterPhotos, (state, { filterType, data }) => {
    // Filter the list of photos based on the filter type.
    const photos = [...data];
    switch (filterType) {
      case 'all':
        return photos;
      case 'smallest':
        return photos.sort((a, b) => a.size - b.size).slice(0, 1);
      case 'largest':
        return photos.sort((a, b) => b.size - a.size).slice(0, 1);
      default:
        return state;
    }
  })
);

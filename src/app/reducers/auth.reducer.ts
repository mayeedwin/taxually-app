import { createReducer, on } from '@ngrx/store';
import { getFiles } from '../actions/index.actions';
import { PhotoItem } from '../models/index.model';

// State interface.
interface AppState {
  photos: PhotoItem[];
}

// Initial state.
const initialState: AppState = {
  photos: [],
};

// Create photos reducer.
export const photosReducer = createReducer(
  initialState,
  on(getFiles, (state, { userId }) => {
    return {
      ...state,
      photos: state.photos.filter((photo) => photo.userId === userId),
    };
  })
);

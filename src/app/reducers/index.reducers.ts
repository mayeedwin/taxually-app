import { createReducer, on } from '@ngrx/store';
import { getFiles } from '../actions/index.actions';
import { PhotoItem } from '../models/index.model';

// Set initial state interface.
interface State {
  list: PhotoItem[];
}

// Set initial state.
const initialStete: State = {
  list: [],
};

// Create reducer.
export const photosReducer = createReducer(
  initialStete,
  on(getFiles, (state, { userId }) => {
    console.log('userId', userId);
    return {
      ...state,
      list: state.list.filter((photo) => photo.userId === userId),
    };
  })
);

import { createAction, props } from '@ngrx/store';
import { PhotoItem } from '../models/index.model';

// Get files action.
export const getFiles = createAction(
  '[Home] Get Files',
  props<{ userId: string }>()
);

// Set files actions
export const setFiles = createAction(
  '[Home] Set Files',
  props<{
    list: PhotoItem[];
  }>()
);

// Add file action.
export const addFile = createAction(
  '[Home] Add File',
  props<{
    file: PhotoItem;
  }>()
);

// Delete file action.
export const deleteFile = createAction(
  '[Home] Delete File',
  props<{
    id: string;
  }>()
);

// Home page view action.
export const homePageView = createAction('[Home] Home Page View');

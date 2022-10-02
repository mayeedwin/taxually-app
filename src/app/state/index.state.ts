import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PhotoItem } from '../models/index.model';

/**
 * Select the photos state from the root state.
 */
export const selectPhotosState = createFeatureSelector<PhotoItem[]>('photos');

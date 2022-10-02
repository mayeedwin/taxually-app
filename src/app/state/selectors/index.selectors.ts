import { createFeatureSelector } from '@ngrx/store';
import { PhotoItem } from 'src/app/models/index.model';

/**
 * Select the photos state from the root state.
 */
export const selectPhotosState = createFeatureSelector<PhotoItem[]>('photos');

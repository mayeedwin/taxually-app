import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectPhotos = createFeatureSelector<any>('photos');

export const selectFiles = createSelector(selectPhotos, (state) => state);

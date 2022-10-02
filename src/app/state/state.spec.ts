import { PhotoItem } from '../models/index.model';
import { loadPhotos } from './actions/index.actions';
import { photosReducer } from './reducers/index.reducer';

// Test photos reducer
describe('Photos Reducer', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = photosReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('should return the list of photos', () => {
    const photos = [
      {
        id: '1',
        title: 'photo1',
        size: 100,
        createdAt: '2020-01-01',
        url: 'https://example.com/photo1.jpg',
      },
      {
        id: '2',
        title: 'photo2',
        size: 200,
        createdAt: '2020-01-02',
        url: 'https://example.com/photo2.jpg',
      },
    ] as PhotoItem[];
    const action = loadPhotos({ photos });
    const state = photosReducer(undefined, action);
    expect(state).toEqual(photos);
  });
});

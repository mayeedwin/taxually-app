export interface PhotoItem {
  id: number | string;
  albumId: number;
  userId: string | number;
  title: string;
  url: string;
  type?: string;
}

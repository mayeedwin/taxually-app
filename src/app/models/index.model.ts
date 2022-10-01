interface PhotoItem {
  id: number | string;
  albumId: number;
  userId: string | number;
  title: string;
  url: string;
  type?: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export { PhotoItem, User };

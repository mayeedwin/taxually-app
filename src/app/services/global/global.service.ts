import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // Properties.
  setShowAlert = new Subject<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>();

  constructor() {}
}

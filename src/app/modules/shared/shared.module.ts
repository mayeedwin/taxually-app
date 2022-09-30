import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [PhotoComponent],
  imports: [CommonModule],
  exports: [PhotoComponent],
})
export class SharedModule {}

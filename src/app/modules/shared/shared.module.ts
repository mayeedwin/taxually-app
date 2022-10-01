import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo/photo.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [PhotoComponent, AlertComponent],
  imports: [CommonModule],
  exports: [PhotoComponent, AlertComponent],
})
export class SharedModule {}

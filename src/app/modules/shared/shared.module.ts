import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo/photo.component';
import { AlertComponent } from './alert/alert.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PhotoComponent, AlertComponent],
  imports: [CommonModule, FormsModule],
  exports: [PhotoComponent, AlertComponent],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ThreeMapComponent } from './three-map/three-map.component';
import { ThreeComponent } from './three.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ThreeComponent, ThreeMapComponent],
  exports: [ThreeComponent],
})
export class ThreeModule {}

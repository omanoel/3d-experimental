import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MapComponent } from '../map/map.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MainComponent, MapComponent],
  exports: [MainComponent],
})
export class MainModule {}

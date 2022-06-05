import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { ThreeModule } from '../@shared/three/three.module';

@NgModule({
  imports: [CommonModule, ThreeModule],
  declarations: [MainComponent],
  exports: [MainComponent],
})
export class MainModule {}

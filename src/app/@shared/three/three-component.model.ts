import { ElementRef } from '@angular/core';
import { MainComponentModel } from '../../@main/main.component.model';
import { Object3D, Vector2, WebGLRenderer } from 'three';

import { Collection3d } from './shared/objects/objects.model';

export interface ThreeComponentModel {
  element: ElementRef;
  renderer: WebGLRenderer;
  frameId: number | undefined;
  collection3d: Collection3d | undefined;
  mouse: Vector2;
  myObjectOver: ObjectOver | undefined;
  height: number | undefined;
  width: number | undefined;
  mainModel: MainComponentModel;
  dateTimeStartLoop: number;
  alreadyReset: boolean;
}

export interface ObjectOver {
  objectIntersected: Object3D | null | undefined;
  objectDisplay: Object3D;
}

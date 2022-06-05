import { ElementRef } from '@angular/core';

import { TrackballControlsModel } from '../@shared/trackball-controls/trackball-controls.model';

import {
  AxesHelper,
  Clock,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three';
export interface MainComponentModel {
  threeModel: ThreeModel;
  threeObjects: ThreeObjects;
}

export interface ThreeModel {
  element: ElementRef;
  renderer: WebGLRenderer;
  frameId: number;
  scene: Scene;
  camera: PerspectiveCamera;
  trackballControls: TrackballControlsModel;
  raycaster: Raycaster;
  mouse: Vector2;
  needsUpdate: boolean;
  height: number;
  width: number;
  textureLoader: TextureLoader;
  clock: Clock;
  scale: number;
}

export interface ObjectOver {
  objectIntersected: Object3D;
  objectDisplay: Object3D;
}

export interface ThreeObjects {
  [key: string]: Object3D | AxesHelper;
}

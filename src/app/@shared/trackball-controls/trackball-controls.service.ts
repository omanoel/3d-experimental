import { Subject } from 'rxjs';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import { Injectable } from '@angular/core';

import { TrackballControlsModel } from './trackball-controls.model';
import { PerspectiveCamera, Vector3, WebGLRenderer } from 'three';

@Injectable({
  providedIn: 'root',
})
export class TrackballControlsService {
  constructor() {
    // Empty
  }

  public initialize(
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ): TrackballControlsModel {
    return {
      controls: new TrackballControls(camera, renderer.domElement),
      enabled: true,
      eventControls: '',
      target$: new Subject<Vector3>(),
    };
  }

  public updateControls(trackballControls: TrackballControlsModel): void {
    trackballControls.controls.update();
  }
}

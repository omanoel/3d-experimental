import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

import { Injectable } from '@angular/core';

import { PerspectiveCameraService } from '../perspective-camera/perspective-camera.service';

@Injectable({
  providedIn: 'root',
})
export class TrackballControlsService {
  //
  private _model: TrackballControls | null | undefined;
  //
  constructor(private _perspectiveCameraService: PerspectiveCameraService) {
    // Empty
    this._model = null;
  }

  public get model(): TrackballControls {
    return this._model as TrackballControls;
  }

  public setupControls(canvasElement: HTMLCanvasElement): void {
    this._model = new TrackballControls(
      this._perspectiveCameraService.camera,
      canvasElement
    );
  }

  public updateControls(): void {
    (this._model as TrackballControls).update();
  }
}

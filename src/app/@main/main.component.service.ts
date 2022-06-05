import { ElementRef, Injectable, SimpleChanges } from '@angular/core';

import { PerspectiveCameraService } from '../@shared/perspective-camera/perspective-camera.service';
import { RaycasterService } from '../@shared/raycaster/raycaster.service';
import { SceneService } from '../@shared/scene/scene.service';
import { TrackballControlsService } from '../@shared/trackball-controls/trackball-controls.service';
import { MainComponentModel } from './main.component.model';
import { Clock, TextureLoader, Vector2, WebGLRenderer } from 'three';
import { MoonService } from '../@shared/moon/moon.service';
import { TargetHelperService } from '../@shared/target-helper/target-helper.service';

@Injectable({
  providedIn: 'root',
})
export class MainComponentService {
  constructor(
    private _perspectiveCameraService: PerspectiveCameraService,
    private _trackballControlsService: TrackballControlsService,
    private _raycasterService: RaycasterService,
    private _sceneService: SceneService,
    private _targetHelperService: TargetHelperService,
    private _moonService: MoonService
  ) {}

  public initModel(
    element: ElementRef,
    renderer: WebGLRenderer,
    width: number,
    height: number
  ): MainComponentModel {
    // camera
    const camera = this._perspectiveCameraService.initialize(
      width,
      height,
      5000
    );
    camera.position.x = 3000;
    camera.position.y = 3000;
    camera.position.z = 0;
    // renderer
    renderer.setSize(width, height);
    element.nativeElement
      .querySelector('div.map')
      .appendChild(renderer.domElement);
    renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
    // scene
    const scene = this._sceneService.initialize();
    scene.add(camera);
    // target helper
    const targetHelper = this._targetHelperService.initialize();
    scene.add(targetHelper);
    // raycaster
    const raycaster = this._raycasterService.initialize();
    return {
      threeModel: {
        renderer: renderer,
        frameId: 0,
        element: element,
        camera: camera,
        scene: scene,
        trackballControls: this._trackballControlsService.initialize(
          camera,
          renderer
        ),
        raycaster: raycaster,
        mouse: new Vector2(),
        needsUpdate: false,
        height: height,
        width: width,
        textureLoader: new TextureLoader(),
        clock: new Clock(),
        scale: 1,
      },
      threeObjects: {
        targetHelper: targetHelper,
      },
    };
  }
  public initComponent(mainComponentModel: MainComponentModel): void {
    //
    mainComponentModel.threeModel.scene.add(
      this._moonService.initialize(mainComponentModel)
    );
    this._targetHelperService.setPosition(
      mainComponentModel.threeObjects['targetHelper'],
      mainComponentModel.threeModel.trackballControls.target
    );
    this._afterInit(mainComponentModel);
  }

  public resetWidthHeight(
    mainComponentModel: MainComponentModel,
    width: number,
    height: number
  ): void {
    mainComponentModel.threeModel.width = width;
    mainComponentModel.threeModel.height = height;
    mainComponentModel.threeModel.renderer.setSize(
      mainComponentModel.threeModel.width,
      mainComponentModel.threeModel.height
    );
    this._perspectiveCameraService.updateCamera(
      mainComponentModel.threeModel.camera,
      mainComponentModel.threeModel.width,
      mainComponentModel.threeModel.height
    );
  }

  public gotoTarget(mainComponentModel: MainComponentModel): void {
    //if (mainComponentModel.currentIntersected !== null) {
    // this._targetService.setObjectsOnClick(
    //   mainComponentModel,
    //   mainComponentModel.currentIntersected.parent.position
    // );
    //}
  }

  public onChanges(
    mainComponentModel: MainComponentModel,
    changes: SimpleChanges
  ): void {
    //
    const widthChange = changes['width'] && changes['width'].currentValue;
    const heightChange = changes['height'] && changes['height'].currentValue;
    if (widthChange || heightChange) {
      mainComponentModel.threeModel.renderer.setSize(
        mainComponentModel.threeModel.width,
        mainComponentModel.threeModel.height
      );
      this._perspectiveCameraService.updateCamera(
        mainComponentModel.threeModel.camera,
        mainComponentModel.threeModel.width,
        mainComponentModel.threeModel.height
      );
    }
  }

  private _animate(mainComponentModel: MainComponentModel): void {
    requestAnimationFrame(() => this._animate(mainComponentModel));
    this._render(mainComponentModel);
  }

  private _render(mainComponentModel: MainComponentModel): void {
    mainComponentModel.threeModel.frameId = requestAnimationFrame(() => {
      this._render(mainComponentModel);
    });
    //
    this._trackballControlsService.updateControls(
      mainComponentModel.threeModel.trackballControls
    );
    //
    this._findIntersection(mainComponentModel);
    //
    //
    mainComponentModel.threeModel.renderer.render(
      mainComponentModel.threeModel.scene,
      mainComponentModel.threeModel.camera
    );
  }

  private _findIntersection(mainComponentModel: MainComponentModel): void {
    mainComponentModel.threeModel.raycaster.setFromCamera(
      mainComponentModel.threeModel.mouse,
      mainComponentModel.threeModel.camera
    );
  }

  private _afterInit(mainComponentModel: MainComponentModel): void {
    this._animate(mainComponentModel);
  }
}

import { ElementRef, Injectable, NgZone, SimpleChanges } from '@angular/core';
import { MainComponentModel } from '../../@main/main.component.model';
import { Object3D, Vector2, WebGLRenderer } from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { ObjectsService } from './shared/objects/objects.service';
import { OnObjectOverService } from './shared/objects/on-object-over.service';
import { PerspectiveCameraService } from './shared/perspective-camera/perspective-camera.service';
import { RaycasterService } from './shared/raycaster/raycaster.service';
import { ReferentielService } from './shared/referentiel/referentiel.service';
import { SceneService } from './shared/scene/scene.service';
import { TargetService } from './shared/target/target.service';
import { TrackballControlsService } from './shared/trackball-controls/trackball-controls.service';
import { ThreeComponentModel } from './three-component.model';
import { CartesianRepositoryService } from './shared/cartesian-repository/cartesian-repository.service';

@Injectable({
  providedIn: 'root',
})
export class ThreeComponentService {
  constructor(
    private _perspectiveCameraService: PerspectiveCameraService,
    private _trackballControlsService: TrackballControlsService,
    private _raycasterService: RaycasterService,
    private _sceneService: SceneService,
    private _referentielService: ReferentielService,
    private _targetService: TargetService,
    private _objectsService: ObjectsService,
    private _onObjectOverService: OnObjectOverService,
    private _cartesianRepositoryService: CartesianRepositoryService
  ) {}

  public initModel(
    element: ElementRef,
    mainComponentModel: MainComponentModel
  ): ThreeComponentModel {
    return {
      renderer: new WebGLRenderer({
        antialias: true,
      }),
      frameId: undefined,
      element: element,
      collection3d: undefined,
      mouse: new Vector2(),
      myObjectOver: undefined,
      height: undefined,
      width: undefined,
      mainModel: mainComponentModel,
      dateTimeStartLoop: 0,
      alreadyReset: false,
    };
  }

  public initComponent(threeComponentModel: ThreeComponentModel): void {
    this._perspectiveCameraService.initialize(
      threeComponentModel.width as number,
      threeComponentModel.height as number
    );
    //
    this._cartesianRepositoryService.initialize();
    //
    threeComponentModel.renderer.setSize(
      threeComponentModel.width as number,
      threeComponentModel.height as number
    );
    threeComponentModel.element.nativeElement
      .querySelector('div.map')
      .appendChild(threeComponentModel.renderer.domElement);
    threeComponentModel.renderer.setPixelRatio(
      Math.floor(window.devicePixelRatio)
    );

    this._trackballControlsService.setupControls(
      threeComponentModel.renderer.domElement
    );

    this._perspectiveCameraService.camera.position.y = 1;
    this._perspectiveCameraService.camera.position.z = 1;
    //this.fog =  new FogExp2( 0xffffff, 0.015 );
    this._sceneService.model.add(this._perspectiveCameraService.camera);
    //
    this._targetService.create(
      (this._trackballControlsService.model as TrackballControls).target
    );
    //
    threeComponentModel.myObjectOver = this._onObjectOverService.initialize(
      this._sceneService.model
    );
    this._objectsService.initialize();
    // threeComponentModel.mainModel.catalogReadySubject.subscribe({
    //   next: (isReady: boolean) => {
    //     if (isReady) {
    //       this._afterInitCatalog(threeComponentModel);
    //     }
    //   },
    // });
    // threeComponentModel.mainModel.closeToTarget$.subscribe({
    //   next: (isCloseToTarget: boolean) => {
    //     threeComponentModel.mainModel.closeToTarget = isCloseToTarget;
    //     if (isCloseToTarget) {
    //       threeComponentModel.mainModel.objectsFiltered =
    //         this._objectsService.filterStarsCloseTarget(threeComponentModel);
    //     } else {
    //       threeComponentModel.mainModel.objectsFiltered =
    //         threeComponentModel.mainModel.objectsImported;
    //     }
    //     this._objectsService.createStarsAsPoints(
    //       threeComponentModel.mainModel.objectsFiltered
    //     );
    //   },
    // });
    this._afterInitCatalog(threeComponentModel);
  }

  public resetWidthHeight(
    threeComponentModel: ThreeComponentModel,
    width: number,
    height: number
  ): void {
    threeComponentModel.width = width;
    threeComponentModel.height = height;
    threeComponentModel.renderer.setSize(width, height);
    this._perspectiveCameraService.updateCamera(width, height);
  }

  public gotoTarget(threeComponentModel: ThreeComponentModel): void {
    // if (threeComponentModel.mainModel.currentIntersected) {
    //   this._targetService.goToThisPosition(
    //     threeComponentModel.mainModel.currentIntersected.parent.position
    //   );
    // }
  }

  public onChanges(
    threeComponentModel: ThreeComponentModel,
    changes: SimpleChanges
  ): void {
    //
    const widthChange = changes['width'] && changes['width'].currentValue;
    const heightChange = changes['height'] && changes['height'].currentValue;
    if (widthChange || heightChange) {
      threeComponentModel.renderer.setSize(
        threeComponentModel.width as number,
        threeComponentModel.height as number
      );
      this._perspectiveCameraService.updateCamera(
        threeComponentModel.width as number,
        threeComponentModel.height as number
      );
    }
  }

  private _animate(threeComponentModel: ThreeComponentModel): void {
    requestAnimationFrame(() => {
      this._animate(threeComponentModel);
      if (threeComponentModel.dateTimeStartLoop === 0) {
        threeComponentModel.dateTimeStartLoop = new Date().getTime();
      }
    });
    this._render(threeComponentModel);
  }

  private _render(threeComponentModel: ThreeComponentModel): void {
    // const deltaDateTime =
    //   new Date().getTime() - threeComponentModel.dateTimeStartLoop;
    // if (threeComponentModel.mainModel.timeline.displayAnimation) {
    //   threeComponentModel.alreadyReset = false;
    //   threeComponentModel.mainModel.timeline.deltaEpoch +=
    //     threeComponentModel.mainModel.timeline.deltaSpeedEpoch * 100;
    //   if (deltaDateTime > 40) {
    //     threeComponentModel.mainModel.timeline.deltaEpoch$.next(
    //       threeComponentModel.mainModel.timeline.deltaEpoch
    //     );
    //     this._objectsService.createStarsAsPoints(
    //       threeComponentModel.mainModel.objectsFiltered,
    //       threeComponentModel.mainModel.timeline.deltaEpoch
    //     );
    //     threeComponentModel.dateTimeStartLoop = 0;
    //   }
    // } else {
    //   if (
    //     !threeComponentModel.alreadyReset &&
    //     threeComponentModel.mainModel.timeline.deltaEpoch === 0
    //   ) {
    //     threeComponentModel.mainModel.timeline.deltaEpoch$.next(
    //       threeComponentModel.mainModel.timeline.deltaEpoch
    //     );
    //     this._objectsService.createStarsAsPoints(
    //       threeComponentModel.mainModel.objectsFiltered,
    //       threeComponentModel.mainModel.timeline.deltaEpoch
    //     );
    //     threeComponentModel.alreadyReset = true;
    //   }
    // }
    //
    this._targetService.update();
    //
    //
    this._trackballControlsService.updateControls();
    //
    this._cartesianRepositoryService.update();
    //
    // this._objectsService.createOrUpdateStarsCloseCamera(threeComponentModel);
    //
    this._findIntersection(threeComponentModel);
    //
    // this._onObjectOverService.update(
    //   threeComponentModel.myObjectOver,
    //   this._targetService.model.axesHelper.position
    // );
    //
    threeComponentModel.renderer.render(
      this._sceneService.model,
      this._perspectiveCameraService.camera
    );
  }

  private _findIntersection(threeComponentModel: ThreeComponentModel): void {
    this._raycasterService.model.setFromCamera(
      threeComponentModel.mouse,
      this._perspectiveCameraService.camera
    );
    //
    if (!this._sceneService.getGroupOfIntersectedObjects()) {
      return;
    }
    const intersects = this._raycasterService.model
      .intersectObjects(
        (this._sceneService.getGroupOfIntersectedObjects() as Object3D)
          .children,
        true
      )
      .filter((int) => int.object.type === 'Mesh');
    // if (intersects.length > 0) {
    //   if (threeComponentModel.mainModel.currentIntersected) {
    //     // FIXME threeComponentModel.currentIntersected.customDepthMaterial.linewidth = 1;
    //     return;
    //   }
    //   threeComponentModel.mainModel.currentIntersected = intersects[0].object;
    //   threeComponentModel.myObjectOver.objectIntersected =
    //     threeComponentModel.mainModel.currentIntersected;
    //   threeComponentModel.mainModel.lastObjectProperties =
    //     threeComponentModel.mainModel.currentIntersected.userData.properties;
    // } else {
    //   if (threeComponentModel.mainModel.currentIntersected) {
    //     threeComponentModel.myObjectOver.objectIntersected = undefined;
    //   }
    //   threeComponentModel.mainModel.currentIntersected = undefined;
    // }
  }

  private _afterInitCatalog(threeComponentModel: ThreeComponentModel): void {
    // threeComponentModel.mainModel.objectsFiltered =
    //   threeComponentModel.mainModel.objectsImported;
    // this._objectsService.createStarsAsPoints(
    //   threeComponentModel.mainModel.objectsFiltered
    // );
    this._objectsService.addObjectsInScene();
    this._animate(threeComponentModel);
  }
}

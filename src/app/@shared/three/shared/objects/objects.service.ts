import { Injectable } from '@angular/core';
import { MainComponentModel } from '../../../../@main/main.component.model';
import { MeshBasicMaterial, Object3D, Vector3 } from 'three';
import { ThreeComponentModel } from '../../three-component.model';
import { SceneService } from '../scene/scene.service';
import { TargetService } from '../target/target.service';
import { Collection3d, StarColors } from './objects.model';

@Injectable({
  providedIn: 'root',
})
export class ObjectsService {
  //
  private _model: Collection3d | undefined;
  //
  constructor(
    private _targetService: TargetService,
    private _sceneService: SceneService
  ) {
    // Empty
  }

  public initialize(): void {
    this._model = {
      groupOfObjectsPoints: new Object3D(),
      groupOfClosestObjects: new Object3D(),
      groupOfClosestObjectsHelpers: new Object3D(),
      groupOfClosestObjectsProperMotion: new Object3D(),
      groupOfObjectsMovement: new Object3D(),
      geometryMovementGlow: null,
      shaderMaterials: new Map(),
      basicMaterials: new Map(),
      colors: null,
      loaded: false,
    };
    this._initMaterials();
    this._model.groupOfClosestObjects.name =
      SceneService.GROUP_INTERSECTED_OBJECTS;
  }

  public refreshAfterLoadingCatalog(
    mainComponentModel: MainComponentModel
  ): void {
    // mainComponentModel.average = '';
    // mainComponentModel.objectsFiltered = mainComponentModel.objectsImported;
    // this.createStarsAsPoints(mainModel.objectsImported);
    // this._model.groupOfClosestObjectsHelpers.children = [];
    // this._model.groupOfClosestObjects.children = [];
    // this._model.groupOfObjectsMovement.children = [];
    // this._model.groupOfClosestObjectsProperMotion.children = [];
    // const first = mainModel.objectsImported[0];
    // const position = new Vector3(first.x, first.y, first.z);
    // this._targetService.goToThisPosition(position);
  }

  public addObjectsInScene(): void {
    // if (this._model.groupOfObjectsPoints && !this._model.loaded) {
    //   /*
    //   this._sceneService.model.add(this._model.groupOfStarObjects);
    //   */
    //   this._sceneService.model.add(this._model.groupOfObjectsPoints);
    //   this._sceneService.model.add(this._model.groupOfClosestObjectsHelpers);
    //   this._sceneService.model.add(this._model.groupOfClosestObjects);
    //   this._sceneService.model.add(this._model.groupOfObjectsMovement);
    //   this._sceneService.model.add(
    //     this._model.groupOfClosestObjectsProperMotion
    //   );
    //   (this._model as Collection3d).loaded = true;
    // }
  }

  // public filterStarsCloseTarget(
  //   threeComponentModel: ThreeComponentModel
  // ): BaseCatalogData[] {
  //   return this._starsCloseTargetService.filter(threeComponentModel.mainModel);
  // }

  // public createStarsAsPoints(
  //   objectsFiltered: BaseCatalogData[],
  //   deltaTimeInYear = 0
  // ): void {
  //   this._starsAsPointsService.createOrUpdate(
  //     this._model as Collection3d,
  //     objectsFiltered,
  //     deltaTimeInYear
  //   );
  // }

  /**
   * Depending on spectral class, set corresponding basic material
   */
  private _initMaterials(): void {
    (this._model as Collection3d).colors = {
      Z: 0xffffff,
      O: 0x93b6ff,
      B: 0xa7c3ff,
      A: 0xd5e0ff,
      F: 0xf9f5ff,
      G: 0xffecdf,
      K: 0xffd6ac,
      M: 0xffaa58,
      L: 0xff7300,
      T: 0xff3500,
      Y: 0x999999,
    };
    Object.keys((this._model as Collection3d).colors as StarColors).forEach(
      (key: string) => {
        const color = ((this._model as Collection3d).colors as StarColors).Z;
        (this._model as Collection3d).basicMaterials.set(
          key,
          new MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.1,
          })
        );
      }
    );
  }
}

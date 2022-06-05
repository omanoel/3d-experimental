import { Injectable } from '@angular/core';

import {
  BufferAttribute,
  BufferGeometry,
  EllipseCurve,
  Line,
  LineBasicMaterial,
  Vector3,
} from 'three';

import { PerspectiveCameraService } from '../perspective-camera/perspective-camera.service';
import { SceneService } from '../scene/scene.service';
import {
  CartesianRepositoryModel,
  CARTESIAN_REPOSITORY_DIVISION,
} from './cartesian-repository.model';

@Injectable({
  providedIn: 'root',
})
export class CartesianRepositoryService {
  // private
  private _model: CartesianRepositoryModel | undefined;
  // constructor
  constructor(
    private _sceneService: SceneService,
    private _perspectiveCameraService: PerspectiveCameraService
  ) {
    // Empty
  }

  public get model(): CartesianRepositoryModel {
    return this._model as CartesianRepositoryModel;
  }

  public initialize(): void {
    const color = 0xffffff;
    const distance = this._perspectiveCameraService.camera.position.distanceTo(
      new Vector3(0, 0, 0)
    );
    this._model = {
      distReference: distance,
      objects: this._buildObjects(color, distance),
    };
  }

  public update(): void {
    const dist = this._perspectiveCameraService.camera.position.distanceTo(
      new Vector3(0, 0, 0)
    );
    // (this._model as CartesianRepositoryModel).distReference = dist;
    this._updateObjects();
  }

  private _buildObjects(color: number, distance: number): Line[] {
    const objects: Line[] = [];
    this._buildLinesXYZ(objects, color, distance);
    return objects;
  }

  private _buildLinesXYZ(
    objects: Line[],
    color: number,
    distance: number
  ): void {
    const materialMajor = new LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.2,
    });
    const materialMinor = new LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.1,
    });

    for (let i = 0; i <= CARTESIAN_REPOSITORY_DIVISION; i++) {
      const x =
        0 - distance / 2 + (distance * i) / CARTESIAN_REPOSITORY_DIVISION;
      const material =
        i % (CARTESIAN_REPOSITORY_DIVISION / 4) === 0
          ? materialMajor
          : materialMinor;
      this._buildLine(
        objects,
        material,
        distance / 2,
        x,
        0,
        new Vector3(1, 0, 0)
      );
      this._buildLine(
        objects,
        material,
        x,
        distance / 2,
        0,
        new Vector3(0, 1, 0)
      );
      this._buildLine(
        objects,
        material,
        0,
        x,
        distance / 2,
        new Vector3(0, 0, 1)
      );
      this._buildLine(
        objects,
        material,
        0,
        distance / 2,
        x,
        new Vector3(0, 1, 0)
      );
      this._buildLine(
        objects,
        material,
        x,
        0,
        distance / 2,
        new Vector3(0, 0, 1)
      );
      this._buildLine(
        objects,
        material,
        distance / 2,
        0,
        x,
        new Vector3(1, 0, 0)
      );
    }
  }

  private _buildLine(
    objects: Line[],
    material: LineBasicMaterial,
    x: number,
    y: number,
    z: number,
    direction: Vector3
  ): void {
    const geometryX = new BufferGeometry();
    const positions = new Float32Array(2 * 3); // 3 vertices per point
    positions[0] = (direction.x ? 1 : 1) * x;
    positions[1] = (direction.y ? 1 : 1) * y;
    positions[2] = (direction.z ? 1 : 1) * z;
    positions[3] = (direction.x ? -1 : 1) * x;
    positions[4] = (direction.y ? -1 : 1) * y;
    positions[5] = (direction.z ? -1 : 1) * z;
    geometryX.setAttribute('position', new BufferAttribute(positions, 3));
    objects.push(new Line(geometryX, material));
  }

  private _buildLineY(
    objects: Line[],
    material: LineBasicMaterial,
    x: number,
    y: number,
    z: number
  ): void {
    const geometryX = new BufferGeometry();
    const positions = new Float32Array(2 * 3); // 3 vertices per point
    positions[0] = x;
    positions[1] = y;
    positions[2] = z;
    positions[3] = x;
    positions[4] = -y;
    positions[5] = z;
    geometryX.setAttribute('position', new BufferAttribute(positions, 3));
    objects.push(new Line(geometryX, material));
  }

  private _updateObjects(): void {
    for (const lineObject of (this._model as CartesianRepositoryModel)
      .objects) {
      this._sceneService.model.remove(lineObject);
    }
    const color = 0xffffff;
    (this._model as CartesianRepositoryModel).objects = this._buildObjects(
      color,
      (this._model as CartesianRepositoryModel).distReference
    );
    for (const lineObject of (this._model as CartesianRepositoryModel)
      .objects) {
      this._sceneService.model.add(lineObject);
    }
  }
}

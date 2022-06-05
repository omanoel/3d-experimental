import { AxesHelper, Vector3 } from 'three';

export interface TargetModel {
  axesHelper: AxesHelper;
  distanceCameraTarget: number;
  targetOnClick: Vector3 | null | undefined;
  cameraOnClick: Vector3 | null | undefined;
  stepper: number;
}

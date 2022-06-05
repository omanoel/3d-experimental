import { Line } from 'three';

export interface CartesianRepositoryModel {
  objects: Line[];
  distReference: number;
}

export const CARTESIAN_REPOSITORY_DIVISION = 20;

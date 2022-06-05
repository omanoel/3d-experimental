import { Injectable } from '@angular/core';
import { Scene } from 'three';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  constructor() {
    // Empty
  }

  public initialize(): Scene {
    const scene = new Scene();
    return scene;
  }
}

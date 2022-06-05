import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as THREE from 'three';
import { MainComponentModel } from '../../@main/main.component.model';

@Injectable({
  providedIn: 'root',
})
export class MoonService {
  constructor() {
    // Empty
  }

  public initialize(model: MainComponentModel): THREE.Object3D {
    const geometry = new THREE.SphereGeometry(2000, 100, 50);

    const material = new THREE.MeshLambertMaterial({ color: 0x0068ff });

    const meshMoon = new THREE.Mesh(geometry, material);
    meshMoon.position.set(0, 0, 0);
    return meshMoon;
  }
}

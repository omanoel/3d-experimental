import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MainComponentModel } from '../../@main/main.component.model';
import { Clock, Object3D, WebGLRenderer } from 'three';

import { ThreeComponentModel } from './three-component.model';
import { ThreeComponentService } from './three-component.service';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
})
export class ThreeComponent implements OnInit, OnChanges, OnDestroy {
  private _threeComponentModel: ThreeComponentModel;
  @Input() options: MainComponentModel | undefined;

  initDist: number = 0;
  mouseDown = false;

  clock: Clock = new Clock();

  currentIntersected: Object3D = new Object3D();

  renderer: WebGLRenderer = new WebGLRenderer({
    antialias: true,
  });

  constructor(
    private _element: ElementRef,
    private _threeComponentService: ThreeComponentService
  ) {
    // Empty
    this._threeComponentModel = <ThreeComponentModel>{};
  }

  public ngOnInit(): void {
    this._threeComponentModel = this._threeComponentService.initModel(
      this._element,
      this.options as MainComponentModel
    );
    this._threeComponentService.resetWidthHeight(
      this._threeComponentModel,
      window.innerWidth,
      window.innerHeight
    );
    this._threeComponentService.initComponent(this._threeComponentModel);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._threeComponentService.onChanges(this._threeComponentModel, changes);
  }

  public ngOnDestroy(): void {
    if (this._threeComponentModel.frameId != null) {
      cancelAnimationFrame(this._threeComponentModel.frameId);
    }
  }

  public get threeComponentModel(): ThreeComponentModel {
    return this._threeComponentModel;
  }
}

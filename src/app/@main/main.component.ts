import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { MainComponentModel, ThreeModel } from './main.component.model';
import { Clock, WebGLRenderer } from 'three';
import WebGL from 'three/examples/jsm/capabilities/WebGL';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnChanges, OnDestroy {
  private _mainComponentModel: MainComponentModel;
  private _isWebGLAvailable = true;

  mouseDown = false;
  isHelpDisplayed = false;

  clock: Clock = new Clock();

  renderer: WebGLRenderer = new WebGLRenderer({
    antialias: true,
  });

  constructor(private _element: ElementRef) {
    // Empty
    this._mainComponentModel = {
      threeModel: <ThreeModel>{},
      threeObjects: {},
    };
  }

  public ngOnInit(): void {
    if (!WebGL.isWebGLAvailable()) {
      this._isWebGLAvailable = false;
      const warning = WebGL.getWebGLErrorMessage();
      this._element.nativeElement.appendChild(warning);
      return;
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public displayHelp(status: boolean): void {
    this.isHelpDisplayed = status;
  }

  public get mainComponentModel(): MainComponentModel {
    return this._mainComponentModel;
  }

  public set mainComponentModel(model: MainComponentModel) {
    this._mainComponentModel = model;
  }

  public get isWebGLAvailable(): boolean {
    return this._isWebGLAvailable;
  }
}

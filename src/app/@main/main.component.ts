import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { MainComponentModel, ThreeModel } from './main.component.model';
import { MainComponentService } from './main.component.service';
import { Clock, WebGLRenderer } from 'three';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnChanges, OnDestroy {
  private _mainComponentModel: MainComponentModel;

  mouseDown = false;
  isHelpDisplayed = false;

  clock: Clock = new Clock();

  renderer: WebGLRenderer = new WebGLRenderer({
    antialias: true,
  });

  constructor(
    private _element: ElementRef,
    private _mainComponentService: MainComponentService
  ) {
    // Empty
    this._mainComponentModel = {
      threeModel: <ThreeModel>{},
      threeObjects: {},
    };
  }

  public ngOnInit(): void {
    this._mainComponentModel = this._mainComponentService.initModel(
      this._element,
      this.renderer,
      window.innerWidth,
      window.innerHeight
    );
    this._mainComponentService.resetWidthHeight(
      this.mainComponentModel,
      window.innerWidth,
      window.innerHeight
    );
    this._mainComponentService.initComponent(this.mainComponentModel);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._mainComponentService.onChanges(this.mainComponentModel, changes);
  }

  public ngOnDestroy(): void {
    if (this.mainComponentModel.threeModel.frameId != null) {
      cancelAnimationFrame(this.mainComponentModel.threeModel.frameId);
    }
  }

  public displayHelp(status: boolean): void {
    this.isHelpDisplayed = status;
  }

  public get mainComponentModel(): MainComponentModel {
    return this._mainComponentModel;
  }

  public set mainComponentModel(model: MainComponentModel) {
    this._mainComponentModel = model;
  }
}

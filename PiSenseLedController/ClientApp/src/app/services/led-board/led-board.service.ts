import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'

import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';
import { LedBoard } from '../../models/LedBoard';
import { Led } from '../../models/Led';

import { ColorService, IColorComponent } from '../colors/color.service';

@Injectable()
export class LedBoardService {
  // todo: make an observable? - explore what type best
  boardModel: LedBoard;

  private lastSelectedIndex: number;

  ledControls = {
    brushMode: false,
    autosave: true
  };

  private lastColorSelected: IColorComponent;

  constructor(
    private colorsService: ColorService,
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string) {
    this.lastSelectedIndex = -1;
  }

  getBoardModel(): Observable<LedBoard> {
    if (this.boardModel) {
      return Observable.of(this.boardModel);
    }

    return this.http.get(this.baseUrl + "api/Led/Model")
      .map((data: any) => new LedBoard({ ledsArray: data.ledMatrix, size: data.matrixSize }))
      .do(board => { this.boardModel = board; })
  }

  newColorSelected(color) {
    let colorComponents = this.colorsService.parseRgbStringToComponents(color);
    this.lastColorSelected = colorComponents;

    let changed = false;

    if (!this.boardModel) {
      return;
    }

    this.boardModel.leds.forEach(l => {
      if (l.selected) {
        changed = true;
        l.red = colorComponents.red;
        l.green = colorComponents.green;
        l.blue = colorComponents.blue;
      }
    });

    if (changed) {
      this.updateLedModel();
    }
  }

  randomizeLeds() {
    this.boardModel.leds.forEach(l => {
      let randomColor = this.colorsService.getRandomColorComponent();
      l.red = randomColor.red;
      l.green = randomColor.green;
      l.blue = randomColor.blue;
    });

    this.updateLedModel();
  }

  ledClicked(led: Led, shiftDown: boolean, ctrlDown: boolean) {
    if (this.ledControls.brushMode && this.lastColorSelected) {
      led.red = this.lastColorSelected.red;
      led.green = this.lastColorSelected.green;
      led.blue = this.lastColorSelected.blue;

      this.updateLedModel();

      return false;
    }

    if (!shiftDown && !ctrlDown) {
      this.boardModel.leds.forEach(l => l.selected = false);
      led.selected = !led.selected;
      this.lastSelectedIndex = led.index;
    }

    if (ctrlDown && !shiftDown) {
      led.selected = !led.selected;
      this.lastSelectedIndex = led.index;
    }

    if (shiftDown && this.lastSelectedIndex >= 0) {
      let smaller = Math.min(this.lastSelectedIndex, led.index);
      let greater = Math.max(this.lastSelectedIndex, led.index);

      this.boardModel.leds.forEach(l => {
        if (l.index >= smaller && l.index <= greater) {
          l.selected = true;
        }
      });

      this.lastSelectedIndex = led.index;
    }
  }

  on() {
    this.setAllLedsToColorComponent({ red: 255, green: 255, blue: 255 });
  }

  off() {
    this.setAllLedsToColorComponent({ red: 0, green: 0, blue: 0 });
  }

  setAllLedsToColorComponent(colorComponent: IColorComponent) {
    this.boardModel.leds.forEach(l => {
      l.red = colorComponent.red;
      l.green = colorComponent.green;
      l.blue = colorComponent.blue;
    });

    this.updateLedModel();
  }

  clearSelection() {
    this.boardModel.leds.forEach(l => l.selected = false);
  }

  private toLedViewModel(ledModel: LedBoard) {
    return {
      ledMatrix: ledModel.leds.map(led => [led.red, led.green, led.blue]),
      matrixSize: ledModel.size
    }
  }

  private updateLedModel() {
    this.http.post(this.baseUrl + "api/Led/Update", this.toLedViewModel(this.boardModel)).subscribe(r => console.log(r));
  }
}

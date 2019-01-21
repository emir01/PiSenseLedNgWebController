import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'

import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';
import { LedBoard } from '../../models/LedBoard';
import { Led } from '../../models/Led';

import { ColorService } from '../colors/color.service';

@Injectable()
export class LedBoardService {
  // todo: make an observable? - explore what type best
  boardModel: LedBoard;

  private lastSelectedIndex: number;

  ledControls = {
    brushMode: false,
    autosave: true
  };

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

    let changed = false;
    this.boardModel.leds.forEach(l => {
      if (l.selected) {
        changed = true;
        l.red = colorComponents.red;
        l.green = colorComponents.green;
        l.blue = colorComponents.blue;
      }
    });

    // post the board model if it was changed 
    if (changed) {
      this.updateLedModel();
    }
  }

  ledClicked(led: Led, shiftDown: boolean, ctrlDown: boolean) {
    if (this.ledControls.brushMode) {
      // do not select if in brush mode
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
    this.boardModel.leds.forEach(l => {
      l.red = 255;
      l.green = 255;
      l.blue = 255;
    });
    this.updateLedModel();
  }

  off() {
    this.boardModel.leds.forEach(l => {
      l.red = 0;
      l.green = 0;
      l.blue = 0;
    });
    this.updateLedModel();
  }

  clearSelection() {
    console.log("Clear Selection called");
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

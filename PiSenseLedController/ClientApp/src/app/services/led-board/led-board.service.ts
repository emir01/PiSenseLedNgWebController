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
    var colorComponents = this.colorsService.parseRgbStringToComponents(color);
    this.boardModel.leds.forEach(l => {
      if (l.selected) {
        l.red = colorComponents.red;
        l.green = colorComponents.green;
        l.blue = colorComponents.blue;
      }
    });
  }

  ledClicked(led: Led, shiftDown: boolean, ctrlDown: boolean) {
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
}
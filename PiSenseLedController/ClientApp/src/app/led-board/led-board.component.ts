import { Component, OnInit, Inject } from '@angular/core';
import { LedBoard } from '../models/LedBoard';
import { LedBoardService, IAmLedBoardControls } from '../services/led-board/led-board.service';

@Component({
  selector: 'app-led-board',
  templateUrl: './led-board.component.html',
  styleUrls: ['./led-board.component.css']
})
export class LedBoardComponent implements OnInit {
  ledModel: LedBoard = new LedBoard();

  controls: IAmLedBoardControls = {
    autosave: false,
    brushMode:false
  };

  constructor(private service: LedBoardService) {
    service.getBoardModel().subscribe(ledBoard => this.ledModel = ledBoard);

    this.controls = service.ledControls;
  }

  ngOnInit() {
  }

  colorChanged(newColor) {
    console.log("color changed: ", newColor);
    this.service.newColorSelected(newColor);
  }

  turnOnBoard() {
    this.service.on();
  }

  turnOffBoard() {
    this.service.off();
  }

  random() {
    this.service.randomizeLeds();
  }

  handleBrushModeClick(data) {
    if (data) {
      this.service.clearSelection();
    }
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { LedBoard } from '../models/LedBoard';
import { LedBoardService } from '../services/led-board/led-board.service';

@Component({
  selector: 'app-led-board',
  templateUrl: './led-board.component.html',
  styleUrls: ['./led-board.component.css']
})
export class LedBoardComponent implements OnInit {
   ledModel: LedBoard = new LedBoard();

    constructor(private service: LedBoardService) {
    service.getBoardModel().subscribe(ledBoard => this.ledModel = ledBoard);
  }

  ngOnInit() {
  }

  colorChanged(newColor) {
    this.service.newColorSelected(newColor);
  }

  turnOnBoard() {
    console.log("Turn Board On");
    this.service.on();
  }

  turnOffBoard() {
    console.log("Turn Board Off");
    this.service.off();
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})

export class ColorPickerComponent implements OnInit {
  clr: string;

  @Output()
  colorChanged: EventEmitter<string> = new EventEmitter<string>();

  colorChange($event) {
    this.colorChanged.emit($event);
  }

  constructor() {
    this.clr = "rgb(255,255,255)";
  }

  ngOnInit() {
    console.log(this.clr);
    this.colorChanged.emit(this.clr);
  }
}

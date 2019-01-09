import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-led-light',
  templateUrl: './led-light.component.html',
  styleUrls: ['./led-light.component.css']
})

export class LedLightComponent implements OnInit {
  // Inputs
  red: number;

  // Inputs
  green: number;

  // Inputs
  blue: number;

  constructor() {
    this.red = 255;
    this.blue = 255;
    this.green = 255;
  }

  ngOnInit() {
  }

}

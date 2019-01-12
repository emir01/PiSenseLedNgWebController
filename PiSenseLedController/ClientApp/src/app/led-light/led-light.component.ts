import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-led-light',
  templateUrl: './led-light.component.html',
  styleUrls: ['./led-light.component.css']
})
export class LedLightComponent implements OnInit {
  // Inputs
  @Input()
  red: number;

  // Inputs
  @Input()
  green: number;

  // Inputs
  @Input()
  blue: number;

  @Input()
  index: number;

  selected: boolean;

  @HostBinding('attr.class') hostClass = '';
  @HostBinding('style.background-color') hostBackgroundColor = '';

  @HostListener('click', ['$event'])
  onClick() {
    this.selected = !this.selected;

    if (this.selected) {
      this.hostClass += " selected"
    }
    else {
      this.hostClass = this.hostClass.replace(" selected", "");
    }
  }

  constructor() {
    // defaults
    this.red = 255;
    this.blue = 255;
    this.green = 255;
    this.selected = false;
  }

  ngOnInit() {
    this.hostBackgroundColor = this.rgbToHex(this.red, this.green, this.blue)

    if ((this.index + 1) % 8 == 1) {
      this.hostClass = 'last-led'
    }
  }

  private componentToHex(component) {
    let hex = component.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

}

import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { Led } from '../models/Led';

@Component({
  selector: 'app-led-light',
  templateUrl: './led-light.component.html',
  styleUrls: ['./led-light.component.css']
})
export class LedLightComponent implements OnInit {
  // Inputs
  @Input()
  led: Led = new Led();

  @Input()
  index: number;

  @HostBinding('attr.class') hostClass = '';
  @HostBinding('style.background-color') hostBackgroundColor = '';

  @HostListener('click', ['$event'])

  onClick() {
    this.led.selected = !this.led.selected;

    if (this.led.selected) {
      this.hostClass += " selected"
    }
    else {
      this.hostClass = this.hostClass.replace(" selected", "");
    }
  }

  constructor() {
    // defaults
  }

  ngOnInit() {
    this.hostBackgroundColor = this.rgbToHex(this.led.red, this.led.green, this.led.blue)

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

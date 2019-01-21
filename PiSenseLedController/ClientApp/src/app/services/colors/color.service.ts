import { Injectable } from '@angular/core';

@Injectable()
export class ColorService {

  constructor() { }

  parseRgbStringToComponents(rgbString: string): IColorComponent {
    let colorComponents = { red: 255, green: 255, blue: 255 };
    let commaSeparatedValues = rgbString.substring(4, rgbString.length - 1);
    let individualValues = commaSeparatedValues.split(',');

    colorComponents.red = parseInt(individualValues[0]);
    colorComponents.green = parseInt(individualValues[1]);
    colorComponents.blue = parseInt(individualValues[2]);

    return colorComponents;
  }

  getRandomColorComponent(): IColorComponent {
    let colorComponent = {
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255)
    };

    return colorComponent;
  }
}

export interface IColorComponent {
  red: number,
  green: number,
  blue: number
}

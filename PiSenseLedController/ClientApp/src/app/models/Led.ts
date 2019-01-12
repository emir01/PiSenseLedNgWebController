export class Led {
  red: number;
  green: number;
  blue: number;
  selected: boolean;

  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.selected = false;
  }
}

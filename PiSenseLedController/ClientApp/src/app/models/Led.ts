export class Led {
  red: number;
  green: number;
  blue: number;
  selected: boolean;

  constructor(colors?: { red: number, green: number, blue: number }) {
    this.selected = false;

    if (colors) {
      this.red = colors.red;
      this.green = colors.green;
      this.blue = colors.blue;
    }
  }
}

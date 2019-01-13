export class Led {
  red: number;
  green: number;
  blue: number;
  index: number;
  selected: boolean;

  constructor(index?:number, colors?: { red: number, green: number, blue: number }) {
    this.selected = false;
    this.index = index;

    if (colors) {
      this.red = colors.red;
      this.green = colors.green;
      this.blue = colors.blue;
    }
  }
}

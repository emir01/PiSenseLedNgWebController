import { Led } from "./Led";

export class LedBoard {
  leds: Array<Led> = new Array<Led>();;

  size: number = 0;

  constructor(config?: { ledsArray?: Array<Array<number>>, size?: number }) {
    if (config) {
      this.size = config.size;

      (config.ledsArray || []).forEach((val: number[], index: number) => {
        this.leds.push(new Led(index, { red: val[0], green: val[1], blue: val[2] }));
      });
    }
    else {
      console.warn("Config not provided for Led Board Model");
    }
  }
}

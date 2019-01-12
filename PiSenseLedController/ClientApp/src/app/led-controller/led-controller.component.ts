import { Component, OnInit, Inject, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LedLightComponent } from '../led-light/led-light.component';

@Component({
  selector: 'app-led-controller',
  templateUrl: './led-controller.component.html',
  styleUrls: ['./led-controller.component.css']
})
export class LedControllerComponent implements OnInit {
  ledModel: any = new Array<Array<number>>();

  @ViewChildren(LedLightComponent) ledLights: QueryList<LedLightComponent> = new QueryList<LedLightComponent>();

  selectedChildren = this.ledLights.filter((i) => i.selected);

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {

    http.get(baseUrl + "api/Led/Model")
      .subscribe(result => {
        this.ledModel = result;
      });
  }

  ngOnInit() {
    console.log(this.ledLights.length);
  }
}

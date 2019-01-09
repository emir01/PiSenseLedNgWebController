import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-led-controller',
  templateUrl: './led-controller.component.html',
  styleUrls: ['./led-controller.component.css']
})
export class LedControllerComponent implements OnInit {
  ledModel: any;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    http.get(baseUrl + "api/Led/Model")
      .subscribe(result => {
        this.ledModel = result;
      });
  }

  ngOnInit() {
  }
}

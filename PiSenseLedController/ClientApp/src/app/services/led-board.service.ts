import { Injectable, Inject } from '@angular/core';
import { LedBoard } from '../models/LedBoard';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LedBoardService {
  boardModel: LedBoard;

  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string) {
  }

  getBoardModel():Observable<LedBoard> {
    return this.http.get(this.baseUrl + "api/Led/Model")
      .map((data: any) => new LedBoard({ ledsArray: data.ledMatrix, size: data.matrixSize }))
  }
}

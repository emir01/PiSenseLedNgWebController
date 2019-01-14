import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LedBoardComponent } from './led-board/led-board.component';
import { LedLightComponent } from './led-light/led-light.component';
import { LedBoardService } from './services/led-board.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerComponent } from './color-picker/color-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LedBoardComponent,
    LedLightComponent,
    ColorPickerComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ColorPickerModule,
    RouterModule.forRoot([
      { path: '', component: LedBoardComponent, pathMatch: 'full' },
    ])
  ],
  providers: [LedBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

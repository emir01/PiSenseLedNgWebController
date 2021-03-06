// external modules and components
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// app modules and components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LedBoardComponent } from './led-board/led-board.component';
import { LedLightComponent } from './led-light/led-light.component';
import { LedBoardService } from './services/led-board/led-board.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorService } from './services/colors/color.service';

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
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: LedBoardComponent, pathMatch: 'full' },
    ])
  ],
  providers: [LedBoardService, ColorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpeningComponent } from './opening/opening.component';
import { MessagesComponent } from './messages/messages.component';
import { CardComponent } from './card/card.component';
import { BattleBoxComponent } from './battle-box/battle-box.component';
import { ButtonActionComponent } from './button-action/button-action.component';

@NgModule({
  declarations: [
    AppComponent,
    OpeningComponent,
    MessagesComponent,
    CardComponent,
    BattleBoxComponent,
    ButtonActionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

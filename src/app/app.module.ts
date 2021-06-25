import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalcolatriceSempliceComponent } from './calcolatrice-semplice/calcolatrice-semplice.component';
import { CalcolatriceScientificaComponent } from './calcolatrice-scientifica/calcolatrice-scientifica.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcolatriceSempliceComponent,
    CalcolatriceScientificaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

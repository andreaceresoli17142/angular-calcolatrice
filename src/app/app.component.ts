import { Component } from '@angular/core';

@Component({
  selector: 'main-calcolatrice',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tipoCalcolatrice?: number;

  setSemplice() {
    //console.log("in semplice");

    this.tipoCalcolatrice = 0;
    //console.log(this.tipoCalcolatrice);
  }

  setScientifica() {
    //console.log("in scentifica");

    this.tipoCalcolatrice = 1;
    //console.log(this.tipoCalcolatrice);
  }

  backToMenu()
  {
    this.tipoCalcolatrice = undefined;
  }

}


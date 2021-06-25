import { Component } from '@angular/core';
import { operatorEnum, constantEnum } from '../utilities/enums';
import * as util from '../utilities/util';

@Component({
  selector: 'app-calcolatrice-semplice',
  templateUrl: './calcolatrice-semplice.component.html',
  styleUrls: ['./calcolatrice-semplice.component.css']
})

export class CalcolatriceSempliceComponent {

  history: string = '';
  numbersToCalculate: string = '';
  warningString: string = '';

  public get operatorEnum(): typeof operatorEnum {
    return operatorEnum;
  }

  public get constantEnum(): typeof constantEnum {
    return constantEnum;
  }

  keyBoardInput(value: KeyboardEvent): void {

    let keyPressed = value.key;

    if (keyPressed == "Backspace") {
      this.deleteNumber();
      return;
    }

    if (keyPressed == "Escape") {
      this.cancelAll();
      return;
    }

    if (keyPressed == "Enter") {
      this.sumbit();
      return;
    }

    if (keyPressed.length > 1)
      return;

    if (keyPressed.match(/([^a-zA-Z]|)[\(\)\.]/)) {
      this.inputPunctuation(keyPressed);
      return;
    }

    if (keyPressed.match(/\-/)) {
      this.inputOperatorCalcolatrice(operatorEnum.subtraction);
      return;
    }

    if (keyPressed.match(/\W/)) {
      switch (keyPressed) {
        case "+":
          return this.inputOperatorCalcolatrice(operatorEnum.sum);
        case "–":
          return this.inputOperatorCalcolatrice(operatorEnum.subtraction);
        case "*":
          return this.inputOperatorCalcolatrice(operatorEnum.multiplication);
        case "/":
          return this.inputOperatorCalcolatrice(operatorEnum.division);
        case "^":
          return this.inputOperatorCalcolatrice(operatorEnum.power);
        case "%":
          return this.inputOperatorCalcolatrice(operatorEnum.module);
        default:
          return;
      }
    }

    if (keyPressed.match(/\D/))
      return;

    this.numbersToCalculate += keyPressed;
  }

  inputNumberCalcolatrice(inputData: number | constantEnum): void {
    this.warningString = "";
    if ((inputData == constantEnum.pi || inputData == constantEnum.e) && this.numbersToCalculate.match(/([\d\.]|pi|e)$/)) {
      this.warningString = "manca l'operatore";
      return;
    }
    this.numbersToCalculate += inputData.toString();
  }

  inputPunctuation(inputPar: string): void {
    this.warningString = "";
    if (inputPar == '.' && this.numbersToCalculate.match(/\.$/))
      return;

    if (inputPar == '.' && this.numbersToCalculate.match(/\d+\.\d+$/))
      return;

    if (inputPar == '.' && this.numbersToCalculate.match(/\D$/))
      return;

    if (inputPar == '-' && this.numbersToCalculate.match(/[\d\)]$/))
      return;

    if (inputPar.match(/[\(\)]/)  && this.numbersToCalculate.concat(inputPar).match(util.checkForEquationLessParenthesis)) {
      this.warningString = "una parentesi deve avere un equazione al suo interno";
      return;
    }

    if (inputPar.match(/[\(\)]/) && this.numbersToCalculate.concat(inputPar).match(util.incorrectParenthesisAndOperationPlacement))
      return;


    this.numbersToCalculate += inputPar;
  }

  inputOperatorCalcolatrice(inputOperator: operatorEnum): void {
    if (this.numbersToCalculate.length == 0 && inputOperator != operatorEnum.sqrt && inputOperator != operatorEnum.ln && inputOperator != operatorEnum.log)
      return;

    if (this.numbersToCalculate.match(/\.$/))
      return;

    if (this.numbersToCalculate.match(/[^\dpie()]$/) && !inputOperator.valueOf().toString().match(/^\w/))
      return;

    this.numbersToCalculate += inputOperator.valueOf();
  }

  inputDataCalcolatrice(inputData: string): void {
    this.warningString = '';

    if (inputData == '.' && this.numbersToCalculate.match(/\.$/))
      return;

    if (inputData == '.' && this.numbersToCalculate.match(/\d+\.\d+$/))
      return;

    if (inputData == '.' && this.numbersToCalculate.match(/\D$/))
      return;

    if (this.numbersToCalculate.match(/\.$/) && inputData.match(/[\+\-\*\/]/))
      return;

    if (this.numbersToCalculate.match(/[\+\-\*\/]$/) && inputData.match(/[\+\-\*\/]/))
      return;

    if (inputData.match(/^[\+\-\*\/]/))
      return;

    this.numbersToCalculate += inputData;
    return;
  }

  sumbit(): void {
    this.warningString = '';

    if (util.checkForIncorrectParenthesis(this.numbersToCalculate)) {
      this.warningString = "sintassi o numero di parentesi incorretto";
      return;
    }

    if (this.numbersToCalculate.match(util.endWithOperetor)) {
      this.warningString = "l'espressione non può partire o terminare con un operatore";
      return;
    }

    this.numbersToCalculate = util.validateMinus(this.numbersToCalculate);

    this.history += this.numbersToCalculate + " = ";

    this.numbersToCalculate = util.doParenthesisOperation(this.numbersToCalculate);

    this.history += this.numbersToCalculate + "\n";

    if (!isFinite(+this.numbersToCalculate) && !isNaN(+this.numbersToCalculate))
      this.numbersToCalculate = "\u221E";
  }

  deleteNumber() {
    this.numbersToCalculate = this.numbersToCalculate.substring(0, this.numbersToCalculate.length - 1);
  }

  cancelAll() {
    this.numbersToCalculate = '';
  }

  deleteHistory() {
    this.history = "";
  }

}

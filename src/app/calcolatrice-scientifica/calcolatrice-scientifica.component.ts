import { Component } from '@angular/core';
import { operatorEnum, constantEnum } from '../utilities/enums';
import * as util from '../utilities/util';

@Component({
  selector: 'app-calcolatrice-scientifica',
  templateUrl: './calcolatrice-scientifica.component.html',
  styleUrls: ['./calcolatrice-scientifica.component.css']
})

export class CalcolatriceScientificaComponent {

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

    if (keyPressed === "Backspace") {
      this.deleteNumber();
      return;
    }

    if (keyPressed === "Escape") {
      this.cancelAll();
      return;
    }

    if (this.numbersToCalculate.match(/e$/) && keyPressed.match(/\w/))
      return;

    if ((keyPressed.length == 1 && keyPressed.match(/[lnogpi]/) && !this.numbersToCalculate.concat(keyPressed).match(util.isLegalOperator))
      || (keyPressed.match(/Enter/) && this.numbersToCalculate.match(util.isLegalOperator)))
      return;

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

    if (keyPressed.match(/e/)) {
      this.inputNumberCalcolatrice(constantEnum.e);
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

    if (keyPressed.match(/[^lnogpi\d]/))
      return;

    this.numbersToCalculate += keyPressed;

    if (this.numbersToCalculate.match(/((log)|(ln)|(sqrt))$/)) {
      this.numbersToCalculate += "(";
      return;
    }
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

    if (inputPar == '-' && this.numbersToCalculate.match(/[\d)epi]$/))
      return;

    if (inputPar.match(/[\(\)]/) && this.numbersToCalculate.concat(inputPar).match(util.checkForEquationLessParenthesis)) {
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

    if (this.numbersToCalculate.match(/[\.\(]$/))
      return;

    if (this.numbersToCalculate.match(/[^\dpie()]$/) && !inputOperator.toString().match(/^\w/))
      return;

    if (this.numbersToCalculate.match(/[\dlnogpie)]$/) && inputOperator.toString().length > 1)
      return;

    this.numbersToCalculate += inputOperator.valueOf();
  }

  convertConstants(): void {
    this.numbersToCalculate = this.numbersToCalculate.replace(/pi/g, Math.PI.toString());
    this.numbersToCalculate = this.numbersToCalculate.replace(/e/g, Math.E.toString());
  }

  doLogsAndSqrt(inputString: string): string {
    var expression = inputString.match(util.findLogOrSqrtEquation);

    while (expression) {

      var operator = expression![0].match(/\w+/)![0];
      var parameters = expression![0].match(util.nestedParenthesis)![0];

      if (!expression![0].includes(operator + parameters)) {

        inputString = inputString.replace(
          parameters,
          util.doParenthesisOperation(parameters)
        );

        return this.doLogsAndSqrt(inputString);
      }

      inputString = inputString.replace(
        operator.concat(parameters),
        util.getResult(+util.doParenthesisOperation(parameters), operator)
      );

      return this.doLogsAndSqrt(inputString);
    }

    return inputString;
  }

  sumbit(): void {
    this.warningString = "";

    if (this.numbersToCalculate.match(util.endWithOperetor)) {
      this.warningString = "l'espressione non può terminare con un operatore";
      return;
    }

    if (util.checkForIncorrectParenthesis(this.numbersToCalculate)) {
      this.warningString = "sintassi o numero di parentesi incorretto";
      return;
    }

    this.numbersToCalculate = util.validateMinus(this.numbersToCalculate);

    this.history += this.numbersToCalculate + " = ";

    this.convertConstants();

    this.numbersToCalculate = this.doLogsAndSqrt(this.numbersToCalculate);
    this.numbersToCalculate = util.doParenthesisOperation(this.numbersToCalculate);

    this.history += this.numbersToCalculate + "\n";

    if (!isFinite(+this.numbersToCalculate) && !isNaN(+this.numbersToCalculate))
      this.numbersToCalculate = "\u221E";
  }

  deleteNumber(): void {

    var toDelete = this.numbersToCalculate.match(/(([a-zA-Z]+\()|pi)$/);
    if (toDelete) {
      this.numbersToCalculate = this.numbersToCalculate.replace(toDelete![0], "");
      return;
    }

    this.numbersToCalculate = this.numbersToCalculate.substring(0, this.numbersToCalculate.length - 1);
  }

  deleteHistory(): void {
    this.history = "";
  }

  cancelAll(): void {
    this.numbersToCalculate = "";
  }

}

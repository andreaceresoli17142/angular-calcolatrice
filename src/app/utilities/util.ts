export const checkForEquationLessParenthesis: RegExp = /[^\w]\([\d\.-]+\)|\(\)|^\([\d\.-]+\)/;
export const containsOtherPriorityOperation: RegExp = /[\d\.-]+[\*\/\%][\d\.-]+/;
export const containsPowerOp: RegExp = /[\d\.-]+[\^][\d\.-]+/;
export const containsPriorityOperation: RegExp = /[\d\.]+[\*\/\%][\d\.]+/;
export const endWithOperetor: RegExp = /[^\w()\-]$|^[^\w()\-]/;
export const extractPriorityParameters: RegExp = /[\d\.-]+|[\*\/\%\^]/g;
export const findLogOrSqrtEquation: RegExp = /\w+\([^a-z]*\)/;
export const incorrectParenthesisAndOperationPlacement: RegExp = /\([^\w()-]|\)[\d\.-]|[\d\.]\(|[^\w()]\)/;
export const isLegalOperator: RegExp = /(\W|^)(s|sq|sqr|sqrt|p|pi|l|ln|lo|log)$/;
export const nestedParenthesis: RegExp = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/g;
export const sumDifferenceExpression: RegExp = /[\d\.-]+[\+–][\d\.-]+/;
export const sumDIfferenceExpressionParam: RegExp = /[\d\.-]+|[\+–]/g;

export function validateMinus(stringToValidate: string): string {
	var minusToSimplify;
	while (minusToSimplify = stringToValidate.match(/-{2,}/)) {
		if (minusToSimplify![0].length % 2 == 0)
			stringToValidate = stringToValidate.replace(minusToSimplify![0], "");

		if (minusToSimplify![0].length % 2 == 1)
			stringToValidate = stringToValidate.replace(minusToSimplify![0], "-");
	}
	return stringToValidate;
}

export function checkForIncorrectParenthesis(stringToCheck: string): boolean {
	if (stringToCheck.match(/\(/g)?.length == stringToCheck.match(/\)/g)?.length)
		return false;

	return true;
}

export function getResult(firstNumber: number, operator: string, secondNumber: number | null = null): string {
	if (secondNumber != null)
		switch (operator) {
			case "+":
				return String(firstNumber + secondNumber);
			case "–":
				return String(firstNumber - secondNumber);
			case "*":
				return String(firstNumber * secondNumber);
			case "/":
				return String(firstNumber / secondNumber);
			case "^":
				return String(Math.pow(firstNumber, secondNumber));
			case "%":
				return String(firstNumber % secondNumber);
			default:
				return String(NaN);
		}

	switch (operator) {
		case "log":
			return String(Math.log10(firstNumber));
		case "ln":
			return String(Math.log(firstNumber));
		case "sqrt":
			return String(Math.sqrt(firstNumber));
		default:
			return String(NaN);
	}
}

export function doPriorityOperations(inputString: string): string {
	var expression = inputString.match(containsPowerOp);

	if (!expression) {
		expression = inputString.match(containsOtherPriorityOperation);
	}

	while (expression) {
		var parameters = expression[0].match(extractPriorityParameters);

		if (!parameters)
			return inputString;

		inputString = inputString.replace(
			expression[0],
			getResult(Number(parameters[0]), parameters[1], Number(parameters[2]))
		);
		return doPriorityOperations(inputString);
	}

	return inputString;
}

export function doOtherOperations(inputString: string): string {
	var expression = inputString.match(sumDifferenceExpression);

	while (expression) {
		var parameters = expression[0].match(sumDIfferenceExpressionParam);

		if (!parameters)
			return inputString;

		inputString = inputString.replace(
			expression[0],
			getResult(Number(parameters[0]), parameters[1], Number(parameters[2]))
		);
		return doOtherOperations(inputString);
	}

	return inputString;
}

export function doParenthesisOperation(stringToProcess: string): string {

	var unNestedParenthesis = stringToProcess.match(/\([^\(\)]*\)/);

	while (unNestedParenthesis) {

		var resolveParenthesis = doPriorityOperations(unNestedParenthesis![0].substring(1, unNestedParenthesis![0].length - 1));
		resolveParenthesis = doOtherOperations(resolveParenthesis);

		stringToProcess = stringToProcess.replace(unNestedParenthesis[0], resolveParenthesis);

		return doParenthesisOperation(stringToProcess);
	}

	var resolveSimplifiedExp = doPriorityOperations(stringToProcess);

	resolveSimplifiedExp = doOtherOperations(resolveSimplifiedExp);

	return resolveSimplifiedExp;
}

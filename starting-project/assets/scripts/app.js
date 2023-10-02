const defaultValue = 0;
let result = defaultValue;

function getUserNumberInput() {
    return parseInt(userInput.value);
  }

function buildCalculationExpresion(oldResult, operator, userInputValue){
    return `Operation: ${oldResult} ${operator} ${userInputValue}`
}

function sum() {
    let operator = "+";
    let usrInput = getUserNumberInput();
    let expresion = buildCalculationExpresion(result, operator, usrInput);
    result += usrInput;
    return outputResult(result, expresion) ;

}

function subtract() {
    let operator = "-";
    let usrInput = getUserNumberInput();
    let expresion = buildCalculationExpresion(result, operator, usrInput);
    result -= usrInput;
    return outputResult(result, expresion) ;

} 

function multiply(){
    let userIn = getUserNumberInput();
    let expresion = buildCalculationExpresion(result, "*", userIn);
    result *= userIn;
    return outputResult(result, expresion);
}

function divide(){
    let userIn = getUserNumberInput();
    let expresion = buildCalculationExpresion(result, "/", userIn);
    result /= userIn;
    return outputResult(result, expresion);
}

addBtn.addEventListener("click", sum);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);































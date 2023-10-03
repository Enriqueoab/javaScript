const OPERATORS = ["+", "-", "*", "/"];
const DEFAULT_VALUE = 0;
let result = DEFAULT_VALUE;

function getUserNumberInput() {
    return parseInt(userInput.value);
  }

function buildCalculationExpression(operator, userInputValue) {
    return `Operation: ${result} ${operator} ${userInputValue}`
}

function operationController(operator) {
    
    let usrInput = getUserNumberInput();
    if (usrInput != 0) {
    
    let expression = buildCalculationExpression(operator, usrInput);
        
        if(operator === OPERATORS[0]) {
            outputResult(sum(usrInput), expression);

        } else if(operator === OPERATORS[1]) {
            outputResult(subtract(usrInput), expression);
        
        } else if(operator === OPERATORS[2]) {
            outputResult(multiply(usrInput), expression);    
        
        } else if(operator === OPERATORS[3]) {
            outputResult(divide(usrInput), expression);
        
        } else {
            alert("Something went wrong!");
        }
    } else {
        alert("Not logic operation");
    }
}

function sum(usrInput) {
    return result += usrInput;
}

function subtract(usrInput) {    
    return result -= usrInput;

} 

function multiply(usrInput){
    return result *= usrInput;
}

function divide(usrInput){
    return result /= usrInput;
}

addBtn.addEventListener("click", operationController.bind(null, OPERATORS[0]));
subtractBtn.addEventListener("click", operationController.bind(null, OPERATORS[1]));
multiplyBtn.addEventListener("click", operationController.bind(null, OPERATORS[2]));
divideBtn.addEventListener("click", operationController.bind(null, OPERATORS[3]));































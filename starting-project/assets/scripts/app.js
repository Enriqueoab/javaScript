const defaultValue = 0;
let result = defaultValue;

function getUserNumberInput() {
    return parseInt(userInput.value);
  }

function buildCalculationExpresion(oldResult, operator, value){
    return `Operation: ${oldResult} ${operator} ${value}`
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

addBtn.addEventListener("click", sum);
subtractBtn.addEventListener("click", subtract);



//TODO: make other two operations not copy paste just try

// add button lister
// call function to get the user imput getUserNumberInput
// call buildCalculationExpresion
// call outputResult


































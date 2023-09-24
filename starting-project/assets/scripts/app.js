const defaultValue = 0;
let result = defaultValue;

result = (result + 10) * 3;

//That is a template literal, a way to, dynamically, inject a value (using back ticks (alt + 96))
let calculationDesc = `(${result} + 10) * 3`;

outputResult(result, calculationDesc); 
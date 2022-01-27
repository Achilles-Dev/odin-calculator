const numbers = document.querySelectorAll('.operand');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');
let firstNumber = 0;
let secondNumber = 0;
let sign = '';


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    let results = 0;
    switch(operator){
        case '+': 
            results =  add(a, b);
            break;
        case '-':
            results = subtract(a, b);
            break;
        case 'x':
            results = multiply(a, b);
            break; 
        case '/':
            results = divide(a, b);
            break;
        default:
            results = -1;
    }
    return results;
}





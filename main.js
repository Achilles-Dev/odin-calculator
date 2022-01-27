const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
let displayValue = '0';
let firstNumber = null;
let secondNumber = null;
let firstOperator = null;
let secondOperator = null;
let results = 0;

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
        case '107': 
            results =  add(a, b);
            break;
        case '109':
            results = subtract(a, b);
            break;
        case '106':
            results = multiply(a, b);
            break; 
        case '111':
            results = divide(a, b);
            break;
        default:
            results = -1;
    }
    return results;
}

function updateDisplay(){
    display.textContent = displayValue;
    if (displayValue.length > 9){
        display.textContent = displayValue.substring(0,9)
    }
}


buttons.forEach(button => button.addEventListener('click', () => {
    
    if (button.className === 'operand'){
        inputOperand(button.textContent);
        updateDisplay();
    } else if (button.className === 'operator'){
        inputOperator(button['dataset'].set);
        updateDisplay();
    } else if (button.className === 'equal'){
        inputEqualSign();
        updateDisplay();
        displayValue = null;
    }
}))

function inputOperand(number) {
    if (firstNumber === null){
        if (displayValue === '0' || displayValue === 0){
            displayValue = number;
        }else if (displayValue === firstNumber){
            //new operation after inputEqualSign()
            displayValue = number;
        }else {
            displayValue += number;
        }
    } else if (secondOperator != null) {
        secondNumber = number;
    }
    else {
        if (displayValue === firstNumber){
            displayValue = number;
        } else {
            displayValue += number;
        }
    }

    console.log(firstNumber);
}


function inputOperator(operator) {   

    if (firstOperator != null){
        firstOperator = operator;
        secondNumber = displayValue;
    } else {
        firstOperator = operator;
        firstNumber = displayValue;
    }
      

};


function inputEqualSign(){
    if (firstNumber === null){
        displayValue = displayValue;
    } else {
        secondNumber = displayValue;
        results = operate(firstOperator, Number(firstNumber), Number(secondNumber)).toString();
        displayValue = results;
        firstNumber = null;
        secondNumber = null;
        firstOperator = null;
        secondOperator = null;
    }
   
};




const buttons = document.querySelectorAll('button');
const prevDisplay = document.querySelector('.text-display')
const currDisplay = document.querySelector('.result-display');
let displayText = '';
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
        case '+': 
            results =  add(a, b);
            break;
        case '-':
            results = subtract(a, b);
            break;
        case 'x':
            results = multiply(a, b);
            break; 
        case '÷':
            results = divide(a, b);
            break;
        default:
            results = -1;
    }
    return results;
}

function updateDisplay(){
    prevDisplay.textContent = displayText;
    currDisplay.textContent = displayValue;
    if (displayValue.length > 9){
        currDisplay.textContent = displayValue.substring(0,9)
    }
}

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    if (!key){
        return;
    } else {
        key.click();
    } 
   
});



buttons.forEach(button => button.addEventListener('click', () => {
    switch(button.className){
        case 'number':
            inputNumber(button.textContent);
            updateDisplay();
            break;
        case 'operator':
            inputOperator(button.textContent);
            updateDisplay();
            break;
        case 'equal':
            inputEqualSign();
            updateDisplay();
            break;
        case 'clear':
            clearDisplay();
            updateDisplay();
            break;
        case 'percent':
            inputPercent(displayValue);
            updateDisplay();
            break;
        case 'decimal':
            inputDecimal(button.textContent);
            updateDisplay();
            break;
        case 'bracket':
            inputBracket(button.textContent);
            updateDisplay();
            break;
        default:
           updateDisplay()
    }
    
}))

function inputNumber(number) {
    if (firstOperator === null){
        if (displayValue === '0' || displayValue === 0){
            displayValue = number;
        }else if (displayValue === firstNumber){
            //new operation after inputEqualSign()
            displayValue = number;
        }else {
            displayValue += number;
        }
    } 
    else {
        //2nd number input
        if (displayValue === firstNumber){
            displayValue = number;
        } else {
            displayValue += number;
        }
    }
    //console.log(firstNumber, displayValue)
}


function inputOperator(operator) {   
    if (firstOperator != null && secondOperator === null){
        //4th click(2nd operator input)
        secondOperator = operator;
        secondNumber = displayValue;
        displayText += ' ' + secondNumber + ' ' + operator; 
        results = operate(firstOperator, Number(firstNumber), Number(secondNumber));
        displayValue = roundResults(results).toString();
        firstNumber = displayValue;
        
    } else if(firstOperator != null && secondOperator != null){
        //6th click(new 2nd operator input);
        secondNumber = displayValue; 
        displayText += ' ' + secondNumber + ' ' + operator; 
        console.log(displayText + " end", "1: " + firstNumber, '2: '+ secondNumber)
        results = operate(secondOperator, Number(firstNumber), Number(secondNumber));
        displayValue = roundResults(results).toString();
        secondOperator = operator;
        firstNumber = displayValue;
        results = null;
    }
    else {
        //2nd click (1st operator input)
        firstOperator = operator;
        firstNumber = displayValue;
        displayText = firstNumber + ' ' + operator;

    }
   
      
};

function inputEqualSign(){
    if (firstOperator === null ){
        displayValue = displayValue;
    } else if (secondOperator != null ){
        //final results
        secondNumber = displayValue;
        displayText += ' ' + secondNumber + ' ' + '=';
        results = operate(secondOperator, Number(firstNumber), Number(secondNumber));
        displayValue = roundResults(results).toString();
        firstNumber = displayValue;
        secondNumber = null;
        firstOperator = null;
        secondOperator = null;
        results = null;
    } else {
        secondNumber = displayValue;
        displayText += ' ' + secondNumber + ' ' + '=';
        results = operate(firstOperator, Number(firstNumber), Number(secondNumber));
        displayValue = roundResults(results).toString();
        firstNumber = displayValue;
        secondNumber = null;
        firstOperator = null;
        secondOperator = null;
        results = null;
    }
   
}


function clearDisplay() {
    displayValue = '0';
    firstNumber = null;
    secondNumber = null;
    firstOperator = null;
    secondOperator = null;
    results = null;
    displayText = '';
}

function inputPercent(number) {
    displayText = number + ' %';
    displayValue = (number/100).toString();
}

function inputDecimal(decimal) {
    if(displayValue === firstNumber || displayValue === secondNumber) {
        displayValue = '0';
        displayValue += decimal;
    } else if(!displayValue.includes(decimal)) {
        displayValue += decimal;
    } 
}

function inputBracket(bracket){
    const openingbracket = bracket.split('')[0];
    const closingbracket = bracket.split('')[1];
    if (displayValue.includes('(')){
        displayValue += closingbracket;
    } else if (displayValue != '0' || displayValue != 0 ){
        displayValue += openingbracket;
    } else {
        displayValue = openingbracket;
    }
    
}

function roundResults(number) {
    return parseFloat(Math.round(number + 'e' + 15) + 'e-' + 15);
}
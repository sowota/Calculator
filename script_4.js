const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
//Display
const lowerDisplay = document.querySelector('[data-current-operand]'); 
const upperDisplay = document.querySelector('[data-previous-operand]');

// For calculating numbers 
let secondValue = '';
let operator = '';
let firstValue ='';
let result = '';

let box = [];
let box2 = [];

keys.addEventListener('click', event => {
    
    const key = event.target;
    const keyValue = event.target.innerText;
    const lowerDisplayValue = lowerDisplay.innerText;
    const upperDisplayValue = upperDisplay.innerText;
    const type = key.dataset.type;
    const previousKeyType = calculator.dataset.previousKeyType

    if(type === 'decimal'){
        if(lowerDisplayValue === '0'){
            lowerDisplay.innerText += '.';   
        }else if (!lowerDisplayValue.includes('.')){ 
            lowerDisplay.innerText += '.'; 
        }
    }
    if(type === 'number') {
        if(lowerDisplayValue === '0'|| previousKeyType === 'operator'){               
            lowerDisplay.innerText = keyValue;
        }else {
            lowerDisplay.innerText += keyValue;      
        } 
        box.push(keyValue);
          console.log(box)
    }

    if(type === 'operation'){
        firstValue = lowerDisplayValue
            console.log(firstValue)
        operator = keyValue
        secondValue = lowerDisplayValue
            console.log(secondValue)
        box.push(operator);
        console.log(box);
            console.log(operator)

        if(firstValue && operator && previousKeyType !== 'operator'){
            calculate(firstValue, operator, secondValue)

        }
  
        upperDisplay.innerText = firstValue + operator; 
        lowerDisplay.innerText = firstValue;
        calculator.dataset.previousKeyType = 'operator'
    }

    if(type === 'equal'){
        if(lowerDisplayValue === '0'){
            return;
        }
        secondValue = parseFloat(lowerDisplayValue);
          //console.log(secondValue);
        calculate(firstValue, secondValue, operator); 
        updateDisplay();
       
    }

    if(type === 'all-clear'){
        lowerDisplay.innerText = '0';
        upperDisplay.innerText = '';
        firstValue = '';
        secondValue = '';
        operator = '';
        box = [];
          console.log("L"+lowerDisplayValue, "U"+upperDisplayValue, "F"+firstValue, "S"+secondValue, "O"+operator, "B" +box)
    }

    if(type === 'negate'){
        firstValue = - parseFloat(lowerDisplayValue);
        lowerDisplay.innerText = firstValue;
         //console.log(firstValue);
    }

    if(type === 'percent'){
        firstValue = lowerDisplayValue;
        console.log(firstValue);
        firstValue *= 0.01;
        lowerDisplay.innerText = firstValue;
    }

    if(type === 'delete'){
        box.pop();
        console.log(box)

        if(lowerDisplayValue === '0'){            
            if(upperDisplayValue){
              upperDisplay.innerText = box.join('');
            }
        }else if(lowerDisplayValue){
            if(upperDisplayValue && result){
                 lowerDisplay.innerText = '';
                 console.log(result);
            }
          lowerDisplay.innerText = box.join('');
        }
    }
})

function calculate(firstValue, secondValue, operator){
       console.log(firstValue, secondValue, operator)
    if(operator === '+') result = firstValue + secondValue;
    if(operator === '-') result = firstValue - secondValue;
    if(operator === '÷') result = firstValue / secondValue;
    if(operator === '×') result = firstValue * secondValue;
       console.log(result); 
    return result;      
}

function updateDisplay() {
    lowerDisplay.innerText = result;
    console.log(lowerDisplay.innerText)
    upperDisplay.innerText = firstValue + operator + secondValue + "="; 
}

function defaultDisplay () {
    lowerDisplay.innerText = '0';
}
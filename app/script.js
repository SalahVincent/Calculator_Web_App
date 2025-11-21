let display = document.getElementById('result')
let clearButton = document.getElementById('clear')
let backspaceButton = document.getElementById('backspace')
let equalsButton = document.getElementById('buttoneq')
let numberButtons = document.querySelectorAll('#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine')
let operatorButtons = document.querySelectorAll('#add, #subtract, #multiply, #divide')
let decimalButton = document.getElementById('decimal')
let modulusButton = document.getElementById('modulus')


let currentNumber = ''
let previousNumber = ''
let currentOperator = ''


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentNumber += button.textContent
        display.value = currentNumber
    })
})
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentNumber !== '') {
            previousNumber = currentNumber
            currentNumber = ''
            currentOperator = button.textContent
        }
    })
})
equalsButton.addEventListener('click', () => {
    if (currentNumber !== '' && previousNumber !== '') {
        let result
        switch (currentOperator) {
            case '+':
                result = parseFloat(previousNumber) + parseFloat(currentNumber);
                break
            case '-':
                result = parseFloat(previousNumber) - parseFloat(currentNumber);
                break
            case '*':
                result = parseFloat(previousNumber) * parseFloat(currentNumber);
                break
            case '/':
                if (parseFloat(currentNumber) !== 0) {
                    result = parseFloat(previousNumber) / parseFloat(currentNumber);
                } else {
                    display.value = 'Error'
                    return
                }
                break
            default:
                result = 0
        }
        display.value = result
        currentNumber = result.toString()
        previousNumber = ''
        currentOperator = ''
    }
})
modulusButton.addEventListener('click', () => {
    if (currentNumber !== '' && previousNumber !== '') {
        let result = parseFloat(previousNumber) % parseFloat(currentNumber)
        display.value = result
        currentNumber = result.toString()
        previousNumber = ''
        currentOperator = ''
    } else {
        currentOperator = '%'
    }
})
clearButton.addEventListener('click', () => {
    display.value = ''
    currentNumber = ''
    previousNumber = ''
    currentOperator = ''
})
backspaceButton.addEventListener('click', () => {
    currentNumber = currentNumber.slice(0, -1)
    display.value = currentNumber
})
decimalButton.addEventListener('click', () => {
    if (!currentNumber.includes('.')) {
        currentNumber += '.'
        display.value = currentNumber
    }
})
















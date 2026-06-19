const display = document.getElementById('result')
const historyDisplay = document.getElementById('history')

const themeToggle = document.getElementById('theme-toggle')
const sunIcon = document.querySelector('.sun-icon')
const moonIcon = document.querySelector('.moon-icon')

let currentInput = '0'
let expressionArray = []
let isEvaluated = false

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme')

  switch (currentTheme) {
    case 'light':
      document.documentElement.setAttribute('data-theme', 'dark')
      sunIcon.style.display = 'block'
      moonIcon.style.display = 'none'
      break
    default:
      document.documentElement.setAttribute('data-theme', 'light')
      sunIcon.style.display = 'none'
      moonIcon.style.display = 'block'
      break
  }
})

document.getElementById('keypad').addEventListener('click', (e) => {
  const target = e.target.closest('button')
  if (!target) return

  const id = target.id
  const val = target.textContent.trim()

  switch (true) {
    case (target.classList.contains('btn-num') && id !== 'backspace'):
      handleDigit(val)
      break
    case target.classList.contains('btn-op'):
      handleOperator(val)
      break
    default:
      switch (id) {
        case 'clear': resetCalculator(); break
        case 'backspace': executeBackspace(); break
        case 'decimal': handleDecimal(); break
        case 'plusminus': toggleSign(); break
        case 'modulus': handlePercentage(); break
        case 'buttoneq': evaluateExpression(); break
      }
      break
  }
})

function handleDigit (digit) {
  if (isEvaluated) {
    currentInput = digit
    isEvaluated = false
  } else {
    currentInput = currentInput === '0' ? digit : currentInput + digit
  }
  updateUI()
}

function handleDecimal () {
  if (isEvaluated) {
    currentInput = '0.'
    isEvaluated = false
    updateUI()
    return
  }
  if (!currentInput.includes('.')) {
    currentInput += '.'
    updateUI()
  }
}

function handleOperator (op) {
  if (isEvaluated) isEvaluated = false

  if (currentInput !== '') {
    expressionArray.push(currentInput)
  }

  const lastItem = expressionArray[expressionArray.length - 1]
  if (['+', '−', '×', '÷'].includes(lastItem) && currentInput === '') {
    expressionArray[expressionArray.length - 1] = op
  } else {
    expressionArray.push(op)
  }

  currentInput = ''
  updateUI()
}

function executeBackspace () {
  if (isEvaluated) {
    expressionArray = []
    isEvaluated = false
  }
  currentInput = currentInput.slice(0, -1)
  if (currentInput === '' || currentInput === '-') currentInput = '0'
  updateUI()
}

function toggleSign () {
  if (currentInput !== '0' && currentInput !== '') {
    currentInput = (parseFloat(currentInput) * -1).toString()
    updateUI()
  }
}

function handlePercentage () {
  if (currentInput !== '' && currentInput !== '0') {
    currentInput = (parseFloat(currentInput) / 100).toString()
    updateUI()
  }
}

function resetCalculator () {
  currentInput = '0'
  expressionArray = []
  isEvaluated = false
  updateUI()
}

function parseMathString (str) {
  const tokens = str.split(' ')
  const values = []
  const ops = []

  const precedence = (op) => {
    if (op === '+' || op === '-') return 1
    if (op === '*' || op === '/') return 2
    return 0
  }

  const applyOp = () => {
    const b = values.pop()
    const a = values.pop()
    const op = ops.pop()
    switch (op) {
      case '+': values.push(a + b); break
      case '-': values.push(a - b); break
      case '*': values.push(a * b); break
      case '/': values.push(a / b); break
    }
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (!isNaN(parseFloat(token))) {
      values.push(parseFloat(token))
    } else {
      while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) {
        applyOp()
      }
      ops.push(token)
    }
  }

  while (ops.length) {
    applyOp()
  }

  return values[0]
}

function evaluateExpression () {
  if (currentInput !== '') {
    expressionArray.push(currentInput)
  }

  let formula = expressionArray.join(' ')
  if (!formula) return

  if (['+', '−', '×', '÷'].includes(expressionArray[expressionArray.length - 1])) {
    expressionArray.pop()
    formula = expressionArray.join(' ')
  }

  try {
    const sanitizedString = formula.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
    const calculatedVal = parseMathString(sanitizedString)

    if (!isFinite(calculatedVal)) {
      display.value = 'Error'
      currentInput = '0'
      expressionArray = []
    } else {
      currentInput = Number(calculatedVal.toFixed(10)).toString()
      historyDisplay.textContent = formula + ' ='
      display.value = currentInput
      expressionArray = []
      isEvaluated = true
    }
  } catch (err) {
    display.value = 'Error'
    currentInput = '0'
    expressionArray = []
  }
}

function updateUI () {
  display.value = currentInput || '0'
  historyDisplay.textContent = expressionArray.join(' ')
}

window.addEventListener('keydown', (e) => {
  e.preventDefault()

  switch (true) {
    case (e.key >= '0' && e.key <= '9'):
      handleDigit(e.key)
      break
    default:
      switch (e.key) {
        case '.': handleDecimal(); break
        case '+': handleOperator('+'); break
        case '-': handleOperator('−'); break
        case '*': handleOperator('×'); break
        case '/': handleOperator('÷'); break
        case '%': handlePercentage(); break
        case 'Enter':
        case '=':
          evaluateExpression()
          break
        case 'Backspace': executeBackspace(); break
        case 'Escape': resetCalculator(); break
      }
      break
  }
})
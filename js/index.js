/* Selecionar elemen com Dom */

const previosOperation = document.querySelector('#previous-operation')
const currentOperation = document.querySelector('#currrent-operation')
const buttonsContainer = document.querySelectorAll('#buttons-container button')


//  Class
class Calculator {
    constructor(previosOperation, currentOperation) {
        this.previosOperation = previosOperation
        this.currentOperation = currentOperation
        this.operationCurrent = ' '
    }

    // add digit to calculator screen
    addDigit(digit) {
        // check if current operation already has a dot
        if (digit === '.' && this.currentOperation.innerText.includes('.')) {
            return
        }
        this.operationCurrent = digit
        this.updateScreen()
    }

    // Process all calculator operation 
    processOperation(operation) {
        // Check if current is empty
        if (this.currentOperation.innerText === '' && operation !== 'C') {
            // Change operation
            if (this.previosOperation.innerText !== ' ') {
                this.changeOperation(operation)
            }
            return
        }

        // Get current and previous value 
        let operationValue
        let previous = +this.previosOperation.innerText.split(' ')[0]
        let current = +this.currentOperation.innerText

        switch (operation) {
            case '+':
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case '-':
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case '*':
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case '/':
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case 'DEL':
                this.processDelOperator()
                break
            case 'CE':
                this.processClearCurrentOperator()
                break
            case 'C':
                this.processClearAllOperation()
                break
            case '=':
                this.processEqualOperator()
                break
            default:
                return
        }

    }

    // Change values of the calculator screen 
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            this.currentOperation.innerText += this.operationCurrent

        }
        else {
            // check if value is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current
            }
            // Add current value to previous 
            this.previosOperation.innerText = `${operationValue} ${operation}`
            this.currentOperation.innerText = ' '
        }
    }

    // Change math operation 
    changeOperation(operation) {
        const mathOperation = ['+', '-', '*', '/']

        if (!mathOperation.includes(operation)) {
            return
        }
        this.previosOperation.innerText = this.previosOperation.innerText.slice(0, -1) + operation
    }

    // Delete the last digit
    processDelOperator() {
        this.currentOperation.innerText = this.currentOperation.innerText.slice(0, -1)
    }

    // Clear current operation 
    processClearCurrentOperator(){
        this.currentOperation.innerText = ' '
    }
    // Clear all operations
    processClearAllOperation(){
        this.currentOperation.innerText = ' '
        this.previosOperation.innerText = ' '
    }
    // Process and operation
    processEqualOperator(){
        const operation = this.previosOperation.innerText.split(' ')[1]

        this.processOperation(operation)
    }

}
const calc = new Calculator(previosOperation, currentOperation)

buttonsContainer.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText

        // Value to number converter
        if (+value >= 0 || value === '.') {
            console.log(value);
            calc.addDigit(value)
        }
        else {
            calc.processOperation(value)
        }

    })
})
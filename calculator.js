class Calculator {
    constructor(options) {
        this.id = options.id;
        this.theme = options.theme || 'default';
        this.result = '';
        this.lastNum = '';

        this.createCalculator();
    }

    createCalculator() {
        const container = document.getElementById(this.id);
        container.classList.add('calculator-container');
        container.classList.add('standart');

        const display = document.createElement('div');
        display.classList.add('calculator-display');

        const result = document.createElement('div');
        result.classList.add('result');
        result.innerHTML = '&#173;'

        const number = document.createElement('div');
        number.classList.add('number');

        number.textContent = this.result;
        
        display.appendChild(result);
        display.appendChild(number);
        
        container.appendChild(display);

        const buttons = [
            'C', '±', '√', '%',
            '7', '8', '9', '/',
            '4', '5', '6', '*',
            '1', '2', '3', '-',
            '0', '.', '=', '+',
        ];

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('calculator-buttons');
        container.appendChild(buttonContainer);

        buttons.forEach((btn) => {
            const button = document.createElement('button');
            button.textContent = btn;
                        
            button.addEventListener('click', () => this.handleButtonClick(btn));
            buttonContainer.appendChild(button);
        });
    }

    handleButtonClick(value) {
        const display = document.querySelector(`#${this.id} .calculator-display`);
        const result = document.querySelector(`#${this.id} .result`);
        const number = document.querySelector(`#${this.id} .number`);
        if(this.lastNum === '=') {
            this.result = '';
            result.innerHTML = '&#173;'
            number.textContent = '';
        }
        if (value === '=') {
            try {
                result.textContent = this.result + '=';
                this.result = eval(this.result).toString();
                number.textContent = this.result;
            } catch (error) {
                number.textContent = 'Error';
                this.result = '';
            }
        } else if (value === 'C') {
            this.result = '';
            number.textContent = '';
            result.innerHTML = '&#173;'
        } else if(['+', '-', '*', '/'].includes(value)) {
            this.result += value;
            result.innerHTML = this.result;
            number.textContent = '';
        } else {
            this.result += value;
            number.textContent += value;
        } 
        this.lastNum = value;
    }
}
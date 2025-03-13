class MobileButton {
    constructor(label, onClick) {
        this.label = label;
        this.onClick = onClick;
        this.buttonElement = this.createButtonElement();
    }

    createButtonElement() {
        const button = document.createElement('button');
        button.innerText = this.label;
        button.addEventListener('click', this.onClick);
        button.style.padding = '10px 20px';
        button.style.fontSize = '16px';
        button.style.borderRadius = '5px';
        button.style.border = 'none';
        button.style.backgroundColor = '#007BFF';
        button.style.color = '#FFFFFF';
        button.style.cursor = 'pointer';
        return button;
    }

}

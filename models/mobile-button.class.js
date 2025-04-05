class MobileButton {
  /**
   * Initializes a new instance of the MobileButton class.
   * Sets the button label and click handler, and creates the button element.
   *
   * @param {string} label - The text to display on the button.
   * @param {Function} onClick - The function to execute when the button is clicked.
   */

  constructor(label, onClick) {
    this.label = label;
    this.onClick = onClick;
    this.buttonElement = this.createButtonElement();
  }

  /**
   * Creates a button element with the specified label and onClick handler.
   * The button is styled with padding, font size, border radius, background color, and text color.
   *
   * @returns {HTMLButtonElement} The styled button element with event listener attached.
   */

  createButtonElement() {
    const button = document.createElement("button");
    button.innerText = this.label;
    button.addEventListener("click", this.onClick);
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.borderRadius = "5px";
    button.style.border = "none";
    button.style.backgroundColor = "#007BFF";
    button.style.color = "#FFFFFF";
    button.style.cursor = "pointer";
    return button;
  }
}

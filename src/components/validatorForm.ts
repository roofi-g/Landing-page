/**
 *
 */
export class ValidatorForm {

  private inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
  
  constructor (inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>) {
    this.inputs = inputs;
  }

  public validate() {
    let isValid = true;

    for (const input of this.inputs) {
      this.clearError(input);
      const field = this.validateField(input);
      if (!field) {
        isValid = false;
      }
    }

    return isValid;
  }

  private validateField(input: HTMLInputElement | HTMLTextAreaElement): boolean {
    const value = input.value.trim();
    const type = input.dataset.inputRequired;

    if (!value) {
      this.setError(input, "Пожалуйста, заполните поле");
      return false;
    }

    switch (type) {
      case "name":
        return this.validateName(input, value);

      case "email":
        return this.validateEmail(input, value);

      case "message":
        return this.validateMessage(input, value);

      default:
        return true;
    }
  }


  private validateName(input: HTMLInputElement | HTMLTextAreaElement, value: string): boolean {
    if (value.length < 3) {
      this.setError(input, "Короткое имя");
      return false;
    }
    return true;
  }

  private validateEmail(input: HTMLInputElement | HTMLTextAreaElement, value: string): boolean {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!ok) {
      this.setError(input, "Некорректный email");
      return false;
    }
    return true;
  }

  private validateMessage(input: HTMLInputElement | HTMLTextAreaElement, value: string): boolean {
    if (value.length < 10) {
      this.setError(input, "Короткое сообщение");
      return false;
    }
    return true;
  }


  private setError(input: HTMLInputElement | HTMLTextAreaElement, message: string): void {
    input.classList.add("error");

    const errorElem = input.nextElementSibling;
    if (errorElem) {
      errorElem.textContent = message;
    }
  }

  private clearError(input: HTMLInputElement | HTMLTextAreaElement): void {
    input.classList.remove("error");

    const errorElem = input.nextElementSibling;
    if (errorElem) {
      errorElem.textContent = "";
    }
  }

}
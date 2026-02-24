import { sendFormData } from "../services/sendFormData";
import { ValidatorForm } from "./validatorForm";

export class ContactForm {
  private form: HTMLFormElement;
  private inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
  private title: HTMLElement | null;
  private validateForm: ValidatorForm;
  blocks: NodeListOf<HTMLElement>;
  button: HTMLButtonElement | null;
  private isSubmitting = false;

  constructor(contactForm: HTMLFormElement, titleModal: HTMLElement | null) {
    this.form = contactForm;
    this.title = titleModal;

    this.inputs = this.form.querySelectorAll('[data-input-required]');
    this.blocks = this.form.querySelectorAll('[data-form]');
    this.button = this.form.querySelector('button[type="submit"]');

    this.validateForm = new ValidatorForm(this.inputs);

    this.form.addEventListener('submit', this.handleSubmit);
  }

  private handleSubmit = async (event: Event) => {
    event.preventDefault();

    // this.showMessage('body');
    if (this.isSubmitting) return;
    if (!this.validateForm.validate()) return;
    
    this.isSubmitting = true;
    this.toggleButton(true);

    const data = this.serializeForm();
    console.log(data);
    
    try {
      await sendFormData(data);

      this.showMessage('success');
      this.inputs.forEach(input => input.value = '');
      // this.form.reset();

    } catch (error: unknown) {
      console.error("Ошибка отправки формы:", error)
      this.showMessage('error');
    } finally {
      this.isSubmitting = false;
      this.toggleButton(false);
    }
  }

  private serializeForm() {
    const formData = new FormData(this.form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      (data as any)[key] = String(value).trim();
    }

    return data;
  }

  private showMessage(state: "body" | "success" | "error"): void {
    if (this.title) {
      this.title.textContent = 
        (state === "success") 
          ? "Успешно отправлено!" 
          : "Ошибка при отправке!";
    } 
    this.blocks.forEach(block => {
      block.hidden = block.dataset.form !== state;
    });
  }

  private toggleButton(disabled: boolean) {
    if (this.button) {
      this.button.disabled = disabled;
      this.button.textContent = disabled ? "Submit..." : "SUBMIT";
    }
  }

  public destroy(): void {
    this.form.removeEventListener("submit", this.handleSubmit);
  }
}

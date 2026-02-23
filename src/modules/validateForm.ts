export class ValidateForm {
  private form: HTMLFormElement;
  private inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
  private title: HTMLElement | null;

  constructor(form: HTMLFormElement, titleModal: HTMLElement | null) {
    this.form = form;
    this.inputs = form.querySelectorAll('[data-input-required]');
    this.title = titleModal;
  }

  public init(): void {
    this.form.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      const isValid = this.validateForm();

      if (isValid) {
        this.onSuccess();
      }
    });
  }

  private validateForm(): boolean {
    let isValid = true;

    this.inputs.forEach((input: HTMLInputElement | HTMLTextAreaElement) => {

      this.clearError(input);
      const value = input.value.trim();

      if (!value) {
        this.setError(input, "Пожалуйста, заполните поле");
        isValid = false;
        return;
      }

      if (input.classList.contains("name") && value.length < 2) {
        this.setError(input, "Короткое имя");
        isValid = false;
        return;
      }

      if (input.classList.contains("email")) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!ok) {
          this.setError(input, "Некорректный email");
          isValid = false;
          return;
        }
      }

      if (input.classList.contains("message") && value.length < 15) {
        this.setError(input, "Короткое сообщение");
        isValid = false;
        return;
      }
    });

    return isValid;
  }

  private changeModalWindow(): void {
    if (this.title) {
      this.title.textContent = "Успешно отправлено!";
    }
    this.form.innerHTML = `
      <div class="success-message">
        <p>Спасибо, данные сохранены.</p>
      </div>
    `;
  }

  private setError(input: HTMLInputElement | HTMLTextAreaElement, message: string): void {
    const field = input.closest(".field");

    if (!field) return;

    const error = field.querySelector('.error-message');

    if (error) {
      input.classList.add('error');
      error.textContent = message;
    }
  }

  private clearError(input: HTMLInputElement | HTMLTextAreaElement): void {
    const field = input.closest(".field");

    if (!field) return;

    const error = field.querySelector(".error-message");

    if (error) {
      input.classList.remove('error');
      error.textContent = '';
    }
  }

  private async onSuccess(): Promise<void> {
    try {
      const formData = new FormData(this.form);
  
      const contactData = {
        name: formData.get('name')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        message: formData.get('message')?.toString() || ''
      };

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 
          'Content-Type': 
          'application/json' 
        },
        body: JSON.stringify(contactData),
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse JSON:', responseText);
        throw new Error('Invalid server response');
      }

      if (response.ok) {
        this.changeModalWindow();
        this.form.reset();
      } else {
        console.error(`Ошибка: ${data.details || data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      console.error("Ошибка отправки: ", err.message);
    }
  }
}

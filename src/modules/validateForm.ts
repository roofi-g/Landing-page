class validateForm {
  constructor(form) {
    this.form = form;
    this.inputs = form.querySelectorAll('.js-validate')
  }

  init() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const isValid = this.validateForm();

      if (isValid) {
        this.onSuccess();
      }
    });
  }

  validateForm() {
    let isValid = true;
    this.inputs.forEach(input => {

      this.clearError(input);
      const value = input.value.trim();

      if (!value) {
        this.setError(input, 'Пожалуйста, заполните поле');
        isValid = false;
        return;
      }

      if (input.classList.contains('name') && value.length < 2) {
        this.setError(input, 'Короткое имя');
        isValid = false;
        return;
      }

      if (input.classList.contains('email')) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!ok) {
          this.setError(input, 'Некорректный email');
          isValid = false;
          return;
        }
      }

      if (input.classList.contains('message') && value.length < 15) {
        this.setError(input, 'Короткое сообщение');
        isValid = false;
        return;
      }
    });

    return isValid;
  }

  setError(input, message) {
    const field = input.closest('.field');
    const error = field.querySelector('.error-message');
    
    input.classList.add('error');
    error.textContent = message;
  }

  clearError(input) {
    const field = input.closest('.field');
    const error = field.querySelector('.error-message');
    
    input.classList.remove('error');
    error.textContent = '';
  }

  onSuccess() {
    fetch('api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.form.name.value,
      }),
    })
    .then(res => res.json())
    .then(() => {
      console.log('Форма валидна');
      this.form.reset();
    })
    .catch(() => {
      console.log('Ошибка отправки');
    })
  }
}

const form = document.getElementById('modalForm');
const validator = new validateForm(form);
validator.init();
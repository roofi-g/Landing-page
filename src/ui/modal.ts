/**
 *
 */
export class Modal {

  private modal: HTMLElement;

  constructor(modalElem: HTMLElement) {
    this.modal = modalElem;
  }

  open() {
    this.modal.classList.add("modal-show");
    document.body.classList.add("modal-overflow");
    this.modal.addEventListener("click", this.handleOutsideClick);
  }

  close() {
    this.modal.classList.remove("modal-show");
    document.body.classList.remove("modal-overflow");
    this.modal.removeEventListener("click", this.handleOutsideClick);
  }

  private handleOutsideClick = (event: MouseEvent) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return; 
    }

    if (
      target === this.modal ||
      target.closest("[data-modal-close]")
    ) {
      this.close();
    }
  };

}
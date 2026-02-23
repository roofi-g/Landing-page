import "./ui/getFullYear";

import { HeaderScroll } from "./ui/headerScroll";
import { ValidateForm } from "./modules/validateForm";
import { Modal } from "./ui/Modal";

const header = document.getElementById("header");

const modalElem = document.querySelector<HTMLElement>('[data-modal]');
const openModalBtn = document.querySelector('[data-modal-open]');

const form = document.getElementById("modalForm") as HTMLFormElement;
const titleModal = document.querySelector(".modal-title h2") as HTMLElement;

if (header) {
  const headerScroll = new HeaderScroll(header);
  headerScroll.init();
}

if (modalElem && openModalBtn) {
  const modal = new Modal(modalElem);

  openModalBtn?.addEventListener('click', () => {
    modal.open();
  });
}

const validator = new ValidateForm(form, titleModal);
validator.init();
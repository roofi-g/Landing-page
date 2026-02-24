import "./ui/getFullYear";

import { HeaderScroll } from "./ui/headerScroll";
import { ContactForm } from "./components/contactForm";
import { Modal } from "./ui/modal";

const header = document.getElementById("header");

const modalElem = document.querySelector<HTMLElement>('[data-modal]');
const openModalBtn = document.querySelector('[data-modal-open]');
const contactForm = document.getElementById("contactForm");
const titleModal = document.getElementById("modal-title");

if (header) {
  const headerScroll = new HeaderScroll(header);
  headerScroll.init();
}

if (modalElem && openModalBtn && contactForm instanceof HTMLFormElement && titleModal) {
  const modal = new Modal(modalElem);
  const form = new ContactForm(contactForm, titleModal);

  openModalBtn?.addEventListener('click', () => {
    modal.open();
    form.resetFormState();
  });
}
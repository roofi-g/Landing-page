import "./ui/getFullYear";

import { HeaderScroll } from "./ui/headerScroll";
import { ContactForm } from "./components/contactForm";
import { Modal } from "./ui/modal";

const header = document.getElementById("header");

const modalElem = document.querySelector<HTMLElement>('[data-modal]');
const openModalBtn = document.querySelector('[data-modal-open]');

const contactForm = document.getElementById("contactForm") as HTMLFormElement;
const titleModal = document.getElementById("modal-title") as HTMLElement;

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

const validator = new ContactForm(contactForm, titleModal);
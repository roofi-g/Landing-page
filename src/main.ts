import { ContactForm } from "./components/contactForm";
import { HeaderScroll } from "./ui/headerScroll";
import { Modal } from "./ui/modal";
import { getDate } from "./utils/getFullYear";

const header = document.getElementById("header");
const dateElement = document.getElementById("date");

const modalElem = document.querySelector<HTMLElement>("[data-modal]");
const openModalBtn = document.querySelector<HTMLButtonElement>("[data-modal-open]");
const contactForm = document.getElementById("contactForm");
const titleModal = document.getElementById("modal-title");

if (header) {
  const headerScroll = new HeaderScroll(header);
  headerScroll.init();
}

if (modalElem && openModalBtn && contactForm instanceof HTMLFormElement && titleModal) {
  const modal = new Modal(modalElem);
  const form = new ContactForm(contactForm, titleModal);

  const handleOpenModal = () => {
    modal.open();
    form.resetFormState();
  };

  openModalBtn.addEventListener("click", handleOpenModal);
}

if (dateElement) {
  getDate(dateElement);
}

const modal = document.getElementById("modalWindow");
const openModalWindow = document.getElementById("openModalWindow");

openModalWindow?.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});
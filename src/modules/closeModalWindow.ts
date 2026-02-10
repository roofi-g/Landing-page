const modal = document.getElementById('modalWindow');
const closeModalWindow = document.querySelector('.modal-close');

closeModalWindow?.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
})

window.addEventListener('click', (event) => {
  if(event.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
})
const dateElement = document.getElementById("date");

if (dateElement) {
  const year = new Date().getFullYear();
  
  dateElement.textContent = String(year);
}
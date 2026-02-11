const dateElement = document.getElementById("date");

if (dateElement) {
  dateElement.textContent = new Date().toLocaleDateString("ru-RU", { 
    year: "numeric" 
  });
}
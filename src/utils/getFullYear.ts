/**
 *
 */
export const getDate = (dateElement: HTMLElement) => {
  const year = new Date().getFullYear();

  dateElement.textContent = String(year);
};
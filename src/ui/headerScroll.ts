export class HeaderScroll {
  header: HTMLElement;
  constructor(header: HTMLElement) {
    this.header = header;
  }

  init() {
    window.addEventListener('scroll', this.handleScroll);
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll = () => {
    this.header.classList.toggle('scrolled', window.scrollY > 50);
  }
}
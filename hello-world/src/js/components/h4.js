export class H4 {
  constructor (text, className) {
    this.element = document.createElement('h4')
    this.element.innerText = text
    this.element.className = className
  }
}

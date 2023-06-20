export class Input {
  constructor (id, type, className, placeholder, value) {
    this.element = document.createElement('input')
    this.element.id = id
    this.element.type = type
    this.element.className = className
    this.element.placeholder = placeholder
    this.element.required = true
    this.element.value = value
  }

  addListener (fn) {
    this.element.addEventListener('click', fn)
  }
}

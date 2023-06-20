export class Select {
  constructor (id, className) {
    this.element = document.createElement('select')
    this.element.id = id
    this.element.className = className
    this.element.required = true
  }

  addOption (text) {
    const option = document.createElement('option')
    option.text = text
    option.value = text
    this.element.appendChild(option)
  }
}

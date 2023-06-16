export class Chart {
  constructor () {
    this.element = document.createElement('div')
    this.element.className = 'chart'
    this.colors = ['red', 'yellow', 'green', 'blue']
  }

  addColumn (value, description) {
    const column = document.createElement('div')
    column.className = 'chart-column'

    const color = document.createElement('div')
    color.className = 'chart-column-color'
    color.style.height = `${(value * 100) / 10000}px`
    color.style.background = this.colors.pop()

    const monthName = document.createElement('div')
    monthName.className = 'chart-column-text'
    monthName.innerText = description

    column.appendChild(color)
    column.appendChild(monthName)
    this.element.appendChild(column)
  }
}

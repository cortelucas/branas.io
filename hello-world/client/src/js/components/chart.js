export class CreateChart {
  constructor (year) {
    this.element = document.createElement('canvas')
    this.element.className = 'chart'
    this.element.id = 'chart'
    this.element.width = 600
    this.element.height = 300
    this.year = year
    this.ctx = this.element.getContext('2d')
    this.init(this.ctx, this.year.months)
  }

  init (ctx, months) {
    const data = {
      labels: [],
      datasets: [{
        data: [],
        label: 'Mapa de Finanças'
      }]
    }
    const config = {
      type: 'bar',
      data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
    for (const month of months) {
      data.labels.push(month.name)
      data.datasets[0].data.push(month.monthBalance.balance)
    }

    new Chart(ctx, config)
  }
}

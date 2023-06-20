export class AddMonthInYear {
  constructor (year) {
    this.year = year
  }

  execute (month) {
    this.year.months.push(month)
  }
}

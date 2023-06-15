export class Year {
  constructor () {
    this.months = []
  }

  calculateYearBalance () {
    let openingBalance = 0
    for (const month of this.months) {
      month.openingBalance = openingBalance
      month.calculateBalance()
      openingBalance = month.monthBalance.balance
    }
  }
}

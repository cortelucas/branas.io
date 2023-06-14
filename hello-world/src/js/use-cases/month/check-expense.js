export class CheckExpense {
  constructor (month) {
    this.month = month
  }

  async execute () {
    for (const release of this.month.financialReleases) {
      if (release.type === 'despesa') {
        this.month.monthBalance.balance -= release.value
        this.month.monthBalance.expenses += release.value
      }
    }
  }
}

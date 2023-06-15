export class CheckRevenue {
  constructor (month) {
    this.month = month
  }

   execute () {
    for (const release of this.month.financialReleases) {
      if (release.type === 'receita') {
        this.month.monthBalance.balance += release.value
        this.month.monthBalance.revenues += release.value
      }
    }
  }
}

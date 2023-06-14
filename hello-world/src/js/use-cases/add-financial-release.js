export class AddFinancialRelease {
  constructor (month) {
    this.month = month
  }

  execute (financialRelease) {
    this.month.financialReleases.push(financialRelease)
  }
}

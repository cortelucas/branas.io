export class AddFinancialRelease {
  constructor (month) {
    this.month = month
  }

  async execute (financialRelease) {
    this.month.financialReleases.push(financialRelease)
  }
}

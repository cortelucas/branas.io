import { AddFinancialRelease } from '../month/add-financial-release.js'

export class AddMonthlyFinancialRelease {
  constructor (year) {
    this.year = year
  }

  execute (monthName, financialRelease) {
    for (const month of this.year.months) {
      if (month.name === monthName) {
        const addRelease = new AddFinancialRelease(month)
        addRelease.execute(financialRelease)
        break
      }
    }
  }
}

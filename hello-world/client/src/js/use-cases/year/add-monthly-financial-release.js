import { Month } from '../../domain/index.js'
import { AddFinancialRelease } from '../month/index.js'
import { AddMonthInYear } from './index.js'

export class AddMonthlyFinancialRelease {
  constructor (year) {
    this.year = year
  }

  execute (monthName, financialRelease) {
    if (!this.year.months.some(month => month.name === monthName)) {
      const addMonth = new AddMonthInYear(this.year)
      addMonth.execute(new Month(monthName))
    }
    for (const month of this.year.months) {
      if (month.name === monthName) {
        const addRelease = new AddFinancialRelease(month)
        addRelease.execute(financialRelease)
        break
      }
    }
  }
}

import { AccurateIncome } from '../use-cases/accurate-income.js'
import { AccurateInterest } from '../use-cases/accurate-interest.js'
import { CheckExpense } from '../use-cases/check-expense.js'
import { CheckRevenue } from '../use-cases/check-revenue.js'
import { DistributeExpenses } from '../use-cases/distribute-expenses.js'
import { Capitalize } from '../utils/capitalize.js'

export class Month {
  constructor (name, openingBalance) {
    if (name === '') throw new Error('Mês Inválido: O nome é obrigatório.')
    this.name = Capitalize.execute(name)
    this.openingBalance = openingBalance
    this.monthBalance = {
      balance: 0,
      openingBalance,
      interest: 0,
      income: 0,
      revenues: 0,
      expenses: 0,
      expensesDistribution: []
    }
    this.financialReleases = []
  }

  calculateBalance () {
    this.monthBalance.balance = this.openingBalance
    const distributeExpenses = new DistributeExpenses(this)
    const accurateInterest = new AccurateInterest(this)
    const accurateIncome = new AccurateIncome(this)
    const checkRevenue = new CheckRevenue(this)
    const checkExpense = new CheckExpense(this)

    checkRevenue.execute()
    checkExpense.execute()
    distributeExpenses.execute()
    accurateInterest.execute()
    accurateIncome.execute()
  }
}

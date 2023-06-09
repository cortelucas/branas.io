import { AccurateIncome, AccurateInterest, CheckExpense, CheckRevenue, DistributeExpenses } from '../use-cases/month/index.js'
import { Capitalize } from '../utils/index.js'

export class Month {
  constructor (name) {
    if (name === '') throw new Error('Mês Inválido: O nome é obrigatório.')
    this.name = Capitalize.execute(name)
    this.openingBalance = 0
    this.monthBalance = {
      balance: 0,
      interest: 0,
      income: 0,
      revenues: 0,
      expenses: 0,
      expensesDistribution: []
    }
    this.financialReleases = []
  }

  calculateBalance () {
    this.monthBalance = {
      balance: 0,
      interest: 0,
      income: 0,
      revenues: 0,
      expenses: 0,
      expensesDistribution: []
    }
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

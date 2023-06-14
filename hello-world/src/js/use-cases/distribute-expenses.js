import { Round } from '../utils/round.js'

export class DistributeExpenses {
  constructor (month) {
    this.month = month
  }

  execute () {
    const expensesDistribution = []
    for (const release of this.month.financialReleases) {
      if (release.type === 'despesa') {
        const percent = Round.execute((release.value / this.month.monthBalance.expenses) * 100)

        expensesDistribution.push({ category: release.category, percent })
      }
    }

    this.month.monthBalance.expensesDistribution = expensesDistribution
  }
}

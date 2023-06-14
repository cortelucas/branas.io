import { Round } from '../utils/round.js'
import { CalculateIncome } from './calculate-income.js'

export class AccurateIncome {
  constructor (month) {
    this.month = month
  }

  execute () {
    if (this.month.monthBalance.balance > 0) {
      this.month.monthBalance.income = CalculateIncome.execute(this.month.monthBalance.balance)
      this.month.monthBalance.balance = Round.execute(this.month.monthBalance.income + this.month.monthBalance.balance)
    }
  }
}

import { Round } from '../utils/round.js'
import { CalculateInterest } from './calculate-interest.js'

export class AccurateInterest {
  constructor (month) {
    this.month = month
  }

  execute () {
    if (this.month.monthBalance.balance < 0) {
      this.month.monthBalance.interest = CalculateInterest.execute(this.month.monthBalance.balance)
      this.month.monthBalance.balance = Round.execute(this.month.monthBalance.balance + this.month.monthBalance.interest)
    }
  }
}

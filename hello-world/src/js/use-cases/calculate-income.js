import { Round } from '../utils/round.js'

export class CalculateIncome {
  static execute (value) {
    return Round.execute(value * 0.005)
  }
}

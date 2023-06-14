import { Round } from '../utils/round.js'

export class CalculateInterest {
  static execute (value) {
    return Round.execute(value * 0.1)
  }
}

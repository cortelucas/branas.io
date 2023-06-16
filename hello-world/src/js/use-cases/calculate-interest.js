import { Round } from '../utils/index.js'

export class CalculateInterest {
  static execute (value) {
    return Round.execute(value * 0.1)
  }
}

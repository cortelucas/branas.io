import { capitalize } from '../utils/capitalize.js'
import { round } from '../utils/round.js'
import { calculateIncome } from './calculateIncome.js'
import { calculateInterest } from './calculateInterest.js'

export const calculateBalance = (month, openingBalance, financialReleases) => {
    console.log(capitalize(month))
    let balance = openingBalance

    for (let release of financialReleases) {
        balance += release
    }

    const isNegative = balance < 0

    if (isNegative) {
        const interest = calculateInterest(balance)
        balance = round(balance + interest)
    } else {
        const income = calculateIncome(balance)
        balance = income + balance
    }

    return balance
}

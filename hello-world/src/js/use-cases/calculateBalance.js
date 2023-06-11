import { capitalize } from '../utils/capitalize.js'
import { round } from '../utils/round.js'
import { calculateIncome } from './calculateIncome.js'
import { calculateInterest } from './calculateInterest.js'
import { distributeExpenses } from './distributeExpenses.js'

export const calculateBalance = (month, openingBalance, financialReleases) => {
  console.log(capitalize(month))

  const monthBalance = {
    balance: 0,
    openingBalance,
    interest: 0,
    income: 0,
    revenue: 0,
    expense: 0,
    expensesDistribution: []
  }
  monthBalance.balance = openingBalance

  for (const release of financialReleases) {
    if (release.type === 'receita') {
      monthBalance.balance += release.value
      monthBalance.revenue += release.value
    }
    if (release.type === 'despesa') {
      monthBalance.balance -= release.value
      monthBalance.expense += release.value
    }
  }

  monthBalance.expensesDistribution = distributeExpenses(financialReleases, monthBalance.expense)

  const isNegative = monthBalance.balance < 0

  if (isNegative) {
    monthBalance.interest = calculateInterest(monthBalance.balance)
    monthBalance.balance = round(monthBalance.balance + monthBalance.interest)
  } else {
    monthBalance.income = calculateIncome(monthBalance.balance)
    monthBalance.balance = round(monthBalance.income + monthBalance.balance)
  }

  return monthBalance
}

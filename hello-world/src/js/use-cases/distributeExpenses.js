import { round } from "../utils/round.js"

export const distributeExpenses = (financialReleases, totalExpenses) => {
    const expensesDistribution = []
    for (const release of financialReleases) {
        if (release.type === 'despesa') {
            const percent = round((release.value / totalExpenses) * 100)

            expensesDistribution.push({ category: release.category, percent })
        }
    }

    return expensesDistribution
}
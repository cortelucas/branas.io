import { FinancialRelease } from './model/financial-release.js'
import { Month } from './model/month.js'
import { AddFinancialRelease } from './use-cases/add-financial-release.js'

const addFinancialRelease = mouth => new AddFinancialRelease(mouth)

const January = new Month('janeiro', 0)
const releaseJanuary = addFinancialRelease(January)
releaseJanuary.execute(new FinancialRelease('Salário', 'receita', 3000))
releaseJanuary.execute(new FinancialRelease('Aluguel', 'despesa', 1000))
releaseJanuary.execute(new FinancialRelease('Conta de Energia', 'despesa', 200))
releaseJanuary.execute(new FinancialRelease('Conta de Água', 'despesa', 100))
releaseJanuary.execute(new FinancialRelease('Internet', 'despesa', 100))
releaseJanuary.execute(new FinancialRelease('Transporte', 'despesa', 300))
releaseJanuary.execute(new FinancialRelease('Lazer', 'despesa', 300))
releaseJanuary.execute(new FinancialRelease('Alimentação', 'despesa', 500))
releaseJanuary.execute(new FinancialRelease('Condomínio', 'despesa', 300))
releaseJanuary.execute(new FinancialRelease('Farmácia', 'despesa', 100))
January.calculateBalance()
console.log(January)

const February = new Month('fevereiro', January.monthBalance.balance)
const releaseFebruary = addFinancialRelease(February)
releaseFebruary.execute(new FinancialRelease('Salário', 'receita', 3000))
releaseFebruary.execute(new FinancialRelease('Aluguel', 'despesa', 1200))
releaseFebruary.execute(new FinancialRelease('Conta de Energia', 'despesa', 250))
releaseFebruary.execute(new FinancialRelease('Conta de Água', 'despesa', 100))
releaseFebruary.execute(new FinancialRelease('Internet', 'despesa', 100))
releaseFebruary.execute(new FinancialRelease('Transporte', 'despesa', 500))
releaseFebruary.execute(new FinancialRelease('Alimentação', 'despesa', 1000))
releaseFebruary.execute(new FinancialRelease('Condomínio', 'despesa', 400))
February.calculateBalance()
console.log(February)

const March = new Month('março', February.monthBalance.balance)
const releaseMarch = addFinancialRelease(March)
releaseMarch.execute(new FinancialRelease('Salário', 'receita', 4000))
releaseMarch.execute(new FinancialRelease('Aluguel', 'despesa', 1200))
releaseMarch.execute(new FinancialRelease('Conta de Energia', 'despesa', 200))
releaseMarch.execute(new FinancialRelease('Conta de Água', 'despesa', 100))
releaseMarch.execute(new FinancialRelease('Internet', 'despesa', 200))
releaseMarch.execute(new FinancialRelease('Transporte', 'despesa', 500))
releaseMarch.execute(new FinancialRelease('Lazer', 'despesa', 800))
releaseMarch.execute(new FinancialRelease('Alimentação', 'despesa', 1000))
releaseMarch.execute(new FinancialRelease('Condomínio', 'despesa', 400))
March.calculateBalance()
console.log(March)

const total = March.monthBalance.balance
console.log(`Total Ano: R$ ${total}`)

console.log({
  test: {
    January: January.monthBalance.balance === 100.5,
    February: February.monthBalance.balance === -494.45,
    March: March.monthBalance.balance === -983.89
  }
})

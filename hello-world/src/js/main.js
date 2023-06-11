import { FinancialReleases } from './model/financial-release.js'
import { calculateBalance } from './use-cases/calculateBalance.js'
import { round } from './utils/round.js'

const JanuaryReleases = [
  new FinancialReleases('Salário', 'receita', 3000),
  new FinancialReleases('Aluguel', 'despesa', 1000),
  new FinancialReleases('Conta de Energia', 'despesa', 100),
  new FinancialReleases('Conta de Água', 'despesa', 200),
  new FinancialReleases('Internet', 'despesa', 100),
  new FinancialReleases('Transporte', 'despesa', 300),
  new FinancialReleases('Lazer', 'despesa', 300),
  new FinancialReleases('Alimentação', 'despesa', 500),
  new FinancialReleases('Condomínio', 'despesa', 200),
  new FinancialReleases('Farmácia', 'despesa', 100)
]
const janeiro = calculateBalance('janeiro', 0, JanuaryReleases)
console.log(janeiro)

const FebruaryReleases = [
  new FinancialReleases('Salário', 'receita', 3000),
  new FinancialReleases('Aluguel', 'despesa', 1200),
  new FinancialReleases('Conta de Energia', 'despesa', 250),
  new FinancialReleases('Conta de Água', 'despesa', 100),
  new FinancialReleases('Internet', 'despesa', 100),
  new FinancialReleases('Transporte', 'despesa', 500),
  new FinancialReleases('Alimentação', 'despesa', 1000),
  new FinancialReleases('Condomínio', 'despesa', 200)
]
const fevereiro = calculateBalance('fevereiro', janeiro.balance, FebruaryReleases)
console.log(fevereiro)

const MarchReleases = [
  new FinancialReleases('Salário', 'receita', 4000),
  new FinancialReleases('Aluguel', 'despesa', 1200),
  new FinancialReleases('Conta de Energia', 'despesa', 100),
  new FinancialReleases('Conta de Água', 'despesa', 200),
  new FinancialReleases('Internet', 'despesa', 200),
  new FinancialReleases('Transporte', 'despesa', 500),
  new FinancialReleases('Lazer', 'despesa', 800),
  new FinancialReleases('Alimentação', 'despesa', 1000),
  new FinancialReleases('Condomínio', 'despesa', 200)
]
const marco = calculateBalance('março', fevereiro.balance, MarchReleases)
console.log(marco)

const total = marco.balance
console.log(`Total Ano: R$ ${total}`)

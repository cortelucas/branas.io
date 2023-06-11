import { calculateBalance } from './usecases/calculateBalance.js'
import { round } from './utils/round.js'

const JanuaryReleases = [
  { categoria: 'Salário', type: 'receita', value: 3000 },
  { categoria: 'Aluguel', type: 'despesa', value: 1000 },
  { categoria: 'Conta de Energia', type: 'despesa', value: 100 },
  { categoria: 'Conta de Água', type: 'despesa', value: 200 },
  { categoria: 'Internet', type: 'despesa', value: 100 },
  { categoria: 'Transporte', type: 'despesa', value: 300 },
  { categoria: 'Lazer', type: 'despesa', value: 300 },
  { categoria: 'Alimentação', type: 'despesa', value: 500 },
  { categoria: 'Condomínio', type: 'despesa', value: 200 },
  { categoria: 'Farmácia', type: 'despesa', value: 100 }
]
console.log(JanuaryReleases)
const saldo1 = calculateBalance('janeiro', 0, JanuaryReleases)
console.log(`R$ ${saldo1}`)

const FebruaryReleases = [
  { categoria: 'Salário', type: 'receita', value: 3000 },
  { categoria: 'Aluguel', type: 'despesa', value: 1200 },
  { categoria: 'Conta de Energia', type: 'despesa', value: 250 },
  { categoria: 'Conta de Água', type: 'despesa', value: 100 },
  { categoria: 'Internet', type: 'despesa', value: 100 },
  { categoria: 'Transporte', type: 'despesa', value: 500 },
  { categoria: 'Alimentação', type: 'despesa', value: 1000 },
  { categoria: 'Condomínio', type: 'despesa', value: 200 }

]
const saldo2 = calculateBalance('fevereiro', saldo1, FebruaryReleases)
console.log(`R$ ${saldo2}`)

const MarchReleases = [
  { categoria: 'Salário', type: 'receita', value: 4000 },
  { categoria: 'Aluguel', type: 'despesa', value: 1200 },
  { categoria: 'Conta de Energia', type: 'despesa', value: 100 },
  { categoria: 'Conta de Água', type: 'despesa', value: 200 },
  { categoria: 'Internet', type: 'despesa', value: 200 },
  { categoria: 'Transporte', type: 'despesa', value: 500 },
  { categoria: 'Lazer', type: 'despesa', value: 800 },
  { categoria: 'Alimentação', type: 'despesa', value: 1000 },
  { categoria: 'Condomínio', type: 'despesa', value: 200 }
]
const saldo3 = calculateBalance('março', saldo2, MarchReleases)

const total = round(saldo3)
console.log(`R$ ${total}`)

console.log(`Balanço anual: R$ ${total}`)

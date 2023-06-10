import { calculateBalance } from "./usecases/calculateBalance.js"
import { round } from "./utils/round.js"

const JanuaryReleases = [3000, -1000, -100, -200, -100, -300, -300, -500]

const saldo1 = calculateBalance("janeiro", 0, JanuaryReleases)
console.log(`R$ ${saldo1}`)

const FebruaryReleases = [3000, -1200, -100, -250, -100, -500, -1000]
const saldo2 = calculateBalance("fevereiro", saldo1, FebruaryReleases)
console.log(`R$ ${saldo2}`)

const MarchReleases = [4000, -1200, -100, -200, -200, -500, -800, -1000]
const saldo3 = calculateBalance("março", saldo2, MarchReleases)

let total = round(saldo3)
console.log(`R$ ${total}`)

console.log(`Balanço anual: R$ ${total}`)
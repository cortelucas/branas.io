import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())
app.use('/', express.static('./client'))

const financialReleases = [
    { month: 'Janeiro',   category: 'Salário',          type: 'receita', value: 3000 },
    { month: 'Janeiro',   category: 'Aluguel',          type: 'despesa', value: 1000 },
    { month: 'Janeiro',   category: 'Conta de Energia', type: 'despesa', value: 200 },
    { month: 'Janeiro',   category: 'Conta de Água',    type: 'despesa', value: 100 },
    { month: 'Janeiro',   category: 'Internet',         type: 'despesa', value: 100 },
    { month: 'Janeiro',   category: 'Transporte',       type: 'despesa', value: 300 },
    { month: 'Janeiro',   category: 'Lazer',            type: 'despesa', value: 300 },
    { month: 'Janeiro',   category: 'Alimentação',      type: 'despesa', value: 500 },
    { month: 'Janeiro',   category: 'Condomínio',       type: 'despesa', value: 300 },
    { month: 'Janeiro',   category: 'Farmácia',         type: 'despesa', value: 100 },
    { month: 'Fevereiro', category: 'Salário',          type: 'receita', value: 3000},
    { month: 'Fevereiro', category: 'Aluguel',          type: 'despesa', value: 1200},
    { month: 'Fevereiro', category: 'Conta de Energia', type: 'despesa', value: 250},
    { month: 'Fevereiro', category: 'Conta de Água',    type: 'despesa', value: 100},
    { month: 'Fevereiro', category: 'Internet',         type: 'despesa', value: 100},
    { month: 'Fevereiro', category: 'Transporte',       type: 'despesa', value: 500},
    { month: 'Fevereiro', category: 'Alimentação',      type: 'despesa', value: 1000},
    { month: 'Fevereiro', category: 'Condomínio',       type: 'despesa', value: 400},
    { month: 'Março',     category: 'Salário',          type: 'receita', value: 4000 },
    { month: 'Março',     category: 'Aluguel',          type: 'despesa', value: 1200 },
    { month: 'Março',     category: 'Conta de Energia', type: 'despesa', value: 200 },
    { month: 'Março',     category: 'Conta de Água',    type: 'despesa', value: 100 },
    { month: 'Março',     category: 'Internet',         type: 'despesa', value: 200 },
    { month: 'Março',     category: 'Transporte',       type: 'despesa', value: 500 },
    { month: 'Março',     category: 'Lazer',            type: 'despesa', value: 800 },
    { month: 'Março',     category: 'Alimentação',      type: 'despesa', value: 1000 },
    { month: 'Março',     category: 'Condomínio',       type: 'despesa', value: 400 },
    { month: 'Abril',     category: 'Salário',          type: 'receita', value: 4000 }
]

app.get('/api/financial-releases', (request, response) => response.json(financialReleases))

app.post('/api/financial-releases', (request, response) => {
    const financialRelease = request.body
    financialReleases.push(financialRelease)
    console.log(financialReleases)

    response.send()
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}!`))
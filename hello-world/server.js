import express from 'express'
import pgp from 'pg-promise'

const PORT = 3000

const app = express()
app.use(express.json())
app.use('/', express.static('./client'))

const connection = pgp()('postgres://postgres:postgres@localhost:5432/postgres')

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

app.get('/api/financial-releases', async (request, response) => {
    const financialReleases = await connection.query('select * from personal_finances.financial_release;', [])
    response.json(financialReleases)
})

app.post('/api/financial-releases', async (request, response) => {
    const financialRelease = request.body
    
    await connection.query(
        'insert into personal_finances.financial_release (month, category, type, value) values ($1, $2, $3, $4);', 
        [financialRelease.month, financialRelease.category, financialRelease.type, financialRelease.value]
    )

    response.end()
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}!`))
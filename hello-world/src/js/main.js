import { FinancialRelease } from './model/financial-release.js'
import { Month } from './model/month.js'
import { Year } from './model/year.js'
import { AddFinancialRelease } from './use-cases/month/add-financial-release.js'
import { AddMonthInYear } from './use-cases/year/add-month-in-year.js'
import { AddMonthlyFinancialRelease } from './use-cases/year/add-monthly-financial-release.js'

const year = new Year()
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

const addMonth = new AddMonthInYear(year)
addMonth.execute(January)
addMonth.execute(February)
addMonth.execute(March)
year.calculateYearBalance()

console.log(year.months)

function addElement (parent, elementType, text) {
	const element = document.createElement(elementType);
	if (text) {
		element.innerText = text;
	}
	parent.appendChild(element);
}

function render () {
  const app = document.querySelector('#app')
  if (app.firstChild) {
    app.firstChild.remove()
  }
  const panel = document.createElement('div')
  for (const month of year.months) {
    addElement(panel, 'h3', month.name)
    for (const release of month.financialReleases) {
      const releaseDetails = `${release.type} - ${release.category} - R$ ${release.value}`
      addElement(panel, 'p', releaseDetails)
    }
    addElement(panel, 'h4', `Saldo: R$ ${month.monthBalance.balance}`)
    addElement(panel, 'hr')
  }

  app.appendChild(panel)
}

render()

function addRelease () {
  const requestData = {
    month: document.querySelector('#months'),
    category: document.querySelector('#category'),
    type: document.querySelector('#type'),
    value: document.querySelector('#value')
  }
  const addMonthlyFinancialRelease = new AddMonthlyFinancialRelease(year)
  addMonthlyFinancialRelease.execute(requestData.month.value, new FinancialRelease(requestData.category.value, requestData.type.value, parseFloat(requestData.value.value)))
  year.calculateYearBalance()
  console.log(year.months)
  render()

  requestData.category.value = ""
  requestData.value.value = ""
}

const button = document.querySelector('#addFinancialRelease')
button.addEventListener('click', addRelease)

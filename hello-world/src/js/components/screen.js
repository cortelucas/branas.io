import { FinancialRelease, Month, Year } from '../domain/index.js'
import { AddFinancialRelease } from '../use-cases/month/index.js'
import { AddMonthInYear, AddMonthlyFinancialRelease } from '../use-cases/year/index.js'
import { FormatMoney } from '../utils/index.js'
import { Chart, Div, H4, Input, Select, Table } from './index.js'

export class Screen {
  constructor () {
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

    this.year = year
  }

  addRelease () {
    const requestData = {
      month: document.querySelector('#months'),
      category: document.querySelector('#category'),
      type: document.querySelector('#type'),
      value: document.querySelector('#value')
    }
    console.log(requestData)
    const addMonthlyFinancialRelease = new AddMonthlyFinancialRelease(this.year)
    addMonthlyFinancialRelease.execute(requestData.month.value, new FinancialRelease(requestData.category.value, requestData.type.value, parseFloat(requestData.value.value)))
    this.year.calculateYearBalance()
    console.log(this.year.months)
    this.render()

    requestData.month.value = this.year.months[0].name
    requestData.category.value = ''
    requestData.value.value = ''
  }

  render () {
    document.querySelector('#app').remove()
    const app = new Div('div', 'div-main')
    
    const header = document.createElement('header')
    const title = new H4('Finanças Pessoais', 'title')
    header.appendChild(title.element)
    app.addElement(header)

    const formRelease = new Div('form-release', 'form-release')
    const formReleaseItemOne = new Div('form-release_rowOne', 'form-release_item')
    const formReleaseItemTwo = new Div('form-release_rowTwo', 'form-release_item')
    const formReleaseItemThree = new Div('form-release_rowThree', 'form-release_item')
    const divSelectMonths = new Div('div-select-months', 'div-select-months')
    const divSelectType = new Div('div-select-type', 'div-select-type')
    const divInputCategory = new Div('div-input-category', 'div-input-category')
    const divInputValue = new Div('div-input-value', 'div-input-value')
    const categoryInputText = new Input('category', 'text', '', 'Categoria', '')
    const valueInputText = new Input('value', 'number', 'value-release', 'Valor')
    const monthSelect = new Select('months', 'months')
    for (const month of this.year.months) {
      monthSelect.addOption(month.name)
    }
    const typeSelect = new Select('type', 'type')
    for (const type of ['receita', 'despesa']) {
      typeSelect.addOption(type)
    }
    const button = new Input('add-financial-release', 'button', '', '', 'Adicionar Lançamento')

    divSelectMonths.addElement(monthSelect.element)
    divSelectType.addElement(typeSelect.element)
    formReleaseItemOne.addElement(divSelectMonths.element)
    formReleaseItemOne.addElement(divSelectType.element)
    formReleaseItemOne.addElement(divSelectType.element)
    formReleaseItemThree.addElement(button.element)
    divInputCategory.addElement(categoryInputText.element)
    divInputValue.addElement(valueInputText.element)
    formReleaseItemTwo.addElement(divInputCategory.element)
    formReleaseItemTwo.addElement(divInputValue.element)
    formRelease.addElement(formReleaseItemOne.element)
    formRelease.addElement(formReleaseItemTwo.element)
    formRelease.addElement(button.element)

    button.addListener(() => {
      this.addRelease()
    })

    app.addElement(formRelease.element)

    const chart = new Chart()
    for (const month of this.year.months) {
      chart.addColumn(month.monthBalance.balance, month.name)
    }
    app.addElement(chart.element)

    for (const month of this.year.months) {
      const monthName = new H4(month.name)
      app.addElement(monthName.element)

      const tableRelease = new Table('table-release')
      tableRelease.addRow('th', ['Categoria', 'Valor'])

      for (const release of month.financialReleases) {
        tableRelease.addRow('td', [release.category, FormatMoney.execute(release.getStringValue())])
      }

      tableRelease.addRow('th', ['Juros', FormatMoney.execute(month.monthBalance.interest)])
      tableRelease.addRow('th', ['Rendimentos', FormatMoney.execute(month.monthBalance.income)])
      tableRelease.addRow('th', ['Total', FormatMoney.execute(month.monthBalance.balance)])

      app.addElement(tableRelease.element)
    }

    const [ body ] = document.getElementsByTagName('body')
    body.appendChild(app.element)
  }
}

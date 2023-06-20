import { FinancialRelease, Month, Year } from '../domain/index.js'
import { AddFinancialRelease } from '../use-cases/month/index.js'
import { AddMonthInYear, AddMonthlyFinancialRelease, DeleteFinancialRelease } from '../use-cases/year/index.js'
import { FormatMoney } from '../utils/index.js'
import { Chart, Div, H4, Input, Select, Table } from './index.js'

export class Screen {
  constructor () {
    this.init()
  }

  async init () {
    const response = await fetch('http://localhost:3000/api/financial-releases')
    const financialReleases = await response.json()
    
    const year = new Year()

    const addMonth = new AddMonthInYear(year)
    addMonth.execute(new Month('janeiro'))
    addMonth.execute(new Month('fevereiro'))
    addMonth.execute(new Month('março'))
    addMonth.execute(new Month('abril'))

    for (const release of financialReleases) {
      const addMonthlyFinancialRelease = new AddMonthlyFinancialRelease(year)
      addMonthlyFinancialRelease.execute(release.month, new FinancialRelease(release.category, release.type, parseFloat(release.value), release.id))
    }
    year.calculateYearBalance()
    this.year = year
    this.render()
  }

  addRelease () {
    const month = document.querySelector('#months')
    const category = document.querySelector('#category')
    const type = document.querySelector('#type')
    const value = document.querySelector('#value')
    
    const addMonthlyFinancialRelease = new AddMonthlyFinancialRelease(this.year)
    addMonthlyFinancialRelease.execute(month.value, new FinancialRelease(category.value, type.value, parseFloat(value.value)))
    fetch('http://localhost:3000/api/financial-releases', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body : JSON.stringify({
        month: month.value,
        category: category.value,
        type: type.value,
        value: parseFloat(value.value)
      })
    })
    this.year.calculateYearBalance()
    this.render()
    month.value = this.year.months[0].name
    type.value = 'receita'
    category.value = ''
    value.value = ''
  }

  deleteRelease (releaseId) {
    fetch(`http://localhost:3000/api/financial-releases/${releaseId}`, { method: 'DELETE' })
  }

  render () {
    document.querySelector('#app').remove()
    const app = new Div('app', 'div-main')
    
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
    const addReleaseButton = new Input('add-financial-release', 'button', '', '', 'Adicionar Lançamento')

    divSelectMonths.addElement(monthSelect.element)
    divSelectType.addElement(typeSelect.element)
    formReleaseItemOne.addElement(divSelectMonths.element)
    formReleaseItemOne.addElement(divSelectType.element)
    formReleaseItemOne.addElement(divSelectType.element)
    formReleaseItemThree.addElement(addReleaseButton.element)
    divInputCategory.addElement(categoryInputText.element)
    divInputValue.addElement(valueInputText.element)
    formReleaseItemTwo.addElement(divInputCategory.element)
    formReleaseItemTwo.addElement(divInputValue.element)
    formRelease.addElement(formReleaseItemOne.element)
    formRelease.addElement(formReleaseItemTwo.element)
    formRelease.addElement(addReleaseButton.element)

    addReleaseButton.addListener(() => {
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
        const deleteButton = new Input('delete-financial-release', 'button', 'delete-financial-release', '✘', '✘')
        const editButton = new Input('edit-financial-release', 'button', 'edit-financial-release', '✏️', '✏️')

        deleteButton.addListener(() => {
          const deleteFinancialRelease = new DeleteFinancialRelease(this.year)
          this.deleteRelease(release.id)
          deleteFinancialRelease.execute(month, release)
          this.render()
        })

        tableRelease.addRow('td', [release.category, FormatMoney.execute(release.getStringValue())], [editButton, deleteButton])
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

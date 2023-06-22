import { FinancialRelease, Month, Year } from '../domain/index.js'
import { AddMonthlyFinancialRelease, DeleteFinancialRelease } from '../use-cases/year/index.js'
import { FormatMoney } from '../utils/index.js'
import { Chart, Div, H4, Input, Select, Table } from './index.js'

export class Screen {
  constructor (financialReleaseService) {
    this.financialReleaseService = financialReleaseService
    this.init()
  }

  async init () {
    const financialReleases = await this.financialReleaseService.getFinancialReleases()
    this.year = new Year()
    for (const release of financialReleases) {
      const addMonthlyFinancialRelease = new AddMonthlyFinancialRelease(this.year)
      addMonthlyFinancialRelease.execute(release.month, new FinancialRelease(release.category, release.type, parseFloat(release.value), release.id))
    }
    this.year.calculateYearBalance()
    this.render()
  }

  addRelease () {
    const financialRelease = {
      month: this.monthSelect.getValue(),
      category: this.categoryInputText.getValue(),
      type: this.typeSelect.getValue(),
      value: this.valueInputText.getValue()
    }
    const addMonthlyFinancialRelease = new AddMonthlyFinancialRelease(this.year)
    addMonthlyFinancialRelease.execute(
      financialRelease.month,
      new FinancialRelease(financialRelease.category, financialRelease.type, parseFloat(financialRelease.value))
    )
    this.financialReleaseService.saveFinancialRelease(financialRelease)
    this.year.calculateYearBalance()
    this.render()
  }

  deleteRelease (month, release) {
    const deleteFinancialRelease = new DeleteFinancialRelease(this.year)
    this.financialReleaseService.deleteFinancialRelease(release.id)
    deleteFinancialRelease.execute(month, release)
    this.year.calculateYearBalance()
    this.render()
  }

  render () {
    document.querySelector('#app').remove()
    const app = new Div('app', 'div-main')
    const header = this.createHeader()
    app.addElement(header)
    const formRelease = this.createForm()
    app.addElement(formRelease.element)
    const chart = this.createChart()
    app.addElement(chart.element)
    for (const month of this.year.months) {
      const tableRelease = this.createFinancialReleaseTable(month)
      app.addElement(tableRelease.element)
    }
    const [body] = document.getElementsByTagName('body')
    body.appendChild(app.element)
  }

  createHeader () {
    const header = document.createElement('header')
    const title = new H4('Finanças Pessoais', 'title')
    header.appendChild(title.element)

    return header
  }

  createForm () {
    const formRelease = new Div('form-release', 'form-release')
    const formReleaseItemOne = new Div('form-release_rowOne', 'form-release_item')
    const formReleaseItemTwo = new Div('form-release_rowTwo', 'form-release_item')
    const formReleaseItemThree = new Div('form-release_rowThree', 'form-release_item')
    const divSelectMonths = new Div('div-select-months', 'div-select-months')
    const divSelectType = new Div('div-select-type', 'div-select-type')
    const divInputCategory = new Div('div-input-category', 'div-input-category')
    const divInputValue = new Div('div-input-value', 'div-input-value')
    this.categoryInputText = new Input('category', 'text', '', 'Categoria', '')
    this.valueInputText = new Input('value', 'number', 'value-release', 'Valor')
    this.monthSelect = new Select('months', 'months')
    for (const month of ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']) {
      this.monthSelect.addOption(month)
    }
    this.typeSelect = new Select('type', 'type')
    for (const type of ['receita', 'despesa']) {
      this.typeSelect.addOption(type)
    }
    const addReleaseButton = new Input('add-financial-release', 'button', '', '', 'Adicionar Lançamento')

    divSelectMonths.addElement(this.monthSelect.element)
    divSelectType.addElement(this.typeSelect.element)
    formReleaseItemOne.addElement(divSelectMonths.element)
    formReleaseItemOne.addElement(divSelectType.element)
    formReleaseItemOne.addElement(divSelectType.element)
    formReleaseItemThree.addElement(addReleaseButton.element)
    divInputCategory.addElement(this.categoryInputText.element)
    divInputValue.addElement(this.valueInputText.element)
    formReleaseItemTwo.addElement(divInputCategory.element)
    formReleaseItemTwo.addElement(divInputValue.element)
    formRelease.addElement(formReleaseItemOne.element)
    formRelease.addElement(formReleaseItemTwo.element)
    formRelease.addElement(addReleaseButton.element)

    addReleaseButton.addListener(() => this.addRelease())

    return formRelease
  }

  createChart () {
    const chart = new Chart()
    for (const month of this.year.months) {
      chart.addColumn(month.monthBalance.balance, month.name)
    }

    return chart
  }

  createFinancialReleaseTable (month) {
    const tableRelease = new Table('table-release')
    tableRelease.addRow('th', [month.name])
    tableRelease.addRow('th', ['Categoria', 'Valor'])
    for (const release of month.financialReleases) {
      const deleteButton = new Input('delete-financial-release', 'button', 'delete-financial-release', '✘', '✘')
      const editButton = new Input('edit-financial-release', 'button', 'edit-financial-release', '✏️', '✏️')
      deleteButton.addListener(() => this.deleteRelease(month, release))
      tableRelease.addRow('td', [release.category, FormatMoney.execute(release.getStringValue())], [editButton, deleteButton])
    }
    tableRelease.addRow('th', ['Juros', FormatMoney.execute(month.monthBalance.interest)])
    tableRelease.addRow('th', ['Rendimentos', FormatMoney.execute(month.monthBalance.income)])
    tableRelease.addRow('th', ['Total', FormatMoney.execute(month.monthBalance.balance)])

    return tableRelease
  }
}

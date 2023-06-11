export class FinancialReleases {
  constructor (category, type, value) {
    if (type !== 'receita' && type !== 'despesa') {
      throw new Error('Lançamento Inválido! Verifique se o tipo da sua despesa é "receita" ou "despesa".')
    }
    if (value <= 0) {
      throw new Error('Lançamento Inválido! Valor deve ser maior do que R$ 0,00.')
    }
    if (category === '') {
      throw new Error('Lançamento Inválido! Categoria é obrigatória.')
    }
    this.category = category
    this.type = type
    this.value = value
  }
}

import pgp from 'pg-promise'

export class Connection {
  constructor () {
    this.connection = pgp()('postgres://postgres:postgres@localhost:5432/postgres')
  }

  query (statement, params) {
    return this.connection.query(statement, params)
  }
}

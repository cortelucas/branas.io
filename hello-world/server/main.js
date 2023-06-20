import { Connection, FinancialReleaseController, FinancialReleaseRepository, HTTPServer } from './src/index.js'

const financialReleaseRepository = new FinancialReleaseRepository(new Connection())
const httpServer = new HTTPServer()

new FinancialReleaseController(httpServer, financialReleaseRepository)

httpServer.listen(3000)

export class FinancialReleaseController {
  constructor (httpServer, financialReleaseRepository) {
    httpServer.register('get', '/api/financial-releases', async (params, body) => {
      const financialReleases = await financialReleaseRepository.getFinancialReleases()
      return financialReleases
    })

    httpServer.register('post', '/api/financial-releases', async (params, body) => {
      const financialRelease = body
      await financialReleaseRepository.saveFinancialRelease(financialRelease)
    })

    httpServer.register('delete', '/api/financial-releases/:id', async (params, body) => {
      const id = params.id
      await financialReleaseRepository.deleteFinancialRelease(id)
    })
  }
}

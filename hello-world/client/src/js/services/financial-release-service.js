export class FinancialReleaseService {
  constructor (httpClient, baseURL) {
    this.httpClient = httpClient
    this.baseURL = baseURL
  }

  async getFinancialReleases () {
    return this.httpClient.get(`${this.baseURL}/api/financial-releases`)
  }

  async saveFinancialRelease (financialRelease) {
    return this.httpClient.post(`${this.baseURL}/api/financial-releases`, financialRelease)
  }

  async deleteFinancialRelease (releaseID) {
    return this.httpClient.delete(`${this.baseURL}/api/financial-releases/${releaseID}`)
  }
}

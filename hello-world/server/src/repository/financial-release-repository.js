import { FinancialRelease } from "../index.js"

export class FinancialReleaseRepository {
    constructor (connection) {
        this.connection = connection
    }

    async getFinancialReleases () {
        const financialReleasesRepo = await this.connection.query('select * from personal_finances.financial_release;', [])
        const financialReleases = []

        for (const releaseRepo of financialReleasesRepo) {
            financialReleases.push(new FinancialRelease(releaseRepo.release_id, releaseRepo.month, releaseRepo.category, releaseRepo.type, parseFloat(releaseRepo.value)))
        }

        return financialReleases
    }

    async saveFinancialRelease (financialRelease) {
        const body = await this.connection.query(
            'insert into personal_finances.financial_release (month, category, type, value) values ($1, $2, $3, $4);',
            [financialRelease.month, financialRelease.category, financialRelease.type, financialRelease.value]
        )

        return body
    }

    async deleteFinancialRelease (idFinancialRelease) {
        await this.connection.query('delete from personal_finances.financial_release where release_id = $1', [idFinancialRelease])
    }
}
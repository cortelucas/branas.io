export class DeleteFinancialRelease {
    constructor(year) {
        this.year = year
    }

    execute (month, release) {
        const position = month.financialReleases.indexOf(release)
        month.financialReleases.splice(position, 1)
    }
}
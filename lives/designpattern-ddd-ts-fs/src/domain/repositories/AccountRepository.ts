import { Account } from '../entities/Account'

export interface AccountRepository {
    save(account: Account): void
    get(accountDocument: string): Account
}

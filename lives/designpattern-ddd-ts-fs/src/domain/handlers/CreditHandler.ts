import { AccountRepository } from '../repositories/AccountRepository'
import { CreditCommand } from '../../CreditCommand'
import { Observer } from '../../infra/queue/Observer'

export class CreditHandler implements Observer {
    operation = 'credit'

    constructor(readonly accountRepository: AccountRepository) {
    }

    notify(command: CreditCommand): void {
        const account = this.accountRepository.get(command.accountDocument)
        if (account) {
            account.credit(command.amount)
        }
    }
}

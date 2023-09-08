import { DebitCommand } from '../../DebitCommand'
import { Observer } from '../../infra/queue/Observer'
import { AccountRepository } from '../repositories/AccountRepository'

export class DebitHandler implements Observer {
    operation = 'debit'

    constructor(readonly accountRepository: AccountRepository) {
    }

    notify(command: DebitCommand): void {
        const account = this.accountRepository.get(command.accountDocument)
        if (account) {
            account.debit(command.amount)
        }
    }
}

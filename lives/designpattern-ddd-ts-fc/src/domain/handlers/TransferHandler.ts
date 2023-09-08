import { Observer } from '../../infra/queue/Observer'
import { TransferService } from '../services/TransferService'
import { AccountRepository } from '../repositories/AccountRepository'
import { TransferCommand } from '../../application/commands/TransferCommand'


export class TransferHandler implements Observer {
    operation = 'transfer'

    constructor(readonly accountRepository: AccountRepository) {
    }

    notify(command: TransferCommand): void {
        const accountFrom = this.accountRepository.get(command.accountDocumentFrom)
        const accountTo = this.accountRepository.get(command.accountDocumentTo)
        if (accountFrom && accountTo) {
            const transferService = new TransferService()
            transferService.transfer(accountFrom, accountTo, command.amount)
        }
    }
}

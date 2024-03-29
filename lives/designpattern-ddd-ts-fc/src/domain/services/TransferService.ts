import { Account } from '../entities/Account'

export class TransferService {

    transfer(from: Account, to: Account, amount: number) {
        from.debit(amount)
        to.credit(amount)
    }
}

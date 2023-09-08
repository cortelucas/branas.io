import { Command } from './Command'

export class DebitCommand implements Command {

    operation = 'debit'

    constructor (readonly accountDocument: string, readonly amount: number) {
    }
}

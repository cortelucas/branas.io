import { Command } from './Command'

export class CreditCommand implements Command {

    operation = 'credit'

    constructor(readonly accountDocument: string, readonly amount: number) {
    }
}

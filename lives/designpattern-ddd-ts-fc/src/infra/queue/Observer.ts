import { Command } from '../../application/commands/Command'

export interface Observer {
    operation: string
    notify(command: Command): void
}

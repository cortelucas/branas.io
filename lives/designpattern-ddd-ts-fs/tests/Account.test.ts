import { beforeEach, describe, expect, test } from 'vitest'
import { AccountApplicationService } from '../src/application/services/AccountApplicationService'
import { Publisher } from '../src/infra/queue/Publisher'
import { AccountRepositoryMemory } from '../src/infra/repositories/AccountRepositoryMemory'
import { CreditHandler } from '../src/domain/handlers/CreditHandler'
import { DebitHandler } from '../src/domain/handlers/DebitHandler'
import { TransferHandler } from '../src/domain/handlers/TransferHandler'

let service: AccountApplicationService

beforeEach(() => {
    const publisher = new Publisher()
    const accountRepository = new AccountRepositoryMemory()

    publisher.register(new CreditHandler(accountRepository))
    publisher.register(new DebitHandler(accountRepository))
    publisher.register(new TransferHandler(accountRepository))

    service = new AccountApplicationService(publisher, accountRepository)
})

test('Deve ser capaz de criar uma conta', () => {
    service.create('123.456.789-00')
    const account = service.get('123.456.789-00')
    expect(account.getBalance()).toBe(0)
})

test('Deve ser capaz de criar uma conta e fazer um crédito', () => {
    service.create('123.456.789-00')
    service.credit('123.456.789-00', 1000)
    const account = service.get('123.456.789-00')
    expect(account.getBalance()).toBe(1000)
})

test('Deve ser capaz de criar uma conta e fazer um débito', () => {
    service.create('123.456.789-00')
    service.credit('123.456.789-00', 1000)
    service.debit('123.456.789-00', 500)
    const account = service.get('123.456.789-00')
    expect(account.getBalance()).toBe(500)
})

test('Deve ser capaz de criar duas contas e fazer uma transferência', () => {
    service.create('123.456.789-00')
    service.credit('123.456.789-00', 1000)
    service.create('987.654.321-00')
    service.credit('987.654.321-00', 500)
    service.transfer('123.456.789-00', '987.654.321-00', 700)
    const accountFrom = service.get('123.456.789-00')
    const accountTo = service.get('987.654.321-00')
    expect(accountFrom.getBalance()).toBe(300)
    expect(accountTo.getBalance()).toBe(1200)
})

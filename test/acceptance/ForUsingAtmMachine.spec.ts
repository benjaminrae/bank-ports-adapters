import { BankApp } from "@src/app/BankApp";
import { ForPrinting } from "@src/app/driven-ports/ForPrinting/ForPrinting";
import assert from "node:assert";

class ForPrintingSpy implements ForPrinting {
  private printedStatement?: string;

  public printBankStatement(statement: string): void {
    this.printedStatement = statement;
  }

  public shouldHavePrinted(statement: string): void {
    assert(this.printedStatement === statement, `Expected "${this.printedStatement}" to be "${statement}"`);
  }
}

describe('Given a client makes a deposit of 1000 on 10-01-2012', () => {
  describe('And a deposit of 2000 on 13-01-2012', () => {
    describe('And a withdrawal of 500 on 14-01-2012', () => {
      describe('When they print their bank statement', () => {
        it(`Then they should see the following statement:
          Date       || Amount || Balance
          14/01/2012 || -500   || 2500
          13/01/2012 || 2000   || 3000
          10/01/2012 || 1000   || 1000
        `, () => {
          const forPrintingSpy = new ForPrintingSpy()
          const bank = new BankApp(forPrintingSpy)

          bank.deposit(1000)
          bank.deposit(2000)
          bank.withdraw(500)

          bank.printBankStatement()

          forPrintingSpy.shouldHavePrinted(`Date       || Amount || Balance
          14/01/2012 || -500   || 2500
          13/01/2012 || 2000   || 3000
          10/01/2012 || 1000   || 1000`)
        })
      })
    })
  })
})

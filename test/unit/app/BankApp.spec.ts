import { ForPrinting } from "@src/app/driven-ports/ForPrinting/ForPrinting";
import { BankApp } from "@src/app/BankApp";

export interface ForGettingDates {
  today(): Date
}

export class ForGettingDatesSpy implements ForGettingDates {
  private hasBeenCalled: boolean = false;

  public today(): Date {
    this.hasBeenCalled = true;

    return new Date();
  }

  public shouldHaveBeenCalled(): void {
    assert(this.hasBeenCalled, "Expected today() to have been called");
}
}

    const forPrintingDummy = null as unknown as ForPrinting;

describe('BankApp', () => {
  it('should retrieve the current date when a deposit is made', () => {
    const forGettingDatesSpy = new ForGettingDatesSpy()

    const bank = new BankApp(forPrintingDummy, forGettingDatesSpy);

    bank.deposit(2000);

    forGettingDatesSpy.shouldHaveBeenCalled();
  })
})

import { ForPrinting } from "@src/app/driven-ports/ForPrinting/ForPrinting";
import { BankApp } from "@src/app/BankApp";
import { ForGettingDatesStub } from "../../doubles/ForGettingDatesStub";
import { ForGettingDates } from "@src/app/driven-ports/ForGettingDates/ForGettingDates";
import { Transaction } from "@src/app/driving-ports/ForUsingATMMachine/Transaction";
import { ForStoringTransactions } from "@src/app/driven-ports/ForStoringTransactions/ForStoringTransactions";

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

export class ForStoringTransactionsSpy implements ForStoringTransactions {
  private savedTransactions: Transaction[] = [];

  save(transaction: Transaction): void {
    this.savedTransactions.push(transaction);
  }

  public shouldHaveSavedTransaction(transaction: Transaction): void {
    const transactionFound = this.savedTransactions.find(
      (savedTransaction) =>
        savedTransaction.equals(transaction),
    );

    assert(
      transactionFound,
      `Expected transaction ${transaction} to be included in ${this.savedTransactions}`,
    );
  }
}

describe("BankApp", () => {
  it("should store a transaction with the amount and date when a deposit is made", () => {
    const forGettingDatesStub = new ForGettingDatesStub();
    const forStoringTransactionsSpy = new ForStoringTransactionsSpy();

    const bank = new BankApp(forPrintingDummy, forGettingDatesStub, forStoringTransactionsSpy);

    const depositAmount = 2000;
    const depositDate = "2023-10-01";

    forGettingDatesStub.setToday(new Date(depositDate));

    bank.deposit(depositAmount);

    forStoringTransactionsSpy.shouldHaveSavedTransaction(new Transaction(depositAmount, new Date(depositDate)));
  });
});

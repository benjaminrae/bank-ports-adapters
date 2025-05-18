import { ForPrinting } from "@src/app/driven-ports/ForPrinting/ForPrinting";
import { BankApp } from "@src/app/BankApp";
import { ForGettingDatesStub } from "../../doubles/ForGettingDatesStub";
import { Transaction } from "@src/app/driving-ports/ForUsingATMMachine/Transaction";
import { ForStoringTransactions } from "@src/app/driven-ports/ForStoringTransactions/ForStoringTransactions";


const forPrintingDummy = null as unknown as ForPrinting;

export class ForStoringTransactionsSpy implements ForStoringTransactions {
  private savedTransactions: Transaction[] = [];
  private getAllHasBeenCalled = false;

  getAll(): Transaction[] {
    this.getAllHasBeenCalled = true;
    return this.savedTransactions;
  }

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

  public shouldHaveRetrievedTransactions(): void {
    assert(this.getAllHasBeenCalled, "Expected getAll() to have been called");
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

  it("should store a transaction with the negative amount and date when a withdrawal is made", () => {
    const forGettingDatesStub = new ForGettingDatesStub();
    const forStoringTransactionsSpy = new ForStoringTransactionsSpy();

    const bank = new BankApp(forPrintingDummy, forGettingDatesStub, forStoringTransactionsSpy);

    const withdrawalAmount = 500;
    const withdrawalDate = "2023-10-02";
    const expectedWithdrawalTransactionAmount = -withdrawalAmount;

    forGettingDatesStub.setToday(new Date(withdrawalDate));

    bank.withdraw(withdrawalAmount);

    forStoringTransactionsSpy.shouldHaveSavedTransaction(new Transaction(expectedWithdrawalTransactionAmount, new Date(withdrawalDate)));
  });

  it("should retrieve saved transactions when printing the bank statement", () => {
    const forGettingDatesDummy = null as unknown as ForGettingDatesStub;
    const forStoringTransactionsSpy = new ForStoringTransactionsSpy();

    const bank = new BankApp(forPrintingDummy, forGettingDatesDummy, forStoringTransactionsSpy);

    bank.printBankStatement();

    forStoringTransactionsSpy.shouldHaveRetrievedTransactions();
  });
});

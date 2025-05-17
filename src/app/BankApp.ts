import { ForUsingAtmMachine } from "@src/app/driving-ports/ForUsingATMMachine/ForUsingAtmMachine";
import { ForPrinting } from "@src/app/driven-ports/ForPrinting/ForPrinting";

import { ForGettingDates } from "./driven-ports/ForGettingDates/ForGettingDates";
import { ForStoringTransactions } from "@src/app/driven-ports/ForStoringTransactions/ForStoringTransactions";
import { Transaction } from "@src/app/driving-ports/ForUsingATMMachine/Transaction";

export class BankApp implements ForUsingAtmMachine {
  private forPrinting: ForPrinting;
  private forGettingDates: ForGettingDates;
  private forStoringTransactions: ForStoringTransactions;

  constructor(forPrinting: ForPrinting, forGettingDates: ForGettingDates, forStoringTransactions: ForStoringTransactions) {
    this.forPrinting = forPrinting;
    this.forGettingDates = forGettingDates;
    this.forStoringTransactions = forStoringTransactions;
  }

  public printBankStatement(): void {
    throw new Error("Method not implemented.");
  }

  public deposit(amount: number): void {
    this.forStoringTransactions.save(new Transaction(amount, this.forGettingDates.today()));
  }

  public withdraw(amount: number): void {
    throw new Error("Method not implemented.");
  }
}

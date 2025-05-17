import { ForUsingAtmMachine } from "@src/app/driving-ports/ForUsingATMMachine/ForUsingAtmMachine";
import { ForPrinting } from "@src/app/driven-ports/ForPrinting/ForPrinting";
import { ForGettingDates } from "../../test/unit/app/BankApp.spec";

export class BankApp implements ForUsingAtmMachine {
  private forPrinting: ForPrinting;
  private forGettingDates: ForGettingDates;

  constructor(forPrinting: ForPrinting, forGettingDates: ForGettingDates) {
    this.forPrinting = forPrinting;
    this.forGettingDates = forGettingDates;
  }

  public printBankStatement(): void {
    throw new Error("Method not implemented.");
  }

  public deposit(amount: number): void {
    this.forGettingDates.today()
  }

  public withdraw(amount: number): void {
    throw new Error("Method not implemented.");
  }
}

import { ForUsingAtmMachine } from "@src/app/driving-ports/ForUsingATMMachine/ForUsingAtmMachine";
import { ForPrinting } from "@src/app/driven-ports/ForPrinting/ForPrinting";

export class BankApp implements ForUsingAtmMachine {
  private forPrinting: ForPrinting;

  constructor(forPrinting: ForPrinting) {
    this.forPrinting = forPrinting;
  }

  public printBankStatement(): void {
    throw new Error("Method not implemented.");
  }

  public deposit(amount: number): void {
    throw new Error("Method not implemented.");
  }

  public withdraw(amount: number): void {
    throw new Error("Method not implemented.");
  }
}

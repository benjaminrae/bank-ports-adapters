import { ForStoringTransactions } from "@src/app/driven-ports/ForStoringTransactions/ForStoringTransactions";
import { Transaction } from "@src/app/driving-ports/ForUsingATMMachine/Transaction";

export class InMemoryTransactionRepository implements ForStoringTransactions {
  public transactions: Transaction[] = [];

  public save(transaction: Transaction): void {
    this.transactions.push(transaction);
  }
}

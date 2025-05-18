import { Transaction } from "@src/app/driving-ports/ForUsingATMMachine/Transaction";

export interface ForStoringTransactions {
  save(transaction: Transaction): void;

  getAll(): Transaction[];
}

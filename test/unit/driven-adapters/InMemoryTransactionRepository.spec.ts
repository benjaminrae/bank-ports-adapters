import { Transaction } from "@src/app/driving-ports/ForUsingATMMachine/Transaction";
import {
  InMemoryTransactionRepository,
} from "@src/driven-adapters/ForStoringTransactions/InMemoryTransactionRepository";
import { expect } from "vitest";

describe("InMemoryTransactionRepository", () => {
  it("should retrieve saved transactions", () => {
    const transaction1 = new Transaction(1000, new Date("2023-10-01"));
    const transaction2 = new Transaction(-500, new Date("2023-10-02"));

    const inMemoryTransactionRepository = new InMemoryTransactionRepository();
    inMemoryTransactionRepository.save(transaction1);
    inMemoryTransactionRepository.save(transaction2);

    const retrievedTransactions = inMemoryTransactionRepository.getAll();

    expect(retrievedTransactions).toContain(transaction1);
    expect(retrievedTransactions).toContain(transaction2);
  });
});

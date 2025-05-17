export class Transaction {
  private readonly date: Date;
  private readonly amount: number;

  constructor(amount: number, date: Date) {
    this.amount = amount;
    this.date = date;
  }

  public equals(transaction: Transaction) {
    return transaction.hasAmount(this.amount) && transaction.hasDate(this.date);
  }

  private hasDate(date: Date): boolean {
    return this.date.getTime() === date.getTime();
  }

  private hasAmount(amount: number): boolean {
    return this.amount === amount;
  }
}

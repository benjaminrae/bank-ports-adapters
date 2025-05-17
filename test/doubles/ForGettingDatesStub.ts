import { ForGettingDates } from "@src/app/driven-ports/ForGettingDates/ForGettingDates";

export class ForGettingDatesStub implements ForGettingDates {
  private stubbedToday: Date | undefined;

  public today(): Date {
    return this.stubbedToday!;
  }

  setToday(date: Date): void {
    this.stubbedToday = date;
  }
}

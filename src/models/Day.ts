import { Matter } from "./Matter";
export class Day {
  date: number;
  matters: Matter[];

  constructor(date: number, matters: Matter[]) {
    this.date = date;
    this.matters = matters;
  }
}

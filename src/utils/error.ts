export class TableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TableError";
  }
}

import { TableError } from "@/utils/error.ts";
import { TableCell, TableKind, TableRow } from "./types.ts";

/**
 * Base class for building tables row-by-row.
 *
 * @template TOutput - The type returned by `build()`. Defaults to `TableRow[]`.
 *
 * Usage:
 * ```ts
 * const b = new Builder()
 *   .add('Name', 'Age')
 *   .add('Alice', 30)
 *   .build(); // [["Name","Age"],["Alice",30]]
 * ```
 */
export class Builder<TOutput = TableRow[]> {
  /**
   * The output format kind.
   */
  readonly kind: TableKind = "builder";

  /**
   * Internal storage for table rows.
   */
  protected rows: TableRow[] = [];

  /**
   * Adds a row to the table.
   *
   * @param {...TableCell[]} cells - Cells for the new row.
   * @returns {this} - For chaining.
   * @throws {TableError} - If row length doesn't match the first row's length.
   */
  add(...cells: TableCell[]): this {
    if (this.rows.length && cells.length !== this.rows[0].length) {
      throw new TableError(
        `Row length mismatch: expected ${
          this.rows[0].length
        }, got ${cells.length}`,
      );
    }
    this.rows.push(cells);
    return this;
  }

  /**
   * Builds and returns the table in the specified output type.
   *
   * @returns {TOutput} - The built table.
   */
  build(): TOutput {
    return this.rows as TOutput;
  }
}

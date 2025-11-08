import { Builder } from './builder.ts';
import { TableKind } from './types.ts';

/**
 * Builder for plain text table output.
 *
 * @example
 * ```ts
 * new Text()
 *   .add('Name', 'Age')
 *   .add('Ana', 25)
 *   .setSeparator(' | ')
 *   .setColumnWidth(0, 10)
 *   .build();
 * // "Name        | Age\nAna         | 25"
 * ```
 */
export class Text extends Builder<string> {
  override readonly kind: TableKind = 'text';
  #separator: string = ' ';
  #columnWidths: Map<number, number> = new Map();

  /**
   * Sets the minimum width for a column.
   *
   * @param {number} index - Column index (0-based).
   * @param {number} width - Minimum width in characters.
   * @returns {this} - For method chaining.
   */
  setColumnWidth(index: number, width: number): this {
    this.#columnWidths.set(index, width);
    return this;
  }

  /**
   * Sets the separator between cells in a row.
   *
   * @param {string} separator - Text to place between cells (default: `' '`).
   * @returns {this} - For method chaining.
   */
  setSeparator(separator: string): this {
    this.#separator = separator;
    return this;
  }

  override build(): string {
    const rows = this.rows;

    if (rows.length === 0) return '';

    const columnCount = Math.max(...rows.map((row) => row.length));

    const widths = Array.from(
      { length: columnCount },
      (_, i) =>
        this.#columnWidths.get(i) ??
        Math.max(...rows.map((row) => String(row[i]).length))
    );

    return rows
      .map((row) =>
        row
          .map((cell, i) => String(cell ?? '').padEnd(widths[i]))
          .join(this.#separator)
      )
      .join('\n');
  }
}

import { Builder } from './builder.ts';
import { TableKind, TableRow } from './types.ts';

/**
 * Builder for custom output format.
 *
 * @template T - Output type returned by `build()`.
 * @param {(rows: TableRow[]) => T} formatter - Function to format the rows.
 * @param {string} [label='custom'] - Human-readable name for the format (e.g., file name, UI label).
 *
 * @example
 * ```ts
 * const xml = new Custom<string>(
 *   rows => `<root>${rows.map(r => `<row>${r.join('')}</row>`).join('')}</root>`,
 *   'data.xml'
 * );
 * ```
 */
export class Custom<T> extends Builder<T> {
  override readonly kind: TableKind = 'custom';
  readonly label: string;
  #formatter: (rows: TableRow[]) => T;

  constructor(formatter: (rows: TableRow[]) => T, label: string = 'custom') {
    super();
    this.label = label;
    this.#formatter = formatter;
  }

  override build(): T {
    return this.#formatter(this.rows);
  }
}

import { Builder } from "./builder.ts";
import { TableKind, TableRow } from "./types.ts";

/**
 * Builder for GitHub-flavored Markdown tables.
 *
 * @example
 * ```ts
 * new Markdown()
 *   .add('Name', 'Age')
 *   .add('Lila', 3)
 *   .setColumnWidth(0, 8)
 *   .build();
 * // | Name     | Age |
 * // | -------- | --- |
 * // | Lila     | 3   |
 * ```
 */
export class Markdown extends Builder<string> {
  override readonly kind: TableKind = "markdown";
  readonly #columnWidths = new Map<number, number>();

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

  override build(): string {
    if (this.rows.length === 0) return "";

    const widths = this.#calculateWidths();
    const formattedRows = this.rows.map((row) => this.#formatRow(row, widths));

    if (formattedRows.length === 1) return formattedRows[0];

    const separator = `| ${widths.map((w) => "-".repeat(w)).join(" | ")} |`;
    return [formattedRows[0], separator, ...formattedRows.slice(1)].join("\n");
  }

  #calculateWidths(): number[] {
    const colCount = Math.max(...this.rows.map((r) => r.length));
    return Array.from({ length: colCount }, (_, i) =>
      Math.max(
        ...this.rows.map((row) => String(row[i])?.length ?? 0),
        this.#columnWidths.get(i) ?? 0,
      ));
  }

  #formatRow(row: TableRow, widths: number[]): string {
    const cells = widths.map((width, i) => String(row[i] ?? "").padEnd(width));
    return `| ${cells.join(" | ")} |`;
  }
}

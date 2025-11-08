import { Builder } from "./builder.ts";
import { TableKind } from "./types.ts";

/**
 * Builder for HTML table output.
 *
 * @example
 * ```ts
 * new Html()
 *   .add('Name', 'Age')
 *   .add('Bob', 25)
 *   .build();
 * // "<table><tr><td>Name</td><td>Age</td></tr><tr><td>Bob</td><td>25</td></tr></table>"
 * ```
 */
export class Html extends Builder<string> {
  override readonly kind: TableKind = "html";

  override build(): string {
    const escapeHtml = (str: string) => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    };

    if (!this.rows.length) return "<table></table>";

    const rows = this.rows
      .map(
        (row) =>
          `<tr>${
            row
              .map((c) => `<td>${escapeHtml(String(c))}</td>`)
              .join("")
          }</tr>`,
      )
      .join("");

    return `<table>${rows}</table>`;
  }
}

/**
 * Output format identifier.
 *
 * - `'text'`      – plain text table
 * - `'html'`      – `<table>` markup
 * - `'json'`      – JSON string
 * - `'csv'`       – comma-separated values
 * - `'markdown'`  – GitHub-flavored markdown table
 * - `'custom'`    – user-defined format
 * - `'builder'`   – raw `string[][]` (default)
 */
export type TableKind =
  | "text"
  | "html"
  | "json"
  | "csv"
  | "markdown"
  | "custom"
  | "builder";

/**
 * A single table cell.
 * Can contain a string or a number.
 */
export type TableCell = string | number;

/**
 * A single row of the table.
 * Each cell belongs to a specific column.
 */
export type TableRow = TableCell[];

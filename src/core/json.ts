import { Builder } from "./builder.ts";
import { TableKind } from "./types.ts";

/**
 * Builder for JSON output.
 *
 * @example
 * ```ts
 * new Json()
 *   .add('Name', 'Age')
 *   .add('Ana', 25)
 *   .build();
 * // '[["Name","Age"],["Ana",25]]'
 * ```
 */
export class Json extends Builder<string> {
  override readonly kind: TableKind = "json";

  override build(): string {
    return JSON.stringify(this.rows);
  }
}

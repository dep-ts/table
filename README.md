# @dep/table 📊

> Tiny table builder for any format — text, HTML, CSV, Markdown, JSON, or custom
> outputs.

[![JSR version](https://jsr.io/badges/@dep/table)](https://jsr.io/@dep/table)

---

## Features ✨

- 🧱 Build tables row-by-row using a fluent API
- 📜 Output to **text**, **HTML**, **CSV**, **JSON**, or **Markdown**
- 🧩 Extend with **custom builders** via callback functions
- 💥 Type-safe errors and validation through `TableError`
- 🪶 Lightweight, dependency-free, and works in **Deno**, **Node.js**, or
  **browser ESM**

---

## Installation 📦

### Deno

```ts
import { Builder, Csv, Html, Json, Markdown, Text } from "jsr:@dep/table";
```

### Node.js (18+) or Browsers

```bash
npx jsr add @dep/table
```

Then import as an ES module:

```ts
import { Builder, Csv, Html, Json, Markdown, Text } from "@dep/table";
```

---

## Usage 🎯

### Basic Builder

```ts
import { Builder } from "@dep/table";

const table = new Builder()
  .add("Name", "Age")
  .add("Alice", 30)
  .add("Bob", 25)
  .build();

console.log(table);
// [["Name","Age"],["Alice",30],["Bob",25]]
```

---

### CSV Output

```ts
import { Csv } from "@dep/table";

const csv = new Csv().add("Name", "Age").add("Alice", 30).build();

console.log(csv);
// "Name","Age"\n"Alice","30"
```

---

### HTML Output

```ts
import { Html } from "@dep/table";

const html = new Html().add("Product", "Price").add("Apple", 1.99).build();

console.log(html);
// "<table><tr><td>Product</td><td>Price</td></tr><tr><td>Apple</td><td>1.99</td></tr></table>"
```

---

### Markdown Output

```ts
import { Markdown } from "@dep/table";

const md = new Markdown().add("Name", "Age").add("Lila", 3).build();

console.log(md);
/*
| Name | Age |
| ---- | --- |
| Lila | 3   |
*/
```

---

### Custom Output

```ts
import { Custom } from "@dep/table";

const xml = new Custom(
  (rows) =>
    `<root>${rows.map((r) => `<row>${r.join("")}</row>`).join("")}</root>`,
  "data.xml",
)
  .add("Name", "Age")
  .add("Zoe", 21)
  .build();

console.log(xml);
// "<root><row>NameAge</row><row>Zoe21</row></root>"
```

---

## License 📄

MIT License – see [LICENSE](LICENSE) for details.

**Author:** Estarlin R. — [estarlincito.com](https://estarlincito.com)

# ts-use-cjs-polyfill

Requires the use of a polyfill when using CommonJS concepts in ESM files according to [tshy conventions](https://github.com/isaacs/tshy?tab=readme-ov-file#commonjs-dialect-polyfills).

## Examples

### Good

```ts
// filename: example.ts
import { dirname, fileURLToPath } from "node:path";
const currentDir = dirname(fileURLToPath(import.meta.url));
```

```ts
// filename: example-cjs.cts
import path from "node:path";
const currentDir = __dirname;
```

### Bad

```ts
// filename: example.ts
const currentDir = __dirname; // This will cause an error in ESM files
```

## When to turn off

Only if the rule breaks.

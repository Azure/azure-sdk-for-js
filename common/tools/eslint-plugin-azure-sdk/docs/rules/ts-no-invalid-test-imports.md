# ts-no-invalid-test-imports

Disallow relative imports from `src/` in test files.

- Category: Problem
- Recommended: yes (for Azure SDK repos)

## Why

Tests should exercise the public API surface of the package (or explicit `$internal` entrypoints) rather than reaching into implementation files under `src/` via relative paths. This maintains clean package boundaries and prevents brittle coupling to internal structure.

## Rule details

This rule flags relative imports in test files that climb out of the test directory and enter a top-level `src` folder, such as:

- `import { Client } from "../src/client";`
- `import { Helper } from "../../src/helpers/helper";`

A file is considered a test file if one of the following is true:

- Filename matches `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or `*.spec.tsx`
- Path contains a `test/` or `tests/` segment

The rule is cross-platform and does not depend on the current working directory.

## Examples

### Incorrect

```ts
// tests/client.test.ts
import { Client } from "../src/client";
import { helper } from "../../src/helpers/helper";
```

### Correct

```ts
// tests/client.test.ts
import { Client } from "@azure/<package>"; // from the package entrypoint
import { something } from "$internal"; // explicit internal entrypoint
import { helper } from "./helpers"; // local test utilities
```

## Options

This rule does not have any options.

## When not to use it

If your project intentionally allows tests to import from `src/` using relative paths, you should not enable this rule.

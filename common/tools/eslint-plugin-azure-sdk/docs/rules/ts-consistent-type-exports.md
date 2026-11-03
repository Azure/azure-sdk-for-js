# ts-consistent-type-exports

Enforces consistent usage of type exports, requiring `export type` for type-only named exports.

This rule wraps [`@typescript-eslint/consistent-type-exports`](https://typescript-eslint.io/rules/consistent-type-exports/) but **ignores `export *` declarations**. The original rule flags `export * from '...'` when all re-exported symbols are types, suggesting `export type * from '...'`. This wrapper skips that check because:

- `export *` re-exports everything from a module. If value exports are later added to the source module, `export type *` would silently drop them.
- Changing `export *` to `export type *` alters the module contract and can cause unexpected breakage downstream.

## Examples

### Good

```ts
// Named type export with `type` keyword ✅
type Foo = string;
export type { Foo };

// export * is always allowed, even if all exports are types ✅
export * from "./types";

// Value export ✅
const bar = 42;
export { bar };
```

### Bad

```ts
// Named export of a type without `type` keyword ❌
type Foo = string;
export { Foo };
```

## Options

| Option                                   | Type      | Default | Description                                                                         |
| ---------------------------------------- | --------- | ------- | ----------------------------------------------------------------------------------- |
| `fixMixedExportsWithInlineTypeSpecifier` | `boolean` | `false` | Whether the rule will autofix "mixed" export cases using TS inline type specifiers. |

## When Not To Use It

If you intentionally want `export *` declarations to be flagged when re-exporting only types, use the original `@typescript-eslint/consistent-type-exports` rule directly.

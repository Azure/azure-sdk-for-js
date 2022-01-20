# ts-doc-internal-private-member

Prevents the usage of the `@internal` tag in TSDoc comments for private members.

Internal objects are defined as classes, interfaces, or standalone functions that are not exported from the main entrypoint to the package and are not members of any exports from the main entrypoint (defined recursively). Because private members are already ignored by the docs generation tools, we do not need to use `@internal` in the TSDoc comments **Files that are specified as excluded in a `typedoc.json` file are ignored by this rule.**

## Examples

### Good

```ts
/**
 * Other documentation
 * @internal
 */
class ExampleClass {}
```

```ts
/**
 * Other documentation
 * @internal
 */
interface ExampleInterface {}
```

```ts
/**
 * Other documentation
 */
private function exampleFunction(): void {}
```

### Bad

```ts
/**
 * Other documentation
 * @internal
 */
private class ExampleClass {}
```

```ts
/**
 * Other documentation
 * @internal
 */
private interface ExampleInterface {}
```

```ts
/**
 * Other documentation
 * @internal
 */
private function exampleFunction(): void {}
```

## When to turn off

If you are not using TypeDoc.

## Source

Suggestion by [@deyaaeldeen](https://github.com/deyaaeldeen).

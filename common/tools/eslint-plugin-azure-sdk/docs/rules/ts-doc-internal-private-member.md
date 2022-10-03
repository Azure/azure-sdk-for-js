# ts-doc-internal-private-member

Prevents the usage of the `@internal` tag in TSDoc comments for private members.

Internal objects are defined as classes, interfaces, or standalone functions that are not exported from the main entrypoint to the package and are not members of any exports from the main entrypoint (defined recursively). Because private members are already ignored by the docs generation tools, we do not need to use `@internal` in the TSDoc comments **Files that are specified as excluded in a `typedoc.json` file are ignored by this rule.**

## Examples

### Good

```ts
/**
 * Class documentation
 */
class ExampleClass {
  private x = 0;
  private y: number;

  private [s: string]: boolean | ((s: string) => boolean);

  /**
   * Method documentation
   */
  private testMethod(private x: number, private y: number) {}
}
```

```ts
/**
 * Class documentation
 */
class ExampleClass {
  /**
   * @internal
   */
  x = 0;

  /**
   * @internal
   */
  y: number;

  /**
   * @internal
   */
  [s: string]: boolean | ((s: string) => boolean);

  /**
   * Method documentation
   * @internal
   */
  testMethod(private x: number, private y: number) {}
}
```

### Bad

```ts
/**
 * Class documentation
 */
class ExampleClass {
  /**
   * @internal
   */
  private x = 0;

  /**
   * @internal
   */
  private y: number;

  /**
   * @internal
   */
  private [s: string]: boolean | ((s: string) => boolean);

  /**
   * Method documentation
   * @internal
   */
  private testMethod(private x: number, private y: number) {}
}
```

## When to turn off

If you are not using TypeDoc.

## Source

Suggestion by [@deyaaeldeen](https://github.com/deyaaeldeen).

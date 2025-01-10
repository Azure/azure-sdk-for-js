# ts-naming-options

Requires client method options parameter types to be suffixed with `Options` and prefixed with the method name.

Exception: `OperationOptions` type is allowed when an operation doesn't need any custom options.

## Examples

### Good

```ts
class ServiceClient {
  constructor(options: ServiceClientOptions) {
    /* code */
  }
  createItem(options: CreateItemOptions): Item {
    /* code to return instance of Item */
  }
  upsertItem(options: UpsertItemOptions): Item {
    /* code to return instance of Item */
  }
  deleteItem(options: OperationOptions): void {
    /* code to return instance of Item */
  }
}
```

### Bad

```ts
class ServiceClient {
  constructor(options: Options) {
    /* code */
  }
  createItem(options: Options): Item {
    /* code to return instance of Item */
  }
}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-naming-options)

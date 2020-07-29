# ts-naming-drop-noun

Requires client methods that return instances of the client to drop the client name from the method name.

## Examples

### Good

```ts
class ServiceClient {
  create(): ServiceClient {
    /* code to return instance of ServiceClient */
  }
}
```

```ts
// private methods are ignored
class ServiceClient {
  private _createService(): ServiceClient {
    /* code to return instance of ServiceClient */
  }
}
```

### Bad

```ts
class ServiceClient {
  createService(): ServiceClient {
    /* code to return instance of ServiceClient */
  }
}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-naming-drop-noun)

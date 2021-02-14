# ts-apisurface-supportcancellation

Requires all asynchronous public-facing client methods to accept an `AbortSignalLike` parameter or option.

## Examples

### Good

```ts
class ServiceClient {
  async createItem(cancelToken: AbortSignalLike);
}
```

```ts
interface ServiceOptions {
  cancelToken: AbortSignalLike;
}

class ServiceClient {
  async createItem(options: ServiceOptions);
}
```

```ts
// private methods are ignored
class ServiceClient {
  private createItem(): void {}
}
```

### Bad

```ts
class ServiceClient {
  async createItem();
}
```

## When to turn off

If your SDK doesn't intend to support cancellation.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-apisurface-supportcancellation)

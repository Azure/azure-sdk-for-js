# ts-pagination-list

Requires client `list` methods to return a `PagedAsyncIterableIterator`.

## Examples

### Good

```ts
class ServiceClient {
  listItems(): PagedAsyncIterableIterator<Item> {
    /* code to return instance of PagedAsyncIterableIterator<Item> */
  }
}
```

### Bad

```ts
// no return type
class ServiceClient {
  listItems() {
    /* code here */
  }
}
```

```ts
// different return type
class ServiceClient {
  listItems(): AsyncIterator<Item> {
    /* code to return instance of AsyncIterator<Item> */
  }
}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-pagination-list)

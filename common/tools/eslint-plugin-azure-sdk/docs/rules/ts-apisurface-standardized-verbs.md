# ts-apisurface-standardized-verbs

Requires all public-facing client methods to use a verb from the approved list of prefixes and suffixes where possible.

The list of approved verbs and their uses is as follows:

| Verb             | Parameters        | Returns                                    | Comments                                                                                                     |
| ---------------- | ----------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `create\<Noun>`  | key, item         | Created item                               | Create new item. Fails if item already exists.                                                               |
| `upsert\<Noun>`  | key, item         | Updated or created item                    | Create new item, or update existing item. Verb is primarily used in database-like services                   |
| `set\<Noun>`     | key, item         | Updated or created item                    | Create new item, or update existing item. Verb is primarily used for dictionary-like properties of a service |
| `update\<Noun>`  | key, partial item | Updated item                               | Fails if item doesn't exist.                                                                                 |
| `replace\<Noun>` | key, item         | Replace existing item                      | Completely replaces an existing item. Fails if the item doesn't exist.                                       |
| `append\<Noun>`  | item              | Appended item                              | Add item to a collection. Item will be added last.                                                           |
| `add\<Noun>`     | index, item       | Added item                                 | Add item to a collection. Item will be added at the given index.                                             |
| `get\<Noun>`     | key               | Item                                       | Will return null if item doesn't exist                                                                       |
| `list\<Noun>s`   |                   | `PagedAsyncIterableIterator<TItem, TPage>` | Return list of items. Returns empty list if no items exist                                                   |
| `\<noun>Exists`  | key               | `bool`                                     | Return true if the item exists.                                                                              |
| `delete\<Noun>`  | key               | None                                       | Delete an existing item. Will succeed even if item didn't exist.                                             |
| `remove\<Noun>`  | key               | None or removed item                       | Remove item from a collection.                                                                               |

In usage, this rule forbids the usage of synonyms of these approved verb prefixes and suffixes, with the following prefixes being the current banned set:

- `erase`
- `fetch`
- `getAll`
- `insertOrUpdate`
- `make`
- `pop`
- `push`
- `updateOrInsert`

## Examples

### Good

```ts
// ignore parameter and return types for the purposes of this rule
class ServiceClient {
  createItem(): void {}
  upsertItem(): void {}
  setItem(): void {}
  updateItem(): void {}
  replaceItem(): void {}
  appendItem(): void {}
  addItem(): void {}
  getItem(): void {}
  listItems(): void {}
  itemExists(): void {}
  deleteItem(): void {}
  removeItem(): void {}
}
```

```ts
// private methods are ignored
class ServiceClient {
  private makeItem(): void {}
}
```

```ts
// classes not suffixed with "Client" are ignored
class ServiceItem {
  makeItem(): void {}
}
```

### Bad

```ts
class ServiceClient {
  makeItem(): void {}
}
```

## When to turn off

Only if rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-apisurface-standardized-verbs)

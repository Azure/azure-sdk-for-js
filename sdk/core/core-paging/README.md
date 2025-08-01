# Azure Core Paging client library for JavaScript

This library provides core types for paging async iterable iterators.

## Getting started

### Installation

This package is primarily used in generated code and not meant to be consumed directly by end users.

## Key concepts

You can find an explanation of how this repository's code works by going to our [architecture overview](https://github.com/Azure/ms-rest-js/blob/master/docs/architectureOverview.md).

## Examples

Example of building with the types:

```typescript snippet:ReadmePagingSample
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";

function listSecrets(
  options: ListSecretsOptions = {},
): PagedAsyncIterableIterator<SecretAttributes> {
  const iter = listSecretsAll(options);
  return {
    async next() {
      return iter.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage: (settings: PageSettings = {}) => listSecretsPage(settings, options),
  };
}

for await (const page of listSecrets().byPage({ maxPageSize: 2 })) {
  for (const secret of page) {
    console.log("secret: ", secret);
  }
}
```

And using the types:

```
  for await (let page of client.listSecrets().byPage({ maxPageSize: 2 })) {
    for (const secret of page) {
      console.log("secret: ", secret);
    }
  }
```

## Next steps

Try out this package in your application when dealing with async iterable iterators and provide feedback!

## Troubleshooting

Log an issue at https://github.com/Azure/azure-sdk-for-js/issues

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

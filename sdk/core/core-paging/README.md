# Azure Core Paging client library for JS

[![Build Status](https://dev.azure.com/azure-public/adx/_apis/build/status/public.Azure.ms-rest-js)](https://dev.azure.com/azure-public/adx/_build/latest?definitionId=6)

Core types for paging async iterable iterators

## Getting started

### Requirements
- node.js version > 6.x
- npm install -g typescript

### Installation
- After cloning the repo, execute `rush install`

## Key concepts

You can find an explanation of how this repository's code works by going to our [architecture overview](https://github.com/Azure/ms-rest-js/blob/master/docs/architectureOverview.md).

## Examples

Example of building with the types:

```typescript
  public listSecrets(
    options?: ListSecretsOptions
  ): PagedAsyncIterableIterator<SecretAttributes> {
    const iter = this.listSecretsAll(options);
    return {
      async next() {
        const item = (await iter.next()).value;
        return item ? { done: false, value: item } : { done: true, value: undefined };
      },
      [Symbol.asyncIterator]() { return this; },
      byPage: (settings: PageSettings = {}) => this.listSecretsPage(settings, options),
    };
  }
```

And using the types:

```
  for await (let page of client.listSecrets().byPage({ pageSize: 2 })) {
    for (const secret of page) {
      console.log("secret: ", secret);
    }
  }
```

## Next steps

### node.js
- Set the subscriptionId and token
- Run `node samples/node-sample.js`

### In the browser
- Set the subscriptionId and token and then run
- Open index.html file in the browser. It should show the response from GET request on the storage account. From Chrome type Ctrl + Shift + I and you can see the logs in console.

## Troubleshooting

To be added later.

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

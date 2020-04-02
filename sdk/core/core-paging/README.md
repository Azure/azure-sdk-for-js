# Azure Core Paging client library for JavaScript

This library provides core types for paging async iterable iterators.

## Getting started

### Installation

If using this as part of another project in the [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) repo,
then run `rush install` after cloning the repo.

Otherwise, use npm to install this package in your application as follows

```javascript
npm install @azure/core-paging
```

## Key concepts

You can find an explanation of how this repository's code works by going to our [architecture overview](https://github.com/Azure/ms-rest-js/blob/master/docs/architectureOverview.md).

## Examples

Example of building with the types:

```typescript
  public listSecrets(
    options: ListSecretsOptions = {}
  ): PagedAsyncIterableIterator<SecretAttributes> {
    const iter = this.listSecretsAll(options);
    return {
      async next() { return iter.next(); },
      [Symbol.asyncIterator]() { return this; },
      byPage: (settings: PageSettings = {}) => this.listSecretsPage(settings, options),
    };
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

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

If you'd like to contribute to this library, please read the [contributing guide](../../../CONTRIBUTING.md) to learn more about how to build and test the code.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcore%2Fcore-paging%2FREADME.png)

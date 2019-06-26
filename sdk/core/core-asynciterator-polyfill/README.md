# Azure Async Iterator Polyfill client library for JS

This library acts to polyfill for Symbol.asyncIterator

## Getting started

### Requirements
- node.js version > 6.x
- npm install -g typescript

### Installation
- After cloning the repo, execute `rush install`

## Key concepts

This is a polyfill for Symbol.asyncIterator for platforms that do not have support for it by default.

## Examples

To use this polyfill, just include an import of this library in your code

```typescript
import "@azure/core-asynciterator-polyfill";
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

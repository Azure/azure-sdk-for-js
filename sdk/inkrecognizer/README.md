# Azure InkRecognizer library for JavaScript

- [API Reference documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/ink-recognizer/)

## Introduction

This project provides a SDK in Javascript that makes it easy to consume Microsoft Azure InkRecognizer service.

## Building the library

Once you clone this repo, you can build the package with the following commands:

```sh
npm install
npm run build
```

Run tests via:

```sh
npm test
```

## Implementation Details

The overall build pipeline looks like the following:

1. TypeScript builds all source files under `./src` to ECMAScript Modules (ESM) under `./dist-esm`
2. Rollup builds `./dist-esm` to an optimized single file at `./dist/index.js` as the Node entry point.
3. Rollup builds `./dist-esm` to an optimized browser bundle under `./browser/index.js`.

Tests follow a similar pipeline, however output folders have the `test-` prefix.

## License

This project is licensed under MIT.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.microsoft.com.>

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
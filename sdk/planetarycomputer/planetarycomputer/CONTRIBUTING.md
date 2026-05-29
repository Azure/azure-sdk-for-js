# Contributing to Azure Planetary Computer Pro client library for JavaScript

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Getting Started

For detailed instructions on how to build and test this library, refer to:

- [TESTING.md](TESTING.md) for running tests
- [Development Workflows](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) for the monorepo contribution guide

### Prerequisites

- Node.js LTS
- pnpm (installed via `npm install -g pnpm`)

### Building

```bash
pnpm install
pnpm turbo build --filter=@azure/planetarycomputer... --token 1
```

### Testing

See [TESTING.md](TESTING.md) for detailed testing instructions.

### Linting and Formatting

```bash
cd sdk/planetarycomputer/planetarycomputer
pnpm format
pnpm lint
```

# TurboBuild Cache for the Azure SDK for JavaScript

This is an implementation of a remote cache for the TurboBuild tool, which is part of the [TurboRepo monorepo build system](https://turbo.build/). The cache is designed to be used with the Azure SDK for JavaScript, and it provides a way to store and retrieve build artifacts in a remote location.

The cache is implemented using Azure Blob Storage, and it uses the `@azure/storage-blob` package to interact with the storage service. The cache is designed to be used in a CI/CD environment, where build artifacts need to be shared between different build agents.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- Azure Storage account
- Azure Storage connection string

### Building the Package

To build the package, run the following command:

```bash
pnpm build
```

In order to run the server, you need to set the environment variables as noted in the `sample.env` file. You can do this by creating a `.env` file in the root of the project and adding the following variables:

```env
# Server Configuration
AZURE_CACHE_PORT=3000
PACKAGE_VERSION=1.0.0
CACHE_LOG_LEVEL=info

# Turbo Configuration
TURBO_TOKEN=token1,token2

# Azure Storage Configuration
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=your_account_name;AccountKey=your_account_key;EndpointSuffix=core.windows.net
AZURE_STORAGE_CONTAINER_NAME=your_container_name
```

The server can be started by running the following command with watch mode:

```bash
pnpm dev
```

### Configuring TurboRepo

To configure TurboRepo Build to use the remote cache, you need to create the `.turbo/config.json` file in the root of your project and add the following configuration, where the team token is one of the tokens you set in the `TURBO_TOKEN` environment variable:

```json
{
  "apiurl": "<your_api_url>",
  "teamslug": "<your_team_slug>",
  "token": "<your_token>"
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `CACHE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `logger` module:

```ts snippet:logging
import { setLogLevel } from "../src/util/logger.js";

setLogLevel("info");
```

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure Notification Hubs instance. To execute the tests you'll need to run:

1. `pnpm install`
2. `pnpm build --filter=@azure-tools/@azure/turborepo-remote-cache...`
3. Create a .env file with these contents in the `common/tools/turborepo-remote-cache` folder with the contents from the `example.env` file with local values.
4. `cd common/tools/turborepo-remote-cache`
5. `pnpm test`.

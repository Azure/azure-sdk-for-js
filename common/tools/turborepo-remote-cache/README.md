# TurboBuild Cache for the Azure SDK for JavaScript

This is an implementation of a remote cache for the TurboBuild tool, which is part of the [TurboRepo monorepo build system](https://turbo.build/). The cache is designed to be used with the Azure SDK for JavaScript, and it provides a way to store and retrieve build artifacts in a remote location.

The cache is implemented using Azure Blob Storage, and it uses the `@azure/storage-blob` package to interact with the storage service. The cache is designed to be used in a CI/CD environment, where build artifacts need to be shared between different build agents.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- Azure Storage account
- Azure Storage connection string

### Running the Cache Locally

You will need to log into Azure and create a storage account. You can do this using the Azure CLI:

```bash
az login
```

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
AZURE_STORAGE_ACCOUNT=your_account_name
AZURE_STORAGE_CONTAINER_NAME=your_container_name
```

The server can be started by running the following command with watch mode:

```bash
pnpm dev
```

### Running the Cache in Docker

To run the cache in Docker, you can use the following command in the `common/tools/turborepo-remote-cache` directory:

```bash
docker build -t azure-turborepo-remote-cache .
```

Using an `.env` file is supported so you can run the container with the following command:

```bash
docker run -p 3000:3000 azure-turborepo-remote-cache /bin/bash
```

Then in the launched terminal, you can then log into Azure locally to set the token:


```bash
az login
```

Then you can launch the server with the following command:

```bash
node dist/src/index.js
```

You can also pass the environment variables directly in the command line. For example, to run the cache with a specific Azure Storage connection string and container name, you can use the following command followed by the previous steps of `az login` and running the app via `node dist/src/index.js`:

```bash
docker run -p 3000:3000 \
  -e AZURE_CACHE_PORT=3000 \
  -e PACKAGE_VERSION=1.0.0 \
  -e CACHE_LOG_LEVEL=info \
  -e TURBO_TOKEN=token1,token2 \
  -e AZURE_STORAGE_ACCOUNT=your_account_name \
  -e AZURE_STORAGE_CONTAINER_NAME=your_container_name \
  azure-turborepo-remote-cache \
  /bin/bash
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

### Creating a New Azure Storage Account
If you don't have an Azure Storage account, you can create one using the Azure CLI. First, log in to your Azure account:

```bash
az login
```

Then, create a new resource group:

```bash
az group create --name myResourceGroup --location eastus
```
Next, create a new storage account with our bicep template:

```bash
az deployment group create \
  --resource-group <RESOURCE_GROUP_NAME> \
  --template-file cache.bicep \
  --parameters storageAccountName=mycustomstorage containerName=mycustomcontainer
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

# TurboBuild Cache for the Azure SDK for JavaScript

This is an implementation of a remote cache for the TurboBuild tool, which is part of the [TurboRepo monorepo build system](https://turbo.build/). The cache is designed to be used with the Azure SDK for JavaScript, and it provides a way to store and retrieve build artifacts in a remote location.

The cache is implemented using Azure Blob Storage, and it uses the `@azure/storage-blob` package to interact with the storage service. The cache is designed to be used in a CI/CD environment, where build artifacts need to be shared between different build agents.

## Getting Started

### Prerequisites

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Azure Storage account

### Running the Cache Locally

You will need an Azure Storage Blob resource for running the cache server.. See below on how to create a Azure Storage Account.

To build the package, run the following command under the project directory:

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

To run the cache in Docker, you can use the following command in the `eng/containers/turborepo-remote-cache` directory for production:

```bash
docker build -t azure-turborepo-remote-cache .
```

Here's an example of running the cache with all supported envirnonment variables passed:

```bash
docker run -p 3000:3000 \
  -it \
  -e AZURE_CACHE_PORT=3000 \
  -e PACKAGE_VERSION=1.0.0 \
  -e CACHE_LOG_LEVEL=info \
  -e TURBO_TOKEN=token1,token2 \
  -e AZURE_STORAGE_ACCOUNT=your_account_name \
  -e AZURE_STORAGE_CONTAINER_NAME=your_container_name \
  azure-turborepo-remote-cache
```

Using an `.env` file is supported so you can run the container with the following command where you mount the local `.env` file to the container's `/app/.env`:

```bash
docker run -p 3000:3000 -it -v ./.env:/app/.env azure-turborepo-remote-cache
```

Pass a Azure Blob container SAS url via the `AZURE_CONTAINER_SAS_URL` envirnonment variable for local testing.

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

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `CACHE_LOG_LEVEL` environment variable to `info`.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code. Here's an example of building and running tests

1. `pnpm install`
2. `pnpm build --filter=@azure-tools/@azure/turborepo-remote-cache...`
3. Create a .env file with these contents in the `eng/containers/turborepo-remote-cache` folder with the contents from the `example.env` file with local values
4. `cd eng/containers/turborepo-remote-cache`
5. `pnpm test`

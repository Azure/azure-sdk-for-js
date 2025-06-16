# TurboBuild Cache for the Azure SDK for JavaScript

This is an implementation of a remote cache for the TurboBuild tool, which is part of the [TurboRepo monorepo build system](https://turbo.build/). The cache is designed to be used with the Azure SDK for JavaScript, and it provides a way to store and retrieve build artifacts in a remote location.

The cache is implemented using Azure Blob Storage, and it uses the `@azure/storage-blob` package to interact with the storage service. The cache is designed to be used in a CI/CD environment, where build artifacts need to be shared between different build agents.

## Getting Started

### Prerequisites

- Node.js 20.x or later
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

To run the cache in Docker, you can use the following command in the `common/tools/turborepo-remote-cache` directory for production:

```bash
docker build -t azure-turborepo-remote-cache .
```

For development, you can use the following command:

```bash
docker build -t azure-turborepo-remote-cache --build-arg NODE_ENV=development .
```

In order to run the cache in Docker, you will need to log into Azure to create the token on your local system. You can do this using the Azure CLI:

```bash
az login
```

Using an `.env` file is supported so you can run the container with the following command where you mount the local `.azure` directory to the container's `/root/.azure` directory for local development:

```bash
docker run -p 3000:3000 -it -v ~/.azure:/root/.azure azure-turborepo-remote-cache
```

When running in production, you can use the following command leaving out the `-v` flag and set the `NODE_ENV` variable to `production`:

```bash
docker run -p 3000:3000 -it azure-turborepo-remote-cache -e NODE_ENV=production
```

Running in production mode is recommended for production use. You can do this by setting the `NODE_ENV` environment variable to `production`:

```bash
docker run -p 3000:3000 \
  -it \
  -e NODE_ENV=production \
  -e AZURE_CACHE_PORT=3000 \
  -e PACKAGE_VERSION=1.0.0 \
  -e CACHE_LOG_LEVEL=info \
  -e TURBO_TOKEN=token1,token2 \
  -e AZURE_STORAGE_ACCOUNT=your_account_name \
  -e AZURE_STORAGE_CONTAINER_NAME=your_container_name \
  azure-turborepo-remote-cache
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

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `CACHE_LOG_LEVEL` environment variable to `info`.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure Notification Hubs instance. To execute the tests you'll need to run:

1. `pnpm install`
2. `pnpm build --filter=@azure-tools/@azure/turborepo-remote-cache...`
3. Create a .env file with these contents in the `common/tools/turborepo-remote-cache` folder with the contents from the `example.env` file with local values.
4. `cd common/tools/turborepo-remote-cache`
5. `pnpm test`.

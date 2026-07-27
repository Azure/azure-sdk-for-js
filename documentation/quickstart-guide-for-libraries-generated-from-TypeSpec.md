# Getting started – Libraries generated from TypeSpec (Azure JavaScript/TypeScript SDK)

> **Terminology**
>
> - **Libraries generated from TypeSpec**: the latest Azure SDK libraries produced by the TypeSpec emitter
> - **Libraries generated with AutoRest**: the previous generation produced by AutoRest

Libraries generated from TypeSpec provide layered APIs, smaller bundles, and
modern package structure while staying familiar to Azure SDK users.

Several packages are already GA, including `@azure/arm-avs`,
`@azure/arm-fabric`, `@azure/arm-oracledatabase`, and `@azure/keyvault-admin`.

## Migrating from older libraries

If you are upgrading from libraries generated with AutoRest, see the migration
guide:
[Guide for migrating to code generation from TypeSpec](./migration-guide-for-libraries-generated-from-TypeSpec.md)

## Prerequisites

This example uses application-secret authentication. You need:

- **Subscription ID**
- **Client ID**
- **Client Secret**
- **Tenant ID**

Set them as environment variables:

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

## Install the package

For example, to install Azure VMware Solution:

```sh
npm i @azure/arm-avs@latest
npm i @azure/identity
```

## Authentication

```typescript
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();
```

## Creating a resource management client

`@azure/arm-avs` exports `AzureVMwareSolutionAPI` from its root package.

```typescript
import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID!;
const credential = new DefaultAzureCredential();
const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
```

## Interacting with Azure resources

### Example 1: Create a private cloud resource

```typescript
import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID!;
const credential = new DefaultAzureCredential();
const client = new AzureVMwareSolutionAPI(credential, subscriptionId);

async function privateCloudsCreateOrUpdate(
  resourceGroupName: string,
  privateCloudName: string,
): Promise<void> {
  const result = await client.privateClouds.createOrUpdate(resourceGroupName, privateCloudName, {
    location: "eastus2",
    sku: { name: "AV36" },
    identity: { type: "SystemAssigned" },
    properties: {
      networkBlock: "192.168.48.0/22",
      managementCluster: { clusterSize: 4 },
    },
    tags: {},
  });
  console.log(result);
}
```

### Example 2: Manage a private cloud

```typescript
async function privateCloudsUpdate(
  resourceGroupName: string,
  privateCloudName: string,
): Promise<void> {
  const result = await client.privateClouds.update(resourceGroupName, privateCloudName, {
    identity: { type: "None" },
    properties: {
      managementCluster: { clusterSize: 4 },
      encryption: {
        status: "Enabled",
        keyVaultProperties: {
          keyName: "keyname1",
          keyVersion: "ver1.0",
          keyVaultUrl: "https://keyvault1-kmip-kvault.vault.azure.net/",
        },
      },
    },
  });
  console.log(result);
}

async function privateCloudsList(resourceGroupName: string): Promise<void> {
  const results: unknown[] = [];
  for await (const item of client.privateClouds.list(resourceGroupName)) {
    results.push(item);
  }
  console.log(results);
}

async function privateCloudsGet(resourceGroupName: string, privateCloudName: string): Promise<void> {
  const result = await client.privateClouds.get(resourceGroupName, privateCloudName);
  console.log(result);
}

async function privateCloudsDelete(resourceGroupName: string, privateCloudName: string): Promise<void> {
  await client.privateClouds.delete(resourceGroupName, privateCloudName);
}
```

## Code samples

Additional samples live next to each package. For AVS, see:
<https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/avs/arm-avs/samples>

## Need help?

- [File an issue](https://github.com/Azure/azure-sdk-for-js/issues)

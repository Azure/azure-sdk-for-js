# Getting Started - Using the next-generation management libraries of Azure SDK for JavaScript/TypeScript

This guide shows how to authenticate to Azure and use the current management
libraries.

## Migrating from older management libraries

If you are upgrading from an older generation, see the migration guide:
[Guide for migrating to the next generation of Azure JavaScript SDK for Management Libraries](./MIGRATION-guide-for-next-generation-management-libraries.md)

## Prerequisites

You need:

- **Subscription ID**
- **Client ID**
- **Client Secret**
- **Tenant ID**

Set these environment variables:

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

## Install the package

Example:

```sh
npm i @azure/arm-compute@latest
npm i @azure/identity
```

## Authentication

```typescript
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();
```

## Create a resource management client

```typescript
import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID!;
const credential = new DefaultAzureCredential();
const client = new ComputeManagementClient(credential, subscriptionId);
```

## Example: create a resource group

```typescript
import { ResourceManagementClient, ResourceGroup } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID!;
const credential = new DefaultAzureCredential();
const resourcesClient = new ResourceManagementClient(credential, subscriptionId);

async function createResourceGroup(resourceGroupName: string): Promise<void> {
  const parameter: ResourceGroup = {
    location: "eastus",
    tags: { tag1: "value1" },
  };
  const result = await resourcesClient.resourceGroups.createOrUpdate(resourceGroupName, parameter);
  console.log(result);
}
```

## Example: update a resource group

```typescript
import { ResourceGroupPatchable } from "@azure/arm-resources";

async function updateResourceGroup(resourceGroupName: string): Promise<void> {
  const parameter: ResourceGroupPatchable = {
    tags: {
      tag1: "value1",
      tag2: "value2",
    },
  };
  const result = await resourcesClient.resourceGroups.update(resourceGroupName, parameter);
  console.log(result);
}
```

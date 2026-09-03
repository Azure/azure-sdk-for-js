# Getting started – Libraries generated from TypeSpec (Azure JavaScript/TypeScript SDK)

> **Terminology**
>
> - **Libraries generated from TypeSpec**: the latest Azure SDK libraries produced by the **TypeSpec Emitter**  
>   *(previously referred to as “modularized libraries” or “Modular SDKs”)*  
> - **Libraries generated with AutoRest**: the previous generation produced by the **AutoRest Code Generator**

Libraries generated from TypeSpec offer layered APIs, smaller bundles, and cleaner ergonomics—while remaining familiar to existing users of the Azure SDK for JavaScript/TypeScript.

Several packages are already GA, including `@azure/arm-avs`, `@azure/arm-fabric`, `@azure/arm-oracledatabase`, and `@azure/keyvault-admin`. Find the latest versions on **npm**: <https://www.npmjs.com>.

This quickstart walks you through managing Azure resources using a TypeSpec‑generated management library. For an overview, see:  
<https://devblogs.microsoft.com/azure-sdk/azure-sdk-modularized-libraries-for-javascript/>

## Migrating from older libraries

If you’re upgrading from **libraries generated with AutoRest**, use the migration guide:  
<https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/migration-guide-for-libraries-generated-from-TypeSpec.md>

## Prerequisites

There are several possible approaches to Azure authentication. In this document we would use the application secret authentication. You will need the following values:

- **Subscription ID**
- **Client ID**
- **Client Secret**
- **Tenant ID**

These values can be obtained from the portal. You could follow the [instructions](https://learn.microsoft.com/azure/azure-portal/get-subscription-tenant-id) to get Subscription ID. And please refer to [this document](https://learn.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal) to get Client ID, Client Secret, and Tenant ID. After you obtain the values, you need to set the following values as your environment variables.

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

## Install the package

As an example, to install the latest Azure VMware Solution module, you would run:

```sh
npm i @azure/arm-avs@latest
```

We also recommend installing the authentication package:

```sh
npm i @azure/identity
```

## Authentication

Once the environment is setup, all you need to do is to create an authenticated client. The `@azure/identity` module provides facilities for various ways of authenticating with Azure including client/secret, certificate, managed identity, and more.

Our default option is to use **DefaultAzureCredential** which will make use of the environment variables we have set and take care of the authentication flow for us.

```typescript
const credential = new DefaultAzureCredential();
```

For more details on how authentication works in `@azure/identity`, please see the documentation for [`@azure/identity`](https://www.npmjs.com/package/@azure/identity).

## Creating a Resource Management Client

To begin, determine the target service and create a client to connect to it. In this example, we will use `AzureVMwareSolutionAPI` as the service. To manage a private cloud resource, you can instantiate the client as follows:

```typescript
const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
```

## Interacting with Azure Resources

Once authenticated and the client is created, you can use it to perform API operations. In resource management scenarios, common operations include creating, updating, reading, and deleting Azure resources. These operations are referred to as "management operations" in Azure.
After identifying the specific operation you want to perform, you can implement it using the management client initialized above.

We will walk through two examples:

- **Example 1**: Creating a private cloud resource using the Azure VMware Solution client.
- **Example 2**: Managing a private cloud with the Azure SDK for TypeScript.

### Example 1: Create a private cloud resource

**_Import the packages_**  

```typescript
import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";
```


**_Define some global variables_**  

```typescript
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
```

**_Create a private cloud_**  

```typescript
async function privateCloudsCreateOrUpdate(resourceGroupName: string, privateCloudName: string): Promise<void> {
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
### Example 2: Manage a private cloud with the Azure SDK

**_Import the packages_**  

```typescript
import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";
```

**_Authentication and set up_**  

```typescript
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
```


**_Update a private cloud_**  

```typescript
async function privateCloudsUpdate(resourceGroupName: string, privateCloudName: string): Promise<void> {
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
```
**_List all private clouds_**  

```typescript
async function privateCloudsList(resourceGroupName: string): Promise<void> {
  const resArray = new Array();
  for await (const item of client.privateClouds.list(resourceGroupName)) {
    resArray.push(item);
  }

  console.log(resArray);
}
```

**_Get a private cloud_**  

```typescript
async function privateCloudsGet(resourceGroupName: string, privateCloudName: string): Promise<void> {
  const result = await client.privateClouds.get(resourceGroupName, privateCloudName);
  console.log(result);
}
```

**_Delete a private cloud_**  

```typescript
async function privateCloudsDelete(resourceGroupName: string, privateCloudName: string): Promise<void> {
  await client.privateClouds.delete(resourceGroupName, privateCloudName);
}
```

**_Manage private clouds_**  

```typescript
async function main() {
  const resourceGroupName = "your resource group";
  const privateCloudName = "private cloud name";
  await privateCloudsCreateOrUpdate(resourceGroupName, privateCloudName);
  await privateCloudsList(resourceGroupName);
  await privateCloudsGet(resourceGroupName, privateCloudName);
  await privateCloudsUpdate(resourceGroupName, privateCloudName);
  await privateCloudsGet(resourceGroupName, privateCloudName);
  await privateCloudsDelete(resourceGroupName, privateCloudName);
  await privateCloudsList(resourceGroupName);
}
```

## Code Samples

You can find additional code samples for using the JavaScript/TypeScript SDK in this repo. These samples are located in the samples folder alongside the SDK source code—for example, AVS-related samples are available at https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/avs/arm-avs/samples.

## Need help?

- File an issue via [GitHub
  Issues](https://github.com/Azure/azure-sdk-for-js/issues)

## Contributing

For details on contributing to this repository, see the contributing
guide.

This project welcomes contributions and suggestions. Most contributions
require you to agree to a Contributor License Agreement (CLA) declaring
that you have the right to, and actually do, grant us the rights to use
your contribution. For details, visit <https://cla.microsoft.com>.

When you submit a pull request, a CLA-bot will automatically determine
whether you need to provide a CLA and decorate the PR appropriately
(e.g., label, comment). Simply follow the instructions provided by the
bot. You will only need to do this once across all repositories using
our CLA.

This project has adopted the Microsoft Open Source Code of Conduct. For
more information see the Code of Conduct FAQ or contact
<opencode@microsoft.com> with any additional questions or comments.

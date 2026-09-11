# @azure/arm-devopsinfrastructure client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-devopsinfrastructure in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                                       |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [imageVersionsListByImageSample.ts][imageversionslistbyimagesample]     | list ImageVersion resources by Image x-ms-original-file: 2026-07-03-preview/ImageVersions_ListByImage.json                            |
| [operationsListSample.ts][operationslistsample]                         | list the operations for the provider x-ms-original-file: 2026-07-03-preview/ListOperations.json                                       |
| [poolsCheckNameAvailabilitySample.ts][poolschecknameavailabilitysample] | checks that the pool name is valid and is not already in use. x-ms-original-file: 2026-07-03-preview/Pools_CheckNameAvailability.json |
| [poolsCreateOrUpdateSample.ts][poolscreateorupdatesample]               | create a Pool x-ms-original-file: 2026-07-03-preview/CreateOrUpdatePool.json                                                          |
| [poolsDeleteResourcesSample.ts][poolsdeleteresourcessample]             | a synchronous resource action. x-ms-original-file: 2026-07-03-preview/Pools_DeleteResources.json                                      |
| [poolsDeleteSample.ts][poolsdeletesample]                               | delete a Pool x-ms-original-file: 2026-07-03-preview/DeletePool.json                                                                  |
| [poolsGetSample.ts][poolsgetsample]                                     | get a Pool x-ms-original-file: 2026-07-03-preview/GetPool.json                                                                        |
| [poolsListByResourceGroupSample.ts][poolslistbyresourcegroupsample]     | list Pool resources by resource group x-ms-original-file: 2026-07-03-preview/ListPoolsBySubscriptionAndResourceGroup.json             |
| [poolsListBySubscriptionSample.ts][poolslistbysubscriptionsample]       | list Pool resources by subscription ID x-ms-original-file: 2026-07-03-preview/ListPoolsBySubscription.json                            |
| [poolsUpdateSample.ts][poolsupdatesample]                               | update a Pool x-ms-original-file: 2026-07-03-preview/UpdatePool.json                                                                  |
| [resourceDetailsListByPoolSample.ts][resourcedetailslistbypoolsample]   | list ResourceDetailsObject resources by Pool x-ms-original-file: 2026-07-03-preview/ResourceDetails_ListByPool.json                   |
| [skuListByLocationSample.ts][skulistbylocationsample]                   | list ResourceSku resources by subscription ID x-ms-original-file: 2026-07-03-preview/Sku_ListByLocation.json                          |
| [subscriptionUsagesUsagesSample.ts][subscriptionusagesusagessample]     | list Quota resources by subscription ID x-ms-original-file: 2026-07-03-preview/SubscriptionUsages_Usages.json                         |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/imageVersionsListByImageSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/imageVersionsListByImageSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[imageversionslistbyimagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/imageVersionsListByImageSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/operationsListSample.ts
[poolschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/poolsCheckNameAvailabilitySample.ts
[poolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/poolsCreateOrUpdateSample.ts
[poolsdeleteresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/poolsDeleteResourcesSample.ts
[poolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/poolsDeleteSample.ts
[poolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/poolsGetSample.ts
[poolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/poolsListByResourceGroupSample.ts
[poolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/poolsListBySubscriptionSample.ts
[poolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/poolsUpdateSample.ts
[resourcedetailslistbypoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/resourceDetailsListByPoolSample.ts
[skulistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/skuListByLocationSample.ts
[subscriptionusagesusagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v2-beta/typescript/src/subscriptionUsagesUsagesSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-devopsinfrastructure?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

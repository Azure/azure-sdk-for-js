# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [imageVersionsListByImageSample.js][imageversionslistbyimagesample]                 | List ImageVersion resources by Image x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/ImageVersions_ListByImage.json                |
| [operationsListSample.js][operationslistsample]                                     | List the operations for the provider x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/ListOperations.json                           |
| [poolsCreateOrUpdateSample.js][poolscreateorupdatesample]                           | Create a Pool x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/CreateOrUpdatePool.json                                              |
| [poolsDeleteSample.js][poolsdeletesample]                                           | Delete a Pool x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/DeletePool.json                                                      |
| [poolsGetSample.js][poolsgetsample]                                                 | Get a Pool x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/GetPool.json                                                            |
| [poolsListByResourceGroupSample.js][poolslistbyresourcegroupsample]                 | List Pool resources by resource group x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/ListPoolsBySubscriptionAndResourceGroup.json |
| [poolsListBySubscriptionSample.js][poolslistbysubscriptionsample]                   | List Pool resources by subscription ID x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/ListPoolsBySubscription.json                |
| [poolsUpdateSample.js][poolsupdatesample]                                           | Update a Pool x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/UpdatePool.json                                                      |
| [resourceDetailsListByPoolSample.js][resourcedetailslistbypoolsample]               | List ResourceDetailsObject resources by Pool x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/ResourceDetails_ListByPool.json       |
| [skuListByLocationSample.js][skulistbylocationsample]                               | List ResourceSku resources by subscription ID x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/Sku_ListByLocation.json              |
| [subscriptionUsagesListByLocationSample.js][subscriptionusageslistbylocationsample] | List Quota resources by subscription ID x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/SubscriptionUsages_ListByLocation.json     |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node imageVersionsListByImageSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env DEVOPSINFRASTRUCTURE_SUBSCRIPTION_ID="<devopsinfrastructure subscription id>" DEVOPSINFRASTRUCTURE_RESOURCE_GROUP="<devopsinfrastructure resource group>" node imageVersionsListByImageSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[imageversionslistbyimagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/imageVersionsListByImageSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/operationsListSample.js
[poolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/poolsCreateOrUpdateSample.js
[poolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/poolsDeleteSample.js
[poolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/poolsGetSample.js
[poolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/poolsListByResourceGroupSample.js
[poolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/poolsListBySubscriptionSample.js
[poolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/poolsUpdateSample.js
[resourcedetailslistbypoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/resourceDetailsListByPoolSample.js
[skulistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/skuListByLocationSample.js
[subscriptionusageslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1-beta/javascript/subscriptionUsagesListByLocationSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-devopsinfrastructure?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/README.md

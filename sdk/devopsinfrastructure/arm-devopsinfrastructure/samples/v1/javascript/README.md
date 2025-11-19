# @azure/arm-devopsinfrastructure client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-devopsinfrastructure in some common scenarios.

| **File Name**                                                         | **Description**                                                                                                   |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [imageVersionsListByImageSample.js][imageversionslistbyimagesample]   | list ImageVersion resources by Image x-ms-original-file: 2024-10-19/ImageVersions_ListByImage.json                |
| [operationsListSample.js][operationslistsample]                       | list the operations for the provider x-ms-original-file: 2024-10-19/ListOperations.json                           |
| [poolsCreateOrUpdateSample.js][poolscreateorupdatesample]             | create a Pool x-ms-original-file: 2024-10-19/CreateOrUpdatePool.json                                              |
| [poolsDeleteSample.js][poolsdeletesample]                             | delete a Pool x-ms-original-file: 2024-10-19/DeletePool.json                                                      |
| [poolsGetSample.js][poolsgetsample]                                   | get a Pool x-ms-original-file: 2024-10-19/GetPool.json                                                            |
| [poolsListByResourceGroupSample.js][poolslistbyresourcegroupsample]   | list Pool resources by resource group x-ms-original-file: 2024-10-19/ListPoolsBySubscriptionAndResourceGroup.json |
| [poolsListBySubscriptionSample.js][poolslistbysubscriptionsample]     | list Pool resources by subscription ID x-ms-original-file: 2024-10-19/ListPoolsBySubscription.json                |
| [poolsUpdateSample.js][poolsupdatesample]                             | update a Pool x-ms-original-file: 2024-10-19/UpdatePool.json                                                      |
| [resourceDetailsListByPoolSample.js][resourcedetailslistbypoolsample] | list ResourceDetailsObject resources by Pool x-ms-original-file: 2024-10-19/ResourceDetails_ListByPool.json       |
| [skuListByLocationSample.js][skulistbylocationsample]                 | list ResourceSku resources by subscription ID x-ms-original-file: 2024-10-19/Sku_ListByLocation.json              |
| [subscriptionUsagesUsagesSample.js][subscriptionusagesusagessample]   | list Quota resources by subscription ID x-ms-original-file: 2024-10-19/SubscriptionUsages_Usages.json             |

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
cross-env node imageVersionsListByImageSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[imageversionslistbyimagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/imageVersionsListByImageSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/operationsListSample.js
[poolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/poolsCreateOrUpdateSample.js
[poolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/poolsDeleteSample.js
[poolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/poolsGetSample.js
[poolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/poolsListByResourceGroupSample.js
[poolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/poolsListBySubscriptionSample.js
[poolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/poolsUpdateSample.js
[resourcedetailslistbypoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/resourceDetailsListByPoolSample.js
[skulistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/skuListByLocationSample.js
[subscriptionusagesusagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/samples/v1/javascript/subscriptionUsagesUsagesSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-devopsinfrastructure?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/devopsinfrastructure/arm-devopsinfrastructure/README.md

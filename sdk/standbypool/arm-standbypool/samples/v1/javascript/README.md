# @azure/arm-standbypool client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-standbypool in some common scenarios.

| **File Name**                                                                                                                                 | **Description**                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                                                               | list the operations for the provider x-ms-original-file: 2025-03-01/Operations_List.json                                                                                                     |
| [standbyContainerGroupPoolRuntimeViewsGetSample.js][standbycontainergrouppoolruntimeviewsgetsample]                                           | get a StandbyContainerGroupPoolRuntimeViewResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPoolRuntimeViews_Get.json                                                             |
| [standbyContainerGroupPoolRuntimeViewsListByStandbyPoolSample.js][standbycontainergrouppoolruntimeviewslistbystandbypoolsample]               | list StandbyContainerGroupPoolRuntimeViewResource resources by StandbyContainerGroupPoolResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPoolRuntimeViews_ListByStandbyPool.json |
| [standbyContainerGroupPoolsCreateOrUpdateSample.js][standbycontainergrouppoolscreateorupdatesample]                                           | create a StandbyContainerGroupPoolResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_CreateOrUpdate.json                                                                     |
| [standbyContainerGroupPoolsDeleteSample.js][standbycontainergrouppoolsdeletesample]                                                           | delete a StandbyContainerGroupPoolResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_Delete.json                                                                             |
| [standbyContainerGroupPoolsGetSample.js][standbycontainergrouppoolsgetsample]                                                                 | get a StandbyContainerGroupPoolResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_Get.json                                                                                   |
| [standbyContainerGroupPoolsListByResourceGroupSample.js][standbycontainergrouppoolslistbyresourcegroupsample]                                 | list StandbyContainerGroupPoolResource resources by resource group x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_ListByResourceGroup.json                                        |
| [standbyContainerGroupPoolsListBySubscriptionSample.js][standbycontainergrouppoolslistbysubscriptionsample]                                   | list StandbyContainerGroupPoolResource resources by subscription ID x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_ListBySubscription.json                                        |
| [standbyContainerGroupPoolsUpdateSample.js][standbycontainergrouppoolsupdatesample]                                                           | update a StandbyContainerGroupPoolResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_Update.json                                                                             |
| [standbyVirtualMachinePoolRuntimeViewsGetSample.js][standbyvirtualmachinepoolruntimeviewsgetsample]                                           | get a StandbyVirtualMachinePoolRuntimeViewResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePoolRuntimeViews_Get.json                                                             |
| [standbyVirtualMachinePoolRuntimeViewsListByStandbyPoolSample.js][standbyvirtualmachinepoolruntimeviewslistbystandbypoolsample]               | list StandbyVirtualMachinePoolRuntimeViewResource resources by StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePoolRuntimeViews_ListByStandbyPool.json |
| [standbyVirtualMachinePoolsCreateOrUpdateSample.js][standbyvirtualmachinepoolscreateorupdatesample]                                           | create a StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_CreateOrUpdate.json                                                                     |
| [standbyVirtualMachinePoolsDeleteSample.js][standbyvirtualmachinepoolsdeletesample]                                                           | delete a StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_Delete.json                                                                             |
| [standbyVirtualMachinePoolsGetSample.js][standbyvirtualmachinepoolsgetsample]                                                                 | get a StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_Get.json                                                                                   |
| [standbyVirtualMachinePoolsListByResourceGroupSample.js][standbyvirtualmachinepoolslistbyresourcegroupsample]                                 | list StandbyVirtualMachinePoolResource resources by resource group x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_ListByResourceGroup.json                                        |
| [standbyVirtualMachinePoolsListBySubscriptionSample.js][standbyvirtualmachinepoolslistbysubscriptionsample]                                   | list StandbyVirtualMachinePoolResource resources by subscription ID x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_ListBySubscription.json                                        |
| [standbyVirtualMachinePoolsUpdateSample.js][standbyvirtualmachinepoolsupdatesample]                                                           | update a StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_Update.json                                                                             |
| [standbyVirtualMachinesGetSample.js][standbyvirtualmachinesgetsample]                                                                         | get a StandbyVirtualMachineResource x-ms-original-file: 2025-03-01/StandbyVirtualMachines_Get.json                                                                                           |
| [standbyVirtualMachinesListByStandbyVirtualMachinePoolResourceSample.js][standbyvirtualmachineslistbystandbyvirtualmachinepoolresourcesample] | list StandbyVirtualMachineResource resources by StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachines_ListByStandbyVirtualMachinePoolResource.json         |

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
node operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/operationsListSample.js
[standbycontainergrouppoolruntimeviewsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyContainerGroupPoolRuntimeViewsGetSample.js
[standbycontainergrouppoolruntimeviewslistbystandbypoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyContainerGroupPoolRuntimeViewsListByStandbyPoolSample.js
[standbycontainergrouppoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyContainerGroupPoolsCreateOrUpdateSample.js
[standbycontainergrouppoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyContainerGroupPoolsDeleteSample.js
[standbycontainergrouppoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyContainerGroupPoolsGetSample.js
[standbycontainergrouppoolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyContainerGroupPoolsListByResourceGroupSample.js
[standbycontainergrouppoolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyContainerGroupPoolsListBySubscriptionSample.js
[standbycontainergrouppoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyContainerGroupPoolsUpdateSample.js
[standbyvirtualmachinepoolruntimeviewsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyVirtualMachinePoolRuntimeViewsGetSample.js
[standbyvirtualmachinepoolruntimeviewslistbystandbypoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyVirtualMachinePoolRuntimeViewsListByStandbyPoolSample.js
[standbyvirtualmachinepoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyVirtualMachinePoolsCreateOrUpdateSample.js
[standbyvirtualmachinepoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyVirtualMachinePoolsDeleteSample.js
[standbyvirtualmachinepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyVirtualMachinePoolsGetSample.js
[standbyvirtualmachinepoolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyVirtualMachinePoolsListByResourceGroupSample.js
[standbyvirtualmachinepoolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyVirtualMachinePoolsListBySubscriptionSample.js
[standbyvirtualmachinepoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyVirtualMachinePoolsUpdateSample.js
[standbyvirtualmachinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyVirtualMachinesGetSample.js
[standbyvirtualmachineslistbystandbyvirtualmachinepoolresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/javascript/standbyVirtualMachinesListByStandbyVirtualMachinePoolResourceSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-standbypool?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/standbypool/arm-standbypool/README.md

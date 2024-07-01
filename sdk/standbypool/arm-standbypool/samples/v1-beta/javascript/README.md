# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                                                 | **Description**                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.js][operationslistsample]                                                                                               | List the operations for the provider x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/Operations_List.json                                                                                             |
| [standbyContainerGroupPoolsCreateOrUpdateSample.js][standbycontainergrouppoolscreateorupdatesample]                                           | Create a StandbyContainerGroupPoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_CreateOrUpdate.json                                                             |
| [standbyContainerGroupPoolsDeleteSample.js][standbycontainergrouppoolsdeletesample]                                                           | Delete a StandbyContainerGroupPoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_Delete.json                                                                     |
| [standbyContainerGroupPoolsGetSample.js][standbycontainergrouppoolsgetsample]                                                                 | Get a StandbyContainerGroupPoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_Get.json                                                                           |
| [standbyContainerGroupPoolsListByResourceGroupSample.js][standbycontainergrouppoolslistbyresourcegroupsample]                                 | List StandbyContainerGroupPoolResource resources by resource group x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_ListByResourceGroup.json                                |
| [standbyContainerGroupPoolsListBySubscriptionSample.js][standbycontainergrouppoolslistbysubscriptionsample]                                   | List StandbyContainerGroupPoolResource resources by subscription ID x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_ListBySubscription.json                                |
| [standbyContainerGroupPoolsUpdateSample.js][standbycontainergrouppoolsupdatesample]                                                           | Update a StandbyContainerGroupPoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_Update.json                                                                     |
| [standbyVirtualMachinePoolsCreateOrUpdateSample.js][standbyvirtualmachinepoolscreateorupdatesample]                                           | Create a StandbyVirtualMachinePoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_CreateOrUpdate.json                                                             |
| [standbyVirtualMachinePoolsDeleteSample.js][standbyvirtualmachinepoolsdeletesample]                                                           | Delete a StandbyVirtualMachinePoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_Delete.json                                                                     |
| [standbyVirtualMachinePoolsGetSample.js][standbyvirtualmachinepoolsgetsample]                                                                 | Get a StandbyVirtualMachinePoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_Get.json                                                                           |
| [standbyVirtualMachinePoolsListByResourceGroupSample.js][standbyvirtualmachinepoolslistbyresourcegroupsample]                                 | List StandbyVirtualMachinePoolResource resources by resource group x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_ListByResourceGroup.json                                |
| [standbyVirtualMachinePoolsListBySubscriptionSample.js][standbyvirtualmachinepoolslistbysubscriptionsample]                                   | List StandbyVirtualMachinePoolResource resources by subscription ID x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_ListBySubscription.json                                |
| [standbyVirtualMachinePoolsUpdateSample.js][standbyvirtualmachinepoolsupdatesample]                                                           | Update a StandbyVirtualMachinePoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_Update.json                                                                     |
| [standbyVirtualMachinesGetSample.js][standbyvirtualmachinesgetsample]                                                                         | Get a StandbyVirtualMachineResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachines_Get.json                                                                                   |
| [standbyVirtualMachinesListByStandbyVirtualMachinePoolResourceSample.js][standbyvirtualmachineslistbystandbyvirtualmachinepoolresourcesample] | List StandbyVirtualMachineResource resources by StandbyVirtualMachinePoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachines_ListByStandbyVirtualMachinePoolResource.json |

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
npx cross-env STANDBYPOOL_SUBSCRIPTION_ID="<standbypool subscription id>" node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/operationsListSample.js
[standbycontainergrouppoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyContainerGroupPoolsCreateOrUpdateSample.js
[standbycontainergrouppoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyContainerGroupPoolsDeleteSample.js
[standbycontainergrouppoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyContainerGroupPoolsGetSample.js
[standbycontainergrouppoolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyContainerGroupPoolsListByResourceGroupSample.js
[standbycontainergrouppoolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyContainerGroupPoolsListBySubscriptionSample.js
[standbycontainergrouppoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyContainerGroupPoolsUpdateSample.js
[standbyvirtualmachinepoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyVirtualMachinePoolsCreateOrUpdateSample.js
[standbyvirtualmachinepoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyVirtualMachinePoolsDeleteSample.js
[standbyvirtualmachinepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyVirtualMachinePoolsGetSample.js
[standbyvirtualmachinepoolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyVirtualMachinePoolsListByResourceGroupSample.js
[standbyvirtualmachinepoolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyVirtualMachinePoolsListBySubscriptionSample.js
[standbyvirtualmachinepoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyVirtualMachinePoolsUpdateSample.js
[standbyvirtualmachinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyVirtualMachinesGetSample.js
[standbyvirtualmachineslistbystandbyvirtualmachinepoolresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/javascript/standbyVirtualMachinesListByStandbyVirtualMachinePoolResourceSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-standbypool?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/standbypool/arm-standbypool/README.md

# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureBareMetalInstancesGetSample.ts][azurebaremetalinstancesgetsample]                                               | Gets an Azure Bare Metal Instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalInstances_Get.json                                                                                                 |
| [azureBareMetalInstancesListByResourceGroupSample.ts][azurebaremetalinstanceslistbyresourcegroupsample]               | Gets a list of Azure Bare Metal Instances in the specified subscription and resource group. The operations returns various properties of each Azure Bare Metal Instance. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalInstances_ListByResourceGroup.json             |
| [azureBareMetalInstancesListBySubscriptionSample.ts][azurebaremetalinstanceslistbysubscriptionsample]                 | Returns a list of Azure Bare Metal Instances in the specified subscription. The operations returns various properties of each Azure Bare Metal Instance. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalInstances_ListBySubscription.json                              |
| [azureBareMetalInstancesRestartSample.ts][azurebaremetalinstancesrestartsample]                                       | The operation to restart an Azure Bare Metal Instance x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalInstances_Restart.json                                                                                                                                            |
| [azureBareMetalInstancesShutdownSample.ts][azurebaremetalinstancesshutdownsample]                                     | The operation to shutdown an Azure Bare Metal Instance x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalInstances_Shutdown.json                                                                                                                                          |
| [azureBareMetalInstancesStartSample.ts][azurebaremetalinstancesstartsample]                                           | The operation to start an Azure Bare Metal instance x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalInstances_Start.json                                                                                                                                                |
| [azureBareMetalInstancesUpdateSample.ts][azurebaremetalinstancesupdatesample]                                         | Patches the Tags field of a Azure Bare Metal Instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalInstances_PatchTags_Delete.json                                                                |
| [azureBareMetalStorageInstancesCreateSample.ts][azurebaremetalstorageinstancescreatesample]                           | Create an azure bare metal storage resource. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalStorageInstances_Create.json                                                                                                                                               |
| [azureBareMetalStorageInstancesDeleteSample.ts][azurebaremetalstorageinstancesdeletesample]                           | Delete an AzureBareMetalStorageInstance. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalStorageInstances_Delete.json                                                                                                                                                   |
| [azureBareMetalStorageInstancesGetSample.ts][azurebaremetalstorageinstancesgetsample]                                 | Gets an Azure Bare Metal Storage instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalStorageInstances_Get.json                                                                                  |
| [azureBareMetalStorageInstancesListByResourceGroupSample.ts][azurebaremetalstorageinstanceslistbyresourcegroupsample] | Gets a list of AzureBareMetalStorage instances in the specified subscription and resource group. The operations returns various properties of each Azure Bare Metal Instance. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalStorageInstances_ListByResourceGroup.json |
| [azureBareMetalStorageInstancesListBySubscriptionSample.ts][azurebaremetalstorageinstanceslistbysubscriptionsample]   | Gets a list of AzureBareMetalStorage instances in the specified subscription. The operations returns various properties of each Azure Bare Metal Instance. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalStorageInstances_ListBySubscription.json                     |
| [azureBareMetalStorageInstancesUpdateSample.ts][azurebaremetalstorageinstancesupdatesample]                           | Patches the Tags field of a Azure Bare Metal Storage instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalStorageInstances_PatchTags_Delete.json                                                 |
| [operationsListSample.ts][operationslistsample]                                                                       | Gets a list of AzureBareMetal management operations. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalOperations_List.json                                                                                                                                               |

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
node dist/azureBareMetalInstancesGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env BAREMETALINFRASTRUCTURE_SUBSCRIPTION_ID="<baremetalinfrastructure subscription id>" BAREMETALINFRASTRUCTURE_RESOURCE_GROUP="<baremetalinfrastructure resource group>" node dist/azureBareMetalInstancesGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azurebaremetalinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalInstancesGetSample.ts
[azurebaremetalinstanceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalInstancesListByResourceGroupSample.ts
[azurebaremetalinstanceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalInstancesListBySubscriptionSample.ts
[azurebaremetalinstancesrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalInstancesRestartSample.ts
[azurebaremetalinstancesshutdownsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalInstancesShutdownSample.ts
[azurebaremetalinstancesstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalInstancesStartSample.ts
[azurebaremetalinstancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalInstancesUpdateSample.ts
[azurebaremetalstorageinstancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalStorageInstancesCreateSample.ts
[azurebaremetalstorageinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalStorageInstancesDeleteSample.ts
[azurebaremetalstorageinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalStorageInstancesGetSample.ts
[azurebaremetalstorageinstanceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalStorageInstancesListByResourceGroupSample.ts
[azurebaremetalstorageinstanceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalStorageInstancesListBySubscriptionSample.ts
[azurebaremetalstorageinstancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/azureBareMetalStorageInstancesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-baremetalinfrastructure?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

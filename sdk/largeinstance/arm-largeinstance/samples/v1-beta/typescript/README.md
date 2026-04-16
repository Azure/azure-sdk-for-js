# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureLargeInstanceGetSample.ts][azurelargeinstancegetsample]                                               | Gets an Azure Large Instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_Get.json                                                                                                   |
| [azureLargeInstanceListByResourceGroupSample.ts][azurelargeinstancelistbyresourcegroupsample]               | Gets a list of Azure Large Instances in the specified subscription and resource group. The operations returns various properties of each Azure Large Instance. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_ListByResourceGroup.json                    |
| [azureLargeInstanceListBySubscriptionSample.ts][azurelargeinstancelistbysubscriptionsample]                 | Gets a list of Azure Large Instances in the specified subscription. The operations returns various properties of each Azure Large Instance. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_ListBySubscription.json                                        |
| [azureLargeInstanceRestartSample.ts][azurelargeinstancerestartsample]                                       | The operation to restart an Azure Large Instance (only for compute instances) x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_Restart.json                                                                                                                 |
| [azureLargeInstanceShutdownSample.ts][azurelargeinstanceshutdownsample]                                     | The operation to shutdown an Azure Large Instance (only for compute instances) x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_Shutdown.json                                                                                                               |
| [azureLargeInstanceStartSample.ts][azurelargeinstancestartsample]                                           | The operation to start an Azure Large Instance (only for compute instances) x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_Start.json                                                                                                                     |
| [azureLargeInstanceUpdateSample.ts][azurelargeinstanceupdatesample]                                         | Patches the Tags field of an Azure Large Instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_PatchTags_Delete.json                                                                 |
| [azureLargeStorageInstanceGetSample.ts][azurelargestorageinstancegetsample]                                 | Gets an Azure Large Storage instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeStorageInstance_Get.json                                                                                    |
| [azureLargeStorageInstanceListByResourceGroupSample.ts][azurelargestorageinstancelistbyresourcegroupsample] | Gets a list of AzureLargeStorageInstances in the specified subscription and resource group. The operations returns various properties of each Azure LargeStorage instance. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeStorageInstance_ListByResourceGroup.json |
| [azureLargeStorageInstanceListBySubscriptionSample.ts][azurelargestorageinstancelistbysubscriptionsample]   | Gets a list of AzureLargeStorageInstances in the specified subscription. The operations returns various properties of each Azure LargeStorage instance. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeStorageInstance_ListBySubscription.json                     |
| [azureLargeStorageInstanceUpdateSample.ts][azurelargestorageinstanceupdatesample]                           | Patches the Tags field of a Azure Large Storage Instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeStorageInstance_PatchTags_Delete.json                                                   |
| [operationsListSample.ts][operationslistsample]                                                             | List the operations for the provider x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstanceOperations_List.json                                                                                                                                                   |

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
node dist/azureLargeInstanceGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env LARGEINSTANCE_SUBSCRIPTION_ID="<largeinstance subscription id>" LARGEINSTANCE_RESOURCE_GROUP="<largeinstance resource group>" node dist/azureLargeInstanceGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azurelargeinstancegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeInstanceGetSample.ts
[azurelargeinstancelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeInstanceListByResourceGroupSample.ts
[azurelargeinstancelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeInstanceListBySubscriptionSample.ts
[azurelargeinstancerestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeInstanceRestartSample.ts
[azurelargeinstanceshutdownsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeInstanceShutdownSample.ts
[azurelargeinstancestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeInstanceStartSample.ts
[azurelargeinstanceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeInstanceUpdateSample.ts
[azurelargestorageinstancegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeStorageInstanceGetSample.ts
[azurelargestorageinstancelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeStorageInstanceListByResourceGroupSample.ts
[azurelargestorageinstancelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeStorageInstanceListBySubscriptionSample.ts
[azurelargestorageinstanceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/azureLargeStorageInstanceUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-largeinstance?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/largeinstance/arm-largeinstance/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

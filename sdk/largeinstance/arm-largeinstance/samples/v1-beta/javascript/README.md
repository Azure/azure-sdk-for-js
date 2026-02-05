# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureLargeInstanceGetSample.js][azurelargeinstancegetsample]                                               | Gets an Azure Large Instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_Get.json                                                                                                   |
| [azureLargeInstanceListByResourceGroupSample.js][azurelargeinstancelistbyresourcegroupsample]               | Gets a list of Azure Large Instances in the specified subscription and resource group. The operations returns various properties of each Azure Large Instance. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_ListByResourceGroup.json                    |
| [azureLargeInstanceListBySubscriptionSample.js][azurelargeinstancelistbysubscriptionsample]                 | Gets a list of Azure Large Instances in the specified subscription. The operations returns various properties of each Azure Large Instance. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_ListBySubscription.json                                        |
| [azureLargeInstanceRestartSample.js][azurelargeinstancerestartsample]                                       | The operation to restart an Azure Large Instance (only for compute instances) x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_Restart.json                                                                                                                 |
| [azureLargeInstanceShutdownSample.js][azurelargeinstanceshutdownsample]                                     | The operation to shutdown an Azure Large Instance (only for compute instances) x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_Shutdown.json                                                                                                               |
| [azureLargeInstanceStartSample.js][azurelargeinstancestartsample]                                           | The operation to start an Azure Large Instance (only for compute instances) x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_Start.json                                                                                                                     |
| [azureLargeInstanceUpdateSample.js][azurelargeinstanceupdatesample]                                         | Patches the Tags field of an Azure Large Instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_PatchTags_Delete.json                                                                 |
| [azureLargeStorageInstanceGetSample.js][azurelargestorageinstancegetsample]                                 | Gets an Azure Large Storage instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeStorageInstance_Get.json                                                                                    |
| [azureLargeStorageInstanceListByResourceGroupSample.js][azurelargestorageinstancelistbyresourcegroupsample] | Gets a list of AzureLargeStorageInstances in the specified subscription and resource group. The operations returns various properties of each Azure LargeStorage instance. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeStorageInstance_ListByResourceGroup.json |
| [azureLargeStorageInstanceListBySubscriptionSample.js][azurelargestorageinstancelistbysubscriptionsample]   | Gets a list of AzureLargeStorageInstances in the specified subscription. The operations returns various properties of each Azure LargeStorage instance. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeStorageInstance_ListBySubscription.json                     |
| [azureLargeStorageInstanceUpdateSample.js][azurelargestorageinstanceupdatesample]                           | Patches the Tags field of a Azure Large Storage Instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeStorageInstance_PatchTags_Delete.json                                                   |
| [operationsListSample.js][operationslistsample]                                                             | List the operations for the provider x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstanceOperations_List.json                                                                                                                                                   |

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
node azureLargeInstanceGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env LARGEINSTANCE_SUBSCRIPTION_ID="<largeinstance subscription id>" LARGEINSTANCE_RESOURCE_GROUP="<largeinstance resource group>" node azureLargeInstanceGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azurelargeinstancegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeInstanceGetSample.js
[azurelargeinstancelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeInstanceListByResourceGroupSample.js
[azurelargeinstancelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeInstanceListBySubscriptionSample.js
[azurelargeinstancerestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeInstanceRestartSample.js
[azurelargeinstanceshutdownsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeInstanceShutdownSample.js
[azurelargeinstancestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeInstanceStartSample.js
[azurelargeinstanceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeInstanceUpdateSample.js
[azurelargestorageinstancegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeStorageInstanceGetSample.js
[azurelargestorageinstancelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeStorageInstanceListByResourceGroupSample.js
[azurelargestorageinstancelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeStorageInstanceListBySubscriptionSample.js
[azurelargestorageinstanceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/azureLargeStorageInstanceUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/largeinstance/arm-largeinstance/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-largeinstance?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/largeinstance/arm-largeinstance/README.md

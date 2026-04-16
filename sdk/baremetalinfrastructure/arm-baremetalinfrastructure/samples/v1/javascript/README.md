# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureBareMetalInstancesGetSample.js][azurebaremetalinstancesgetsample]                                 | Gets an Azure BareMetal instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/stable/2021-08-09/examples/AzureBareMetalInstances_Get.json                                                                                   |
| [azureBareMetalInstancesListByResourceGroupSample.js][azurebaremetalinstanceslistbyresourcegroupsample] | Gets a list of AzureBareMetal instances in the specified subscription and resource group. The operations returns various properties of each Azure BareMetal instance. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/stable/2021-08-09/examples/AzureBareMetalInstances_ListByResourceGroup.json |
| [azureBareMetalInstancesListBySubscriptionSample.js][azurebaremetalinstanceslistbysubscriptionsample]   | Gets a list of AzureBareMetal instances in the specified subscription. The operations returns various properties of each Azure BareMetal instance. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/stable/2021-08-09/examples/AzureBareMetalInstances_ListBySubscription.json                     |
| [azureBareMetalInstancesUpdateSample.js][azurebaremetalinstancesupdatesample]                           | Patches the Tags field of a Azure BareMetal instance for the specified subscription, resource group, and instance name. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/stable/2021-08-09/examples/AzureBareMetalInstances_PatchTags_Delete.json                                                  |
| [operationsListSample.js][operationslistsample]                                                         | Gets a list of AzureBareMetal management operations. x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/stable/2021-08-09/examples/AzureBareMetalOperations_List.json                                                                                                                                |

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
node azureBareMetalInstancesGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env BAREMETALINFRASTRUCTURE_SUBSCRIPTION_ID="<baremetalinfrastructure subscription id>" BAREMETALINFRASTRUCTURE_RESOURCE_GROUP="<baremetalinfrastructure resource group>" node azureBareMetalInstancesGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azurebaremetalinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1/javascript/azureBareMetalInstancesGetSample.js
[azurebaremetalinstanceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1/javascript/azureBareMetalInstancesListByResourceGroupSample.js
[azurebaremetalinstanceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1/javascript/azureBareMetalInstancesListBySubscriptionSample.js
[azurebaremetalinstancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1/javascript/azureBareMetalInstancesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/samples/v1/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-baremetalinfrastructure?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/baremetalinfrastructure/arm-baremetalinfrastructure/README.md

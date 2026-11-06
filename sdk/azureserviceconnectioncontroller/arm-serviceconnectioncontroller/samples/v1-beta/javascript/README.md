# @azure/arm-serviceconnectioncontroller client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-serviceconnectioncontroller in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureServiceConnectionControllersCreateOrUpdateSample.js][azureserviceconnectioncontrollerscreateorupdatesample]           | creates or updates an Azure Service Connection Controller. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_CreateOrUpdate.json                                       |
| [azureServiceConnectionControllersDeleteSample.js][azureserviceconnectioncontrollersdeletesample]                           | deletes an Azure Service Connection Controller. Only its owning Probing Gateway may call this operation. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_Delete.json |
| [azureServiceConnectionControllersGetSample.js][azureserviceconnectioncontrollersgetsample]                                 | gets an Azure Service Connection Controller. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_Get.json                                                                |
| [azureServiceConnectionControllersListByResourceGroupSample.js][azureserviceconnectioncontrollerslistbyresourcegroupsample] | lists all Azure Service Connection Controllers within a resource group. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_ListByResourceGroup.json                     |
| [azureServiceConnectionControllersListBySubscriptionSample.js][azureserviceconnectioncontrollerslistbysubscriptionsample]   | lists all Azure Service Connection Controllers within a subscription. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_ListBySubscription.json                        |
| [azureServiceConnectionControllersUpdateSample.js][azureserviceconnectioncontrollersupdatesample]                           | updates the tags of an Azure Service Connection Controller. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_Update.json                                              |
| [operationsListSample.js][operationslistsample]                                                                             | list the operations for the provider x-ms-original-file: 2026-02-09-preview/Operations_List.json                                                                                              |

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
node azureServiceConnectionControllersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node azureServiceConnectionControllersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azureserviceconnectioncontrollerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/javascript/azureServiceConnectionControllersCreateOrUpdateSample.js
[azureserviceconnectioncontrollersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/javascript/azureServiceConnectionControllersDeleteSample.js
[azureserviceconnectioncontrollersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/javascript/azureServiceConnectionControllersGetSample.js
[azureserviceconnectioncontrollerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/javascript/azureServiceConnectionControllersListByResourceGroupSample.js
[azureserviceconnectioncontrollerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/javascript/azureServiceConnectionControllersListBySubscriptionSample.js
[azureserviceconnectioncontrollersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/javascript/azureServiceConnectionControllersUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-serviceconnectioncontroller?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/README.md

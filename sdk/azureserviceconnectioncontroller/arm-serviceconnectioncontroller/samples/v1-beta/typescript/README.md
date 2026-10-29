# @azure/arm-serviceconnectioncontroller client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-serviceconnectioncontroller in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureServiceConnectionControllersCreateOrUpdateSample.ts][azureserviceconnectioncontrollerscreateorupdatesample]           | creates or updates an Azure Service Connection Controller. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_CreateOrUpdate.json                                       |
| [azureServiceConnectionControllersDeleteSample.ts][azureserviceconnectioncontrollersdeletesample]                           | deletes an Azure Service Connection Controller. Only its owning Probing Gateway may call this operation. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_Delete.json |
| [azureServiceConnectionControllersGetSample.ts][azureserviceconnectioncontrollersgetsample]                                 | gets an Azure Service Connection Controller. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_Get.json                                                                |
| [azureServiceConnectionControllersListByResourceGroupSample.ts][azureserviceconnectioncontrollerslistbyresourcegroupsample] | lists all Azure Service Connection Controllers within a resource group. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_ListByResourceGroup.json                     |
| [azureServiceConnectionControllersListBySubscriptionSample.ts][azureserviceconnectioncontrollerslistbysubscriptionsample]   | lists all Azure Service Connection Controllers within a subscription. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_ListBySubscription.json                        |
| [azureServiceConnectionControllersUpdateSample.ts][azureserviceconnectioncontrollersupdatesample]                           | updates the tags of an Azure Service Connection Controller. x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_Update.json                                              |
| [operationsListSample.ts][operationslistsample]                                                                             | list the operations for the provider x-ms-original-file: 2026-02-09-preview/Operations_List.json                                                                                              |

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
node dist/azureServiceConnectionControllersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/azureServiceConnectionControllersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azureserviceconnectioncontrollerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/typescript/src/azureServiceConnectionControllersCreateOrUpdateSample.ts
[azureserviceconnectioncontrollersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/typescript/src/azureServiceConnectionControllersDeleteSample.ts
[azureserviceconnectioncontrollersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/typescript/src/azureServiceConnectionControllersGetSample.ts
[azureserviceconnectioncontrollerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/typescript/src/azureServiceConnectionControllersListByResourceGroupSample.ts
[azureserviceconnectioncontrollerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/typescript/src/azureServiceConnectionControllersListBySubscriptionSample.ts
[azureserviceconnectioncontrollersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/typescript/src/azureServiceConnectionControllersUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-serviceconnectioncontroller?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azureserviceconnectioncontroller/arm-serviceconnectioncontroller/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

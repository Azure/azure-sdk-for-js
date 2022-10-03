# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [appsCheckNameAvailability.ts][appschecknameavailability]                           | Check if an IoT Central application name is available. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_CheckNameAvailability.json                                                                                                                                                                                                                               |
| [appsCheckNameAvailabilitySample.ts][appschecknameavailabilitysample]               | Check if an IoT Central application name is available. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_CheckNameAvailability.json                                                                                                                                                                                                                      |
| [appsCheckSubdomainAvailabilitySample.ts][appschecksubdomainavailabilitysample]     | Check if an IoT Central application subdomain is available. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_CheckSubdomainAvailability.json                                                                                                                                                                                                            |
| [appsCreateOrUpdate.ts][appscreateorupdate]                                         | Create or update the metadata of an IoT Central application. The usual pattern to modify a property is to retrieve the IoT Central application metadata and security metadata, and then combine them with the modified values in a new body to update the IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_CreateOrUpdate.json          |
| [appsCreateOrUpdateSample.ts][appscreateorupdatesample]                             | Create or update the metadata of an IoT Central application. The usual pattern to modify a property is to retrieve the IoT Central application metadata and security metadata, and then combine them with the modified values in a new body to update the IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_CreateOrUpdate.json |
| [appsDelete.ts][appsdelete]                                                         | Delete an IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_Delete.json                                                                                                                                                                                                                                                                  |
| [appsDeleteSample.ts][appsdeletesample]                                             | Delete an IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_Delete.json                                                                                                                                                                                                                                                         |
| [appsGet.ts][appsget]                                                               | Get the metadata of an IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_Get.json                                                                                                                                                                                                                                                        |
| [appsGetSample.ts][appsgetsample]                                                   | Get the metadata of an IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_Get.json                                                                                                                                                                                                                                               |
| [appsListByResourceGroup.ts][appslistbyresourcegroup]                               | Get all the IoT Central Applications in a resource group. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_ListByResourceGroup.json                                                                                                                                                                                                                              |
| [appsListByResourceGroupSample.ts][appslistbyresourcegroupsample]                   | Get all the IoT Central Applications in a resource group. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_ListByResourceGroup.json                                                                                                                                                                                                                     |
| [appsListBySubscription.ts][appslistbysubscription]                                 | Get all IoT Central Applications in a subscription. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_ListBySubscription.json                                                                                                                                                                                                                                     |
| [appsListBySubscriptionSample.ts][appslistbysubscriptionsample]                     | Get all IoT Central Applications in a subscription. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_ListBySubscription.json                                                                                                                                                                                                                            |
| [appsListTemplates.ts][appslisttemplates]                                           | Get all available application templates. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_Templates.json                                                                                                                                                                                                                                                         |
| [appsListTemplatesSample.ts][appslisttemplatessample]                               | Get all available application templates. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_Templates.json                                                                                                                                                                                                                                                |
| [appsSubdomainAvailability.ts][appssubdomainavailability]                           | Check if an IoT Central application subdomain is available. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_CheckSubdomainAvailability.json                                                                                                                                                                                                                     |
| [appsUpdate.ts][appsupdate]                                                         | Update the metadata of an IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_Update.json                                                                                                                                                                                                                                                  |
| [appsUpdateSample.ts][appsupdatesample]                                             | Update the metadata of an IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_Update.json                                                                                                                                                                                                                                         |
| [operationsList.ts][operationslist]                                                 | Lists all of the available IoT Central Resource Provider operations. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Operations_List.json                                                                                                                                                                                                                            |
| [operationsListSample.ts][operationslistsample]                                     | Lists all of the available IoT Central Resource Provider operations. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Operations_List.json                                                                                                                                                                                                                   |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample] | Update a private endpoint connection. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/PrivateEndpointConnections_Update.json                                                                                                                                                                                                                                |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample] | Deletes a private endpoint connection from the IoT Central Application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/PrivateEndpointConnections_Delete.json                                                                                                                                                                                              |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]       | Get the metadata of a private endpoint connection for the IoT Central Application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/PrivateEndpointConnections_Get.json                                                                                                                                                                                      |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]     | Get all private endpoint connections of a IoT Central Application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/PrivateEndpointConnections_List.json                                                                                                                                                                                                     |
| [privateLinksGetSample.ts][privatelinksgetsample]                                   | Get a private link resource of a IoT Central Application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/PrivateLinks_Get.json                                                                                                                                                                                                                             |
| [privateLinksListSample.ts][privatelinkslistsample]                                 | Get all private link resources of a IoT Central Application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/PrivateLinks_List.json                                                                                                                                                                                                                         |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/appsCheckNameAvailability.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/appsCheckNameAvailability.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[appschecknameavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsCheckNameAvailability.ts
[appschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsCheckNameAvailabilitySample.ts
[appschecksubdomainavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsCheckSubdomainAvailabilitySample.ts
[appscreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsCreateOrUpdate.ts
[appscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsCreateOrUpdateSample.ts
[appsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsDelete.ts
[appsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsDeleteSample.ts
[appsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsGet.ts
[appsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsGetSample.ts
[appslistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsListByResourceGroup.ts
[appslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsListByResourceGroupSample.ts
[appslistbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsListBySubscription.ts
[appslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsListBySubscriptionSample.ts
[appslisttemplates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsListTemplates.ts
[appslisttemplatessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsListTemplatesSample.ts
[appssubdomainavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsSubdomainAvailability.ts
[appsupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsUpdate.ts
[appsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/appsUpdateSample.ts
[operationslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/operationsList.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/privateLinksGetSample.ts
[privatelinkslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v7-beta/typescript/src/privateLinksListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-iotcentral?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iotcentral/arm-iotcentral/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

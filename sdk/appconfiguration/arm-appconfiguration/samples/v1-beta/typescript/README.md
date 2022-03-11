# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [configurationStoresCreateSample.ts][configurationstorescreatesample]                                                   | Creates a configuration store with the specified parameters. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresCreate.json                                                                    |
| [configurationStoresDeleteSample.ts][configurationstoresdeletesample]                                                   | Deletes a configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresDelete.json                                                                                                  |
| [configurationStoresGetDeletedSample.ts][configurationstoresgetdeletedsample]                                           | Gets a deleted Azure app configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/DeletedConfigurationStoresGet.json                                                                               |
| [configurationStoresGetSample.ts][configurationstoresgetsample]                                                         | Gets the properties of the specified configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresGet.json                                                                          |
| [configurationStoresListByResourceGroupSample.ts][configurationstoreslistbyresourcegroupsample]                         | Lists the configuration stores for a given resource group. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresListByResourceGroup.json                                                         |
| [configurationStoresListDeletedSample.ts][configurationstoreslistdeletedsample]                                         | Gets information about the deleted configuration stores in a subscription. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/DeletedConfigurationStoresList.json                                                 |
| [configurationStoresListKeysSample.ts][configurationstoreslistkeyssample]                                               | Lists the access key for the specified configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresListKeys.json                                                                   |
| [configurationStoresListSample.ts][configurationstoreslistsample]                                                       | Lists the configuration stores for a given subscription. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresList.json                                                                          |
| [configurationStoresPurgeDeletedSample.ts][configurationstorespurgedeletedsample]                                       | Permanently deletes the specified configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/DeletedConfigurationStoresPurge.json                                                                    |
| [configurationStoresRegenerateKeySample.ts][configurationstoresregeneratekeysample]                                     | Regenerates an access key for the specified configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresRegenerateKey.json                                                         |
| [configurationStoresUpdateSample.ts][configurationstoresupdatesample]                                                   | Updates a configuration store with the specified parameters. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresUpdate.json                                                                    |
| [keyValuesCreateOrUpdateSample.ts][keyvaluescreateorupdatesample]                                                       | Creates a key-value. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresCreateKeyValue.json                                                                                                    |
| [keyValuesDeleteSample.ts][keyvaluesdeletesample]                                                                       | Deletes a key-value. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresDeleteKeyValue.json                                                                                                    |
| [keyValuesGetSample.ts][keyvaluesgetsample]                                                                             | Gets the properties of the specified key-value. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresGetKeyValue.json                                                                            |
| [keyValuesListByConfigurationStoreSample.ts][keyvalueslistbyconfigurationstoresample]                                   | Lists the key-values for a given configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresListKeyValues.json                                                                    |
| [operationsCheckNameAvailabilitySample.ts][operationschecknameavailabilitysample]                                       | Checks whether the configuration store name is available for use. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/CheckNameAvailable.json                                                                      |
| [operationsRegionalCheckNameAvailabilitySample.ts][operationsregionalchecknameavailabilitysample]                       | Checks whether the configuration store name is available for use. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/RegionalCheckNameAvailable.json                                                              |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]                     | Update the state of the specified private endpoint connection associated with the configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresCreatePrivateEndpointConnection.json |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                     | Deletes a private endpoint connection. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresDeletePrivateEndpointConnection.json                                                                 |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                           | Gets the specified private endpoint connection associated with the configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresGetPrivateEndpointConnection.json                   |
| [privateEndpointConnectionsListByConfigurationStoreSample.ts][privateendpointconnectionslistbyconfigurationstoresample] | Lists all private endpoint connections for a configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/ConfigurationStoresListPrivateEndpointConnections.json                                       |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                                       | Gets a private link resource that need to be created for a configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/PrivateLinkResourceGet.json                                                    |
| [privateLinkResourcesListByConfigurationStoreSample.ts][privatelinkresourceslistbyconfigurationstoresample]             | Gets the private link resources that need to be created for a configuration store. x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/preview/2021-10-01-preview/examples/PrivateLinkResourcesListByConfigurationStore.json                           |

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
node dist/configurationStoresCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/configurationStoresCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[configurationstorescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresCreateSample.ts
[configurationstoresdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresDeleteSample.ts
[configurationstoresgetdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresGetDeletedSample.ts
[configurationstoresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresGetSample.ts
[configurationstoreslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresListByResourceGroupSample.ts
[configurationstoreslistdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresListDeletedSample.ts
[configurationstoreslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresListKeysSample.ts
[configurationstoreslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresListSample.ts
[configurationstorespurgedeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresPurgeDeletedSample.ts
[configurationstoresregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresRegenerateKeySample.ts
[configurationstoresupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/configurationStoresUpdateSample.ts
[keyvaluescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/keyValuesCreateOrUpdateSample.ts
[keyvaluesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/keyValuesDeleteSample.ts
[keyvaluesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/keyValuesGetSample.ts
[keyvalueslistbyconfigurationstoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/keyValuesListByConfigurationStoreSample.ts
[operationschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/operationsCheckNameAvailabilitySample.ts
[operationsregionalchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/operationsRegionalCheckNameAvailabilitySample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyconfigurationstoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/privateEndpointConnectionsListByConfigurationStoreSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyconfigurationstoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v1-beta/typescript/src/privateLinkResourcesListByConfigurationStoreSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-appconfiguration?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/arm-appconfiguration/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

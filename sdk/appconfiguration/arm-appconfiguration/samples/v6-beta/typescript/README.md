# @azure/arm-appconfiguration client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-appconfiguration in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [configurationStoresCreateSample.ts][configurationstorescreatesample]                                                   | creates a configuration store with the specified parameters. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreate.json                                                                                                                                                                                                                            |
| [configurationStoresDeleteSample.ts][configurationstoresdeletesample]                                                   | deletes a configuration store. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresDelete.json                                                                                                                                                                                                                                                          |
| [configurationStoresGetDeletedSample.ts][configurationstoresgetdeletedsample]                                           | gets a deleted Azure app configuration store. x-ms-original-file: 2025-06-01-preview/DeletedConfigurationStoresGet.json                                                                                                                                                                                                                                       |
| [configurationStoresGetSample.ts][configurationstoresgetsample]                                                         | gets the properties of the specified configuration store. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresGet.json                                                                                                                                                                                                                                  |
| [configurationStoresListByResourceGroupSample.ts][configurationstoreslistbyresourcegroupsample]                         | lists the configuration stores for a given resource group. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresListByResourceGroup.json                                                                                                                                                                                                                 |
| [configurationStoresListDeletedSample.ts][configurationstoreslistdeletedsample]                                         | gets information about the deleted configuration stores in a subscription. x-ms-original-file: 2025-06-01-preview/DeletedConfigurationStoresList.json                                                                                                                                                                                                         |
| [configurationStoresListKeysSample.ts][configurationstoreslistkeyssample]                                               | lists the access key for the specified configuration store. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresListKeys.json                                                                                                                                                                                                                           |
| [configurationStoresListSample.ts][configurationstoreslistsample]                                                       | lists the configuration stores for a given subscription. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresList.json                                                                                                                                                                                                                                  |
| [configurationStoresPurgeDeletedSample.ts][configurationstorespurgedeletedsample]                                       | permanently deletes the specified configuration store. x-ms-original-file: 2025-06-01-preview/DeletedConfigurationStoresPurge.json                                                                                                                                                                                                                            |
| [configurationStoresRegenerateKeySample.ts][configurationstoresregeneratekeysample]                                     | regenerates an access key for the specified configuration store. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresRegenerateKey.json                                                                                                                                                                                                                 |
| [configurationStoresUpdateSample.ts][configurationstoresupdatesample]                                                   | updates a configuration store with the specified parameters. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresUpdate.json                                                                                                                                                                                                                            |
| [keyValuesCreateOrUpdateSample.ts][keyvaluescreateorupdatesample]                                                       | creates a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateKeyValue.json                                                                            |
| [keyValuesDeleteSample.ts][keyvaluesdeletesample]                                                                       | deletes a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresDeleteKeyValue.json                                                                            |
| [keyValuesGetSample.ts][keyvaluesgetsample]                                                                             | gets the properties of the specified key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresGetKeyValue.json                                                    |
| [operationsCheckNameAvailabilitySample.ts][operationschecknameavailabilitysample]                                       | checks whether the configuration store name is available for use. x-ms-original-file: 2025-06-01-preview/CheckNameAvailable.json                                                                                                                                                                                                                              |
| [operationsListSample.ts][operationslistsample]                                                                         | list the operations for the provider x-ms-original-file: 2025-06-01-preview/OperationsList.json                                                                                                                                                                                                                                                               |
| [operationsRegionalCheckNameAvailabilitySample.ts][operationsregionalchecknameavailabilitysample]                       | checks whether the configuration store name is available for use. x-ms-original-file: 2025-06-01-preview/RegionalCheckNameAvailable.json                                                                                                                                                                                                                      |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]                     | update the state of the specified private endpoint connection associated with the configuration store. This operation cannot be used to create a private endpoint connection. Private endpoint connections must be created with the Network resource provider. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresUpdatePrivateEndpointConnection.json |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                     | deletes a private endpoint connection. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresDeletePrivateEndpointConnection.json                                                                                                                                                                                                                         |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                           | gets the specified private endpoint connection associated with the configuration store. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresGetPrivateEndpointConnection.json                                                                                                                                                                           |
| [privateEndpointConnectionsListByConfigurationStoreSample.ts][privateendpointconnectionslistbyconfigurationstoresample] | lists all private endpoint connections for a configuration store. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresListPrivateEndpointConnections.json                                                                                                                                                                                               |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                                       | gets a private link resource that need to be created for a configuration store. x-ms-original-file: 2025-06-01-preview/PrivateLinkResourceGet.json                                                                                                                                                                                                            |
| [privateLinkResourcesListByConfigurationStoreSample.ts][privatelinkresourceslistbyconfigurationstoresample]             | gets the private link resources that need to be created for a configuration store. x-ms-original-file: 2025-06-01-preview/PrivateLinkResourcesListByConfigurationStore.json                                                                                                                                                                                   |
| [replicasCreateSample.ts][replicascreatesample]                                                                         | creates a replica with the specified parameters. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateReplica.json                                                                                                                                                                                                                                 |
| [replicasDeleteSample.ts][replicasdeletesample]                                                                         | deletes a replica. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresDeleteReplica.json                                                                                                                                                                                                                                                               |
| [replicasGetSample.ts][replicasgetsample]                                                                               | gets the properties of the specified replica. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresGetReplica.json                                                                                                                                                                                                                                       |
| [replicasListByConfigurationStoreSample.ts][replicaslistbyconfigurationstoresample]                                     | lists the replicas for a given configuration store. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresListReplicas.json                                                                                                                                                                                                                               |
| [snapshotsCreateSample.ts][snapshotscreatesample]                                                                       | creates a snapshot. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateSnapshot.json                                                                              |
| [snapshotsGetSample.ts][snapshotsgetsample]                                                                             | gets the properties of the specified snapshot. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead. x-ms-original-file: 2025-06-01-preview/ConfigurationStoresGetSnapshot.json                                                      |

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
node dist/configurationStoresCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/configurationStoresCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[configurationstorescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresCreateSample.ts
[configurationstoresdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresDeleteSample.ts
[configurationstoresgetdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresGetDeletedSample.ts
[configurationstoresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresGetSample.ts
[configurationstoreslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresListByResourceGroupSample.ts
[configurationstoreslistdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresListDeletedSample.ts
[configurationstoreslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresListKeysSample.ts
[configurationstoreslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresListSample.ts
[configurationstorespurgedeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresPurgeDeletedSample.ts
[configurationstoresregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresRegenerateKeySample.ts
[configurationstoresupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/configurationStoresUpdateSample.ts
[keyvaluescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/keyValuesCreateOrUpdateSample.ts
[keyvaluesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/keyValuesDeleteSample.ts
[keyvaluesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/keyValuesGetSample.ts
[operationschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/operationsCheckNameAvailabilitySample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/operationsListSample.ts
[operationsregionalchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/operationsRegionalCheckNameAvailabilitySample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyconfigurationstoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/privateEndpointConnectionsListByConfigurationStoreSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyconfigurationstoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/privateLinkResourcesListByConfigurationStoreSample.ts
[replicascreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/replicasCreateSample.ts
[replicasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/replicasDeleteSample.ts
[replicasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/replicasGetSample.ts
[replicaslistbyconfigurationstoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/replicasListByConfigurationStoreSample.ts
[snapshotscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/snapshotsCreateSample.ts
[snapshotsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/arm-appconfiguration/samples/v6-beta/typescript/src/snapshotsGetSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-appconfiguration?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/arm-appconfiguration/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

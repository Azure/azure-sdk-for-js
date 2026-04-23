# @azure/arm-kubernetesconfiguration-privatelinkscopes client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-kubernetesconfiguration-privatelinkscopes in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample]                 | approve or reject a private endpoint connection with a given name. x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnectionUpdate.json                                                                           |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                                 | deletes a private endpoint connection with a given name. x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnectionDelete.json                                                                                     |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                       | gets a private endpoint connection. x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnectionGet.json                                                                                                             |
| [privateEndpointConnectionsListByPrivateLinkScopeSample.js][privateendpointconnectionslistbyprivatelinkscopesample] | gets all private endpoint connections on a private link scope. x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnectionList.json                                                                                 |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                                                   | gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope. x-ms-original-file: 2024-11-01-preview/PrivateLinkScopePrivateLinkResourceGet.json                                         |
| [privateLinkResourcesListByPrivateLinkScopeSample.js][privatelinkresourceslistbyprivatelinkscopesample]             | gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope. x-ms-original-file: 2024-11-01-preview/PrivateLinkScopePrivateLinkResourceListGet.json                                     |
| [privateLinkScopesCreateOrUpdateSample.js][privatelinkscopescreateorupdatesample]                                   | creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesCreate.json |
| [privateLinkScopesDeleteSample.js][privatelinkscopesdeletesample]                                                   | deletes a Azure Arc PrivateLinkScope. x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesDelete.json                                                                                                                |
| [privateLinkScopesGetSample.js][privatelinkscopesgetsample]                                                         | returns a Azure Arc PrivateLinkScope. x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesGet.json                                                                                                                   |
| [privateLinkScopesListByResourceGroupSample.js][privatelinkscopeslistbyresourcegroupsample]                         | gets a list of Azure Arc PrivateLinkScopes within a resource group. x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesListByResourceGroup.json                                                                     |
| [privateLinkScopesListSample.js][privatelinkscopeslistsample]                                                       | gets a list of all Azure Arc PrivateLinkScopes within a subscription. x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesList.json                                                                                  |
| [privateLinkScopesUpdateTagsSample.js][privatelinkscopesupdatetagssample]                                           | updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method. x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesUpdateTagsOnly.json                                           |

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
node privateEndpointConnectionsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node privateEndpointConnectionsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyprivatelinkscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateEndpointConnectionsListByPrivateLinkScopeSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistbyprivatelinkscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateLinkResourcesListByPrivateLinkScopeSample.js
[privatelinkscopescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateLinkScopesCreateOrUpdateSample.js
[privatelinkscopesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateLinkScopesDeleteSample.js
[privatelinkscopesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateLinkScopesGetSample.js
[privatelinkscopeslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateLinkScopesListByResourceGroupSample.js
[privatelinkscopeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateLinkScopesListSample.js
[privatelinkscopesupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/javascript/privateLinkScopesUpdateTagsSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-kubernetesconfiguration-privatelinkscopes?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/README.md

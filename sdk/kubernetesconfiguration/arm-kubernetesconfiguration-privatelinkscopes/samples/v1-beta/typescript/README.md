# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]                 | Approve or reject a private endpoint connection with a given name. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateEndpointConnectionUpdate.json                                                                           |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                 | Deletes a private endpoint connection with a given name. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateEndpointConnectionDelete.json                                                                                     |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                       | Gets a private endpoint connection. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateEndpointConnectionGet.json                                                                                                             |
| [privateEndpointConnectionsListByPrivateLinkScopeSample.ts][privateendpointconnectionslistbyprivatelinkscopesample] | Gets all private endpoint connections on a private link scope. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateEndpointConnectionList.json                                                                                 |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                                   | Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopePrivateLinkResourceGet.json                                         |
| [privateLinkResourcesListByPrivateLinkScopeSample.ts][privatelinkresourceslistbyprivatelinkscopesample]             | Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopePrivateLinkResourceListGet.json                                     |
| [privateLinkScopesCreateOrUpdateSample.ts][privatelinkscopescreateorupdatesample]                                   | Creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopesCreate.json |
| [privateLinkScopesDeleteSample.ts][privatelinkscopesdeletesample]                                                   | Deletes a Azure Arc PrivateLinkScope. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopesDelete.json                                                                                                                |
| [privateLinkScopesGetSample.ts][privatelinkscopesgetsample]                                                         | Returns a Azure Arc PrivateLinkScope. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopesGet.json                                                                                                                   |
| [privateLinkScopesListByResourceGroupSample.ts][privatelinkscopeslistbyresourcegroupsample]                         | Gets a list of Azure Arc PrivateLinkScopes within a resource group. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopesListByResourceGroup.json                                                                     |
| [privateLinkScopesListSample.ts][privatelinkscopeslistsample]                                                       | Gets a list of all Azure Arc PrivateLinkScopes within a subscription. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopesList.json                                                                                  |
| [privateLinkScopesUpdateTagsSample.ts][privatelinkscopesupdatetagssample]                                           | Updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopesUpdateTagsOnly.json                                           |

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
node dist/privateEndpointConnectionsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env KUBERNETESCONFIGURATION_SUBSCRIPTION_ID="<kubernetesconfiguration subscription id>" KUBERNETESCONFIGURATION_RESOURCE_GROUP="<kubernetesconfiguration resource group>" node dist/privateEndpointConnectionsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyprivatelinkscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateEndpointConnectionsListByPrivateLinkScopeSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyprivatelinkscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateLinkResourcesListByPrivateLinkScopeSample.ts
[privatelinkscopescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateLinkScopesCreateOrUpdateSample.ts
[privatelinkscopesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateLinkScopesDeleteSample.ts
[privatelinkscopesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateLinkScopesGetSample.ts
[privatelinkscopeslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateLinkScopesListByResourceGroupSample.ts
[privatelinkscopeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateLinkScopesListSample.ts
[privatelinkscopesupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/samples/v1-beta/typescript/src/privateLinkScopesUpdateTagsSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-kubernetesconfiguration-privatelinkscopes?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-privatelinkscopes/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

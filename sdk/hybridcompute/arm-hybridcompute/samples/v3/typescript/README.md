# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [approveOrRejectAPrivateEndpointConnectionWithAGivenName.ts][approveorrejectaprivateendpointconnectionwithagivenname] | Approve or reject a private endpoint connection with a given name. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateEndpointConnectionUpdate.json                                                                           |
| [createOrUpdateAMachineExtension.ts][createorupdateamachineextension]                                                 | The operation to create or update the extension. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/UpdateExtension.json                                                                                                             |
| [deleteAMachine.ts][deleteamachine]                                                                                   | The operation to remove a hybrid machine identity in Azure. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/Machines_Delete.json                                                                                                  |
| [deleteAMachineExtension.ts][deleteamachineextension]                                                                 | The operation to delete the extension. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/DELETEExtension.json                                                                                                                       |
| [deletesAPrivateEndpointConnectionWithAGivenName.ts][deletesaprivateendpointconnectionwithagivenname]                 | Deletes a private endpoint connection with a given name. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateEndpointConnectionDelete.json                                                                                     |
| [getAllMachineExtensions.ts][getallmachineextensions]                                                                 | The operation to get all extensions of a non-Azure machine x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/LISTExtension.json                                                                                                     |
| [getMachine.ts][getmachine]                                                                                           | Retrieves information about the model view or the instance view of a hybrid machine. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/Machines_Get.json                                                                            |
| [getMachineExtension.ts][getmachineextension]                                                                         | The operation to get the extension. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/GETExtension.json                                                                                                                             |
| [getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope.ts][getslistofprivateendpointconnectionsonaprivatelinkscope] | Gets all private endpoint connections on a private link scope. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateEndpointConnectionList.json                                                                                 |
| [getsPrivateEndpointConnection.ts][getsprivateendpointconnection]                                                     | Gets a private endpoint connection. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateEndpointConnectionGet.json                                                                                                             |
| [listMachinesByResourceGroup.ts][listmachinesbyresourcegroup]                                                         | Lists all the hybrid machines in the specified subscription. Use the nextLink property in the response to get the next page of hybrid machines. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/Machines_ListBySubscription.json  |
| [privateLinkScopeCreate.ts][privatelinkscopecreate]                                                                   | Creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesCreate.json |
| [privateLinkScopeGet.ts][privatelinkscopeget]                                                                         | Returns a Azure Arc PrivateLinkScope's validation details for a given machine. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesGetValidationForMachine.json                                                      |
| [privateLinkScopeListByResourceGroup.ts][privatelinkscopelistbyresourcegroup]                                         | Gets a list of Azure Arc PrivateLinkScopes within a resource group. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesListByResourceGroup.json                                                                     |
| [privateLinkScopeUpdate.ts][privatelinkscopeupdate]                                                                   | Creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesUpdate.json |
| [privateLinkScopeUpdateTagsOnly.ts][privatelinkscopeupdatetagsonly]                                                   | Updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesUpdateTagsOnly.json                                           |
| [privateLinkScopesDelete.ts][privatelinkscopesdelete]                                                                 | Deletes a Azure Arc PrivateLinkScope. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesDelete.json                                                                                                                |
| [privateLinkScopesListJson.ts][privatelinkscopeslistjson]                                                             | Gets a list of all Azure Arc PrivateLinkScopes within a subscription. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesList.json                                                                                  |
| [upgradeMachineExtensions.ts][upgrademachineextensions]                                                               | The operation to Upgrade Machine Extensions. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/Extensions_Upgrade.json                                                                                                              |

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
node dist/approveOrRejectAPrivateEndpointConnectionWithAGivenName.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/approveOrRejectAPrivateEndpointConnectionWithAGivenName.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[approveorrejectaprivateendpointconnectionwithagivenname]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/approveOrRejectAPrivateEndpointConnectionWithAGivenName.ts
[createorupdateamachineextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/createOrUpdateAMachineExtension.ts
[deleteamachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/deleteAMachine.ts
[deleteamachineextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/deleteAMachineExtension.ts
[deletesaprivateendpointconnectionwithagivenname]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/deletesAPrivateEndpointConnectionWithAGivenName.ts
[getallmachineextensions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/getAllMachineExtensions.ts
[getmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/getMachine.ts
[getmachineextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/getMachineExtension.ts
[getslistofprivateendpointconnectionsonaprivatelinkscope]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope.ts
[getsprivateendpointconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/getsPrivateEndpointConnection.ts
[listmachinesbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/listMachinesByResourceGroup.ts
[privatelinkscopecreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/privateLinkScopeCreate.ts
[privatelinkscopeget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/privateLinkScopeGet.ts
[privatelinkscopelistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/privateLinkScopeListByResourceGroup.ts
[privatelinkscopeupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/privateLinkScopeUpdate.ts
[privatelinkscopeupdatetagsonly]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/privateLinkScopeUpdateTagsOnly.ts
[privatelinkscopesdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/privateLinkScopesDelete.ts
[privatelinkscopeslistjson]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/privateLinkScopesListJson.ts
[upgrademachineextensions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/typescript/src/upgradeMachineExtensions.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-hybridcompute?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridcompute/arm-hybridcompute/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

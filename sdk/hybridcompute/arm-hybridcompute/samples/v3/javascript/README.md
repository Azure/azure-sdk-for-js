# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [approveOrRejectAPrivateEndpointConnectionWithAGivenName.js][approveorrejectaprivateendpointconnectionwithagivenname] | Approve or reject a private endpoint connection with a given name. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateEndpointConnectionUpdate.json                                                                           |
| [createOrUpdateAMachineExtension.js][createorupdateamachineextension]                                                 | The operation to create or update the extension. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/UpdateExtension.json                                                                                                             |
| [deleteAMachine.js][deleteamachine]                                                                                   | The operation to remove a hybrid machine identity in Azure. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/Machines_Delete.json                                                                                                  |
| [deleteAMachineExtension.js][deleteamachineextension]                                                                 | The operation to delete the extension. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/DELETEExtension.json                                                                                                                       |
| [deletesAPrivateEndpointConnectionWithAGivenName.js][deletesaprivateendpointconnectionwithagivenname]                 | Deletes a private endpoint connection with a given name. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateEndpointConnectionDelete.json                                                                                     |
| [getAllMachineExtensions.js][getallmachineextensions]                                                                 | The operation to get all extensions of a non-Azure machine x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/LISTExtension.json                                                                                                     |
| [getMachine.js][getmachine]                                                                                           | Retrieves information about the model view or the instance view of a hybrid machine. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/Machines_Get.json                                                                            |
| [getMachineExtension.js][getmachineextension]                                                                         | The operation to get the extension. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/GETExtension.json                                                                                                                             |
| [getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope.js][getslistofprivateendpointconnectionsonaprivatelinkscope] | Gets all private endpoint connections on a private link scope. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateEndpointConnectionList.json                                                                                 |
| [getsPrivateEndpointConnection.js][getsprivateendpointconnection]                                                     | Gets a private endpoint connection. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateEndpointConnectionGet.json                                                                                                             |
| [listMachinesByResourceGroup.js][listmachinesbyresourcegroup]                                                         | Lists all the hybrid machines in the specified subscription. Use the nextLink property in the response to get the next page of hybrid machines. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/Machines_ListBySubscription.json  |
| [privateLinkScopeCreate.js][privatelinkscopecreate]                                                                   | Creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesCreate.json |
| [privateLinkScopeGet.js][privatelinkscopeget]                                                                         | Returns a Azure Arc PrivateLinkScope's validation details for a given machine. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesGetValidationForMachine.json                                                      |
| [privateLinkScopeListByResourceGroup.js][privatelinkscopelistbyresourcegroup]                                         | Gets a list of Azure Arc PrivateLinkScopes within a resource group. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesListByResourceGroup.json                                                                     |
| [privateLinkScopeUpdate.js][privatelinkscopeupdate]                                                                   | Creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesUpdate.json |
| [privateLinkScopeUpdateTagsOnly.js][privatelinkscopeupdatetagsonly]                                                   | Updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesUpdateTagsOnly.json                                           |
| [privateLinkScopesDelete.js][privatelinkscopesdelete]                                                                 | Deletes a Azure Arc PrivateLinkScope. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesDelete.json                                                                                                                |
| [privateLinkScopesListJson.js][privatelinkscopeslistjson]                                                             | Gets a list of all Azure Arc PrivateLinkScopes within a subscription. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/PrivateLinkScopesList.json                                                                                  |
| [upgradeMachineExtensions.js][upgrademachineextensions]                                                               | The operation to Upgrade Machine Extensions. x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/stable/2021-05-20/examples/Extensions_Upgrade.json                                                                                                              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node approveOrRejectAPrivateEndpointConnectionWithAGivenName.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node approveOrRejectAPrivateEndpointConnectionWithAGivenName.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[approveorrejectaprivateendpointconnectionwithagivenname]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/approveOrRejectAPrivateEndpointConnectionWithAGivenName.js
[createorupdateamachineextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/createOrUpdateAMachineExtension.js
[deleteamachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/deleteAMachine.js
[deleteamachineextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/deleteAMachineExtension.js
[deletesaprivateendpointconnectionwithagivenname]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/deletesAPrivateEndpointConnectionWithAGivenName.js
[getallmachineextensions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/getAllMachineExtensions.js
[getmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/getMachine.js
[getmachineextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/getMachineExtension.js
[getslistofprivateendpointconnectionsonaprivatelinkscope]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope.js
[getsprivateendpointconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/getsPrivateEndpointConnection.js
[listmachinesbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/listMachinesByResourceGroup.js
[privatelinkscopecreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/privateLinkScopeCreate.js
[privatelinkscopeget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/privateLinkScopeGet.js
[privatelinkscopelistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/privateLinkScopeListByResourceGroup.js
[privatelinkscopeupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/privateLinkScopeUpdate.js
[privatelinkscopeupdatetagsonly]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/privateLinkScopeUpdateTagsOnly.js
[privatelinkscopesdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/privateLinkScopesDelete.js
[privatelinkscopeslistjson]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/privateLinkScopesListJson.js
[upgrademachineextensions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcompute/arm-hybridcompute/samples/v3/javascript/upgradeMachineExtensions.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-hybridcompute?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridcompute/arm-hybridcompute/README.md

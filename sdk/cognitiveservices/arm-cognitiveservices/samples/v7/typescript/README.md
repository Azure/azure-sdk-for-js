# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateSample.ts][accountscreatesample]                                                     | Create Cognitive Services Account. Accounts is a resource group wide resource type. It holds the keys for developer to access intelligent APIs. It's also the resource type for billing. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/CreateAccount.json |
| [accountsDeleteSample.ts][accountsdeletesample]                                                     | Deletes a Cognitive Services account from the resource group. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/DeleteAccount.json                                                                                                                            |
| [accountsGetSample.ts][accountsgetsample]                                                           | Returns a Cognitive Services account specified by the parameters. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/GetAccount.json                                                                                                                           |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample]                           | Returns all the resources of a particular type belonging to a resource group x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListAccountsByResourceGroup.json                                                                                               |
| [accountsListKeysSample.ts][accountslistkeyssample]                                                 | Lists the account keys for the specified Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListKeys.json                                                                                                                          |
| [accountsListModelsSample.ts][accountslistmodelssample]                                             | List available Models for the requested Cognitive Services account x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListAccountModels.json                                                                                                                   |
| [accountsListSample.ts][accountslistsample]                                                         | Returns all the resources of a particular type belonging to a subscription. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListAccountsBySubscription.json                                                                                                 |
| [accountsListSkusSample.ts][accountslistskussample]                                                 | List available SKUs for the requested Cognitive Services account x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListSkus.json                                                                                                                              |
| [accountsListUsagesSample.ts][accountslistusagessample]                                             | Get usages for the requested Cognitive Services account x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/GetUsages.json                                                                                                                                      |
| [accountsRegenerateKeySample.ts][accountsregeneratekeysample]                                       | Regenerates the specified account key for the specified Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/RegenerateKey.json                                                                                                      |
| [accountsUpdateSample.ts][accountsupdatesample]                                                     | Updates a Cognitive Services account x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/UpdateAccount.json                                                                                                                                                     |
| [checkDomainAvailabilitySample.ts][checkdomainavailabilitysample]                                   | Check whether a domain is available. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/CheckDomainAvailability.json                                                                                                                                           |
| [checkSkuAvailabilitySample.ts][checkskuavailabilitysample]                                         | Check available SKUs. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/CheckSkuAvailability.json                                                                                                                                                             |
| [commitmentPlansCreateOrUpdateSample.ts][commitmentplanscreateorupdatesample]                       | Update the state of specified commitmentPlans associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/PutCommitmentPlan.json                                                                                        |
| [commitmentPlansDeleteSample.ts][commitmentplansdeletesample]                                       | Deletes the specified commitmentPlan associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/DeleteCommitmentPlan.json                                                                                              |
| [commitmentPlansGetSample.ts][commitmentplansgetsample]                                             | Gets the specified commitmentPlans associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/GetCommitmentPlan.json                                                                                                   |
| [commitmentPlansListSample.ts][commitmentplanslistsample]                                           | Gets the commitmentPlans associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListCommitmentPlans.json                                                                                                           |
| [commitmentTiersListSample.ts][commitmenttierslistsample]                                           | List Commitment Tiers. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListCommitmentTiers.json                                                                                                                                                             |
| [deletedAccountsGetSample.ts][deletedaccountsgetsample]                                             | Returns a Cognitive Services account specified by the parameters. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/GetDeletedAccount.json                                                                                                                    |
| [deletedAccountsListSample.ts][deletedaccountslistsample]                                           | Returns all the resources of a particular type belonging to a subscription. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListAccountsBySubscription.json                                                                                                 |
| [deletedAccountsPurgeSample.ts][deletedaccountspurgesample]                                         | Deletes a Cognitive Services account from the resource group. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/PurgeDeletedAccount.json                                                                                                                      |
| [deploymentsCreateOrUpdateSample.ts][deploymentscreateorupdatesample]                               | Update the state of specified deployments associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/PutDeployment.json                                                                                                |
| [deploymentsDeleteSample.ts][deploymentsdeletesample]                                               | Deletes the specified deployment associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/DeleteDeployment.json                                                                                                      |
| [deploymentsGetSample.ts][deploymentsgetsample]                                                     | Gets the specified deployments associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/GetDeployment.json                                                                                                           |
| [deploymentsListSample.ts][deploymentslistsample]                                                   | Gets the deployments associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListDeployments.json                                                                                                                   |
| [operationsListSample.ts][operationslistsample]                                                     | Lists all the available Cognitive Services account operations. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/GetOperations.json                                                                                                                           |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample] | Update the state of specified private endpoint connection associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/PutPrivateEndpointConnection.json                                                                 |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                 | Deletes the specified private endpoint connection associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/DeletePrivateEndpointConnection.json                                                                      |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                       | Gets the specified private endpoint connection associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/GetPrivateEndpointConnection.json                                                                            |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                     | Gets the private endpoint connections associated with the Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListPrivateEndpointConnections.json                                                                                   |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                                 | Gets the private link resources that need to be created for a Cognitive Services account. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/ListPrivateLinkResources.json                                                                                     |
| [resourceSkusListSample.ts][resourceskuslistsample]                                                 | Gets the list of Microsoft.CognitiveServices SKUs available for your Subscription. x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/GetSkus.json                                                                                                             |

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
node dist/accountsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/accountsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsCreateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsGetSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsListByResourceGroupSample.ts
[accountslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsListKeysSample.ts
[accountslistmodelssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsListModelsSample.ts
[accountslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsListSample.ts
[accountslistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsListSkusSample.ts
[accountslistusagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsListUsagesSample.ts
[accountsregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsRegenerateKeySample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/accountsUpdateSample.ts
[checkdomainavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/checkDomainAvailabilitySample.ts
[checkskuavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/checkSkuAvailabilitySample.ts
[commitmentplanscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/commitmentPlansCreateOrUpdateSample.ts
[commitmentplansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/commitmentPlansDeleteSample.ts
[commitmentplansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/commitmentPlansGetSample.ts
[commitmentplanslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/commitmentPlansListSample.ts
[commitmenttierslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/commitmentTiersListSample.ts
[deletedaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/deletedAccountsGetSample.ts
[deletedaccountslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/deletedAccountsListSample.ts
[deletedaccountspurgesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/deletedAccountsPurgeSample.ts
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/deploymentsCreateOrUpdateSample.ts
[deploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/deploymentsDeleteSample.ts
[deploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/deploymentsGetSample.ts
[deploymentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/deploymentsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/privateLinkResourcesListSample.ts
[resourceskuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/arm-cognitiveservices/samples/v7/typescript/src/resourceSkusListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-cognitiveservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/arm-cognitiveservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

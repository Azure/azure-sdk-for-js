# @azure/arm-datatransfer client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-datatransfer in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureDataTransferListApprovedSchemasSample.ts][azuredatatransferlistapprovedschemassample]   | retrieves the list of approved schemas available for Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource. x-ms-original-file: 2026-02-06-preview/postListApprovedSchemas.json  |
| [azureDataTransferListFlowProfilesSample.ts][azuredatatransferlistflowprofilessample]         | retrieves a list of FlowProfile resources associated with a specified pipeline. x-ms-original-file: 2026-02-06-preview/AzureDataTransfer_ListFlowProfiles_MaximumSet_Gen.json                                                                                                                       |
| [azureDataTransferListPipelineMetadataSample.ts][azuredatatransferlistpipelinemetadatasample] | retrieves the pipeline metadata associated with a specified pipeline. x-ms-original-file: 2026-02-06-preview/AzureDataTransfer_ListPipelineMetadata.json                                                                                                                                            |
| [azureDataTransferValidateSchemaSample.ts][azuredatatransfervalidateschemasample]             | validates the structure and content of a schema for use in Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource. x-ms-original-file: 2026-02-06-preview/postValidateSchema.json |
| [connectionsCreateOrUpdateSample.ts][connectionscreateorupdatesample]                         | creates or updates the connection resource. x-ms-original-file: 2026-02-06-preview/createOrUpdateConnection.json                                                                                                                                                                                    |
| [connectionsDeleteSample.ts][connectionsdeletesample]                                         | deletes the connection resource. x-ms-original-file: 2026-02-06-preview/deleteConnection.json                                                                                                                                                                                                       |
| [connectionsGetSample.ts][connectionsgetsample]                                               | gets connection resource. x-ms-original-file: 2026-02-06-preview/getConnection.json                                                                                                                                                                                                                 |
| [connectionsLinkSample.ts][connectionslinksample]                                             | links the connection to its pending connection. x-ms-original-file: 2026-02-06-preview/linkConnection.json                                                                                                                                                                                          |
| [connectionsListByResourceGroupSample.ts][connectionslistbyresourcegroupsample]               | gets connections in a resource group. x-ms-original-file: 2026-02-06-preview/listConnectionsByResourceGroup.json                                                                                                                                                                                    |
| [connectionsListBySubscriptionSample.ts][connectionslistbysubscriptionsample]                 | gets connections in a subscription. x-ms-original-file: 2026-02-06-preview/listConnectionsBySubscription.json                                                                                                                                                                                       |
| [connectionsListPendingFlowsListSample.ts][connectionslistpendingflowslistsample]             | lists all remote flows that have not yet been linked to local flows x-ms-original-file: 2026-02-06-preview/listPendingFlows.json                                                                                                                                                                    |
| [connectionsListSample.ts][connectionslistsample]                                             | lists all pending remote connections that are linkable to this connection. x-ms-original-file: 2026-02-06-preview/listPendingConnections.json                                                                                                                                                       |
| [connectionsUpdateSample.ts][connectionsupdatesample]                                         | updates the connection resource. x-ms-original-file: 2026-02-06-preview/patchConnection.json                                                                                                                                                                                                        |
| [flowProfilesCreateOrUpdateSample.ts][flowprofilescreateorupdatesample]                       | creates a new FlowProfile or updates an existing one. x-ms-original-file: 2026-02-06-preview/createOrUpdateFlowProfile.json                                                                                                                                                                         |
| [flowProfilesDeleteSample.ts][flowprofilesdeletesample]                                       | deletes the specified FlowProfile resource. x-ms-original-file: 2026-02-06-preview/deleteFlowProfile.json                                                                                                                                                                                           |
| [flowProfilesGetSample.ts][flowprofilesgetsample]                                             | retrieves the specified FlowProfile resource. x-ms-original-file: 2026-02-06-preview/getFlowProfile.json                                                                                                                                                                                            |
| [flowProfilesListByPipelineSample.ts][flowprofileslistbypipelinesample]                       | lists all FlowProfiles under a given Pipeline. x-ms-original-file: 2026-02-06-preview/listFlowProfilesByPipeline.json                                                                                                                                                                               |
| [flowProfilesUpdateSample.ts][flowprofilesupdatesample]                                       | applies partial updates to an existing FlowProfile resource. x-ms-original-file: 2026-02-06-preview/patchFlowProfile.json                                                                                                                                                                           |
| [flowsCreateOrUpdateSample.ts][flowscreateorupdatesample]                                     | creates or updates the flow resource. x-ms-original-file: 2026-02-06-preview/createOrUpdateFlow.json                                                                                                                                                                                                |
| [flowsDeleteSample.ts][flowsdeletesample]                                                     | deletes the flow resource. x-ms-original-file: 2026-02-06-preview/deleteFlow.json                                                                                                                                                                                                                   |
| [flowsDisableSample.ts][flowsdisablesample]                                                   | disables the specified flow x-ms-original-file: 2026-02-06-preview/disableFlow.json                                                                                                                                                                                                                 |
| [flowsEnableSample.ts][flowsenablesample]                                                     | enables the specified flow. x-ms-original-file: 2026-02-06-preview/enableFlow.json                                                                                                                                                                                                                  |
| [flowsGeneratePassphraseSample.ts][flowsgeneratepassphrasesample]                             | generate a compliant passphrase for the specified flow. x-ms-original-file: 2026-02-06-preview/generateFlowPassphrase.json                                                                                                                                                                          |
| [flowsGetDestinationEndpointPortsSample.ts][flowsgetdestinationendpointportssample]           | get the destination endpoint ports for the specified flow. x-ms-original-file: 2026-02-06-preview/getFlowDestinationEndpointPorts.json                                                                                                                                                              |
| [flowsGetDestinationEndpointsSample.ts][flowsgetdestinationendpointssample]                   | get the destination endpoints for the specified flow. x-ms-original-file: 2026-02-06-preview/getFlowDestinationEndpoints.json                                                                                                                                                                       |
| [flowsGetSample.ts][flowsgetsample]                                                           | gets flow resource. x-ms-original-file: 2026-02-06-preview/getFlow.json                                                                                                                                                                                                                             |
| [flowsGetSourceAddressesSample.ts][flowsgetsourceaddressessample]                             | get the source addresses for the specified flow. x-ms-original-file: 2026-02-06-preview/getFlowSourceAddresses.json                                                                                                                                                                                 |
| [flowsGetStreamConnectionStringSample.ts][flowsgetstreamconnectionstringsample]               | get the connection string for the specified flow. x-ms-original-file: 2026-02-06-preview/getStreamConnectionString.json                                                                                                                                                                             |
| [flowsLinkSample.ts][flowslinksample]                                                         | links the specified flow. x-ms-original-file: 2026-02-06-preview/linkFlow.json                                                                                                                                                                                                                      |
| [flowsListByConnectionSample.ts][flowslistbyconnectionsample]                                 | gets flows in a connection. x-ms-original-file: 2026-02-06-preview/listFlowsByConnection.json                                                                                                                                                                                                       |
| [flowsSetDestinationEndpointPortsSample.ts][flowssetdestinationendpointportssample]           | set the destination endpoint ports for the specified flow. x-ms-original-file: 2026-02-06-preview/setFlowDestinationEndpointPorts.json                                                                                                                                                              |
| [flowsSetDestinationEndpointsSample.ts][flowssetdestinationendpointssample]                   | set the destination endpoints for the specified flow. x-ms-original-file: 2026-02-06-preview/setFlowDestinationEndpoints.json                                                                                                                                                                       |
| [flowsSetPassphraseSample.ts][flowssetpassphrasesample]                                       | sets the passphrase of the specified flow. x-ms-original-file: 2026-02-06-preview/setFlowPassphrase.json                                                                                                                                                                                            |
| [flowsSetSourceAddressesSample.ts][flowssetsourceaddressessample]                             | set the source addresses for the specified flow. x-ms-original-file: 2026-02-06-preview/setFlowSourceAddresses.json                                                                                                                                                                                 |
| [flowsUpdateSample.ts][flowsupdatesample]                                                     | updates the flow resource. x-ms-original-file: 2026-02-06-preview/patchFlow.json                                                                                                                                                                                                                    |
| [operationsListSample.ts][operationslistsample]                                               | list the operations for the provider x-ms-original-file: 2026-02-06-preview/listOperations.json                                                                                                                                                                                                     |
| [pipelinesApproveConnectionSample.ts][pipelinesapproveconnectionsample]                       | approves a pending connection request associated with the specified Pipeline. x-ms-original-file: 2026-02-06-preview/approveConnection.json                                                                                                                                                         |
| [pipelinesCreateOrUpdateSample.ts][pipelinescreateorupdatesample]                             | creates a new Pipeline resource or updates an existing one. This operation is asynchronous and returns the resulting Pipeline. x-ms-original-file: 2026-02-06-preview/createOrUpdatePipeline.json                                                                                                   |
| [pipelinesDeleteSample.ts][pipelinesdeletesample]                                             | deletes the specified Pipeline resource. x-ms-original-file: 2026-02-06-preview/deletePipeline.json                                                                                                                                                                                                 |
| [pipelinesExecuteActionSample.ts][pipelinesexecuteactionsample]                               | executes a privileged or administrative action on the specified Pipeline. x-ms-original-file: 2026-02-06-preview/executeAction.json                                                                                                                                                                 |
| [pipelinesGetSample.ts][pipelinesgetsample]                                                   | retrieves the specified Pipeline resource. x-ms-original-file: 2026-02-06-preview/getPipeline.json                                                                                                                                                                                                  |
| [pipelinesListByResourceGroupSample.ts][pipelineslistbyresourcegroupsample]                   | lists all Pipeline resources within the specified resource group. x-ms-original-file: 2026-02-06-preview/listPipelinesByResourceGroup.json                                                                                                                                                          |
| [pipelinesListBySubscriptionSample.ts][pipelineslistbysubscriptionsample]                     | lists all Pipeline resources within the current subscription. x-ms-original-file: 2026-02-06-preview/listPipelinesBySubscription.json                                                                                                                                                               |
| [pipelinesListSample.ts][pipelineslistsample]                                                 | lists all Flows associated with the specified Pipeline. x-ms-original-file: 2026-02-06-preview/listFlowsByPipeline.json                                                                                                                                                                             |
| [pipelinesListSchemasListSample.ts][pipelineslistschemaslistsample]                           | lists the schemas associated with a specific connection in the Pipeline. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource. x-ms-original-file: 2026-02-06-preview/listSchemas.json               |
| [pipelinesRejectConnectionSample.ts][pipelinesrejectconnectionsample]                         | rejects a pending connection request associated with the specified Pipeline. x-ms-original-file: 2026-02-06-preview/rejectConnection.json                                                                                                                                                           |
| [pipelinesUpdateSample.ts][pipelinesupdatesample]                                             | applies partial updates to an existing Pipeline resource. This operation supports patch semantics and returns the updated Pipeline. x-ms-original-file: 2026-02-06-preview/patchPipeline.json                                                                                                       |

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
node dist/azureDataTransferListApprovedSchemasSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/azureDataTransferListApprovedSchemasSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azuredatatransferlistapprovedschemassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/azureDataTransferListApprovedSchemasSample.ts
[azuredatatransferlistflowprofilessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/azureDataTransferListFlowProfilesSample.ts
[azuredatatransferlistpipelinemetadatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/azureDataTransferListPipelineMetadataSample.ts
[azuredatatransfervalidateschemasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/azureDataTransferValidateSchemaSample.ts
[connectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/connectionsCreateOrUpdateSample.ts
[connectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/connectionsDeleteSample.ts
[connectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/connectionsGetSample.ts
[connectionslinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/connectionsLinkSample.ts
[connectionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/connectionsListByResourceGroupSample.ts
[connectionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/connectionsListBySubscriptionSample.ts
[connectionslistpendingflowslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/connectionsListPendingFlowsListSample.ts
[connectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/connectionsListSample.ts
[connectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/connectionsUpdateSample.ts
[flowprofilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowProfilesCreateOrUpdateSample.ts
[flowprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowProfilesDeleteSample.ts
[flowprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowProfilesGetSample.ts
[flowprofileslistbypipelinesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowProfilesListByPipelineSample.ts
[flowprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowProfilesUpdateSample.ts
[flowscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsCreateOrUpdateSample.ts
[flowsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsDeleteSample.ts
[flowsdisablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsDisableSample.ts
[flowsenablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsEnableSample.ts
[flowsgeneratepassphrasesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsGeneratePassphraseSample.ts
[flowsgetdestinationendpointportssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsGetDestinationEndpointPortsSample.ts
[flowsgetdestinationendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsGetDestinationEndpointsSample.ts
[flowsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsGetSample.ts
[flowsgetsourceaddressessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsGetSourceAddressesSample.ts
[flowsgetstreamconnectionstringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsGetStreamConnectionStringSample.ts
[flowslinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsLinkSample.ts
[flowslistbyconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsListByConnectionSample.ts
[flowssetdestinationendpointportssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsSetDestinationEndpointPortsSample.ts
[flowssetdestinationendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsSetDestinationEndpointsSample.ts
[flowssetpassphrasesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsSetPassphraseSample.ts
[flowssetsourceaddressessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsSetSourceAddressesSample.ts
[flowsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/flowsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/operationsListSample.ts
[pipelinesapproveconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesApproveConnectionSample.ts
[pipelinescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesCreateOrUpdateSample.ts
[pipelinesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesDeleteSample.ts
[pipelinesexecuteactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesExecuteActionSample.ts
[pipelinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesGetSample.ts
[pipelineslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesListByResourceGroupSample.ts
[pipelineslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesListBySubscriptionSample.ts
[pipelineslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesListSample.ts
[pipelineslistschemaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesListSchemasListSample.ts
[pipelinesrejectconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesRejectConnectionSample.ts
[pipelinesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azuredatatransfer/arm-datatransfer/samples/v1-beta/typescript/src/pipelinesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-datatransfer?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azuredatatransfer/arm-datatransfer/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

# @azure/arm-networksecurity client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-networksecurity in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [neuroShieldFindingsGetSample.ts][neuroshieldfindingsgetsample]                                                           | gets a finding under a protected resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_Get.json                                                                                  |
| [neuroShieldFindingsListByNeuroShieldSample.ts][neuroshieldfindingslistbyneuroshieldsample]                               | lists findings across all protected resources under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_ListByNeuroShield.json                                   |
| [neuroShieldFindingsListSample.ts][neuroshieldfindingslistsample]                                                         | lists findings under a protected resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_List.json                                                                                 |
| [neuroShieldFindingsMitigateSample.ts][neuroshieldfindingsmitigatesample]                                                 | triggers mitigation for all awaiting-approval mitigations under a finding. x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_Mitigate.json                                             |
| [neuroShieldFindingsRollbackSample.ts][neuroshieldfindingsrollbacksample]                                                 | rolls back succeeded rollbackable mitigations under a finding. x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_Rollback.json                                                         |
| [neuroShieldMitigationsExecuteSample.ts][neuroshieldmitigationsexecutesample]                                             | approves and queues a mitigation for execution. x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Execute.json                                                                      |
| [neuroShieldMitigationsGetSample.ts][neuroshieldmitigationsgetsample]                                                     | gets a mitigation under a protected resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Get.json                                                                            |
| [neuroShieldMitigationsListByNeuroShieldSample.ts][neuroshieldmitigationslistbyneuroshieldsample]                         | lists mitigations across all protected resources under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_ListByNeuroShield.json                             |
| [neuroShieldMitigationsListSample.ts][neuroshieldmitigationslistsample]                                                   | lists mitigations under a protected resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_List.json                                                                           |
| [neuroShieldMitigationsRollbackSample.ts][neuroshieldmitigationsrollbacksample]                                           | rolls back a mitigation when rollback is available. x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Rollback.json                                                                 |
| [neuroShieldOperationStatusesGetSample.ts][neuroshieldoperationstatusesgetsample]                                         | gets the status of an asynchronous NeuroShield operation. x-ms-original-file: 2026-10-01-preview/NeuroShieldOperationStatuses_Get.json                                                          |
| [neuroShieldProtectedResourcesCreateOrUpdateSample.ts][neuroshieldprotectedresourcescreateorupdatesample]                 | creates or updates a protected resource under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_CreateOrUpdate.json                                  |
| [neuroShieldProtectedResourcesDeleteSample.ts][neuroshieldprotectedresourcesdeletesample]                                 | deletes a protected resource under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_Delete.json                                                     |
| [neuroShieldProtectedResourcesGetSample.ts][neuroshieldprotectedresourcesgetsample]                                       | gets a protected resource under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_Get.json                                                           |
| [neuroShieldProtectedResourcesListSample.ts][neuroshieldprotectedresourceslistsample]                                     | lists all protected resources under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_List.json                                                      |
| [neuroShieldProtectedResourcesTriggerInventoryUploadSample.ts][neuroshieldprotectedresourcestriggerinventoryuploadsample] | requests a fresh inventory upload from the Neuron agents associated with a protected resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_TriggerInventoryUpload.json |
| [neuroShieldSummariesGetSample.ts][neuroshieldsummariesgetsample]                                                         | gets the aggregate fleet overview singleton for a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldSummaries_Get.json                                                    |
| [neuroShieldSummariesListSample.ts][neuroshieldsummarieslistsample]                                                       | lists the aggregate fleet overview singleton for a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldSummaries_List.json                                                  |
| [neuroShieldsCreateOrUpdateSample.ts][neuroshieldscreateorupdatesample]                                                   | creates or updates a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShields_CreateOrUpdate.json                                                                              |
| [neuroShieldsDeleteSample.ts][neuroshieldsdeletesample]                                                                   | deletes a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShields_Delete.json                                                                                                 |
| [neuroShieldsGetSample.ts][neuroshieldsgetsample]                                                                         | gets a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShields_Get.json                                                                                                       |
| [neuroShieldsListByResourceGroupSample.ts][neuroshieldslistbyresourcegroupsample]                                         | gets all NeuroShield resources in a resource group. x-ms-original-file: 2026-10-01-preview/NeuroShields_ListByResourceGroup.json                                                                |
| [neuroShieldsListBySubscriptionSample.ts][neuroshieldslistbysubscriptionsample]                                           | gets all NeuroShield resources in a subscription. x-ms-original-file: 2026-10-01-preview/NeuroShields_ListBySubscription.json                                                                   |
| [neuroShieldsUpdateSample.ts][neuroshieldsupdatesample]                                                                   | updates the tags or properties of a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShields_Update.json                                                                       |
| [operationsListSample.ts][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2026-10-01-preview/Operations_List.json                                                                                                |

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
node dist/neuroShieldFindingsGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/neuroShieldFindingsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[neuroshieldfindingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldFindingsGetSample.ts
[neuroshieldfindingslistbyneuroshieldsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldFindingsListByNeuroShieldSample.ts
[neuroshieldfindingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldFindingsListSample.ts
[neuroshieldfindingsmitigatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldFindingsMitigateSample.ts
[neuroshieldfindingsrollbacksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldFindingsRollbackSample.ts
[neuroshieldmitigationsexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldMitigationsExecuteSample.ts
[neuroshieldmitigationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldMitigationsGetSample.ts
[neuroshieldmitigationslistbyneuroshieldsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldMitigationsListByNeuroShieldSample.ts
[neuroshieldmitigationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldMitigationsListSample.ts
[neuroshieldmitigationsrollbacksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldMitigationsRollbackSample.ts
[neuroshieldoperationstatusesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldOperationStatusesGetSample.ts
[neuroshieldprotectedresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldProtectedResourcesCreateOrUpdateSample.ts
[neuroshieldprotectedresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldProtectedResourcesDeleteSample.ts
[neuroshieldprotectedresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldProtectedResourcesGetSample.ts
[neuroshieldprotectedresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldProtectedResourcesListSample.ts
[neuroshieldprotectedresourcestriggerinventoryuploadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldProtectedResourcesTriggerInventoryUploadSample.ts
[neuroshieldsummariesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldSummariesGetSample.ts
[neuroshieldsummarieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldSummariesListSample.ts
[neuroshieldscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldsCreateOrUpdateSample.ts
[neuroshieldsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldsDeleteSample.ts
[neuroshieldsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldsGetSample.ts
[neuroshieldslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldsListByResourceGroupSample.ts
[neuroshieldslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldsListBySubscriptionSample.ts
[neuroshieldsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/neuroShieldsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-networksecurity?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/networksecurity/arm-networksecurity/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

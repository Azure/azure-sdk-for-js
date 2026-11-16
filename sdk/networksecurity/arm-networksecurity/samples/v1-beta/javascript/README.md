# @azure/arm-networksecurity client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-networksecurity in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [neuroShieldFindingsGetSample.js][neuroshieldfindingsgetsample]                                                           | gets a finding under a protected resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_Get.json                                                                                  |
| [neuroShieldFindingsListByNeuroShieldSample.js][neuroshieldfindingslistbyneuroshieldsample]                               | lists findings across all protected resources under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_ListByNeuroShield.json                                   |
| [neuroShieldFindingsListSample.js][neuroshieldfindingslistsample]                                                         | lists findings under a protected resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_List.json                                                                                 |
| [neuroShieldFindingsMitigateSample.js][neuroshieldfindingsmitigatesample]                                                 | triggers mitigation for all awaiting-approval mitigations under a finding. x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_Mitigate.json                                             |
| [neuroShieldFindingsRollbackSample.js][neuroshieldfindingsrollbacksample]                                                 | rolls back succeeded rollbackable mitigations under a finding. x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_Rollback.json                                                         |
| [neuroShieldMitigationsExecuteSample.js][neuroshieldmitigationsexecutesample]                                             | approves and queues a mitigation for execution. x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Execute.json                                                                      |
| [neuroShieldMitigationsGetSample.js][neuroshieldmitigationsgetsample]                                                     | gets a mitigation under a protected resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Get.json                                                                            |
| [neuroShieldMitigationsListByNeuroShieldSample.js][neuroshieldmitigationslistbyneuroshieldsample]                         | lists mitigations across all protected resources under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_ListByNeuroShield.json                             |
| [neuroShieldMitigationsListSample.js][neuroshieldmitigationslistsample]                                                   | lists mitigations under a protected resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_List.json                                                                           |
| [neuroShieldMitigationsRollbackSample.js][neuroshieldmitigationsrollbacksample]                                           | rolls back a mitigation when rollback is available. x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Rollback.json                                                                 |
| [neuroShieldOperationStatusesGetSample.js][neuroshieldoperationstatusesgetsample]                                         | gets the status of an asynchronous NeuroShield operation. x-ms-original-file: 2026-10-01-preview/NeuroShieldOperationStatuses_Get.json                                                          |
| [neuroShieldProtectedResourcesCreateOrUpdateSample.js][neuroshieldprotectedresourcescreateorupdatesample]                 | creates or updates a protected resource under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_CreateOrUpdate.json                                  |
| [neuroShieldProtectedResourcesDeleteSample.js][neuroshieldprotectedresourcesdeletesample]                                 | deletes a protected resource under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_Delete.json                                                     |
| [neuroShieldProtectedResourcesGetSample.js][neuroshieldprotectedresourcesgetsample]                                       | gets a protected resource under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_Get.json                                                           |
| [neuroShieldProtectedResourcesListSample.js][neuroshieldprotectedresourceslistsample]                                     | lists all protected resources under a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_List.json                                                      |
| [neuroShieldProtectedResourcesTriggerInventoryUploadSample.js][neuroshieldprotectedresourcestriggerinventoryuploadsample] | requests a fresh inventory upload from the Neuron agents associated with a protected resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_TriggerInventoryUpload.json |
| [neuroShieldSummariesGetSample.js][neuroshieldsummariesgetsample]                                                         | gets the aggregate fleet overview singleton for a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldSummaries_Get.json                                                    |
| [neuroShieldSummariesListSample.js][neuroshieldsummarieslistsample]                                                       | lists the aggregate fleet overview singleton for a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShieldSummaries_List.json                                                  |
| [neuroShieldsCreateOrUpdateSample.js][neuroshieldscreateorupdatesample]                                                   | creates or updates a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShields_CreateOrUpdate.json                                                                              |
| [neuroShieldsDeleteSample.js][neuroshieldsdeletesample]                                                                   | deletes a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShields_Delete.json                                                                                                 |
| [neuroShieldsGetSample.js][neuroshieldsgetsample]                                                                         | gets a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShields_Get.json                                                                                                       |
| [neuroShieldsListByResourceGroupSample.js][neuroshieldslistbyresourcegroupsample]                                         | gets all NeuroShield resources in a resource group. x-ms-original-file: 2026-10-01-preview/NeuroShields_ListByResourceGroup.json                                                                |
| [neuroShieldsListBySubscriptionSample.js][neuroshieldslistbysubscriptionsample]                                           | gets all NeuroShield resources in a subscription. x-ms-original-file: 2026-10-01-preview/NeuroShields_ListBySubscription.json                                                                   |
| [neuroShieldsUpdateSample.js][neuroshieldsupdatesample]                                                                   | updates the tags or properties of a NeuroShield resource. x-ms-original-file: 2026-10-01-preview/NeuroShields_Update.json                                                                       |
| [operationsListSample.js][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2026-10-01-preview/Operations_List.json                                                                                                |

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
node neuroShieldFindingsGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node neuroShieldFindingsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[neuroshieldfindingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldFindingsGetSample.js
[neuroshieldfindingslistbyneuroshieldsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldFindingsListByNeuroShieldSample.js
[neuroshieldfindingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldFindingsListSample.js
[neuroshieldfindingsmitigatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldFindingsMitigateSample.js
[neuroshieldfindingsrollbacksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldFindingsRollbackSample.js
[neuroshieldmitigationsexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldMitigationsExecuteSample.js
[neuroshieldmitigationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldMitigationsGetSample.js
[neuroshieldmitigationslistbyneuroshieldsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldMitigationsListByNeuroShieldSample.js
[neuroshieldmitigationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldMitigationsListSample.js
[neuroshieldmitigationsrollbacksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldMitigationsRollbackSample.js
[neuroshieldoperationstatusesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldOperationStatusesGetSample.js
[neuroshieldprotectedresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldProtectedResourcesCreateOrUpdateSample.js
[neuroshieldprotectedresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldProtectedResourcesDeleteSample.js
[neuroshieldprotectedresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldProtectedResourcesGetSample.js
[neuroshieldprotectedresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldProtectedResourcesListSample.js
[neuroshieldprotectedresourcestriggerinventoryuploadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldProtectedResourcesTriggerInventoryUploadSample.js
[neuroshieldsummariesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldSummariesGetSample.js
[neuroshieldsummarieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldSummariesListSample.js
[neuroshieldscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldsCreateOrUpdateSample.js
[neuroshieldsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldsDeleteSample.js
[neuroshieldsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldsGetSample.js
[neuroshieldslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldsListByResourceGroupSample.js
[neuroshieldslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldsListBySubscriptionSample.js
[neuroshieldsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/neuroShieldsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networksecurity/arm-networksecurity/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-networksecurity?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/networksecurity/arm-networksecurity/README.md

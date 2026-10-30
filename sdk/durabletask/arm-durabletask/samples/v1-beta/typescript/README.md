# @azure/arm-durabletask client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-durabletask in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [detectorsGetSample.ts][detectorsgetsample]                                                                           | gets a diagnostic detector. x-ms-original-file: 2026-07-01-preview/Detectors_Get.json                                                                                      |
| [detectorsListBySchedulerSample.ts][detectorslistbyschedulersample]                                                   | lists the diagnostic detectors belonging to a scheduler. x-ms-original-file: 2026-07-01-preview/Detectors_ListByScheduler.json                                             |
| [failoverInstancesCreateOrReplaceSample.ts][failoverinstancescreateorreplacesample]                                   | create or Update a Failover Instance x-ms-original-file: 2026-07-01-preview/FailoverInstances_CreateOrReplace_MaximumSet_Gen.json                                          |
| [failoverInstancesDeleteSample.ts][failoverinstancesdeletesample]                                                     | delete a Failover Instance x-ms-original-file: 2026-07-01-preview/FailoverInstances_Delete_MaximumSet_Gen.json                                                             |
| [failoverInstancesFailoverSample.ts][failoverinstancesfailoversample]                                                 | trigger a graceful failover for the parent scheduler x-ms-original-file: 2026-07-01-preview/FailoverInstances_Failover.json                                                |
| [failoverInstancesForceFailoverAllowDataLossSample.ts][failoverinstancesforcefailoverallowdatalosssample]             | trigger a forced failover with potential data loss for the parent scheduler x-ms-original-file: 2026-07-01-preview/FailoverInstances_ForceFailoverAllowDataLoss.json       |
| [failoverInstancesGetSample.ts][failoverinstancesgetsample]                                                           | get a Failover Instance x-ms-original-file: 2026-07-01-preview/FailoverInstances_Get_MaximumSet_Gen.json                                                                   |
| [failoverInstancesListBySchedulerSample.ts][failoverinstanceslistbyschedulersample]                                   | list Failover Instances x-ms-original-file: 2026-07-01-preview/FailoverInstances_ListByScheduler_MaximumSet_Gen.json                                                       |
| [operationsListSample.ts][operationslistsample]                                                                       | list the operations for the provider x-ms-original-file: 2026-07-01-preview/Operations_List.json                                                                           |
| [retentionPoliciesCreateOrReplaceSample.ts][retentionpoliciescreateorreplacesample]                                   | create or Update a Retention Policy x-ms-original-file: 2026-07-01-preview/RetentionPolicies_CreateOrReplace_MaximumSet_Gen.json                                           |
| [retentionPoliciesDeleteSample.ts][retentionpoliciesdeletesample]                                                     | delete a Retention Policy x-ms-original-file: 2026-07-01-preview/RetentionPolicies_Delete_MaximumSet_Gen.json                                                              |
| [retentionPoliciesGetSample.ts][retentionpoliciesgetsample]                                                           | get a Retention Policy x-ms-original-file: 2026-07-01-preview/RetentionPolicies_Get_MaximumSet_Gen.json                                                                    |
| [retentionPoliciesListBySchedulerSample.ts][retentionpolicieslistbyschedulersample]                                   | list Retention Policies x-ms-original-file: 2026-07-01-preview/RetentionPolicies_ListByScheduler_MaximumSet_Gen.json                                                       |
| [retentionPoliciesUpdateSample.ts][retentionpoliciesupdatesample]                                                     | update a Retention Policy x-ms-original-file: 2026-07-01-preview/RetentionPolicies_Update_MaximumSet_Gen.json                                                              |
| [schedulersCreateOrUpdatePrivateEndpointConnectionSample.ts][schedulerscreateorupdateprivateendpointconnectionsample] | create or update a private endpoint connection for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections_Create_MaximumSet_Gen.json |
| [schedulersCreateOrUpdateSample.ts][schedulerscreateorupdatesample]                                                   | create or update a Scheduler x-ms-original-file: 2026-07-01-preview/Schedulers_CreateOrUpdate.json                                                                         |
| [schedulersDeletePrivateEndpointConnectionSample.ts][schedulersdeleteprivateendpointconnectionsample]                 | delete a private endpoint connection for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections_Delete_MaximumSet_Gen.json           |
| [schedulersDeleteSample.ts][schedulersdeletesample]                                                                   | delete a Scheduler x-ms-original-file: 2026-07-01-preview/Schedulers_Delete.json                                                                                           |
| [schedulersGetPrivateEndpointConnectionSample.ts][schedulersgetprivateendpointconnectionsample]                       | get a private endpoint connection for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections_Get_MaximumSet_Gen.json                 |
| [schedulersGetPrivateLinkSample.ts][schedulersgetprivatelinksample]                                                   | get a private link resource for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateLinkResources_Get_MaximumSet_Gen.json                             |
| [schedulersGetSample.ts][schedulersgetsample]                                                                         | get a Scheduler x-ms-original-file: 2026-07-01-preview/Schedulers_Get.json                                                                                                 |
| [schedulersListByResourceGroupSample.ts][schedulerslistbyresourcegroupsample]                                         | list Schedulers by resource group x-ms-original-file: 2026-07-01-preview/Schedulers_ListByResourceGroup.json                                                               |
| [schedulersListBySubscriptionSample.ts][schedulerslistbysubscriptionsample]                                           | list Schedulers by subscription x-ms-original-file: 2026-07-01-preview/Schedulers_ListBySubscription.json                                                                  |
| [schedulersListPrivateEndpointConnectionsSample.ts][schedulerslistprivateendpointconnectionssample]                   | list private endpoint connections for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections_List_MaximumSet_Gen.json                |
| [schedulersListPrivateLinksSample.ts][schedulerslistprivatelinkssample]                                               | list private link resources for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateLinkResources_List_MaximumSet_Gen.json                            |
| [schedulersRestartSample.ts][schedulersrestartsample]                                                                 | restart a Scheduler x-ms-original-file: 2026-07-01-preview/Schedulers_Restart.json                                                                                         |
| [schedulersUpdatePrivateEndpointConnectionSample.ts][schedulersupdateprivateendpointconnectionsample]                 | update a private endpoint connection for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections_Update.json                          |
| [schedulersUpdateSample.ts][schedulersupdatesample]                                                                   | update a Scheduler x-ms-original-file: 2026-07-01-preview/Schedulers_Update.json                                                                                           |
| [taskHubsCreateOrUpdateSample.ts][taskhubscreateorupdatesample]                                                       | create or Update a Task Hub x-ms-original-file: 2026-07-01-preview/TaskHubs_CreateOrUpdate.json                                                                            |
| [taskHubsDeleteSample.ts][taskhubsdeletesample]                                                                       | delete a Task Hub x-ms-original-file: 2026-07-01-preview/TaskHubs_Delete.json                                                                                              |
| [taskHubsGetSample.ts][taskhubsgetsample]                                                                             | get a Task Hub x-ms-original-file: 2026-07-01-preview/TaskHubs_Get.json                                                                                                    |
| [taskHubsListBySchedulerSample.ts][taskhubslistbyschedulersample]                                                     | list Task Hubs x-ms-original-file: 2026-07-01-preview/TaskHubs_ListByScheduler.json                                                                                        |
| [taskQueuesCreateOrUpdateSample.ts][taskqueuescreateorupdatesample]                                                   | create or update a Task Queue x-ms-original-file: 2026-07-01-preview/TaskQueues_CreateOrUpdate.json                                                                        |
| [taskQueuesDeleteSample.ts][taskqueuesdeletesample]                                                                   | delete a Task Queue x-ms-original-file: 2026-07-01-preview/TaskQueues_Delete.json                                                                                          |
| [taskQueuesGetSample.ts][taskqueuesgetsample]                                                                         | get a Task Queue x-ms-original-file: 2026-07-01-preview/TaskQueues_Get.json                                                                                                |
| [taskQueuesListByTaskHubSample.ts][taskqueueslistbytaskhubsample]                                                     | list Task Queues by Task Hub x-ms-original-file: 2026-07-01-preview/TaskQueues_ListByTaskHub.json                                                                          |
| [taskQueuesUpdateSample.ts][taskqueuesupdatesample]                                                                   | update a Task Queue x-ms-original-file: 2026-07-01-preview/TaskQueues_Update.json                                                                                          |
| [transparentDataEncryptionsCreateOrReplaceSample.ts][transparentdataencryptionscreateorreplacesample]                 | create or Update a Transparent Data Encryption x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_CreateOrReplace_MaximumSet_Gen.json                       |
| [transparentDataEncryptionsDeleteSample.ts][transparentdataencryptionsdeletesample]                                   | delete a Transparent Data Encryption x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_Delete_MaximumSet_Gen.json                                          |
| [transparentDataEncryptionsGetSample.ts][transparentdataencryptionsgetsample]                                         | get a Transparent Data Encryption x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_Get_MaximumSet_Gen.json                                                |
| [transparentDataEncryptionsListBySchedulerSample.ts][transparentdataencryptionslistbyschedulersample]                 | list Transparent Data Encryptions x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_ListByScheduler_MaximumSet_Gen.json                                    |

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
node dist/detectorsGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/detectorsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[detectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/detectorsGetSample.ts
[detectorslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/detectorsListBySchedulerSample.ts
[failoverinstancescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/failoverInstancesCreateOrReplaceSample.ts
[failoverinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/failoverInstancesDeleteSample.ts
[failoverinstancesfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/failoverInstancesFailoverSample.ts
[failoverinstancesforcefailoverallowdatalosssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/failoverInstancesForceFailoverAllowDataLossSample.ts
[failoverinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/failoverInstancesGetSample.ts
[failoverinstanceslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/failoverInstancesListBySchedulerSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/operationsListSample.ts
[retentionpoliciescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/retentionPoliciesCreateOrReplaceSample.ts
[retentionpoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/retentionPoliciesDeleteSample.ts
[retentionpoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/retentionPoliciesGetSample.ts
[retentionpolicieslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/retentionPoliciesListBySchedulerSample.ts
[retentionpoliciesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/retentionPoliciesUpdateSample.ts
[schedulerscreateorupdateprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersCreateOrUpdatePrivateEndpointConnectionSample.ts
[schedulerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersCreateOrUpdateSample.ts
[schedulersdeleteprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersDeletePrivateEndpointConnectionSample.ts
[schedulersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersDeleteSample.ts
[schedulersgetprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersGetPrivateEndpointConnectionSample.ts
[schedulersgetprivatelinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersGetPrivateLinkSample.ts
[schedulersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersGetSample.ts
[schedulerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersListByResourceGroupSample.ts
[schedulerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersListBySubscriptionSample.ts
[schedulerslistprivateendpointconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersListPrivateEndpointConnectionsSample.ts
[schedulerslistprivatelinkssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersListPrivateLinksSample.ts
[schedulersrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersRestartSample.ts
[schedulersupdateprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersUpdatePrivateEndpointConnectionSample.ts
[schedulersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/schedulersUpdateSample.ts
[taskhubscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/taskHubsCreateOrUpdateSample.ts
[taskhubsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/taskHubsDeleteSample.ts
[taskhubsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/taskHubsGetSample.ts
[taskhubslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/taskHubsListBySchedulerSample.ts
[taskqueuescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/taskQueuesCreateOrUpdateSample.ts
[taskqueuesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/taskQueuesDeleteSample.ts
[taskqueuesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/taskQueuesGetSample.ts
[taskqueueslistbytaskhubsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/taskQueuesListByTaskHubSample.ts
[taskqueuesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/taskQueuesUpdateSample.ts
[transparentdataencryptionscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/transparentDataEncryptionsCreateOrReplaceSample.ts
[transparentdataencryptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/transparentDataEncryptionsDeleteSample.ts
[transparentdataencryptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/transparentDataEncryptionsGetSample.ts
[transparentdataencryptionslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/typescript/src/transparentDataEncryptionsListBySchedulerSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-durabletask?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/durabletask/arm-durabletask/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

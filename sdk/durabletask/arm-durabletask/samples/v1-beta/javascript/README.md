# @azure/arm-durabletask client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-durabletask in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [detectorsGetSample.js][detectorsgetsample]                                                                           | gets a diagnostic detector. x-ms-original-file: 2026-07-01-preview/Detectors_Get.json                                                                                      |
| [detectorsListBySchedulerSample.js][detectorslistbyschedulersample]                                                   | lists the diagnostic detectors belonging to a scheduler. x-ms-original-file: 2026-07-01-preview/Detectors_ListByScheduler.json                                             |
| [failoverInstancesCreateOrReplaceSample.js][failoverinstancescreateorreplacesample]                                   | create or Update a Failover Instance x-ms-original-file: 2026-07-01-preview/FailoverInstances_CreateOrReplace_MaximumSet_Gen.json                                          |
| [failoverInstancesDeleteSample.js][failoverinstancesdeletesample]                                                     | delete a Failover Instance x-ms-original-file: 2026-07-01-preview/FailoverInstances_Delete_MaximumSet_Gen.json                                                             |
| [failoverInstancesFailoverSample.js][failoverinstancesfailoversample]                                                 | trigger a graceful failover for the parent scheduler x-ms-original-file: 2026-07-01-preview/FailoverInstances_Failover.json                                                |
| [failoverInstancesForceFailoverAllowDataLossSample.js][failoverinstancesforcefailoverallowdatalosssample]             | trigger a forced failover with potential data loss for the parent scheduler x-ms-original-file: 2026-07-01-preview/FailoverInstances_ForceFailoverAllowDataLoss.json       |
| [failoverInstancesGetSample.js][failoverinstancesgetsample]                                                           | get a Failover Instance x-ms-original-file: 2026-07-01-preview/FailoverInstances_Get_MaximumSet_Gen.json                                                                   |
| [failoverInstancesListBySchedulerSample.js][failoverinstanceslistbyschedulersample]                                   | list Failover Instances x-ms-original-file: 2026-07-01-preview/FailoverInstances_ListByScheduler_MaximumSet_Gen.json                                                       |
| [operationsListSample.js][operationslistsample]                                                                       | list the operations for the provider x-ms-original-file: 2026-07-01-preview/Operations_List.json                                                                           |
| [retentionPoliciesCreateOrReplaceSample.js][retentionpoliciescreateorreplacesample]                                   | create or Update a Retention Policy x-ms-original-file: 2026-07-01-preview/RetentionPolicies_CreateOrReplace_MaximumSet_Gen.json                                           |
| [retentionPoliciesDeleteSample.js][retentionpoliciesdeletesample]                                                     | delete a Retention Policy x-ms-original-file: 2026-07-01-preview/RetentionPolicies_Delete_MaximumSet_Gen.json                                                              |
| [retentionPoliciesGetSample.js][retentionpoliciesgetsample]                                                           | get a Retention Policy x-ms-original-file: 2026-07-01-preview/RetentionPolicies_Get_MaximumSet_Gen.json                                                                    |
| [retentionPoliciesListBySchedulerSample.js][retentionpolicieslistbyschedulersample]                                   | list Retention Policies x-ms-original-file: 2026-07-01-preview/RetentionPolicies_ListByScheduler_MaximumSet_Gen.json                                                       |
| [retentionPoliciesUpdateSample.js][retentionpoliciesupdatesample]                                                     | update a Retention Policy x-ms-original-file: 2026-07-01-preview/RetentionPolicies_Update_MaximumSet_Gen.json                                                              |
| [schedulersCreateOrUpdatePrivateEndpointConnectionSample.js][schedulerscreateorupdateprivateendpointconnectionsample] | create or update a private endpoint connection for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections_Create_MaximumSet_Gen.json |
| [schedulersCreateOrUpdateSample.js][schedulerscreateorupdatesample]                                                   | create or update a Scheduler x-ms-original-file: 2026-07-01-preview/Schedulers_CreateOrUpdate.json                                                                         |
| [schedulersDeletePrivateEndpointConnectionSample.js][schedulersdeleteprivateendpointconnectionsample]                 | delete a private endpoint connection for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections_Delete_MaximumSet_Gen.json           |
| [schedulersDeleteSample.js][schedulersdeletesample]                                                                   | delete a Scheduler x-ms-original-file: 2026-07-01-preview/Schedulers_Delete.json                                                                                           |
| [schedulersGetPrivateEndpointConnectionSample.js][schedulersgetprivateendpointconnectionsample]                       | get a private endpoint connection for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections_Get_MaximumSet_Gen.json                 |
| [schedulersGetPrivateLinkSample.js][schedulersgetprivatelinksample]                                                   | get a private link resource for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateLinkResources_Get_MaximumSet_Gen.json                             |
| [schedulersGetSample.js][schedulersgetsample]                                                                         | get a Scheduler x-ms-original-file: 2026-07-01-preview/Schedulers_Get.json                                                                                                 |
| [schedulersListByResourceGroupSample.js][schedulerslistbyresourcegroupsample]                                         | list Schedulers by resource group x-ms-original-file: 2026-07-01-preview/Schedulers_ListByResourceGroup.json                                                               |
| [schedulersListBySubscriptionSample.js][schedulerslistbysubscriptionsample]                                           | list Schedulers by subscription x-ms-original-file: 2026-07-01-preview/Schedulers_ListBySubscription.json                                                                  |
| [schedulersListPrivateEndpointConnectionsSample.js][schedulerslistprivateendpointconnectionssample]                   | list private endpoint connections for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections_List_MaximumSet_Gen.json                |
| [schedulersListPrivateLinksSample.js][schedulerslistprivatelinkssample]                                               | list private link resources for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateLinkResources_List_MaximumSet_Gen.json                            |
| [schedulersRestartSample.js][schedulersrestartsample]                                                                 | restart a Scheduler x-ms-original-file: 2026-07-01-preview/Schedulers_Restart.json                                                                                         |
| [schedulersUpdatePrivateEndpointConnectionSample.js][schedulersupdateprivateendpointconnectionsample]                 | update a private endpoint connection for the durable task scheduler x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections_Update.json                          |
| [schedulersUpdateSample.js][schedulersupdatesample]                                                                   | update a Scheduler x-ms-original-file: 2026-07-01-preview/Schedulers_Update.json                                                                                           |
| [taskHubsCreateOrUpdateSample.js][taskhubscreateorupdatesample]                                                       | create or Update a Task Hub x-ms-original-file: 2026-07-01-preview/TaskHubs_CreateOrUpdate.json                                                                            |
| [taskHubsDeleteSample.js][taskhubsdeletesample]                                                                       | delete a Task Hub x-ms-original-file: 2026-07-01-preview/TaskHubs_Delete.json                                                                                              |
| [taskHubsGetSample.js][taskhubsgetsample]                                                                             | get a Task Hub x-ms-original-file: 2026-07-01-preview/TaskHubs_Get.json                                                                                                    |
| [taskHubsListBySchedulerSample.js][taskhubslistbyschedulersample]                                                     | list Task Hubs x-ms-original-file: 2026-07-01-preview/TaskHubs_ListByScheduler.json                                                                                        |
| [taskQueuesCreateOrUpdateSample.js][taskqueuescreateorupdatesample]                                                   | create or update a Task Queue x-ms-original-file: 2026-07-01-preview/TaskQueues_CreateOrUpdate.json                                                                        |
| [taskQueuesDeleteSample.js][taskqueuesdeletesample]                                                                   | delete a Task Queue x-ms-original-file: 2026-07-01-preview/TaskQueues_Delete.json                                                                                          |
| [taskQueuesGetSample.js][taskqueuesgetsample]                                                                         | get a Task Queue x-ms-original-file: 2026-07-01-preview/TaskQueues_Get.json                                                                                                |
| [taskQueuesListByTaskHubSample.js][taskqueueslistbytaskhubsample]                                                     | list Task Queues by Task Hub x-ms-original-file: 2026-07-01-preview/TaskQueues_ListByTaskHub.json                                                                          |
| [taskQueuesUpdateSample.js][taskqueuesupdatesample]                                                                   | update a Task Queue x-ms-original-file: 2026-07-01-preview/TaskQueues_Update.json                                                                                          |
| [transparentDataEncryptionsCreateOrReplaceSample.js][transparentdataencryptionscreateorreplacesample]                 | create or Update a Transparent Data Encryption x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_CreateOrReplace_MaximumSet_Gen.json                       |
| [transparentDataEncryptionsDeleteSample.js][transparentdataencryptionsdeletesample]                                   | delete a Transparent Data Encryption x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_Delete_MaximumSet_Gen.json                                          |
| [transparentDataEncryptionsGetSample.js][transparentdataencryptionsgetsample]                                         | get a Transparent Data Encryption x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_Get_MaximumSet_Gen.json                                                |
| [transparentDataEncryptionsListBySchedulerSample.js][transparentdataencryptionslistbyschedulersample]                 | list Transparent Data Encryptions x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_ListByScheduler_MaximumSet_Gen.json                                    |

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
node detectorsGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node detectorsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[detectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/detectorsGetSample.js
[detectorslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/detectorsListBySchedulerSample.js
[failoverinstancescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/failoverInstancesCreateOrReplaceSample.js
[failoverinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/failoverInstancesDeleteSample.js
[failoverinstancesfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/failoverInstancesFailoverSample.js
[failoverinstancesforcefailoverallowdatalosssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/failoverInstancesForceFailoverAllowDataLossSample.js
[failoverinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/failoverInstancesGetSample.js
[failoverinstanceslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/failoverInstancesListBySchedulerSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/operationsListSample.js
[retentionpoliciescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/retentionPoliciesCreateOrReplaceSample.js
[retentionpoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/retentionPoliciesDeleteSample.js
[retentionpoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/retentionPoliciesGetSample.js
[retentionpolicieslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/retentionPoliciesListBySchedulerSample.js
[retentionpoliciesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/retentionPoliciesUpdateSample.js
[schedulerscreateorupdateprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersCreateOrUpdatePrivateEndpointConnectionSample.js
[schedulerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersCreateOrUpdateSample.js
[schedulersdeleteprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersDeletePrivateEndpointConnectionSample.js
[schedulersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersDeleteSample.js
[schedulersgetprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersGetPrivateEndpointConnectionSample.js
[schedulersgetprivatelinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersGetPrivateLinkSample.js
[schedulersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersGetSample.js
[schedulerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersListByResourceGroupSample.js
[schedulerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersListBySubscriptionSample.js
[schedulerslistprivateendpointconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersListPrivateEndpointConnectionsSample.js
[schedulerslistprivatelinkssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersListPrivateLinksSample.js
[schedulersrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersRestartSample.js
[schedulersupdateprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersUpdatePrivateEndpointConnectionSample.js
[schedulersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersUpdateSample.js
[taskhubscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskHubsCreateOrUpdateSample.js
[taskhubsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskHubsDeleteSample.js
[taskhubsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskHubsGetSample.js
[taskhubslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskHubsListBySchedulerSample.js
[taskqueuescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskQueuesCreateOrUpdateSample.js
[taskqueuesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskQueuesDeleteSample.js
[taskqueuesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskQueuesGetSample.js
[taskqueueslistbytaskhubsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskQueuesListByTaskHubSample.js
[taskqueuesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskQueuesUpdateSample.js
[transparentdataencryptionscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/transparentDataEncryptionsCreateOrReplaceSample.js
[transparentdataencryptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/transparentDataEncryptionsDeleteSample.js
[transparentdataencryptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/transparentDataEncryptionsGetSample.js
[transparentdataencryptionslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/transparentDataEncryptionsListBySchedulerSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-durabletask?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/durabletask/arm-durabletask/README.md

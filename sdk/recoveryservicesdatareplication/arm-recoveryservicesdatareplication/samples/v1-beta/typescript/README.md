# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                   | **Description**                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkNameAvailabilitySample.ts][checknameavailabilitysample]                                   | Checks the resource name availability. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/CheckNameAvailability.json                                                          |
| [deploymentPreflightSample.ts][deploymentpreflightsample]                                       | Performs resource deployment validation. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/DeploymentPreflight.json                                                          |
| [draCreateSample.ts][dracreatesample]                                                           | Creates the fabric agent. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Dra_Create.json                                                                                  |
| [draDeleteSample.ts][dradeletesample]                                                           | Deletes the fabric agent. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Dra_Delete.json                                                                                  |
| [draGetSample.ts][dragetsample]                                                                 | Gets the details of the fabric agent. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Dra_Get.json                                                                         |
| [draListSample.ts][dralistsample]                                                               | Gets the list of fabric agents in the given fabric. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Dra_List.json                                                          |
| [draOperationStatusGetSample.ts][draoperationstatusgetsample]                                   | Tracks the results of an asynchronous operation on the fabric agent. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/DraOperationStatus_Get.json                           |
| [emailConfigurationCreateSample.ts][emailconfigurationcreatesample]                             | Creates an alert configuration setting for the given vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/EmailConfiguration_Create.json                                 |
| [emailConfigurationGetSample.ts][emailconfigurationgetsample]                                   | Gets the details of the alert configuration setting. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/EmailConfiguration_Get.json                                           |
| [emailConfigurationListSample.ts][emailconfigurationlistsample]                                 | Gets the list of alert configuration settings for the given vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/EmailConfiguration_List.json                            |
| [eventGetSample.ts][eventgetsample]                                                             | Gets the details of the event. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Event_Get.json                                                                              |
| [eventListSample.ts][eventlistsample]                                                           | Gets the list of events in the given vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Event_List.json                                                                |
| [fabricCreateSample.ts][fabriccreatesample]                                                     | Creates the fabric. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Fabric_Create.json                                                                                     |
| [fabricDeleteSample.ts][fabricdeletesample]                                                     | Removes the fabric. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Fabric_Delete.json                                                                                     |
| [fabricGetSample.ts][fabricgetsample]                                                           | Gets the details of the fabric. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Fabric_Get.json                                                                            |
| [fabricListBySubscriptionSample.ts][fabriclistbysubscriptionsample]                             | Gets the list of fabrics in the given subscription. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Fabric_ListBySubscription.json                                         |
| [fabricListSample.ts][fabriclistsample]                                                         | Gets the list of fabrics in the given subscription and resource group. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Fabric_List.json                                    |
| [fabricOperationsStatusGetSample.ts][fabricoperationsstatusgetsample]                           | Tracks the results of an asynchronous operation on the fabric. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/FabricOperationsStatus_Get.json                             |
| [fabricUpdateSample.ts][fabricupdatesample]                                                     | Performs update on the fabric. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Fabric_Update.json                                                                          |
| [operationsListSample.ts][operationslistsample]                                                 | Gets the operations. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Operations_List.json                                                                                  |
| [policyCreateSample.ts][policycreatesample]                                                     | Creates the policy. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Policy_Create.json                                                                                     |
| [policyDeleteSample.ts][policydeletesample]                                                     | Removes the policy. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Policy_Delete.json                                                                                     |
| [policyGetSample.ts][policygetsample]                                                           | Gets the details of the policy. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Policy_Get.json                                                                            |
| [policyListSample.ts][policylistsample]                                                         | Gets the list of policies in the given vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Policy_List.json                                                             |
| [policyOperationStatusGetSample.ts][policyoperationstatusgetsample]                             | Tracks the results of an asynchronous operation on the policy. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/PolicyOperationStatus_Get.json                              |
| [protectedItemCreateSample.ts][protecteditemcreatesample]                                       | Creates the protected item. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ProtectedItem_Create.json                                                                      |
| [protectedItemDeleteSample.ts][protecteditemdeletesample]                                       | Removes the protected item. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ProtectedItem_Delete.json                                                                      |
| [protectedItemGetSample.ts][protecteditemgetsample]                                             | Gets the details of the protected item. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ProtectedItem_Get.json                                                             |
| [protectedItemListSample.ts][protecteditemlistsample]                                           | Gets the list of protected items in the given vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ProtectedItem_List.json                                               |
| [protectedItemOperationStatusGetSample.ts][protecteditemoperationstatusgetsample]               | Tracks the results of an asynchronous operation on the protected item. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ProtectedItemOperationStatus_Get.json               |
| [protectedItemPlannedFailoverSample.ts][protecteditemplannedfailoversample]                     | Performs the planned failover on the protected item. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ProtectedItem_PlannedFailover.json                                    |
| [recoveryPointsGetSample.ts][recoverypointsgetsample]                                           | Gets the details of the recovery point of a protected item. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/RecoveryPoints_Get.json                                        |
| [recoveryPointsListSample.ts][recoverypointslistsample]                                         | Gets the list of recovery points of the given protected item. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/RecoveryPoints_List.json                                     |
| [replicationExtensionCreateSample.ts][replicationextensioncreatesample]                         | Creates the replication extension in the given vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ReplicationExtension_Create.json                                     |
| [replicationExtensionDeleteSample.ts][replicationextensiondeletesample]                         | Deletes the replication extension in the given vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ReplicationExtension_Delete.json                                     |
| [replicationExtensionGetSample.ts][replicationextensiongetsample]                               | Gets the details of the replication extension. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ReplicationExtension_Get.json                                               |
| [replicationExtensionListSample.ts][replicationextensionlistsample]                             | Gets the list of replication extensions in the given vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ReplicationExtension_List.json                                 |
| [replicationExtensionOperationStatusGetSample.ts][replicationextensionoperationstatusgetsample] | Tracks the results of an asynchronous operation on the replication extension. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/ReplicationExtensionOperationStatus_Get.json |
| [vaultCreateSample.ts][vaultcreatesample]                                                       | Creates the vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Vault_Create.json                                                                                       |
| [vaultDeleteSample.ts][vaultdeletesample]                                                       | Removes the vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Vault_Delete.json                                                                                       |
| [vaultGetSample.ts][vaultgetsample]                                                             | Gets the details of the vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Vault_Get.json                                                                              |
| [vaultListBySubscriptionSample.ts][vaultlistbysubscriptionsample]                               | Gets the list of vaults in the given subscription. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Vault_ListBySubscription.json                                           |
| [vaultListSample.ts][vaultlistsample]                                                           | Gets the list of vaults in the given subscription and resource group. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Vault_List.json                                      |
| [vaultOperationStatusGetSample.ts][vaultoperationstatusgetsample]                               | Tracks the results of an asynchronous operation on the vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/VaultOperationStatus_Get.json                                |
| [vaultUpdateSample.ts][vaultupdatesample]                                                       | Performs update on the vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Vault_Update.json                                                                            |
| [workflowGetSample.ts][workflowgetsample]                                                       | Gets the details of the job. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Workflow_Get.json                                                                             |
| [workflowListSample.ts][workflowlistsample]                                                     | Gets the list of jobs in the given vault. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Workflow_List.json                                                               |
| [workflowOperationStatusGetSample.ts][workflowoperationstatusgetsample]                         | Tracks the results of an asynchronous operation on the job. x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/WorkflowOperationStatus_Get.json                               |

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
node dist/checkNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env RECOVERYSERVICESDATAREPLICATION_SUBSCRIPTION_ID="<recoveryservicesdatareplication subscription id>" node dist/checkNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/checkNameAvailabilitySample.ts
[deploymentpreflightsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/deploymentPreflightSample.ts
[dracreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/draCreateSample.ts
[dradeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/draDeleteSample.ts
[dragetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/draGetSample.ts
[dralistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/draListSample.ts
[draoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/draOperationStatusGetSample.ts
[emailconfigurationcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/emailConfigurationCreateSample.ts
[emailconfigurationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/emailConfigurationGetSample.ts
[emailconfigurationlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/emailConfigurationListSample.ts
[eventgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/eventGetSample.ts
[eventlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/eventListSample.ts
[fabriccreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/fabricCreateSample.ts
[fabricdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/fabricDeleteSample.ts
[fabricgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/fabricGetSample.ts
[fabriclistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/fabricListBySubscriptionSample.ts
[fabriclistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/fabricListSample.ts
[fabricoperationsstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/fabricOperationsStatusGetSample.ts
[fabricupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/fabricUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/operationsListSample.ts
[policycreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/policyCreateSample.ts
[policydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/policyDeleteSample.ts
[policygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/policyGetSample.ts
[policylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/policyListSample.ts
[policyoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/policyOperationStatusGetSample.ts
[protecteditemcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/protectedItemCreateSample.ts
[protecteditemdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/protectedItemDeleteSample.ts
[protecteditemgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/protectedItemGetSample.ts
[protecteditemlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/protectedItemListSample.ts
[protecteditemoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/protectedItemOperationStatusGetSample.ts
[protecteditemplannedfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/protectedItemPlannedFailoverSample.ts
[recoverypointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/recoveryPointsGetSample.ts
[recoverypointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/recoveryPointsListSample.ts
[replicationextensioncreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/replicationExtensionCreateSample.ts
[replicationextensiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/replicationExtensionDeleteSample.ts
[replicationextensiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/replicationExtensionGetSample.ts
[replicationextensionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/replicationExtensionListSample.ts
[replicationextensionoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/replicationExtensionOperationStatusGetSample.ts
[vaultcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/vaultCreateSample.ts
[vaultdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/vaultDeleteSample.ts
[vaultgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/vaultGetSample.ts
[vaultlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/vaultListBySubscriptionSample.ts
[vaultlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/vaultListSample.ts
[vaultoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/vaultOperationStatusGetSample.ts
[vaultupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/vaultUpdateSample.ts
[workflowgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/workflowGetSample.ts
[workflowlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/workflowListSample.ts
[workflowoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/samples/v1-beta/typescript/src/workflowOperationStatusGetSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-recoveryservicesdatareplication?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/recoveryservicesdatareplication/arm-recoveryservicesdatareplication/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

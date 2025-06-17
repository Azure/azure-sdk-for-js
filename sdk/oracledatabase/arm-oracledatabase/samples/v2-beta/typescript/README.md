# @azure/arm-oracledatabase client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-oracledatabase in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [autonomousDatabaseBackupsUpdateSample.ts][autonomousdatabasebackupsupdatesample]                               | update a AutonomousDatabaseBackup x-ms-original-file: 2024-06-01/autonomousDatabaseBackup_patch.json                                     |
| [autonomousDatabasesFailoverSample.ts][autonomousdatabasesfailoversample]                                       | perform failover action on Autonomous Database x-ms-original-file: 2024-06-01/autonomousDatabase_failover.json                           |
| [autonomousDatabasesGenerateWalletSample.ts][autonomousdatabasesgeneratewalletsample]                           | generate wallet action on Autonomous Database x-ms-original-file: 2024-06-01/autonomousDatabase_generateWallet.json                      |
| [autonomousDatabasesListByResourceGroupSample.ts][autonomousdatabaseslistbyresourcegroupsample]                 | list AutonomousDatabase resources by resource group x-ms-original-file: 2024-06-01/autonomousDatabase_listByResourceGroup.json           |
| [autonomousDatabasesRestoreSample.ts][autonomousdatabasesrestoresample]                                         | restores an Autonomous Database based on the provided request parameters. x-ms-original-file: 2024-06-01/autonomousDatabase_restore.json |
| [autonomousDatabasesSwitchoverSample.ts][autonomousdatabasesswitchoversample]                                   | perform switchover action on Autonomous Database x-ms-original-file: 2024-06-01/autonomousDatabase_switchover.json                       |
| [autonomousDatabasesUpdateSample.ts][autonomousdatabasesupdatesample]                                           | update a AutonomousDatabase x-ms-original-file: 2024-06-01/autonomousDatabase_patch.json                                                 |
| [cloudExadataInfrastructuresAddStorageCapacitySample.ts][cloudexadatainfrastructuresaddstoragecapacitysample]   | perform add storage capacity on exadata infra x-ms-original-file: 2024-06-01/exaInfra_addStorageCapacity.json                            |
| [cloudVmClustersAddVmsSample.ts][cloudvmclustersaddvmssample]                                                   | add VMs to the VM Cluster x-ms-original-file: 2024-06-01/vmClusters_addVms.json                                                          |
| [cloudVmClustersListPrivateIpAddressesSample.ts][cloudvmclusterslistprivateipaddressessample]                   | list Private IP Addresses by the provided filter x-ms-original-file: 2024-06-01/vmClusters_listPrivateIpAddresses.json                   |
| [cloudVmClustersRemoveVmsSample.ts][cloudvmclustersremovevmssample]                                             | remove VMs from the VM Cluster x-ms-original-file: 2024-06-01/vmClusters_removeVms.json                                                  |
| [dbNodesActionSample.ts][dbnodesactionsample]                                                                   | vM actions on DbNode of VM Cluster by the provided filter x-ms-original-file: 2024-06-01/dbNodes_action.json                             |
| [dbNodesListByParentSample.ts][dbnodeslistbyparentsample]                                                       | list DbNode resources by CloudVmCluster x-ms-original-file: 2024-06-01/dbNodes_listByParent.json                                         |
| [dbSystemShapesListByLocationSample.ts][dbsystemshapeslistbylocationsample]                                     | list DbSystemShape resources by SubscriptionLocationResource x-ms-original-file: 2024-06-01/dbSystemShapes_listByLocation.json           |
| [giVersionsListByLocationSample.ts][giversionslistbylocationsample]                                             | list GiVersion resources by SubscriptionLocationResource x-ms-original-file: 2024-06-01/giVersions_listByLocation.json                   |
| [operationsListSample.ts][operationslistsample]                                                                 | list the operations for the provider x-ms-original-file: 2024-06-01/operations_list.json                                                 |
| [oracleSubscriptionsAddAzureSubscriptionsSample.ts][oraclesubscriptionsaddazuresubscriptionssample]             | add Azure Subscriptions x-ms-original-file: 2024-06-01/oracleSubscriptions_addAzureSubscriptions.json                                    |
| [oracleSubscriptionsListActivationLinksSample.ts][oraclesubscriptionslistactivationlinkssample]                 | list Activation Links x-ms-original-file: 2024-06-01/oracleSubscriptions_listActivationLinks.json                                        |
| [oracleSubscriptionsListCloudAccountDetailsSample.ts][oraclesubscriptionslistcloudaccountdetailssample]         | list Cloud Account Details x-ms-original-file: 2024-06-01/oracleSubscriptions_listCloudAccountDetails.json                               |
| [oracleSubscriptionsListSaasSubscriptionDetailsSample.ts][oraclesubscriptionslistsaassubscriptiondetailssample] | list Saas Subscription Details x-ms-original-file: 2024-06-01/oracleSubscriptions_listSaasSubscriptionDetails.json                       |
| [oracleSubscriptionsUpdateSample.ts][oraclesubscriptionsupdatesample]                                           | update a OracleSubscription x-ms-original-file: 2024-06-01/oracleSubscriptions_patch.json                                                |

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
node dist/autonomousDatabaseBackupsUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/autonomousDatabaseBackupsUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[autonomousdatabasebackupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/autonomousDatabaseBackupsUpdateSample.ts
[autonomousdatabasesfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/autonomousDatabasesFailoverSample.ts
[autonomousdatabasesgeneratewalletsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/autonomousDatabasesGenerateWalletSample.ts
[autonomousdatabaseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/autonomousDatabasesListByResourceGroupSample.ts
[autonomousdatabasesrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/autonomousDatabasesRestoreSample.ts
[autonomousdatabasesswitchoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/autonomousDatabasesSwitchoverSample.ts
[autonomousdatabasesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/autonomousDatabasesUpdateSample.ts
[cloudexadatainfrastructuresaddstoragecapacitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/cloudExadataInfrastructuresAddStorageCapacitySample.ts
[cloudvmclustersaddvmssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/cloudVmClustersAddVmsSample.ts
[cloudvmclusterslistprivateipaddressessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/cloudVmClustersListPrivateIpAddressesSample.ts
[cloudvmclustersremovevmssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/cloudVmClustersRemoveVmsSample.ts
[dbnodesactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/dbNodesActionSample.ts
[dbnodeslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/dbNodesListByParentSample.ts
[dbsystemshapeslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/dbSystemShapesListByLocationSample.ts
[giversionslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/giVersionsListByLocationSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/operationsListSample.ts
[oraclesubscriptionsaddazuresubscriptionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/oracleSubscriptionsAddAzureSubscriptionsSample.ts
[oraclesubscriptionslistactivationlinkssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/oracleSubscriptionsListActivationLinksSample.ts
[oraclesubscriptionslistcloudaccountdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/oracleSubscriptionsListCloudAccountDetailsSample.ts
[oraclesubscriptionslistsaassubscriptiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/oracleSubscriptionsListSaasSubscriptionDetailsSample.ts
[oraclesubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/typescript/src/oracleSubscriptionsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-oracledatabase?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/oracledatabase/arm-oracledatabase/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

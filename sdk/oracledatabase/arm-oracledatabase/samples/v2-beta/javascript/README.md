# @azure/arm-oracledatabase client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-oracledatabase in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [autonomousDatabaseBackupsUpdateSample.js][autonomousdatabasebackupsupdatesample]                               | update a AutonomousDatabaseBackup x-ms-original-file: 2024-06-01/autonomousDatabaseBackup_patch.json                                     |
| [autonomousDatabasesFailoverSample.js][autonomousdatabasesfailoversample]                                       | perform failover action on Autonomous Database x-ms-original-file: 2024-06-01/autonomousDatabase_failover.json                           |
| [autonomousDatabasesGenerateWalletSample.js][autonomousdatabasesgeneratewalletsample]                           | generate wallet action on Autonomous Database x-ms-original-file: 2024-06-01/autonomousDatabase_generateWallet.json                      |
| [autonomousDatabasesListByResourceGroupSample.js][autonomousdatabaseslistbyresourcegroupsample]                 | list AutonomousDatabase resources by resource group x-ms-original-file: 2024-06-01/autonomousDatabase_listByResourceGroup.json           |
| [autonomousDatabasesRestoreSample.js][autonomousdatabasesrestoresample]                                         | restores an Autonomous Database based on the provided request parameters. x-ms-original-file: 2024-06-01/autonomousDatabase_restore.json |
| [autonomousDatabasesSwitchoverSample.js][autonomousdatabasesswitchoversample]                                   | perform switchover action on Autonomous Database x-ms-original-file: 2024-06-01/autonomousDatabase_switchover.json                       |
| [autonomousDatabasesUpdateSample.js][autonomousdatabasesupdatesample]                                           | update a AutonomousDatabase x-ms-original-file: 2024-06-01/autonomousDatabase_patch.json                                                 |
| [cloudExadataInfrastructuresAddStorageCapacitySample.js][cloudexadatainfrastructuresaddstoragecapacitysample]   | perform add storage capacity on exadata infra x-ms-original-file: 2024-06-01/exaInfra_addStorageCapacity.json                            |
| [cloudVmClustersAddVmsSample.js][cloudvmclustersaddvmssample]                                                   | add VMs to the VM Cluster x-ms-original-file: 2024-06-01/vmClusters_addVms.json                                                          |
| [cloudVmClustersListPrivateIpAddressesSample.js][cloudvmclusterslistprivateipaddressessample]                   | list Private IP Addresses by the provided filter x-ms-original-file: 2024-06-01/vmClusters_listPrivateIpAddresses.json                   |
| [cloudVmClustersRemoveVmsSample.js][cloudvmclustersremovevmssample]                                             | remove VMs from the VM Cluster x-ms-original-file: 2024-06-01/vmClusters_removeVms.json                                                  |
| [dbNodesActionSample.js][dbnodesactionsample]                                                                   | vM actions on DbNode of VM Cluster by the provided filter x-ms-original-file: 2024-06-01/dbNodes_action.json                             |
| [dbNodesListByParentSample.js][dbnodeslistbyparentsample]                                                       | list DbNode resources by CloudVmCluster x-ms-original-file: 2024-06-01/dbNodes_listByParent.json                                         |
| [dbSystemShapesListByLocationSample.js][dbsystemshapeslistbylocationsample]                                     | list DbSystemShape resources by SubscriptionLocationResource x-ms-original-file: 2024-06-01/dbSystemShapes_listByLocation.json           |
| [giVersionsListByLocationSample.js][giversionslistbylocationsample]                                             | list GiVersion resources by SubscriptionLocationResource x-ms-original-file: 2024-06-01/giVersions_listByLocation.json                   |
| [operationsListSample.js][operationslistsample]                                                                 | list the operations for the provider x-ms-original-file: 2024-06-01/operations_list.json                                                 |
| [oracleSubscriptionsAddAzureSubscriptionsSample.js][oraclesubscriptionsaddazuresubscriptionssample]             | add Azure Subscriptions x-ms-original-file: 2024-06-01/oracleSubscriptions_addAzureSubscriptions.json                                    |
| [oracleSubscriptionsListActivationLinksSample.js][oraclesubscriptionslistactivationlinkssample]                 | list Activation Links x-ms-original-file: 2024-06-01/oracleSubscriptions_listActivationLinks.json                                        |
| [oracleSubscriptionsListCloudAccountDetailsSample.js][oraclesubscriptionslistcloudaccountdetailssample]         | list Cloud Account Details x-ms-original-file: 2024-06-01/oracleSubscriptions_listCloudAccountDetails.json                               |
| [oracleSubscriptionsListSaasSubscriptionDetailsSample.js][oraclesubscriptionslistsaassubscriptiondetailssample] | list Saas Subscription Details x-ms-original-file: 2024-06-01/oracleSubscriptions_listSaasSubscriptionDetails.json                       |
| [oracleSubscriptionsUpdateSample.js][oraclesubscriptionsupdatesample]                                           | update a OracleSubscription x-ms-original-file: 2024-06-01/oracleSubscriptions_patch.json                                                |

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
node autonomousDatabaseBackupsUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node autonomousDatabaseBackupsUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[autonomousdatabasebackupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/autonomousDatabaseBackupsUpdateSample.js
[autonomousdatabasesfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/autonomousDatabasesFailoverSample.js
[autonomousdatabasesgeneratewalletsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/autonomousDatabasesGenerateWalletSample.js
[autonomousdatabaseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/autonomousDatabasesListByResourceGroupSample.js
[autonomousdatabasesrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/autonomousDatabasesRestoreSample.js
[autonomousdatabasesswitchoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/autonomousDatabasesSwitchoverSample.js
[autonomousdatabasesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/autonomousDatabasesUpdateSample.js
[cloudexadatainfrastructuresaddstoragecapacitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/cloudExadataInfrastructuresAddStorageCapacitySample.js
[cloudvmclustersaddvmssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/cloudVmClustersAddVmsSample.js
[cloudvmclusterslistprivateipaddressessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/cloudVmClustersListPrivateIpAddressesSample.js
[cloudvmclustersremovevmssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/cloudVmClustersRemoveVmsSample.js
[dbnodesactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/dbNodesActionSample.js
[dbnodeslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/dbNodesListByParentSample.js
[dbsystemshapeslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/dbSystemShapesListByLocationSample.js
[giversionslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/giVersionsListByLocationSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/operationsListSample.js
[oraclesubscriptionsaddazuresubscriptionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/oracleSubscriptionsAddAzureSubscriptionsSample.js
[oraclesubscriptionslistactivationlinkssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/oracleSubscriptionsListActivationLinksSample.js
[oraclesubscriptionslistcloudaccountdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/oracleSubscriptionsListCloudAccountDetailsSample.js
[oraclesubscriptionslistsaassubscriptiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/oracleSubscriptionsListSaasSubscriptionDetailsSample.js
[oraclesubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v2-beta/javascript/oracleSubscriptionsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-oracledatabase?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/oracledatabase/arm-oracledatabase/README.md

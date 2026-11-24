# @azure/arm-digitalassets client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-digitalassets in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                               | list the operations for the provider x-ms-original-file: 2025-09-01-preview/Operations_List.json                                                                                                                                                                                                           |
| [partitionsCreateOrUpdateSample.js][partitionscreateorupdatesample]           | creates or replaces a partition. x-ms-original-file: 2025-09-01-preview/Partitions_CreateOrUpdate.json                                                                                                                                                                                                     |
| [partitionsDeleteSample.js][partitionsdeletesample]                           | delete a Partition x-ms-original-file: 2025-09-01-preview/Partitions_Delete.json                                                                                                                                                                                                                           |
| [partitionsGetSample.js][partitionsgetsample]                                 | get a Partition x-ms-original-file: 2025-09-01-preview/Partitions_Get.json                                                                                                                                                                                                                                 |
| [partitionsListByParentSample.js][partitionslistbyparentsample]               | list Partition resources by ZkpRollup x-ms-original-file: 2025-09-01-preview/Partitions_ListByParent.json                                                                                                                                                                                                  |
| [partitionsUpdateSample.js][partitionsupdatesample]                           | update a Partition x-ms-original-file: 2025-09-01-preview/Partitions_Update.json                                                                                                                                                                                                                           |
| [zkpRollupsCreateOrUpdateSample.js][zkprollupscreateorupdatesample]           | creates or replaces a ZKP rollup. x-ms-original-file: 2025-09-01-preview/ZkpRollups_CreateOrUpdate.json                                                                                                                                                                                                    |
| [zkpRollupsDeleteSample.js][zkprollupsdeletesample]                           | delete a ZkpRollup x-ms-original-file: 2025-09-01-preview/ZkpRollups_Delete.json                                                                                                                                                                                                                           |
| [zkpRollupsGetSample.js][zkprollupsgetsample]                                 | get a ZkpRollup x-ms-original-file: 2025-09-01-preview/ZkpRollups_Get.json                                                                                                                                                                                                                                 |
| [zkpRollupsListByResourceGroupSample.js][zkprollupslistbyresourcegroupsample] | list ZkpRollup resources by resource group x-ms-original-file: 2025-09-01-preview/ZkpRollups_ListByResourceGroup.json                                                                                                                                                                                      |
| [zkpRollupsListBySubscriptionSample.js][zkprollupslistbysubscriptionsample]   | list ZkpRollup resources by subscription ID x-ms-original-file: 2025-09-01-preview/ZkpRollups_ListBySubscription.json                                                                                                                                                                                      |
| [zkpRollupsUpdateSample.js][zkprollupsupdatesample]                           | updates rollup tags, identity attachments or configuration. Metadata-only updates complete synchronously. Configuration changes reconcile the rollup and existing partition asynchronously, preserving checkpoints and discovered contracts. x-ms-original-file: 2025-09-01-preview/ZkpRollups_Update.json |

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
node operationsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/operationsListSample.js
[partitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/partitionsCreateOrUpdateSample.js
[partitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/partitionsDeleteSample.js
[partitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/partitionsGetSample.js
[partitionslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/partitionsListByParentSample.js
[partitionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/partitionsUpdateSample.js
[zkprollupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/zkpRollupsCreateOrUpdateSample.js
[zkprollupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/zkpRollupsDeleteSample.js
[zkprollupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/zkpRollupsGetSample.js
[zkprollupslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/zkpRollupsListByResourceGroupSample.js
[zkprollupslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/zkpRollupsListBySubscriptionSample.js
[zkprollupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/javascript/zkpRollupsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-digitalassets?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitalassets/arm-digitalassets/README.md

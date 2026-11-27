# @azure/arm-digitalassets client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-digitalassets in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                               | list the operations for the provider x-ms-original-file: 2025-09-01-preview/Operations_List.json                                                                                                                                                                                                           |
| [partitionsCreateOrUpdateSample.ts][partitionscreateorupdatesample]           | creates or replaces a partition. x-ms-original-file: 2025-09-01-preview/Partitions_CreateOrUpdate.json                                                                                                                                                                                                     |
| [partitionsDeleteSample.ts][partitionsdeletesample]                           | delete a Partition x-ms-original-file: 2025-09-01-preview/Partitions_Delete.json                                                                                                                                                                                                                           |
| [partitionsGetSample.ts][partitionsgetsample]                                 | get a Partition x-ms-original-file: 2025-09-01-preview/Partitions_Get.json                                                                                                                                                                                                                                 |
| [partitionsListByParentSample.ts][partitionslistbyparentsample]               | list Partition resources by ZkpRollup x-ms-original-file: 2025-09-01-preview/Partitions_ListByParent.json                                                                                                                                                                                                  |
| [partitionsUpdateSample.ts][partitionsupdatesample]                           | update a Partition x-ms-original-file: 2025-09-01-preview/Partitions_Update.json                                                                                                                                                                                                                           |
| [zkpRollupsCreateOrUpdateSample.ts][zkprollupscreateorupdatesample]           | creates or replaces a ZKP rollup. x-ms-original-file: 2025-09-01-preview/ZkpRollups_CreateOrUpdate.json                                                                                                                                                                                                    |
| [zkpRollupsDeleteSample.ts][zkprollupsdeletesample]                           | delete a ZkpRollup x-ms-original-file: 2025-09-01-preview/ZkpRollups_Delete.json                                                                                                                                                                                                                           |
| [zkpRollupsGetSample.ts][zkprollupsgetsample]                                 | get a ZkpRollup x-ms-original-file: 2025-09-01-preview/ZkpRollups_Get.json                                                                                                                                                                                                                                 |
| [zkpRollupsListByResourceGroupSample.ts][zkprollupslistbyresourcegroupsample] | list ZkpRollup resources by resource group x-ms-original-file: 2025-09-01-preview/ZkpRollups_ListByResourceGroup.json                                                                                                                                                                                      |
| [zkpRollupsListBySubscriptionSample.ts][zkprollupslistbysubscriptionsample]   | list ZkpRollup resources by subscription ID x-ms-original-file: 2025-09-01-preview/ZkpRollups_ListBySubscription.json                                                                                                                                                                                      |
| [zkpRollupsUpdateSample.ts][zkprollupsupdatesample]                           | updates rollup tags, identity attachments or configuration. Metadata-only updates complete synchronously. Configuration changes reconcile the rollup and existing partition asynchronously, preserving checkpoints and discovered contracts. x-ms-original-file: 2025-09-01-preview/ZkpRollups_Update.json |

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
node dist/operationsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/operationsListSample.ts
[partitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/partitionsCreateOrUpdateSample.ts
[partitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/partitionsDeleteSample.ts
[partitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/partitionsGetSample.ts
[partitionslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/partitionsListByParentSample.ts
[partitionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/partitionsUpdateSample.ts
[zkprollupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/zkpRollupsCreateOrUpdateSample.ts
[zkprollupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/zkpRollupsDeleteSample.ts
[zkprollupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/zkpRollupsGetSample.ts
[zkprollupslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/zkpRollupsListByResourceGroupSample.ts
[zkprollupslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/zkpRollupsListBySubscriptionSample.ts
[zkprollupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitalassets/arm-digitalassets/samples/v1-beta/typescript/src/zkpRollupsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-digitalassets?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitalassets/arm-digitalassets/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

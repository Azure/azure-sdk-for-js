# @azure/arm-resourcegraph client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-resourcegraph in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                      |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [graphQueryCreateOrUpdateSample.ts][graphquerycreateorupdatesample]         | create a new graph query. x-ms-original-file: 2024-04-01/GraphQueryAdd.json                                                                          |
| [graphQueryDeleteSample.ts][graphquerydeletesample]                         | delete a graph query. x-ms-original-file: 2024-04-01/GraphQueryDelete.json                                                                           |
| [graphQueryGetSample.ts][graphquerygetsample]                               | get a single graph query by its resourceName. x-ms-original-file: 2024-04-01/GraphQueryGet.json                                                      |
| [graphQueryListBySubscriptionSample.ts][graphquerylistbysubscriptionsample] | get all graph queries defined within a specified subscription. x-ms-original-file: 2024-04-01/GraphQueryList.json                                    |
| [graphQueryListSample.ts][graphquerylistsample]                             | get all graph queries defined within a specified subscription and resource group. x-ms-original-file: 2024-04-01/GraphQueryList1.json                |
| [graphQueryUpdateSample.ts][graphqueryupdatesample]                         | updates a graph query that has already been added. x-ms-original-file: 2024-04-01/GraphQueryUpdate.json                                              |
| [operationsListSample.ts][operationslistsample]                             | list the operations for the provider x-ms-original-file: 2024-04-01/OperationsList.json                                                              |
| [resourceChangeDetailsSample.ts][resourcechangedetailssample]               | get resource change details. x-ms-original-file: 2020-09-01-preview/ResourceChangeDetails.json                                                       |
| [resourceChangesSample.ts][resourcechangessample]                           | list changes to a resource for a given time interval. x-ms-original-file: 2020-09-01-preview/ResourceChanges.json                                    |
| [resourcesHistorySample.ts][resourceshistorysample]                         | list all snapshots of a resource for a given time interval. x-ms-original-file: 2021-06-01-preview/ResourcesHistoryGet.json                          |
| [resourcesSample.ts][resourcessample]                                       | queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: 2024-04-01/ResourcesBasicQuery.json |

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
node dist/graphQueryCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/graphQueryCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[graphquerycreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/graphQueryCreateOrUpdateSample.ts
[graphquerydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/graphQueryDeleteSample.ts
[graphquerygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/graphQueryGetSample.ts
[graphquerylistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/graphQueryListBySubscriptionSample.ts
[graphquerylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/graphQueryListSample.ts
[graphqueryupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/graphQueryUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/operationsListSample.ts
[resourcechangedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/resourceChangeDetailsSample.ts
[resourcechangessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/resourceChangesSample.ts
[resourceshistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/resourcesHistorySample.ts
[resourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/resourcesSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourcegraph?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcegraph/arm-resourcegraph/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

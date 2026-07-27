# @azure/arm-resourcegraph client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-resourcegraph in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                      |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [graphQueryCreateOrUpdateSample.js][graphquerycreateorupdatesample]         | create a new graph query. x-ms-original-file: 2024-04-01/GraphQueryAdd.json                                                                          |
| [graphQueryDeleteSample.js][graphquerydeletesample]                         | delete a graph query. x-ms-original-file: 2024-04-01/GraphQueryDelete.json                                                                           |
| [graphQueryGetSample.js][graphquerygetsample]                               | get a single graph query by its resourceName. x-ms-original-file: 2024-04-01/GraphQueryGet.json                                                      |
| [graphQueryListBySubscriptionSample.js][graphquerylistbysubscriptionsample] | get all graph queries defined within a specified subscription. x-ms-original-file: 2024-04-01/GraphQueryList.json                                    |
| [graphQueryListSample.js][graphquerylistsample]                             | get all graph queries defined within a specified subscription and resource group. x-ms-original-file: 2024-04-01/GraphQueryList1.json                |
| [graphQueryUpdateSample.js][graphqueryupdatesample]                         | updates a graph query that has already been added. x-ms-original-file: 2024-04-01/GraphQueryUpdate.json                                              |
| [operationsListSample.js][operationslistsample]                             | list the operations for the provider x-ms-original-file: 2024-04-01/OperationsList.json                                                              |
| [resourceChangeDetailsSample.js][resourcechangedetailssample]               | get resource change details. x-ms-original-file: 2020-09-01-preview/ResourceChangeDetails.json                                                       |
| [resourceChangesSample.js][resourcechangessample]                           | list changes to a resource for a given time interval. x-ms-original-file: 2020-09-01-preview/ResourceChanges.json                                    |
| [resourcesHistorySample.js][resourceshistorysample]                         | list all snapshots of a resource for a given time interval. x-ms-original-file: 2021-06-01-preview/ResourcesHistoryGet.json                          |
| [resourcesSample.js][resourcessample]                                       | queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: 2024-04-01/ResourcesBasicQuery.json |

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
node graphQueryCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node graphQueryCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[graphquerycreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/graphQueryCreateOrUpdateSample.js
[graphquerydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/graphQueryDeleteSample.js
[graphquerygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/graphQueryGetSample.js
[graphquerylistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/graphQueryListBySubscriptionSample.js
[graphquerylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/graphQueryListSample.js
[graphqueryupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/graphQueryUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/operationsListSample.js
[resourcechangedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/resourceChangeDetailsSample.js
[resourcechangessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/resourceChangesSample.js
[resourceshistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/resourcesHistorySample.js
[resourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/resourcesSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourcegraph?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcegraph/arm-resourcegraph/README.md

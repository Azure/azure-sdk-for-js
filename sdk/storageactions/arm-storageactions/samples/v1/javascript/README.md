# @azure/arm-storageactions client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-storageactions in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                   | lists all of the available Storage Actions Rest API operations. x-ms-original-file: 2023-01-01/misc/OperationsList.json                                                                                                                                                                                                                                                                                                                                                |
| [storageTaskAssignmentListSample.js][storagetaskassignmentlistsample]             | lists Resource IDs of the Storage Task Assignments associated with this Storage Task. x-ms-original-file: 2023-01-01/storageTasksList/ListStorageTaskAssignmentIds.json                                                                                                                                                                                                                                                                                                |
| [storageTasksCreateSample.js][storagetaskscreatesample]                           | asynchronously creates a new storage task resource with the specified parameters. If a storage task is already created and a subsequent create request is issued with different properties, the storage task properties will be updated. If a storage task is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed. x-ms-original-file: 2023-01-01/storageTasksCrud/PutStorageTask.json |
| [storageTasksDeleteSample.js][storagetasksdeletesample]                           | delete the storage task resource. x-ms-original-file: 2023-01-01/storageTasksCrud/DeleteStorageTask.json                                                                                                                                                                                                                                                                                                                                                               |
| [storageTasksGetSample.js][storagetasksgetsample]                                 | get the storage task properties x-ms-original-file: 2023-01-01/storageTasksCrud/GetStorageTask.json                                                                                                                                                                                                                                                                                                                                                                    |
| [storageTasksListByResourceGroupSample.js][storagetaskslistbyresourcegroupsample] | lists all the storage tasks available under the given resource group. x-ms-original-file: 2023-01-01/storageTasksList/ListStorageTasksByResourceGroup.json                                                                                                                                                                                                                                                                                                             |
| [storageTasksListBySubscriptionSample.js][storagetaskslistbysubscriptionsample]   | lists all the storage tasks available under the subscription. x-ms-original-file: 2023-01-01/storageTasksList/ListStorageTasksBySubscription.json                                                                                                                                                                                                                                                                                                                      |
| [storageTasksPreviewActionsSample.js][storagetaskspreviewactionssample]           | runs the input conditions against input object metadata properties and designates matched objects in response. x-ms-original-file: 2023-01-01/misc/PerformStorageTaskActionsPreview.json                                                                                                                                                                                                                                                                               |
| [storageTasksReportListSample.js][storagetasksreportlistsample]                   | fetch the storage tasks run report summary for each assignment. x-ms-original-file: 2023-01-01/storageTasksList/ListStorageTasksRunReportSummary.json                                                                                                                                                                                                                                                                                                                  |
| [storageTasksUpdateSample.js][storagetasksupdatesample]                           | update storage task properties x-ms-original-file: 2023-01-01/storageTasksCrud/PatchStorageTask.json                                                                                                                                                                                                                                                                                                                                                                   |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1/javascript/operationsListSample.js
[storagetaskassignmentlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1/javascript/storageTaskAssignmentListSample.js
[storagetaskscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1/javascript/storageTasksCreateSample.js
[storagetasksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1/javascript/storageTasksDeleteSample.js
[storagetasksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1/javascript/storageTasksGetSample.js
[storagetaskslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1/javascript/storageTasksListByResourceGroupSample.js
[storagetaskslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1/javascript/storageTasksListBySubscriptionSample.js
[storagetaskspreviewactionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1/javascript/storageTasksPreviewActionsSample.js
[storagetasksreportlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1/javascript/storageTasksReportListSample.js
[storagetasksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1/javascript/storageTasksUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-storageactions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storageactions/arm-storageactions/README.md

# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                   | Lists all of the available Storage Actions Rest API operations. x-ms-original-file: specification/storageactions/resource-manager/Microsoft.StorageActions/stable/2023-01-01/examples/misc/OperationsList.json                                                                                                                                                                                                                                                                                                                                                |
| [storageTaskAssignmentListSample.ts][storagetaskassignmentlistsample]             | Lists all the storage tasks available under the given resource group. x-ms-original-file: specification/storageactions/resource-manager/Microsoft.StorageActions/stable/2023-01-01/examples/storageTasksList/ListStorageTaskAssignmentIds.json                                                                                                                                                                                                                                                                                                                |
| [storageTasksCreateSample.ts][storagetaskscreatesample]                           | Asynchronously creates a new storage task resource with the specified parameters. If a storage task is already created and a subsequent create request is issued with different properties, the storage task properties will be updated. If a storage task is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed. x-ms-original-file: specification/storageactions/resource-manager/Microsoft.StorageActions/stable/2023-01-01/examples/storageTasksCrud/PutStorageTask.json |
| [storageTasksDeleteSample.ts][storagetasksdeletesample]                           | Delete the storage task resource. x-ms-original-file: specification/storageactions/resource-manager/Microsoft.StorageActions/stable/2023-01-01/examples/storageTasksCrud/DeleteStorageTask.json                                                                                                                                                                                                                                                                                                                                                               |
| [storageTasksGetSample.ts][storagetasksgetsample]                                 | Get the storage task properties x-ms-original-file: specification/storageactions/resource-manager/Microsoft.StorageActions/stable/2023-01-01/examples/storageTasksCrud/GetStorageTask.json                                                                                                                                                                                                                                                                                                                                                                    |
| [storageTasksListByResourceGroupSample.ts][storagetaskslistbyresourcegroupsample] | Lists all the storage tasks available under the given resource group. x-ms-original-file: specification/storageactions/resource-manager/Microsoft.StorageActions/stable/2023-01-01/examples/storageTasksList/ListStorageTasksByResourceGroup.json                                                                                                                                                                                                                                                                                                             |
| [storageTasksListBySubscriptionSample.ts][storagetaskslistbysubscriptionsample]   | Lists all the storage tasks available under the subscription. x-ms-original-file: specification/storageactions/resource-manager/Microsoft.StorageActions/stable/2023-01-01/examples/storageTasksList/ListStorageTasksBySubscription.json                                                                                                                                                                                                                                                                                                                      |
| [storageTasksPreviewActionsSample.ts][storagetaskspreviewactionssample]           | Runs the input conditions against input object metadata properties and designates matched objects in response. x-ms-original-file: specification/storageactions/resource-manager/Microsoft.StorageActions/stable/2023-01-01/examples/misc/PerformStorageTaskActionsPreview.json                                                                                                                                                                                                                                                                               |
| [storageTasksReportListSample.ts][storagetasksreportlistsample]                   | Fetch the storage tasks run report summary for each assignment. x-ms-original-file: specification/storageactions/resource-manager/Microsoft.StorageActions/stable/2023-01-01/examples/storageTasksList/ListStorageTasksRunReportSummary.json                                                                                                                                                                                                                                                                                                                  |
| [storageTasksUpdateSample.ts][storagetasksupdatesample]                           | Update storage task properties x-ms-original-file: specification/storageactions/resource-manager/Microsoft.StorageActions/stable/2023-01-01/examples/storageTasksCrud/PatchStorageTask.json                                                                                                                                                                                                                                                                                                                                                                   |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env STORAGEACTIONS_SUBSCRIPTION_ID="<storageactions subscription id>" node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1-beta/typescript/src/operationsListSample.ts
[storagetaskassignmentlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1-beta/typescript/src/storageTaskAssignmentListSample.ts
[storagetaskscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1-beta/typescript/src/storageTasksCreateSample.ts
[storagetasksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1-beta/typescript/src/storageTasksDeleteSample.ts
[storagetasksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1-beta/typescript/src/storageTasksGetSample.ts
[storagetaskslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1-beta/typescript/src/storageTasksListByResourceGroupSample.ts
[storagetaskslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1-beta/typescript/src/storageTasksListBySubscriptionSample.ts
[storagetaskspreviewactionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1-beta/typescript/src/storageTasksPreviewActionsSample.ts
[storagetasksreportlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1-beta/typescript/src/storageTasksReportListSample.ts
[storagetasksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageactions/arm-storageactions/samples/v1-beta/typescript/src/storageTasksUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-storageactions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storageactions/arm-storageactions/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

# @azure/arm-dell-storage client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-dell-storage in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [fileSystemsCreateOrUpdateSample.ts][filesystemscreateorupdatesample]           | create a FileSystemResource x-ms-original-file: 2025-03-21-preview/FileSystems_CreateOrUpdate_MaximumSet_Gen.json                              |
| [fileSystemsDeleteSample.ts][filesystemsdeletesample]                           | delete a FileSystemResource x-ms-original-file: 2025-03-21-preview/FileSystems_Delete_MaximumSet_Gen.json                                      |
| [fileSystemsGetSample.ts][filesystemsgetsample]                                 | get a FileSystemResource x-ms-original-file: 2025-03-21-preview/FileSystems_Get_MaximumSet_Gen.json                                            |
| [fileSystemsListByResourceGroupSample.ts][filesystemslistbyresourcegroupsample] | list FileSystemResource resources by resource group x-ms-original-file: 2025-03-21-preview/FileSystems_ListByResourceGroup_MaximumSet_Gen.json |
| [fileSystemsListBySubscriptionSample.ts][filesystemslistbysubscriptionsample]   | list FileSystemResource resources by subscription ID x-ms-original-file: 2025-03-21-preview/FileSystems_ListBySubscription_MaximumSet_Gen.json |
| [fileSystemsUpdateSample.ts][filesystemsupdatesample]                           | update a FileSystemResource x-ms-original-file: 2025-03-21-preview/FileSystems_Update_MaximumSet_Gen.json                                      |
| [operationsListSample.ts][operationslistsample]                                 | list the operations for the provider x-ms-original-file: 2025-03-21-preview/Operations_List_MaximumSet_Gen.json                                |

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
node dist/fileSystemsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/fileSystemsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[filesystemscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/typescript/src/fileSystemsCreateOrUpdateSample.ts
[filesystemsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/typescript/src/fileSystemsDeleteSample.ts
[filesystemsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/typescript/src/fileSystemsGetSample.ts
[filesystemslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/typescript/src/fileSystemsListByResourceGroupSample.ts
[filesystemslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/typescript/src/fileSystemsListBySubscriptionSample.ts
[filesystemsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/typescript/src/fileSystemsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-dell-storage?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dell/arm-dell-storage/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

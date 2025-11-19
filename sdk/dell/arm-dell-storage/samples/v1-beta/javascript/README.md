# @azure/arm-dell-storage client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-dell-storage in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [fileSystemsCreateOrUpdateSample.js][filesystemscreateorupdatesample]           | create a FileSystemResource x-ms-original-file: 2025-03-21-preview/FileSystems_CreateOrUpdate_MaximumSet_Gen.json                              |
| [fileSystemsDeleteSample.js][filesystemsdeletesample]                           | delete a FileSystemResource x-ms-original-file: 2025-03-21-preview/FileSystems_Delete_MaximumSet_Gen.json                                      |
| [fileSystemsGetSample.js][filesystemsgetsample]                                 | get a FileSystemResource x-ms-original-file: 2025-03-21-preview/FileSystems_Get_MaximumSet_Gen.json                                            |
| [fileSystemsListByResourceGroupSample.js][filesystemslistbyresourcegroupsample] | list FileSystemResource resources by resource group x-ms-original-file: 2025-03-21-preview/FileSystems_ListByResourceGroup_MaximumSet_Gen.json |
| [fileSystemsListBySubscriptionSample.js][filesystemslistbysubscriptionsample]   | list FileSystemResource resources by subscription ID x-ms-original-file: 2025-03-21-preview/FileSystems_ListBySubscription_MaximumSet_Gen.json |
| [fileSystemsUpdateSample.js][filesystemsupdatesample]                           | update a FileSystemResource x-ms-original-file: 2025-03-21-preview/FileSystems_Update_MaximumSet_Gen.json                                      |
| [operationsListSample.js][operationslistsample]                                 | list the operations for the provider x-ms-original-file: 2025-03-21-preview/Operations_List_MaximumSet_Gen.json                                |

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
node fileSystemsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node fileSystemsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[filesystemscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/javascript/fileSystemsCreateOrUpdateSample.js
[filesystemsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/javascript/fileSystemsDeleteSample.js
[filesystemsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/javascript/fileSystemsGetSample.js
[filesystemslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/javascript/fileSystemsListByResourceGroupSample.js
[filesystemslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/javascript/fileSystemsListBySubscriptionSample.js
[filesystemsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/javascript/fileSystemsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dell/arm-dell-storage/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-dell-storage?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dell/arm-dell-storage/README.md

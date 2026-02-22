# @azure/arm-managedops client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-managedops in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [managedOpsCreateOrUpdateSample.js][managedopscreateorupdatesample] | creates or updates the ManagedOps instance. x-ms-original-file: 2025-07-28-preview/ManagedOps_CreateOrUpdate.json       |
| [managedOpsDeleteSample.js][managedopsdeletesample]                 | deletes the ManagedOps instance. x-ms-original-file: 2025-07-28-preview/ManagedOps_Delete.json                          |
| [managedOpsGetSample.js][managedopsgetsample]                       | gets the information of the ManagedOps instance. x-ms-original-file: 2025-07-28-preview/ManagedOps_Get.json             |
| [managedOpsListSample.js][managedopslistsample]                     | list all ManagedOps instances in the subscription. x-ms-original-file: 2025-07-28-preview/ManagedOps_List.json          |
| [managedOpsUpdateSample.js][managedopsupdatesample]                 | updates the ManagedOps instance with the supplied fields. x-ms-original-file: 2025-07-28-preview/ManagedOps_Update.json |
| [operationsListSample.js][operationslistsample]                     | list the operations for the provider x-ms-original-file: 2025-07-28-preview/Operations_List.json                        |

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
node managedOpsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node managedOpsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[managedopscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedops/arm-managedops/samples/v1-beta/javascript/managedOpsCreateOrUpdateSample.js
[managedopsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedops/arm-managedops/samples/v1-beta/javascript/managedOpsDeleteSample.js
[managedopsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedops/arm-managedops/samples/v1-beta/javascript/managedOpsGetSample.js
[managedopslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedops/arm-managedops/samples/v1-beta/javascript/managedOpsListSample.js
[managedopsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedops/arm-managedops/samples/v1-beta/javascript/managedOpsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedops/arm-managedops/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-managedops?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/managedops/arm-managedops/README.md

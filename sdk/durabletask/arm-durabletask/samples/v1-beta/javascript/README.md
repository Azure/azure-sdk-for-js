# @azure/arm-durabletask client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-durabletask in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                              |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.js][operationslistsample]                               | list the operations for the provider x-ms-original-file: 2024-10-01-preview/Operations_List.json             |
| [schedulersCreateOrUpdateSample.js][schedulerscreateorupdatesample]           | create or update a Scheduler x-ms-original-file: 2024-10-01-preview/Schedulers_CreateOrUpdate.json           |
| [schedulersDeleteSample.js][schedulersdeletesample]                           | delete a Scheduler x-ms-original-file: 2024-10-01-preview/Schedulers_Delete.json                             |
| [schedulersGetSample.js][schedulersgetsample]                                 | get a Scheduler x-ms-original-file: 2024-10-01-preview/Schedulers_Get.json                                   |
| [schedulersListByResourceGroupSample.js][schedulerslistbyresourcegroupsample] | list Schedulers by resource group x-ms-original-file: 2024-10-01-preview/Schedulers_ListByResourceGroup.json |
| [schedulersListBySubscriptionSample.js][schedulerslistbysubscriptionsample]   | list Schedulers by subscription x-ms-original-file: 2024-10-01-preview/Schedulers_ListBySubscription.json    |
| [schedulersUpdateSample.js][schedulersupdatesample]                           | update a Scheduler x-ms-original-file: 2024-10-01-preview/Schedulers_Update.json                             |
| [taskHubsCreateOrUpdateSample.js][taskhubscreateorupdatesample]               | create or Update a Task Hub x-ms-original-file: 2024-10-01-preview/TaskHubs_CreateOrUpdate.json              |
| [taskHubsDeleteSample.js][taskhubsdeletesample]                               | delete a Task Hub x-ms-original-file: 2024-10-01-preview/TaskHubs_Delete.json                                |
| [taskHubsGetSample.js][taskhubsgetsample]                                     | get a Task Hub x-ms-original-file: 2024-10-01-preview/TaskHubs_Get.json                                      |
| [taskHubsListBySchedulerSample.js][taskhubslistbyschedulersample]             | list Task Hubs x-ms-original-file: 2024-10-01-preview/TaskHubs_ListByScheduler.json                          |

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
npx dev-tool run vendored cross-env  node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/operationsListSample.js
[schedulerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersCreateOrUpdateSample.js
[schedulersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersDeleteSample.js
[schedulersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersGetSample.js
[schedulerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersListByResourceGroupSample.js
[schedulerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersListBySubscriptionSample.js
[schedulersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/schedulersUpdateSample.js
[taskhubscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskHubsCreateOrUpdateSample.js
[taskhubsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskHubsDeleteSample.js
[taskhubsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskHubsGetSample.js
[taskhubslistbyschedulersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/durabletask/arm-durabletask/samples/v1-beta/javascript/taskHubsListBySchedulerSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-durabletask?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/durabletask/arm-durabletask/README.md

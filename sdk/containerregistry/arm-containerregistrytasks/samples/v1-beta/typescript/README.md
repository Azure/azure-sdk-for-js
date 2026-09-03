# @azure/arm-containerregistrytasks client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-containerregistrytasks in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                  |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [agentPoolsCreateSample.ts][agentpoolscreatesample]                                   | creates an agent pool for a container registry with the specified parameters. x-ms-original-file: 2025-03-01-preview/AgentPoolsCreate.json                       |
| [agentPoolsDeleteSample.ts][agentpoolsdeletesample]                                   | deletes a specified agent pool resource. x-ms-original-file: 2025-03-01-preview/AgentPoolsDelete.json                                                            |
| [agentPoolsGetQueueStatusSample.ts][agentpoolsgetqueuestatussample]                   | gets the count of queued runs for a given agent pool. x-ms-original-file: 2025-03-01-preview/AgentPoolsGetQueueStatus.json                                       |
| [agentPoolsGetSample.ts][agentpoolsgetsample]                                         | gets the detailed information for a given agent pool. x-ms-original-file: 2025-03-01-preview/AgentPoolsGet.json                                                  |
| [agentPoolsListSample.ts][agentpoolslistsample]                                       | lists all the agent pools for a specified container registry. x-ms-original-file: 2025-03-01-preview/AgentPoolsList.json                                         |
| [agentPoolsUpdateSample.ts][agentpoolsupdatesample]                                   | updates an agent pool with the specified parameters. x-ms-original-file: 2025-03-01-preview/AgentPoolsUpdate.json                                                |
| [registriesGetBuildSourceUploadUrlSample.ts][registriesgetbuildsourceuploadurlsample] | get the upload location for the user to be able to upload the source. x-ms-original-file: 2025-03-01-preview/RegistriesGetBuildSourceUploadUrl.json              |
| [registriesScheduleRunSample.ts][registriesschedulerunsample]                         | schedules a new run based on the request parameters and add it to the run queue. x-ms-original-file: 2025-03-01-preview/RegistriesScheduleRun.json               |
| [runsCancelSample.ts][runscancelsample]                                               | cancel an existing run. x-ms-original-file: 2025-03-01-preview/RunsCancel.json                                                                                   |
| [runsGetLogSasUrlSample.ts][runsgetlogsasurlsample]                                   | gets a link to download the run logs. x-ms-original-file: 2025-03-01-preview/RunsGetLogSasUrl.json                                                               |
| [runsGetSample.ts][runsgetsample]                                                     | gets the detailed information for a given run. x-ms-original-file: 2025-03-01-preview/RunsGet.json                                                               |
| [runsListSample.ts][runslistsample]                                                   | gets all the runs for a registry. x-ms-original-file: 2025-03-01-preview/RunsList.json                                                                           |
| [runsUpdateSample.ts][runsupdatesample]                                               | patch the run properties. x-ms-original-file: 2025-03-01-preview/RunsUpdate.json                                                                                 |
| [taskRunsCreateSample.ts][taskrunscreatesample]                                       | creates a task run for a container registry with the specified parameters. x-ms-original-file: 2025-03-01-preview/TaskRunsCreate.json                            |
| [taskRunsDeleteSample.ts][taskrunsdeletesample]                                       | deletes a specified task run resource. x-ms-original-file: 2025-03-01-preview/TaskRunsDelete.json                                                                |
| [taskRunsGetDetailsSample.ts][taskrunsgetdetailssample]                               | gets the detailed information for a given task run that includes all secrets. x-ms-original-file: 2025-03-01-preview/TaskRunsGetDetails.json                     |
| [taskRunsGetSample.ts][taskrunsgetsample]                                             | gets the detailed information for a given task run. x-ms-original-file: 2025-03-01-preview/TaskRunsGet.json                                                      |
| [taskRunsListSample.ts][taskrunslistsample]                                           | lists all the task runs for a specified container registry. x-ms-original-file: 2025-03-01-preview/TaskRunsList.json                                             |
| [taskRunsUpdateSample.ts][taskrunsupdatesample]                                       | updates a task run with the specified parameters. x-ms-original-file: 2025-03-01-preview/TaskRunsUpdate.json                                                     |
| [tasksCreateSample.ts][taskscreatesample]                                             | creates a task for a container registry with the specified parameters. x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksCreate_WithLoginIdentity.json |
| [tasksDeleteSample.ts][tasksdeletesample]                                             | deletes a specified task. x-ms-original-file: 2025-03-01-preview/TasksDelete.json                                                                                |
| [tasksGetDetailsSample.ts][tasksgetdetailssample]                                     | returns a task with extended information that includes all secrets. x-ms-original-file: 2025-03-01-preview/TasksGetDetails.json                                  |
| [tasksGetSample.ts][tasksgetsample]                                                   | get the properties of a specified task. x-ms-original-file: 2025-03-01-preview/TasksGet.json                                                                     |
| [tasksListSample.ts][taskslistsample]                                                 | lists all the tasks for a specified container registry. x-ms-original-file: 2025-03-01-preview/TasksList.json                                                    |
| [tasksUpdateSample.ts][tasksupdatesample]                                             | updates a task with the specified parameters. x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksUpdate_WithKeyVaultCustomCredentials.json              |

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
node dist/agentPoolsCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/agentPoolsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentpoolscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/agentPoolsCreateSample.ts
[agentpoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/agentPoolsDeleteSample.ts
[agentpoolsgetqueuestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/agentPoolsGetQueueStatusSample.ts
[agentpoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/agentPoolsGetSample.ts
[agentpoolslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/agentPoolsListSample.ts
[agentpoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/agentPoolsUpdateSample.ts
[registriesgetbuildsourceuploadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/registriesGetBuildSourceUploadUrlSample.ts
[registriesschedulerunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/registriesScheduleRunSample.ts
[runscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/runsCancelSample.ts
[runsgetlogsasurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/runsGetLogSasUrlSample.ts
[runsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/runsGetSample.ts
[runslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/runsListSample.ts
[runsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/runsUpdateSample.ts
[taskrunscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/taskRunsCreateSample.ts
[taskrunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/taskRunsDeleteSample.ts
[taskrunsgetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/taskRunsGetDetailsSample.ts
[taskrunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/taskRunsGetSample.ts
[taskrunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/taskRunsListSample.ts
[taskrunsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/taskRunsUpdateSample.ts
[taskscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/tasksCreateSample.ts
[tasksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/tasksDeleteSample.ts
[tasksgetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/tasksGetDetailsSample.ts
[tasksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/tasksGetSample.ts
[taskslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/tasksListSample.ts
[tasksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/typescript/src/tasksUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerregistrytasks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerregistry/arm-containerregistrytasks/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

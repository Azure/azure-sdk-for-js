# @azure/arm-containerregistrytasks client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-containerregistrytasks in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                  |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [agentPoolsCreateSample.js][agentpoolscreatesample]                                   | creates an agent pool for a container registry with the specified parameters. x-ms-original-file: 2025-03-01-preview/AgentPoolsCreate.json                       |
| [agentPoolsDeleteSample.js][agentpoolsdeletesample]                                   | deletes a specified agent pool resource. x-ms-original-file: 2025-03-01-preview/AgentPoolsDelete.json                                                            |
| [agentPoolsGetQueueStatusSample.js][agentpoolsgetqueuestatussample]                   | gets the count of queued runs for a given agent pool. x-ms-original-file: 2025-03-01-preview/AgentPoolsGetQueueStatus.json                                       |
| [agentPoolsGetSample.js][agentpoolsgetsample]                                         | gets the detailed information for a given agent pool. x-ms-original-file: 2025-03-01-preview/AgentPoolsGet.json                                                  |
| [agentPoolsListSample.js][agentpoolslistsample]                                       | lists all the agent pools for a specified container registry. x-ms-original-file: 2025-03-01-preview/AgentPoolsList.json                                         |
| [agentPoolsUpdateSample.js][agentpoolsupdatesample]                                   | updates an agent pool with the specified parameters. x-ms-original-file: 2025-03-01-preview/AgentPoolsUpdate.json                                                |
| [registriesGetBuildSourceUploadUrlSample.js][registriesgetbuildsourceuploadurlsample] | get the upload location for the user to be able to upload the source. x-ms-original-file: 2025-03-01-preview/RegistriesGetBuildSourceUploadUrl.json              |
| [registriesScheduleRunSample.js][registriesschedulerunsample]                         | schedules a new run based on the request parameters and add it to the run queue. x-ms-original-file: 2025-03-01-preview/RegistriesScheduleRun.json               |
| [runsCancelSample.js][runscancelsample]                                               | cancel an existing run. x-ms-original-file: 2025-03-01-preview/RunsCancel.json                                                                                   |
| [runsGetLogSasUrlSample.js][runsgetlogsasurlsample]                                   | gets a link to download the run logs. x-ms-original-file: 2025-03-01-preview/RunsGetLogSasUrl.json                                                               |
| [runsGetSample.js][runsgetsample]                                                     | gets the detailed information for a given run. x-ms-original-file: 2025-03-01-preview/RunsGet.json                                                               |
| [runsListSample.js][runslistsample]                                                   | gets all the runs for a registry. x-ms-original-file: 2025-03-01-preview/RunsList.json                                                                           |
| [runsUpdateSample.js][runsupdatesample]                                               | patch the run properties. x-ms-original-file: 2025-03-01-preview/RunsUpdate.json                                                                                 |
| [taskRunsCreateSample.js][taskrunscreatesample]                                       | creates a task run for a container registry with the specified parameters. x-ms-original-file: 2025-03-01-preview/TaskRunsCreate.json                            |
| [taskRunsDeleteSample.js][taskrunsdeletesample]                                       | deletes a specified task run resource. x-ms-original-file: 2025-03-01-preview/TaskRunsDelete.json                                                                |
| [taskRunsGetDetailsSample.js][taskrunsgetdetailssample]                               | gets the detailed information for a given task run that includes all secrets. x-ms-original-file: 2025-03-01-preview/TaskRunsGetDetails.json                     |
| [taskRunsGetSample.js][taskrunsgetsample]                                             | gets the detailed information for a given task run. x-ms-original-file: 2025-03-01-preview/TaskRunsGet.json                                                      |
| [taskRunsListSample.js][taskrunslistsample]                                           | lists all the task runs for a specified container registry. x-ms-original-file: 2025-03-01-preview/TaskRunsList.json                                             |
| [taskRunsUpdateSample.js][taskrunsupdatesample]                                       | updates a task run with the specified parameters. x-ms-original-file: 2025-03-01-preview/TaskRunsUpdate.json                                                     |
| [tasksCreateSample.js][taskscreatesample]                                             | creates a task for a container registry with the specified parameters. x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksCreate_WithLoginIdentity.json |
| [tasksDeleteSample.js][tasksdeletesample]                                             | deletes a specified task. x-ms-original-file: 2025-03-01-preview/TasksDelete.json                                                                                |
| [tasksGetDetailsSample.js][tasksgetdetailssample]                                     | returns a task with extended information that includes all secrets. x-ms-original-file: 2025-03-01-preview/TasksGetDetails.json                                  |
| [tasksGetSample.js][tasksgetsample]                                                   | get the properties of a specified task. x-ms-original-file: 2025-03-01-preview/TasksGet.json                                                                     |
| [tasksListSample.js][taskslistsample]                                                 | lists all the tasks for a specified container registry. x-ms-original-file: 2025-03-01-preview/TasksList.json                                                    |
| [tasksUpdateSample.js][tasksupdatesample]                                             | updates a task with the specified parameters. x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksUpdate_WithKeyVaultCustomCredentials.json              |

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
node agentPoolsCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node agentPoolsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentpoolscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/agentPoolsCreateSample.js
[agentpoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/agentPoolsDeleteSample.js
[agentpoolsgetqueuestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/agentPoolsGetQueueStatusSample.js
[agentpoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/agentPoolsGetSample.js
[agentpoolslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/agentPoolsListSample.js
[agentpoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/agentPoolsUpdateSample.js
[registriesgetbuildsourceuploadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/registriesGetBuildSourceUploadUrlSample.js
[registriesschedulerunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/registriesScheduleRunSample.js
[runscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/runsCancelSample.js
[runsgetlogsasurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/runsGetLogSasUrlSample.js
[runsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/runsGetSample.js
[runslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/runsListSample.js
[runsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/runsUpdateSample.js
[taskrunscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/taskRunsCreateSample.js
[taskrunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/taskRunsDeleteSample.js
[taskrunsgetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/taskRunsGetDetailsSample.js
[taskrunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/taskRunsGetSample.js
[taskrunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/taskRunsListSample.js
[taskrunsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/taskRunsUpdateSample.js
[taskscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/tasksCreateSample.js
[tasksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/tasksDeleteSample.js
[tasksgetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/tasksGetDetailsSample.js
[tasksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/tasksGetSample.js
[taskslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/tasksListSample.js
[tasksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistrytasks/samples/v1-beta/javascript/tasksUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerregistrytasks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerregistry/arm-containerregistrytasks/README.md

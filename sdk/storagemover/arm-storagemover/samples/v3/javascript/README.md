# @azure/arm-storagemover client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-storagemover in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                            |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agentsCreateOrUpdateSample.js][agentscreateorupdatesample]                       | creates or updates an Agent resource, which references a hybrid compute machine that can run jobs. x-ms-original-file: 2025-07-01/Agents_CreateOrUpdate_MaximumSet.json                    |
| [agentsDeleteSample.js][agentsdeletesample]                                       | deletes an Agent resource. x-ms-original-file: 2025-07-01/Agents_Delete.json                                                                                                               |
| [agentsGetSample.js][agentsgetsample]                                             | gets an Agent resource. x-ms-original-file: 2025-07-01/Agents_Get_MaximumSet.json                                                                                                          |
| [agentsListSample.js][agentslistsample]                                           | lists all Agents in a Storage Mover. x-ms-original-file: 2025-07-01/Agents_List_MaximumSet.json                                                                                            |
| [agentsUpdateSample.js][agentsupdatesample]                                       | creates or updates an Agent resource. x-ms-original-file: 2025-07-01/Agents_Update.json                                                                                                    |
| [endpointsCreateOrUpdateSample.js][endpointscreateorupdatesample]                 | creates or updates an Endpoint resource, which represents a data transfer source or destination. x-ms-original-file: 2025-07-01/Endpoints_CreateOrUpdate_AzureMultiCloudConnector.json     |
| [endpointsDeleteSample.js][endpointsdeletesample]                                 | deletes an Endpoint resource. x-ms-original-file: 2025-07-01/Endpoints_Delete.json                                                                                                         |
| [endpointsGetSample.js][endpointsgetsample]                                       | gets an Endpoint resource. x-ms-original-file: 2025-07-01/Endpoints_Get_AzureMultiCloudConnector.json                                                                                      |
| [endpointsListSample.js][endpointslistsample]                                     | lists all Endpoints in a Storage Mover. x-ms-original-file: 2025-07-01/Endpoints_List.json                                                                                                 |
| [endpointsUpdateSample.js][endpointsupdatesample]                                 | updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged. x-ms-original-file: 2025-07-01/Endpoints_Update_AzureMultiCloudConnector.json |
| [jobDefinitionsCreateOrUpdateSample.js][jobdefinitionscreateorupdatesample]       | creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer. x-ms-original-file: 2025-07-01/JobDefinitions_CreateOrUpdate.json   |
| [jobDefinitionsDeleteSample.js][jobdefinitionsdeletesample]                       | deletes a Job Definition resource. x-ms-original-file: 2025-07-01/JobDefinitions_Delete.json                                                                                               |
| [jobDefinitionsGetSample.js][jobdefinitionsgetsample]                             | gets a Job Definition resource. x-ms-original-file: 2025-07-01/JobDefinitions_Get.json                                                                                                     |
| [jobDefinitionsListSample.js][jobdefinitionslistsample]                           | lists all Job Definitions in a Project. x-ms-original-file: 2025-07-01/JobDefinitions_List.json                                                                                            |
| [jobDefinitionsStartJobSample.js][jobdefinitionsstartjobsample]                   | creates a new Job Run resource for the specified Job Definition and passes it to the Agent for execution. x-ms-original-file: 2025-07-01/JobDefinitions_StartJob.json                      |
| [jobDefinitionsStopJobSample.js][jobdefinitionsstopjobsample]                     | requests the Agent of any active instance of this Job Definition to stop. x-ms-original-file: 2025-07-01/JobDefinitions_StopJob.json                                                       |
| [jobDefinitionsUpdateSample.js][jobdefinitionsupdatesample]                       | updates properties for a Job Definition resource. Properties not specified in the request body will be unchanged. x-ms-original-file: 2025-07-01/JobDefinitions_Update.json                |
| [jobRunsGetSample.js][jobrunsgetsample]                                           | gets a Job Run resource. x-ms-original-file: 2025-07-01/JobRuns_Get.json                                                                                                                   |
| [jobRunsListSample.js][jobrunslistsample]                                         | lists all Job Runs in a Job Definition. x-ms-original-file: 2025-07-01/JobRuns_List.json                                                                                                   |
| [operationsListSample.js][operationslistsample]                                   | list the operations for the provider x-ms-original-file: 2025-07-01/Operations_List.json                                                                                                   |
| [projectsCreateOrUpdateSample.js][projectscreateorupdatesample]                   | creates or updates a Project resource, which is a logical grouping of related jobs. x-ms-original-file: 2025-07-01/Projects_CreateOrUpdate.json                                            |
| [projectsDeleteSample.js][projectsdeletesample]                                   | deletes a Project resource. x-ms-original-file: 2025-07-01/Projects_Delete.json                                                                                                            |
| [projectsGetSample.js][projectsgetsample]                                         | gets a Project resource. x-ms-original-file: 2025-07-01/Projects_Get.json                                                                                                                  |
| [projectsListSample.js][projectslistsample]                                       | lists all Projects in a Storage Mover. x-ms-original-file: 2025-07-01/Projects_List.json                                                                                                   |
| [projectsUpdateSample.js][projectsupdatesample]                                   | updates properties for a Project resource. Properties not specified in the request body will be unchanged. x-ms-original-file: 2025-07-01/Projects_Update.json                             |
| [storageMoversCreateOrUpdateSample.js][storagemoverscreateorupdatesample]         | creates or updates a top-level Storage Mover resource. x-ms-original-file: 2025-07-01/StorageMovers_CreateOrUpdate.json                                                                    |
| [storageMoversDeleteSample.js][storagemoversdeletesample]                         | deletes a Storage Mover resource. x-ms-original-file: 2025-07-01/StorageMovers_Delete.json                                                                                                 |
| [storageMoversGetSample.js][storagemoversgetsample]                               | gets a Storage Mover resource. x-ms-original-file: 2025-07-01/StorageMovers_Get.json                                                                                                       |
| [storageMoversListBySubscriptionSample.js][storagemoverslistbysubscriptionsample] | lists all Storage Movers in a subscription. x-ms-original-file: 2025-07-01/StorageMovers_ListBySubscription.json                                                                           |
| [storageMoversListSample.js][storagemoverslistsample]                             | lists all Storage Movers in a resource group. x-ms-original-file: 2025-07-01/StorageMovers_List.json                                                                                       |
| [storageMoversUpdateSample.js][storagemoversupdatesample]                         | updates properties for a Storage Mover resource. Properties not specified in the request body will be unchanged. x-ms-original-file: 2025-07-01/StorageMovers_Update.json                  |

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
node agentsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node agentsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/agentsCreateOrUpdateSample.js
[agentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/agentsDeleteSample.js
[agentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/agentsGetSample.js
[agentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/agentsListSample.js
[agentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/agentsUpdateSample.js
[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/endpointsCreateOrUpdateSample.js
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/endpointsDeleteSample.js
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/endpointsGetSample.js
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/endpointsListSample.js
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/endpointsUpdateSample.js
[jobdefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/jobDefinitionsCreateOrUpdateSample.js
[jobdefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/jobDefinitionsDeleteSample.js
[jobdefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/jobDefinitionsGetSample.js
[jobdefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/jobDefinitionsListSample.js
[jobdefinitionsstartjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/jobDefinitionsStartJobSample.js
[jobdefinitionsstopjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/jobDefinitionsStopJobSample.js
[jobdefinitionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/jobDefinitionsUpdateSample.js
[jobrunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/jobRunsGetSample.js
[jobrunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/jobRunsListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/operationsListSample.js
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/projectsCreateOrUpdateSample.js
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/projectsDeleteSample.js
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/projectsGetSample.js
[projectslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/projectsListSample.js
[projectsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/projectsUpdateSample.js
[storagemoverscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/storageMoversCreateOrUpdateSample.js
[storagemoversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/storageMoversDeleteSample.js
[storagemoversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/storageMoversGetSample.js
[storagemoverslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/storageMoversListBySubscriptionSample.js
[storagemoverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/storageMoversListSample.js
[storagemoversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/javascript/storageMoversUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-storagemover?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storagemover/arm-storagemover/README.md

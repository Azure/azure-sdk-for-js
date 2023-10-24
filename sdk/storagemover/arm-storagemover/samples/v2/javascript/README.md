# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agentsCreateOrUpdateSample.js][agentscreateorupdatesample]                       | Creates or updates an Agent resource, which references a hybrid compute machine that can run jobs. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Agents_CreateOrUpdate.json                                |
| [agentsDeleteSample.js][agentsdeletesample]                                       | Deletes an Agent resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Agents_Delete.json                                                                                                                |
| [agentsGetSample.js][agentsgetsample]                                             | Gets an Agent resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Agents_Get.json                                                                                                                      |
| [agentsListSample.js][agentslistsample]                                           | Lists all Agents in a Storage Mover. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Agents_List.json                                                                                                        |
| [agentsUpdateSample.js][agentsupdatesample]                                       | Creates or updates an Agent resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Agents_Update.json                                                                                                     |
| [endpointsCreateOrUpdateSample.js][endpointscreateorupdatesample]                 | Creates or updates an Endpoint resource, which represents a data transfer source or destination. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Endpoints_CreateOrUpdate_AzureStorageBlobContainer.json     |
| [endpointsDeleteSample.js][endpointsdeletesample]                                 | Deletes an Endpoint resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Endpoints_Delete.json                                                                                                          |
| [endpointsGetSample.js][endpointsgetsample]                                       | Gets an Endpoint resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Endpoints_Get_AzureStorageBlobContainer.json                                                                                      |
| [endpointsListSample.js][endpointslistsample]                                     | Lists all Endpoints in a Storage Mover. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Endpoints_List.json                                                                                                  |
| [endpointsUpdateSample.js][endpointsupdatesample]                                 | Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Endpoints_Update_AzureStorageBlobContainer.json |
| [jobDefinitionsCreateOrUpdateSample.js][jobdefinitionscreateorupdatesample]       | Creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/JobDefinitions_CreateOrUpdate.json    |
| [jobDefinitionsDeleteSample.js][jobdefinitionsdeletesample]                       | Deletes a Job Definition resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/JobDefinitions_Delete.json                                                                                                |
| [jobDefinitionsGetSample.js][jobdefinitionsgetsample]                             | Gets a Job Definition resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/JobDefinitions_Get.json                                                                                                      |
| [jobDefinitionsListSample.js][jobdefinitionslistsample]                           | Lists all Job Definitions in a Project. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/JobDefinitions_List.json                                                                                             |
| [jobDefinitionsStartJobSample.js][jobdefinitionsstartjobsample]                   | Requests an Agent to start a new instance of this Job Definition, generating a new Job Run resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/JobDefinitions_StartJob.json                            |
| [jobDefinitionsStopJobSample.js][jobdefinitionsstopjobsample]                     | Requests the Agent of any active instance of this Job Definition to stop. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/JobDefinitions_StopJob.json                                                        |
| [jobDefinitionsUpdateSample.js][jobdefinitionsupdatesample]                       | Updates properties for a Job Definition resource. Properties not specified in the request body will be unchanged. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/JobDefinitions_Update.json                 |
| [jobRunsGetSample.js][jobrunsgetsample]                                           | Gets a Job Run resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/JobRuns_Get.json                                                                                                                    |
| [jobRunsListSample.js][jobrunslistsample]                                         | Lists all Job Runs in a Job Definition. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/JobRuns_List.json                                                                                                    |
| [operationsListSample.js][operationslistsample]                                   | Lists all the supported operations for the Azure Storage Mover REST API. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Operations_List.json                                                                |
| [projectsCreateOrUpdateSample.js][projectscreateorupdatesample]                   | Creates or updates a Project resource, which is a logical grouping of related jobs. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Projects_CreateOrUpdate.json                                             |
| [projectsDeleteSample.js][projectsdeletesample]                                   | Deletes a Project resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Projects_Delete.json                                                                                                             |
| [projectsGetSample.js][projectsgetsample]                                         | Gets a Project resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Projects_Get.json                                                                                                                   |
| [projectsListSample.js][projectslistsample]                                       | Lists all Projects in a Storage Mover. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Projects_List.json                                                                                                    |
| [projectsUpdateSample.js][projectsupdatesample]                                   | Updates properties for a Project resource. Properties not specified in the request body will be unchanged. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/Projects_Update.json                              |
| [storageMoversCreateOrUpdateSample.js][storagemoverscreateorupdatesample]         | Creates or updates a top-level Storage Mover resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/StorageMovers_CreateOrUpdate.json                                                                     |
| [storageMoversDeleteSample.js][storagemoversdeletesample]                         | Deletes a Storage Mover resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/StorageMovers_Delete.json                                                                                                  |
| [storageMoversGetSample.js][storagemoversgetsample]                               | Gets a Storage Mover resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/StorageMovers_Get.json                                                                                                        |
| [storageMoversListBySubscriptionSample.js][storagemoverslistbysubscriptionsample] | Lists all Storage Movers in a subscription. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/StorageMovers_ListBySubscription.json                                                                            |
| [storageMoversListSample.js][storagemoverslistsample]                             | Lists all Storage Movers in a resource group. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/StorageMovers_List.json                                                                                        |
| [storageMoversUpdateSample.js][storagemoversupdatesample]                         | Updates properties for a Storage Mover resource. Properties not specified in the request body will be unchanged. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2023-10-01/examples/StorageMovers_Update.json                   |

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
npx cross-env STORAGEMOVER_SUBSCRIPTION_ID="<storagemover subscription id>" STORAGEMOVER_RESOURCE_GROUP="<storagemover resource group>" node agentsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/agentsCreateOrUpdateSample.js
[agentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/agentsDeleteSample.js
[agentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/agentsGetSample.js
[agentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/agentsListSample.js
[agentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/agentsUpdateSample.js
[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/endpointsCreateOrUpdateSample.js
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/endpointsDeleteSample.js
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/endpointsGetSample.js
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/endpointsListSample.js
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/endpointsUpdateSample.js
[jobdefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/jobDefinitionsCreateOrUpdateSample.js
[jobdefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/jobDefinitionsDeleteSample.js
[jobdefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/jobDefinitionsGetSample.js
[jobdefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/jobDefinitionsListSample.js
[jobdefinitionsstartjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/jobDefinitionsStartJobSample.js
[jobdefinitionsstopjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/jobDefinitionsStopJobSample.js
[jobdefinitionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/jobDefinitionsUpdateSample.js
[jobrunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/jobRunsGetSample.js
[jobrunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/jobRunsListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/operationsListSample.js
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/projectsCreateOrUpdateSample.js
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/projectsDeleteSample.js
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/projectsGetSample.js
[projectslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/projectsListSample.js
[projectsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/projectsUpdateSample.js
[storagemoverscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/storageMoversCreateOrUpdateSample.js
[storagemoversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/storageMoversDeleteSample.js
[storagemoversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/storageMoversGetSample.js
[storagemoverslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/storageMoversListBySubscriptionSample.js
[storagemoverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/storageMoversListSample.js
[storagemoversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v2/javascript/storageMoversUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-storagemover?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storagemover/arm-storagemover/README.md

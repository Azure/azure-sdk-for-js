# @azure/arm-storagemover client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-storagemover in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                            |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agentsCreateOrUpdateSample.ts][agentscreateorupdatesample]                       | creates or updates an Agent resource, which references a hybrid compute machine that can run jobs. x-ms-original-file: 2025-07-01/Agents_CreateOrUpdate_MaximumSet.json                    |
| [agentsDeleteSample.ts][agentsdeletesample]                                       | deletes an Agent resource. x-ms-original-file: 2025-07-01/Agents_Delete.json                                                                                                               |
| [agentsGetSample.ts][agentsgetsample]                                             | gets an Agent resource. x-ms-original-file: 2025-07-01/Agents_Get_MaximumSet.json                                                                                                          |
| [agentsListSample.ts][agentslistsample]                                           | lists all Agents in a Storage Mover. x-ms-original-file: 2025-07-01/Agents_List_MaximumSet.json                                                                                            |
| [agentsUpdateSample.ts][agentsupdatesample]                                       | creates or updates an Agent resource. x-ms-original-file: 2025-07-01/Agents_Update.json                                                                                                    |
| [endpointsCreateOrUpdateSample.ts][endpointscreateorupdatesample]                 | creates or updates an Endpoint resource, which represents a data transfer source or destination. x-ms-original-file: 2025-07-01/Endpoints_CreateOrUpdate_AzureMultiCloudConnector.json     |
| [endpointsDeleteSample.ts][endpointsdeletesample]                                 | deletes an Endpoint resource. x-ms-original-file: 2025-07-01/Endpoints_Delete.json                                                                                                         |
| [endpointsGetSample.ts][endpointsgetsample]                                       | gets an Endpoint resource. x-ms-original-file: 2025-07-01/Endpoints_Get_AzureMultiCloudConnector.json                                                                                      |
| [endpointsListSample.ts][endpointslistsample]                                     | lists all Endpoints in a Storage Mover. x-ms-original-file: 2025-07-01/Endpoints_List.json                                                                                                 |
| [endpointsUpdateSample.ts][endpointsupdatesample]                                 | updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged. x-ms-original-file: 2025-07-01/Endpoints_Update_AzureMultiCloudConnector.json |
| [jobDefinitionsCreateOrUpdateSample.ts][jobdefinitionscreateorupdatesample]       | creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer. x-ms-original-file: 2025-07-01/JobDefinitions_CreateOrUpdate.json   |
| [jobDefinitionsDeleteSample.ts][jobdefinitionsdeletesample]                       | deletes a Job Definition resource. x-ms-original-file: 2025-07-01/JobDefinitions_Delete.json                                                                                               |
| [jobDefinitionsGetSample.ts][jobdefinitionsgetsample]                             | gets a Job Definition resource. x-ms-original-file: 2025-07-01/JobDefinitions_Get.json                                                                                                     |
| [jobDefinitionsListSample.ts][jobdefinitionslistsample]                           | lists all Job Definitions in a Project. x-ms-original-file: 2025-07-01/JobDefinitions_List.json                                                                                            |
| [jobDefinitionsStartJobSample.ts][jobdefinitionsstartjobsample]                   | creates a new Job Run resource for the specified Job Definition and passes it to the Agent for execution. x-ms-original-file: 2025-07-01/JobDefinitions_StartJob.json                      |
| [jobDefinitionsStopJobSample.ts][jobdefinitionsstopjobsample]                     | requests the Agent of any active instance of this Job Definition to stop. x-ms-original-file: 2025-07-01/JobDefinitions_StopJob.json                                                       |
| [jobDefinitionsUpdateSample.ts][jobdefinitionsupdatesample]                       | updates properties for a Job Definition resource. Properties not specified in the request body will be unchanged. x-ms-original-file: 2025-07-01/JobDefinitions_Update.json                |
| [jobRunsGetSample.ts][jobrunsgetsample]                                           | gets a Job Run resource. x-ms-original-file: 2025-07-01/JobRuns_Get.json                                                                                                                   |
| [jobRunsListSample.ts][jobrunslistsample]                                         | lists all Job Runs in a Job Definition. x-ms-original-file: 2025-07-01/JobRuns_List.json                                                                                                   |
| [operationsListSample.ts][operationslistsample]                                   | list the operations for the provider x-ms-original-file: 2025-07-01/Operations_List.json                                                                                                   |
| [projectsCreateOrUpdateSample.ts][projectscreateorupdatesample]                   | creates or updates a Project resource, which is a logical grouping of related jobs. x-ms-original-file: 2025-07-01/Projects_CreateOrUpdate.json                                            |
| [projectsDeleteSample.ts][projectsdeletesample]                                   | deletes a Project resource. x-ms-original-file: 2025-07-01/Projects_Delete.json                                                                                                            |
| [projectsGetSample.ts][projectsgetsample]                                         | gets a Project resource. x-ms-original-file: 2025-07-01/Projects_Get.json                                                                                                                  |
| [projectsListSample.ts][projectslistsample]                                       | lists all Projects in a Storage Mover. x-ms-original-file: 2025-07-01/Projects_List.json                                                                                                   |
| [projectsUpdateSample.ts][projectsupdatesample]                                   | updates properties for a Project resource. Properties not specified in the request body will be unchanged. x-ms-original-file: 2025-07-01/Projects_Update.json                             |
| [storageMoversCreateOrUpdateSample.ts][storagemoverscreateorupdatesample]         | creates or updates a top-level Storage Mover resource. x-ms-original-file: 2025-07-01/StorageMovers_CreateOrUpdate.json                                                                    |
| [storageMoversDeleteSample.ts][storagemoversdeletesample]                         | deletes a Storage Mover resource. x-ms-original-file: 2025-07-01/StorageMovers_Delete.json                                                                                                 |
| [storageMoversGetSample.ts][storagemoversgetsample]                               | gets a Storage Mover resource. x-ms-original-file: 2025-07-01/StorageMovers_Get.json                                                                                                       |
| [storageMoversListBySubscriptionSample.ts][storagemoverslistbysubscriptionsample] | lists all Storage Movers in a subscription. x-ms-original-file: 2025-07-01/StorageMovers_ListBySubscription.json                                                                           |
| [storageMoversListSample.ts][storagemoverslistsample]                             | lists all Storage Movers in a resource group. x-ms-original-file: 2025-07-01/StorageMovers_List.json                                                                                       |
| [storageMoversUpdateSample.ts][storagemoversupdatesample]                         | updates properties for a Storage Mover resource. Properties not specified in the request body will be unchanged. x-ms-original-file: 2025-07-01/StorageMovers_Update.json                  |

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
node dist/agentsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/agentsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/agentsCreateOrUpdateSample.ts
[agentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/agentsDeleteSample.ts
[agentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/agentsGetSample.ts
[agentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/agentsListSample.ts
[agentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/agentsUpdateSample.ts
[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/endpointsCreateOrUpdateSample.ts
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/endpointsDeleteSample.ts
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/endpointsGetSample.ts
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/endpointsListSample.ts
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/endpointsUpdateSample.ts
[jobdefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/jobDefinitionsCreateOrUpdateSample.ts
[jobdefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/jobDefinitionsDeleteSample.ts
[jobdefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/jobDefinitionsGetSample.ts
[jobdefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/jobDefinitionsListSample.ts
[jobdefinitionsstartjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/jobDefinitionsStartJobSample.ts
[jobdefinitionsstopjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/jobDefinitionsStopJobSample.ts
[jobdefinitionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/jobDefinitionsUpdateSample.ts
[jobrunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/jobRunsGetSample.ts
[jobrunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/jobRunsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/operationsListSample.ts
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/projectsCreateOrUpdateSample.ts
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/projectsDeleteSample.ts
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/projectsGetSample.ts
[projectslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/projectsListSample.ts
[projectsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/projectsUpdateSample.ts
[storagemoverscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/storageMoversCreateOrUpdateSample.ts
[storagemoversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/storageMoversDeleteSample.ts
[storagemoversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/storageMoversGetSample.ts
[storagemoverslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/storageMoversListBySubscriptionSample.ts
[storagemoverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/storageMoversListSample.ts
[storagemoversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v3/typescript/src/storageMoversUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-storagemover?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storagemover/arm-storagemover/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

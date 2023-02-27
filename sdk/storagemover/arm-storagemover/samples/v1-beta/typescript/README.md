# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agentsCreateOrUpdateSample.ts][agentscreateorupdatesample]                       | Creates or updates an Agent resource, which references a hybrid compute machine that can run jobs. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Agents_CreateOrUpdate.json                             |
| [agentsDeleteSample.ts][agentsdeletesample]                                       | Deletes an Agent resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Agents_Delete.json                                                                                                             |
| [agentsGetSample.ts][agentsgetsample]                                             | Gets an Agent resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Agents_Get.json                                                                                                                   |
| [agentsListSample.ts][agentslistsample]                                           | Lists all Agents in a Storage Mover. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Agents_List.json                                                                                                     |
| [agentsUpdateSample.ts][agentsupdatesample]                                       | Creates or updates an Agent resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Agents_Update.json                                                                                                  |
| [endpointsCreateOrUpdateSample.ts][endpointscreateorupdatesample]                 | Creates or updates an Endpoint resource, which represents a data transfer source or destination. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Endpoints_CreateOrUpdate.json                            |
| [endpointsDeleteSample.ts][endpointsdeletesample]                                 | Deletes an Endpoint resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Endpoints_Delete.json                                                                                                       |
| [endpointsGetSample.ts][endpointsgetsample]                                       | Gets an Endpoint resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Endpoints_Get.json                                                                                                             |
| [endpointsListSample.ts][endpointslistsample]                                     | Lists all Endpoints in a Storage Mover. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Endpoints_List.json                                                                                               |
| [endpointsUpdateSample.ts][endpointsupdatesample]                                 | Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Endpoints_Update.json                        |
| [jobDefinitionsCreateOrUpdateSample.ts][jobdefinitionscreateorupdatesample]       | Creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/JobDefinitions_CreateOrUpdate.json |
| [jobDefinitionsDeleteSample.ts][jobdefinitionsdeletesample]                       | Deletes a Job Definition resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/JobDefinitions_Delete.json                                                                                             |
| [jobDefinitionsGetSample.ts][jobdefinitionsgetsample]                             | Gets a Job Definition resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/JobDefinitions_Get.json                                                                                                   |
| [jobDefinitionsListSample.ts][jobdefinitionslistsample]                           | Lists all Job Definitions in a Project. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/JobDefinitions_List.json                                                                                          |
| [jobDefinitionsStartJobSample.ts][jobdefinitionsstartjobsample]                   | Requests an Agent to start a new instance of this Job Definition, generating a new Job Run resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/JobDefinitions_StartJob.json                         |
| [jobDefinitionsStopJobSample.ts][jobdefinitionsstopjobsample]                     | Requests the Agent of any active instance of this Job Definition to stop. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/JobDefinitions_StopJob.json                                                     |
| [jobDefinitionsUpdateSample.ts][jobdefinitionsupdatesample]                       | Updates properties for a Job Definition resource. Properties not specified in the request body will be unchanged. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/JobDefinitions_Update.json              |
| [jobRunsGetSample.ts][jobrunsgetsample]                                           | Gets a Job Run resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/JobRuns_Get.json                                                                                                                 |
| [jobRunsListSample.ts][jobrunslistsample]                                         | Lists all Job Runs in a Job Definition. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/JobRuns_List.json                                                                                                 |
| [operationsListSample.ts][operationslistsample]                                   | Lists all the supported operations for the Azure Storage Mover REST API. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Operations_List.json                                                             |
| [projectsCreateOrUpdateSample.ts][projectscreateorupdatesample]                   | Creates or updates a Project resource, which is a logical grouping of related jobs. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Projects_CreateOrUpdate.json                                          |
| [projectsDeleteSample.ts][projectsdeletesample]                                   | Deletes a Project resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Projects_Delete.json                                                                                                          |
| [projectsGetSample.ts][projectsgetsample]                                         | Gets a Project resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Projects_Get.json                                                                                                                |
| [projectsListSample.ts][projectslistsample]                                       | Lists all Projects in a Storage Mover. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Projects_List.json                                                                                                 |
| [projectsUpdateSample.ts][projectsupdatesample]                                   | Updates properties for a Project resource. Properties not specified in the request body will be unchanged. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/Projects_Update.json                           |
| [storageMoversCreateOrUpdateSample.ts][storagemoverscreateorupdatesample]         | Creates or updates a top-level Storage Mover resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/StorageMovers_CreateOrUpdate.json                                                                  |
| [storageMoversDeleteSample.ts][storagemoversdeletesample]                         | Deletes a Storage Mover resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/StorageMovers_Delete.json                                                                                               |
| [storageMoversGetSample.ts][storagemoversgetsample]                               | Gets a Storage Mover resource. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/StorageMovers_Get.json                                                                                                     |
| [storageMoversListBySubscriptionSample.ts][storagemoverslistbysubscriptionsample] | Lists all Storage Movers in a subscription. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/StorageMovers_ListBySubscription.json                                                                         |
| [storageMoversListSample.ts][storagemoverslistsample]                             | Lists all Storage Movers in a resource group. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/StorageMovers_List.json                                                                                     |
| [storageMoversUpdateSample.ts][storagemoversupdatesample]                         | Updates properties for a Storage Mover resource. Properties not specified in the request body will be unchanged. x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/preview/2022-07-01-preview/examples/StorageMovers_Update.json                |

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
npx cross-env STORAGEMOVER_SUBSCRIPTION_ID="<storagemover subscription id>" STORAGEMOVER_RESOURCE_GROUP="<storagemover resource group>" node dist/agentsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/agentsCreateOrUpdateSample.ts
[agentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/agentsDeleteSample.ts
[agentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/agentsGetSample.ts
[agentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/agentsListSample.ts
[agentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/agentsUpdateSample.ts
[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/endpointsCreateOrUpdateSample.ts
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/endpointsDeleteSample.ts
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/endpointsGetSample.ts
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/endpointsListSample.ts
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/endpointsUpdateSample.ts
[jobdefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/jobDefinitionsCreateOrUpdateSample.ts
[jobdefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/jobDefinitionsDeleteSample.ts
[jobdefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/jobDefinitionsGetSample.ts
[jobdefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/jobDefinitionsListSample.ts
[jobdefinitionsstartjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/jobDefinitionsStartJobSample.ts
[jobdefinitionsstopjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/jobDefinitionsStopJobSample.ts
[jobdefinitionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/jobDefinitionsUpdateSample.ts
[jobrunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/jobRunsGetSample.ts
[jobrunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/jobRunsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/operationsListSample.ts
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/projectsCreateOrUpdateSample.ts
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/projectsDeleteSample.ts
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/projectsGetSample.ts
[projectslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/projectsListSample.ts
[projectsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/projectsUpdateSample.ts
[storagemoverscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/storageMoversCreateOrUpdateSample.ts
[storagemoversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/storageMoversDeleteSample.ts
[storagemoversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/storageMoversGetSample.ts
[storagemoverslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/storageMoversListBySubscriptionSample.ts
[storagemoverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/storageMoversListSample.ts
[storagemoversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagemover/arm-storagemover/samples/v1-beta/typescript/src/storageMoversUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-storagemover?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storagemover/arm-storagemover/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

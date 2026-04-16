---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-communication-services
urlFragment: communication-job-router-typescript-beta
---

# Azure client library for Azure Communication Job Router services client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure client library for Azure Communication Job Router services in some common scenarios.

| **File Name**                                                 | **Description**                                                                           |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [ClassificationPolicy_Create.ts][classificationpolicy_create] | Classification policy crud                                                                |
| [ClassificationPolicy_Delete.ts][classificationpolicy_delete] | Classification policy crud                                                                |
| [ClassificationPolicy_Get.ts][classificationpolicy_get]       | Classification policy crud                                                                |
| [ClassificationPolicy_List.ts][classificationpolicy_list]     | Classification policy crud                                                                |
| [ClassificationPolicy_Update.ts][classificationpolicy_update] | Classification policy crud                                                                |
| [DistributionPolicy_Create.ts][distributionpolicy_create]     | Distribution policy crud                                                                  |
| [DistributionPolicy_Delete.ts][distributionpolicy_delete]     | Distribution policy crud                                                                  |
| [DistributionPolicy_Get.ts][distributionpolicy_get]           | Distribution policy crud                                                                  |
| [DistributionPolicy_List.ts][distributionpolicy_list]         | Distribution policy crud                                                                  |
| [DistributionPolicy_Update.ts][distributionpolicy_update]     | Distribution policy crud                                                                  |
| [ExceptionPolicy_Create.ts][exceptionpolicy_create]           | Exception policy crud                                                                     |
| [ExceptionPolicy_Delete.ts][exceptionpolicy_delete]           | Exception policy crud                                                                     |
| [ExceptionPolicy_Get.ts][exceptionpolicy_get]                 | Exception policy crud                                                                     |
| [ExceptionPolicy_List.ts][exceptionpolicy_list]               | Exception policy crud                                                                     |
| [ExceptionPolicy_Update.ts][exceptionpolicy_update]           | Exception policy crud                                                                     |
| [QuickStart.ts][quickstart]                                   | Quick start workflow for creating queue, job and worker, routing/matching job with worker |
| [RouterJob_Create.ts][routerjob_create]                       | router job crud                                                                           |
| [RouterJob_Delete.ts][routerjob_delete]                       | router job crud                                                                           |
| [RouterJob_Get.ts][routerjob_get]                             | router job crud                                                                           |
| [RouterJob_List.ts][routerjob_list]                           | router job crud                                                                           |
| [RouterJob_Update.ts][routerjob_update]                       | router job crud                                                                           |
| [RouterQueue_Create.ts][routerqueue_create]                   | job queue crud                                                                            |
| [RouterQueue_Delete.ts][routerqueue_delete]                   | job queue crud                                                                            |
| [RouterQueue_Get.ts][routerqueue_get]                         | job queue crud                                                                            |
| [RouterQueue_GetStatistics.ts][routerqueue_getstatistics]     | job queue crud                                                                            |
| [RouterQueue_List.ts][routerqueue_list]                       | job queue crud                                                                            |
| [RouterQueue_Update.ts][routerqueue_update]                   | job queue crud                                                                            |
| [RouterWorker_Create.ts][routerworker_create]                 | router worker crud                                                                        |
| [RouterWorker_Delete.ts][routerworker_delete]                 | router worker crud                                                                        |
| [RouterWorker_Get.ts][routerworker_get]                       | router worker crud                                                                        |
| [RouterWorker_List.ts][routerworker_list]                     | router worker crud                                                                        |
| [RouterWorker_Update.ts][routerworker_update]                 | router worker crud                                                                        |

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
node dist/ClassificationPolicy_Create.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env COMMUNICATION_CONNECTION_STRING="<communication connection string>" node dist/ClassificationPolicy_Create.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[classificationpolicy_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/ClassificationPolicy_Create.ts
[classificationpolicy_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/ClassificationPolicy_Delete.ts
[classificationpolicy_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/ClassificationPolicy_Get.ts
[classificationpolicy_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/ClassificationPolicy_List.ts
[classificationpolicy_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/ClassificationPolicy_Update.ts
[distributionpolicy_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/DistributionPolicy_Create.ts
[distributionpolicy_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/DistributionPolicy_Delete.ts
[distributionpolicy_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/DistributionPolicy_Get.ts
[distributionpolicy_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/DistributionPolicy_List.ts
[distributionpolicy_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/DistributionPolicy_Update.ts
[exceptionpolicy_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/ExceptionPolicy_Create.ts
[exceptionpolicy_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/ExceptionPolicy_Delete.ts
[exceptionpolicy_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/ExceptionPolicy_Get.ts
[exceptionpolicy_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/ExceptionPolicy_List.ts
[exceptionpolicy_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/ExceptionPolicy_Update.ts
[quickstart]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/QuickStart.ts
[routerjob_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterJob_Create.ts
[routerjob_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterJob_Delete.ts
[routerjob_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterJob_Get.ts
[routerjob_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterJob_List.ts
[routerjob_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterJob_Update.ts
[routerqueue_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterQueue_Create.ts
[routerqueue_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterQueue_Delete.ts
[routerqueue_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterQueue_Get.ts
[routerqueue_getstatistics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterQueue_GetStatistics.ts
[routerqueue_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterQueue_List.ts
[routerqueue_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterQueue_Update.ts
[routerworker_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterWorker_Create.ts
[routerworker_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterWorker_Delete.ts
[routerworker_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterWorker_Get.ts
[routerworker_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterWorker_List.ts
[routerworker_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/typescript/src/RouterWorker_Update.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/communication-job-router
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-job-router-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

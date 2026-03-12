---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-communication-services
urlFragment: communication-job-router-javascript-beta
---

# Azure client library for Azure Communication Job Router services client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure client library for Azure Communication Job Router services in some common scenarios.

| **File Name**                                                 | **Description**                                                                           |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [ClassificationPolicy_Create.js][classificationpolicy_create] | Classification policy crud                                                                |
| [ClassificationPolicy_Delete.js][classificationpolicy_delete] | Classification policy crud                                                                |
| [ClassificationPolicy_Get.js][classificationpolicy_get]       | Classification policy crud                                                                |
| [ClassificationPolicy_List.js][classificationpolicy_list]     | Classification policy crud                                                                |
| [ClassificationPolicy_Update.js][classificationpolicy_update] | Classification policy crud                                                                |
| [DistributionPolicy_Create.js][distributionpolicy_create]     | Distribution policy crud                                                                  |
| [DistributionPolicy_Delete.js][distributionpolicy_delete]     | Distribution policy crud                                                                  |
| [DistributionPolicy_Get.js][distributionpolicy_get]           | Distribution policy crud                                                                  |
| [DistributionPolicy_List.js][distributionpolicy_list]         | Distribution policy crud                                                                  |
| [DistributionPolicy_Update.js][distributionpolicy_update]     | Distribution policy crud                                                                  |
| [ExceptionPolicy_Create.js][exceptionpolicy_create]           | Exception policy crud                                                                     |
| [ExceptionPolicy_Delete.js][exceptionpolicy_delete]           | Exception policy crud                                                                     |
| [ExceptionPolicy_Get.js][exceptionpolicy_get]                 | Exception policy crud                                                                     |
| [ExceptionPolicy_List.js][exceptionpolicy_list]               | Exception policy crud                                                                     |
| [ExceptionPolicy_Update.js][exceptionpolicy_update]           | Exception policy crud                                                                     |
| [QuickStart.js][quickstart]                                   | Quick start workflow for creating queue, job and worker, routing/matching job with worker |
| [RouterJob_Create.js][routerjob_create]                       | router job crud                                                                           |
| [RouterJob_Delete.js][routerjob_delete]                       | router job crud                                                                           |
| [RouterJob_Get.js][routerjob_get]                             | router job crud                                                                           |
| [RouterJob_List.js][routerjob_list]                           | router job crud                                                                           |
| [RouterJob_Update.js][routerjob_update]                       | router job crud                                                                           |
| [RouterQueue_Create.js][routerqueue_create]                   | job queue crud                                                                            |
| [RouterQueue_Delete.js][routerqueue_delete]                   | job queue crud                                                                            |
| [RouterQueue_Get.js][routerqueue_get]                         | job queue crud                                                                            |
| [RouterQueue_GetStatistics.js][routerqueue_getstatistics]     | job queue crud                                                                            |
| [RouterQueue_List.js][routerqueue_list]                       | job queue crud                                                                            |
| [RouterQueue_Update.js][routerqueue_update]                   | job queue crud                                                                            |
| [RouterWorker_Create.js][routerworker_create]                 | router worker crud                                                                        |
| [RouterWorker_Delete.js][routerworker_delete]                 | router worker crud                                                                        |
| [RouterWorker_Get.js][routerworker_get]                       | router worker crud                                                                        |
| [RouterWorker_List.js][routerworker_list]                     | router worker crud                                                                        |
| [RouterWorker_Update.js][routerworker_update]                 | router worker crud                                                                        |

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
node ClassificationPolicy_Create.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env COMMUNICATION_CONNECTION_STRING="<communication connection string>" node ClassificationPolicy_Create.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[classificationpolicy_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/ClassificationPolicy_Create.js
[classificationpolicy_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/ClassificationPolicy_Delete.js
[classificationpolicy_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/ClassificationPolicy_Get.js
[classificationpolicy_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/ClassificationPolicy_List.js
[classificationpolicy_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/ClassificationPolicy_Update.js
[distributionpolicy_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/DistributionPolicy_Create.js
[distributionpolicy_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/DistributionPolicy_Delete.js
[distributionpolicy_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/DistributionPolicy_Get.js
[distributionpolicy_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/DistributionPolicy_List.js
[distributionpolicy_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/DistributionPolicy_Update.js
[exceptionpolicy_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/ExceptionPolicy_Create.js
[exceptionpolicy_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/ExceptionPolicy_Delete.js
[exceptionpolicy_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/ExceptionPolicy_Get.js
[exceptionpolicy_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/ExceptionPolicy_List.js
[exceptionpolicy_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/ExceptionPolicy_Update.js
[quickstart]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/QuickStart.js
[routerjob_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterJob_Create.js
[routerjob_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterJob_Delete.js
[routerjob_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterJob_Get.js
[routerjob_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterJob_List.js
[routerjob_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterJob_Update.js
[routerqueue_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterQueue_Create.js
[routerqueue_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterQueue_Delete.js
[routerqueue_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterQueue_Get.js
[routerqueue_getstatistics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterQueue_GetStatistics.js
[routerqueue_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterQueue_List.js
[routerqueue_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterQueue_Update.js
[routerworker_create]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterWorker_Create.js
[routerworker_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterWorker_Delete.js
[routerworker_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterWorker_Get.js
[routerworker_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterWorker_List.js
[routerworker_update]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router-rest/samples/v1-beta/javascript/RouterWorker_Update.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/communication-job-router
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-job-router-rest/README.md

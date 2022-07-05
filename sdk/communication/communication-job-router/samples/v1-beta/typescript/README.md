# Azure Communication Services - Job Router client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Communication Services - Job Router in some common scenarios.

| **File Name**                                           | **Description**                                                                           |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [ClassificationPolicyCrud.ts][classificationpolicycrud] | Classification policy crud                                                                |
| [DistributionPolicyCrud.ts][distributionpolicycrud]     | Distribution policy crud                                                                  |
| [ExceptionPolicyCrud.ts][exceptionpolicycrud]           | Exception policy crud                                                                     |
| [JobQueueCrud.ts][jobqueuecrud]                         | job queue crud                                                                            |
| [QuickStart.ts][quickstart]                             | Quick start workflow for creating queue, job and worker, routing/matching job with worker |
| [RouterJobCrud.ts][routerjobcrud]                       | router job crud                                                                           |
| [RouterWorkerCrud.ts][routerworkercrud]                 | router worker crud                                                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Communication Services Resource][createinstance_azurecommunicationservicesresource]

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
node dist/ClassificationPolicyCrud.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING="<communication livetest dynamic connection string>" node dist/ClassificationPolicyCrud.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[classificationpolicycrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router/samples/v1-beta/typescript/src/ClassificationPolicyCrud.ts
[distributionpolicycrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router/samples/v1-beta/typescript/src/DistributionPolicyCrud.ts
[exceptionpolicycrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router/samples/v1-beta/typescript/src/ExceptionPolicyCrud.ts
[jobqueuecrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router/samples/v1-beta/typescript/src/JobQueueCrud.ts
[quickstart]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router/samples/v1-beta/typescript/src/QuickStart.ts
[routerjobcrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router/samples/v1-beta/typescript/src/RouterJobCrud.ts
[routerworkercrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-job-router/samples/v1-beta/typescript/src/RouterWorkerCrud.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-job-router
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesresource]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-job-router/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

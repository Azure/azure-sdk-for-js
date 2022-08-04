# Azure Communication Services - JobRouter client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Communication Services - JobRouter in some common scenarios.

| **File Name**                                           | **Description**                                                                           |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [ClassificationPolicyCrud.js][classificationpolicycrud] | Classification policy crud                                                                |
| [DistributionPolicyCrud.js][distributionpolicycrud]     | Distribution policy crud                                                                  |
| [ExceptionPolicyCrud.js][exceptionpolicycrud]           | Exception policy crud                                                                     |
| [JobQueueCrud.js][jobqueuecrud]                         | job queue crud                                                                            |
| [QuickStart.js][quickstart]                             | Quick start workflow for creating queue, job and worker, routing/matching job with worker |
| [RouterJobCrud.js][routerjobcrud]                       | router job crud                                                                           |
| [RouterWorkerCrud.js][routerworkercrud]                 | router worker crud                                                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node ClassificationPolicyCrud.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING="<communication livetest dynamic connection string>" node ClassificationPolicyCrud.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[classificationpolicycrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-jobrouter/samples/v1-beta/javascript/ClassificationPolicyCrud.js
[distributionpolicycrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-jobrouter/samples/v1-beta/javascript/DistributionPolicyCrud.js
[exceptionpolicycrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-jobrouter/samples/v1-beta/javascript/ExceptionPolicyCrud.js
[jobqueuecrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-jobrouter/samples/v1-beta/javascript/JobQueueCrud.js
[quickstart]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-jobrouter/samples/v1-beta/javascript/QuickStart.js
[routerjobcrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-jobrouter/samples/v1-beta/javascript/RouterJobCrud.js
[routerworkercrud]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-jobrouter/samples/v1-beta/javascript/RouterWorkerCrud.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-jobrouter
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesresource]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-jobrouter/README.md

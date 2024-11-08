# Health Deidentification Service client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Health Deidentification Service in some common scenarios.

| **File Name**                               | **Description**                                                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [createJob.js][createjob]                   | This sample demonstrates how to create a job which will deidentify all files within a blob storage container filtering via a prefix. |
| [helloWorld.js][helloworld]                 | This sample demonstrates how to create a `DeidentificationClient` and then deidentify a `string`                                     |
| [listCompletedFiles.js][listcompletedfiles] | This sample demonstrates how to list files that were completed by a job.                                                             |
| [listJobs.js][listjobs]                     | This sample demonstrates how to list jobs and iterate over them in a for loop.                                                       |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [De-identification Service][createinstance_de-identificationservice]

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
node createJob.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env DEID_SERVICE_ENDPOINT="<deid service endpoint>" STORAGE_ACCOUNT_NAME="<storage account name>" STORAGE_CONTAINER_NAME="<storage container name>" node createJob.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/azure-health-deidentification/samples/v1-beta/javascript/createJob.js
[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/azure-health-deidentification/samples/v1-beta/javascript/helloWorld.js
[listcompletedfiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/azure-health-deidentification/samples/v1-beta/javascript/listCompletedFiles.js
[listjobs]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/azure-health-deidentification/samples/v1-beta/javascript/listJobs.js
[apiref]: https://docs.microsoft.com/javascript/api/
[freesub]: https://azure.microsoft.com/free/
[createinstance_de-identificationservice]: https://docs.microsoft.com/javascript/api/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthdataaiservices/azure-health-deidentification/README.md

# Health Deidentification Service client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Health Deidentification Service in some common scenarios.

| **File Name**                               | **Description**                                                                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [createJob.ts][createjob]                   | This sample demonstrates how to create a job which will deidentify all files within a specific folder of a blob storage container. |
| [helloWorld.ts][helloworld]                 | This sample demonstrates how to create a `DeidentificationClient` and then deidentify a `string`                                   |
| [listCompletedFiles.ts][listcompletedfiles] | This sample demonstrates how to list files that were completed by a job.                                                           |
| [listJobs.ts][listjobs]                     | This sample demonstrates how to list Deidentification jobs and iterate over them.                                                  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/createJob.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT="<healthdataaiservices deid service endpoint>" HEALTHDATAAISERVICES_STORAGE_ACCOUNT_LOCATION="<healthdataaiservices storage account location>" OUTPUT_PREFIX="<output prefix>" node dist/createJob.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/health-deidentification-rest/samples/v1/typescript/src/createJob.ts
[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/health-deidentification-rest/samples/v1/typescript/src/helloWorld.ts
[listcompletedfiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/health-deidentification-rest/samples/v1/typescript/src/listCompletedFiles.ts
[listjobs]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/health-deidentification-rest/samples/v1/typescript/src/listJobs.ts
[apiref]: https://learn.microsoft.com/javascript/api/
[freesub]: https://azure.microsoft.com/free/
[createinstance_de-identificationservice]: https://learn.microsoft.com/javascript/api/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthdataaiservices/health-deidentification-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

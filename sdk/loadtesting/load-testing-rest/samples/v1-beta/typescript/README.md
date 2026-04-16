---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-load-testing
urlFragment: load-testing-typescript-beta
---

# Azure Load Testing client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Load Testing in some common scenarios.

| **File Name**                                             | **Description**                                             |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| [addAppComponents.ts][addappcomponents]                   | Demonstrates how to add app components to an existing test. |
| [createOrUpdateTest.ts][createorupdatetest]               | Demonstrates how to create a load test                      |
| [createTestProfile.ts][createtestprofile]                 | Demonstrates how to create a test profile.                  |
| [startTestProfileRun.ts][starttestprofilerun]             | Demonstrates how to start a test profile run.               |
| [startTestRunAndGetMetrics.ts][starttestrunandgetmetrics] | Demonstrates how to start a test run and get metrics.       |
| [stopTestProfileRun.ts][stoptestprofilerun]               | Demonstrates how to stop a running test profile run         |
| [stopTestRun.ts][stoptestrun]                             | Demonstrates how to stop a running load test                |
| [uploadTestScript.ts][uploadtestscript]                   | Demonstrates how to upload a test script file.              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Load Testing Resource][createinstance_azureloadtestingresource]

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
node dist/addAppComponents.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env LOADTESTSERVICE_ENDPOINT="<loadtestservice endpoint>" LOADTESTSERVICE_TESTID="<loadtestservice testid>" SUBSCRIPTION_ID="<subscription id>" node dist/addAppComponents.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[addappcomponents]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/typescript/src/addAppComponents.ts
[createorupdatetest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/typescript/src/createOrUpdateTest.ts
[createtestprofile]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/typescript/src/createTestProfile.ts
[starttestprofilerun]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/typescript/src/startTestProfileRun.ts
[starttestrunandgetmetrics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/typescript/src/startTestRunAndGetMetrics.ts
[stoptestprofilerun]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/typescript/src/stopTestProfileRun.ts
[stoptestrun]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/typescript/src/stopTestRun.ts
[uploadtestscript]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/typescript/src/uploadTestScript.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/load-testing?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureloadtestingresource]: https://learn.microsoft.com/azure/load-testing/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/loadtesting/load-testing-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

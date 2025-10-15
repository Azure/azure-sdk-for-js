---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-load-testing
urlFragment: load-testing-javascript-beta
---

# Azure Load Testing client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Load Testing in some common scenarios.

| **File Name**                                             | **Description**                                             |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| [addAppComponents.js][addappcomponents]                   | Demonstrates how to add app components to an existing test. |
| [createOrUpdateTest.js][createorupdatetest]               | Demonstrates how to create a load test                      |
| [createTestProfile.js][createtestprofile]                 | Demonstrates how to create a test profile.                  |
| [startTestProfileRun.js][starttestprofilerun]             | Demonstrates how to start a test profile run.               |
| [startTestRunAndGetMetrics.js][starttestrunandgetmetrics] | Demonstrates how to start a test run and get metrics.       |
| [stopTestProfileRun.js][stoptestprofilerun]               | Demonstrates how to stop a running test profile run         |
| [stopTestRun.js][stoptestrun]                             | Demonstrates how to stop a running load test                |
| [uploadTestScript.js][uploadtestscript]                   | Demonstrates how to upload a test script file.              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node addAppComponents.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env LOADTESTSERVICE_ENDPOINT="<loadtestservice endpoint>" LOADTESTSERVICE_TESTID="<loadtestservice testid>" SUBSCRIPTION_ID="<subscription id>" node addAppComponents.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[addappcomponents]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/javascript/addAppComponents.js
[createorupdatetest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/javascript/createOrUpdateTest.js
[createtestprofile]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/javascript/createTestProfile.js
[starttestprofilerun]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/javascript/startTestProfileRun.js
[starttestrunandgetmetrics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/javascript/startTestRunAndGetMetrics.js
[stoptestprofilerun]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/javascript/stopTestProfileRun.js
[stoptestrun]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/javascript/stopTestRun.js
[uploadtestscript]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1-beta/javascript/uploadTestScript.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/load-testing?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureloadtestingresource]: https://learn.microsoft.com/azure/load-testing/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/loadtesting/load-testing-rest/README.md

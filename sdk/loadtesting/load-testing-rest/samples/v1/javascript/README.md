---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-load-testing
urlFragment: load-testing-javascript
---

# Azure Load Testing client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Load Testing in some common scenarios.

| **File Name**                                                         | **Description**                                                                      |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [addAppComponents.js][addappcomponents]                               | Demonstrates how to add app components to an existing test.                          |
| [cloneTest.js][clonetest]                                             | Demonstrates how to clone an existing load test.                                     |
| [createOrUpdateTest.js][createorupdatetest]                           | Demonstrates how to create a load test                                               |
| [generateInsights.js][generateinsights]                               | Demonstrates how to generate insights for a completed test run.                      |
| [generateTestPlanRecommendations.js][generatetestplanrecommendations] | Demonstrates how to generate test plan recommendations for a load test.              |
| [notificationRule.js][notificationrule]                               | Demonstrates how to create, get, list, and delete notification rules for load tests. |
| [scheduleTestTrigger.js][scheduletesttrigger]                         | Demonstrates how to create, get, list, and delete schedule triggers for load tests.  |
| [startTestRunAndGetMetrics.js][starttestrunandgetmetrics]             | Demonstrates how to start a test run and get metrics.                                |
| [stopTestRun.js][stoptestrun]                                         | Demonstrates how to stop a running load test                                         |
| [uploadTestScript.js][uploadtestscript]                               | Demonstrates how to upload a test script file.                                       |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Load Testing resource][createinstance_azureloadtestingresource]

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env LOADTESTSERVICE_ENDPOINT="<loadtestservice endpoint>" LOADTESTSERVICE_TESTID="<loadtestservice testid>" node addAppComponents.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[addappcomponents]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/addAppComponents.js
[clonetest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/cloneTest.js
[createorupdatetest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/createOrUpdateTest.js
[generateinsights]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/generateInsights.js
[generatetestplanrecommendations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/generateTestPlanRecommendations.js
[notificationrule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/notificationRule.js
[scheduletesttrigger]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/scheduleTestTrigger.js
[starttestrunandgetmetrics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/startTestRunAndGetMetrics.js
[stoptestrun]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/stopTestRun.js
[uploadtestscript]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/uploadTestScript.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/load-testing
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureloadtestingresource]: https://learn.microsoft.com/azure/load-testing/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/loadtesting/load-testing-rest/README.md

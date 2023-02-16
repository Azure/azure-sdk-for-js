---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: load-testing-javascript
---

# Azure Load Testing rest client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Load Testing rest in some common scenarios.

| **File Name**                                               | **Description**            |
| ----------------------------------------------------------- | -------------------------- |
| [createAppComponent.js][createappcomponent]                 | creates and run a loadtest |
| [createOrUpdateTest.js][createorupdatetest]                 | creates and run a loadtest |
| [createTestRunAndGetMetrics.js][createtestrunandgetmetrics] | creates and run a loadtest |
| [fileUpload.js][fileupload]                                 | creates and run a loadtest |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure LoadTesting Service instance][createinstance_azureloadtestingserviceinstance]

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
node createAppComponent.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env LOADTESTSERVICE_ENDPOINT="<loadtestservice endpoint>" SUBSCRIPTION_ID="<subscription id>" node createAppComponent.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createappcomponent]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/createAppComponent.js
[createorupdatetest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/createOrUpdateTest.js
[createtestrunandgetmetrics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/createTestRunAndGetMetrics.js
[fileupload]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/load-testing-rest/samples/v1/javascript/fileUpload.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/load-testing
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureloadtestingserviceinstance]: https://learn.microsoft.com/azure/load-testing/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/loadtesting/load-testing-rest/README.md

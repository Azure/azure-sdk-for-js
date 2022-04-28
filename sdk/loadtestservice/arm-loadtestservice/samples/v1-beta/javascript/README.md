# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                                      |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [loadTestsCreateOrUpdateSample.js][loadtestscreateorupdatesample]           | Create or update LoadTest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_CreateOrUpdate.json                   |
| [loadTestsDeleteSample.js][loadtestsdeletesample]                           | Delete a LoadTest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_Delete.json                                   |
| [loadTestsGetSample.js][loadtestsgetsample]                                 | Get a LoadTest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_Get.json                                         |
| [loadTestsListByResourceGroupSample.js][loadtestslistbyresourcegroupsample] | Lists loadtest resources in a resource group. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_ListByResourceGroup.json    |
| [loadTestsListBySubscriptionSample.js][loadtestslistbysubscriptionsample]   | Lists loadtests resources in a subscription. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_ListBySubscription.json      |
| [loadTestsUpdateSample.js][loadtestsupdatesample]                           | Update a loadtest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_Update.json                                   |
| [operationsListSample.js][operationslistsample]                             | Lists all the available API operations for Load Test Resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/Operations_List.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node loadTestsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node loadTestsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[loadtestscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/javascript/loadTestsCreateOrUpdateSample.js
[loadtestsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/javascript/loadTestsDeleteSample.js
[loadtestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/javascript/loadTestsGetSample.js
[loadtestslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/javascript/loadTestsListByResourceGroupSample.js
[loadtestslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/javascript/loadTestsListBySubscriptionSample.js
[loadtestsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/javascript/loadTestsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-loadtestservice?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/loadtestservice/arm-loadtestservice/README.md

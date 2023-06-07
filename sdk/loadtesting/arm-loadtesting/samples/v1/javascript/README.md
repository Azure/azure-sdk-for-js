# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [loadTestsCreateOrUpdateSample.js][loadtestscreateorupdatesample]                                                     | Create or update LoadTest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_CreateOrUpdate.json                                                         |
| [loadTestsDeleteSample.js][loadtestsdeletesample]                                                                     | Delete a LoadTest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_Delete.json                                                                         |
| [loadTestsGetSample.js][loadtestsgetsample]                                                                           | Get a LoadTest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_Get.json                                                                               |
| [loadTestsListByResourceGroupSample.js][loadtestslistbyresourcegroupsample]                                           | Lists loadtest resources in a resource group. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_ListByResourceGroup.json                                          |
| [loadTestsListBySubscriptionSample.js][loadtestslistbysubscriptionsample]                                             | Lists loadtests resources in a subscription. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_ListBySubscription.json                                            |
| [loadTestsListOutboundNetworkDependenciesEndpointsSample.js][loadtestslistoutboundnetworkdependenciesendpointssample] | Lists the endpoints that agents may call as part of load testing. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_ListOutboundNetworkDependenciesEndpoints.json |
| [loadTestsUpdateSample.js][loadtestsupdatesample]                                                                     | Update a loadtest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_Update.json                                                                         |
| [operationsListSample.js][operationslistsample]                                                                       | Lists all the available API operations for Load Test Resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/Operations_List.json                                       |
| [quotasCheckAvailabilitySample.js][quotascheckavailabilitysample]                                                     | Check Quota Availability on quota bucket per region per subscription. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/Quotas_CheckAvailability.json                       |
| [quotasGetSample.js][quotasgetsample]                                                                                 | Get the available quota for a quota bucket per region per subscription. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/Quotas_Get.json                                   |
| [quotasListSample.js][quotaslistsample]                                                                               | Lists all the available quota per region per subscription. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/Quotas_List.json                                               |

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
node loadTestsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env LOADTESTSERVICE_SUBSCRIPTION_ID="<loadtestservice subscription id>" LOADTESTSERVICE_RESOURCE_GROUP="<loadtestservice resource group>" node loadTestsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[loadtestscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/loadTestsCreateOrUpdateSample.js
[loadtestsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/loadTestsDeleteSample.js
[loadtestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/loadTestsGetSample.js
[loadtestslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/loadTestsListByResourceGroupSample.js
[loadtestslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/loadTestsListBySubscriptionSample.js
[loadtestslistoutboundnetworkdependenciesendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/loadTestsListOutboundNetworkDependenciesEndpointsSample.js
[loadtestsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/loadTestsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/operationsListSample.js
[quotascheckavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/quotasCheckAvailabilitySample.js
[quotasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/quotasGetSample.js
[quotaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/arm-loadtesting/samples/v1/javascript/quotasListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-loadtesting?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/loadtesting/arm-loadtesting/README.md

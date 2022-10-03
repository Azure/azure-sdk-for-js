# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                                      |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [loadTestsCreateOrUpdateSample.ts][loadtestscreateorupdatesample]           | Create or update LoadTest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_CreateOrUpdate.json                   |
| [loadTestsDeleteSample.ts][loadtestsdeletesample]                           | Delete a LoadTest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_Delete.json                                   |
| [loadTestsGetSample.ts][loadtestsgetsample]                                 | Get a LoadTest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_Get.json                                         |
| [loadTestsListByResourceGroupSample.ts][loadtestslistbyresourcegroupsample] | Lists loadtest resources in a resource group. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_ListByResourceGroup.json    |
| [loadTestsListBySubscriptionSample.ts][loadtestslistbysubscriptionsample]   | Lists loadtests resources in a subscription. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_ListBySubscription.json      |
| [loadTestsUpdateSample.ts][loadtestsupdatesample]                           | Update a loadtest resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/LoadTests_Update.json                                   |
| [operationsListSample.ts][operationslistsample]                             | Lists all the available API operations for Load Test Resource. x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/preview/2021-12-01-preview/examples/Operations_List.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

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
node dist/loadTestsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/loadTestsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[loadtestscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/typescript/src/loadTestsCreateOrUpdateSample.ts
[loadtestsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/typescript/src/loadTestsDeleteSample.ts
[loadtestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/typescript/src/loadTestsGetSample.ts
[loadtestslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/typescript/src/loadTestsListByResourceGroupSample.ts
[loadtestslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/typescript/src/loadTestsListBySubscriptionSample.ts
[loadtestsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/typescript/src/loadTestsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtestservice/arm-loadtestservice/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-loadtestservice?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/loadtestservice/arm-loadtestservice/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                   | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [quotaCreateOrUpdateSample.ts][quotacreateorupdatesample]       | Create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps: 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670). 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request. x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2021-03-15-preview/examples/putNetworkOneSkuQuotaRequest.json |
| [quotaGetSample.ts][quotagetsample]                             | Get the quota limit of a resource. The response can be used to determine the remaining quota to calculate a new quota limit that can be submitted with a PUT request. x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2021-03-15-preview/examples/getComputeOneSkuQuotaLimit.json                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [quotaListSample.ts][quotalistsample]                           | Get a list of current quota limits of all resources for the specified scope. The response from this GET operation can be leveraged to submit requests to update a quota. x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2021-03-15-preview/examples/getComputeQuotaLimits.json                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [quotaOperationListSample.ts][quotaoperationlistsample]         | List all the operations supported by the Microsoft.Quota resource provider. x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2021-03-15-preview/examples/GetOperations.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [quotaRequestStatusGetSample.ts][quotarequeststatusgetsample]   | Get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation. x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2021-03-15-preview/examples/getQuotaRequestStatusFailed.json                                                                                                                                                                                                                                                                                                                                                                         |
| [quotaRequestStatusListSample.ts][quotarequeststatuslistsample] | For the specified scope, get the current quota requests for a one year period ending at the time is made. Use the **oData** filter to select quota requests. x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2021-03-15-preview/examples/getQuotaRequestsHistory.json                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [quotaUpdateSample.ts][quotaupdatesample]                       | Update the quota limit for a specific resource to the specified value: 1. Use the Usages-GET and Quota-GET operations to determine the remaining quota for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670). 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request. x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2021-03-15-preview/examples/patchComputeQuotaRequest.json                                                                |
| [usagesGetSample.ts][usagesgetsample]                           | Get the current usage of a resource. x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2021-03-15-preview/examples/getComputeOneSkuUsages.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [usagesListSample.ts][usageslistsample]                         | Get a list of current usage for all resources for the scope specified. x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2021-03-15-preview/examples/getComputeUsages.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

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
node dist/quotaCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/quotaCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[quotacreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quota/arm-quota/samples/v1-beta/typescript/src/quotaCreateOrUpdateSample.ts
[quotagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quota/arm-quota/samples/v1-beta/typescript/src/quotaGetSample.ts
[quotalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quota/arm-quota/samples/v1-beta/typescript/src/quotaListSample.ts
[quotaoperationlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quota/arm-quota/samples/v1-beta/typescript/src/quotaOperationListSample.ts
[quotarequeststatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quota/arm-quota/samples/v1-beta/typescript/src/quotaRequestStatusGetSample.ts
[quotarequeststatuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quota/arm-quota/samples/v1-beta/typescript/src/quotaRequestStatusListSample.ts
[quotaupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quota/arm-quota/samples/v1-beta/typescript/src/quotaUpdateSample.ts
[usagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quota/arm-quota/samples/v1-beta/typescript/src/usagesGetSample.ts
[usageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quota/arm-quota/samples/v1-beta/typescript/src/usagesListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-quota?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/quota/arm-quota/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

# @azure/arm-aigateway client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-aigateway in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                             |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [aiGatewayResourcesCreateOrUpdateSample.ts][aigatewayresourcescreateorupdatesample]           | create a AiGatewayResource x-ms-original-file: 2026-09-01-preview/AiGatewayCreate.json                                                                      |
| [aiGatewayResourcesDeleteSample.ts][aigatewayresourcesdeletesample]                           | delete a AiGatewayResource x-ms-original-file: 2026-09-01-preview/AiGatewayDelete.json                                                                      |
| [aiGatewayResourcesGetSample.ts][aigatewayresourcesgetsample]                                 | get a AiGatewayResource x-ms-original-file: 2026-09-01-preview/AiGatewayGet.json                                                                            |
| [aiGatewayResourcesListByResourceGroupSample.ts][aigatewayresourceslistbyresourcegroupsample] | list AiGatewayResource resources by resource group x-ms-original-file: 2026-09-01-preview/AiGatewayListByResourceGroup.json                                 |
| [aiGatewayResourcesListBySubscriptionSample.ts][aigatewayresourceslistbysubscriptionsample]   | list AiGatewayResource resources by subscription ID x-ms-original-file: 2026-09-01-preview/AiGatewayListBySubscription.json                                 |
| [aiGatewayResourcesUpdateSample.ts][aigatewayresourcesupdatesample]                           | update a AiGatewayResource x-ms-original-file: 2026-09-01-preview/AiGatewayUpdate.json                                                                      |
| [operationsListSample.ts][operationslistsample]                                               | lists all of the available REST API operations of the Microsoft.ApiManagement provider. x-ms-original-file: 2026-09-01-preview/AIGatewayListOperations.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node dist/aiGatewayResourcesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/aiGatewayResourcesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[aigatewayresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/typescript/src/aiGatewayResourcesCreateOrUpdateSample.ts
[aigatewayresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/typescript/src/aiGatewayResourcesDeleteSample.ts
[aigatewayresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/typescript/src/aiGatewayResourcesGetSample.ts
[aigatewayresourceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/typescript/src/aiGatewayResourcesListByResourceGroupSample.ts
[aigatewayresourceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/typescript/src/aiGatewayResourcesListBySubscriptionSample.ts
[aigatewayresourcesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/typescript/src/aiGatewayResourcesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-aigateway?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/apimanagement/arm-aigateway/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

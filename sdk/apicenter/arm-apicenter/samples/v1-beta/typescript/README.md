# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                    |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                           | List the operations for the provider x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/preview/2023-07-01-preview/examples/Operations_List.json                     |
| [servicesCreateOrUpdateSample.ts][servicescreateorupdatesample]           | Create or update service x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/preview/2023-07-01-preview/examples/Services_CreateOrUpdate.json                         |
| [servicesDeleteSample.ts][servicesdeletesample]                           | Delete service x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/preview/2023-07-01-preview/examples/Services_Delete.json                                           |
| [servicesGetSample.ts][servicesgetsample]                                 | Get service x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/preview/2023-07-01-preview/examples/Services_Get.json                                                 |
| [servicesListByResourceGroupSample.ts][serviceslistbyresourcegroupsample] | Lists services within a resource group x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/preview/2023-07-01-preview/examples/Services_ListByResourceGroup.json      |
| [servicesListBySubscriptionSample.ts][serviceslistbysubscriptionsample]   | Lists services within an Azure subscription. x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/preview/2023-07-01-preview/examples/Services_ListBySubscription.json |
| [servicesUpdateSample.ts][servicesupdatesample]                           | Update service x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/preview/2023-07-01-preview/examples/Services_Update.json                                           |

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
node dist/operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env APICENTER_SUBSCRIPTION_ID="<apicenter subscription id>" node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v1-beta/typescript/src/operationsListSample.ts
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v1-beta/typescript/src/servicesCreateOrUpdateSample.ts
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v1-beta/typescript/src/servicesDeleteSample.ts
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v1-beta/typescript/src/servicesGetSample.ts
[serviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v1-beta/typescript/src/servicesListByResourceGroupSample.ts
[serviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v1-beta/typescript/src/servicesListBySubscriptionSample.ts
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v1-beta/typescript/src/servicesUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-apicenter?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/apicenter/arm-apicenter/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

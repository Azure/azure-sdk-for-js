# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                      |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateAndUpdateSample.ts][accountscreateandupdatesample]         | Create or update account resource. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_Create.json                      |
| [accountsDeleteSample.ts][accountsdeletesample]                           | Deletes a account resource. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_Delete.json                             |
| [accountsGetSample.ts][accountsgetsample]                                 | Returns account resource for a given name. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_Get.json                 |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample] | Returns list of accounts apps. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_List.json                            |
| [accountsListBySubscriptionSample.ts][accountslistbysubscriptionsample]   | Returns list of accounts belonging to a subscription. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_List_Sub.json |
| [accountsUpdateSample.ts][accountsupdatesample]                           | Update account details. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_Update.json                                 |
| [operationsListSample.ts][operationslistsample]                           | Returns list of operations. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Operations_List.json                             |

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
node dist/accountsCreateAndUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env GRAPHSERVICES_SUBSCRIPTION_ID="<graphservices subscription id>" GRAPHSERVICES_RESOURCE_GROUP="<graphservices resource group>" node dist/accountsCreateAndUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreateandupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/typescript/src/accountsCreateAndUpdateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/typescript/src/accountsGetSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/typescript/src/accountsListByResourceGroupSample.ts
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/typescript/src/accountsListBySubscriptionSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/typescript/src/accountsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-graphservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/graphservices/arm-graphservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

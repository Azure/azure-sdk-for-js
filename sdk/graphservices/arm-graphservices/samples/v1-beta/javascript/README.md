# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountCreateAndUpdateSample.js][accountcreateandupdatesample]           | Create or update account resource. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/preview/2022-09-22-preview/examples/Accounts_Create.json                      |
| [accountDeleteSample.js][accountdeletesample]                             | Deletes a account resource. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/preview/2022-09-22-preview/examples/Accounts_Delete.json                             |
| [accountGetSample.js][accountgetsample]                                   | Returns account resource for a given name. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/preview/2022-09-22-preview/examples/Accounts_Get.json                 |
| [accountUpdateSample.js][accountupdatesample]                             | Update account details. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/preview/2022-09-22-preview/examples/Accounts_Update.json                                 |
| [accountsListByResourceGroupSample.js][accountslistbyresourcegroupsample] | Returns list of accounts apps. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/preview/2022-09-22-preview/examples/Accounts_List.json                            |
| [accountsListBySubscriptionSample.js][accountslistbysubscriptionsample]   | Returns list of accounts belonging to a subscription. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/preview/2022-09-22-preview/examples/Accounts_List_Sub.json |
| [operationListSample.js][operationlistsample]                             | Returns list of operations. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/preview/2022-09-22-preview/examples/Operations_List.json                             |

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
node accountCreateAndUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env GRAPHSERVICES_SUBSCRIPTION_ID="<graphservices subscription id>" GRAPHSERVICES_RESOURCE_GROUP="<graphservices resource group>" node accountCreateAndUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountcreateandupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1-beta/javascript/accountCreateAndUpdateSample.js
[accountdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1-beta/javascript/accountDeleteSample.js
[accountgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1-beta/javascript/accountGetSample.js
[accountupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1-beta/javascript/accountUpdateSample.js
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1-beta/javascript/accountsListByResourceGroupSample.js
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1-beta/javascript/accountsListBySubscriptionSample.js
[operationlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1-beta/javascript/operationListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-graphservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/graphservices/arm-graphservices/README.md

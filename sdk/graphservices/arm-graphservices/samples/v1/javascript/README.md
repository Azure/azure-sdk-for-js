# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                      |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateAndUpdateSample.js][accountscreateandupdatesample]         | Create or update account resource. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_Create.json                      |
| [accountsDeleteSample.js][accountsdeletesample]                           | Deletes a account resource. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_Delete.json                             |
| [accountsGetSample.js][accountsgetsample]                                 | Returns account resource for a given name. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_Get.json                 |
| [accountsListByResourceGroupSample.js][accountslistbyresourcegroupsample] | Returns list of accounts apps. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_List.json                            |
| [accountsListBySubscriptionSample.js][accountslistbysubscriptionsample]   | Returns list of accounts belonging to a subscription. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_List_Sub.json |
| [accountsUpdateSample.js][accountsupdatesample]                           | Update account details. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_Update.json                                 |
| [operationsListSample.js][operationslistsample]                           | Returns list of operations. x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Operations_List.json                             |

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
node accountsCreateAndUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env GRAPHSERVICES_SUBSCRIPTION_ID="<graphservices subscription id>" GRAPHSERVICES_RESOURCE_GROUP="<graphservices resource group>" node accountsCreateAndUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreateandupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/javascript/accountsCreateAndUpdateSample.js
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/javascript/accountsDeleteSample.js
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/javascript/accountsGetSample.js
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/javascript/accountsListByResourceGroupSample.js
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/javascript/accountsListBySubscriptionSample.js
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/javascript/accountsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/graphservices/arm-graphservices/samples/v1/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-graphservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/graphservices/arm-graphservices/README.md

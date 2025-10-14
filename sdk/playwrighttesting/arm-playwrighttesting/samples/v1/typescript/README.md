# @azure/arm-playwrighttesting client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-playwrighttesting in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                             |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountQuotasGetSample.ts][accountquotasgetsample]                           | get quota by name for an account. x-ms-original-file: 2024-12-01/AccountQuotas_Get.json                                                                                     |
| [accountQuotasListByAccountSample.ts][accountquotaslistbyaccountsample]       | list quotas for a given account. x-ms-original-file: 2024-12-01/AccountQuotas_ListByAccount.json                                                                            |
| [accountsCheckNameAvailabilitySample.ts][accountschecknameavailabilitysample] | adds check global name availability operation, normally used if a resource name must be globally unique. x-ms-original-file: 2024-12-01/Accounts_CheckNameAvailability.json |
| [accountsCreateOrUpdateSample.ts][accountscreateorupdatesample]               | create a Account x-ms-original-file: 2024-12-01/Accounts_CreateOrUpdate.json                                                                                                |
| [accountsDeleteSample.ts][accountsdeletesample]                               | delete a Account x-ms-original-file: 2024-12-01/Accounts_Delete.json                                                                                                        |
| [accountsUpdateSample.ts][accountsupdatesample]                               | update a Account x-ms-original-file: 2024-12-01/Accounts_Update.json                                                                                                        |
| [operationsListSample.ts][operationslistsample]                               | list the operations for the provider x-ms-original-file: 2024-12-01/Operations_List.json                                                                                    |
| [quotasGetSample.ts][quotasgetsample]                                         | get subscription quota by name. x-ms-original-file: 2024-12-01/Quotas_Get.json                                                                                              |
| [quotasListBySubscriptionSample.ts][quotaslistbysubscriptionsample]           | list quotas for a given subscription Id. x-ms-original-file: 2024-12-01/Quotas_ListBySubscription.json                                                                      |

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
node dist/accountQuotasGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/accountQuotasGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountquotasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/typescript/src/accountQuotasGetSample.ts
[accountquotaslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/typescript/src/accountQuotasListByAccountSample.ts
[accountschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/typescript/src/accountsCheckNameAvailabilitySample.ts
[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/typescript/src/accountsCreateOrUpdateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/typescript/src/accountsDeleteSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/typescript/src/accountsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/typescript/src/operationsListSample.ts
[quotasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/typescript/src/quotasGetSample.ts
[quotaslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/typescript/src/quotasListBySubscriptionSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-playwrighttesting?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/playwrighttesting/arm-playwrighttesting/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

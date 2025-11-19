# @azure/arm-playwrighttesting client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-playwrighttesting in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                             |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountQuotasGetSample.js][accountquotasgetsample]                           | get quota by name for an account. x-ms-original-file: 2024-12-01/AccountQuotas_Get.json                                                                                     |
| [accountQuotasListByAccountSample.js][accountquotaslistbyaccountsample]       | list quotas for a given account. x-ms-original-file: 2024-12-01/AccountQuotas_ListByAccount.json                                                                            |
| [accountsCheckNameAvailabilitySample.js][accountschecknameavailabilitysample] | adds check global name availability operation, normally used if a resource name must be globally unique. x-ms-original-file: 2024-12-01/Accounts_CheckNameAvailability.json |
| [accountsCreateOrUpdateSample.js][accountscreateorupdatesample]               | create a Account x-ms-original-file: 2024-12-01/Accounts_CreateOrUpdate.json                                                                                                |
| [accountsDeleteSample.js][accountsdeletesample]                               | delete a Account x-ms-original-file: 2024-12-01/Accounts_Delete.json                                                                                                        |
| [accountsUpdateSample.js][accountsupdatesample]                               | update a Account x-ms-original-file: 2024-12-01/Accounts_Update.json                                                                                                        |
| [operationsListSample.js][operationslistsample]                               | list the operations for the provider x-ms-original-file: 2024-12-01/Operations_List.json                                                                                    |
| [quotasGetSample.js][quotasgetsample]                                         | get subscription quota by name. x-ms-original-file: 2024-12-01/Quotas_Get.json                                                                                              |
| [quotasListBySubscriptionSample.js][quotaslistbysubscriptionsample]           | list quotas for a given subscription Id. x-ms-original-file: 2024-12-01/Quotas_ListBySubscription.json                                                                      |

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
node accountQuotasGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node accountQuotasGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountquotasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/javascript/accountQuotasGetSample.js
[accountquotaslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/javascript/accountQuotasListByAccountSample.js
[accountschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/javascript/accountsCheckNameAvailabilitySample.js
[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/javascript/accountsCreateOrUpdateSample.js
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/javascript/accountsDeleteSample.js
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/javascript/accountsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/javascript/operationsListSample.js
[quotasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/javascript/quotasGetSample.js
[quotaslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1/javascript/quotasListBySubscriptionSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-playwrighttesting?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/playwrighttesting/arm-playwrighttesting/README.md

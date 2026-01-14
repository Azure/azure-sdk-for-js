# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [aliasCreateSample.js][aliascreatesample]                                                               | Create Alias Subscription. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/createAlias.json                                                        |
| [aliasDeleteSample.js][aliasdeletesample]                                                               | Delete Alias. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/deleteAlias.json                                                                     |
| [aliasGetSample.js][aliasgetsample]                                                                     | Get Alias Subscription. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getAlias.json                                                              |
| [aliasListSample.js][aliaslistsample]                                                                   | List Alias Subscription. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/listAlias.json                                                            |
| [billingAccountGetPolicySample.js][billingaccountgetpolicysample]                                       | Get Billing Account Policy. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getBillingAccountPolicy.json                                           |
| [operationsListSample.js][operationslistsample]                                                         | Lists all of the available Microsoft.Subscription API operations. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getOperations.json               |
| [subscriptionAcceptOwnershipSample.js][subscriptionacceptownershipsample]                               | Accept subscription ownership. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/acceptSubscriptionOwnership.json                                    |
| [subscriptionAcceptOwnershipStatusSample.js][subscriptionacceptownershipstatussample]                   | Accept subscription ownership status. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/acceptOwnershipStatus.json                                   |
| [subscriptionCancelSample.js][subscriptioncancelsample]                                                 | The operation to cancel a subscription x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/cancelSubscription.json                                     |
| [subscriptionEnableSample.js][subscriptionenablesample]                                                 | The operation to enable a subscription x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/enableSubscription.json                                     |
| [subscriptionOperationGetSample.js][subscriptionoperationgetsample]                                     | Get the status of the pending Microsoft.Subscription API operations. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getSubscriptionOperation.json |
| [subscriptionPolicyAddUpdatePolicyForTenantSample.js][subscriptionpolicyaddupdatepolicyfortenantsample] | Create or Update Subscription tenant policy for user's tenant. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/changeTenantPolicy.json             |
| [subscriptionPolicyGetPolicyForTenantSample.js][subscriptionpolicygetpolicyfortenantsample]             | Get the subscription tenant policy for the user's tenant. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getTenantPolicy.json                     |
| [subscriptionPolicyListPolicyForTenantSample.js][subscriptionpolicylistpolicyfortenantsample]           | Get the subscription tenant policy for the user's tenant. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getTenantPolicyList.json                 |
| [subscriptionRenameSample.js][subscriptionrenamesample]                                                 | The operation to rename a subscription x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/renameSubscription.json                                     |

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
node aliasCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env  node aliasCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[aliascreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/aliasCreateSample.js
[aliasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/aliasDeleteSample.js
[aliasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/aliasGetSample.js
[aliaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/aliasListSample.js
[billingaccountgetpolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/billingAccountGetPolicySample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/operationsListSample.js
[subscriptionacceptownershipsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/subscriptionAcceptOwnershipSample.js
[subscriptionacceptownershipstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/subscriptionAcceptOwnershipStatusSample.js
[subscriptioncancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/subscriptionCancelSample.js
[subscriptionenablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/subscriptionEnableSample.js
[subscriptionoperationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/subscriptionOperationGetSample.js
[subscriptionpolicyaddupdatepolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/subscriptionPolicyAddUpdatePolicyForTenantSample.js
[subscriptionpolicygetpolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/subscriptionPolicyGetPolicyForTenantSample.js
[subscriptionpolicylistpolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/subscriptionPolicyListPolicyForTenantSample.js
[subscriptionrenamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v6/javascript/subscriptionRenameSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-subscriptions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/subscription/arm-subscriptions/README.md

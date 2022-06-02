# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [aliasCreateSample.ts][aliascreatesample]                                                               | Create Alias Subscription. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/createAlias.json                                                                                                                                |
| [aliasDeleteSample.ts][aliasdeletesample]                                                               | Delete Alias. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/deleteAlias.json                                                                                                                                             |
| [aliasGetSample.ts][aliasgetsample]                                                                     | Get Alias Subscription. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getAlias.json                                                                                                                                      |
| [aliasListSample.ts][aliaslistsample]                                                                   | List Alias Subscription. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/listAlias.json                                                                                                                                    |
| [billingAccountGetPolicySample.ts][billingaccountgetpolicysample]                                       | Get Billing Account Policy. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getBillingAccountPolicy.json                                                                                                                   |
| [operationsListSample.ts][operationslistsample]                                                         | Lists all of the available Microsoft.Subscription API operations. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getOperations.json                                                                                       |
| [subscriptionAcceptOwnershipSample.ts][subscriptionacceptownershipsample]                               | Accept subscription ownership. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/acceptSubscriptionOwnership.json                                                                                                            |
| [subscriptionAcceptOwnershipStatusSample.ts][subscriptionacceptownershipstatussample]                   | Accept subscription ownership status. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/acceptOwnershipStatus.json                                                                                                           |
| [subscriptionCancelSample.ts][subscriptioncancelsample]                                                 | The operation to cancel a subscription x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/cancelSubscription.json                                                                                                             |
| [subscriptionEnableSample.ts][subscriptionenablesample]                                                 | The operation to enable a subscription x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/enableSubscription.json                                                                                                             |
| [subscriptionPolicyAddUpdatePolicyForTenantSample.ts][subscriptionpolicyaddupdatepolicyfortenantsample] | Create or Update Subscription tenant policy for user's tenant. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/changeTenantPolicy.json                                                                                     |
| [subscriptionPolicyGetPolicyForTenantSample.ts][subscriptionpolicygetpolicyfortenantsample]             | Get the subscription tenant policy for the user's tenant. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getTenantPolicy.json                                                                                             |
| [subscriptionPolicyListPolicyForTenantSample.ts][subscriptionpolicylistpolicyfortenantsample]           | Get the subscription tenant policy for the user's tenant. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getTenantPolicyList.json                                                                                         |
| [subscriptionRenameSample.ts][subscriptionrenamesample]                                                 | The operation to rename a subscription x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/renameSubscription.json                                                                                                             |
| [subscriptionsGetSample.ts][subscriptionsgetsample]                                                     | Gets details about a specified subscription. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2016-06-01/examples/getSubscription.json                                                                                                          |
| [subscriptionsListLocationsSample.ts][subscriptionslistlocationssample]                                 | This operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2016-06-01/examples/listLocations.json |
| [subscriptionsListSample.ts][subscriptionslistsample]                                                   | Gets all subscriptions for a tenant. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2016-06-01/examples/listSubscriptions.json                                                                                                                |
| [tenantsListSample.ts][tenantslistsample]                                                               | Gets the tenants for your account. x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2016-06-01/examples/listTenants.json                                                                                                                        |

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
node dist/aliasCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/aliasCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[aliascreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/aliasCreateSample.ts
[aliasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/aliasDeleteSample.ts
[aliasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/aliasGetSample.ts
[aliaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/aliasListSample.ts
[billingaccountgetpolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/billingAccountGetPolicySample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/operationsListSample.ts
[subscriptionacceptownershipsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionAcceptOwnershipSample.ts
[subscriptionacceptownershipstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionAcceptOwnershipStatusSample.ts
[subscriptioncancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionCancelSample.ts
[subscriptionenablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionEnableSample.ts
[subscriptionpolicyaddupdatepolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionPolicyAddUpdatePolicyForTenantSample.ts
[subscriptionpolicygetpolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionPolicyGetPolicyForTenantSample.ts
[subscriptionpolicylistpolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionPolicyListPolicyForTenantSample.ts
[subscriptionrenamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionRenameSample.ts
[subscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionsGetSample.ts
[subscriptionslistlocationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionsListLocationsSample.ts
[subscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/subscriptionsListSample.ts
[tenantslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v5/typescript/src/tenantsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-subscriptions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/subscription/arm-subscriptions/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

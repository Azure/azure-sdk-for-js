# @azure/arm-subscriptions client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-subscriptions in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                           |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [aliasCreateSample.ts][aliascreatesample]                                                               | create Alias Subscription. x-ms-original-file: 2025-11-01-preview/createAlias.json                                                        |
| [aliasDeleteSample.ts][aliasdeletesample]                                                               | delete Alias. x-ms-original-file: 2025-11-01-preview/deleteAlias.json                                                                     |
| [aliasGetSample.ts][aliasgetsample]                                                                     | get Alias Subscription. x-ms-original-file: 2025-11-01-preview/getAlias.json                                                              |
| [aliasListSample.ts][aliaslistsample]                                                                   | list Alias Subscription. x-ms-original-file: 2025-11-01-preview/listAlias.json                                                            |
| [billingAccountGetPolicySample.ts][billingaccountgetpolicysample]                                       | get Billing Account Policy. x-ms-original-file: 2025-11-01-preview/getBillingAccountPolicy.json                                           |
| [operationsListSample.ts][operationslistsample]                                                         | lists all of the available Microsoft.Subscription API operations. x-ms-original-file: 2025-11-01-preview/getOperations.json               |
| [subscriptionAcceptOwnershipSample.ts][subscriptionacceptownershipsample]                               | accept subscription ownership. x-ms-original-file: 2025-11-01-preview/acceptSubscriptionOwnership.json                                    |
| [subscriptionAcceptOwnershipStatusSample.ts][subscriptionacceptownershipstatussample]                   | accept subscription ownership status. x-ms-original-file: 2025-11-01-preview/acceptOwnershipStatus.json                                   |
| [subscriptionCancelSample.ts][subscriptioncancelsample]                                                 | the operation to cancel a subscription x-ms-original-file: 2025-11-01-preview/cancelSubscription.json                                     |
| [subscriptionEnableSample.ts][subscriptionenablesample]                                                 | the operation to enable a subscription x-ms-original-file: 2025-11-01-preview/enableSubscription.json                                     |
| [subscriptionOperationGetSample.ts][subscriptionoperationgetsample]                                     | get the status of the pending Microsoft.Subscription API operations. x-ms-original-file: 2025-11-01-preview/getSubscriptionOperation.json |
| [subscriptionPolicyAddUpdatePolicyForTenantSample.ts][subscriptionpolicyaddupdatepolicyfortenantsample] | create or Update Subscription tenant policy for user's tenant. x-ms-original-file: 2025-11-01-preview/changeTenantPolicy.json             |
| [subscriptionPolicyGetPolicyForTenantSample.ts][subscriptionpolicygetpolicyfortenantsample]             | get the subscription tenant policy for the user's tenant. x-ms-original-file: 2025-11-01-preview/getTenantPolicy.json                     |
| [subscriptionPolicyListPolicyForTenantSample.ts][subscriptionpolicylistpolicyfortenantsample]           | get the subscription tenant policy for the user's tenant. x-ms-original-file: 2025-11-01-preview/getTenantPolicyList.json                 |
| [subscriptionRenameSample.ts][subscriptionrenamesample]                                                 | the operation to rename a subscription x-ms-original-file: 2025-11-01-preview/renameSubscription.json                                     |
| [subscriptionsAcceptTargetDirectorySample.ts][subscriptionsaccepttargetdirectorysample]                 | the operation to accept Subscription Changed Request x-ms-original-file: 2025-11-01-preview/acceptTargetDirectory.json                    |
| [subscriptionsDeleteTargetDirectorySample.ts][subscriptionsdeletetargetdirectorysample]                 | the operation to delete Initiator Subscription Changed Request x-ms-original-file: 2025-11-01-preview/deleteTargetDirectory.json          |
| [subscriptionsGetTargetDirectorySample.ts][subscriptionsgettargetdirectorysample]                       | the operation to view Initiator Subscription Changed Request x-ms-original-file: 2025-11-01-preview/getTargetDirectory.json               |
| [subscriptionsListTargetDirectorySample.ts][subscriptionslisttargetdirectorysample]                     | the operation to list Initiator Subscription Changed Request x-ms-original-file: 2025-11-01-preview/listTargetDirectory.json              |
| [subscriptionsPutTargetDirectorySample.ts][subscriptionsputtargetdirectorysample]                       | the operation to initiate Subscription Changed Request x-ms-original-file: 2025-11-01-preview/putTargetDirectory.json                     |
| [subscriptionsTargetDirectoryStatusSample.ts][subscriptionstargetdirectorystatussample]                 | the operation for Acceptor to view the accepted request x-ms-original-file: 2025-11-01-preview/targetDirectoryStatus.json                 |

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
node dist/aliasCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/aliasCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[aliascreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/aliasCreateSample.ts
[aliasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/aliasDeleteSample.ts
[aliasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/aliasGetSample.ts
[aliaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/aliasListSample.ts
[billingaccountgetpolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/billingAccountGetPolicySample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/operationsListSample.ts
[subscriptionacceptownershipsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionAcceptOwnershipSample.ts
[subscriptionacceptownershipstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionAcceptOwnershipStatusSample.ts
[subscriptioncancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionCancelSample.ts
[subscriptionenablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionEnableSample.ts
[subscriptionoperationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionOperationGetSample.ts
[subscriptionpolicyaddupdatepolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionPolicyAddUpdatePolicyForTenantSample.ts
[subscriptionpolicygetpolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionPolicyGetPolicyForTenantSample.ts
[subscriptionpolicylistpolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionPolicyListPolicyForTenantSample.ts
[subscriptionrenamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionRenameSample.ts
[subscriptionsaccepttargetdirectorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionsAcceptTargetDirectorySample.ts
[subscriptionsdeletetargetdirectorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionsDeleteTargetDirectorySample.ts
[subscriptionsgettargetdirectorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionsGetTargetDirectorySample.ts
[subscriptionslisttargetdirectorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionsListTargetDirectorySample.ts
[subscriptionsputtargetdirectorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionsPutTargetDirectorySample.ts
[subscriptionstargetdirectorystatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/typescript/src/subscriptionsTargetDirectoryStatusSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-subscriptions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/subscription/arm-subscriptions/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

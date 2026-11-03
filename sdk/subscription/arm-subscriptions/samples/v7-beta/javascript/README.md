# @azure/arm-subscriptions client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-subscriptions in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                           |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [aliasCreateSample.js][aliascreatesample]                                                               | create Alias Subscription. x-ms-original-file: 2025-11-01-preview/createAlias.json                                                        |
| [aliasDeleteSample.js][aliasdeletesample]                                                               | delete Alias. x-ms-original-file: 2025-11-01-preview/deleteAlias.json                                                                     |
| [aliasGetSample.js][aliasgetsample]                                                                     | get Alias Subscription. x-ms-original-file: 2025-11-01-preview/getAlias.json                                                              |
| [aliasListSample.js][aliaslistsample]                                                                   | list Alias Subscription. x-ms-original-file: 2025-11-01-preview/listAlias.json                                                            |
| [billingAccountGetPolicySample.js][billingaccountgetpolicysample]                                       | get Billing Account Policy. x-ms-original-file: 2025-11-01-preview/getBillingAccountPolicy.json                                           |
| [operationsListSample.js][operationslistsample]                                                         | lists all of the available Microsoft.Subscription API operations. x-ms-original-file: 2025-11-01-preview/getOperations.json               |
| [subscriptionAcceptOwnershipSample.js][subscriptionacceptownershipsample]                               | accept subscription ownership. x-ms-original-file: 2025-11-01-preview/acceptSubscriptionOwnership.json                                    |
| [subscriptionAcceptOwnershipStatusSample.js][subscriptionacceptownershipstatussample]                   | accept subscription ownership status. x-ms-original-file: 2025-11-01-preview/acceptOwnershipStatus.json                                   |
| [subscriptionCancelSample.js][subscriptioncancelsample]                                                 | the operation to cancel a subscription x-ms-original-file: 2025-11-01-preview/cancelSubscription.json                                     |
| [subscriptionEnableSample.js][subscriptionenablesample]                                                 | the operation to enable a subscription x-ms-original-file: 2025-11-01-preview/enableSubscription.json                                     |
| [subscriptionOperationGetSample.js][subscriptionoperationgetsample]                                     | get the status of the pending Microsoft.Subscription API operations. x-ms-original-file: 2025-11-01-preview/getSubscriptionOperation.json |
| [subscriptionPolicyAddUpdatePolicyForTenantSample.js][subscriptionpolicyaddupdatepolicyfortenantsample] | create or Update Subscription tenant policy for user's tenant. x-ms-original-file: 2025-11-01-preview/changeTenantPolicy.json             |
| [subscriptionPolicyGetPolicyForTenantSample.js][subscriptionpolicygetpolicyfortenantsample]             | get the subscription tenant policy for the user's tenant. x-ms-original-file: 2025-11-01-preview/getTenantPolicy.json                     |
| [subscriptionPolicyListPolicyForTenantSample.js][subscriptionpolicylistpolicyfortenantsample]           | get the subscription tenant policy for the user's tenant. x-ms-original-file: 2025-11-01-preview/getTenantPolicyList.json                 |
| [subscriptionRenameSample.js][subscriptionrenamesample]                                                 | the operation to rename a subscription x-ms-original-file: 2025-11-01-preview/renameSubscription.json                                     |
| [subscriptionsAcceptTargetDirectorySample.js][subscriptionsaccepttargetdirectorysample]                 | the operation to accept Subscription Changed Request x-ms-original-file: 2025-11-01-preview/acceptTargetDirectory.json                    |
| [subscriptionsDeleteTargetDirectorySample.js][subscriptionsdeletetargetdirectorysample]                 | the operation to delete Initiator Subscription Changed Request x-ms-original-file: 2025-11-01-preview/deleteTargetDirectory.json          |
| [subscriptionsGetTargetDirectorySample.js][subscriptionsgettargetdirectorysample]                       | the operation to view Initiator Subscription Changed Request x-ms-original-file: 2025-11-01-preview/getTargetDirectory.json               |
| [subscriptionsListTargetDirectorySample.js][subscriptionslisttargetdirectorysample]                     | the operation to list Initiator Subscription Changed Request x-ms-original-file: 2025-11-01-preview/listTargetDirectory.json              |
| [subscriptionsPutTargetDirectorySample.js][subscriptionsputtargetdirectorysample]                       | the operation to initiate Subscription Changed Request x-ms-original-file: 2025-11-01-preview/putTargetDirectory.json                     |
| [subscriptionsTargetDirectoryStatusSample.js][subscriptionstargetdirectorystatussample]                 | the operation for Acceptor to view the accepted request x-ms-original-file: 2025-11-01-preview/targetDirectoryStatus.json                 |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node aliasCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[aliascreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/aliasCreateSample.js
[aliasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/aliasDeleteSample.js
[aliasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/aliasGetSample.js
[aliaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/aliasListSample.js
[billingaccountgetpolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/billingAccountGetPolicySample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/operationsListSample.js
[subscriptionacceptownershipsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionAcceptOwnershipSample.js
[subscriptionacceptownershipstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionAcceptOwnershipStatusSample.js
[subscriptioncancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionCancelSample.js
[subscriptionenablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionEnableSample.js
[subscriptionoperationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionOperationGetSample.js
[subscriptionpolicyaddupdatepolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionPolicyAddUpdatePolicyForTenantSample.js
[subscriptionpolicygetpolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionPolicyGetPolicyForTenantSample.js
[subscriptionpolicylistpolicyfortenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionPolicyListPolicyForTenantSample.js
[subscriptionrenamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionRenameSample.js
[subscriptionsaccepttargetdirectorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionsAcceptTargetDirectorySample.js
[subscriptionsdeletetargetdirectorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionsDeleteTargetDirectorySample.js
[subscriptionsgettargetdirectorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionsGetTargetDirectorySample.js
[subscriptionslisttargetdirectorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionsListTargetDirectorySample.js
[subscriptionsputtargetdirectorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionsPutTargetDirectorySample.js
[subscriptionstargetdirectorystatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions/samples/v7-beta/javascript/subscriptionsTargetDirectoryStatusSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-subscriptions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/subscription/arm-subscriptions/README.md

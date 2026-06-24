# @azure/arm-computelimit client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-computelimit in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [featuresDisableSample.ts][featuresdisablesample]                                                                           | disables a compute limit feature for the subscription at the specified location. x-ms-original-file: 2026-07-01/Features_Disable.json                                                                                                                                        |
| [featuresEnableSample.ts][featuresenablesample]                                                                             | enables a compute limit feature for the subscription at the specified location. x-ms-original-file: 2026-07-01/Features_Enable.json                                                                                                                                          |
| [featuresGetSample.ts][featuresgetsample]                                                                                   | gets the properties of a compute limit feature. x-ms-original-file: 2026-07-01/Features_Get.json                                                                                                                                                                             |
| [featuresListBySubscriptionLocationResourceSample.ts][featureslistbysubscriptionlocationresourcesample]                     | lists all compute limit features for the subscription at the specified location. x-ms-original-file: 2026-07-01/Features_List.json                                                                                                                                           |
| [guestSubscriptionsCreateSample.ts][guestsubscriptionscreatesample]                                                         | adds a subscription as a guest to consume the compute limits shared by the host subscription. x-ms-original-file: 2026-07-01/GuestSubscriptions_Create.json                                                                                                                  |
| [guestSubscriptionsDeleteSample.ts][guestsubscriptionsdeletesample]                                                         | deletes a subscription as a guest to stop consuming the compute limits shared by the host subscription. x-ms-original-file: 2026-07-01/GuestSubscriptions_Delete.json                                                                                                        |
| [guestSubscriptionsGetSample.ts][guestsubscriptionsgetsample]                                                               | gets the properties of a guest subscription. x-ms-original-file: 2026-07-01/GuestSubscriptions_Get.json                                                                                                                                                                      |
| [guestSubscriptionsListBySubscriptionLocationResourceSample.ts][guestsubscriptionslistbysubscriptionlocationresourcesample] | lists all guest subscriptions in a location. x-ms-original-file: 2026-07-01/GuestSubscriptions_List.json                                                                                                                                                                     |
| [memberCapOverridesCreateOrUpdateSample.ts][membercapoverridescreateorupdatesample]                                         | creates or replaces the cap override for a single member subscription. x-ms-original-file: 2026-07-01/MemberCapOverrides_CreateOrUpdate.json                                                                                                                                 |
| [memberCapOverridesDeleteSample.ts][membercapoverridesdeletesample]                                                         | removes the per-member cap override for a member subscription. x-ms-original-file: 2026-07-01/MemberCapOverrides_Delete.json                                                                                                                                                 |
| [memberCapOverridesGetSample.ts][membercapoverridesgetsample]                                                               | gets the cap override configured for a single member subscription. x-ms-original-file: 2026-07-01/MemberCapOverrides_Get.json                                                                                                                                                |
| [memberCapOverridesListByParentSample.ts][membercapoverrideslistbyparentsample]                                             | lists all per-member cap overrides configured under a SharedLimitCap. x-ms-original-file: 2026-07-01/MemberCapOverrides_ListByParent.json                                                                                                                                    |
| [operationsListSample.ts][operationslistsample]                                                                             | list the operations for the provider x-ms-original-file: 2026-07-01/Operations_List.json                                                                                                                                                                                     |
| [sharedLimitCapsCreateOrUpdateSample.ts][sharedlimitcapscreateorupdatesample]                                               | creates or replaces the shared limit cap configuration for a VM family. x-ms-original-file: 2026-07-01/SharedLimitCaps_CreateOrUpdate.json                                                                                                                                   |
| [sharedLimitCapsDeleteSample.ts][sharedlimitcapsdeletesample]                                                               | deletes the shared limit cap configuration for a VM family. The caller's subscription is treated as the host subscription. x-ms-original-file: 2026-07-01/SharedLimitCaps_Delete.json                                                                                        |
| [sharedLimitCapsGetSample.ts][sharedlimitcapsgetsample]                                                                     | gets the shared limit cap configuration for a VM family, as visible to the caller's subscription. x-ms-original-file: 2026-07-01/SharedLimitCaps_Get.json                                                                                                                    |
| [sharedLimitCapsListBySubscriptionLocationResourceSample.ts][sharedlimitcapslistbysubscriptionlocationresourcesample]       | lists all shared limit cap configurations visible to the caller's subscription. x-ms-original-file: 2026-07-01/SharedLimitCaps_List.json                                                                                                                                     |
| [sharedLimitCapsSetMemberCapOverridesSample.ts][sharedlimitcapssetmembercapoverridessample]                                 | replaces the full set of per-member cap overrides for this shared limit cap. The supplied array becomes the new complete set of overrides; supplying an empty array clears all existing overrides. x-ms-original-file: 2026-07-01/SharedLimitCaps_SetMemberCapOverrides.json |
| [sharedLimitsCreateSample.ts][sharedlimitscreatesample]                                                                     | enables sharing of a compute limit by the host subscription with its guest subscriptions. x-ms-original-file: 2026-07-01/SharedLimits_Create.json                                                                                                                            |
| [sharedLimitsDeleteSample.ts][sharedlimitsdeletesample]                                                                     | disables sharing of a compute limit by the host subscription with its guest subscriptions. x-ms-original-file: 2026-07-01/SharedLimits_Delete.json                                                                                                                           |
| [sharedLimitsGetSample.ts][sharedlimitsgetsample]                                                                           | gets the properties of a compute limit shared by the host subscription with its guest subscriptions. x-ms-original-file: 2026-07-01/SharedLimits_Get.json                                                                                                                    |
| [sharedLimitsListBySubscriptionLocationResourceSample.ts][sharedlimitslistbysubscriptionlocationresourcesample]             | lists all compute limits shared by the host subscription with its guest subscriptions. x-ms-original-file: 2026-07-01/SharedLimits_List.json                                                                                                                                 |
| [vmFamiliesGetSample.ts][vmfamiliesgetsample]                                                                               | gets the properties of a VM family. x-ms-original-file: 2026-07-01/VmFamilies_Get.json                                                                                                                                                                                       |
| [vmFamiliesListBySubscriptionLocationResourceSample.ts][vmfamilieslistbysubscriptionlocationresourcesample]                 | lists all VM families for the subscription at the specified location. x-ms-original-file: 2026-07-01/VmFamilies_List.json                                                                                                                                                    |

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
node dist/featuresDisableSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/featuresDisableSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[featuresdisablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/featuresDisableSample.ts
[featuresenablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/featuresEnableSample.ts
[featuresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/featuresGetSample.ts
[featureslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/featuresListBySubscriptionLocationResourceSample.ts
[guestsubscriptionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/guestSubscriptionsCreateSample.ts
[guestsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/guestSubscriptionsDeleteSample.ts
[guestsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/guestSubscriptionsGetSample.ts
[guestsubscriptionslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/guestSubscriptionsListBySubscriptionLocationResourceSample.ts
[membercapoverridescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/memberCapOverridesCreateOrUpdateSample.ts
[membercapoverridesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/memberCapOverridesDeleteSample.ts
[membercapoverridesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/memberCapOverridesGetSample.ts
[membercapoverrideslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/memberCapOverridesListByParentSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/operationsListSample.ts
[sharedlimitcapscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/sharedLimitCapsCreateOrUpdateSample.ts
[sharedlimitcapsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/sharedLimitCapsDeleteSample.ts
[sharedlimitcapsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/sharedLimitCapsGetSample.ts
[sharedlimitcapslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/sharedLimitCapsListBySubscriptionLocationResourceSample.ts
[sharedlimitcapssetmembercapoverridessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/sharedLimitCapsSetMemberCapOverridesSample.ts
[sharedlimitscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/sharedLimitsCreateSample.ts
[sharedlimitsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/sharedLimitsDeleteSample.ts
[sharedlimitsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/sharedLimitsGetSample.ts
[sharedlimitslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/sharedLimitsListBySubscriptionLocationResourceSample.ts
[vmfamiliesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/vmFamiliesGetSample.ts
[vmfamilieslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/typescript/src/vmFamiliesListBySubscriptionLocationResourceSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computelimit
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computelimit/arm-computelimit/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

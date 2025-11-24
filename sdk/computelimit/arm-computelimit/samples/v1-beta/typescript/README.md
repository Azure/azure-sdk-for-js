# @azure/arm-computelimit client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-computelimit in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [guestSubscriptionsCreateSample.ts][guestsubscriptionscreatesample]                                                         | adds a subscription as a guest to consume the compute limits shared by the host subscription. x-ms-original-file: 2025-08-15/GuestSubscriptions_Create.json           |
| [guestSubscriptionsDeleteSample.ts][guestsubscriptionsdeletesample]                                                         | deletes a subscription as a guest to stop consuming the compute limits shared by the host subscription. x-ms-original-file: 2025-08-15/GuestSubscriptions_Delete.json |
| [guestSubscriptionsGetSample.ts][guestsubscriptionsgetsample]                                                               | gets the properties of a guest subscription. x-ms-original-file: 2025-08-15/GuestSubscriptions_Get.json                                                               |
| [guestSubscriptionsListBySubscriptionLocationResourceSample.ts][guestsubscriptionslistbysubscriptionlocationresourcesample] | lists all guest subscriptions in a location. x-ms-original-file: 2025-08-15/GuestSubscriptions_List.json                                                              |
| [operationsListSample.ts][operationslistsample]                                                                             | list the operations for the provider x-ms-original-file: 2025-08-15/Operations_List.json                                                                              |
| [sharedLimitsCreateSample.ts][sharedlimitscreatesample]                                                                     | enables sharing of a compute limit by the host subscription with its guest subscriptions. x-ms-original-file: 2025-08-15/SharedLimits_Create.json                     |
| [sharedLimitsDeleteSample.ts][sharedlimitsdeletesample]                                                                     | disables sharing of a compute limit by the host subscription with its guest subscriptions. x-ms-original-file: 2025-08-15/SharedLimits_Delete.json                    |
| [sharedLimitsGetSample.ts][sharedlimitsgetsample]                                                                           | gets the properties of a compute limit shared by the host subscription with its guest subscriptions. x-ms-original-file: 2025-08-15/SharedLimits_Get.json             |
| [sharedLimitsListBySubscriptionLocationResourceSample.ts][sharedlimitslistbysubscriptionlocationresourcesample]             | lists all compute limits shared by the host subscription with its guest subscriptions. x-ms-original-file: 2025-08-15/SharedLimits_List.json                          |

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
node dist/guestSubscriptionsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/guestSubscriptionsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[guestsubscriptionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1-beta/typescript/src/guestSubscriptionsCreateSample.ts
[guestsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1-beta/typescript/src/guestSubscriptionsDeleteSample.ts
[guestsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1-beta/typescript/src/guestSubscriptionsGetSample.ts
[guestsubscriptionslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1-beta/typescript/src/guestSubscriptionsListBySubscriptionLocationResourceSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1-beta/typescript/src/operationsListSample.ts
[sharedlimitscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1-beta/typescript/src/sharedLimitsCreateSample.ts
[sharedlimitsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1-beta/typescript/src/sharedLimitsDeleteSample.ts
[sharedlimitsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1-beta/typescript/src/sharedLimitsGetSample.ts
[sharedlimitslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1-beta/typescript/src/sharedLimitsListBySubscriptionLocationResourceSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computelimit?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computelimit/arm-computelimit/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

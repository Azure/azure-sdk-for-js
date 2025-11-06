# @azure/arm-computelimit client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-computelimit in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [guestSubscriptionsCreateSample.js][guestsubscriptionscreatesample]                                                         | adds a subscription as a guest to consume the compute limits shared by the host subscription. x-ms-original-file: 2025-08-15/GuestSubscriptions_Create.json           |
| [guestSubscriptionsDeleteSample.js][guestsubscriptionsdeletesample]                                                         | deletes a subscription as a guest to stop consuming the compute limits shared by the host subscription. x-ms-original-file: 2025-08-15/GuestSubscriptions_Delete.json |
| [guestSubscriptionsGetSample.js][guestsubscriptionsgetsample]                                                               | gets the properties of a guest subscription. x-ms-original-file: 2025-08-15/GuestSubscriptions_Get.json                                                               |
| [guestSubscriptionsListBySubscriptionLocationResourceSample.js][guestsubscriptionslistbysubscriptionlocationresourcesample] | lists all guest subscriptions in a location. x-ms-original-file: 2025-08-15/GuestSubscriptions_List.json                                                              |
| [operationsListSample.js][operationslistsample]                                                                             | list the operations for the provider x-ms-original-file: 2025-08-15/Operations_List.json                                                                              |
| [sharedLimitsCreateSample.js][sharedlimitscreatesample]                                                                     | enables sharing of a compute limit by the host subscription with its guest subscriptions. x-ms-original-file: 2025-08-15/SharedLimits_Create.json                     |
| [sharedLimitsDeleteSample.js][sharedlimitsdeletesample]                                                                     | disables sharing of a compute limit by the host subscription with its guest subscriptions. x-ms-original-file: 2025-08-15/SharedLimits_Delete.json                    |
| [sharedLimitsGetSample.js][sharedlimitsgetsample]                                                                           | gets the properties of a compute limit shared by the host subscription with its guest subscriptions. x-ms-original-file: 2025-08-15/SharedLimits_Get.json             |
| [sharedLimitsListBySubscriptionLocationResourceSample.js][sharedlimitslistbysubscriptionlocationresourcesample]             | lists all compute limits shared by the host subscription with its guest subscriptions. x-ms-original-file: 2025-08-15/SharedLimits_List.json                          |

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
node guestSubscriptionsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node guestSubscriptionsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[guestsubscriptionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/javascript/guestSubscriptionsCreateSample.js
[guestsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/javascript/guestSubscriptionsDeleteSample.js
[guestsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/javascript/guestSubscriptionsGetSample.js
[guestsubscriptionslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/javascript/guestSubscriptionsListBySubscriptionLocationResourceSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/javascript/operationsListSample.js
[sharedlimitscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/javascript/sharedLimitsCreateSample.js
[sharedlimitsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/javascript/sharedLimitsDeleteSample.js
[sharedlimitsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/javascript/sharedLimitsGetSample.js
[sharedlimitslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computelimit/arm-computelimit/samples/v1/javascript/sharedLimitsListBySubscriptionLocationResourceSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computelimit?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computelimit/arm-computelimit/README.md

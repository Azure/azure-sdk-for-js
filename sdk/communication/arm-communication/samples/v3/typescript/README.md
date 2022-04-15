# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [communicationServiceCheckNameAvailabilitySample.ts][communicationservicechecknameavailabilitysample] | Checks that the CommunicationService name is valid and is not already in use. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2020-08-20/examples/checkNameAvailabilityAvailable.json                  |
| [communicationServiceCreateOrUpdateSample.ts][communicationservicecreateorupdatesample]               | Create a new CommunicationService or update an existing CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2020-08-20/examples/createOrUpdate.json                                  |
| [communicationServiceDeleteSample.ts][communicationservicedeletesample]                               | Operation to delete a CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2020-08-20/examples/delete.json                                                                            |
| [communicationServiceGetSample.ts][communicationservicegetsample]                                     | Get the CommunicationService and its properties. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2020-08-20/examples/get.json                                                                          |
| [communicationServiceLinkNotificationHubSample.ts][communicationservicelinknotificationhubsample]     | Links an Azure Notification Hub to this communication service. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2020-08-20/examples/linkNotificationHub.json                                            |
| [communicationServiceListByResourceGroupSample.ts][communicationservicelistbyresourcegroupsample]     | Handles requests to list all resources in a resource group. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2020-08-20/examples/listByResourceGroup.json                                               |
| [communicationServiceListBySubscriptionSample.ts][communicationservicelistbysubscriptionsample]       | Handles requests to list all resources in a subscription. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2020-08-20/examples/listBySubscription.json                                                  |
| [communicationServiceListKeysSample.ts][communicationservicelistkeyssample]                           | Get the access keys of the CommunicationService resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2020-08-20/examples/listKeys.json                                                            |
| [communicationServiceRegenerateKeySample.ts][communicationserviceregeneratekeysample]                 | Regenerate CommunicationService access key. PrimaryKey and SecondaryKey cannot be regenerated at the same time. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2020-08-20/examples/regenerateKey.json |
| [communicationServiceUpdateSample.ts][communicationserviceupdatesample]                               | Operation to update an existing CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2020-08-20/examples/update.json                                                                  |

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
node dist/communicationServiceCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/communicationServiceCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[communicationservicechecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v3/typescript/src/communicationServiceCheckNameAvailabilitySample.ts
[communicationservicecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v3/typescript/src/communicationServiceCreateOrUpdateSample.ts
[communicationservicedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v3/typescript/src/communicationServiceDeleteSample.ts
[communicationservicegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v3/typescript/src/communicationServiceGetSample.ts
[communicationservicelinknotificationhubsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v3/typescript/src/communicationServiceLinkNotificationHubSample.ts
[communicationservicelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v3/typescript/src/communicationServiceListByResourceGroupSample.ts
[communicationservicelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v3/typescript/src/communicationServiceListBySubscriptionSample.ts
[communicationservicelistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v3/typescript/src/communicationServiceListKeysSample.ts
[communicationserviceregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v3/typescript/src/communicationServiceRegenerateKeySample.ts
[communicationserviceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v3/typescript/src/communicationServiceUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-communication?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/arm-communication/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

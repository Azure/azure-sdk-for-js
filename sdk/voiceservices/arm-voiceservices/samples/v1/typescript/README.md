# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [communicationsGatewaysCreateOrUpdateSample.ts][communicationsgatewayscreateorupdatesample]           | Create a CommunicationsGateway x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_CreateOrUpdate.json                              |
| [communicationsGatewaysDeleteSample.ts][communicationsgatewaysdeletesample]                           | Delete a CommunicationsGateway x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_Delete.json                                      |
| [communicationsGatewaysGetSample.ts][communicationsgatewaysgetsample]                                 | Get a CommunicationsGateway x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_Get.json                                            |
| [communicationsGatewaysListByResourceGroupSample.ts][communicationsgatewayslistbyresourcegroupsample] | List CommunicationsGateway resources by resource group x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_ListByResourceGroup.json |
| [communicationsGatewaysListBySubscriptionSample.ts][communicationsgatewayslistbysubscriptionsample]   | List CommunicationsGateway resources by subscription ID x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_ListBySubscription.json |
| [communicationsGatewaysUpdateSample.ts][communicationsgatewaysupdatesample]                           | Update a CommunicationsGateway x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_Update.json                                      |
| [nameAvailabilityCheckLocalSample.ts][nameavailabilitychecklocalsample]                               | Check whether the resource name is available in the given region. x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/NameAvailability_CheckLocal.json     |
| [operationsListSample.ts][operationslistsample]                                                       | List the operations for the provider x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/Operations_List.json                                              |
| [testLinesCreateOrUpdateSample.ts][testlinescreateorupdatesample]                                     | Create a TestLine x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_CreateOrUpdate.json                                                        |
| [testLinesDeleteSample.ts][testlinesdeletesample]                                                     | Delete a TestLine x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_Delete.json                                                                |
| [testLinesGetSample.ts][testlinesgetsample]                                                           | Get a TestLine x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_Get.json                                                                      |
| [testLinesListByCommunicationsGatewaySample.ts][testlineslistbycommunicationsgatewaysample]           | List TestLine resources by CommunicationsGateway x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_ListByCommunicationsGateway.json            |
| [testLinesUpdateSample.ts][testlinesupdatesample]                                                     | Update a TestLine x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_Update.json                                                                |

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
node dist/communicationsGatewaysCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env VOICESERVICES_SUBSCRIPTION_ID="<voiceservices subscription id>" VOICESERVICES_RESOURCE_GROUP="<voiceservices resource group>" node dist/communicationsGatewaysCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[communicationsgatewayscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/communicationsGatewaysCreateOrUpdateSample.ts
[communicationsgatewaysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/communicationsGatewaysDeleteSample.ts
[communicationsgatewaysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/communicationsGatewaysGetSample.ts
[communicationsgatewayslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/communicationsGatewaysListByResourceGroupSample.ts
[communicationsgatewayslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/communicationsGatewaysListBySubscriptionSample.ts
[communicationsgatewaysupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/communicationsGatewaysUpdateSample.ts
[nameavailabilitychecklocalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/nameAvailabilityCheckLocalSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/operationsListSample.ts
[testlinescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/testLinesCreateOrUpdateSample.ts
[testlinesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/testLinesDeleteSample.ts
[testlinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/testLinesGetSample.ts
[testlineslistbycommunicationsgatewaysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/testLinesListByCommunicationsGatewaySample.ts
[testlinesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/typescript/src/testLinesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-voiceservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/voiceservices/arm-voiceservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

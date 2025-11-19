# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [communicationsGatewaysCreateOrUpdateSample.js][communicationsgatewayscreateorupdatesample]           | Create a CommunicationsGateway x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_CreateOrUpdate.json                              |
| [communicationsGatewaysDeleteSample.js][communicationsgatewaysdeletesample]                           | Delete a CommunicationsGateway x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_Delete.json                                      |
| [communicationsGatewaysGetSample.js][communicationsgatewaysgetsample]                                 | Get a CommunicationsGateway x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_Get.json                                            |
| [communicationsGatewaysListByResourceGroupSample.js][communicationsgatewayslistbyresourcegroupsample] | List CommunicationsGateway resources by resource group x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_ListByResourceGroup.json |
| [communicationsGatewaysListBySubscriptionSample.js][communicationsgatewayslistbysubscriptionsample]   | List CommunicationsGateway resources by subscription ID x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_ListBySubscription.json |
| [communicationsGatewaysUpdateSample.js][communicationsgatewaysupdatesample]                           | Update a CommunicationsGateway x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_Update.json                                      |
| [nameAvailabilityCheckLocalSample.js][nameavailabilitychecklocalsample]                               | Check whether the resource name is available in the given region. x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/NameAvailability_CheckLocal.json     |
| [operationsListSample.js][operationslistsample]                                                       | List the operations for the provider x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/Operations_List.json                                              |
| [testLinesCreateOrUpdateSample.js][testlinescreateorupdatesample]                                     | Create a TestLine x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_CreateOrUpdate.json                                                        |
| [testLinesDeleteSample.js][testlinesdeletesample]                                                     | Delete a TestLine x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_Delete.json                                                                |
| [testLinesGetSample.js][testlinesgetsample]                                                           | Get a TestLine x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_Get.json                                                                      |
| [testLinesListByCommunicationsGatewaySample.js][testlineslistbycommunicationsgatewaysample]           | List TestLine resources by CommunicationsGateway x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_ListByCommunicationsGateway.json            |
| [testLinesUpdateSample.js][testlinesupdatesample]                                                     | Update a TestLine x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_Update.json                                                                |

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
node communicationsGatewaysCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env VOICESERVICES_SUBSCRIPTION_ID="<voiceservices subscription id>" VOICESERVICES_RESOURCE_GROUP="<voiceservices resource group>" node communicationsGatewaysCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[communicationsgatewayscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/communicationsGatewaysCreateOrUpdateSample.js
[communicationsgatewaysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/communicationsGatewaysDeleteSample.js
[communicationsgatewaysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/communicationsGatewaysGetSample.js
[communicationsgatewayslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/communicationsGatewaysListByResourceGroupSample.js
[communicationsgatewayslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/communicationsGatewaysListBySubscriptionSample.js
[communicationsgatewaysupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/communicationsGatewaysUpdateSample.js
[nameavailabilitychecklocalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/nameAvailabilityCheckLocalSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/operationsListSample.js
[testlinescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/testLinesCreateOrUpdateSample.js
[testlinesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/testLinesDeleteSample.js
[testlinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/testLinesGetSample.js
[testlineslistbycommunicationsgatewaysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/testLinesListByCommunicationsGatewaySample.js
[testlinesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voiceservices/arm-voiceservices/samples/v1/javascript/testLinesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-voiceservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/voiceservices/arm-voiceservices/README.md

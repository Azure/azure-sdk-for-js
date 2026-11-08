# @azure/arm-aigateway client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-aigateway in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                             |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [aiGatewayResourcesCreateOrUpdateSample.js][aigatewayresourcescreateorupdatesample]           | create a AiGatewayResource x-ms-original-file: 2026-09-01-preview/AiGatewayCreate.json                                                                      |
| [aiGatewayResourcesDeleteSample.js][aigatewayresourcesdeletesample]                           | delete a AiGatewayResource x-ms-original-file: 2026-09-01-preview/AiGatewayDelete.json                                                                      |
| [aiGatewayResourcesGetSample.js][aigatewayresourcesgetsample]                                 | get a AiGatewayResource x-ms-original-file: 2026-09-01-preview/AiGatewayGet.json                                                                            |
| [aiGatewayResourcesListByResourceGroupSample.js][aigatewayresourceslistbyresourcegroupsample] | list AiGatewayResource resources by resource group x-ms-original-file: 2026-09-01-preview/AiGatewayListByResourceGroup.json                                 |
| [aiGatewayResourcesListBySubscriptionSample.js][aigatewayresourceslistbysubscriptionsample]   | list AiGatewayResource resources by subscription ID x-ms-original-file: 2026-09-01-preview/AiGatewayListBySubscription.json                                 |
| [aiGatewayResourcesUpdateSample.js][aigatewayresourcesupdatesample]                           | update a AiGatewayResource x-ms-original-file: 2026-09-01-preview/AiGatewayUpdate.json                                                                      |
| [operationsListSample.js][operationslistsample]                                               | lists all of the available REST API operations of the Microsoft.ApiManagement provider. x-ms-original-file: 2026-09-01-preview/AIGatewayListOperations.json |

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
node aiGatewayResourcesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node aiGatewayResourcesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[aigatewayresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/javascript/aiGatewayResourcesCreateOrUpdateSample.js
[aigatewayresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/javascript/aiGatewayResourcesDeleteSample.js
[aigatewayresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/javascript/aiGatewayResourcesGetSample.js
[aigatewayresourceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/javascript/aiGatewayResourcesListByResourceGroupSample.js
[aigatewayresourceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/javascript/aiGatewayResourcesListBySubscriptionSample.js
[aigatewayresourcesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/javascript/aiGatewayResourcesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/arm-aigateway/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-aigateway?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/apimanagement/arm-aigateway/README.md

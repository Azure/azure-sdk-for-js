# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                             | **Description**                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [appsCheckNameAvailability.js][appschecknameavailability] | Check if an IoT Central application name is available. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_CheckNameAvailability.json                                                                                                                                                                                                                      |
| [appsCreateOrUpdate.js][appscreateorupdate]               | Create or update the metadata of an IoT Central application. The usual pattern to modify a property is to retrieve the IoT Central application metadata and security metadata, and then combine them with the modified values in a new body to update the IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_CreateOrUpdate.json |
| [appsDelete.js][appsdelete]                               | Delete an IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_Delete.json                                                                                                                                                                                                                                                         |
| [appsGet.js][appsget]                                     | Get the metadata of an IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_Get.json                                                                                                                                                                                                                                               |
| [appsListByResourceGroup.js][appslistbyresourcegroup]     | Get all the IoT Central Applications in a resource group. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_ListByResourceGroup.json                                                                                                                                                                                                                     |
| [appsListBySubscription.js][appslistbysubscription]       | Get all IoT Central Applications in a subscription. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_ListBySubscription.json                                                                                                                                                                                                                            |
| [appsListTemplates.js][appslisttemplates]                 | Get all available application templates. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_Templates.json                                                                                                                                                                                                                                                |
| [appsSubdomainAvailability.js][appssubdomainavailability] | Check if an IoT Central application subdomain is available. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_CheckSubdomainAvailability.json                                                                                                                                                                                                            |
| [appsUpdate.js][appsupdate]                               | Update the metadata of an IoT Central application. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Apps_Update.json                                                                                                                                                                                                                                         |
| [operationsList.js][operationslist]                       | Lists all of the available IoT Central Resource Provider operations. x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/stable/2021-06-01/examples/Operations_List.json                                                                                                                                                                                                                   |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node appsCheckNameAvailability.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node appsCheckNameAvailability.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[appschecknameavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v6/javascript/appsCheckNameAvailability.js
[appscreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v6/javascript/appsCreateOrUpdate.js
[appsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v6/javascript/appsDelete.js
[appsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v6/javascript/appsGet.js
[appslistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v6/javascript/appsListByResourceGroup.js
[appslistbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v6/javascript/appsListBySubscription.js
[appslisttemplates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v6/javascript/appsListTemplates.js
[appssubdomainavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v6/javascript/appsSubdomainAvailability.js
[appsupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v6/javascript/appsUpdate.js
[operationslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotcentral/arm-iotcentral/samples/v6/javascript/operationsList.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-iotcentral?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iotcentral/arm-iotcentral/README.md

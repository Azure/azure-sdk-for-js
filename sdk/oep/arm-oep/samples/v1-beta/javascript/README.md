# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                         | **Description**                                                                                                                                                                                                                          |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [locationsCheckNameAvailability.js][locationschecknameavailability]   | Checks the name availability of the resource with requested resource name. x-ms-original-file: specification/oep/resource-manager/Microsoft.OpenEnergyPlatform/preview/2021-06-01-preview/examples/Locations_CheckNameAvailability.json  |
| [oepResourceCreate.js][oepresourcecreate]                             | Method that gets called if subscribed for ResourceCreationBegin trigger. x-ms-original-file: specification/oep/resource-manager/Microsoft.OpenEnergyPlatform/preview/2021-06-01-preview/examples/OepResource_Create.json                 |
| [oepResourceDelete.js][oepresourcedelete]                             | Deletes oep resource x-ms-original-file: specification/oep/resource-manager/Microsoft.OpenEnergyPlatform/preview/2021-06-01-preview/examples/OepResource_Delete.json                                                                     |
| [oepResourceGet.js][oepresourceget]                                   | Returns oep resource for a given name. x-ms-original-file: specification/oep/resource-manager/Microsoft.OpenEnergyPlatform/preview/2021-06-01-preview/examples/OepResource_Get.json                                                      |
| [oepResourceListByResourceGroup.js][oepresourcelistbyresourcegroup]   | Returns list of oep resources.. x-ms-original-file: specification/oep/resource-manager/Microsoft.OpenEnergyPlatform/preview/2021-06-01-preview/examples/OepResource_ListByResourceGroup.json                                             |
| [oepResourceListBySubscriptionId.js][oepresourcelistbysubscriptionid] | Lists a collection of oep resources under the given Azure Subscription ID. x-ms-original-file: specification/oep/resource-manager/Microsoft.OpenEnergyPlatform/preview/2021-06-01-preview/examples/OepResource_ListBySubscriptionId.json |
| [oepResourceUpdate.js][oepresourceupdate]                             | x-ms-original-file: specification/oep/resource-manager/Microsoft.OpenEnergyPlatform/preview/2021-06-01-preview/examples/OepResource_Update.json                                                                                          |
| [operationsList.js][operationslist]                                   | Lists the available operations of Microsoft.OpenEnergyPlatform resource provider. x-ms-original-file: specification/oep/resource-manager/Microsoft.OpenEnergyPlatform/preview/2021-06-01-preview/examples/Operations_List.json           |

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
node locationsCheckNameAvailability.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node locationsCheckNameAvailability.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[locationschecknameavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oep/arm-oep/samples/v1-beta/javascript/locationsCheckNameAvailability.js
[oepresourcecreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oep/arm-oep/samples/v1-beta/javascript/oepResourceCreate.js
[oepresourcedelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oep/arm-oep/samples/v1-beta/javascript/oepResourceDelete.js
[oepresourceget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oep/arm-oep/samples/v1-beta/javascript/oepResourceGet.js
[oepresourcelistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oep/arm-oep/samples/v1-beta/javascript/oepResourceListByResourceGroup.js
[oepresourcelistbysubscriptionid]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oep/arm-oep/samples/v1-beta/javascript/oepResourceListBySubscriptionId.js
[oepresourceupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oep/arm-oep/samples/v1-beta/javascript/oepResourceUpdate.js
[operationslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oep/arm-oep/samples/v1-beta/javascript/operationsList.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-oep?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/oep/arm-oep/README.md

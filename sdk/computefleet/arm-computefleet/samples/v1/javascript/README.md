# @azure/arm-computefleet client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-computefleet in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                       |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [fleetsCreateOrUpdateSample.js][fleetscreateorupdatesample]                           | create a Fleet x-ms-original-file: 2024-11-01/Fleets_CreateOrUpdate.json                                              |
| [fleetsDeleteSample.js][fleetsdeletesample]                                           | delete a Fleet x-ms-original-file: 2024-11-01/Fleets_Delete.json                                                      |
| [fleetsGetSample.js][fleetsgetsample]                                                 | get a Fleet x-ms-original-file: 2024-11-01/Fleets_Get.json                                                            |
| [fleetsListByResourceGroupSample.js][fleetslistbyresourcegroupsample]                 | list Fleet resources by resource group x-ms-original-file: 2024-11-01/Fleets_ListByResourceGroup.json                 |
| [fleetsListBySubscriptionSample.js][fleetslistbysubscriptionsample]                   | list Fleet resources by subscription ID x-ms-original-file: 2024-11-01/Fleets_ListBySubscription.json                 |
| [fleetsListVirtualMachineScaleSetsSample.js][fleetslistvirtualmachinescalesetssample] | list VirtualMachineScaleSet resources by Fleet x-ms-original-file: 2024-11-01/Fleets_ListVirtualMachineScaleSets.json |
| [fleetsUpdateSample.js][fleetsupdatesample]                                           | update a Fleet x-ms-original-file: 2024-11-01/Fleets_Update.json                                                      |
| [operationsListSample.js][operationslistsample]                                       | list the operations for the provider x-ms-original-file: 2024-11-01/Operations_List.json                              |

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
node fleetsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node fleetsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[fleetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v1/javascript/fleetsCreateOrUpdateSample.js
[fleetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v1/javascript/fleetsDeleteSample.js
[fleetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v1/javascript/fleetsGetSample.js
[fleetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v1/javascript/fleetsListByResourceGroupSample.js
[fleetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v1/javascript/fleetsListBySubscriptionSample.js
[fleetslistvirtualmachinescalesetssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v1/javascript/fleetsListVirtualMachineScaleSetsSample.js
[fleetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v1/javascript/fleetsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v1/javascript/operationsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-computefleet?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computefleet/arm-computefleet/README.md

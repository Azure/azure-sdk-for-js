# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [fluidRelayContainersDeleteSample.js][fluidrelaycontainersdeletesample]                                   | Delete a Fluid Relay container. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayContainers_Delete.json                                                                   |
| [fluidRelayContainersGetSample.js][fluidrelaycontainersgetsample]                                         | Get a Fluid Relay container. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayContainers_Get.json                                                                         |
| [fluidRelayContainersListByFluidRelayServersSample.js][fluidrelaycontainerslistbyfluidrelayserverssample] | List all Fluid Relay containers which are children of a given Fluid Relay server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayContainers_ListByFluidRelayServer.json |
| [fluidRelayOperationsListSample.js][fluidrelayoperationslistsample]                                       | List all operations provided by Microsoft.FluidRelay. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServerOperations.json                                              |
| [fluidRelayServersCreateOrUpdateSample.js][fluidrelayserverscreateorupdatesample]                         | Create or Update a Fluid Relay server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_CreateOrUpdate.json                                                       |
| [fluidRelayServersDeleteSample.js][fluidrelayserversdeletesample]                                         | Delete a Fluid Relay server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_Delete.json                                                                         |
| [fluidRelayServersGetSample.js][fluidrelayserversgetsample]                                               | Get a Fluid Relay server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_Get.json                                                                               |
| [fluidRelayServersListByResourceGroupSample.js][fluidrelayserverslistbyresourcegroupsample]               | List all Fluid Relay servers in a resource group. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_ListByResourceGroup.json                                       |
| [fluidRelayServersListBySubscriptionSample.js][fluidrelayserverslistbysubscriptionsample]                 | List all Fluid Relay servers in a subscription. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_ListBySubscription.json                                          |
| [fluidRelayServersListKeysSample.js][fluidrelayserverslistkeyssample]                                     | Get primary and secondary key for this server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_ListKeys.json                                                     |
| [fluidRelayServersRegenerateKeySample.js][fluidrelayserversregeneratekeysample]                           | Regenerate the primary or secondary key for this server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_RegenerateKeys.json                                     |
| [fluidRelayServersUpdateSample.js][fluidrelayserversupdatesample]                                         | Update a Fluid Relay server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_Update.json                                                                         |

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
node fluidRelayContainersDeleteSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env FLUIDRELAY_SUBSCRIPTION_ID="<fluidrelay subscription id>" node fluidRelayContainersDeleteSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[fluidrelaycontainersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayContainersDeleteSample.js
[fluidrelaycontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayContainersGetSample.js
[fluidrelaycontainerslistbyfluidrelayserverssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayContainersListByFluidRelayServersSample.js
[fluidrelayoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayOperationsListSample.js
[fluidrelayserverscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayServersCreateOrUpdateSample.js
[fluidrelayserversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayServersDeleteSample.js
[fluidrelayserversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayServersGetSample.js
[fluidrelayserverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayServersListByResourceGroupSample.js
[fluidrelayserverslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayServersListBySubscriptionSample.js
[fluidrelayserverslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayServersListKeysSample.js
[fluidrelayserversregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayServersRegenerateKeySample.js
[fluidrelayserversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/javascript/fluidRelayServersUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-fluidrelay?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/fluidrelay/arm-fluidrelay/README.md

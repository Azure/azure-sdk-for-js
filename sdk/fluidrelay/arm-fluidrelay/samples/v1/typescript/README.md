# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [fluidRelayContainersDeleteSample.ts][fluidrelaycontainersdeletesample]                                   | Delete a Fluid Relay container. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayContainers_Delete.json                                                                   |
| [fluidRelayContainersGetSample.ts][fluidrelaycontainersgetsample]                                         | Get a Fluid Relay container. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayContainers_Get.json                                                                         |
| [fluidRelayContainersListByFluidRelayServersSample.ts][fluidrelaycontainerslistbyfluidrelayserverssample] | List all Fluid Relay containers which are children of a given Fluid Relay server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayContainers_ListByFluidRelayServer.json |
| [fluidRelayOperationsListSample.ts][fluidrelayoperationslistsample]                                       | List all operations provided by Microsoft.FluidRelay. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServerOperations.json                                              |
| [fluidRelayServersCreateOrUpdateSample.ts][fluidrelayserverscreateorupdatesample]                         | Create or Update a Fluid Relay server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_CreateOrUpdate.json                                                       |
| [fluidRelayServersDeleteSample.ts][fluidrelayserversdeletesample]                                         | Delete a Fluid Relay server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_Delete.json                                                                         |
| [fluidRelayServersGetSample.ts][fluidrelayserversgetsample]                                               | Get a Fluid Relay server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_Get.json                                                                               |
| [fluidRelayServersListByResourceGroupSample.ts][fluidrelayserverslistbyresourcegroupsample]               | List all Fluid Relay servers in a resource group. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_ListByResourceGroup.json                                       |
| [fluidRelayServersListBySubscriptionSample.ts][fluidrelayserverslistbysubscriptionsample]                 | List all Fluid Relay servers in a subscription. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_ListBySubscription.json                                          |
| [fluidRelayServersListKeysSample.ts][fluidrelayserverslistkeyssample]                                     | Get primary and secondary key for this server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_ListKeys.json                                                     |
| [fluidRelayServersRegenerateKeySample.ts][fluidrelayserversregeneratekeysample]                           | Regenerate the primary or secondary key for this server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_RegenerateKeys.json                                     |
| [fluidRelayServersUpdateSample.ts][fluidrelayserversupdatesample]                                         | Update a Fluid Relay server. x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_Update.json                                                                         |

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
node dist/fluidRelayContainersDeleteSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env FLUIDRELAY_SUBSCRIPTION_ID="<fluidrelay subscription id>" node dist/fluidRelayContainersDeleteSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[fluidrelaycontainersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayContainersDeleteSample.ts
[fluidrelaycontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayContainersGetSample.ts
[fluidrelaycontainerslistbyfluidrelayserverssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayContainersListByFluidRelayServersSample.ts
[fluidrelayoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayOperationsListSample.ts
[fluidrelayserverscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayServersCreateOrUpdateSample.ts
[fluidrelayserversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayServersDeleteSample.ts
[fluidrelayserversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayServersGetSample.ts
[fluidrelayserverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayServersListByResourceGroupSample.ts
[fluidrelayserverslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayServersListBySubscriptionSample.ts
[fluidrelayserverslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayServersListKeysSample.ts
[fluidrelayserversregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayServersRegenerateKeySample.ts
[fluidrelayserversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fluidrelay/arm-fluidrelay/samples/v1/typescript/src/fluidRelayServersUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-fluidrelay?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/fluidrelay/arm-fluidrelay/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

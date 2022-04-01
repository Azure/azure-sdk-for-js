# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dedicatedHsmCreateOrUpdateSample.ts][dedicatedhsmcreateorupdatesample]                                                     | Create or Update a dedicated HSM in the specified subscription. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_CreateOrUpdate.json                                                                                                                                     |
| [dedicatedHsmDeleteSample.ts][dedicatedhsmdeletesample]                                                                     | Deletes the specified Azure Dedicated HSM. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_Delete.json                                                                                                                                                                  |
| [dedicatedHsmGetSample.ts][dedicatedhsmgetsample]                                                                           | Gets the specified Azure dedicated HSM. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_Get.json                                                                                                                                                                        |
| [dedicatedHsmListByResourceGroupSample.ts][dedicatedhsmlistbyresourcegroupsample]                                           | The List operation gets information about the dedicated hsms associated with the subscription and within the specified resource group. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_ListByResourceGroup.json                                                         |
| [dedicatedHsmListBySubscriptionSample.ts][dedicatedhsmlistbysubscriptionsample]                                             | The List operation gets information about the dedicated HSMs associated with the subscription. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_ListBySubscription.json                                                                                                  |
| [dedicatedHsmListOutboundNetworkDependenciesEndpointsSample.ts][dedicatedhsmlistoutboundnetworkdependenciesendpointssample] | Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified dedicated hsm resource. The operation returns properties of each egress endpoint. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/GetOutboundNetworkDependenciesEndpointsList.json |
| [dedicatedHsmUpdateSample.ts][dedicatedhsmupdatesample]                                                                     | Update a dedicated HSM in the specified subscription. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_Update.json                                                                                                                                                       |
| [operationsListSample.ts][operationslistsample]                                                                             | Get a list of Dedicated HSM operations. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_OperationsList.json                                                                                                                                                             |

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
node dist/dedicatedHsmCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/dedicatedHsmCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dedicatedhsmcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/typescript/src/dedicatedHsmCreateOrUpdateSample.ts
[dedicatedhsmdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/typescript/src/dedicatedHsmDeleteSample.ts
[dedicatedhsmgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/typescript/src/dedicatedHsmGetSample.ts
[dedicatedhsmlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/typescript/src/dedicatedHsmListByResourceGroupSample.ts
[dedicatedhsmlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/typescript/src/dedicatedHsmListBySubscriptionSample.ts
[dedicatedhsmlistoutboundnetworkdependenciesendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/typescript/src/dedicatedHsmListOutboundNetworkDependenciesEndpointsSample.ts
[dedicatedhsmupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/typescript/src/dedicatedHsmUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-hardwaresecuritymodules?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

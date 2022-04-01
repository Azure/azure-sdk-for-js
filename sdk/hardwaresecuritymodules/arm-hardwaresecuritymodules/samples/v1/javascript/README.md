# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dedicatedHsmCreateOrUpdateSample.js][dedicatedhsmcreateorupdatesample]                                                     | Create or Update a dedicated HSM in the specified subscription. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_CreateOrUpdate.json                                                                                                                                     |
| [dedicatedHsmDeleteSample.js][dedicatedhsmdeletesample]                                                                     | Deletes the specified Azure Dedicated HSM. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_Delete.json                                                                                                                                                                  |
| [dedicatedHsmGetSample.js][dedicatedhsmgetsample]                                                                           | Gets the specified Azure dedicated HSM. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_Get.json                                                                                                                                                                        |
| [dedicatedHsmListByResourceGroupSample.js][dedicatedhsmlistbyresourcegroupsample]                                           | The List operation gets information about the dedicated hsms associated with the subscription and within the specified resource group. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_ListByResourceGroup.json                                                         |
| [dedicatedHsmListBySubscriptionSample.js][dedicatedhsmlistbysubscriptionsample]                                             | The List operation gets information about the dedicated HSMs associated with the subscription. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_ListBySubscription.json                                                                                                  |
| [dedicatedHsmListOutboundNetworkDependenciesEndpointsSample.js][dedicatedhsmlistoutboundnetworkdependenciesendpointssample] | Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified dedicated hsm resource. The operation returns properties of each egress endpoint. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/GetOutboundNetworkDependenciesEndpointsList.json |
| [dedicatedHsmUpdateSample.js][dedicatedhsmupdatesample]                                                                     | Update a dedicated HSM in the specified subscription. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_Update.json                                                                                                                                                       |
| [operationsListSample.js][operationslistsample]                                                                             | Get a list of Dedicated HSM operations. x-ms-original-file: specification/hardwaresecuritymodules/resource-manager/Microsoft.HardwareSecurityModules/stable/2021-11-30/examples/DedicatedHsm_OperationsList.json                                                                                                                                                             |

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
node dedicatedHsmCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dedicatedHsmCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dedicatedhsmcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/javascript/dedicatedHsmCreateOrUpdateSample.js
[dedicatedhsmdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/javascript/dedicatedHsmDeleteSample.js
[dedicatedhsmgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/javascript/dedicatedHsmGetSample.js
[dedicatedhsmlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/javascript/dedicatedHsmListByResourceGroupSample.js
[dedicatedhsmlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/javascript/dedicatedHsmListBySubscriptionSample.js
[dedicatedhsmlistoutboundnetworkdependenciesendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/javascript/dedicatedHsmListOutboundNetworkDependenciesEndpointsSample.js
[dedicatedhsmupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/javascript/dedicatedHsmUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v1/javascript/operationsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-hardwaresecuritymodules?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/README.md

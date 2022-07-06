# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [customizationPoliciesGetSample.ts][customizationpoliciesgetsample]                                   | Returns customization policy by its name x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetCustomizationPolicy.json                                   |
| [customizationPoliciesListSample.ts][customizationpolicieslistsample]                                 | Returns list of customization policies in region for private cloud x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListCustomizationPolicies.json      |
| [dedicatedCloudNodesCreateOrUpdateSample.ts][dedicatedcloudnodescreateorupdatesample]                 | Returns dedicated cloud node by its name x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/CreateDedicatedCloudNode.json                                 |
| [dedicatedCloudNodesDeleteSample.ts][dedicatedcloudnodesdeletesample]                                 | Delete dedicated cloud node x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/DeleteDedicatedCloudNode.json                                              |
| [dedicatedCloudNodesGetSample.ts][dedicatedcloudnodesgetsample]                                       | Returns dedicated cloud node x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetDedicatedCloudNode.json                                                |
| [dedicatedCloudNodesListByResourceGroupSample.ts][dedicatedcloudnodeslistbyresourcegroupsample]       | Returns list of dedicate cloud nodes within resource group x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListRGDedicatedCloudNodes.json              |
| [dedicatedCloudNodesListBySubscriptionSample.ts][dedicatedcloudnodeslistbysubscriptionsample]         | Returns list of dedicate cloud nodes within subscription x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListDedicatedCloudNodes.json                  |
| [dedicatedCloudNodesUpdateSample.ts][dedicatedcloudnodesupdatesample]                                 | Patches dedicated node properties x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/PatchDedicatedCloudNode.json                                         |
| [dedicatedCloudServicesCreateOrUpdateSample.ts][dedicatedcloudservicescreateorupdatesample]           | Create dedicate cloud service x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/CreateDedicatedCloudService.json                                         |
| [dedicatedCloudServicesDeleteSample.ts][dedicatedcloudservicesdeletesample]                           | Delete dedicate cloud service x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/DeleteDedicatedCloudService.json                                         |
| [dedicatedCloudServicesGetSample.ts][dedicatedcloudservicesgetsample]                                 | Returns Dedicate Cloud Service x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetDedicatedCloudService.json                                           |
| [dedicatedCloudServicesListByResourceGroupSample.ts][dedicatedcloudserviceslistbyresourcegroupsample] | Returns list of dedicated cloud services within a resource group x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListRGDedicatedCloudServices.json     |
| [dedicatedCloudServicesListBySubscriptionSample.ts][dedicatedcloudserviceslistbysubscriptionsample]   | Returns list of dedicated cloud services within a subscription x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListDedicatedCloudServices.json         |
| [dedicatedCloudServicesUpdateSample.ts][dedicatedcloudservicesupdatesample]                           | Patch dedicated cloud service's properties x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/PatchDedicatedService.json                                  |
| [operationsGetSample.ts][operationsgetsample]                                                         | Return an async operation x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetFailedOperationResult.json                                                |
| [operationsListSample.ts][operationslistsample]                                                       | Return list of operations x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListOperations.json                                                          |
| [privateCloudsGetSample.ts][privatecloudsgetsample]                                                   | Returns private cloud by its name x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetPrivateCloud.json                                                 |
| [privateCloudsListSample.ts][privatecloudslistsample]                                                 | Returns list of private clouds in particular region x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListPrivateCloudInLocation.json                    |
| [resourcePoolsGetSample.ts][resourcepoolsgetsample]                                                   | Returns resource pool templates by its name x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetResourcePool.json                                       |
| [resourcePoolsListSample.ts][resourcepoolslistsample]                                                 | Returns list of resource pools in region for private cloud x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListResourcePools.json                      |
| [skusAvailabilityListSample.ts][skusavailabilitylistsample]                                           | Returns list of available resources in region x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListAvailabilities.json                                  |
| [usagesListSample.ts][usageslistsample]                                                               | Returns list of usage in region x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListUsages.json                                                        |
| [virtualMachineTemplatesGetSample.ts][virtualmachinetemplatesgetsample]                               | Returns virtual machine templates by its name x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetVirtualMachineTemplate.json                           |
| [virtualMachineTemplatesListSample.ts][virtualmachinetemplateslistsample]                             | Returns list of virtual machine templates in region for private cloud x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListVirtualMachineTemplates.json |
| [virtualMachinesCreateOrUpdateSample.ts][virtualmachinescreateorupdatesample]                         | Create Or Update Virtual Machine x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/CreateVirtualMachine.json                                             |
| [virtualMachinesDeleteSample.ts][virtualmachinesdeletesample]                                         | Delete virtual machine x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/DeleteVirtualMachine.json                                                       |
| [virtualMachinesGetSample.ts][virtualmachinesgetsample]                                               | Get virtual machine x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetVirtualMachine.json                                                             |
| [virtualMachinesListByResourceGroupSample.ts][virtualmachineslistbyresourcegroupsample]               | Returns list of virtual machine within resource group x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListRGVirtualMachines.json                       |
| [virtualMachinesListBySubscriptionSample.ts][virtualmachineslistbysubscriptionsample]                 | Returns list virtual machine within subscription x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListVirtualMachines.json                              |
| [virtualMachinesStartSample.ts][virtualmachinesstartsample]                                           | Power on virtual machine x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/StartVirtualMachine.json                                                      |
| [virtualMachinesStopSample.ts][virtualmachinesstopsample]                                             | Power off virtual machine, options: shutdown, poweroff, and suspend x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/StopInBodyVirtualMachine.json      |
| [virtualMachinesUpdateSample.ts][virtualmachinesupdatesample]                                         | Patch virtual machine properties x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/PatchVirtualMachine.json                                              |
| [virtualNetworksGetSample.ts][virtualnetworksgetsample]                                               | Return virtual network by its name x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetVirtualNetwork.json                                              |
| [virtualNetworksListSample.ts][virtualnetworkslistsample]                                             | Return list of virtual networks in location for private cloud x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListVirtualNetworks.json                 |

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
node dist/customizationPoliciesGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/customizationPoliciesGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[customizationpoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/customizationPoliciesGetSample.ts
[customizationpolicieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/customizationPoliciesListSample.ts
[dedicatedcloudnodescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudNodesCreateOrUpdateSample.ts
[dedicatedcloudnodesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudNodesDeleteSample.ts
[dedicatedcloudnodesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudNodesGetSample.ts
[dedicatedcloudnodeslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudNodesListByResourceGroupSample.ts
[dedicatedcloudnodeslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudNodesListBySubscriptionSample.ts
[dedicatedcloudnodesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudNodesUpdateSample.ts
[dedicatedcloudservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudServicesCreateOrUpdateSample.ts
[dedicatedcloudservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudServicesDeleteSample.ts
[dedicatedcloudservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudServicesGetSample.ts
[dedicatedcloudserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudServicesListByResourceGroupSample.ts
[dedicatedcloudserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudServicesListBySubscriptionSample.ts
[dedicatedcloudservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/dedicatedCloudServicesUpdateSample.ts
[operationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/operationsGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/operationsListSample.ts
[privatecloudsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/privateCloudsGetSample.ts
[privatecloudslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/privateCloudsListSample.ts
[resourcepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/resourcePoolsGetSample.ts
[resourcepoolslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/resourcePoolsListSample.ts
[skusavailabilitylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/skusAvailabilityListSample.ts
[usageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/usagesListSample.ts
[virtualmachinetemplatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualMachineTemplatesGetSample.ts
[virtualmachinetemplateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualMachineTemplatesListSample.ts
[virtualmachinescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualMachinesCreateOrUpdateSample.ts
[virtualmachinesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualMachinesDeleteSample.ts
[virtualmachinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualMachinesGetSample.ts
[virtualmachineslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualMachinesListByResourceGroupSample.ts
[virtualmachineslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualMachinesListBySubscriptionSample.ts
[virtualmachinesstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualMachinesStartSample.ts
[virtualmachinesstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualMachinesStopSample.ts
[virtualmachinesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualMachinesUpdateSample.ts
[virtualnetworksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualNetworksGetSample.ts
[virtualnetworkslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/samples/v3/typescript/src/virtualNetworksListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-vmwarecloudsimple?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/vmwarecloudsimple/arm-vmwarecloudsimple/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

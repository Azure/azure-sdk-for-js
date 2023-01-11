# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [associationsInterfaceCreateOrUpdateSample.ts][associationsinterfacecreateorupdatesample]                     | Create a Traffic Controller Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/AssociationPut.json                        |
| [associationsInterfaceDeleteSample.ts][associationsinterfacedeletesample]                                     | Delete a Traffic Controller Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/AssociationDelete.json                     |
| [associationsInterfaceGetSample.ts][associationsinterfacegetsample]                                           | Get a Traffic Controller Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/AssociationGet.json                           |
| [associationsInterfaceListByTrafficControllerSample.ts][associationsinterfacelistbytrafficcontrollersample]   | List Association resources by TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/AssociationsGet.json               |
| [associationsInterfaceUpdateSample.ts][associationsinterfaceupdatesample]                                     | Update a Traffic Controller Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/AssociationPatch.json                      |
| [frontendsInterfaceCreateOrUpdateSample.ts][frontendsinterfacecreateorupdatesample]                           | Create a Traffic Controller Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/FrontendPut.json                              |
| [frontendsInterfaceDeleteSample.ts][frontendsinterfacedeletesample]                                           | Delete a Traffic Controller Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/FrontendDelete.json                           |
| [frontendsInterfaceGetSample.ts][frontendsinterfacegetsample]                                                 | Get a Traffic Controller Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/FrontendGet.json                                 |
| [frontendsInterfaceListByTrafficControllerSample.ts][frontendsinterfacelistbytrafficcontrollersample]         | List Frontend resources by TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/FrontendsGet.json                     |
| [frontendsInterfaceUpdateSample.ts][frontendsinterfaceupdatesample]                                           | Update a Traffic Controller Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/FrontendPatch.json                            |
| [operationsListSample.ts][operationslistsample]                                                               | List the operations for the provider x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/OperationsList.json                           |
| [trafficControllerInterfaceCreateOrUpdateSample.ts][trafficcontrollerinterfacecreateorupdatesample]           | Create a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/TrafficControllerPut.json                               |
| [trafficControllerInterfaceDeleteSample.ts][trafficcontrollerinterfacedeletesample]                           | Delete a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/TrafficControllerDelete.json                            |
| [trafficControllerInterfaceGetSample.ts][trafficcontrollerinterfacegetsample]                                 | Get a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/TrafficControllerGet.json                                  |
| [trafficControllerInterfaceListByResourceGroupSample.ts][trafficcontrollerinterfacelistbyresourcegroupsample] | List TrafficController resources by resource group x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/TrafficControllersGet.json      |
| [trafficControllerInterfaceListBySubscriptionSample.ts][trafficcontrollerinterfacelistbysubscriptionsample]   | List TrafficController resources by subscription ID x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/TrafficControllersGetList.json |
| [trafficControllerInterfaceUpdateSample.ts][trafficcontrollerinterfaceupdatesample]                           | Update a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/cadl/examples/TrafficControllerPatch.json                             |

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
node dist/associationsInterfaceCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env SERVICENETWORKING_SUBSCRIPTION_ID="<servicenetworking subscription id>" SERVICENETWORKING_RESOURCE_GROUP="<servicenetworking resource group>" node dist/associationsInterfaceCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[associationsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/associationsInterfaceCreateOrUpdateSample.ts
[associationsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/associationsInterfaceDeleteSample.ts
[associationsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/associationsInterfaceGetSample.ts
[associationsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/associationsInterfaceListByTrafficControllerSample.ts
[associationsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/associationsInterfaceUpdateSample.ts
[frontendsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/frontendsInterfaceCreateOrUpdateSample.ts
[frontendsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/frontendsInterfaceDeleteSample.ts
[frontendsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/frontendsInterfaceGetSample.ts
[frontendsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/frontendsInterfaceListByTrafficControllerSample.ts
[frontendsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/frontendsInterfaceUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/operationsListSample.ts
[trafficcontrollerinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/trafficControllerInterfaceCreateOrUpdateSample.ts
[trafficcontrollerinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/trafficControllerInterfaceDeleteSample.ts
[trafficcontrollerinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/trafficControllerInterfaceGetSample.ts
[trafficcontrollerinterfacelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/trafficControllerInterfaceListByResourceGroupSample.ts
[trafficcontrollerinterfacelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/trafficControllerInterfaceListBySubscriptionSample.ts
[trafficcontrollerinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1-beta/typescript/src/trafficControllerInterfaceUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-servicenetworking?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicenetworking/arm-servicenetworking/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

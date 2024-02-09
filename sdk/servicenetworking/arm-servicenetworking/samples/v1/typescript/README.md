# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [associationsInterfaceCreateOrUpdateSample.ts][associationsinterfacecreateorupdatesample]                     | Create a Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationPut.json                                           |
| [associationsInterfaceDeleteSample.ts][associationsinterfacedeletesample]                                     | Delete a Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationDelete.json                                        |
| [associationsInterfaceGetSample.ts][associationsinterfacegetsample]                                           | Get a Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationGet.json                                              |
| [associationsInterfaceListByTrafficControllerSample.ts][associationsinterfacelistbytrafficcontrollersample]   | List Association resources by TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationsGet.json               |
| [associationsInterfaceUpdateSample.ts][associationsinterfaceupdatesample]                                     | Update a Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationPatch.json                                         |
| [frontendsInterfaceCreateOrUpdateSample.ts][frontendsinterfacecreateorupdatesample]                           | Create a Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/FrontendPut.json                                                 |
| [frontendsInterfaceDeleteSample.ts][frontendsinterfacedeletesample]                                           | Delete a Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/FrontendDelete.json                                              |
| [frontendsInterfaceGetSample.ts][frontendsinterfacegetsample]                                                 | Get a Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/FrontendGet.json                                                    |
| [frontendsInterfaceListByTrafficControllerSample.ts][frontendsinterfacelistbytrafficcontrollersample]         | List Frontend resources by TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/FrontendsGet.json                     |
| [frontendsInterfaceUpdateSample.ts][frontendsinterfaceupdatesample]                                           | Update a Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/FrontendPatch.json                                               |
| [operationsListSample.ts][operationslistsample]                                                               | List the operations for the provider x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/OperationsList.json                           |
| [trafficControllerInterfaceCreateOrUpdateSample.ts][trafficcontrollerinterfacecreateorupdatesample]           | Create a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllerPut.json                               |
| [trafficControllerInterfaceDeleteSample.ts][trafficcontrollerinterfacedeletesample]                           | Delete a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllerDelete.json                            |
| [trafficControllerInterfaceGetSample.ts][trafficcontrollerinterfacegetsample]                                 | Get a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllerGet.json                                  |
| [trafficControllerInterfaceListByResourceGroupSample.ts][trafficcontrollerinterfacelistbyresourcegroupsample] | List TrafficController resources by resource group x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllersGet.json      |
| [trafficControllerInterfaceListBySubscriptionSample.ts][trafficcontrollerinterfacelistbysubscriptionsample]   | List TrafficController resources by subscription ID x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllersGetList.json |
| [trafficControllerInterfaceUpdateSample.ts][trafficcontrollerinterfaceupdatesample]                           | Update a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllerPatch.json                             |

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

[associationsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/associationsInterfaceCreateOrUpdateSample.ts
[associationsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/associationsInterfaceDeleteSample.ts
[associationsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/associationsInterfaceGetSample.ts
[associationsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/associationsInterfaceListByTrafficControllerSample.ts
[associationsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/associationsInterfaceUpdateSample.ts
[frontendsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/frontendsInterfaceCreateOrUpdateSample.ts
[frontendsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/frontendsInterfaceDeleteSample.ts
[frontendsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/frontendsInterfaceGetSample.ts
[frontendsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/frontendsInterfaceListByTrafficControllerSample.ts
[frontendsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/frontendsInterfaceUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/operationsListSample.ts
[trafficcontrollerinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/trafficControllerInterfaceCreateOrUpdateSample.ts
[trafficcontrollerinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/trafficControllerInterfaceDeleteSample.ts
[trafficcontrollerinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/trafficControllerInterfaceGetSample.ts
[trafficcontrollerinterfacelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/trafficControllerInterfaceListByResourceGroupSample.ts
[trafficcontrollerinterfacelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/trafficControllerInterfaceListBySubscriptionSample.ts
[trafficcontrollerinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/typescript/src/trafficControllerInterfaceUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-servicenetworking?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicenetworking/arm-servicenetworking/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

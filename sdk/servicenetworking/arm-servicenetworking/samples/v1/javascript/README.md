# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [associationsInterfaceCreateOrUpdateSample.js][associationsinterfacecreateorupdatesample]                     | Create a Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationPut.json                                           |
| [associationsInterfaceDeleteSample.js][associationsinterfacedeletesample]                                     | Delete a Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationDelete.json                                        |
| [associationsInterfaceGetSample.js][associationsinterfacegetsample]                                           | Get a Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationGet.json                                              |
| [associationsInterfaceListByTrafficControllerSample.js][associationsinterfacelistbytrafficcontrollersample]   | List Association resources by TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationsGet.json               |
| [associationsInterfaceUpdateSample.js][associationsinterfaceupdatesample]                                     | Update a Association x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationPatch.json                                         |
| [frontendsInterfaceCreateOrUpdateSample.js][frontendsinterfacecreateorupdatesample]                           | Create a Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/FrontendPut.json                                                 |
| [frontendsInterfaceDeleteSample.js][frontendsinterfacedeletesample]                                           | Delete a Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/FrontendDelete.json                                              |
| [frontendsInterfaceGetSample.js][frontendsinterfacegetsample]                                                 | Get a Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/FrontendGet.json                                                    |
| [frontendsInterfaceListByTrafficControllerSample.js][frontendsinterfacelistbytrafficcontrollersample]         | List Frontend resources by TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/FrontendsGet.json                     |
| [frontendsInterfaceUpdateSample.js][frontendsinterfaceupdatesample]                                           | Update a Frontend x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/FrontendPatch.json                                               |
| [operationsListSample.js][operationslistsample]                                                               | List the operations for the provider x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/OperationsList.json                           |
| [trafficControllerInterfaceCreateOrUpdateSample.js][trafficcontrollerinterfacecreateorupdatesample]           | Create a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllerPut.json                               |
| [trafficControllerInterfaceDeleteSample.js][trafficcontrollerinterfacedeletesample]                           | Delete a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllerDelete.json                            |
| [trafficControllerInterfaceGetSample.js][trafficcontrollerinterfacegetsample]                                 | Get a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllerGet.json                                  |
| [trafficControllerInterfaceListByResourceGroupSample.js][trafficcontrollerinterfacelistbyresourcegroupsample] | List TrafficController resources by resource group x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllersGet.json      |
| [trafficControllerInterfaceListBySubscriptionSample.js][trafficcontrollerinterfacelistbysubscriptionsample]   | List TrafficController resources by subscription ID x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllersGetList.json |
| [trafficControllerInterfaceUpdateSample.js][trafficcontrollerinterfaceupdatesample]                           | Update a TrafficController x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/TrafficControllerPatch.json                             |

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
node associationsInterfaceCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env SERVICENETWORKING_SUBSCRIPTION_ID="<servicenetworking subscription id>" SERVICENETWORKING_RESOURCE_GROUP="<servicenetworking resource group>" node associationsInterfaceCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[associationsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/associationsInterfaceCreateOrUpdateSample.js
[associationsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/associationsInterfaceDeleteSample.js
[associationsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/associationsInterfaceGetSample.js
[associationsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/associationsInterfaceListByTrafficControllerSample.js
[associationsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/associationsInterfaceUpdateSample.js
[frontendsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/frontendsInterfaceCreateOrUpdateSample.js
[frontendsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/frontendsInterfaceDeleteSample.js
[frontendsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/frontendsInterfaceGetSample.js
[frontendsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/frontendsInterfaceListByTrafficControllerSample.js
[frontendsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/frontendsInterfaceUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/operationsListSample.js
[trafficcontrollerinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/trafficControllerInterfaceCreateOrUpdateSample.js
[trafficcontrollerinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/trafficControllerInterfaceDeleteSample.js
[trafficcontrollerinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/trafficControllerInterfaceGetSample.js
[trafficcontrollerinterfacelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/trafficControllerInterfaceListByResourceGroupSample.js
[trafficcontrollerinterfacelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/trafficControllerInterfaceListBySubscriptionSample.js
[trafficcontrollerinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v1/javascript/trafficControllerInterfaceUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-servicenetworking?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicenetworking/arm-servicenetworking/README.md

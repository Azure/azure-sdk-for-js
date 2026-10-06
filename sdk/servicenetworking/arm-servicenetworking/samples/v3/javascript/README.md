# @azure/arm-servicenetworking client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-servicenetworking in some common scenarios.

| **File Name**                                                                                                                           | **Description**                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [associationsInterfaceCreateOrUpdateSample.js][associationsinterfacecreateorupdatesample]                                               | create a Association x-ms-original-file: 2026-03-01/AssociationPut.json                                                         |
| [associationsInterfaceDeleteSample.js][associationsinterfacedeletesample]                                                               | delete a Association x-ms-original-file: 2026-03-01/AssociationDelete.json                                                      |
| [associationsInterfaceGetSample.js][associationsinterfacegetsample]                                                                     | get a Association x-ms-original-file: 2026-03-01/AssociationGet.json                                                            |
| [associationsInterfaceListByTrafficControllerSample.js][associationsinterfacelistbytrafficcontrollersample]                             | list Association resources by TrafficController x-ms-original-file: 2026-03-01/AssociationsGet.json                             |
| [associationsInterfaceUpdateSample.js][associationsinterfaceupdatesample]                                                               | update a Association x-ms-original-file: 2026-03-01/AssociationPatch.json                                                       |
| [frontendsInterfaceCreateOrUpdateSample.js][frontendsinterfacecreateorupdatesample]                                                     | create a Frontend x-ms-original-file: 2026-03-01/FrontendPut.json                                                               |
| [frontendsInterfaceDeleteSample.js][frontendsinterfacedeletesample]                                                                     | delete a Frontend x-ms-original-file: 2026-03-01/FrontendDelete.json                                                            |
| [frontendsInterfaceGetSample.js][frontendsinterfacegetsample]                                                                           | get a Frontend x-ms-original-file: 2026-03-01/FrontendGet.json                                                                  |
| [frontendsInterfaceListByTrafficControllerSample.js][frontendsinterfacelistbytrafficcontrollersample]                                   | list Frontend resources by TrafficController x-ms-original-file: 2026-03-01/FrontendsGet.json                                   |
| [frontendsInterfaceUpdateSample.js][frontendsinterfaceupdatesample]                                                                     | update a Frontend x-ms-original-file: 2026-03-01/FrontendPatch.json                                                             |
| [operationsListSample.js][operationslistsample]                                                                                         | list the operations for the provider x-ms-original-file: 2026-03-01/OperationsList.json                                         |
| [privateEndpointConnectionsInterfaceDeleteSample.js][privateendpointconnectionsinterfacedeletesample]                                   | delete a PrivateEndpointConnection x-ms-original-file: 2026-03-01/PrivateEndpointConnectionDelete.json                          |
| [privateEndpointConnectionsInterfaceGetSample.js][privateendpointconnectionsinterfacegetsample]                                         | get a PrivateEndpointConnection x-ms-original-file: 2026-03-01/PrivateEndpointConnectionGet.json                                |
| [privateEndpointConnectionsInterfaceListByTrafficControllerSample.js][privateendpointconnectionsinterfacelistbytrafficcontrollersample] | list PrivateEndpointConnection resources by TrafficController x-ms-original-file: 2026-03-01/PrivateEndpointConnectionsGet.json |
| [privateEndpointConnectionsInterfaceUpdateSample.js][privateendpointconnectionsinterfaceupdatesample]                                   | create a PrivateEndpointConnection x-ms-original-file: 2026-03-01/PrivateEndpointConnectionPut.json                             |
| [privateLinkResourcesInterfaceGetSample.js][privatelinkresourcesinterfacegetsample]                                                     | get a PrivateLinkResource x-ms-original-file: 2026-03-01/PrivateLinkResourceGet.json                                            |
| [privateLinkResourcesInterfaceListByTrafficControllerSample.js][privatelinkresourcesinterfacelistbytrafficcontrollersample]             | list PrivateLinkResource resources by TrafficController x-ms-original-file: 2026-03-01/PrivateLinkResourcesGet.json             |
| [securityPoliciesInterfaceCreateOrUpdateSample.js][securitypoliciesinterfacecreateorupdatesample]                                       | create a SecurityPolicy x-ms-original-file: 2026-03-01/IpAccessRulesSecurityPolicyPut.json                                      |
| [securityPoliciesInterfaceDeleteSample.js][securitypoliciesinterfacedeletesample]                                                       | delete a SecurityPolicy x-ms-original-file: 2026-03-01/SecurityPolicyDelete.json                                                |
| [securityPoliciesInterfaceGetSample.js][securitypoliciesinterfacegetsample]                                                             | get a SecurityPolicy x-ms-original-file: 2026-03-01/SecurityPolicyGet.json                                                      |
| [securityPoliciesInterfaceListByTrafficControllerSample.js][securitypoliciesinterfacelistbytrafficcontrollersample]                     | list SecurityPolicy resources by TrafficController x-ms-original-file: 2026-03-01/SecurityPoliciesGetList.json                  |
| [securityPoliciesInterfaceUpdateSample.js][securitypoliciesinterfaceupdatesample]                                                       | update a SecurityPolicy x-ms-original-file: 2026-03-01/IpAccessRulesSecurityPolicyPatch.json                                    |
| [trafficControllerInterfaceCreateOrUpdateSample.js][trafficcontrollerinterfacecreateorupdatesample]                                     | create a TrafficController x-ms-original-file: 2026-03-01/TrafficControllerPut.json                                             |
| [trafficControllerInterfaceDeleteSample.js][trafficcontrollerinterfacedeletesample]                                                     | delete a TrafficController x-ms-original-file: 2026-03-01/TrafficControllerDelete.json                                          |
| [trafficControllerInterfaceGetSample.js][trafficcontrollerinterfacegetsample]                                                           | get a TrafficController x-ms-original-file: 2026-03-01/TrafficControllerGet.json                                                |
| [trafficControllerInterfaceListByResourceGroupSample.js][trafficcontrollerinterfacelistbyresourcegroupsample]                           | list TrafficController resources by resource group x-ms-original-file: 2026-03-01/TrafficControllersGet.json                    |
| [trafficControllerInterfaceListBySubscriptionSample.js][trafficcontrollerinterfacelistbysubscriptionsample]                             | list TrafficController resources by subscription ID x-ms-original-file: 2026-03-01/TrafficControllersGetList.json               |
| [trafficControllerInterfaceUpdateSample.js][trafficcontrollerinterfaceupdatesample]                                                     | update a TrafficController x-ms-original-file: 2026-03-01/TrafficControllerPatch.json                                           |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node associationsInterfaceCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[associationsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/associationsInterfaceCreateOrUpdateSample.js
[associationsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/associationsInterfaceDeleteSample.js
[associationsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/associationsInterfaceGetSample.js
[associationsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/associationsInterfaceListByTrafficControllerSample.js
[associationsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/associationsInterfaceUpdateSample.js
[frontendsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/frontendsInterfaceCreateOrUpdateSample.js
[frontendsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/frontendsInterfaceDeleteSample.js
[frontendsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/frontendsInterfaceGetSample.js
[frontendsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/frontendsInterfaceListByTrafficControllerSample.js
[frontendsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/frontendsInterfaceUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/operationsListSample.js
[privateendpointconnectionsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/privateEndpointConnectionsInterfaceDeleteSample.js
[privateendpointconnectionsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/privateEndpointConnectionsInterfaceGetSample.js
[privateendpointconnectionsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/privateEndpointConnectionsInterfaceListByTrafficControllerSample.js
[privateendpointconnectionsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/privateEndpointConnectionsInterfaceUpdateSample.js
[privatelinkresourcesinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/privateLinkResourcesInterfaceGetSample.js
[privatelinkresourcesinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/privateLinkResourcesInterfaceListByTrafficControllerSample.js
[securitypoliciesinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/securityPoliciesInterfaceCreateOrUpdateSample.js
[securitypoliciesinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/securityPoliciesInterfaceDeleteSample.js
[securitypoliciesinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/securityPoliciesInterfaceGetSample.js
[securitypoliciesinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/securityPoliciesInterfaceListByTrafficControllerSample.js
[securitypoliciesinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/securityPoliciesInterfaceUpdateSample.js
[trafficcontrollerinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/trafficControllerInterfaceCreateOrUpdateSample.js
[trafficcontrollerinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/trafficControllerInterfaceDeleteSample.js
[trafficcontrollerinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/trafficControllerInterfaceGetSample.js
[trafficcontrollerinterfacelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/trafficControllerInterfaceListByResourceGroupSample.js
[trafficcontrollerinterfacelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/trafficControllerInterfaceListBySubscriptionSample.js
[trafficcontrollerinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v3/javascript/trafficControllerInterfaceUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-servicenetworking
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicenetworking/arm-servicenetworking/README.md

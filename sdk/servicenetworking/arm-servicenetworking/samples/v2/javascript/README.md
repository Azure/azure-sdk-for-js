# @azure/arm-servicenetworking client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-servicenetworking in some common scenarios.

| **File Name**                                                                                                                                                         | **Description**                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [associationsInterfaceAssociationsInterfaceCreateOrUpdateSample.js][associationsinterfaceassociationsinterfacecreateorupdatesample]                                   | create a Association x-ms-original-file: 2025-01-01/AssociationPut.json                                           |
| [associationsInterfaceAssociationsInterfaceDeleteSample.js][associationsinterfaceassociationsinterfacedeletesample]                                                   | delete a Association x-ms-original-file: 2025-01-01/AssociationDelete.json                                        |
| [associationsInterfaceAssociationsInterfaceGetSample.js][associationsinterfaceassociationsinterfacegetsample]                                                         | get a Association x-ms-original-file: 2025-01-01/AssociationGet.json                                              |
| [associationsInterfaceAssociationsInterfaceListByTrafficControllerSample.js][associationsinterfaceassociationsinterfacelistbytrafficcontrollersample]                 | list Association resources by TrafficController x-ms-original-file: 2025-01-01/AssociationsGet.json               |
| [associationsInterfaceAssociationsInterfaceUpdateSample.js][associationsinterfaceassociationsinterfaceupdatesample]                                                   | update a Association x-ms-original-file: 2025-01-01/AssociationPatch.json                                         |
| [frontendsInterfaceFrontendsInterfaceCreateOrUpdateSample.js][frontendsinterfacefrontendsinterfacecreateorupdatesample]                                               | create a Frontend x-ms-original-file: 2025-01-01/FrontendPut.json                                                 |
| [frontendsInterfaceFrontendsInterfaceDeleteSample.js][frontendsinterfacefrontendsinterfacedeletesample]                                                               | delete a Frontend x-ms-original-file: 2025-01-01/FrontendDelete.json                                              |
| [frontendsInterfaceFrontendsInterfaceGetSample.js][frontendsinterfacefrontendsinterfacegetsample]                                                                     | get a Frontend x-ms-original-file: 2025-01-01/FrontendGet.json                                                    |
| [frontendsInterfaceFrontendsInterfaceListByTrafficControllerSample.js][frontendsinterfacefrontendsinterfacelistbytrafficcontrollersample]                             | list Frontend resources by TrafficController x-ms-original-file: 2025-01-01/FrontendsGet.json                     |
| [frontendsInterfaceFrontendsInterfaceUpdateSample.js][frontendsinterfacefrontendsinterfaceupdatesample]                                                               | update a Frontend x-ms-original-file: 2025-01-01/FrontendPatch.json                                               |
| [operationsOperationsListSample.js][operationsoperationslistsample]                                                                                                   | list the operations for the provider x-ms-original-file: 2025-01-01/OperationsList.json                           |
| [securityPoliciesInterfaceSecurityPoliciesInterfaceCreateOrUpdateSample.js][securitypoliciesinterfacesecuritypoliciesinterfacecreateorupdatesample]                   | create a SecurityPolicy x-ms-original-file: 2025-01-01/SecurityPolicyPut.json                                     |
| [securityPoliciesInterfaceSecurityPoliciesInterfaceDeleteSample.js][securitypoliciesinterfacesecuritypoliciesinterfacedeletesample]                                   | delete a SecurityPolicy x-ms-original-file: 2025-01-01/SecurityPolicyDelete.json                                  |
| [securityPoliciesInterfaceSecurityPoliciesInterfaceGetSample.js][securitypoliciesinterfacesecuritypoliciesinterfacegetsample]                                         | get a SecurityPolicy x-ms-original-file: 2025-01-01/SecurityPolicyGet.json                                        |
| [securityPoliciesInterfaceSecurityPoliciesInterfaceListByTrafficControllerSample.js][securitypoliciesinterfacesecuritypoliciesinterfacelistbytrafficcontrollersample] | list SecurityPolicy resources by TrafficController x-ms-original-file: 2025-01-01/SecurityPoliciesGetList.json    |
| [securityPoliciesInterfaceSecurityPoliciesInterfaceUpdateSample.js][securitypoliciesinterfacesecuritypoliciesinterfaceupdatesample]                                   | update a SecurityPolicy x-ms-original-file: 2025-01-01/SecurityPolicyPatch.json                                   |
| [trafficControllerInterfaceTrafficControllerInterfaceCreateOrUpdateSample.js][trafficcontrollerinterfacetrafficcontrollerinterfacecreateorupdatesample]               | create a TrafficController x-ms-original-file: 2025-01-01/TrafficControllerPut.json                               |
| [trafficControllerInterfaceTrafficControllerInterfaceDeleteSample.js][trafficcontrollerinterfacetrafficcontrollerinterfacedeletesample]                               | delete a TrafficController x-ms-original-file: 2025-01-01/TrafficControllerDelete.json                            |
| [trafficControllerInterfaceTrafficControllerInterfaceGetSample.js][trafficcontrollerinterfacetrafficcontrollerinterfacegetsample]                                     | get a TrafficController x-ms-original-file: 2025-01-01/TrafficControllerGet.json                                  |
| [trafficControllerInterfaceTrafficControllerInterfaceListByResourceGroupSample.js][trafficcontrollerinterfacetrafficcontrollerinterfacelistbyresourcegroupsample]     | list TrafficController resources by resource group x-ms-original-file: 2025-01-01/TrafficControllersGet.json      |
| [trafficControllerInterfaceTrafficControllerInterfaceListBySubscriptionSample.js][trafficcontrollerinterfacetrafficcontrollerinterfacelistbysubscriptionsample]       | list TrafficController resources by subscription ID x-ms-original-file: 2025-01-01/TrafficControllersGetList.json |
| [trafficControllerInterfaceTrafficControllerInterfaceUpdateSample.js][trafficcontrollerinterfacetrafficcontrollerinterfaceupdatesample]                               | update a TrafficController x-ms-original-file: 2025-01-01/TrafficControllerPatch.json                             |

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
node associationsInterfaceAssociationsInterfaceCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node associationsInterfaceAssociationsInterfaceCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[associationsinterfaceassociationsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/associationsInterfaceAssociationsInterfaceCreateOrUpdateSample.js
[associationsinterfaceassociationsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/associationsInterfaceAssociationsInterfaceDeleteSample.js
[associationsinterfaceassociationsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/associationsInterfaceAssociationsInterfaceGetSample.js
[associationsinterfaceassociationsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/associationsInterfaceAssociationsInterfaceListByTrafficControllerSample.js
[associationsinterfaceassociationsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/associationsInterfaceAssociationsInterfaceUpdateSample.js
[frontendsinterfacefrontendsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/frontendsInterfaceFrontendsInterfaceCreateOrUpdateSample.js
[frontendsinterfacefrontendsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/frontendsInterfaceFrontendsInterfaceDeleteSample.js
[frontendsinterfacefrontendsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/frontendsInterfaceFrontendsInterfaceGetSample.js
[frontendsinterfacefrontendsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/frontendsInterfaceFrontendsInterfaceListByTrafficControllerSample.js
[frontendsinterfacefrontendsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/frontendsInterfaceFrontendsInterfaceUpdateSample.js
[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/operationsOperationsListSample.js
[securitypoliciesinterfacesecuritypoliciesinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/securityPoliciesInterfaceSecurityPoliciesInterfaceCreateOrUpdateSample.js
[securitypoliciesinterfacesecuritypoliciesinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/securityPoliciesInterfaceSecurityPoliciesInterfaceDeleteSample.js
[securitypoliciesinterfacesecuritypoliciesinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/securityPoliciesInterfaceSecurityPoliciesInterfaceGetSample.js
[securitypoliciesinterfacesecuritypoliciesinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/securityPoliciesInterfaceSecurityPoliciesInterfaceListByTrafficControllerSample.js
[securitypoliciesinterfacesecuritypoliciesinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/securityPoliciesInterfaceSecurityPoliciesInterfaceUpdateSample.js
[trafficcontrollerinterfacetrafficcontrollerinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/trafficControllerInterfaceTrafficControllerInterfaceCreateOrUpdateSample.js
[trafficcontrollerinterfacetrafficcontrollerinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/trafficControllerInterfaceTrafficControllerInterfaceDeleteSample.js
[trafficcontrollerinterfacetrafficcontrollerinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/trafficControllerInterfaceTrafficControllerInterfaceGetSample.js
[trafficcontrollerinterfacetrafficcontrollerinterfacelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/trafficControllerInterfaceTrafficControllerInterfaceListByResourceGroupSample.js
[trafficcontrollerinterfacetrafficcontrollerinterfacelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/trafficControllerInterfaceTrafficControllerInterfaceListBySubscriptionSample.js
[trafficcontrollerinterfacetrafficcontrollerinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/javascript/trafficControllerInterfaceTrafficControllerInterfaceUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-servicenetworking?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicenetworking/arm-servicenetworking/README.md

# @azure/arm-servicenetworking client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-servicenetworking in some common scenarios.

| **File Name**                                                                                                                                                         | **Description**                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [associationsInterfaceAssociationsInterfaceCreateOrUpdateSample.ts][associationsinterfaceassociationsinterfacecreateorupdatesample]                                   | create a Association x-ms-original-file: 2025-01-01/AssociationPut.json                                           |
| [associationsInterfaceAssociationsInterfaceDeleteSample.ts][associationsinterfaceassociationsinterfacedeletesample]                                                   | delete a Association x-ms-original-file: 2025-01-01/AssociationDelete.json                                        |
| [associationsInterfaceAssociationsInterfaceGetSample.ts][associationsinterfaceassociationsinterfacegetsample]                                                         | get a Association x-ms-original-file: 2025-01-01/AssociationGet.json                                              |
| [associationsInterfaceAssociationsInterfaceListByTrafficControllerSample.ts][associationsinterfaceassociationsinterfacelistbytrafficcontrollersample]                 | list Association resources by TrafficController x-ms-original-file: 2025-01-01/AssociationsGet.json               |
| [associationsInterfaceAssociationsInterfaceUpdateSample.ts][associationsinterfaceassociationsinterfaceupdatesample]                                                   | update a Association x-ms-original-file: 2025-01-01/AssociationPatch.json                                         |
| [frontendsInterfaceFrontendsInterfaceCreateOrUpdateSample.ts][frontendsinterfacefrontendsinterfacecreateorupdatesample]                                               | create a Frontend x-ms-original-file: 2025-01-01/FrontendPut.json                                                 |
| [frontendsInterfaceFrontendsInterfaceDeleteSample.ts][frontendsinterfacefrontendsinterfacedeletesample]                                                               | delete a Frontend x-ms-original-file: 2025-01-01/FrontendDelete.json                                              |
| [frontendsInterfaceFrontendsInterfaceGetSample.ts][frontendsinterfacefrontendsinterfacegetsample]                                                                     | get a Frontend x-ms-original-file: 2025-01-01/FrontendGet.json                                                    |
| [frontendsInterfaceFrontendsInterfaceListByTrafficControllerSample.ts][frontendsinterfacefrontendsinterfacelistbytrafficcontrollersample]                             | list Frontend resources by TrafficController x-ms-original-file: 2025-01-01/FrontendsGet.json                     |
| [frontendsInterfaceFrontendsInterfaceUpdateSample.ts][frontendsinterfacefrontendsinterfaceupdatesample]                                                               | update a Frontend x-ms-original-file: 2025-01-01/FrontendPatch.json                                               |
| [operationsOperationsListSample.ts][operationsoperationslistsample]                                                                                                   | list the operations for the provider x-ms-original-file: 2025-01-01/OperationsList.json                           |
| [securityPoliciesInterfaceSecurityPoliciesInterfaceCreateOrUpdateSample.ts][securitypoliciesinterfacesecuritypoliciesinterfacecreateorupdatesample]                   | create a SecurityPolicy x-ms-original-file: 2025-01-01/SecurityPolicyPut.json                                     |
| [securityPoliciesInterfaceSecurityPoliciesInterfaceDeleteSample.ts][securitypoliciesinterfacesecuritypoliciesinterfacedeletesample]                                   | delete a SecurityPolicy x-ms-original-file: 2025-01-01/SecurityPolicyDelete.json                                  |
| [securityPoliciesInterfaceSecurityPoliciesInterfaceGetSample.ts][securitypoliciesinterfacesecuritypoliciesinterfacegetsample]                                         | get a SecurityPolicy x-ms-original-file: 2025-01-01/SecurityPolicyGet.json                                        |
| [securityPoliciesInterfaceSecurityPoliciesInterfaceListByTrafficControllerSample.ts][securitypoliciesinterfacesecuritypoliciesinterfacelistbytrafficcontrollersample] | list SecurityPolicy resources by TrafficController x-ms-original-file: 2025-01-01/SecurityPoliciesGetList.json    |
| [securityPoliciesInterfaceSecurityPoliciesInterfaceUpdateSample.ts][securitypoliciesinterfacesecuritypoliciesinterfaceupdatesample]                                   | update a SecurityPolicy x-ms-original-file: 2025-01-01/SecurityPolicyPatch.json                                   |
| [trafficControllerInterfaceTrafficControllerInterfaceCreateOrUpdateSample.ts][trafficcontrollerinterfacetrafficcontrollerinterfacecreateorupdatesample]               | create a TrafficController x-ms-original-file: 2025-01-01/TrafficControllerPut.json                               |
| [trafficControllerInterfaceTrafficControllerInterfaceDeleteSample.ts][trafficcontrollerinterfacetrafficcontrollerinterfacedeletesample]                               | delete a TrafficController x-ms-original-file: 2025-01-01/TrafficControllerDelete.json                            |
| [trafficControllerInterfaceTrafficControllerInterfaceGetSample.ts][trafficcontrollerinterfacetrafficcontrollerinterfacegetsample]                                     | get a TrafficController x-ms-original-file: 2025-01-01/TrafficControllerGet.json                                  |
| [trafficControllerInterfaceTrafficControllerInterfaceListByResourceGroupSample.ts][trafficcontrollerinterfacetrafficcontrollerinterfacelistbyresourcegroupsample]     | list TrafficController resources by resource group x-ms-original-file: 2025-01-01/TrafficControllersGet.json      |
| [trafficControllerInterfaceTrafficControllerInterfaceListBySubscriptionSample.ts][trafficcontrollerinterfacetrafficcontrollerinterfacelistbysubscriptionsample]       | list TrafficController resources by subscription ID x-ms-original-file: 2025-01-01/TrafficControllersGetList.json |
| [trafficControllerInterfaceTrafficControllerInterfaceUpdateSample.ts][trafficcontrollerinterfacetrafficcontrollerinterfaceupdatesample]                               | update a TrafficController x-ms-original-file: 2025-01-01/TrafficControllerPatch.json                             |

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
node dist/associationsInterfaceAssociationsInterfaceCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/associationsInterfaceAssociationsInterfaceCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[associationsinterfaceassociationsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/associationsInterfaceAssociationsInterfaceCreateOrUpdateSample.ts
[associationsinterfaceassociationsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/associationsInterfaceAssociationsInterfaceDeleteSample.ts
[associationsinterfaceassociationsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/associationsInterfaceAssociationsInterfaceGetSample.ts
[associationsinterfaceassociationsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/associationsInterfaceAssociationsInterfaceListByTrafficControllerSample.ts
[associationsinterfaceassociationsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/associationsInterfaceAssociationsInterfaceUpdateSample.ts
[frontendsinterfacefrontendsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/frontendsInterfaceFrontendsInterfaceCreateOrUpdateSample.ts
[frontendsinterfacefrontendsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/frontendsInterfaceFrontendsInterfaceDeleteSample.ts
[frontendsinterfacefrontendsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/frontendsInterfaceFrontendsInterfaceGetSample.ts
[frontendsinterfacefrontendsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/frontendsInterfaceFrontendsInterfaceListByTrafficControllerSample.ts
[frontendsinterfacefrontendsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/frontendsInterfaceFrontendsInterfaceUpdateSample.ts
[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/operationsOperationsListSample.ts
[securitypoliciesinterfacesecuritypoliciesinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/securityPoliciesInterfaceSecurityPoliciesInterfaceCreateOrUpdateSample.ts
[securitypoliciesinterfacesecuritypoliciesinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/securityPoliciesInterfaceSecurityPoliciesInterfaceDeleteSample.ts
[securitypoliciesinterfacesecuritypoliciesinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/securityPoliciesInterfaceSecurityPoliciesInterfaceGetSample.ts
[securitypoliciesinterfacesecuritypoliciesinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/securityPoliciesInterfaceSecurityPoliciesInterfaceListByTrafficControllerSample.ts
[securitypoliciesinterfacesecuritypoliciesinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/securityPoliciesInterfaceSecurityPoliciesInterfaceUpdateSample.ts
[trafficcontrollerinterfacetrafficcontrollerinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/trafficControllerInterfaceTrafficControllerInterfaceCreateOrUpdateSample.ts
[trafficcontrollerinterfacetrafficcontrollerinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/trafficControllerInterfaceTrafficControllerInterfaceDeleteSample.ts
[trafficcontrollerinterfacetrafficcontrollerinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/trafficControllerInterfaceTrafficControllerInterfaceGetSample.ts
[trafficcontrollerinterfacetrafficcontrollerinterfacelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/trafficControllerInterfaceTrafficControllerInterfaceListByResourceGroupSample.ts
[trafficcontrollerinterfacetrafficcontrollerinterfacelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/trafficControllerInterfaceTrafficControllerInterfaceListBySubscriptionSample.ts
[trafficcontrollerinterfacetrafficcontrollerinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2/typescript/src/trafficControllerInterfaceTrafficControllerInterfaceUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-servicenetworking?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicenetworking/arm-servicenetworking/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

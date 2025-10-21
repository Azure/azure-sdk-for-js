# @azure/arm-servicenetworking client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-servicenetworking in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [associationsInterfaceCreateOrUpdateSample.ts][associationsinterfacecreateorupdatesample]                           | create a Association x-ms-original-file: 2025-03-01-preview/AssociationPut.json                                           |
| [associationsInterfaceDeleteSample.ts][associationsinterfacedeletesample]                                           | delete a Association x-ms-original-file: 2025-03-01-preview/AssociationDelete.json                                        |
| [associationsInterfaceGetSample.ts][associationsinterfacegetsample]                                                 | get a Association x-ms-original-file: 2025-03-01-preview/AssociationGet.json                                              |
| [associationsInterfaceListByTrafficControllerSample.ts][associationsinterfacelistbytrafficcontrollersample]         | list Association resources by TrafficController x-ms-original-file: 2025-03-01-preview/AssociationsGet.json               |
| [associationsInterfaceUpdateSample.ts][associationsinterfaceupdatesample]                                           | update a Association x-ms-original-file: 2025-03-01-preview/AssociationPatch.json                                         |
| [frontendsInterfaceCreateOrUpdateSample.ts][frontendsinterfacecreateorupdatesample]                                 | create a Frontend x-ms-original-file: 2025-03-01-preview/FrontendPut.json                                                 |
| [frontendsInterfaceDeleteSample.ts][frontendsinterfacedeletesample]                                                 | delete a Frontend x-ms-original-file: 2025-03-01-preview/FrontendDelete.json                                              |
| [frontendsInterfaceGetSample.ts][frontendsinterfacegetsample]                                                       | get a Frontend x-ms-original-file: 2025-03-01-preview/FrontendGet.json                                                    |
| [frontendsInterfaceListByTrafficControllerSample.ts][frontendsinterfacelistbytrafficcontrollersample]               | list Frontend resources by TrafficController x-ms-original-file: 2025-03-01-preview/FrontendsGet.json                     |
| [frontendsInterfaceUpdateSample.ts][frontendsinterfaceupdatesample]                                                 | update a Frontend x-ms-original-file: 2025-03-01-preview/FrontendPatch.json                                               |
| [operationsListSample.ts][operationslistsample]                                                                     | list the operations for the provider x-ms-original-file: 2025-03-01-preview/OperationsList.json                           |
| [securityPoliciesInterfaceCreateOrUpdateSample.ts][securitypoliciesinterfacecreateorupdatesample]                   | create a SecurityPolicy x-ms-original-file: 2025-03-01-preview/IpAccessRulesSecurityPolicyPut.json                        |
| [securityPoliciesInterfaceDeleteSample.ts][securitypoliciesinterfacedeletesample]                                   | delete a SecurityPolicy x-ms-original-file: 2025-03-01-preview/SecurityPolicyDelete.json                                  |
| [securityPoliciesInterfaceGetSample.ts][securitypoliciesinterfacegetsample]                                         | get a SecurityPolicy x-ms-original-file: 2025-03-01-preview/SecurityPolicyGet.json                                        |
| [securityPoliciesInterfaceListByTrafficControllerSample.ts][securitypoliciesinterfacelistbytrafficcontrollersample] | list SecurityPolicy resources by TrafficController x-ms-original-file: 2025-03-01-preview/SecurityPoliciesGetList.json    |
| [securityPoliciesInterfaceUpdateSample.ts][securitypoliciesinterfaceupdatesample]                                   | update a SecurityPolicy x-ms-original-file: 2025-03-01-preview/IpAccessRulesSecurityPolicyPatch.json                      |
| [trafficControllerInterfaceCreateOrUpdateSample.ts][trafficcontrollerinterfacecreateorupdatesample]                 | create a TrafficController x-ms-original-file: 2025-03-01-preview/TrafficControllerPut.json                               |
| [trafficControllerInterfaceDeleteSample.ts][trafficcontrollerinterfacedeletesample]                                 | delete a TrafficController x-ms-original-file: 2025-03-01-preview/TrafficControllerDelete.json                            |
| [trafficControllerInterfaceGetSample.ts][trafficcontrollerinterfacegetsample]                                       | get a TrafficController x-ms-original-file: 2025-03-01-preview/TrafficControllerGet.json                                  |
| [trafficControllerInterfaceListByResourceGroupSample.ts][trafficcontrollerinterfacelistbyresourcegroupsample]       | list TrafficController resources by resource group x-ms-original-file: 2025-03-01-preview/TrafficControllersGet.json      |
| [trafficControllerInterfaceListBySubscriptionSample.ts][trafficcontrollerinterfacelistbysubscriptionsample]         | list TrafficController resources by subscription ID x-ms-original-file: 2025-03-01-preview/TrafficControllersGetList.json |
| [trafficControllerInterfaceUpdateSample.ts][trafficcontrollerinterfaceupdatesample]                                 | update a TrafficController x-ms-original-file: 2025-03-01-preview/TrafficControllerPatch.json                             |

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
cross-env node dist/associationsInterfaceCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[associationsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/associationsInterfaceCreateOrUpdateSample.ts
[associationsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/associationsInterfaceDeleteSample.ts
[associationsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/associationsInterfaceGetSample.ts
[associationsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/associationsInterfaceListByTrafficControllerSample.ts
[associationsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/associationsInterfaceUpdateSample.ts
[frontendsinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/frontendsInterfaceCreateOrUpdateSample.ts
[frontendsinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/frontendsInterfaceDeleteSample.ts
[frontendsinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/frontendsInterfaceGetSample.ts
[frontendsinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/frontendsInterfaceListByTrafficControllerSample.ts
[frontendsinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/frontendsInterfaceUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/operationsListSample.ts
[securitypoliciesinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/securityPoliciesInterfaceCreateOrUpdateSample.ts
[securitypoliciesinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/securityPoliciesInterfaceDeleteSample.ts
[securitypoliciesinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/securityPoliciesInterfaceGetSample.ts
[securitypoliciesinterfacelistbytrafficcontrollersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/securityPoliciesInterfaceListByTrafficControllerSample.ts
[securitypoliciesinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/securityPoliciesInterfaceUpdateSample.ts
[trafficcontrollerinterfacecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/trafficControllerInterfaceCreateOrUpdateSample.ts
[trafficcontrollerinterfacedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/trafficControllerInterfaceDeleteSample.ts
[trafficcontrollerinterfacegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/trafficControllerInterfaceGetSample.ts
[trafficcontrollerinterfacelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/trafficControllerInterfaceListByResourceGroupSample.ts
[trafficcontrollerinterfacelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/trafficControllerInterfaceListBySubscriptionSample.ts
[trafficcontrollerinterfaceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicenetworking/arm-servicenetworking/samples/v2-beta/typescript/src/trafficControllerInterfaceUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-servicenetworking?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicenetworking/arm-servicenetworking/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

# @azure/arm-computeworkloadmanager client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-computeworkloadmanager in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                    |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [capabilitiesCreateOrUpdateSample.ts][capabilitiescreateorupdatesample]                 | creates or replaces a capability. x-ms-original-file: 2026-11-01-preview/Capabilities_CreateOrUpdate_AgentSandbox.json                             |
| [capabilitiesDeleteSample.ts][capabilitiesdeletesample]                                 | disables and deletes a capability. x-ms-original-file: 2026-11-01-preview/Capabilities_Delete.json                                                 |
| [capabilitiesGetSample.ts][capabilitiesgetsample]                                       | gets a capability. x-ms-original-file: 2026-11-01-preview/Capabilities_Get.json                                                                    |
| [capabilitiesListByWorkloadSpaceSample.ts][capabilitieslistbyworkloadspacesample]       | lists capabilities in a workload space. x-ms-original-file: 2026-11-01-preview/Capabilities_ListByWorkloadSpace.json                               |
| [capabilitiesUpdateSample.ts][capabilitiesupdatesample]                                 | updates mutable capability properties. x-ms-original-file: 2026-11-01-preview/Capabilities_Update.json                                             |
| [runtimeBindingsCreateOrUpdateSample.ts][runtimebindingscreateorupdatesample]           | creates or replaces a runtime binding. x-ms-original-file: 2026-11-01-preview/RuntimeBindings_CreateOrUpdate_ManagedKubernetes.json                |
| [runtimeBindingsDeleteSample.ts][runtimebindingsdeletesample]                           | deletes a runtime binding without deleting customer-owned referenced resources. x-ms-original-file: 2026-11-01-preview/RuntimeBindings_Delete.json |
| [runtimeBindingsGetSample.ts][runtimebindingsgetsample]                                 | gets a runtime binding. x-ms-original-file: 2026-11-01-preview/RuntimeBindings_Get.json                                                            |
| [runtimeBindingsListByWorkloadSpaceSample.ts][runtimebindingslistbyworkloadspacesample] | lists runtime bindings in a workload space. x-ms-original-file: 2026-11-01-preview/RuntimeBindings_ListByWorkloadSpace.json                        |
| [runtimeBindingsUpdateSample.ts][runtimebindingsupdatesample]                           | updates mutable runtime binding properties. x-ms-original-file: 2026-11-01-preview/RuntimeBindings_Update.json                                     |
| [runtimeLinksCreateOrUpdateSample.ts][runtimelinkscreateorupdatesample]                 | creates or replaces a runtime link. x-ms-original-file: 2026-11-01-preview/RuntimeLinks_CreateOrUpdate_AksAci.json                                 |
| [runtimeLinksDeleteSample.ts][runtimelinksdeletesample]                                 | deletes a runtime link without deleting its runtime bindings. x-ms-original-file: 2026-11-01-preview/RuntimeLinks_Delete.json                      |
| [runtimeLinksGetSample.ts][runtimelinksgetsample]                                       | gets a runtime link. x-ms-original-file: 2026-11-01-preview/RuntimeLinks_Get.json                                                                  |
| [runtimeLinksListByWorkloadSpaceSample.ts][runtimelinkslistbyworkloadspacesample]       | lists runtime links in a workload space. x-ms-original-file: 2026-11-01-preview/RuntimeLinks_ListByWorkloadSpace.json                              |
| [runtimeLinksUpdateSample.ts][runtimelinksupdatesample]                                 | updates mutable runtime link properties. x-ms-original-file: 2026-11-01-preview/RuntimeLinks_Update.json                                           |
| [workloadSpacesCreateOrUpdateSample.ts][workloadspacescreateorupdatesample]             | creates or replaces a workload space. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_CreateOrUpdate.json                                    |
| [workloadSpacesDeleteSample.ts][workloadspacesdeletesample]                             | deletes a workload space and its owned resources. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_Delete.json                                |
| [workloadSpacesGetSample.ts][workloadspacesgetsample]                                   | gets a workload space. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_Get.json                                                              |
| [workloadSpacesListByResourceGroupSample.ts][workloadspaceslistbyresourcegroupsample]   | lists workload spaces in a resource group. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_ListByResourceGroup.json                          |
| [workloadSpacesListBySubscriptionSample.ts][workloadspaceslistbysubscriptionsample]     | lists workload spaces in a subscription. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_ListBySubscription.json                             |
| [workloadSpacesUpdateSample.ts][workloadspacesupdatesample]                             | updates mutable workload space properties. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_Update.json                                       |

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
node dist/capabilitiesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/capabilitiesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[capabilitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/capabilitiesCreateOrUpdateSample.ts
[capabilitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/capabilitiesDeleteSample.ts
[capabilitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/capabilitiesGetSample.ts
[capabilitieslistbyworkloadspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/capabilitiesListByWorkloadSpaceSample.ts
[capabilitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/capabilitiesUpdateSample.ts
[runtimebindingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/runtimeBindingsCreateOrUpdateSample.ts
[runtimebindingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/runtimeBindingsDeleteSample.ts
[runtimebindingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/runtimeBindingsGetSample.ts
[runtimebindingslistbyworkloadspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/runtimeBindingsListByWorkloadSpaceSample.ts
[runtimebindingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/runtimeBindingsUpdateSample.ts
[runtimelinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/runtimeLinksCreateOrUpdateSample.ts
[runtimelinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/runtimeLinksDeleteSample.ts
[runtimelinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/runtimeLinksGetSample.ts
[runtimelinkslistbyworkloadspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/runtimeLinksListByWorkloadSpaceSample.ts
[runtimelinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/runtimeLinksUpdateSample.ts
[workloadspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/workloadSpacesCreateOrUpdateSample.ts
[workloadspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/workloadSpacesDeleteSample.ts
[workloadspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/workloadSpacesGetSample.ts
[workloadspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/workloadSpacesListByResourceGroupSample.ts
[workloadspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/workloadSpacesListBySubscriptionSample.ts
[workloadspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/typescript/src/workloadSpacesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computeworkloadmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-computeworkloadmanager/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

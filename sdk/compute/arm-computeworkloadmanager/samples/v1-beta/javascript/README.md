# @azure/arm-computeworkloadmanager client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-computeworkloadmanager in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                    |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [capabilitiesCreateOrUpdateSample.js][capabilitiescreateorupdatesample]                 | creates or replaces a capability. x-ms-original-file: 2026-11-01-preview/Capabilities_CreateOrUpdate_AgentSandbox.json                             |
| [capabilitiesDeleteSample.js][capabilitiesdeletesample]                                 | disables and deletes a capability. x-ms-original-file: 2026-11-01-preview/Capabilities_Delete.json                                                 |
| [capabilitiesGetSample.js][capabilitiesgetsample]                                       | gets a capability. x-ms-original-file: 2026-11-01-preview/Capabilities_Get.json                                                                    |
| [capabilitiesListByWorkloadSpaceSample.js][capabilitieslistbyworkloadspacesample]       | lists capabilities in a workload space. x-ms-original-file: 2026-11-01-preview/Capabilities_ListByWorkloadSpace.json                               |
| [capabilitiesUpdateSample.js][capabilitiesupdatesample]                                 | updates mutable capability properties. x-ms-original-file: 2026-11-01-preview/Capabilities_Update.json                                             |
| [runtimeBindingsCreateOrUpdateSample.js][runtimebindingscreateorupdatesample]           | creates or replaces a runtime binding. x-ms-original-file: 2026-11-01-preview/RuntimeBindings_CreateOrUpdate_ManagedKubernetes.json                |
| [runtimeBindingsDeleteSample.js][runtimebindingsdeletesample]                           | deletes a runtime binding without deleting customer-owned referenced resources. x-ms-original-file: 2026-11-01-preview/RuntimeBindings_Delete.json |
| [runtimeBindingsGetSample.js][runtimebindingsgetsample]                                 | gets a runtime binding. x-ms-original-file: 2026-11-01-preview/RuntimeBindings_Get.json                                                            |
| [runtimeBindingsListByWorkloadSpaceSample.js][runtimebindingslistbyworkloadspacesample] | lists runtime bindings in a workload space. x-ms-original-file: 2026-11-01-preview/RuntimeBindings_ListByWorkloadSpace.json                        |
| [runtimeBindingsUpdateSample.js][runtimebindingsupdatesample]                           | updates mutable runtime binding properties. x-ms-original-file: 2026-11-01-preview/RuntimeBindings_Update.json                                     |
| [runtimeLinksCreateOrUpdateSample.js][runtimelinkscreateorupdatesample]                 | creates or replaces a runtime link. x-ms-original-file: 2026-11-01-preview/RuntimeLinks_CreateOrUpdate_AksAci.json                                 |
| [runtimeLinksDeleteSample.js][runtimelinksdeletesample]                                 | deletes a runtime link without deleting its runtime bindings. x-ms-original-file: 2026-11-01-preview/RuntimeLinks_Delete.json                      |
| [runtimeLinksGetSample.js][runtimelinksgetsample]                                       | gets a runtime link. x-ms-original-file: 2026-11-01-preview/RuntimeLinks_Get.json                                                                  |
| [runtimeLinksListByWorkloadSpaceSample.js][runtimelinkslistbyworkloadspacesample]       | lists runtime links in a workload space. x-ms-original-file: 2026-11-01-preview/RuntimeLinks_ListByWorkloadSpace.json                              |
| [runtimeLinksUpdateSample.js][runtimelinksupdatesample]                                 | updates mutable runtime link properties. x-ms-original-file: 2026-11-01-preview/RuntimeLinks_Update.json                                           |
| [workloadSpacesCreateOrUpdateSample.js][workloadspacescreateorupdatesample]             | creates or replaces a workload space. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_CreateOrUpdate.json                                    |
| [workloadSpacesDeleteSample.js][workloadspacesdeletesample]                             | deletes a workload space and its owned resources. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_Delete.json                                |
| [workloadSpacesGetSample.js][workloadspacesgetsample]                                   | gets a workload space. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_Get.json                                                              |
| [workloadSpacesListByResourceGroupSample.js][workloadspaceslistbyresourcegroupsample]   | lists workload spaces in a resource group. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_ListByResourceGroup.json                          |
| [workloadSpacesListBySubscriptionSample.js][workloadspaceslistbysubscriptionsample]     | lists workload spaces in a subscription. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_ListBySubscription.json                             |
| [workloadSpacesUpdateSample.js][workloadspacesupdatesample]                             | updates mutable workload space properties. x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_Update.json                                       |

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
node capabilitiesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node capabilitiesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[capabilitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/capabilitiesCreateOrUpdateSample.js
[capabilitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/capabilitiesDeleteSample.js
[capabilitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/capabilitiesGetSample.js
[capabilitieslistbyworkloadspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/capabilitiesListByWorkloadSpaceSample.js
[capabilitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/capabilitiesUpdateSample.js
[runtimebindingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/runtimeBindingsCreateOrUpdateSample.js
[runtimebindingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/runtimeBindingsDeleteSample.js
[runtimebindingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/runtimeBindingsGetSample.js
[runtimebindingslistbyworkloadspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/runtimeBindingsListByWorkloadSpaceSample.js
[runtimebindingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/runtimeBindingsUpdateSample.js
[runtimelinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/runtimeLinksCreateOrUpdateSample.js
[runtimelinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/runtimeLinksDeleteSample.js
[runtimelinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/runtimeLinksGetSample.js
[runtimelinkslistbyworkloadspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/runtimeLinksListByWorkloadSpaceSample.js
[runtimelinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/runtimeLinksUpdateSample.js
[workloadspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/workloadSpacesCreateOrUpdateSample.js
[workloadspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/workloadSpacesDeleteSample.js
[workloadspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/workloadSpacesGetSample.js
[workloadspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/workloadSpacesListByResourceGroupSample.js
[workloadspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/workloadSpacesListBySubscriptionSample.js
[workloadspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computeworkloadmanager/samples/v1-beta/javascript/workloadSpacesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computeworkloadmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-computeworkloadmanager/README.md

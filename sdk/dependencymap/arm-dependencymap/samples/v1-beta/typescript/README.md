# @azure/arm-dependencymap client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-dependencymap in some common scenarios.

| **File Name**                                                                                                                     | **Description**                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [discoverySourcesCreateOrUpdateSample.ts][discoverysourcescreateorupdatesample]                                                   | create a DiscoverySourceResource x-ms-original-file: 2025-01-31-preview/DiscoverySources_CreateOrUpdate.json                                  |
| [discoverySourcesDeleteSample.ts][discoverysourcesdeletesample]                                                                   | delete a DiscoverySourceResource x-ms-original-file: 2025-01-31-preview/DiscoverySources_Delete.json                                          |
| [discoverySourcesGetSample.ts][discoverysourcesgetsample]                                                                         | get a DiscoverySourceResource x-ms-original-file: 2025-01-31-preview/DiscoverySources_Get.json                                                |
| [discoverySourcesListByMapsResourceSample.ts][discoverysourceslistbymapsresourcesample]                                           | list DiscoverySourceResource resources by MapsResource x-ms-original-file: 2025-01-31-preview/DiscoverySources_ListByMapsResource.json        |
| [discoverySourcesUpdateSample.ts][discoverysourcesupdatesample]                                                                   | update a DiscoverySourceResource x-ms-original-file: 2025-01-31-preview/DiscoverySources_Update.json                                          |
| [mapsCreateOrUpdateSample.ts][mapscreateorupdatesample]                                                                           | create a MapsResource x-ms-original-file: 2025-01-31-preview/Maps_CreateOrUpdate.json                                                         |
| [mapsDeleteSample.ts][mapsdeletesample]                                                                                           | delete a MapsResource x-ms-original-file: 2025-01-31-preview/Maps_Delete.json                                                                 |
| [mapsExportDependenciesSample.ts][mapsexportdependenciessample]                                                                   | export dependencies x-ms-original-file: 2025-01-31-preview/Maps_ExportDependencies.json                                                       |
| [mapsGetConnectionsForProcessOnFocusedMachineSample.ts][mapsgetconnectionsforprocessonfocusedmachinesample]                       | get network connections of a process x-ms-original-file: 2025-01-31-preview/Maps_GetConnectionsForProcessOnFocusedMachine.json                |
| [mapsGetConnectionsWithConnectedMachineForFocusedMachineSample.ts][mapsgetconnectionswithconnectedmachineforfocusedmachinesample] | get network connections between machines x-ms-original-file: 2025-01-31-preview/Maps_GetConnectionsWithConnectedMachineForFocusedMachine.json |
| [mapsGetDependencyViewForFocusedMachineSample.ts][mapsgetdependencyviewforfocusedmachinesample]                                   | get dependency map of single machine x-ms-original-file: 2025-01-31-preview/Maps_GetDependencyViewForFocusedMachine.json                      |
| [mapsGetSample.ts][mapsgetsample]                                                                                                 | get a MapsResource x-ms-original-file: 2025-01-31-preview/Maps_Get.json                                                                       |
| [mapsListByResourceGroupSample.ts][mapslistbyresourcegroupsample]                                                                 | list MapsResource resources by resource group x-ms-original-file: 2025-01-31-preview/Maps_ListByResourceGroup.json                            |
| [mapsListBySubscriptionSample.ts][mapslistbysubscriptionsample]                                                                   | list MapsResource resources by subscription ID x-ms-original-file: 2025-01-31-preview/Maps_ListBySubscription.json                            |
| [mapsUpdateSample.ts][mapsupdatesample]                                                                                           | update a MapsResource x-ms-original-file: 2025-01-31-preview/Maps_Update.json                                                                 |
| [operationsListSample.ts][operationslistsample]                                                                                   | list the operations for the provider x-ms-original-file: 2025-01-31-preview/Operations_List.json                                              |

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
node dist/discoverySourcesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/discoverySourcesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[discoverysourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/discoverySourcesCreateOrUpdateSample.ts
[discoverysourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/discoverySourcesDeleteSample.ts
[discoverysourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/discoverySourcesGetSample.ts
[discoverysourceslistbymapsresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/discoverySourcesListByMapsResourceSample.ts
[discoverysourcesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/discoverySourcesUpdateSample.ts
[mapscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/mapsCreateOrUpdateSample.ts
[mapsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/mapsDeleteSample.ts
[mapsexportdependenciessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/mapsExportDependenciesSample.ts
[mapsgetconnectionsforprocessonfocusedmachinesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/mapsGetConnectionsForProcessOnFocusedMachineSample.ts
[mapsgetconnectionswithconnectedmachineforfocusedmachinesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/mapsGetConnectionsWithConnectedMachineForFocusedMachineSample.ts
[mapsgetdependencyviewforfocusedmachinesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/mapsGetDependencyViewForFocusedMachineSample.ts
[mapsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/mapsGetSample.ts
[mapslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/mapsListByResourceGroupSample.ts
[mapslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/mapsListBySubscriptionSample.ts
[mapsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/mapsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-dependencymap?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dependencymap/arm-dependencymap/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

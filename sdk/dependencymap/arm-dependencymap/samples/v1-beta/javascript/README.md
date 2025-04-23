# @azure/arm-dependencymap client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-dependencymap in some common scenarios.

| **File Name**                                                                                                                     | **Description**                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [discoverySourcesCreateOrUpdateSample.js][discoverysourcescreateorupdatesample]                                                   | create a DiscoverySourceResource x-ms-original-file: 2025-01-31-preview/DiscoverySources_CreateOrUpdate.json                                  |
| [discoverySourcesDeleteSample.js][discoverysourcesdeletesample]                                                                   | delete a DiscoverySourceResource x-ms-original-file: 2025-01-31-preview/DiscoverySources_Delete.json                                          |
| [discoverySourcesGetSample.js][discoverysourcesgetsample]                                                                         | get a DiscoverySourceResource x-ms-original-file: 2025-01-31-preview/DiscoverySources_Get.json                                                |
| [discoverySourcesListByMapsResourceSample.js][discoverysourceslistbymapsresourcesample]                                           | list DiscoverySourceResource resources by MapsResource x-ms-original-file: 2025-01-31-preview/DiscoverySources_ListByMapsResource.json        |
| [discoverySourcesUpdateSample.js][discoverysourcesupdatesample]                                                                   | update a DiscoverySourceResource x-ms-original-file: 2025-01-31-preview/DiscoverySources_Update.json                                          |
| [mapsCreateOrUpdateSample.js][mapscreateorupdatesample]                                                                           | create a MapsResource x-ms-original-file: 2025-01-31-preview/Maps_CreateOrUpdate.json                                                         |
| [mapsDeleteSample.js][mapsdeletesample]                                                                                           | delete a MapsResource x-ms-original-file: 2025-01-31-preview/Maps_Delete.json                                                                 |
| [mapsExportDependenciesSample.js][mapsexportdependenciessample]                                                                   | export dependencies x-ms-original-file: 2025-01-31-preview/Maps_ExportDependencies.json                                                       |
| [mapsGetConnectionsForProcessOnFocusedMachineSample.js][mapsgetconnectionsforprocessonfocusedmachinesample]                       | get network connections of a process x-ms-original-file: 2025-01-31-preview/Maps_GetConnectionsForProcessOnFocusedMachine.json                |
| [mapsGetConnectionsWithConnectedMachineForFocusedMachineSample.js][mapsgetconnectionswithconnectedmachineforfocusedmachinesample] | get network connections between machines x-ms-original-file: 2025-01-31-preview/Maps_GetConnectionsWithConnectedMachineForFocusedMachine.json |
| [mapsGetDependencyViewForFocusedMachineSample.js][mapsgetdependencyviewforfocusedmachinesample]                                   | get dependency map of single machine x-ms-original-file: 2025-01-31-preview/Maps_GetDependencyViewForFocusedMachine.json                      |
| [mapsGetSample.js][mapsgetsample]                                                                                                 | get a MapsResource x-ms-original-file: 2025-01-31-preview/Maps_Get.json                                                                       |
| [mapsListByResourceGroupSample.js][mapslistbyresourcegroupsample]                                                                 | list MapsResource resources by resource group x-ms-original-file: 2025-01-31-preview/Maps_ListByResourceGroup.json                            |
| [mapsListBySubscriptionSample.js][mapslistbysubscriptionsample]                                                                   | list MapsResource resources by subscription ID x-ms-original-file: 2025-01-31-preview/Maps_ListBySubscription.json                            |
| [mapsUpdateSample.js][mapsupdatesample]                                                                                           | update a MapsResource x-ms-original-file: 2025-01-31-preview/Maps_Update.json                                                                 |
| [operationsListSample.js][operationslistsample]                                                                                   | list the operations for the provider x-ms-original-file: 2025-01-31-preview/Operations_List.json                                              |

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
node discoverySourcesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node discoverySourcesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[discoverysourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/discoverySourcesCreateOrUpdateSample.js
[discoverysourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/discoverySourcesDeleteSample.js
[discoverysourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/discoverySourcesGetSample.js
[discoverysourceslistbymapsresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/discoverySourcesListByMapsResourceSample.js
[discoverysourcesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/discoverySourcesUpdateSample.js
[mapscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/mapsCreateOrUpdateSample.js
[mapsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/mapsDeleteSample.js
[mapsexportdependenciessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/mapsExportDependenciesSample.js
[mapsgetconnectionsforprocessonfocusedmachinesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/mapsGetConnectionsForProcessOnFocusedMachineSample.js
[mapsgetconnectionswithconnectedmachineforfocusedmachinesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/mapsGetConnectionsWithConnectedMachineForFocusedMachineSample.js
[mapsgetdependencyviewforfocusedmachinesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/mapsGetDependencyViewForFocusedMachineSample.js
[mapsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/mapsGetSample.js
[mapslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/mapsListByResourceGroupSample.js
[mapslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/mapsListBySubscriptionSample.js
[mapsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/mapsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dependencymap/arm-dependencymap/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-dependencymap?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dependencymap/arm-dependencymap/README.md

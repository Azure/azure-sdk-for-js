# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [fleetMembersCreateSample.ts][fleetmemberscreatesample]                                   | Create a FleetMember x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/FleetMembers_Create.json                                                  |
| [fleetMembersDeleteSample.ts][fleetmembersdeletesample]                                   | Delete a FleetMember x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/FleetMembers_Delete.json                                                  |
| [fleetMembersGetSample.ts][fleetmembersgetsample]                                         | Get a FleetMember x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/FleetMembers_Get.json                                                        |
| [fleetMembersListByFleetSample.ts][fleetmemberslistbyfleetsample]                         | List FleetMember resources by Fleet x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/FleetMembers_ListByFleet.json                              |
| [fleetMembersUpdateSample.ts][fleetmembersupdatesample]                                   | Update a FleetMember x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/FleetMembers_Update.json                                                  |
| [fleetUpdateStrategiesCreateOrUpdateSample.ts][fleetupdatestrategiescreateorupdatesample] | Create a FleetUpdateStrategy x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateStrategies_CreateOrUpdate.json                              |
| [fleetUpdateStrategiesDeleteSample.ts][fleetupdatestrategiesdeletesample]                 | Delete a FleetUpdateStrategy x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateStrategies_Delete.json                                      |
| [fleetUpdateStrategiesGetSample.ts][fleetupdatestrategiesgetsample]                       | Get a FleetUpdateStrategy x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateStrategies_Get.json                                            |
| [fleetUpdateStrategiesListByFleetSample.ts][fleetupdatestrategieslistbyfleetsample]       | List FleetUpdateStrategy resources by Fleet x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateStrategies_ListByFleet.json                  |
| [fleetsCreateOrUpdateSample.ts][fleetscreateorupdatesample]                               | Creates or updates a Fleet. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_CreateOrUpdate.json                                         |
| [fleetsDeleteSample.ts][fleetsdeletesample]                                               | Delete a Fleet x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_Delete.json                                                              |
| [fleetsGetSample.ts][fleetsgetsample]                                                     | Gets a Fleet. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_Get.json                                                                  |
| [fleetsListByResourceGroupSample.ts][fleetslistbyresourcegroupsample]                     | Lists fleets in the specified subscription and resource group. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_ListByResourceGroup.json |
| [fleetsListBySubscriptionSample.ts][fleetslistbysubscriptionsample]                       | Lists fleets in the specified subscription. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_ListBySub.json                              |
| [fleetsListCredentialsSample.ts][fleetslistcredentialssample]                             | Lists the user credentials of a Fleet. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_ListCredentialsResult.json                       |
| [fleetsUpdateSample.ts][fleetsupdatesample]                                               | Update a Fleet x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_PatchTags.json                                                           |
| [operationsListSample.ts][operationslistsample]                                           | List the operations for the provider x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Operations_List.json                                      |
| [updateRunsCreateOrUpdateSample.ts][updaterunscreateorupdatesample]                       | Create a UpdateRun x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_CreateOrUpdate.json                                              |
| [updateRunsDeleteSample.ts][updaterunsdeletesample]                                       | Delete a UpdateRun x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_Delete.json                                                      |
| [updateRunsGetSample.ts][updaterunsgetsample]                                             | Get a UpdateRun x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_Get.json                                                            |
| [updateRunsListByFleetSample.ts][updaterunslistbyfleetsample]                             | List UpdateRun resources by Fleet x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_ListByFleet.json                                  |
| [updateRunsStartSample.ts][updaterunsstartsample]                                         | Starts an UpdateRun. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_Start.json                                                     |
| [updateRunsStopSample.ts][updaterunsstopsample]                                           | Stops an UpdateRun. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_Stop.json                                                       |

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
node dist/fleetMembersCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env CONTAINERSERVICE_SUBSCRIPTION_ID="<containerservice subscription id>" CONTAINERSERVICE_RESOURCE_GROUP="<containerservice resource group>" node dist/fleetMembersCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[fleetmemberscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetMembersCreateSample.ts
[fleetmembersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetMembersDeleteSample.ts
[fleetmembersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetMembersGetSample.ts
[fleetmemberslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetMembersListByFleetSample.ts
[fleetmembersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetMembersUpdateSample.ts
[fleetupdatestrategiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetUpdateStrategiesCreateOrUpdateSample.ts
[fleetupdatestrategiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetUpdateStrategiesDeleteSample.ts
[fleetupdatestrategiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetUpdateStrategiesGetSample.ts
[fleetupdatestrategieslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetUpdateStrategiesListByFleetSample.ts
[fleetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetsCreateOrUpdateSample.ts
[fleetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetsDeleteSample.ts
[fleetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetsGetSample.ts
[fleetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetsListByResourceGroupSample.ts
[fleetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetsListBySubscriptionSample.ts
[fleetslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetsListCredentialsSample.ts
[fleetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/fleetsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/operationsListSample.ts
[updaterunscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/updateRunsCreateOrUpdateSample.ts
[updaterunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/updateRunsDeleteSample.ts
[updaterunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/updateRunsGetSample.ts
[updaterunslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/updateRunsListByFleetSample.ts
[updaterunsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/updateRunsStartSample.ts
[updaterunsstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/typescript/src/updateRunsStopSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-containerservicefleet?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicefleet/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

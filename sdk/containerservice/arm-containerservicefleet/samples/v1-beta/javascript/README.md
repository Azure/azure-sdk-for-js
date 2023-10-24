# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [fleetMembersCreateSample.js][fleetmemberscreatesample]                                   | Create a FleetMember x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/FleetMembers_Create.json                                                  |
| [fleetMembersDeleteSample.js][fleetmembersdeletesample]                                   | Delete a FleetMember x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/FleetMembers_Delete.json                                                  |
| [fleetMembersGetSample.js][fleetmembersgetsample]                                         | Get a FleetMember x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/FleetMembers_Get.json                                                        |
| [fleetMembersListByFleetSample.js][fleetmemberslistbyfleetsample]                         | List FleetMember resources by Fleet x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/FleetMembers_ListByFleet.json                              |
| [fleetMembersUpdateSample.js][fleetmembersupdatesample]                                   | Update a FleetMember x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/FleetMembers_Update.json                                                  |
| [fleetUpdateStrategiesCreateOrUpdateSample.js][fleetupdatestrategiescreateorupdatesample] | Create a FleetUpdateStrategy x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateStrategies_CreateOrUpdate.json                              |
| [fleetUpdateStrategiesDeleteSample.js][fleetupdatestrategiesdeletesample]                 | Delete a FleetUpdateStrategy x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateStrategies_Delete.json                                      |
| [fleetUpdateStrategiesGetSample.js][fleetupdatestrategiesgetsample]                       | Get a FleetUpdateStrategy x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateStrategies_Get.json                                            |
| [fleetUpdateStrategiesListByFleetSample.js][fleetupdatestrategieslistbyfleetsample]       | List FleetUpdateStrategy resources by Fleet x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateStrategies_ListByFleet.json                  |
| [fleetsCreateOrUpdateSample.js][fleetscreateorupdatesample]                               | Creates or updates a Fleet. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_CreateOrUpdate.json                                         |
| [fleetsDeleteSample.js][fleetsdeletesample]                                               | Delete a Fleet x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_Delete.json                                                              |
| [fleetsGetSample.js][fleetsgetsample]                                                     | Gets a Fleet. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_Get.json                                                                  |
| [fleetsListByResourceGroupSample.js][fleetslistbyresourcegroupsample]                     | Lists fleets in the specified subscription and resource group. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_ListByResourceGroup.json |
| [fleetsListBySubscriptionSample.js][fleetslistbysubscriptionsample]                       | Lists fleets in the specified subscription. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_ListBySub.json                              |
| [fleetsListCredentialsSample.js][fleetslistcredentialssample]                             | Lists the user credentials of a Fleet. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_ListCredentialsResult.json                       |
| [fleetsUpdateSample.js][fleetsupdatesample]                                               | Update a Fleet x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Fleets_PatchTags.json                                                           |
| [operationsListSample.js][operationslistsample]                                           | List the operations for the provider x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/Operations_List.json                                      |
| [updateRunsCreateOrUpdateSample.js][updaterunscreateorupdatesample]                       | Create a UpdateRun x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_CreateOrUpdate.json                                              |
| [updateRunsDeleteSample.js][updaterunsdeletesample]                                       | Delete a UpdateRun x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_Delete.json                                                      |
| [updateRunsGetSample.js][updaterunsgetsample]                                             | Get a UpdateRun x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_Get.json                                                            |
| [updateRunsListByFleetSample.js][updaterunslistbyfleetsample]                             | List UpdateRun resources by Fleet x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_ListByFleet.json                                  |
| [updateRunsStartSample.js][updaterunsstartsample]                                         | Starts an UpdateRun. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_Start.json                                                     |
| [updateRunsStopSample.js][updaterunsstopsample]                                           | Stops an UpdateRun. x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2023-08-15-preview/examples/UpdateRuns_Stop.json                                                       |

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
node fleetMembersCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env CONTAINERSERVICE_SUBSCRIPTION_ID="<containerservice subscription id>" CONTAINERSERVICE_RESOURCE_GROUP="<containerservice resource group>" node fleetMembersCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[fleetmemberscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetMembersCreateSample.js
[fleetmembersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetMembersDeleteSample.js
[fleetmembersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetMembersGetSample.js
[fleetmemberslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetMembersListByFleetSample.js
[fleetmembersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetMembersUpdateSample.js
[fleetupdatestrategiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetUpdateStrategiesCreateOrUpdateSample.js
[fleetupdatestrategiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetUpdateStrategiesDeleteSample.js
[fleetupdatestrategiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetUpdateStrategiesGetSample.js
[fleetupdatestrategieslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetUpdateStrategiesListByFleetSample.js
[fleetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetsCreateOrUpdateSample.js
[fleetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetsDeleteSample.js
[fleetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetsGetSample.js
[fleetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetsListByResourceGroupSample.js
[fleetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetsListBySubscriptionSample.js
[fleetslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetsListCredentialsSample.js
[fleetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/fleetsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/operationsListSample.js
[updaterunscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/updateRunsCreateOrUpdateSample.js
[updaterunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/updateRunsDeleteSample.js
[updaterunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/updateRunsGetSample.js
[updaterunslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/updateRunsListByFleetSample.js
[updaterunsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/updateRunsStartSample.js
[updaterunsstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v1-beta/javascript/updateRunsStopSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-containerservicefleet?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicefleet/README.md

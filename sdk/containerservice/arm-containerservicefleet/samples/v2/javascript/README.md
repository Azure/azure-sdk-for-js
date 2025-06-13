# @azure/arm-containerservicefleet client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-containerservicefleet in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [autoUpgradeProfileOperationsGenerateUpdateRunSample.js][autoupgradeprofileoperationsgenerateupdaterunsample] | a long-running resource action. x-ms-original-file: 2025-03-01/AutoUpgradeProfileOperations_GenerateUpdateRun_MaximumSet_Gen.json        |
| [autoUpgradeProfilesCreateOrUpdateSample.js][autoupgradeprofilescreateorupdatesample]                         | create a AutoUpgradeProfile x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_CreateOrUpdate.json                                       |
| [autoUpgradeProfilesDeleteSample.js][autoupgradeprofilesdeletesample]                                         | delete a AutoUpgradeProfile x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_Delete.json                                               |
| [autoUpgradeProfilesGetSample.js][autoupgradeprofilesgetsample]                                               | get a AutoUpgradeProfile x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_Get.json                                                     |
| [autoUpgradeProfilesListByFleetSample.js][autoupgradeprofileslistbyfleetsample]                               | list AutoUpgradeProfile resources by Fleet x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_ListByFleet.json                           |
| [fleetMembersCreateSample.js][fleetmemberscreatesample]                                                       | create a FleetMember x-ms-original-file: 2025-03-01/FleetMembers_Create.json                                                             |
| [fleetMembersDeleteSample.js][fleetmembersdeletesample]                                                       | delete a FleetMember x-ms-original-file: 2025-03-01/FleetMembers_Delete.json                                                             |
| [fleetMembersGetSample.js][fleetmembersgetsample]                                                             | get a FleetMember x-ms-original-file: 2025-03-01/FleetMembers_Get.json                                                                   |
| [fleetMembersListByFleetSample.js][fleetmemberslistbyfleetsample]                                             | list FleetMember resources by Fleet x-ms-original-file: 2025-03-01/FleetMembers_ListByFleet.json                                         |
| [fleetMembersUpdateAsyncSample.js][fleetmembersupdateasyncsample]                                             | update a FleetMember x-ms-original-file: 2025-03-01/FleetMembers_Update.json                                                             |
| [fleetUpdateStrategiesCreateOrUpdateSample.js][fleetupdatestrategiescreateorupdatesample]                     | create a FleetUpdateStrategy x-ms-original-file: 2025-03-01/FleetUpdateStrategies_CreateOrUpdate_MaximumSet_Gen.json                     |
| [fleetUpdateStrategiesDeleteSample.js][fleetupdatestrategiesdeletesample]                                     | delete a FleetUpdateStrategy x-ms-original-file: 2025-03-01/FleetUpdateStrategies_Delete_MaximumSet_Gen.json                             |
| [fleetUpdateStrategiesGetSample.js][fleetupdatestrategiesgetsample]                                           | get a FleetUpdateStrategy x-ms-original-file: 2025-03-01/FleetUpdateStrategies_Get_MaximumSet_Gen.json                                   |
| [fleetUpdateStrategiesListByFleetSample.js][fleetupdatestrategieslistbyfleetsample]                           | list FleetUpdateStrategy resources by Fleet x-ms-original-file: 2025-03-01/FleetUpdateStrategies_ListByFleet_MaximumSet_Gen.json         |
| [fleetsCreateSample.js][fleetscreatesample]                                                                   | creates or updates a Fleet. x-ms-original-file: 2025-03-01/Fleets_CreateOrUpdate.json                                                    |
| [fleetsDeleteSample.js][fleetsdeletesample]                                                                   | delete a Fleet x-ms-original-file: 2025-03-01/Fleets_Delete.json                                                                         |
| [fleetsGetSample.js][fleetsgetsample]                                                                         | gets a Fleet. x-ms-original-file: 2025-03-01/Fleets_Get.json                                                                             |
| [fleetsListByResourceGroupSample.js][fleetslistbyresourcegroupsample]                                         | lists fleets in the specified subscription and resource group. x-ms-original-file: 2025-03-01/Fleets_ListByResourceGroup.json            |
| [fleetsListBySubscriptionSample.js][fleetslistbysubscriptionsample]                                           | lists fleets in the specified subscription. x-ms-original-file: 2025-03-01/Fleets_ListBySub.json                                         |
| [fleetsListCredentialsSample.js][fleetslistcredentialssample]                                                 | lists the user credentials of a Fleet. x-ms-original-file: 2025-03-01/Fleets_ListCredentialsResult.json                                  |
| [fleetsUpdateAsyncSample.js][fleetsupdateasyncsample]                                                         | update a Fleet x-ms-original-file: 2025-03-01/Fleets_PatchTags.json                                                                      |
| [operationsListSample.js][operationslistsample]                                                               | list the operations for the provider x-ms-original-file: 2025-03-01/Operations_List.json                                                 |
| [updateRunsCreateOrUpdateSample.js][updaterunscreateorupdatesample]                                           | create a UpdateRun x-ms-original-file: 2025-03-01/UpdateRuns_CreateOrUpdate.json                                                         |
| [updateRunsDeleteSample.js][updaterunsdeletesample]                                                           | delete a UpdateRun x-ms-original-file: 2025-03-01/UpdateRuns_Delete.json                                                                 |
| [updateRunsGetSample.js][updaterunsgetsample]                                                                 | get a UpdateRun x-ms-original-file: 2025-03-01/UpdateRuns_Get.json                                                                       |
| [updateRunsListByFleetSample.js][updaterunslistbyfleetsample]                                                 | list UpdateRun resources by Fleet x-ms-original-file: 2025-03-01/UpdateRuns_ListByFleet.json                                             |
| [updateRunsSkipSample.js][updaterunsskipsample]                                                               | skips one or a combination of member/group/stage/afterStageWait(s) of an update run. x-ms-original-file: 2025-03-01/UpdateRuns_Skip.json |
| [updateRunsStartSample.js][updaterunsstartsample]                                                             | starts an UpdateRun. x-ms-original-file: 2025-03-01/UpdateRuns_Start.json                                                                |
| [updateRunsStopSample.js][updaterunsstopsample]                                                               | stops an UpdateRun. x-ms-original-file: 2025-03-01/UpdateRuns_Stop.json                                                                  |

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
node autoUpgradeProfileOperationsGenerateUpdateRunSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node autoUpgradeProfileOperationsGenerateUpdateRunSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[autoupgradeprofileoperationsgenerateupdaterunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/autoUpgradeProfileOperationsGenerateUpdateRunSample.js
[autoupgradeprofilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/autoUpgradeProfilesCreateOrUpdateSample.js
[autoupgradeprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/autoUpgradeProfilesDeleteSample.js
[autoupgradeprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/autoUpgradeProfilesGetSample.js
[autoupgradeprofileslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/autoUpgradeProfilesListByFleetSample.js
[fleetmemberscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetMembersCreateSample.js
[fleetmembersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetMembersDeleteSample.js
[fleetmembersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetMembersGetSample.js
[fleetmemberslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetMembersListByFleetSample.js
[fleetmembersupdateasyncsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetMembersUpdateAsyncSample.js
[fleetupdatestrategiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetUpdateStrategiesCreateOrUpdateSample.js
[fleetupdatestrategiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetUpdateStrategiesDeleteSample.js
[fleetupdatestrategiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetUpdateStrategiesGetSample.js
[fleetupdatestrategieslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetUpdateStrategiesListByFleetSample.js
[fleetscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetsCreateSample.js
[fleetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetsDeleteSample.js
[fleetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetsGetSample.js
[fleetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetsListByResourceGroupSample.js
[fleetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetsListBySubscriptionSample.js
[fleetslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetsListCredentialsSample.js
[fleetsupdateasyncsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/fleetsUpdateAsyncSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/operationsListSample.js
[updaterunscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/updateRunsCreateOrUpdateSample.js
[updaterunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/updateRunsDeleteSample.js
[updaterunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/updateRunsGetSample.js
[updaterunslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/updateRunsListByFleetSample.js
[updaterunsskipsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/updateRunsSkipSample.js
[updaterunsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/updateRunsStartSample.js
[updaterunsstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/javascript/updateRunsStopSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerservicefleet?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicefleet/README.md

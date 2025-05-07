# @azure/arm-containerservicefleet client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-containerservicefleet in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [autoUpgradeProfileOperationsGenerateUpdateRunSample.ts][autoupgradeprofileoperationsgenerateupdaterunsample] | a long-running resource action. x-ms-original-file: 2025-03-01/AutoUpgradeProfileOperations_GenerateUpdateRun_MaximumSet_Gen.json        |
| [autoUpgradeProfilesCreateOrUpdateSample.ts][autoupgradeprofilescreateorupdatesample]                         | create a AutoUpgradeProfile x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_CreateOrUpdate.json                                       |
| [autoUpgradeProfilesDeleteSample.ts][autoupgradeprofilesdeletesample]                                         | delete a AutoUpgradeProfile x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_Delete.json                                               |
| [autoUpgradeProfilesGetSample.ts][autoupgradeprofilesgetsample]                                               | get a AutoUpgradeProfile x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_Get.json                                                     |
| [autoUpgradeProfilesListByFleetSample.ts][autoupgradeprofileslistbyfleetsample]                               | list AutoUpgradeProfile resources by Fleet x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_ListByFleet.json                           |
| [fleetMembersCreateSample.ts][fleetmemberscreatesample]                                                       | create a FleetMember x-ms-original-file: 2025-03-01/FleetMembers_Create.json                                                             |
| [fleetMembersDeleteSample.ts][fleetmembersdeletesample]                                                       | delete a FleetMember x-ms-original-file: 2025-03-01/FleetMembers_Delete.json                                                             |
| [fleetMembersGetSample.ts][fleetmembersgetsample]                                                             | get a FleetMember x-ms-original-file: 2025-03-01/FleetMembers_Get.json                                                                   |
| [fleetMembersListByFleetSample.ts][fleetmemberslistbyfleetsample]                                             | list FleetMember resources by Fleet x-ms-original-file: 2025-03-01/FleetMembers_ListByFleet.json                                         |
| [fleetMembersUpdateAsyncSample.ts][fleetmembersupdateasyncsample]                                             | update a FleetMember x-ms-original-file: 2025-03-01/FleetMembers_Update.json                                                             |
| [fleetUpdateStrategiesCreateOrUpdateSample.ts][fleetupdatestrategiescreateorupdatesample]                     | create a FleetUpdateStrategy x-ms-original-file: 2025-03-01/FleetUpdateStrategies_CreateOrUpdate_MaximumSet_Gen.json                     |
| [fleetUpdateStrategiesDeleteSample.ts][fleetupdatestrategiesdeletesample]                                     | delete a FleetUpdateStrategy x-ms-original-file: 2025-03-01/FleetUpdateStrategies_Delete_MaximumSet_Gen.json                             |
| [fleetUpdateStrategiesGetSample.ts][fleetupdatestrategiesgetsample]                                           | get a FleetUpdateStrategy x-ms-original-file: 2025-03-01/FleetUpdateStrategies_Get_MaximumSet_Gen.json                                   |
| [fleetUpdateStrategiesListByFleetSample.ts][fleetupdatestrategieslistbyfleetsample]                           | list FleetUpdateStrategy resources by Fleet x-ms-original-file: 2025-03-01/FleetUpdateStrategies_ListByFleet_MaximumSet_Gen.json         |
| [fleetsCreateSample.ts][fleetscreatesample]                                                                   | creates or updates a Fleet. x-ms-original-file: 2025-03-01/Fleets_CreateOrUpdate.json                                                    |
| [fleetsDeleteSample.ts][fleetsdeletesample]                                                                   | delete a Fleet x-ms-original-file: 2025-03-01/Fleets_Delete.json                                                                         |
| [fleetsGetSample.ts][fleetsgetsample]                                                                         | gets a Fleet. x-ms-original-file: 2025-03-01/Fleets_Get.json                                                                             |
| [fleetsListByResourceGroupSample.ts][fleetslistbyresourcegroupsample]                                         | lists fleets in the specified subscription and resource group. x-ms-original-file: 2025-03-01/Fleets_ListByResourceGroup.json            |
| [fleetsListBySubscriptionSample.ts][fleetslistbysubscriptionsample]                                           | lists fleets in the specified subscription. x-ms-original-file: 2025-03-01/Fleets_ListBySub.json                                         |
| [fleetsListCredentialsSample.ts][fleetslistcredentialssample]                                                 | lists the user credentials of a Fleet. x-ms-original-file: 2025-03-01/Fleets_ListCredentialsResult.json                                  |
| [fleetsUpdateAsyncSample.ts][fleetsupdateasyncsample]                                                         | update a Fleet x-ms-original-file: 2025-03-01/Fleets_PatchTags.json                                                                      |
| [operationsListSample.ts][operationslistsample]                                                               | list the operations for the provider x-ms-original-file: 2025-03-01/Operations_List.json                                                 |
| [updateRunsCreateOrUpdateSample.ts][updaterunscreateorupdatesample]                                           | create a UpdateRun x-ms-original-file: 2025-03-01/UpdateRuns_CreateOrUpdate.json                                                         |
| [updateRunsDeleteSample.ts][updaterunsdeletesample]                                                           | delete a UpdateRun x-ms-original-file: 2025-03-01/UpdateRuns_Delete.json                                                                 |
| [updateRunsGetSample.ts][updaterunsgetsample]                                                                 | get a UpdateRun x-ms-original-file: 2025-03-01/UpdateRuns_Get.json                                                                       |
| [updateRunsListByFleetSample.ts][updaterunslistbyfleetsample]                                                 | list UpdateRun resources by Fleet x-ms-original-file: 2025-03-01/UpdateRuns_ListByFleet.json                                             |
| [updateRunsSkipSample.ts][updaterunsskipsample]                                                               | skips one or a combination of member/group/stage/afterStageWait(s) of an update run. x-ms-original-file: 2025-03-01/UpdateRuns_Skip.json |
| [updateRunsStartSample.ts][updaterunsstartsample]                                                             | starts an UpdateRun. x-ms-original-file: 2025-03-01/UpdateRuns_Start.json                                                                |
| [updateRunsStopSample.ts][updaterunsstopsample]                                                               | stops an UpdateRun. x-ms-original-file: 2025-03-01/UpdateRuns_Stop.json                                                                  |

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
node dist/autoUpgradeProfileOperationsGenerateUpdateRunSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/autoUpgradeProfileOperationsGenerateUpdateRunSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[autoupgradeprofileoperationsgenerateupdaterunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/autoUpgradeProfileOperationsGenerateUpdateRunSample.ts
[autoupgradeprofilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/autoUpgradeProfilesCreateOrUpdateSample.ts
[autoupgradeprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/autoUpgradeProfilesDeleteSample.ts
[autoupgradeprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/autoUpgradeProfilesGetSample.ts
[autoupgradeprofileslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/autoUpgradeProfilesListByFleetSample.ts
[fleetmemberscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetMembersCreateSample.ts
[fleetmembersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetMembersDeleteSample.ts
[fleetmembersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetMembersGetSample.ts
[fleetmemberslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetMembersListByFleetSample.ts
[fleetmembersupdateasyncsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetMembersUpdateAsyncSample.ts
[fleetupdatestrategiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetUpdateStrategiesCreateOrUpdateSample.ts
[fleetupdatestrategiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetUpdateStrategiesDeleteSample.ts
[fleetupdatestrategiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetUpdateStrategiesGetSample.ts
[fleetupdatestrategieslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetUpdateStrategiesListByFleetSample.ts
[fleetscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetsCreateSample.ts
[fleetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetsDeleteSample.ts
[fleetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetsGetSample.ts
[fleetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetsListByResourceGroupSample.ts
[fleetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetsListBySubscriptionSample.ts
[fleetslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetsListCredentialsSample.ts
[fleetsupdateasyncsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/fleetsUpdateAsyncSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/operationsListSample.ts
[updaterunscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/updateRunsCreateOrUpdateSample.ts
[updaterunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/updateRunsDeleteSample.ts
[updaterunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/updateRunsGetSample.ts
[updaterunslistbyfleetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/updateRunsListByFleetSample.ts
[updaterunsskipsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/updateRunsSkipSample.ts
[updaterunsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/updateRunsStartSample.ts
[updaterunsstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicefleet/samples/v2/typescript/src/updateRunsStopSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerservicefleet?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicefleet/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

# @azure/arm-privatetrafficmanager client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-privatetrafficmanager in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsCreateOrUpdateSample.ts][endpointscreateorupdatesample]                           | create or update a Private Traffic Manager endpoint. x-ms-original-file: 2026-02-09-preview/Endpoints_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                        |
| [endpointsDeleteSample.ts][endpointsdeletesample]                                           | deletes a Private Traffic Manager endpoint. x-ms-original-file: 2026-02-09-preview/Endpoints_Delete_MaximumSet_Gen.json                                                                                                                                                         |
| [endpointsGetSample.ts][endpointsgetsample]                                                 | gets a Private Traffic Manager endpoint. x-ms-original-file: 2026-02-09-preview/Endpoints_Get_MaximumSet_Gen.json                                                                                                                                                               |
| [endpointsListByParentSample.ts][endpointslistbyparentsample]                               | get Private Traffic Manager Endpoints by profile x-ms-original-file: 2026-02-09-preview/Endpoints_ListByParent_MaximumSet_Gen.json                                                                                                                                              |
| [endpointsUpdateSample.ts][endpointsupdatesample]                                           | updates a Private Traffic Manager endpoint. x-ms-original-file: 2026-02-09-preview/Endpoints_Update_MaximumSet_Gen.json                                                                                                                                                         |
| [healthPoliciesCreateOrUpdateSample.ts][healthpoliciescreateorupdatesample]                 | create or update a Traffic Manager health policy. x-ms-original-file: 2026-02-09-preview/HealthPolicies_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                      |
| [healthPoliciesDeleteSample.ts][healthpoliciesdeletesample]                                 | deletes a Traffic Manager health policy. x-ms-original-file: 2026-02-09-preview/HealthPolicies_Delete_MaximumSet_Gen.json                                                                                                                                                       |
| [healthPoliciesGetSample.ts][healthpoliciesgetsample]                                       | gets a Traffic Manager health policy. x-ms-original-file: 2026-02-09-preview/HealthPolicies_Get_MaximumSet_Gen.json                                                                                                                                                             |
| [healthPoliciesListByParentSample.ts][healthpolicieslistbyparentsample]                     | lists all Health Policies within a Traffic Manager profile. x-ms-original-file: 2026-02-09-preview/HealthPolicies_ListByParent_MaximumSet_Gen.json                                                                                                                              |
| [operationsListSample.ts][operationslistsample]                                             | list the operations for the provider x-ms-original-file: 2026-02-09-preview/Operations_List_MaximumSet_Gen.json                                                                                                                                                                 |
| [profileProbingGatewaysCreateOrUpdateSample.ts][profileprobinggatewayscreateorupdatesample] | creates or updates a probing gateway association with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_CreateOrUpdate_MaximumSet_Gen.json |
| [profileProbingGatewaysDeleteSample.ts][profileprobinggatewaysdeletesample]                 | deletes a probing gateway association from a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_Delete_MaximumSet_Gen.json                    |
| [profileProbingGatewaysGetSample.ts][profileprobinggatewaysgetsample]                       | gets a probing gateway associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_Get_MaximumSet_Gen.json                           |
| [profileProbingGatewaysListByParentSample.ts][profileprobinggatewayslistbyparentsample]     | lists all probing gateways associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_ListByParent_MaximumSet_Gen.json              |
| [profileProbingGatewaysUpdateSample.ts][profileprobinggatewaysupdatesample]                 | updates a probing gateway association with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_Update_MaximumSet_Gen.json                    |
| [profilesCreateOrUpdateSample.ts][profilescreateorupdatesample]                             | create or update a Private Traffic Manager profile. x-ms-original-file: 2026-02-09-preview/Profiles_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                          |
| [profilesDeleteSample.ts][profilesdeletesample]                                             | deletes a Private Traffic Manager profile. x-ms-original-file: 2026-02-09-preview/Profiles_Delete_MaximumSet_Gen.json                                                                                                                                                           |
| [profilesGetSample.ts][profilesgetsample]                                                   | gets a Private Traffic Manager profile. x-ms-original-file: 2026-02-09-preview/Profiles_Get_MaximumSet_Gen.json                                                                                                                                                                 |
| [profilesListByResourceGroupSample.ts][profileslistbyresourcegroupsample]                   | lists all Private Traffic Manager profiles within a resource group. x-ms-original-file: 2026-02-09-preview/Profiles_ListByResourceGroup_MaximumSet_Gen.json                                                                                                                     |
| [profilesListBySubscriptionSample.ts][profileslistbysubscriptionsample]                     | lists all Private Traffic Manager profiles within a subscription. x-ms-original-file: 2026-02-09-preview/Profiles_ListBySubscription_MaximumSet_Gen.json                                                                                                                        |
| [profilesUpdateSample.ts][profilesupdatesample]                                             | updates a Traffic Manager profile. x-ms-original-file: 2026-02-09-preview/Profiles_Update_MaximumSet_Gen.json                                                                                                                                                                   |
| [sitesCreateOrUpdateSample.ts][sitescreateorupdatesample]                                   | create or update a Site. x-ms-original-file: 2026-02-09-preview/Sites_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                                                        |
| [sitesDeleteSample.ts][sitesdeletesample]                                                   | deletes a Site. x-ms-original-file: 2026-02-09-preview/Sites_Delete_MaximumSet_Gen.json                                                                                                                                                                                         |
| [sitesGetSample.ts][sitesgetsample]                                                         | gets a Site. x-ms-original-file: 2026-02-09-preview/Sites_Get_MaximumSet_Gen.json                                                                                                                                                                                               |
| [sitesListByParentSample.ts][siteslistbyparentsample]                                       | lists all Sites within a topology map. x-ms-original-file: 2026-02-09-preview/Sites_ListByParent_MaximumSet_Gen.json                                                                                                                                                            |
| [sitesUpdateSample.ts][sitesupdatesample]                                                   | updates a Site. x-ms-original-file: 2026-02-09-preview/Sites_Update_MaximumSet_Gen.json                                                                                                                                                                                         |
| [topologyMapsCreateOrUpdateSample.ts][topologymapscreateorupdatesample]                     | create or update a Topology Map. x-ms-original-file: 2026-02-09-preview/TopologyMaps_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                                         |
| [topologyMapsDeleteSample.ts][topologymapsdeletesample]                                     | deletes a Topology Map. x-ms-original-file: 2026-02-09-preview/TopologyMaps_Delete_MaximumSet_Gen.json                                                                                                                                                                          |
| [topologyMapsGetSample.ts][topologymapsgetsample]                                           | gets a Topology Map. x-ms-original-file: 2026-02-09-preview/TopologyMaps_Get_MaximumSet_Gen.json                                                                                                                                                                                |
| [topologyMapsListByResourceGroupSample.ts][topologymapslistbyresourcegroupsample]           | lists all Topology Maps within a resource group. x-ms-original-file: 2026-02-09-preview/TopologyMaps_ListByResourceGroup_MaximumSet_Gen.json                                                                                                                                    |
| [topologyMapsListBySubscriptionSample.ts][topologymapslistbysubscriptionsample]             | lists all Topology Maps within a subscription. x-ms-original-file: 2026-02-09-preview/TopologyMaps_ListBySubscription_MaximumSet_Gen.json                                                                                                                                       |
| [topologyMapsUpdateSample.ts][topologymapsupdatesample]                                     | updates a Topology Map. x-ms-original-file: 2026-02-09-preview/TopologyMaps_Update_MaximumSet_Gen.json                                                                                                                                                                          |

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
node dist/endpointsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/endpointsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/endpointsCreateOrUpdateSample.ts
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/endpointsDeleteSample.ts
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/endpointsGetSample.ts
[endpointslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/endpointsListByParentSample.ts
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/endpointsUpdateSample.ts
[healthpoliciescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/healthPoliciesCreateOrUpdateSample.ts
[healthpoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/healthPoliciesDeleteSample.ts
[healthpoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/healthPoliciesGetSample.ts
[healthpolicieslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/healthPoliciesListByParentSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/operationsListSample.ts
[profileprobinggatewayscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profileProbingGatewaysCreateOrUpdateSample.ts
[profileprobinggatewaysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profileProbingGatewaysDeleteSample.ts
[profileprobinggatewaysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profileProbingGatewaysGetSample.ts
[profileprobinggatewayslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profileProbingGatewaysListByParentSample.ts
[profileprobinggatewaysupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profileProbingGatewaysUpdateSample.ts
[profilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profilesCreateOrUpdateSample.ts
[profilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profilesDeleteSample.ts
[profilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profilesGetSample.ts
[profileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profilesListByResourceGroupSample.ts
[profileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profilesListBySubscriptionSample.ts
[profilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/profilesUpdateSample.ts
[sitescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/sitesCreateOrUpdateSample.ts
[sitesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/sitesDeleteSample.ts
[sitesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/sitesGetSample.ts
[siteslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/sitesListByParentSample.ts
[sitesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/sitesUpdateSample.ts
[topologymapscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/topologyMapsCreateOrUpdateSample.ts
[topologymapsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/topologyMapsDeleteSample.ts
[topologymapsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/topologyMapsGetSample.ts
[topologymapslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/topologyMapsListByResourceGroupSample.ts
[topologymapslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/topologyMapsListBySubscriptionSample.ts
[topologymapsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/typescript/src/topologyMapsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-privatetrafficmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

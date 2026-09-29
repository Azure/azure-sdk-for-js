# @azure/arm-privatetrafficmanager client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-privatetrafficmanager in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsCreateOrUpdateSample.js][endpointscreateorupdatesample]                           | create or update a Private Traffic Manager endpoint. x-ms-original-file: 2026-02-09-preview/Endpoints_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                        |
| [endpointsDeleteSample.js][endpointsdeletesample]                                           | deletes a Private Traffic Manager endpoint. x-ms-original-file: 2026-02-09-preview/Endpoints_Delete_MaximumSet_Gen.json                                                                                                                                                         |
| [endpointsGetSample.js][endpointsgetsample]                                                 | gets a Private Traffic Manager endpoint. x-ms-original-file: 2026-02-09-preview/Endpoints_Get_MaximumSet_Gen.json                                                                                                                                                               |
| [endpointsListByParentSample.js][endpointslistbyparentsample]                               | get Private Traffic Manager Endpoints by profile x-ms-original-file: 2026-02-09-preview/Endpoints_ListByParent_MaximumSet_Gen.json                                                                                                                                              |
| [endpointsUpdateSample.js][endpointsupdatesample]                                           | updates a Private Traffic Manager endpoint. x-ms-original-file: 2026-02-09-preview/Endpoints_Update_MaximumSet_Gen.json                                                                                                                                                         |
| [healthPoliciesCreateOrUpdateSample.js][healthpoliciescreateorupdatesample]                 | create or update a Traffic Manager health policy. x-ms-original-file: 2026-02-09-preview/HealthPolicies_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                      |
| [healthPoliciesDeleteSample.js][healthpoliciesdeletesample]                                 | deletes a Traffic Manager health policy. x-ms-original-file: 2026-02-09-preview/HealthPolicies_Delete_MaximumSet_Gen.json                                                                                                                                                       |
| [healthPoliciesGetSample.js][healthpoliciesgetsample]                                       | gets a Traffic Manager health policy. x-ms-original-file: 2026-02-09-preview/HealthPolicies_Get_MaximumSet_Gen.json                                                                                                                                                             |
| [healthPoliciesListByParentSample.js][healthpolicieslistbyparentsample]                     | lists all Health Policies within a Traffic Manager profile. x-ms-original-file: 2026-02-09-preview/HealthPolicies_ListByParent_MaximumSet_Gen.json                                                                                                                              |
| [operationsListSample.js][operationslistsample]                                             | list the operations for the provider x-ms-original-file: 2026-02-09-preview/Operations_List_MaximumSet_Gen.json                                                                                                                                                                 |
| [profileProbingGatewaysCreateOrUpdateSample.js][profileprobinggatewayscreateorupdatesample] | creates or updates a probing gateway association with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_CreateOrUpdate_MaximumSet_Gen.json |
| [profileProbingGatewaysDeleteSample.js][profileprobinggatewaysdeletesample]                 | deletes a probing gateway association from a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_Delete_MaximumSet_Gen.json                    |
| [profileProbingGatewaysGetSample.js][profileprobinggatewaysgetsample]                       | gets a probing gateway associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_Get_MaximumSet_Gen.json                           |
| [profileProbingGatewaysListByParentSample.js][profileprobinggatewayslistbyparentsample]     | lists all probing gateways associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_ListByParent_MaximumSet_Gen.json              |
| [profileProbingGatewaysUpdateSample.js][profileprobinggatewaysupdatesample]                 | updates a probing gateway association with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_Update_MaximumSet_Gen.json                    |
| [profilesCreateOrUpdateSample.js][profilescreateorupdatesample]                             | create or update a Private Traffic Manager profile. x-ms-original-file: 2026-02-09-preview/Profiles_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                          |
| [profilesDeleteSample.js][profilesdeletesample]                                             | deletes a Private Traffic Manager profile. x-ms-original-file: 2026-02-09-preview/Profiles_Delete_MaximumSet_Gen.json                                                                                                                                                           |
| [profilesGetSample.js][profilesgetsample]                                                   | gets a Private Traffic Manager profile. x-ms-original-file: 2026-02-09-preview/Profiles_Get_MaximumSet_Gen.json                                                                                                                                                                 |
| [profilesListByResourceGroupSample.js][profileslistbyresourcegroupsample]                   | lists all Private Traffic Manager profiles within a resource group. x-ms-original-file: 2026-02-09-preview/Profiles_ListByResourceGroup_MaximumSet_Gen.json                                                                                                                     |
| [profilesListBySubscriptionSample.js][profileslistbysubscriptionsample]                     | lists all Private Traffic Manager profiles within a subscription. x-ms-original-file: 2026-02-09-preview/Profiles_ListBySubscription_MaximumSet_Gen.json                                                                                                                        |
| [profilesUpdateSample.js][profilesupdatesample]                                             | updates a Traffic Manager profile. x-ms-original-file: 2026-02-09-preview/Profiles_Update_MaximumSet_Gen.json                                                                                                                                                                   |
| [sitesCreateOrUpdateSample.js][sitescreateorupdatesample]                                   | create or update a Site. x-ms-original-file: 2026-02-09-preview/Sites_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                                                        |
| [sitesDeleteSample.js][sitesdeletesample]                                                   | deletes a Site. x-ms-original-file: 2026-02-09-preview/Sites_Delete_MaximumSet_Gen.json                                                                                                                                                                                         |
| [sitesGetSample.js][sitesgetsample]                                                         | gets a Site. x-ms-original-file: 2026-02-09-preview/Sites_Get_MaximumSet_Gen.json                                                                                                                                                                                               |
| [sitesListByParentSample.js][siteslistbyparentsample]                                       | lists all Sites within a topology map. x-ms-original-file: 2026-02-09-preview/Sites_ListByParent_MaximumSet_Gen.json                                                                                                                                                            |
| [sitesUpdateSample.js][sitesupdatesample]                                                   | updates a Site. x-ms-original-file: 2026-02-09-preview/Sites_Update_MaximumSet_Gen.json                                                                                                                                                                                         |
| [topologyMapsCreateOrUpdateSample.js][topologymapscreateorupdatesample]                     | create or update a Topology Map. x-ms-original-file: 2026-02-09-preview/TopologyMaps_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                                         |
| [topologyMapsDeleteSample.js][topologymapsdeletesample]                                     | deletes a Topology Map. x-ms-original-file: 2026-02-09-preview/TopologyMaps_Delete_MaximumSet_Gen.json                                                                                                                                                                          |
| [topologyMapsGetSample.js][topologymapsgetsample]                                           | gets a Topology Map. x-ms-original-file: 2026-02-09-preview/TopologyMaps_Get_MaximumSet_Gen.json                                                                                                                                                                                |
| [topologyMapsListByResourceGroupSample.js][topologymapslistbyresourcegroupsample]           | lists all Topology Maps within a resource group. x-ms-original-file: 2026-02-09-preview/TopologyMaps_ListByResourceGroup_MaximumSet_Gen.json                                                                                                                                    |
| [topologyMapsListBySubscriptionSample.js][topologymapslistbysubscriptionsample]             | lists all Topology Maps within a subscription. x-ms-original-file: 2026-02-09-preview/TopologyMaps_ListBySubscription_MaximumSet_Gen.json                                                                                                                                       |
| [topologyMapsUpdateSample.js][topologymapsupdatesample]                                     | updates a Topology Map. x-ms-original-file: 2026-02-09-preview/TopologyMaps_Update_MaximumSet_Gen.json                                                                                                                                                                          |

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
node endpointsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node endpointsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/endpointsCreateOrUpdateSample.js
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/endpointsDeleteSample.js
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/endpointsGetSample.js
[endpointslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/endpointsListByParentSample.js
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/endpointsUpdateSample.js
[healthpoliciescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/healthPoliciesCreateOrUpdateSample.js
[healthpoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/healthPoliciesDeleteSample.js
[healthpoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/healthPoliciesGetSample.js
[healthpolicieslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/healthPoliciesListByParentSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/operationsListSample.js
[profileprobinggatewayscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profileProbingGatewaysCreateOrUpdateSample.js
[profileprobinggatewaysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profileProbingGatewaysDeleteSample.js
[profileprobinggatewaysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profileProbingGatewaysGetSample.js
[profileprobinggatewayslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profileProbingGatewaysListByParentSample.js
[profileprobinggatewaysupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profileProbingGatewaysUpdateSample.js
[profilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profilesCreateOrUpdateSample.js
[profilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profilesDeleteSample.js
[profilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profilesGetSample.js
[profileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profilesListByResourceGroupSample.js
[profileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profilesListBySubscriptionSample.js
[profilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/profilesUpdateSample.js
[sitescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/sitesCreateOrUpdateSample.js
[sitesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/sitesDeleteSample.js
[sitesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/sitesGetSample.js
[siteslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/sitesListByParentSample.js
[sitesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/sitesUpdateSample.js
[topologymapscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/topologyMapsCreateOrUpdateSample.js
[topologymapsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/topologyMapsDeleteSample.js
[topologymapsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/topologyMapsGetSample.js
[topologymapslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/topologyMapsListByResourceGroupSample.js
[topologymapslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/topologyMapsListBySubscriptionSample.js
[topologymapsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/samples/v1-beta/javascript/topologyMapsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-privatetrafficmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/privatetrafficmanager/arm-privatetrafficmanager/README.md

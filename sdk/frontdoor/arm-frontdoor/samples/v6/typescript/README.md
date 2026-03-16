# @azure/arm-frontdoor client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-frontdoor in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsPurgeContentSample.ts][endpointspurgecontentsample]                                                   | removes a content from Front Door. x-ms-original-file: 2025-10-01/FrontdoorPurgeContent.json                                                                                     |
| [experimentsCreateOrUpdateSample.ts][experimentscreateorupdatesample]                                           | creates or updates an Experiment x-ms-original-file: 2025-10-01/NetworkExperimentCreateExperiment.json                                                                           |
| [experimentsDeleteSample.ts][experimentsdeletesample]                                                           | deletes an Experiment x-ms-original-file: 2025-10-01/NetworkExperimentDeleteExperiment.json                                                                                      |
| [experimentsGetSample.ts][experimentsgetsample]                                                                 | gets an Experiment by ExperimentName x-ms-original-file: 2025-10-01/NetworkExperimentGetExperiment.json                                                                          |
| [experimentsListByProfileSample.ts][experimentslistbyprofilesample]                                             | gets a list of Experiments x-ms-original-file: 2025-10-01/NetworkExperimentListExperiments.json                                                                                  |
| [experimentsUpdateSample.ts][experimentsupdatesample]                                                           | updates an Experiment x-ms-original-file: 2025-10-01/NetworkExperimentUpdateExperiment.json                                                                                      |
| [frontDoorNameAvailabilityCheckSample.ts][frontdoornameavailabilitychecksample]                                 | check the availability of a Front Door resource name. x-ms-original-file: 2025-10-01/CheckFrontdoorNameAvailability.json                                                         |
| [frontDoorNameAvailabilityWithSubscriptionCheckSample.ts][frontdoornameavailabilitywithsubscriptionchecksample] | check the availability of a Front Door subdomain. x-ms-original-file: 2025-10-01/CheckFrontdoorNameAvailabilityWithSubscription.json                                             |
| [frontDoorsCreateOrUpdateSample.ts][frontdoorscreateorupdatesample]                                             | creates a new Front Door with a Front Door name under the specified subscription and resource group. x-ms-original-file: 2025-10-01/FrontdoorCreate.json                         |
| [frontDoorsDeleteSample.ts][frontdoorsdeletesample]                                                             | deletes an existing Front Door with the specified parameters. x-ms-original-file: 2025-10-01/FrontdoorDelete.json                                                                |
| [frontDoorsGetSample.ts][frontdoorsgetsample]                                                                   | gets a Front Door with the specified Front Door name under the specified subscription and resource group. x-ms-original-file: 2025-10-01/FrontdoorGet.json                       |
| [frontDoorsListByResourceGroupSample.ts][frontdoorslistbyresourcegroupsample]                                   | lists all of the Front Doors within a resource group under a subscription. x-ms-original-file: 2025-10-01/FrontdoorList.json                                                     |
| [frontDoorsListSample.ts][frontdoorslistsample]                                                                 | lists all of the Front Doors within an Azure subscription. x-ms-original-file: 2025-10-01/FrontdoorListAll.json                                                                  |
| [frontDoorsValidateCustomDomainSample.ts][frontdoorsvalidatecustomdomainsample]                                 | validates the custom domain mapping to ensure it maps to the correct Front Door endpoint in DNS. x-ms-original-file: 2025-10-01/FrontdoorValidateCustomDomain.json               |
| [frontendEndpointsDisableHttpsSample.ts][frontendendpointsdisablehttpssample]                                   | disables a frontendEndpoint for HTTPS traffic x-ms-original-file: 2025-10-01/FrontdoorDisableHttps.json                                                                          |
| [frontendEndpointsEnableHttpsSample.ts][frontendendpointsenablehttpssample]                                     | enables a frontendEndpoint for HTTPS traffic x-ms-original-file: 2025-10-01/FrontdoorEnableHttps.json                                                                            |
| [frontendEndpointsGetSample.ts][frontendendpointsgetsample]                                                     | gets a Frontend endpoint with the specified name within the specified Front Door. x-ms-original-file: 2025-10-01/FrontdoorFrontendEndpointGet.json                               |
| [frontendEndpointsListByFrontDoorSample.ts][frontendendpointslistbyfrontdoorsample]                             | lists all of the frontend endpoints within a Front Door. x-ms-original-file: 2025-10-01/FrontdoorFrontendEndpointList.json                                                       |
| [managedRuleSetsListSample.ts][managedrulesetslistsample]                                                       | lists all available managed rule sets. x-ms-original-file: 2025-10-01/WafListManagedRuleSets.json                                                                                |
| [networkExperimentProfilesCreateOrUpdateSample.ts][networkexperimentprofilescreateorupdatesample]               | creates an NetworkExperiment Profile x-ms-original-file: 2025-10-01/NetworkExperimentCreateProfile.json                                                                          |
| [networkExperimentProfilesDeleteSample.ts][networkexperimentprofilesdeletesample]                               | deletes an NetworkExperiment Profile by ProfileName x-ms-original-file: 2025-10-01/NetworkExperimentDeleteProfile.json                                                           |
| [networkExperimentProfilesGetSample.ts][networkexperimentprofilesgetsample]                                     | gets an NetworkExperiment Profile by ProfileName x-ms-original-file: 2025-10-01/NetworkExperimentGetProfile.json                                                                 |
| [networkExperimentProfilesListByResourceGroupSample.ts][networkexperimentprofileslistbyresourcegroupsample]     | gets a list of Network Experiment Profiles within a resource group under a subscription x-ms-original-file: 2025-10-01/NetworkExperimentListByResourceGroupProfiles.json         |
| [networkExperimentProfilesListSample.ts][networkexperimentprofileslistsample]                                   | gets a list of Network Experiment Profiles under a subscription x-ms-original-file: 2025-10-01/NetworkExperimentListProfiles.json                                                |
| [networkExperimentProfilesUpdateSample.ts][networkexperimentprofilesupdatesample]                               | updates an NetworkExperimentProfiles x-ms-original-file: 2025-10-01/NetworkExperimentUpdateProfile.json                                                                          |
| [policiesCreateOrUpdateSample.ts][policiescreateorupdatesample]                                                 | create or update policy with specified rule set name within a resource group. x-ms-original-file: 2025-10-01/WafPolicyCreateOrUpdate.json                                        |
| [policiesDeleteSample.ts][policiesdeletesample]                                                                 | deletes Policy x-ms-original-file: 2025-10-01/WafPolicyDelete.json                                                                                                               |
| [policiesGetSample.ts][policiesgetsample]                                                                       | retrieve protection policy with specified name within a resource group. x-ms-original-file: 2025-10-01/WafPolicyGet.json                                                         |
| [policiesListBySubscriptionSample.ts][policieslistbysubscriptionsample]                                         | lists all of the protection policies within a subscription. x-ms-original-file: 2025-10-01/WafListPoliciesUnderSubscription.json                                                 |
| [policiesListSample.ts][policieslistsample]                                                                     | lists all of the protection policies within a resource group. x-ms-original-file: 2025-10-01/WafListPolicies.json                                                                |
| [policiesUpdateSample.ts][policiesupdatesample]                                                                 | patch a specific frontdoor webApplicationFirewall policy for tags update under the specified subscription and resource group. x-ms-original-file: 2025-10-01/WafPolicyPatch.json |
| [preconfiguredEndpointsListSample.ts][preconfiguredendpointslistsample]                                         | gets a list of Preconfigured Endpoints x-ms-original-file: 2025-10-01/NetworkExperimentGetPreconfiguredEndpoints.json                                                            |
| [reportsGetLatencyScorecardsSample.ts][reportsgetlatencyscorecardssample]                                       | gets a Latency Scorecard for a given Experiment x-ms-original-file: 2025-10-01/NetworkExperimentGetLatencyScorecard.json                                                         |
| [reportsGetTimeseriesSample.ts][reportsgettimeseriessample]                                                     | gets a Timeseries for a given Experiment x-ms-original-file: 2025-10-01/NetworkExperimentGetTimeseries.json                                                                      |
| [rulesEnginesCreateOrUpdateSample.ts][rulesenginescreateorupdatesample]                                         | creates a new Rules Engine Configuration with the specified name within the specified Front Door. x-ms-original-file: 2025-10-01/FrontdoorRulesEngineCreate.json                 |
| [rulesEnginesDeleteSample.ts][rulesenginesdeletesample]                                                         | deletes an existing Rules Engine Configuration with the specified parameters. x-ms-original-file: 2025-10-01/FrontdoorRulesEngineDelete.json                                     |
| [rulesEnginesGetSample.ts][rulesenginesgetsample]                                                               | gets a Rules Engine Configuration with the specified name within the specified Front Door. x-ms-original-file: 2025-10-01/FrontdoorRulesEngineGet.json                           |
| [rulesEnginesListByFrontDoorSample.ts][rulesengineslistbyfrontdoorsample]                                       | lists all of the Rules Engine Configurations within a Front Door. x-ms-original-file: 2025-10-01/FrontdoorRulesEngineList.json                                                   |

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
node dist/endpointsPurgeContentSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/endpointsPurgeContentSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointspurgecontentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/endpointsPurgeContentSample.ts
[experimentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/experimentsCreateOrUpdateSample.ts
[experimentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/experimentsDeleteSample.ts
[experimentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/experimentsGetSample.ts
[experimentslistbyprofilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/experimentsListByProfileSample.ts
[experimentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/experimentsUpdateSample.ts
[frontdoornameavailabilitychecksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontDoorNameAvailabilityCheckSample.ts
[frontdoornameavailabilitywithsubscriptionchecksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontDoorNameAvailabilityWithSubscriptionCheckSample.ts
[frontdoorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontDoorsCreateOrUpdateSample.ts
[frontdoorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontDoorsDeleteSample.ts
[frontdoorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontDoorsGetSample.ts
[frontdoorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontDoorsListByResourceGroupSample.ts
[frontdoorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontDoorsListSample.ts
[frontdoorsvalidatecustomdomainsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontDoorsValidateCustomDomainSample.ts
[frontendendpointsdisablehttpssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontendEndpointsDisableHttpsSample.ts
[frontendendpointsenablehttpssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontendEndpointsEnableHttpsSample.ts
[frontendendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontendEndpointsGetSample.ts
[frontendendpointslistbyfrontdoorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/frontendEndpointsListByFrontDoorSample.ts
[managedrulesetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/managedRuleSetsListSample.ts
[networkexperimentprofilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/networkExperimentProfilesCreateOrUpdateSample.ts
[networkexperimentprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/networkExperimentProfilesDeleteSample.ts
[networkexperimentprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/networkExperimentProfilesGetSample.ts
[networkexperimentprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/networkExperimentProfilesListByResourceGroupSample.ts
[networkexperimentprofileslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/networkExperimentProfilesListSample.ts
[networkexperimentprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/networkExperimentProfilesUpdateSample.ts
[policiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/policiesCreateOrUpdateSample.ts
[policiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/policiesDeleteSample.ts
[policiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/policiesGetSample.ts
[policieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/policiesListBySubscriptionSample.ts
[policieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/policiesListSample.ts
[policiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/policiesUpdateSample.ts
[preconfiguredendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/preconfiguredEndpointsListSample.ts
[reportsgetlatencyscorecardssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/reportsGetLatencyScorecardsSample.ts
[reportsgettimeseriessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/reportsGetTimeseriesSample.ts
[rulesenginescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/rulesEnginesCreateOrUpdateSample.ts
[rulesenginesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/rulesEnginesDeleteSample.ts
[rulesenginesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/rulesEnginesGetSample.ts
[rulesengineslistbyfrontdoorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6/typescript/src/rulesEnginesListByFrontDoorSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-frontdoor?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/frontdoor/arm-frontdoor/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

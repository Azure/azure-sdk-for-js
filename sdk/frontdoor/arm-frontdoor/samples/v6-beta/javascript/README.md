# @azure/arm-frontdoor client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-frontdoor in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsPurgeContentSample.js][endpointspurgecontentsample]                                                   | removes a content from Front Door. x-ms-original-file: 2025-11-01/FrontdoorPurgeContent.json                                                                                     |
| [experimentsCreateOrUpdateSample.js][experimentscreateorupdatesample]                                           | creates or updates an Experiment x-ms-original-file: 2025-11-01/NetworkExperimentCreateExperiment.json                                                                           |
| [experimentsDeleteSample.js][experimentsdeletesample]                                                           | deletes an Experiment x-ms-original-file: 2025-11-01/NetworkExperimentDeleteExperiment.json                                                                                      |
| [experimentsGetSample.js][experimentsgetsample]                                                                 | gets an Experiment by ExperimentName x-ms-original-file: 2025-11-01/NetworkExperimentGetExperiment.json                                                                          |
| [experimentsListByProfileSample.js][experimentslistbyprofilesample]                                             | gets a list of Experiments x-ms-original-file: 2025-11-01/NetworkExperimentListExperiments.json                                                                                  |
| [experimentsUpdateSample.js][experimentsupdatesample]                                                           | updates an Experiment x-ms-original-file: 2025-11-01/NetworkExperimentUpdateExperiment.json                                                                                      |
| [frontDoorNameAvailabilityCheckSample.js][frontdoornameavailabilitychecksample]                                 | check the availability of a Front Door resource name. x-ms-original-file: 2025-11-01/CheckFrontdoorNameAvailability.json                                                         |
| [frontDoorNameAvailabilityWithSubscriptionCheckSample.js][frontdoornameavailabilitywithsubscriptionchecksample] | check the availability of a Front Door subdomain. x-ms-original-file: 2025-11-01/CheckFrontdoorNameAvailabilityWithSubscription.json                                             |
| [frontDoorsCreateOrUpdateSample.js][frontdoorscreateorupdatesample]                                             | creates a new Front Door with a Front Door name under the specified subscription and resource group. x-ms-original-file: 2025-11-01/FrontdoorCreate.json                         |
| [frontDoorsDeleteSample.js][frontdoorsdeletesample]                                                             | deletes an existing Front Door with the specified parameters. x-ms-original-file: 2025-11-01/FrontdoorDelete.json                                                                |
| [frontDoorsGetSample.js][frontdoorsgetsample]                                                                   | gets a Front Door with the specified Front Door name under the specified subscription and resource group. x-ms-original-file: 2025-11-01/FrontdoorGet.json                       |
| [frontDoorsListByResourceGroupSample.js][frontdoorslistbyresourcegroupsample]                                   | lists all of the Front Doors within a resource group under a subscription. x-ms-original-file: 2025-11-01/FrontdoorList.json                                                     |
| [frontDoorsListSample.js][frontdoorslistsample]                                                                 | lists all of the Front Doors within an Azure subscription. x-ms-original-file: 2025-11-01/FrontdoorListAll.json                                                                  |
| [frontDoorsValidateCustomDomainSample.js][frontdoorsvalidatecustomdomainsample]                                 | validates the custom domain mapping to ensure it maps to the correct Front Door endpoint in DNS. x-ms-original-file: 2025-11-01/FrontdoorValidateCustomDomain.json               |
| [frontendEndpointsDisableHttpsSample.js][frontendendpointsdisablehttpssample]                                   | disables a frontendEndpoint for HTTPS traffic x-ms-original-file: 2025-11-01/FrontdoorDisableHttps.json                                                                          |
| [frontendEndpointsEnableHttpsSample.js][frontendendpointsenablehttpssample]                                     | enables a frontendEndpoint for HTTPS traffic x-ms-original-file: 2025-11-01/FrontdoorEnableHttps.json                                                                            |
| [frontendEndpointsGetSample.js][frontendendpointsgetsample]                                                     | gets a Frontend endpoint with the specified name within the specified Front Door. x-ms-original-file: 2025-11-01/FrontdoorFrontendEndpointGet.json                               |
| [frontendEndpointsListByFrontDoorSample.js][frontendendpointslistbyfrontdoorsample]                             | lists all of the frontend endpoints within a Front Door. x-ms-original-file: 2025-11-01/FrontdoorFrontendEndpointList.json                                                       |
| [managedRuleSetsListSample.js][managedrulesetslistsample]                                                       | lists all available managed rule sets. x-ms-original-file: 2025-11-01/WafListManagedRuleSets.json                                                                                |
| [networkExperimentProfilesCreateOrUpdateSample.js][networkexperimentprofilescreateorupdatesample]               | creates an NetworkExperiment Profile x-ms-original-file: 2025-11-01/NetworkExperimentCreateProfile.json                                                                          |
| [networkExperimentProfilesDeleteSample.js][networkexperimentprofilesdeletesample]                               | deletes an NetworkExperiment Profile by ProfileName x-ms-original-file: 2025-11-01/NetworkExperimentDeleteProfile.json                                                           |
| [networkExperimentProfilesGetSample.js][networkexperimentprofilesgetsample]                                     | gets an NetworkExperiment Profile by ProfileName x-ms-original-file: 2025-11-01/NetworkExperimentGetProfile.json                                                                 |
| [networkExperimentProfilesListByResourceGroupSample.js][networkexperimentprofileslistbyresourcegroupsample]     | gets a list of Network Experiment Profiles within a resource group under a subscription x-ms-original-file: 2025-11-01/NetworkExperimentListByResourceGroupProfiles.json         |
| [networkExperimentProfilesListSample.js][networkexperimentprofileslistsample]                                   | gets a list of Network Experiment Profiles under a subscription x-ms-original-file: 2025-11-01/NetworkExperimentListProfiles.json                                                |
| [networkExperimentProfilesUpdateSample.js][networkexperimentprofilesupdatesample]                               | updates an NetworkExperimentProfiles x-ms-original-file: 2025-11-01/NetworkExperimentUpdateProfile.json                                                                          |
| [policiesCreateOrUpdateSample.js][policiescreateorupdatesample]                                                 | create or update policy with specified rule set name within a resource group. x-ms-original-file: 2025-11-01/WafPolicyCreateOrUpdate.json                                        |
| [policiesDeleteSample.js][policiesdeletesample]                                                                 | deletes Policy x-ms-original-file: 2025-11-01/WafPolicyDelete.json                                                                                                               |
| [policiesGetSample.js][policiesgetsample]                                                                       | retrieve protection policy with specified name within a resource group. x-ms-original-file: 2025-11-01/WafPolicyGet.json                                                         |
| [policiesListBySubscriptionSample.js][policieslistbysubscriptionsample]                                         | lists all of the protection policies within a subscription. x-ms-original-file: 2025-11-01/WafListPoliciesUnderSubscription.json                                                 |
| [policiesListSample.js][policieslistsample]                                                                     | lists all of the protection policies within a resource group. x-ms-original-file: 2025-11-01/WafListPolicies.json                                                                |
| [policiesUpdateSample.js][policiesupdatesample]                                                                 | patch a specific frontdoor webApplicationFirewall policy for tags update under the specified subscription and resource group. x-ms-original-file: 2025-11-01/WafPolicyPatch.json |
| [preconfiguredEndpointsListSample.js][preconfiguredendpointslistsample]                                         | gets a list of Preconfigured Endpoints x-ms-original-file: 2025-11-01/NetworkExperimentGetPreconfiguredEndpoints.json                                                            |
| [reportsGetLatencyScorecardsSample.js][reportsgetlatencyscorecardssample]                                       | gets a Latency Scorecard for a given Experiment x-ms-original-file: 2025-11-01/NetworkExperimentGetLatencyScorecard.json                                                         |
| [reportsGetTimeseriesSample.js][reportsgettimeseriessample]                                                     | gets a Timeseries for a given Experiment x-ms-original-file: 2025-11-01/NetworkExperimentGetTimeseries.json                                                                      |
| [rulesEnginesCreateOrUpdateSample.js][rulesenginescreateorupdatesample]                                         | creates a new Rules Engine Configuration with the specified name within the specified Front Door. x-ms-original-file: 2025-11-01/FrontdoorRulesEngineCreate.json                 |
| [rulesEnginesDeleteSample.js][rulesenginesdeletesample]                                                         | deletes an existing Rules Engine Configuration with the specified parameters. x-ms-original-file: 2025-11-01/FrontdoorRulesEngineDelete.json                                     |
| [rulesEnginesGetSample.js][rulesenginesgetsample]                                                               | gets a Rules Engine Configuration with the specified name within the specified Front Door. x-ms-original-file: 2025-11-01/FrontdoorRulesEngineGet.json                           |
| [rulesEnginesListByFrontDoorSample.js][rulesengineslistbyfrontdoorsample]                                       | lists all of the Rules Engine Configurations within a Front Door. x-ms-original-file: 2025-11-01/FrontdoorRulesEngineList.json                                                   |

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
node endpointsPurgeContentSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node endpointsPurgeContentSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointspurgecontentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/endpointsPurgeContentSample.js
[experimentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/experimentsCreateOrUpdateSample.js
[experimentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/experimentsDeleteSample.js
[experimentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/experimentsGetSample.js
[experimentslistbyprofilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/experimentsListByProfileSample.js
[experimentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/experimentsUpdateSample.js
[frontdoornameavailabilitychecksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontDoorNameAvailabilityCheckSample.js
[frontdoornameavailabilitywithsubscriptionchecksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontDoorNameAvailabilityWithSubscriptionCheckSample.js
[frontdoorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontDoorsCreateOrUpdateSample.js
[frontdoorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontDoorsDeleteSample.js
[frontdoorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontDoorsGetSample.js
[frontdoorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontDoorsListByResourceGroupSample.js
[frontdoorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontDoorsListSample.js
[frontdoorsvalidatecustomdomainsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontDoorsValidateCustomDomainSample.js
[frontendendpointsdisablehttpssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontendEndpointsDisableHttpsSample.js
[frontendendpointsenablehttpssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontendEndpointsEnableHttpsSample.js
[frontendendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontendEndpointsGetSample.js
[frontendendpointslistbyfrontdoorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/frontendEndpointsListByFrontDoorSample.js
[managedrulesetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/managedRuleSetsListSample.js
[networkexperimentprofilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/networkExperimentProfilesCreateOrUpdateSample.js
[networkexperimentprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/networkExperimentProfilesDeleteSample.js
[networkexperimentprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/networkExperimentProfilesGetSample.js
[networkexperimentprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/networkExperimentProfilesListByResourceGroupSample.js
[networkexperimentprofileslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/networkExperimentProfilesListSample.js
[networkexperimentprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/networkExperimentProfilesUpdateSample.js
[policiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/policiesCreateOrUpdateSample.js
[policiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/policiesDeleteSample.js
[policiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/policiesGetSample.js
[policieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/policiesListBySubscriptionSample.js
[policieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/policiesListSample.js
[policiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/policiesUpdateSample.js
[preconfiguredendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/preconfiguredEndpointsListSample.js
[reportsgetlatencyscorecardssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/reportsGetLatencyScorecardsSample.js
[reportsgettimeseriessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/reportsGetTimeseriesSample.js
[rulesenginescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/rulesEnginesCreateOrUpdateSample.js
[rulesenginesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/rulesEnginesDeleteSample.js
[rulesenginesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/rulesEnginesGetSample.js
[rulesengineslistbyfrontdoorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v6-beta/javascript/rulesEnginesListByFrontDoorSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-frontdoor?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/frontdoor/arm-frontdoor/README.md

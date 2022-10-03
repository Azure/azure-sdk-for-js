# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsPurgeContentSample.ts][endpointspurgecontentsample]                                                   | Removes a content from Front Door. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorPurgeContent.json                                                                       |
| [experimentsCreateOrUpdateSample.ts][experimentscreateorupdatesample]                                           | Creates or updates an Experiment x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentCreateExperiment.json                                                             |
| [experimentsDeleteSample.ts][experimentsdeletesample]                                                           | Deletes an Experiment x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentDeleteExperiment.json                                                                        |
| [experimentsGetSample.ts][experimentsgetsample]                                                                 | Gets an Experiment by ExperimentName x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentGetExperiment.json                                                            |
| [experimentsListByProfileSample.ts][experimentslistbyprofilesample]                                             | Gets a list of Experiments x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentListExperiments.json                                                                    |
| [experimentsUpdateSample.ts][experimentsupdatesample]                                                           | Updates an Experiment x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentUpdateExperiment.json                                                                        |
| [frontDoorNameAvailabilityCheckSample.ts][frontdoornameavailabilitychecksample]                                 | Check the availability of a Front Door resource name. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/CheckFrontdoorNameAvailability.json                                           |
| [frontDoorNameAvailabilityWithSubscriptionCheckSample.ts][frontdoornameavailabilitywithsubscriptionchecksample] | Check the availability of a Front Door subdomain. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/CheckFrontdoorNameAvailabilityWithSubscription.json                               |
| [frontDoorsCreateOrUpdateSample.ts][frontdoorscreateorupdatesample]                                             | Creates a new Front Door with a Front Door name under the specified subscription and resource group. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorCreate.json           |
| [frontDoorsDeleteSample.ts][frontdoorsdeletesample]                                                             | Deletes an existing Front Door with the specified parameters. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorDelete.json                                                  |
| [frontDoorsGetSample.ts][frontdoorsgetsample]                                                                   | Gets a Front Door with the specified Front Door name under the specified subscription and resource group. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorGet.json         |
| [frontDoorsListByResourceGroupSample.ts][frontdoorslistbyresourcegroupsample]                                   | Lists all of the Front Doors within a resource group under a subscription. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorList.json                                       |
| [frontDoorsListSample.ts][frontdoorslistsample]                                                                 | Lists all of the Front Doors within an Azure subscription. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorListAll.json                                                    |
| [frontDoorsValidateCustomDomainSample.ts][frontdoorsvalidatecustomdomainsample]                                 | Validates the custom domain mapping to ensure it maps to the correct Front Door endpoint in DNS. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorValidateCustomDomain.json |
| [frontendEndpointsDisableHttpsSample.ts][frontendendpointsdisablehttpssample]                                   | Disables a frontendEndpoint for HTTPS traffic x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorDisableHttps.json                                                            |
| [frontendEndpointsEnableHttpsSample.ts][frontendendpointsenablehttpssample]                                     | Enables a frontendEndpoint for HTTPS traffic x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorEnableHttps.json                                                              |
| [frontendEndpointsGetSample.ts][frontendendpointsgetsample]                                                     | Gets a Frontend endpoint with the specified name within the specified Front Door. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorFrontendEndpointGet.json                 |
| [frontendEndpointsListByFrontDoorSample.ts][frontendendpointslistbyfrontdoorsample]                             | Lists all of the frontend endpoints within a Front Door. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorFrontendEndpointList.json                                         |
| [managedRuleSetsListSample.ts][managedrulesetslistsample]                                                       | Lists all available managed rule sets. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-11-01/examples/WafListManagedRuleSets.json                                                                  |
| [networkExperimentProfilesCreateOrUpdateSample.ts][networkexperimentprofilescreateorupdatesample]               | Creates an NetworkExperiment Profile x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentCreateProfile.json                                                            |
| [networkExperimentProfilesDeleteSample.ts][networkexperimentprofilesdeletesample]                               | Deletes an NetworkExperiment Profile by ProfileName x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentDeleteProfile.json                                             |
| [networkExperimentProfilesGetSample.ts][networkexperimentprofilesgetsample]                                     | Gets an NetworkExperiment Profile by ProfileName x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentGetProfile.json                                                   |
| [networkExperimentProfilesListByResourceGroupSample.ts][networkexperimentprofileslistbyresourcegroupsample]     | Gets a list of Network Experiment Profiles within a resource group under a subscription x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentListProfiles.json          |
| [networkExperimentProfilesListSample.ts][networkexperimentprofileslistsample]                                   | Gets a list of Network Experiment Profiles under a subscription x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentListProfiles.json                                  |
| [networkExperimentProfilesUpdateSample.ts][networkexperimentprofilesupdatesample]                               | Updates an NetworkExperimentProfiles x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentUpdateProfile.json                                                            |
| [policiesCreateOrUpdateSample.ts][policiescreateorupdatesample]                                                 | Create or update policy with specified rule set name within a resource group. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-11-01/examples/WafPolicyCreateOrUpdate.json                          |
| [policiesDeleteSample.ts][policiesdeletesample]                                                                 | Deletes Policy x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-11-01/examples/WafPolicyDelete.json                                                                                                 |
| [policiesGetSample.ts][policiesgetsample]                                                                       | Retrieve protection policy with specified name within a resource group. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-11-01/examples/WafPolicyGet.json                                           |
| [policiesListSample.ts][policieslistsample]                                                                     | Lists all of the protection policies within a resource group. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-11-01/examples/WafListPolicies.json                                                  |
| [preconfiguredEndpointsListSample.ts][preconfiguredendpointslistsample]                                         | Gets a list of Preconfigured Endpoints x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentGetPreconfiguredEndpoints.json                                              |
| [reportsGetLatencyScorecardsSample.ts][reportsgetlatencyscorecardssample]                                       | Gets a Latency Scorecard for a given Experiment x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentGetLatencyScorecard.json                                           |
| [reportsGetTimeseriesSample.ts][reportsgettimeseriessample]                                                     | Gets a Timeseries for a given Experiment x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentGetTimeseries.json                                                        |
| [rulesEnginesCreateOrUpdateSample.ts][rulesenginescreateorupdatesample]                                         | Creates a new Rules Engine Configuration with the specified name within the specified Front Door. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorRulesEngineCreate.json   |
| [rulesEnginesDeleteSample.ts][rulesenginesdeletesample]                                                         | Deletes an existing Rules Engine Configuration with the specified parameters. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorRulesEngineDelete.json                       |
| [rulesEnginesGetSample.ts][rulesenginesgetsample]                                                               | Gets a Rules Engine Configuration with the specified name within the specified Front Door. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorRulesEngineGet.json             |
| [rulesEnginesListByFrontDoorSample.ts][rulesengineslistbyfrontdoorsample]                                       | Lists all of the Rules Engine Configurations within a Front Door. x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2020-05-01/examples/FrontdoorRulesEngineList.json                                     |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/endpointsPurgeContentSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointspurgecontentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/endpointsPurgeContentSample.ts
[experimentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/experimentsCreateOrUpdateSample.ts
[experimentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/experimentsDeleteSample.ts
[experimentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/experimentsGetSample.ts
[experimentslistbyprofilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/experimentsListByProfileSample.ts
[experimentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/experimentsUpdateSample.ts
[frontdoornameavailabilitychecksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontDoorNameAvailabilityCheckSample.ts
[frontdoornameavailabilitywithsubscriptionchecksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontDoorNameAvailabilityWithSubscriptionCheckSample.ts
[frontdoorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontDoorsCreateOrUpdateSample.ts
[frontdoorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontDoorsDeleteSample.ts
[frontdoorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontDoorsGetSample.ts
[frontdoorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontDoorsListByResourceGroupSample.ts
[frontdoorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontDoorsListSample.ts
[frontdoorsvalidatecustomdomainsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontDoorsValidateCustomDomainSample.ts
[frontendendpointsdisablehttpssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontendEndpointsDisableHttpsSample.ts
[frontendendpointsenablehttpssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontendEndpointsEnableHttpsSample.ts
[frontendendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontendEndpointsGetSample.ts
[frontendendpointslistbyfrontdoorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/frontendEndpointsListByFrontDoorSample.ts
[managedrulesetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/managedRuleSetsListSample.ts
[networkexperimentprofilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/networkExperimentProfilesCreateOrUpdateSample.ts
[networkexperimentprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/networkExperimentProfilesDeleteSample.ts
[networkexperimentprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/networkExperimentProfilesGetSample.ts
[networkexperimentprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/networkExperimentProfilesListByResourceGroupSample.ts
[networkexperimentprofileslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/networkExperimentProfilesListSample.ts
[networkexperimentprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/networkExperimentProfilesUpdateSample.ts
[policiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/policiesCreateOrUpdateSample.ts
[policiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/policiesDeleteSample.ts
[policiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/policiesGetSample.ts
[policieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/policiesListSample.ts
[preconfiguredendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/preconfiguredEndpointsListSample.ts
[reportsgetlatencyscorecardssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/reportsGetLatencyScorecardsSample.ts
[reportsgettimeseriessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/reportsGetTimeseriesSample.ts
[rulesenginescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/rulesEnginesCreateOrUpdateSample.ts
[rulesenginesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/rulesEnginesDeleteSample.ts
[rulesenginesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/rulesEnginesGetSample.ts
[rulesengineslistbyfrontdoorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/frontdoor/arm-frontdoor/samples/v5/typescript/src/rulesEnginesListByFrontDoorSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-frontdoor?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/frontdoor/arm-frontdoor/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

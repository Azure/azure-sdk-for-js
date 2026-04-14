# @azure/arm-trafficmanager client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-trafficmanager in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsCreateOrUpdateSample.js][endpointscreateorupdatesample]                                                               | create or update a Traffic Manager endpoint. x-ms-original-file: 2024-04-01-preview/Endpoint-PUT-External-WithAlwaysServe.json                                   |
| [endpointsDeleteSample.js][endpointsdeletesample]                                                                               | deletes a Traffic Manager endpoint. x-ms-original-file: 2024-04-01-preview/Endpoint-DELETE-External.json                                                         |
| [endpointsGetSample.js][endpointsgetsample]                                                                                     | gets a Traffic Manager endpoint. x-ms-original-file: 2024-04-01-preview/Endpoint-GET-External-WithGeoMapping.json                                                |
| [endpointsUpdateV2Sample.js][endpointsupdatev2sample]                                                                           | update a Traffic Manager endpoint. x-ms-original-file: 2024-04-01-preview/Endpoint-PATCH-External-Target.json                                                    |
| [geographicHierarchiesGetDefaultSample.js][geographichierarchiesgetdefaultsample]                                               | gets the default Geographic Hierarchy used by the Geographic traffic routing method. x-ms-original-file: 2024-04-01-preview/GeographicHierarchy-GET-default.json |
| [heatMapGetSample.js][heatmapgetsample]                                                                                         | gets latest heatmap for Traffic Manager profile. x-ms-original-file: 2024-04-01-preview/HeatMap-GET-With-Null-Values.json                                        |
| [profilesCheckTrafficManagerNameAvailabilityV2Sample.js][profileschecktrafficmanagernameavailabilityv2sample]                   | checks the availability of a Traffic Manager Relative DNS name. x-ms-original-file: 2024-04-01-preview/NameAvailabilityV2Test_NameAvailable-POST-example-21.json |
| [profilesCheckTrafficManagerRelativeDnsNameAvailabilitySample.js][profileschecktrafficmanagerrelativednsnameavailabilitysample] | checks the availability of a Traffic Manager Relative DNS name. x-ms-original-file: 2024-04-01-preview/NameAvailabilityTest_NameAvailable-POST-example-21.json   |
| [profilesCreateOrUpdateSample.js][profilescreateorupdatesample]                                                                 | create or update a Traffic Manager profile. x-ms-original-file: 2024-04-01-preview/Profile-PUT-MultiValue.json                                                   |
| [profilesDeleteSample.js][profilesdeletesample]                                                                                 | deletes a Traffic Manager profile. x-ms-original-file: 2024-04-01-preview/Profile-DELETE.json                                                                    |
| [profilesGetSample.js][profilesgetsample]                                                                                       | gets a Traffic Manager profile. x-ms-original-file: 2024-04-01-preview/Profile-GET-WithEndpoints.json                                                            |
| [profilesListByResourceGroupSample.js][profileslistbyresourcegroupsample]                                                       | lists all Traffic Manager profiles within a resource group. x-ms-original-file: 2024-04-01-preview/Profile-GET-ByResourceGroup.json                              |
| [profilesListBySubscriptionSample.js][profileslistbysubscriptionsample]                                                         | lists all Traffic Manager profiles within a subscription. x-ms-original-file: 2024-04-01-preview/Profile-GET-BySubscription.json                                 |
| [profilesUpdateV2Sample.js][profilesupdatev2sample]                                                                             | update a Traffic Manager profile. x-ms-original-file: 2024-04-01-preview/Profile-PATCH-MonitorConfig.json                                                        |
| [trafficManagerUserMetricsKeysCreateOrUpdateSample.js][trafficmanagerusermetricskeyscreateorupdatesample]                       | create or update a subscription-level key used for Real User Metrics collection. x-ms-original-file: 2024-04-01-preview/TrafficManagerUserMetricsKeys-PUT.json   |
| [trafficManagerUserMetricsKeysDeleteSample.js][trafficmanagerusermetricskeysdeletesample]                                       | delete a subscription-level key used for Real User Metrics collection. x-ms-original-file: 2024-04-01-preview/TrafficManagerUserMetricsKeys-DELETE.json          |
| [trafficManagerUserMetricsKeysGetSample.js][trafficmanagerusermetricskeysgetsample]                                             | get the subscription-level key used for Real User Metrics collection. x-ms-original-file: 2024-04-01-preview/TrafficManagerUserMetricsKeys-GET.json              |

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

[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/endpointsCreateOrUpdateSample.js
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/endpointsDeleteSample.js
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/endpointsGetSample.js
[endpointsupdatev2sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/endpointsUpdateV2Sample.js
[geographichierarchiesgetdefaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/geographicHierarchiesGetDefaultSample.js
[heatmapgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/heatMapGetSample.js
[profileschecktrafficmanagernameavailabilityv2sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/profilesCheckTrafficManagerNameAvailabilityV2Sample.js
[profileschecktrafficmanagerrelativednsnameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/profilesCheckTrafficManagerRelativeDnsNameAvailabilitySample.js
[profilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/profilesCreateOrUpdateSample.js
[profilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/profilesDeleteSample.js
[profilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/profilesGetSample.js
[profileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/profilesListByResourceGroupSample.js
[profileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/profilesListBySubscriptionSample.js
[profilesupdatev2sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/profilesUpdateV2Sample.js
[trafficmanagerusermetricskeyscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/trafficManagerUserMetricsKeysCreateOrUpdateSample.js
[trafficmanagerusermetricskeysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/trafficManagerUserMetricsKeysDeleteSample.js
[trafficmanagerusermetricskeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/javascript/trafficManagerUserMetricsKeysGetSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-trafficmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/trafficmanager/arm-trafficmanager/README.md

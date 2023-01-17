# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsCreateOrUpdateSample.js][endpointscreateorupdatesample]                                                               | Create or update a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/Endpoint-PUT-External-WithAlwaysServe.json                                   |
| [endpointsDeleteSample.js][endpointsdeletesample]                                                                               | Deletes a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/Endpoint-DELETE-External.json                                                         |
| [endpointsGetSample.js][endpointsgetsample]                                                                                     | Gets a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/Endpoint-GET-External-WithGeoMapping.json                                                |
| [endpointsUpdateSample.js][endpointsupdatesample]                                                                               | Update a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/Endpoint-PATCH-External-Target.json                                                    |
| [geographicHierarchiesGetDefaultSample.js][geographichierarchiesgetdefaultsample]                                               | Gets the default Geographic Hierarchy used by the Geographic traffic routing method. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/GeographicHierarchy-GET-default.json |
| [heatMapGetSample.js][heatmapgetsample]                                                                                         | Gets latest heatmap for Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/HeatMap-GET.json                                                         |
| [profilesCheckTrafficManagerRelativeDnsNameAvailabilitySample.js][profileschecktrafficmanagerrelativednsnameavailabilitysample] | Checks the availability of a Traffic Manager Relative DNS name. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/NameAvailabilityTest_NameAvailable-POST-example-21.json   |
| [profilesCreateOrUpdateSample.js][profilescreateorupdatesample]                                                                 | Create or update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/Profile-PUT-MultiValue.json                                                   |
| [profilesDeleteSample.js][profilesdeletesample]                                                                                 | Deletes a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/Profile-DELETE.json                                                                    |
| [profilesGetSample.js][profilesgetsample]                                                                                       | Gets a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/Profile-GET-WithEndpoints.json                                                            |
| [profilesListByResourceGroupSample.js][profileslistbyresourcegroupsample]                                                       | Lists all Traffic Manager profiles within a resource group. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/Profile-GET-ByResourceGroup.json                              |
| [profilesListBySubscriptionSample.js][profileslistbysubscriptionsample]                                                         | Lists all Traffic Manager profiles within a subscription. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/Profile-GET-BySubscription.json                                 |
| [profilesUpdateSample.js][profilesupdatesample]                                                                                 | Update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/Profile-PATCH-MonitorConfig.json                                                        |
| [trafficManagerUserMetricsKeysCreateOrUpdateSample.js][trafficmanagerusermetricskeyscreateorupdatesample]                       | Create or update a subscription-level key used for Real User Metrics collection. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/TrafficManagerUserMetricsKeys-PUT.json   |
| [trafficManagerUserMetricsKeysDeleteSample.js][trafficmanagerusermetricskeysdeletesample]                                       | Delete a subscription-level key used for Real User Metrics collection. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/TrafficManagerUserMetricsKeys-DELETE.json          |
| [trafficManagerUserMetricsKeysGetSample.js][trafficmanagerusermetricskeysgetsample]                                             | Get the subscription-level key used for Real User Metrics collection. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/preview/2022-04-01-preview/examples/TrafficManagerUserMetricsKeys-GET.json              |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node endpointsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/endpointsCreateOrUpdateSample.js
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/endpointsDeleteSample.js
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/endpointsGetSample.js
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/endpointsUpdateSample.js
[geographichierarchiesgetdefaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/geographicHierarchiesGetDefaultSample.js
[heatmapgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/heatMapGetSample.js
[profileschecktrafficmanagerrelativednsnameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/profilesCheckTrafficManagerRelativeDnsNameAvailabilitySample.js
[profilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/profilesCreateOrUpdateSample.js
[profilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/profilesDeleteSample.js
[profilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/profilesGetSample.js
[profileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/profilesListByResourceGroupSample.js
[profileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/profilesListBySubscriptionSample.js
[profilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/profilesUpdateSample.js
[trafficmanagerusermetricskeyscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/trafficManagerUserMetricsKeysCreateOrUpdateSample.js
[trafficmanagerusermetricskeysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/trafficManagerUserMetricsKeysDeleteSample.js
[trafficmanagerusermetricskeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6-beta/javascript/trafficManagerUserMetricsKeysGetSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-trafficmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/trafficmanager/arm-trafficmanager/README.md

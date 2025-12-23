# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsCreateOrUpdateSample.ts][endpointscreateorupdatesample]                                                               | Create or update a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Endpoint-PUT-External-WithAlwaysServe.json                                   |
| [endpointsDeleteSample.ts][endpointsdeletesample]                                                                               | Deletes a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Endpoint-DELETE-External.json                                                         |
| [endpointsGetSample.ts][endpointsgetsample]                                                                                     | Gets a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Endpoint-GET-External-WithGeoMapping.json                                                |
| [endpointsUpdateSample.ts][endpointsupdatesample]                                                                               | Update a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Endpoint-PATCH-External-Target.json                                                    |
| [geographicHierarchiesGetDefaultSample.ts][geographichierarchiesgetdefaultsample]                                               | Gets the default Geographic Hierarchy used by the Geographic traffic routing method. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/GeographicHierarchy-GET-default.json |
| [heatMapGetSample.ts][heatmapgetsample]                                                                                         | Gets latest heatmap for Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/HeatMap-GET.json                                                         |
| [profilesCheckTrafficManagerNameAvailabilityV2Sample.ts][profileschecktrafficmanagernameavailabilityv2sample]                   | Checks the availability of a Traffic Manager Relative DNS name. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/NameAvailabilityV2Test_NameAvailable-POST-example-21.json |
| [profilesCheckTrafficManagerRelativeDnsNameAvailabilitySample.ts][profileschecktrafficmanagerrelativednsnameavailabilitysample] | Checks the availability of a Traffic Manager Relative DNS name. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/NameAvailabilityTest_NameAvailable-POST-example-21.json   |
| [profilesCreateOrUpdateSample.ts][profilescreateorupdatesample]                                                                 | Create or update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Profile-PUT-MultiValue.json                                                   |
| [profilesDeleteSample.ts][profilesdeletesample]                                                                                 | Deletes a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Profile-DELETE.json                                                                    |
| [profilesGetSample.ts][profilesgetsample]                                                                                       | Gets a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Profile-GET-WithEndpoints.json                                                            |
| [profilesListByResourceGroupSample.ts][profileslistbyresourcegroupsample]                                                       | Lists all Traffic Manager profiles within a resource group. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Profile-GET-ByResourceGroup.json                              |
| [profilesListBySubscriptionSample.ts][profileslistbysubscriptionsample]                                                         | Lists all Traffic Manager profiles within a subscription. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Profile-GET-BySubscription.json                                 |
| [profilesUpdateSample.ts][profilesupdatesample]                                                                                 | Update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Profile-PATCH-MonitorConfig.json                                                        |
| [trafficManagerUserMetricsKeysCreateOrUpdateSample.ts][trafficmanagerusermetricskeyscreateorupdatesample]                       | Create or update a subscription-level key used for Real User Metrics collection. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/TrafficManagerUserMetricsKeys-PUT.json   |
| [trafficManagerUserMetricsKeysDeleteSample.ts][trafficmanagerusermetricskeysdeletesample]                                       | Delete a subscription-level key used for Real User Metrics collection. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/TrafficManagerUserMetricsKeys-DELETE.json          |
| [trafficManagerUserMetricsKeysGetSample.ts][trafficmanagerusermetricskeysgetsample]                                             | Get the subscription-level key used for Real User Metrics collection. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/TrafficManagerUserMetricsKeys-GET.json              |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env TRAFFICMANAGER_SUBSCRIPTION_ID="<trafficmanager subscription id>" TRAFFICMANAGER_RESOURCE_GROUP="<trafficmanager resource group>" node dist/endpointsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointsCreateOrUpdateSample.ts
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointsDeleteSample.ts
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointsGetSample.ts
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointsUpdateSample.ts
[geographichierarchiesgetdefaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/geographicHierarchiesGetDefaultSample.ts
[heatmapgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/heatMapGetSample.ts
[profileschecktrafficmanagernameavailabilityv2sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilesCheckTrafficManagerNameAvailabilityV2Sample.ts
[profileschecktrafficmanagerrelativednsnameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilesCheckTrafficManagerRelativeDnsNameAvailabilitySample.ts
[profilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilesCreateOrUpdateSample.ts
[profilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilesDeleteSample.ts
[profilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilesGetSample.ts
[profileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilesListByResourceGroupSample.ts
[profileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilesListBySubscriptionSample.ts
[profilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilesUpdateSample.ts
[trafficmanagerusermetricskeyscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/trafficManagerUserMetricsKeysCreateOrUpdateSample.ts
[trafficmanagerusermetricskeysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/trafficManagerUserMetricsKeysDeleteSample.ts
[trafficmanagerusermetricskeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/trafficManagerUserMetricsKeysGetSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-trafficmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/trafficmanager/arm-trafficmanager/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

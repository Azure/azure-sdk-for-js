# @azure/arm-trafficmanager client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-trafficmanager in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsCreateOrUpdateSample.ts][endpointscreateorupdatesample]                                                               | create or update a Traffic Manager endpoint. x-ms-original-file: 2024-04-01-preview/Endpoint-PUT-External-WithAlwaysServe.json                                   |
| [endpointsDeleteSample.ts][endpointsdeletesample]                                                                               | deletes a Traffic Manager endpoint. x-ms-original-file: 2024-04-01-preview/Endpoint-DELETE-External.json                                                         |
| [endpointsGetSample.ts][endpointsgetsample]                                                                                     | gets a Traffic Manager endpoint. x-ms-original-file: 2024-04-01-preview/Endpoint-GET-External-WithGeoMapping.json                                                |
| [endpointsUpdateV2Sample.ts][endpointsupdatev2sample]                                                                           | update a Traffic Manager endpoint. x-ms-original-file: 2024-04-01-preview/Endpoint-PATCH-External-Target.json                                                    |
| [geographicHierarchiesGetDefaultSample.ts][geographichierarchiesgetdefaultsample]                                               | gets the default Geographic Hierarchy used by the Geographic traffic routing method. x-ms-original-file: 2024-04-01-preview/GeographicHierarchy-GET-default.json |
| [heatMapGetSample.ts][heatmapgetsample]                                                                                         | gets latest heatmap for Traffic Manager profile. x-ms-original-file: 2024-04-01-preview/HeatMap-GET-With-Null-Values.json                                        |
| [profilesCheckTrafficManagerNameAvailabilityV2Sample.ts][profileschecktrafficmanagernameavailabilityv2sample]                   | checks the availability of a Traffic Manager Relative DNS name. x-ms-original-file: 2024-04-01-preview/NameAvailabilityV2Test_NameAvailable-POST-example-21.json |
| [profilesCheckTrafficManagerRelativeDnsNameAvailabilitySample.ts][profileschecktrafficmanagerrelativednsnameavailabilitysample] | checks the availability of a Traffic Manager Relative DNS name. x-ms-original-file: 2024-04-01-preview/NameAvailabilityTest_NameAvailable-POST-example-21.json   |
| [profilesCreateOrUpdateSample.ts][profilescreateorupdatesample]                                                                 | create or update a Traffic Manager profile. x-ms-original-file: 2024-04-01-preview/Profile-PUT-MultiValue.json                                                   |
| [profilesDeleteSample.ts][profilesdeletesample]                                                                                 | deletes a Traffic Manager profile. x-ms-original-file: 2024-04-01-preview/Profile-DELETE.json                                                                    |
| [profilesGetSample.ts][profilesgetsample]                                                                                       | gets a Traffic Manager profile. x-ms-original-file: 2024-04-01-preview/Profile-GET-WithEndpoints.json                                                            |
| [profilesListByResourceGroupSample.ts][profileslistbyresourcegroupsample]                                                       | lists all Traffic Manager profiles within a resource group. x-ms-original-file: 2024-04-01-preview/Profile-GET-ByResourceGroup.json                              |
| [profilesListBySubscriptionSample.ts][profileslistbysubscriptionsample]                                                         | lists all Traffic Manager profiles within a subscription. x-ms-original-file: 2024-04-01-preview/Profile-GET-BySubscription.json                                 |
| [profilesUpdateV2Sample.ts][profilesupdatev2sample]                                                                             | update a Traffic Manager profile. x-ms-original-file: 2024-04-01-preview/Profile-PATCH-MonitorConfig.json                                                        |
| [trafficManagerUserMetricsKeysCreateOrUpdateSample.ts][trafficmanagerusermetricskeyscreateorupdatesample]                       | create or update a subscription-level key used for Real User Metrics collection. x-ms-original-file: 2024-04-01-preview/TrafficManagerUserMetricsKeys-PUT.json   |
| [trafficManagerUserMetricsKeysDeleteSample.ts][trafficmanagerusermetricskeysdeletesample]                                       | delete a subscription-level key used for Real User Metrics collection. x-ms-original-file: 2024-04-01-preview/TrafficManagerUserMetricsKeys-DELETE.json          |
| [trafficManagerUserMetricsKeysGetSample.ts][trafficmanagerusermetricskeysgetsample]                                             | get the subscription-level key used for Real User Metrics collection. x-ms-original-file: 2024-04-01-preview/TrafficManagerUserMetricsKeys-GET.json              |

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

[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/endpointsCreateOrUpdateSample.ts
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/endpointsDeleteSample.ts
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/endpointsGetSample.ts
[endpointsupdatev2sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/endpointsUpdateV2Sample.ts
[geographichierarchiesgetdefaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/geographicHierarchiesGetDefaultSample.ts
[heatmapgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/heatMapGetSample.ts
[profileschecktrafficmanagernameavailabilityv2sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/profilesCheckTrafficManagerNameAvailabilityV2Sample.ts
[profileschecktrafficmanagerrelativednsnameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/profilesCheckTrafficManagerRelativeDnsNameAvailabilitySample.ts
[profilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/profilesCreateOrUpdateSample.ts
[profilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/profilesDeleteSample.ts
[profilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/profilesGetSample.ts
[profileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/profilesListByResourceGroupSample.ts
[profileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/profilesListBySubscriptionSample.ts
[profilesupdatev2sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/profilesUpdateV2Sample.ts
[trafficmanagerusermetricskeyscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/trafficManagerUserMetricsKeysCreateOrUpdateSample.ts
[trafficmanagerusermetricskeysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/trafficManagerUserMetricsKeysDeleteSample.ts
[trafficmanagerusermetricskeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v7-beta/typescript/src/trafficManagerUserMetricsKeysGetSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-trafficmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/trafficmanager/arm-trafficmanager/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointDeleteExternal.ts][endpointdeleteexternal]                                         | Deletes a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Endpoint-DELETE-External.json                                                          |
| [endpointGetExternalWithGeoMapping.ts][endpointgetexternalwithgeomapping]                   | Gets a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Endpoint-GET-External-WithGeoMapping.json                                                 |
| [endpointGetExternalWithLocation.ts][endpointgetexternalwithlocation]                       | Gets a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Endpoint-GET-External-WithLocation.json                                                   |
| [endpointGetExternalWithSubnetMapping.ts][endpointgetexternalwithsubnetmapping]             | Gets a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Endpoint-GET-External-WithSubnetMapping.json                                              |
| [endpointPatchExternalTarget.ts][endpointpatchexternaltarget]                               | Update a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Endpoint-PATCH-External-Target.json                                                     |
| [endpointPutExternalWithCustomHeaders.ts][endpointputexternalwithcustomheaders]             | Create or update a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Endpoint-PUT-External-WithCustomHeaders.json                                  |
| [endpointPutExternalWithGeoMapping.ts][endpointputexternalwithgeomapping]                   | Create or update a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Endpoint-PUT-External-WithGeoMapping.json                                     |
| [endpointPutExternalWithLocation.ts][endpointputexternalwithlocation]                       | Create or update a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Endpoint-PUT-External-WithLocation.json                                       |
| [endpointPutExternalWithSubnetMapping.ts][endpointputexternalwithsubnetmapping]             | Create or update a Traffic Manager endpoint. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Endpoint-PUT-External-WithSubnetMapping.json                                  |
| [geographicHierarchyGetDefault.ts][geographichierarchygetdefault]                           | Gets the default Geographic Hierarchy used by the Geographic traffic routing method. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/GeographicHierarchy-GET-default.json  |
| [heatMapGet.ts][heatmapget]                                                                 | Gets latest heatmap for Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/HeatMap-GET.json                                                          |
| [heatMapGetWithNullValues.ts][heatmapgetwithnullvalues]                                     | Gets latest heatmap for Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/HeatMap-GET-With-Null-Values.json                                         |
| [heatMapGetWithTopLeftBotRight.ts][heatmapgetwithtopleftbotright]                           | Gets latest heatmap for Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/HeatMap-GET-With-TopLeft-BotRight.json                                    |
| [listBySubscription.ts][listbysubscription]                                                 | Lists all Traffic Manager profiles within a subscription. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-GET-BySubscription.json                                  |
| [listProfilesByResourceGroup.ts][listprofilesbyresourcegroup]                               | Lists all Traffic Manager profiles within a resource group. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-GET-ByResourceGroup.json                               |
| [nameAvailabilityTestNameAvailablePost21.ts][nameavailabilitytestnameavailablepost21]       | Checks the availability of a Traffic Manager Relative DNS name. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/NameAvailabilityTest_NameAvailable-POST-example-21.json    |
| [nameAvailabilityTestNameNotAvailablePost23.ts][nameavailabilitytestnamenotavailablepost23] | Checks the availability of a Traffic Manager Relative DNS name. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/NameAvailabilityTest_NameNotAvailable-POST-example-23.json |
| [profileDelete.ts][profiledelete]                                                           | Deletes a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-DELETE.json                                                                     |
| [profileGetWithEndpoints.ts][profilegetwithendpoints]                                       | Gets a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-GET-WithEndpoints.json                                                             |
| [profileGetWithTrafficViewDisabled.ts][profilegetwithtrafficviewdisabled]                   | Gets a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-GET-WithTrafficViewDisabled.json                                                   |
| [profileGetWithTrafficViewEnabled.ts][profilegetwithtrafficviewenabled]                     | Gets a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-GET-WithTrafficViewEnabled.json                                                    |
| [profilePatchMonitorConfig.ts][profilepatchmonitorconfig]                                   | Update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-PATCH-MonitorConfig.json                                                         |
| [profilePutMultiValue.ts][profileputmultivalue]                                             | Create or update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-PUT-MultiValue.json                                                    |
| [profilePutNoEndpoints.ts][profileputnoendpoints]                                           | Create or update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-PUT-NoEndpoints.json                                                   |
| [profilePutWithAliasing.ts][profileputwithaliasing]                                         | Create or update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-PUT-WithAliasing.json                                                  |
| [profilePutWithCustomHeaders.ts][profileputwithcustomheaders]                               | Create or update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-PUT-WithCustomHeaders.json                                             |
| [profilePutWithEndpoints.ts][profileputwithendpoints]                                       | Create or update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-PUT-WithEndpoints.json                                                 |
| [profilePutWithNestedEndpoints.ts][profileputwithnestedendpoints]                           | Create or update a Traffic Manager profile. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/Profile-PUT-WithNestedEndpoints.json                                           |
| [trafficManagerUserMetricsKeysDelete.ts][trafficmanagerusermetricskeysdelete]               | Delete a subscription-level key used for Real User Metrics collection. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/TrafficManagerUserMetricsKeys-DELETE.json           |
| [trafficManagerUserMetricsKeysGet.ts][trafficmanagerusermetricskeysget]                     | Get the subscription-level key used for Real User Metrics collection. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/TrafficManagerUserMetricsKeys-GET.json               |
| [trafficManagerUserMetricsKeysPut.ts][trafficmanagerusermetricskeysput]                     | Create or update a subscription-level key used for Real User Metrics collection. x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2018-08-01/examples/TrafficManagerUserMetricsKeys-PUT.json    |

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
node dist/endpointDeleteExternal.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/endpointDeleteExternal.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointdeleteexternal]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointDeleteExternal.ts
[endpointgetexternalwithgeomapping]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointGetExternalWithGeoMapping.ts
[endpointgetexternalwithlocation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointGetExternalWithLocation.ts
[endpointgetexternalwithsubnetmapping]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointGetExternalWithSubnetMapping.ts
[endpointpatchexternaltarget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointPatchExternalTarget.ts
[endpointputexternalwithcustomheaders]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointPutExternalWithCustomHeaders.ts
[endpointputexternalwithgeomapping]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointPutExternalWithGeoMapping.ts
[endpointputexternalwithlocation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointPutExternalWithLocation.ts
[endpointputexternalwithsubnetmapping]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/endpointPutExternalWithSubnetMapping.ts
[geographichierarchygetdefault]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/geographicHierarchyGetDefault.ts
[heatmapget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/heatMapGet.ts
[heatmapgetwithnullvalues]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/heatMapGetWithNullValues.ts
[heatmapgetwithtopleftbotright]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/heatMapGetWithTopLeftBotRight.ts
[listbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/listBySubscription.ts
[listprofilesbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/listProfilesByResourceGroup.ts
[nameavailabilitytestnameavailablepost21]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/nameAvailabilityTestNameAvailablePost21.ts
[nameavailabilitytestnamenotavailablepost23]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/nameAvailabilityTestNameNotAvailablePost23.ts
[profiledelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profileDelete.ts
[profilegetwithendpoints]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profileGetWithEndpoints.ts
[profilegetwithtrafficviewdisabled]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profileGetWithTrafficViewDisabled.ts
[profilegetwithtrafficviewenabled]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profileGetWithTrafficViewEnabled.ts
[profilepatchmonitorconfig]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilePatchMonitorConfig.ts
[profileputmultivalue]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilePutMultiValue.ts
[profileputnoendpoints]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilePutNoEndpoints.ts
[profileputwithaliasing]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilePutWithAliasing.ts
[profileputwithcustomheaders]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilePutWithCustomHeaders.ts
[profileputwithendpoints]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilePutWithEndpoints.ts
[profileputwithnestedendpoints]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/profilePutWithNestedEndpoints.ts
[trafficmanagerusermetricskeysdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/trafficManagerUserMetricsKeysDelete.ts
[trafficmanagerusermetricskeysget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/trafficManagerUserMetricsKeysGet.ts
[trafficmanagerusermetricskeysput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/trafficmanager/arm-trafficmanager/samples/v6/typescript/src/trafficManagerUserMetricsKeysPut.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-trafficmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/trafficmanager/arm-trafficmanager/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

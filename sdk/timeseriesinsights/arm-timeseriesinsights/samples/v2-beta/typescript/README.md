# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessPoliciesCreateOrUpdateSample.ts][accesspoliciescreateorupdatesample]                               | Create or update an access policy in the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesCreate.json                                                                                     |
| [accessPoliciesDeleteSample.ts][accesspoliciesdeletesample]                                               | Deletes the access policy with the specified name in the specified subscription, resource group, and environment x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesDelete.json                                    |
| [accessPoliciesGetSample.ts][accesspoliciesgetsample]                                                     | Gets the access policy with the specified name in the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesGet.json                                                                           |
| [accessPoliciesListByEnvironmentSample.ts][accesspolicieslistbyenvironmentsample]                         | Lists all the available access policies associated with the environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesListByEnvironment.json                                                                 |
| [accessPoliciesUpdateSample.ts][accesspoliciesupdatesample]                                               | Updates the access policy with the specified name in the specified subscription, resource group, and environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesPatchRoles.json                               |
| [environmentsCreateOrUpdateSample.ts][environmentscreateorupdatesample]                                   | Create or update an environment in the specified subscription and resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsCreate.json                                                                     |
| [environmentsDeleteSample.ts][environmentsdeletesample]                                                   | Deletes the environment with the specified name in the specified subscription and resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsDelete.json                                                     |
| [environmentsGetSample.ts][environmentsgetsample]                                                         | Gets the environment with the specified name in the specified subscription and resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsGet.json                                                           |
| [environmentsListByResourceGroupSample.ts][environmentslistbyresourcegroupsample]                         | Lists all the available environments associated with the subscription and within the specified resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsListByResourceGroup.json                           |
| [environmentsListBySubscriptionSample.ts][environmentslistbysubscriptionsample]                           | Lists all the available environments within a subscription, irrespective of the resource groups. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsListBySubscription.json                                          |
| [environmentsUpdateSample.ts][environmentsupdatesample]                                                   | Updates the environment with the specified name in the specified subscription and resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsPatchTags.json                                                  |
| [eventSourcesCreateOrUpdateSample.ts][eventsourcescreateorupdatesample]                                   | Create or update an event source under the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesCreateEventHub.json                                                                             |
| [eventSourcesDeleteSample.ts][eventsourcesdeletesample]                                                   | Deletes the event source with the specified name in the specified subscription, resource group, and environment x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesDelete.json                                       |
| [eventSourcesGetSample.ts][eventsourcesgetsample]                                                         | Gets the event source with the specified name in the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesGetEventHub.json                                                                      |
| [eventSourcesListByEnvironmentSample.ts][eventsourceslistbyenvironmentsample]                             | Lists all the available event sources associated with the subscription and within the specified resource group and environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesListByEnvironment.json            |
| [eventSourcesUpdateSample.ts][eventsourcesupdatesample]                                                   | Updates the event source with the specified name in the specified subscription, resource group, and environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesPatchTags.json                                   |
| [operationsListSample.ts][operationslistsample]                                                           | Lists all of the available Time Series Insights related operations. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/Operation_List.json                                                                                       |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]       | Updates a Private Endpoint connection of the environment in the given resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateEndpointConnectionUpdate.json                                                    |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                       | Disconnects the private endpoint connection and deletes it from the environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateEndpointConnectionDelete.json                                                         |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                             | Gets the details of the private endpoint connection of the environment in the given resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateEndpointConnectionGet.json                                         |
| [privateEndpointConnectionsListByEnvironmentSample.ts][privateendpointconnectionslistbyenvironmentsample] | Gets a list of all private endpoint connections in the given environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateEndpointConnectionsListByEnvironment.json                                                    |
| [privateLinkResourcesListSupportedSample.ts][privatelinkresourceslistsupportedsample]                     | Gets a list of all supported private link resource types for the given environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateLinkResourcesGet.json                                                              |
| [referenceDataSetsCreateOrUpdateSample.ts][referencedatasetscreateorupdatesample]                         | Create or update a reference data set in the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsCreate.json                                                                              |
| [referenceDataSetsDeleteSample.ts][referencedatasetsdeletesample]                                         | Deletes the reference data set with the specified name in the specified subscription, resource group, and environment x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsDelete.json                            |
| [referenceDataSetsGetSample.ts][referencedatasetsgetsample]                                               | Gets the reference data set with the specified name in the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsGet.json                                                                   |
| [referenceDataSetsListByEnvironmentSample.ts][referencedatasetslistbyenvironmentsample]                   | Lists all the available reference data sets associated with the subscription and within the specified resource group and environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsListByEnvironment.json |
| [referenceDataSetsUpdateSample.ts][referencedatasetsupdatesample]                                         | Updates the reference data set with the specified name in the specified subscription, resource group, and environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsPatchTags.json                        |

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
node dist/accessPoliciesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/accessPoliciesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accesspoliciescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/accessPoliciesCreateOrUpdateSample.ts
[accesspoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/accessPoliciesDeleteSample.ts
[accesspoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/accessPoliciesGetSample.ts
[accesspolicieslistbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/accessPoliciesListByEnvironmentSample.ts
[accesspoliciesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/accessPoliciesUpdateSample.ts
[environmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/environmentsCreateOrUpdateSample.ts
[environmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/environmentsDeleteSample.ts
[environmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/environmentsGetSample.ts
[environmentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/environmentsListByResourceGroupSample.ts
[environmentslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/environmentsListBySubscriptionSample.ts
[environmentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/environmentsUpdateSample.ts
[eventsourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/eventSourcesCreateOrUpdateSample.ts
[eventsourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/eventSourcesDeleteSample.ts
[eventsourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/eventSourcesGetSample.ts
[eventsourceslistbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/eventSourcesListByEnvironmentSample.ts
[eventsourcesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/eventSourcesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/privateEndpointConnectionsListByEnvironmentSample.ts
[privatelinkresourceslistsupportedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/privateLinkResourcesListSupportedSample.ts
[referencedatasetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/referenceDataSetsCreateOrUpdateSample.ts
[referencedatasetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/referenceDataSetsDeleteSample.ts
[referencedatasetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/referenceDataSetsGetSample.ts
[referencedatasetslistbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/referenceDataSetsListByEnvironmentSample.ts
[referencedatasetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/typescript/src/referenceDataSetsUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-timeseriesinsights?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/timeseriesinsights/arm-timeseriesinsights/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

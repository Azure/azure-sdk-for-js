# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessPoliciesCreateOrUpdateSample.js][accesspoliciescreateorupdatesample]                               | Create or update an access policy in the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesCreate.json                                                                                     |
| [accessPoliciesDeleteSample.js][accesspoliciesdeletesample]                                               | Deletes the access policy with the specified name in the specified subscription, resource group, and environment x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesDelete.json                                    |
| [accessPoliciesGetSample.js][accesspoliciesgetsample]                                                     | Gets the access policy with the specified name in the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesGet.json                                                                           |
| [accessPoliciesListByEnvironmentSample.js][accesspolicieslistbyenvironmentsample]                         | Lists all the available access policies associated with the environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesListByEnvironment.json                                                                 |
| [accessPoliciesUpdateSample.js][accesspoliciesupdatesample]                                               | Updates the access policy with the specified name in the specified subscription, resource group, and environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesPatchRoles.json                               |
| [environmentsCreateOrUpdateSample.js][environmentscreateorupdatesample]                                   | Create or update an environment in the specified subscription and resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsCreate.json                                                                     |
| [environmentsDeleteSample.js][environmentsdeletesample]                                                   | Deletes the environment with the specified name in the specified subscription and resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsDelete.json                                                     |
| [environmentsGetSample.js][environmentsgetsample]                                                         | Gets the environment with the specified name in the specified subscription and resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsGet.json                                                           |
| [environmentsListByResourceGroupSample.js][environmentslistbyresourcegroupsample]                         | Lists all the available environments associated with the subscription and within the specified resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsListByResourceGroup.json                           |
| [environmentsListBySubscriptionSample.js][environmentslistbysubscriptionsample]                           | Lists all the available environments within a subscription, irrespective of the resource groups. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsListBySubscription.json                                          |
| [environmentsUpdateSample.js][environmentsupdatesample]                                                   | Updates the environment with the specified name in the specified subscription and resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsPatchTags.json                                                  |
| [eventSourcesCreateOrUpdateSample.js][eventsourcescreateorupdatesample]                                   | Create or update an event source under the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesCreateEventHub.json                                                                             |
| [eventSourcesDeleteSample.js][eventsourcesdeletesample]                                                   | Deletes the event source with the specified name in the specified subscription, resource group, and environment x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesDelete.json                                       |
| [eventSourcesGetSample.js][eventsourcesgetsample]                                                         | Gets the event source with the specified name in the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesGetEventHub.json                                                                      |
| [eventSourcesListByEnvironmentSample.js][eventsourceslistbyenvironmentsample]                             | Lists all the available event sources associated with the subscription and within the specified resource group and environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesListByEnvironment.json            |
| [eventSourcesUpdateSample.js][eventsourcesupdatesample]                                                   | Updates the event source with the specified name in the specified subscription, resource group, and environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesPatchTags.json                                   |
| [operationsListSample.js][operationslistsample]                                                           | Lists all of the available Time Series Insights related operations. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/Operation_List.json                                                                                       |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample]       | Updates a Private Endpoint connection of the environment in the given resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateEndpointConnectionUpdate.json                                                    |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                       | Disconnects the private endpoint connection and deletes it from the environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateEndpointConnectionDelete.json                                                         |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                             | Gets the details of the private endpoint connection of the environment in the given resource group. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateEndpointConnectionGet.json                                         |
| [privateEndpointConnectionsListByEnvironmentSample.js][privateendpointconnectionslistbyenvironmentsample] | Gets a list of all private endpoint connections in the given environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateEndpointConnectionsListByEnvironment.json                                                    |
| [privateLinkResourcesListSupportedSample.js][privatelinkresourceslistsupportedsample]                     | Gets a list of all supported private link resource types for the given environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateLinkResourcesGet.json                                                              |
| [referenceDataSetsCreateOrUpdateSample.js][referencedatasetscreateorupdatesample]                         | Create or update a reference data set in the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsCreate.json                                                                              |
| [referenceDataSetsDeleteSample.js][referencedatasetsdeletesample]                                         | Deletes the reference data set with the specified name in the specified subscription, resource group, and environment x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsDelete.json                            |
| [referenceDataSetsGetSample.js][referencedatasetsgetsample]                                               | Gets the reference data set with the specified name in the specified environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsGet.json                                                                   |
| [referenceDataSetsListByEnvironmentSample.js][referencedatasetslistbyenvironmentsample]                   | Lists all the available reference data sets associated with the subscription and within the specified resource group and environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsListByEnvironment.json |
| [referenceDataSetsUpdateSample.js][referencedatasetsupdatesample]                                         | Updates the reference data set with the specified name in the specified subscription, resource group, and environment. x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsPatchTags.json                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node accessPoliciesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node accessPoliciesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accesspoliciescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/accessPoliciesCreateOrUpdateSample.js
[accesspoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/accessPoliciesDeleteSample.js
[accesspoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/accessPoliciesGetSample.js
[accesspolicieslistbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/accessPoliciesListByEnvironmentSample.js
[accesspoliciesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/accessPoliciesUpdateSample.js
[environmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/environmentsCreateOrUpdateSample.js
[environmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/environmentsDeleteSample.js
[environmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/environmentsGetSample.js
[environmentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/environmentsListByResourceGroupSample.js
[environmentslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/environmentsListBySubscriptionSample.js
[environmentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/environmentsUpdateSample.js
[eventsourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/eventSourcesCreateOrUpdateSample.js
[eventsourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/eventSourcesDeleteSample.js
[eventsourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/eventSourcesGetSample.js
[eventsourceslistbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/eventSourcesListByEnvironmentSample.js
[eventsourcesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/eventSourcesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/operationsListSample.js
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/privateEndpointConnectionsListByEnvironmentSample.js
[privatelinkresourceslistsupportedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/privateLinkResourcesListSupportedSample.js
[referencedatasetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/referenceDataSetsCreateOrUpdateSample.js
[referencedatasetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/referenceDataSetsDeleteSample.js
[referencedatasetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/referenceDataSetsGetSample.js
[referencedatasetslistbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/referenceDataSetsListByEnvironmentSample.js
[referencedatasetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/timeseriesinsights/arm-timeseriesinsights/samples/v2-beta/javascript/referenceDataSetsUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-timeseriesinsights?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/timeseriesinsights/arm-timeseriesinsights/README.md

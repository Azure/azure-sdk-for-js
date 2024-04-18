# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [adminKeysGetSample.js][adminkeysgetsample]                                                         | Gets the primary and secondary admin API keys for the specified Azure Cognitive Search service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchGetAdminKeys.json                                                                                                             |
| [adminKeysRegenerateSample.js][adminkeysregeneratesample]                                           | Regenerates either the primary or secondary admin API key. You can only regenerate one key at a time. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchRegenerateAdminKey.json                                                                                                 |
| [operationsListSample.js][operationslistsample]                                                     | Lists all of the available REST API operations of the Microsoft.Search provider. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/OperationsList.json                                                                                                                                |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                 | Disconnects the private endpoint connection and deletes it from the search service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/DeletePrivateEndpointConnection.json                                                                                                            |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                       | Gets the details of the private endpoint connection to the search service in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/GetPrivateEndpointConnection.json                                                                                            |
| [privateEndpointConnectionsListByServiceSample.js][privateendpointconnectionslistbyservicesample]   | Gets a list of all private endpoint connections in the given service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/ListPrivateEndpointConnectionsByService.json                                                                                                                  |
| [privateEndpointConnectionsUpdateSample.js][privateendpointconnectionsupdatesample]                 | Updates a Private Endpoint connection to the search service in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/UpdatePrivateEndpointConnection.json                                                                                                       |
| [privateLinkResourcesListSupportedSample.js][privatelinkresourceslistsupportedsample]               | Gets a list of all supported private link resource types for the given service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/ListSupportedPrivateLinkResources.json                                                                                                              |
| [queryKeysCreateSample.js][querykeyscreatesample]                                                   | Generates a new query key for the specified search service. You can create up to 50 query keys per service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchCreateQueryKey.json                                                                                               |
| [queryKeysDeleteSample.js][querykeysdeletesample]                                                   | Deletes the specified query key. Unlike admin keys, query keys are not regenerated. The process for regenerating a query key is to delete and then recreate it. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchDeleteQueryKey.json                                           |
| [queryKeysListBySearchServiceSample.js][querykeyslistbysearchservicesample]                         | Returns the list of query API keys for the given Azure Cognitive Search service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchListQueryKeysBySearchService.json                                                                                                            |
| [servicesCheckNameAvailabilitySample.js][serviceschecknameavailabilitysample]                       | Checks whether or not the given search service name is available for use. Search service names must be globally unique since they are part of the service URI (https://<name>.search.windows.net). x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchCheckNameAvailability.json |
| [servicesCreateOrUpdateSample.js][servicescreateorupdatesample]                                     | Creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchCreateOrUpdateService.json                                       |
| [servicesDeleteSample.js][servicesdeletesample]                                                     | Deletes a search service in the given resource group, along with its associated resources. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchDeleteService.json                                                                                                                 |
| [servicesGetSample.js][servicesgetsample]                                                           | Gets the search service with the given name in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchGetService.json                                                                                                                                      |
| [servicesListByResourceGroupSample.js][serviceslistbyresourcegroupsample]                           | Gets a list of all Search services in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchListServicesByResourceGroup.json                                                                                                                              |
| [servicesListBySubscriptionSample.js][serviceslistbysubscriptionsample]                             | Gets a list of all Search services in the given subscription. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchListServicesBySubscription.json                                                                                                                                 |
| [servicesUpdateSample.js][servicesupdatesample]                                                     | Updates an existing search service in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/SearchUpdateService.json                                                                                                                                            |
| [sharedPrivateLinkResourcesCreateOrUpdateSample.js][sharedprivatelinkresourcescreateorupdatesample] | Initiates the creation or update of a shared private link resource managed by the search service in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/CreateOrUpdateSharedPrivateLinkResource.json                                                          |
| [sharedPrivateLinkResourcesDeleteSample.js][sharedprivatelinkresourcesdeletesample]                 | Initiates the deletion of the shared private link resource from the search service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/DeleteSharedPrivateLinkResource.json                                                                                                            |
| [sharedPrivateLinkResourcesGetSample.js][sharedprivatelinkresourcesgetsample]                       | Gets the details of the shared private link resource managed by the search service in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/GetSharedPrivateLinkResource.json                                                                                   |
| [sharedPrivateLinkResourcesListByServiceSample.js][sharedprivatelinkresourceslistbyservicesample]   | Gets a list of all shared private link resources managed by the given service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/ListSharedPrivateLinkResourcesByService.json                                                                                                         |
| [usageBySubscriptionSkuSample.js][usagebysubscriptionskusample]                                     | Gets the quota usage for a search sku in the given subscription. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/GetQuotaUsage.json                                                                                                                                                 |
| [usagesListBySubscriptionSample.js][usageslistbysubscriptionsample]                                 | Gets a list of all Search quota usages in the given subscription. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2023-11-01/examples/GetQuotaUsagesList.json                                                                                                                                           |

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
node adminKeysGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env SEARCH_SUBSCRIPTION_ID="<search subscription id>" SEARCH_RESOURCE_GROUP="<search resource group>" node adminKeysGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[adminkeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/adminKeysGetSample.js
[adminkeysregeneratesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/adminKeysRegenerateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/operationsListSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/privateEndpointConnectionsListByServiceSample.js
[privateendpointconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/privateEndpointConnectionsUpdateSample.js
[privatelinkresourceslistsupportedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/privateLinkResourcesListSupportedSample.js
[querykeyscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/queryKeysCreateSample.js
[querykeysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/queryKeysDeleteSample.js
[querykeyslistbysearchservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/queryKeysListBySearchServiceSample.js
[serviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/servicesCheckNameAvailabilitySample.js
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/servicesCreateOrUpdateSample.js
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/servicesDeleteSample.js
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/servicesGetSample.js
[serviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/servicesListByResourceGroupSample.js
[serviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/servicesListBySubscriptionSample.js
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/servicesUpdateSample.js
[sharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/sharedPrivateLinkResourcesCreateOrUpdateSample.js
[sharedprivatelinkresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/sharedPrivateLinkResourcesDeleteSample.js
[sharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/sharedPrivateLinkResourcesGetSample.js
[sharedprivatelinkresourceslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/sharedPrivateLinkResourcesListByServiceSample.js
[usagebysubscriptionskusample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/usageBySubscriptionSkuSample.js
[usageslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v3/javascript/usagesListBySubscriptionSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-search?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/arm-search/README.md

# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [adminKeysGetSample.ts][adminkeysgetsample]                                                                               | Gets the primary and secondary admin API keys for the specified Azure AI Search service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchGetAdminKeys.json                                                                                                                                                                                 |
| [adminKeysRegenerateSample.ts][adminkeysregeneratesample]                                                                 | Regenerates either the primary or secondary admin API key. You can only regenerate one key at a time. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchRegenerateAdminKey.json                                                                                                                                                              |
| [networkSecurityPerimeterConfigurationsGetSample.ts][networksecurityperimeterconfigurationsgetsample]                     | Gets a network security perimeter configuration. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/NetworkSecurityPerimeterConfigurationsGet.json                                                                                                                                                                                                  |
| [networkSecurityPerimeterConfigurationsListByServiceSample.ts][networksecurityperimeterconfigurationslistbyservicesample] | Gets a list of network security perimeter configurations for a search service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/NetworkSecurityPerimeterConfigurationsListByService.json                                                                                                                                                          |
| [networkSecurityPerimeterConfigurationsReconcileSample.ts][networksecurityperimeterconfigurationsreconcilesample]         | Reconcile network security perimeter configuration for the Azure AI Search resource provider. This triggers a manual resync with network security perimeter configurations by ensuring the search service carries the latest configuration. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/NetworkSecurityPerimeterConfigurationsReconcile.json |
| [operationsListSample.ts][operationslistsample]                                                                           | Lists all of the available REST API operations of the Microsoft.Search provider. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchListOperations.json                                                                                                                                                                                       |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                       | Disconnects the private endpoint connection and deletes it from the search service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/DeletePrivateEndpointConnection.json                                                                                                                                                                         |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                             | Gets the details of the private endpoint connection to the search service in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/GetPrivateEndpointConnection.json                                                                                                                                                         |
| [privateEndpointConnectionsListByServiceSample.ts][privateendpointconnectionslistbyservicesample]                         | Gets a list of all private endpoint connections in the given service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/ListPrivateEndpointConnectionsByService.json                                                                                                                                                                               |
| [privateEndpointConnectionsUpdateSample.ts][privateendpointconnectionsupdatesample]                                       | Updates a private endpoint connection to the search service in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/UpdatePrivateEndpointConnection.json                                                                                                                                                                    |
| [privateLinkResourcesListSupportedSample.ts][privatelinkresourceslistsupportedsample]                                     | Gets a list of all supported private link resource types for the given service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/ListSupportedPrivateLinkResources.json                                                                                                                                                                           |
| [queryKeysCreateSample.ts][querykeyscreatesample]                                                                         | Generates a new query key for the specified search service. You can create up to 50 query keys per service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchCreateQueryKey.json                                                                                                                                                            |
| [queryKeysDeleteSample.ts][querykeysdeletesample]                                                                         | Deletes the specified query key. Unlike admin keys, query keys are not regenerated. The process for regenerating a query key is to delete and then recreate it. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchDeleteQueryKey.json                                                                                                        |
| [queryKeysListBySearchServiceSample.ts][querykeyslistbysearchservicesample]                                               | Returns the list of query API keys for the given Azure AI Search service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchListQueryKeysBySearchService.json                                                                                                                                                                                |
| [servicesCheckNameAvailabilitySample.ts][serviceschecknameavailabilitysample]                                             | Checks whether or not the given search service name is available for use. Search service names must be globally unique since they are part of the service URI (https://<name>.search.windows.net). x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchCheckNameAvailability.json                                                              |
| [servicesCreateOrUpdateSample.ts][servicescreateorupdatesample]                                                           | Creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchCreateOrUpdateService.json                                                                                                    |
| [servicesDeleteSample.ts][servicesdeletesample]                                                                           | Deletes a search service in the given resource group, along with its associated resources. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchDeleteService.json                                                                                                                                                                              |
| [servicesGetSample.ts][servicesgetsample]                                                                                 | Gets the search service with the given name in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchGetService.json                                                                                                                                                                                                   |
| [servicesListByResourceGroupSample.ts][serviceslistbyresourcegroupsample]                                                 | Gets a list of all Search services in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchListServicesByResourceGroup.json                                                                                                                                                                                           |
| [servicesListBySubscriptionSample.ts][serviceslistbysubscriptionsample]                                                   | Gets a list of all Search services in the given subscription. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchListServicesBySubscription.json                                                                                                                                                                                              |
| [servicesUpdateSample.ts][servicesupdatesample]                                                                           | Updates an existing search service in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchUpdateService.json                                                                                                                                                                                                         |
| [sharedPrivateLinkResourcesCreateOrUpdateSample.ts][sharedprivatelinkresourcescreateorupdatesample]                       | Initiates the creation or update of a shared private link resource managed by the search service in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/CreateOrUpdateSharedPrivateLinkResource.json                                                                                                                       |
| [sharedPrivateLinkResourcesDeleteSample.ts][sharedprivatelinkresourcesdeletesample]                                       | Initiates the deletion of the shared private link resource from the search service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/DeleteSharedPrivateLinkResource.json                                                                                                                                                                         |
| [sharedPrivateLinkResourcesGetSample.ts][sharedprivatelinkresourcesgetsample]                                             | Gets the details of the shared private link resource managed by the search service in the given resource group. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/GetSharedPrivateLinkResource.json                                                                                                                                                |
| [sharedPrivateLinkResourcesListByServiceSample.ts][sharedprivatelinkresourceslistbyservicesample]                         | Gets a list of all shared private link resources managed by the given service. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/ListSharedPrivateLinkResourcesByService.json                                                                                                                                                                      |
| [usageBySubscriptionSkuSample.ts][usagebysubscriptionskusample]                                                           | Gets the quota usage for a search sku in the given subscription. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/GetQuotaUsage.json                                                                                                                                                                                                              |
| [usagesListBySubscriptionSample.ts][usageslistbysubscriptionsample]                                                       | Get a list of all Azure AI Search quota usages across the subscription. x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/GetQuotaUsagesList.json                                                                                                                                                                                                  |

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
node dist/adminKeysGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env SEARCH_SUBSCRIPTION_ID="<search subscription id>" SEARCH_RESOURCE_GROUP="<search resource group>" node dist/adminKeysGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[adminkeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/adminKeysGetSample.ts
[adminkeysregeneratesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/adminKeysRegenerateSample.ts
[networksecurityperimeterconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/networkSecurityPerimeterConfigurationsGetSample.ts
[networksecurityperimeterconfigurationslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/networkSecurityPerimeterConfigurationsListByServiceSample.ts
[networksecurityperimeterconfigurationsreconcilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/networkSecurityPerimeterConfigurationsReconcileSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/privateEndpointConnectionsListByServiceSample.ts
[privateendpointconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/privateEndpointConnectionsUpdateSample.ts
[privatelinkresourceslistsupportedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/privateLinkResourcesListSupportedSample.ts
[querykeyscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/queryKeysCreateSample.ts
[querykeysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/queryKeysDeleteSample.ts
[querykeyslistbysearchservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/queryKeysListBySearchServiceSample.ts
[serviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/servicesCheckNameAvailabilitySample.ts
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/servicesCreateOrUpdateSample.ts
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/servicesDeleteSample.ts
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/servicesGetSample.ts
[serviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/servicesListByResourceGroupSample.ts
[serviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/servicesListBySubscriptionSample.ts
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/servicesUpdateSample.ts
[sharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/sharedPrivateLinkResourcesCreateOrUpdateSample.ts
[sharedprivatelinkresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/sharedPrivateLinkResourcesDeleteSample.ts
[sharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/sharedPrivateLinkResourcesGetSample.ts
[sharedprivatelinkresourceslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/sharedPrivateLinkResourcesListByServiceSample.ts
[usagebysubscriptionskusample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/usageBySubscriptionSkuSample.ts
[usageslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/typescript/src/usagesListBySubscriptionSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-search?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/arm-search/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

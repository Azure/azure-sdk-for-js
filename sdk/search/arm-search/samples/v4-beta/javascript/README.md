# @azure/arm-search client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-search in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [adminKeysGetSample.js][adminkeysgetsample]                                                                               | gets the primary and secondary admin API keys for the specified Azure AI Search service. x-ms-original-file: 2025-05-01/SearchGetAdminKeys.json                                                                                                                                                                                 |
| [adminKeysRegenerateSample.js][adminkeysregeneratesample]                                                                 | regenerates either the primary or secondary admin API key. You can only regenerate one key at a time. x-ms-original-file: 2025-05-01/SearchRegenerateAdminKey.json                                                                                                                                                              |
| [networkSecurityPerimeterConfigurationsGetSample.js][networksecurityperimeterconfigurationsgetsample]                     | gets a network security perimeter configuration. x-ms-original-file: 2025-05-01/NetworkSecurityPerimeterConfigurationsGet.json                                                                                                                                                                                                  |
| [networkSecurityPerimeterConfigurationsListByServiceSample.js][networksecurityperimeterconfigurationslistbyservicesample] | gets a list of network security perimeter configurations for a search service. x-ms-original-file: 2025-05-01/NetworkSecurityPerimeterConfigurationsListByService.json                                                                                                                                                          |
| [networkSecurityPerimeterConfigurationsReconcileSample.js][networksecurityperimeterconfigurationsreconcilesample]         | reconcile network security perimeter configuration for the Azure AI Search resource provider. This triggers a manual resync with network security perimeter configurations by ensuring the search service carries the latest configuration. x-ms-original-file: 2025-05-01/NetworkSecurityPerimeterConfigurationsReconcile.json |
| [operationsListSample.js][operationslistsample]                                                                           | lists all of the available REST API operations of the Microsoft.Search provider. x-ms-original-file: 2025-05-01/SearchListOperations.json                                                                                                                                                                                       |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                                       | disconnects the private endpoint connection and deletes it from the search service. x-ms-original-file: 2025-05-01/DeletePrivateEndpointConnection.json                                                                                                                                                                         |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                             | gets the details of the private endpoint connection to the search service in the given resource group. x-ms-original-file: 2025-05-01/GetPrivateEndpointConnection.json                                                                                                                                                         |
| [privateEndpointConnectionsListByServiceSample.js][privateendpointconnectionslistbyservicesample]                         | gets a list of all private endpoint connections in the given service. x-ms-original-file: 2025-05-01/ListPrivateEndpointConnectionsByService.json                                                                                                                                                                               |
| [privateEndpointConnectionsUpdateSample.js][privateendpointconnectionsupdatesample]                                       | updates a private endpoint connection to the search service in the given resource group. x-ms-original-file: 2025-05-01/UpdatePrivateEndpointConnection.json                                                                                                                                                                    |
| [privateLinkResourcesListSupportedSample.js][privatelinkresourceslistsupportedsample]                                     | gets a list of all supported private link resource types for the given service. x-ms-original-file: 2025-05-01/ListSupportedPrivateLinkResources.json                                                                                                                                                                           |
| [queryKeysCreateSample.js][querykeyscreatesample]                                                                         | generates a new query key for the specified search service. You can create up to 50 query keys per service. x-ms-original-file: 2025-05-01/SearchCreateQueryKey.json                                                                                                                                                            |
| [queryKeysDeleteSample.js][querykeysdeletesample]                                                                         | deletes the specified query key. Unlike admin keys, query keys are not regenerated. The process for regenerating a query key is to delete and then recreate it. x-ms-original-file: 2025-05-01/SearchDeleteQueryKey.json                                                                                                        |
| [queryKeysListBySearchServiceSample.js][querykeyslistbysearchservicesample]                                               | returns the list of query API keys for the given Azure AI Search service. x-ms-original-file: 2025-05-01/SearchListQueryKeysBySearchService.json                                                                                                                                                                                |
| [servicesCheckNameAvailabilitySample.js][serviceschecknameavailabilitysample]                                             | checks whether or not the given search service name is available for use. Search service names must be globally unique since they are part of the service URI (https://<name>.search.windows.net). x-ms-original-file: 2025-05-01/SearchCheckNameAvailability.json                                                              |
| [servicesCreateOrUpdateSample.js][servicescreateorupdatesample]                                                           | creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values. x-ms-original-file: 2025-05-01/SearchCreateOrUpdateService.json                                                                                                    |
| [servicesDeleteSample.js][servicesdeletesample]                                                                           | deletes a search service in the given resource group, along with its associated resources. x-ms-original-file: 2025-05-01/SearchDeleteService.json                                                                                                                                                                              |
| [servicesGetSample.js][servicesgetsample]                                                                                 | gets the search service with the given name in the given resource group. x-ms-original-file: 2025-05-01/SearchGetService.json                                                                                                                                                                                                   |
| [servicesListByResourceGroupSample.js][serviceslistbyresourcegroupsample]                                                 | gets a list of all Search services in the given resource group. x-ms-original-file: 2025-05-01/SearchListServicesByResourceGroup.json                                                                                                                                                                                           |
| [servicesListBySubscriptionSample.js][serviceslistbysubscriptionsample]                                                   | gets a list of all Search services in the given subscription. x-ms-original-file: 2025-05-01/SearchListServicesBySubscription.json                                                                                                                                                                                              |
| [servicesUpdateSample.js][servicesupdatesample]                                                                           | updates an existing search service in the given resource group. x-ms-original-file: 2025-05-01/SearchUpdateService.json                                                                                                                                                                                                         |
| [servicesUpgradeSample.js][servicesupgradesample]                                                                         | upgrades the Azure AI Search service to the latest version available. x-ms-original-file: 2025-05-01/UpgradeSearchServiceToLatestVersion.json                                                                                                                                                                                   |
| [sharedPrivateLinkResourcesCreateOrUpdateSample.js][sharedprivatelinkresourcescreateorupdatesample]                       | initiates the creation or update of a shared private link resource managed by the search service in the given resource group. x-ms-original-file: 2025-05-01/CreateOrUpdateSharedPrivateLinkResource.json                                                                                                                       |
| [sharedPrivateLinkResourcesDeleteSample.js][sharedprivatelinkresourcesdeletesample]                                       | initiates the deletion of the shared private link resource from the search service. x-ms-original-file: 2025-05-01/DeleteSharedPrivateLinkResource.json                                                                                                                                                                         |
| [sharedPrivateLinkResourcesGetSample.js][sharedprivatelinkresourcesgetsample]                                             | gets the details of the shared private link resource managed by the search service in the given resource group. x-ms-original-file: 2025-05-01/GetSharedPrivateLinkResource.json                                                                                                                                                |
| [sharedPrivateLinkResourcesListByServiceSample.js][sharedprivatelinkresourceslistbyservicesample]                         | gets a list of all shared private link resources managed by the given service. x-ms-original-file: 2025-05-01/ListSharedPrivateLinkResourcesByService.json                                                                                                                                                                      |
| [usageBySubscriptionSkuSample.js][usagebysubscriptionskusample]                                                           | gets the quota usage for a search SKU in the given subscription. x-ms-original-file: 2025-05-01/GetQuotaUsage.json                                                                                                                                                                                                              |
| [usagesListBySubscriptionSample.js][usageslistbysubscriptionsample]                                                       | get a list of all Azure AI Search quota usages across the subscription. x-ms-original-file: 2025-05-01/GetQuotaUsagesList.json                                                                                                                                                                                                  |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node adminKeysGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[adminkeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/adminKeysGetSample.js
[adminkeysregeneratesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/adminKeysRegenerateSample.js
[networksecurityperimeterconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/networkSecurityPerimeterConfigurationsGetSample.js
[networksecurityperimeterconfigurationslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/networkSecurityPerimeterConfigurationsListByServiceSample.js
[networksecurityperimeterconfigurationsreconcilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/networkSecurityPerimeterConfigurationsReconcileSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/operationsListSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/privateEndpointConnectionsListByServiceSample.js
[privateendpointconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/privateEndpointConnectionsUpdateSample.js
[privatelinkresourceslistsupportedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/privateLinkResourcesListSupportedSample.js
[querykeyscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/queryKeysCreateSample.js
[querykeysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/queryKeysDeleteSample.js
[querykeyslistbysearchservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/queryKeysListBySearchServiceSample.js
[serviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/servicesCheckNameAvailabilitySample.js
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/servicesCreateOrUpdateSample.js
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/servicesDeleteSample.js
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/servicesGetSample.js
[serviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/servicesListByResourceGroupSample.js
[serviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/servicesListBySubscriptionSample.js
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/servicesUpdateSample.js
[servicesupgradesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/servicesUpgradeSample.js
[sharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/sharedPrivateLinkResourcesCreateOrUpdateSample.js
[sharedprivatelinkresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/sharedPrivateLinkResourcesDeleteSample.js
[sharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/sharedPrivateLinkResourcesGetSample.js
[sharedprivatelinkresourceslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/sharedPrivateLinkResourcesListByServiceSample.js
[usagebysubscriptionskusample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/usageBySubscriptionSkuSample.js
[usageslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/arm-search/samples/v4-beta/javascript/usagesListBySubscriptionSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-search?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/arm-search/README.md

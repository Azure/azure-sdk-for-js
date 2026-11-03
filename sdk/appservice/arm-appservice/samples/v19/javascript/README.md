# @azure/arm-appservice client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-appservice in some common scenarios.

| **File Name**                                                                                                                                                 | **Description**                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [lastKnownGoodResourcesGetLastKnownGoodSample.js][lastknowngoodresourcesgetlastknowngoodsample]                                                               | gets the last known good revision state for a Web App. x-ms-original-file: 2026-08-01/LastKnownGoodResources_GetLastKnownGood.json                                                                                                                                                                        |
| [lastKnownGoodResourcesListLastKnownGoodsSample.js][lastknowngoodresourceslistlastknowngoodssample]                                                           | lists the last known good revision state for a Web App. x-ms-original-file: 2026-08-01/LastKnownGoodResources_ListLastKnownGoods.json                                                                                                                                                                     |
| [lastKnownGoodResourcesMarkLastKnownGoodSample.js][lastknowngoodresourcesmarklastknowngoodsample]                                                             | marks the current Web App state as last known good. x-ms-original-file: 2026-08-01/LastKnownGoodResources_MarkLastKnownGood.json                                                                                                                                                                          |
| [managedTrafficConfigResourcesGetManagedTrafficConfigSample.js][managedtrafficconfigresourcesgetmanagedtrafficconfigsample]                                   | gets managed traffic configuration for a Web App. x-ms-original-file: 2026-08-01/ManagedTrafficConfigResources_GetManagedTrafficConfig.json                                                                                                                                                               |
| [managedTrafficConfigResourcesListManagedTrafficConfigsSample.js][managedtrafficconfigresourceslistmanagedtrafficconfigssample]                               | lists managed traffic configuration resources for a Web App. x-ms-original-file: 2026-08-01/ManagedTrafficConfigResources_ListManagedTrafficConfigs.json                                                                                                                                                  |
| [managedTrafficConfigResourcesUpdateManagedTrafficConfigSample.js][managedtrafficconfigresourcesupdatemanagedtrafficconfigsample]                             | updates managed traffic configuration for a Web App. x-ms-original-file: 2026-08-01/ManagedTrafficConfigResources_UpdateManagedTrafficConfig.json                                                                                                                                                         |
| [serverFarmSiloResourcesCreateOrUpdateServerFarmSiloSample.js][serverfarmsiloresourcescreateorupdateserverfarmsilosample]                                     | creates or updates a silo for an App Service plan. Returns 202 with polling headers when background work is queued, or 200 when no update is needed. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_CreateOrUpdateServerFarmSilo.json                                                             |
| [serverFarmSiloResourcesDeleteServerFarmSiloSample.js][serverfarmsiloresourcesdeleteserverfarmsilosample]                                                     | deletes a silo for an App Service plan. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_DeleteServerFarmSilo.json                                                                                                                                                                                  |
| [serverFarmSiloResourcesGetServerFarmSiloSample.js][serverfarmsiloresourcesgetserverfarmsilosample]                                                           | gets a specific silo for an App Service plan. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_GetServerFarmSilo.json                                                                                                                                                                               |
| [serverFarmSiloResourcesGetServerFarmSiloVnetIntegrationsSample.js][serverfarmsiloresourcesgetserverfarmsilovnetintegrationssample]                           | gets the virtual network integrations associated with an App Service plan silo. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_GetServerFarmSiloVnetIntegrations.json                                                                                                                             |
| [serverFarmSiloResourcesListServerFarmSilosSample.js][serverfarmsiloresourceslistserverfarmsilossample]                                                       | gets all silos for an App Service plan. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_ListServerFarmSilos.json                                                                                                                                                                                   |
| [serverFarmSiloResourcesUpdateServerFarmSiloSample.js][serverfarmsiloresourcesupdateserverfarmsilosample]                                                     | updates only the tags of an App Service plan silo. Silo configuration and provisioning state are not modified. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_UpdateServerFarmSilo.json                                                                                                           |
| [siteSiloResourcesCreateOrUpdateSiteSiloSample.js][sitesiloresourcescreateorupdatesitesilosample]                                                             | creates or updates a silo for a Web App. Returns 202 with polling headers when background work is queued, or 200 when no update is needed. x-ms-original-file: 2026-08-01/SiteSiloResources_CreateOrUpdateSiteSilo.json                                                                                   |
| [siteSiloResourcesDeleteSiteSiloSample.js][sitesiloresourcesdeletesitesilosample]                                                                             | deletes a silo for a Web App. x-ms-original-file: 2026-08-01/SiteSiloResources_DeleteSiteSilo.json                                                                                                                                                                                                        |
| [siteSiloResourcesGetSiteSiloSample.js][sitesiloresourcesgetsitesilosample]                                                                                   | gets a specific silo for a Web App. x-ms-original-file: 2026-08-01/SiteSiloResources_GetSiteSilo.json                                                                                                                                                                                                     |
| [siteSiloResourcesListSiteSilosSample.js][sitesiloresourceslistsitesilossample]                                                                               | gets all silos for a Web App. x-ms-original-file: 2026-08-01/SiteSiloResources_ListSiteSilos.json                                                                                                                                                                                                         |
| [siteSiloResourcesRefreshSiteSilosSample.js][sitesiloresourcesrefreshsitesilossample]                                                                         | forces a fresh revision for an Active Backup primary Web App and re-syncs all of its silos. The refresh request is recorded synchronously; silos then converge asynchronously — track progress through each silo's revisionNumber. x-ms-original-file: 2026-08-01/SiteSiloResources_RefreshSiteSilos.json |
| [siteSiloResourcesUpdateSiteSiloSample.js][sitesiloresourcesupdatesitesilosample]                                                                             | updates only the tags of a Web App silo. Silo configuration and provisioning state are not modified. x-ms-original-file: 2026-08-01/SiteSiloResources_UpdateSiteSilo.json                                                                                                                                 |
| [siteSiloVirtualNetworkConnectionsCreateOrUpdateSiteSiloVnetConnectionSample.js][sitesilovirtualnetworkconnectionscreateorupdatesitesilovnetconnectionsample] | adds a virtual network connection to a silo, or updates the connection properties. x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_CreateOrUpdateSiteSiloVnetConnection.json                                                                                                             |
| [siteSiloVirtualNetworkConnectionsDeleteSiteSiloVnetConnectionSample.js][sitesilovirtualnetworkconnectionsdeletesitesilovnetconnectionsample]                 | deletes the virtual network connection from a silo. x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_DeleteSiteSiloVnetConnection.json                                                                                                                                                    |
| [siteSiloVirtualNetworkConnectionsGetSiteSiloVnetConnectionSample.js][sitesilovirtualnetworkconnectionsgetsitesilovnetconnectionsample]                       | gets the virtual network the silo is connected to. x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_GetSiteSiloVnetConnection.json                                                                                                                                                        |
| [siteSiloVirtualNetworkConnectionsListSiteSiloVnetConnectionsSample.js][sitesilovirtualnetworkconnectionslistsitesilovnetconnectionssample]                   | lists the virtual network connections of a Web App silo. Returns the singleton virtualNetwork connection when configured, or an empty collection otherwise. x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_ListSiteSiloVnetConnections.json                                             |
| [siteSiloVirtualNetworkConnectionsUpdateSiteSiloVnetConnectionSample.js][sitesilovirtualnetworkconnectionsupdatesitesilovnetconnectionsample]                 | updates the properties of a virtual network connection on a silo. x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_UpdateSiteSiloVnetConnection.json                                                                                                                                      |

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
node lastKnownGoodResourcesGetLastKnownGoodSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node lastKnownGoodResourcesGetLastKnownGoodSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[lastknowngoodresourcesgetlastknowngoodsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/lastKnownGoodResourcesGetLastKnownGoodSample.js
[lastknowngoodresourceslistlastknowngoodssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/lastKnownGoodResourcesListLastKnownGoodsSample.js
[lastknowngoodresourcesmarklastknowngoodsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/lastKnownGoodResourcesMarkLastKnownGoodSample.js
[managedtrafficconfigresourcesgetmanagedtrafficconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/managedTrafficConfigResourcesGetManagedTrafficConfigSample.js
[managedtrafficconfigresourceslistmanagedtrafficconfigssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/managedTrafficConfigResourcesListManagedTrafficConfigsSample.js
[managedtrafficconfigresourcesupdatemanagedtrafficconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/managedTrafficConfigResourcesUpdateManagedTrafficConfigSample.js
[serverfarmsiloresourcescreateorupdateserverfarmsilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/serverFarmSiloResourcesCreateOrUpdateServerFarmSiloSample.js
[serverfarmsiloresourcesdeleteserverfarmsilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/serverFarmSiloResourcesDeleteServerFarmSiloSample.js
[serverfarmsiloresourcesgetserverfarmsilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/serverFarmSiloResourcesGetServerFarmSiloSample.js
[serverfarmsiloresourcesgetserverfarmsilovnetintegrationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/serverFarmSiloResourcesGetServerFarmSiloVnetIntegrationsSample.js
[serverfarmsiloresourceslistserverfarmsilossample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/serverFarmSiloResourcesListServerFarmSilosSample.js
[serverfarmsiloresourcesupdateserverfarmsilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/serverFarmSiloResourcesUpdateServerFarmSiloSample.js
[sitesiloresourcescreateorupdatesitesilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloResourcesCreateOrUpdateSiteSiloSample.js
[sitesiloresourcesdeletesitesilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloResourcesDeleteSiteSiloSample.js
[sitesiloresourcesgetsitesilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloResourcesGetSiteSiloSample.js
[sitesiloresourceslistsitesilossample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloResourcesListSiteSilosSample.js
[sitesiloresourcesrefreshsitesilossample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloResourcesRefreshSiteSilosSample.js
[sitesiloresourcesupdatesitesilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloResourcesUpdateSiteSiloSample.js
[sitesilovirtualnetworkconnectionscreateorupdatesitesilovnetconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloVirtualNetworkConnectionsCreateOrUpdateSiteSiloVnetConnectionSample.js
[sitesilovirtualnetworkconnectionsdeletesitesilovnetconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloVirtualNetworkConnectionsDeleteSiteSiloVnetConnectionSample.js
[sitesilovirtualnetworkconnectionsgetsitesilovnetconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloVirtualNetworkConnectionsGetSiteSiloVnetConnectionSample.js
[sitesilovirtualnetworkconnectionslistsitesilovnetconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloVirtualNetworkConnectionsListSiteSiloVnetConnectionsSample.js
[sitesilovirtualnetworkconnectionsupdatesitesilovnetconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/javascript/siteSiloVirtualNetworkConnectionsUpdateSiteSiloVnetConnectionSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-appservice
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appservice/arm-appservice/README.md

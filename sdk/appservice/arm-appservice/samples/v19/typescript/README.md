# @azure/arm-appservice client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-appservice in some common scenarios.

| **File Name**                                                                                                                                                 | **Description**                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [lastKnownGoodResourcesGetLastKnownGoodSample.ts][lastknowngoodresourcesgetlastknowngoodsample]                                                               | gets the last known good revision state for a Web App. x-ms-original-file: 2026-08-01/LastKnownGoodResources_GetLastKnownGood.json                                                                                                                                                                        |
| [lastKnownGoodResourcesListLastKnownGoodsSample.ts][lastknowngoodresourceslistlastknowngoodssample]                                                           | lists the last known good revision state for a Web App. x-ms-original-file: 2026-08-01/LastKnownGoodResources_ListLastKnownGoods.json                                                                                                                                                                     |
| [lastKnownGoodResourcesMarkLastKnownGoodSample.ts][lastknowngoodresourcesmarklastknowngoodsample]                                                             | marks the current Web App state as last known good. x-ms-original-file: 2026-08-01/LastKnownGoodResources_MarkLastKnownGood.json                                                                                                                                                                          |
| [managedTrafficConfigResourcesGetManagedTrafficConfigSample.ts][managedtrafficconfigresourcesgetmanagedtrafficconfigsample]                                   | gets managed traffic configuration for a Web App. x-ms-original-file: 2026-08-01/ManagedTrafficConfigResources_GetManagedTrafficConfig.json                                                                                                                                                               |
| [managedTrafficConfigResourcesListManagedTrafficConfigsSample.ts][managedtrafficconfigresourceslistmanagedtrafficconfigssample]                               | lists managed traffic configuration resources for a Web App. x-ms-original-file: 2026-08-01/ManagedTrafficConfigResources_ListManagedTrafficConfigs.json                                                                                                                                                  |
| [managedTrafficConfigResourcesUpdateManagedTrafficConfigSample.ts][managedtrafficconfigresourcesupdatemanagedtrafficconfigsample]                             | updates managed traffic configuration for a Web App. x-ms-original-file: 2026-08-01/ManagedTrafficConfigResources_UpdateManagedTrafficConfig.json                                                                                                                                                         |
| [serverFarmSiloResourcesCreateOrUpdateServerFarmSiloSample.ts][serverfarmsiloresourcescreateorupdateserverfarmsilosample]                                     | creates or updates a silo for an App Service plan. Returns 202 with polling headers when background work is queued, or 200 when no update is needed. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_CreateOrUpdateServerFarmSilo.json                                                             |
| [serverFarmSiloResourcesDeleteServerFarmSiloSample.ts][serverfarmsiloresourcesdeleteserverfarmsilosample]                                                     | deletes a silo for an App Service plan. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_DeleteServerFarmSilo.json                                                                                                                                                                                  |
| [serverFarmSiloResourcesGetServerFarmSiloSample.ts][serverfarmsiloresourcesgetserverfarmsilosample]                                                           | gets a specific silo for an App Service plan. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_GetServerFarmSilo.json                                                                                                                                                                               |
| [serverFarmSiloResourcesGetServerFarmSiloVnetIntegrationsSample.ts][serverfarmsiloresourcesgetserverfarmsilovnetintegrationssample]                           | gets the virtual network integrations associated with an App Service plan silo. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_GetServerFarmSiloVnetIntegrations.json                                                                                                                             |
| [serverFarmSiloResourcesListServerFarmSilosSample.ts][serverfarmsiloresourceslistserverfarmsilossample]                                                       | gets all silos for an App Service plan. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_ListServerFarmSilos.json                                                                                                                                                                                   |
| [serverFarmSiloResourcesUpdateServerFarmSiloSample.ts][serverfarmsiloresourcesupdateserverfarmsilosample]                                                     | updates only the tags of an App Service plan silo. Silo configuration and provisioning state are not modified. x-ms-original-file: 2026-08-01/ServerFarmSiloResources_UpdateServerFarmSilo.json                                                                                                           |
| [siteSiloResourcesCreateOrUpdateSiteSiloSample.ts][sitesiloresourcescreateorupdatesitesilosample]                                                             | creates or updates a silo for a Web App. Returns 202 with polling headers when background work is queued, or 200 when no update is needed. x-ms-original-file: 2026-08-01/SiteSiloResources_CreateOrUpdateSiteSilo.json                                                                                   |
| [siteSiloResourcesDeleteSiteSiloSample.ts][sitesiloresourcesdeletesitesilosample]                                                                             | deletes a silo for a Web App. x-ms-original-file: 2026-08-01/SiteSiloResources_DeleteSiteSilo.json                                                                                                                                                                                                        |
| [siteSiloResourcesGetSiteSiloSample.ts][sitesiloresourcesgetsitesilosample]                                                                                   | gets a specific silo for a Web App. x-ms-original-file: 2026-08-01/SiteSiloResources_GetSiteSilo.json                                                                                                                                                                                                     |
| [siteSiloResourcesListSiteSilosSample.ts][sitesiloresourceslistsitesilossample]                                                                               | gets all silos for a Web App. x-ms-original-file: 2026-08-01/SiteSiloResources_ListSiteSilos.json                                                                                                                                                                                                         |
| [siteSiloResourcesRefreshSiteSilosSample.ts][sitesiloresourcesrefreshsitesilossample]                                                                         | forces a fresh revision for an Active Backup primary Web App and re-syncs all of its silos. The refresh request is recorded synchronously; silos then converge asynchronously — track progress through each silo's revisionNumber. x-ms-original-file: 2026-08-01/SiteSiloResources_RefreshSiteSilos.json |
| [siteSiloResourcesUpdateSiteSiloSample.ts][sitesiloresourcesupdatesitesilosample]                                                                             | updates only the tags of a Web App silo. Silo configuration and provisioning state are not modified. x-ms-original-file: 2026-08-01/SiteSiloResources_UpdateSiteSilo.json                                                                                                                                 |
| [siteSiloVirtualNetworkConnectionsCreateOrUpdateSiteSiloVnetConnectionSample.ts][sitesilovirtualnetworkconnectionscreateorupdatesitesilovnetconnectionsample] | adds a virtual network connection to a silo, or updates the connection properties. x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_CreateOrUpdateSiteSiloVnetConnection.json                                                                                                             |
| [siteSiloVirtualNetworkConnectionsDeleteSiteSiloVnetConnectionSample.ts][sitesilovirtualnetworkconnectionsdeletesitesilovnetconnectionsample]                 | deletes the virtual network connection from a silo. x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_DeleteSiteSiloVnetConnection.json                                                                                                                                                    |
| [siteSiloVirtualNetworkConnectionsGetSiteSiloVnetConnectionSample.ts][sitesilovirtualnetworkconnectionsgetsitesilovnetconnectionsample]                       | gets the virtual network the silo is connected to. x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_GetSiteSiloVnetConnection.json                                                                                                                                                        |
| [siteSiloVirtualNetworkConnectionsListSiteSiloVnetConnectionsSample.ts][sitesilovirtualnetworkconnectionslistsitesilovnetconnectionssample]                   | lists the virtual network connections of a Web App silo. Returns the singleton virtualNetwork connection when configured, or an empty collection otherwise. x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_ListSiteSiloVnetConnections.json                                             |
| [siteSiloVirtualNetworkConnectionsUpdateSiteSiloVnetConnectionSample.ts][sitesilovirtualnetworkconnectionsupdatesitesilovnetconnectionsample]                 | updates the properties of a virtual network connection on a silo. x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_UpdateSiteSiloVnetConnection.json                                                                                                                                      |

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
node dist/lastKnownGoodResourcesGetLastKnownGoodSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/lastKnownGoodResourcesGetLastKnownGoodSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[lastknowngoodresourcesgetlastknowngoodsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/lastKnownGoodResourcesGetLastKnownGoodSample.ts
[lastknowngoodresourceslistlastknowngoodssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/lastKnownGoodResourcesListLastKnownGoodsSample.ts
[lastknowngoodresourcesmarklastknowngoodsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/lastKnownGoodResourcesMarkLastKnownGoodSample.ts
[managedtrafficconfigresourcesgetmanagedtrafficconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/managedTrafficConfigResourcesGetManagedTrafficConfigSample.ts
[managedtrafficconfigresourceslistmanagedtrafficconfigssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/managedTrafficConfigResourcesListManagedTrafficConfigsSample.ts
[managedtrafficconfigresourcesupdatemanagedtrafficconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/managedTrafficConfigResourcesUpdateManagedTrafficConfigSample.ts
[serverfarmsiloresourcescreateorupdateserverfarmsilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/serverFarmSiloResourcesCreateOrUpdateServerFarmSiloSample.ts
[serverfarmsiloresourcesdeleteserverfarmsilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/serverFarmSiloResourcesDeleteServerFarmSiloSample.ts
[serverfarmsiloresourcesgetserverfarmsilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/serverFarmSiloResourcesGetServerFarmSiloSample.ts
[serverfarmsiloresourcesgetserverfarmsilovnetintegrationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/serverFarmSiloResourcesGetServerFarmSiloVnetIntegrationsSample.ts
[serverfarmsiloresourceslistserverfarmsilossample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/serverFarmSiloResourcesListServerFarmSilosSample.ts
[serverfarmsiloresourcesupdateserverfarmsilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/serverFarmSiloResourcesUpdateServerFarmSiloSample.ts
[sitesiloresourcescreateorupdatesitesilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloResourcesCreateOrUpdateSiteSiloSample.ts
[sitesiloresourcesdeletesitesilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloResourcesDeleteSiteSiloSample.ts
[sitesiloresourcesgetsitesilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloResourcesGetSiteSiloSample.ts
[sitesiloresourceslistsitesilossample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloResourcesListSiteSilosSample.ts
[sitesiloresourcesrefreshsitesilossample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloResourcesRefreshSiteSilosSample.ts
[sitesiloresourcesupdatesitesilosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloResourcesUpdateSiteSiloSample.ts
[sitesilovirtualnetworkconnectionscreateorupdatesitesilovnetconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloVirtualNetworkConnectionsCreateOrUpdateSiteSiloVnetConnectionSample.ts
[sitesilovirtualnetworkconnectionsdeletesitesilovnetconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloVirtualNetworkConnectionsDeleteSiteSiloVnetConnectionSample.ts
[sitesilovirtualnetworkconnectionsgetsitesilovnetconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloVirtualNetworkConnectionsGetSiteSiloVnetConnectionSample.ts
[sitesilovirtualnetworkconnectionslistsitesilovnetconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloVirtualNetworkConnectionsListSiteSiloVnetConnectionsSample.ts
[sitesilovirtualnetworkconnectionsupdatesitesilovnetconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice/samples/v19/typescript/src/siteSiloVirtualNetworkConnectionsUpdateSiteSiloVnetConnectionSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-appservice
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appservice/arm-appservice/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

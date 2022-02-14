# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [capabilitiesList.js][capabilitieslist]                                                   | Get capabilities at specified location in a given subscription. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/CapabilitiesByLocation.json                                                                                    |
| [configurationGet.js][configurationget]                                                   | Gets information about a configuration of server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ConfigurationGet.json                                                                                                        |
| [configurationList.js][configurationlist]                                                 | List all the configurations in a given server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ConfigurationListByServer.json                                                                                                  |
| [createADatabase.js][createadatabase]                                                     | Creates a new database or updates an existing database. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/DatabaseCreate.json                                                                                                    |
| [createADatabaseAsAPointInTimeRestore.js][createadatabaseasapointintimerestore]           | Creates a new server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerCreatePointInTimeRestore.json                                                                                                                      |
| [createANewServer.js][createanewserver]                                                   | Creates a new server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerCreate.json                                                                                                                                        |
| [deleteADatabase.js][deleteadatabase]                                                     | Deletes a database. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/DatabaseDelete.json                                                                                                                                        |
| [firewallRuleCreate.js][firewallrulecreate]                                               | Creates a new firewall rule or updates an existing firewall rule. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/FirewallRuleCreate.json                                                                                      |
| [firewallRuleDelete.js][firewallruledelete]                                               | Deletes a PostgreSQL server firewall rule. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/FirewallRuleDelete.json                                                                                                             |
| [firewallRuleList.js][firewallrulelist]                                                   | List all the firewall rules in a given PostgreSQL server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/FirewallRuleListByServer.json                                                                                        |
| [getADatabase.js][getadatabase]                                                           | Gets information about a database. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/DatabaseGet.json                                                                                                                            |
| [getPrivateDnsZoneSuffix.js][getprivatednszonesuffix]                                     | Get private DNS zone suffix in the cloud x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/GetPrivateDnsZoneSuffix.json                                                                                                          |
| [listDatabasesInAServer.js][listdatabasesinaserver]                                       | List all the databases in a given server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/DatabasesListByServer.json                                                                                                           |
| [nameAvailability.js][nameavailability]                                                   | Check the availability of name for resource x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/CheckNameAvailability.json                                                                                                         |
| [operationList.js][operationlist]                                                         | Lists all of the available REST API operations. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/OperationList.json                                                                                                             |
| [serverDelete.js][serverdelete]                                                           | Deletes a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerDelete.json                                                                                                                                            |
| [serverGet.js][serverget]                                                                 | Gets information about a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerGet.json                                                                                                                                |
| [serverGetWithVnet.js][servergetwithvnet]                                                 | Gets information about a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerGetWithVnet.json                                                                                                                        |
| [serverList.js][serverlist]                                                               | List all the servers in a given subscription. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerList.json                                                                                                                  |
| [serverListByResourceGroup.js][serverlistbyresourcegroup]                                 | List all the servers in a given resource group. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerListByResourceGroup.json                                                                                                 |
| [serverRestart.js][serverrestart]                                                         | Restarts a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerRestart.json                                                                                                                                          |
| [serverRestartWithFailover.js][serverrestartwithfailover]                                 | Restarts a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerRestartWithFailover.json                                                                                                                              |
| [serverStart.js][serverstart]                                                             | Starts a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerStart.json                                                                                                                                              |
| [serverStop.js][serverstop]                                                               | Stops a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerStop.json                                                                                                                                                |
| [serverUpdate.js][serverupdate]                                                           | Updates an existing server. The request body can contain one to many of the properties present in the normal server definition. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerUpdate.json                              |
| [serverUpdateWithCustomerMaintenanceWindow.js][serverupdatewithcustomermaintenancewindow] | Updates an existing server. The request body can contain one to many of the properties present in the normal server definition. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerUpdateWithCustomerMaintenanceWindow.json |
| [updateAUserConfiguration.js][updateauserconfiguration]                                   | Updates a configuration of a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ConfigurationUpdate.json                                                                                                                  |
| [virtualNetworkSubnetUsageList.js][virtualnetworksubnetusagelist]                         | Get virtual network subnet usage for a given vNet resource id. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/VirtualNetworkSubnetUsage.json                                                                                  |

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
node capabilitiesList.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node capabilitiesList.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[capabilitieslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/capabilitiesList.js
[configurationget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/configurationGet.js
[configurationlist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/configurationList.js
[createadatabase]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/createADatabase.js
[createadatabaseasapointintimerestore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/createADatabaseAsAPointInTimeRestore.js
[createanewserver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/createANewServer.js
[deleteadatabase]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/deleteADatabase.js
[firewallrulecreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/firewallRuleCreate.js
[firewallruledelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/firewallRuleDelete.js
[firewallrulelist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/firewallRuleList.js
[getadatabase]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/getADatabase.js
[getprivatednszonesuffix]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/getPrivateDnsZoneSuffix.js
[listdatabasesinaserver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/listDatabasesInAServer.js
[nameavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/nameAvailability.js
[operationlist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/operationList.js
[serverdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverDelete.js
[serverget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverGet.js
[servergetwithvnet]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverGetWithVnet.js
[serverlist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverList.js
[serverlistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverListByResourceGroup.js
[serverrestart]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverRestart.js
[serverrestartwithfailover]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverRestartWithFailover.js
[serverstart]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverStart.js
[serverstop]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverStop.js
[serverupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverUpdate.js
[serverupdatewithcustomermaintenancewindow]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/serverUpdateWithCustomerMaintenanceWindow.js
[updateauserconfiguration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/updateAUserConfiguration.js
[virtualnetworksubnetusagelist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/javascript/virtualNetworkSubnetUsageList.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-postgresql-flexible?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/postgresql/arm-postgresql-flexible/README.md

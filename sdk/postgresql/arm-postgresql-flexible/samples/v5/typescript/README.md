# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [capabilitiesList.ts][capabilitieslist]                                                   | Get capabilities at specified location in a given subscription. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/CapabilitiesByLocation.json                                                                                    |
| [configurationGet.ts][configurationget]                                                   | Gets information about a configuration of server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ConfigurationGet.json                                                                                                        |
| [configurationList.ts][configurationlist]                                                 | List all the configurations in a given server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ConfigurationListByServer.json                                                                                                  |
| [createADatabase.ts][createadatabase]                                                     | Creates a new database or updates an existing database. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/DatabaseCreate.json                                                                                                    |
| [createADatabaseAsAPointInTimeRestore.ts][createadatabaseasapointintimerestore]           | Creates a new server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerCreatePointInTimeRestore.json                                                                                                                      |
| [createANewServer.ts][createanewserver]                                                   | Creates a new server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerCreate.json                                                                                                                                        |
| [deleteADatabase.ts][deleteadatabase]                                                     | Deletes a database. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/DatabaseDelete.json                                                                                                                                        |
| [firewallRuleCreate.ts][firewallrulecreate]                                               | Creates a new firewall rule or updates an existing firewall rule. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/FirewallRuleCreate.json                                                                                      |
| [firewallRuleDelete.ts][firewallruledelete]                                               | Deletes a PostgreSQL server firewall rule. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/FirewallRuleDelete.json                                                                                                             |
| [firewallRuleList.ts][firewallrulelist]                                                   | List all the firewall rules in a given PostgreSQL server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/FirewallRuleListByServer.json                                                                                        |
| [getADatabase.ts][getadatabase]                                                           | Gets information about a database. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/DatabaseGet.json                                                                                                                            |
| [getPrivateDnsZoneSuffix.ts][getprivatednszonesuffix]                                     | Get private DNS zone suffix in the cloud x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/GetPrivateDnsZoneSuffix.json                                                                                                          |
| [listDatabasesInAServer.ts][listdatabasesinaserver]                                       | List all the databases in a given server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/DatabasesListByServer.json                                                                                                           |
| [nameAvailability.ts][nameavailability]                                                   | Check the availability of name for resource x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/CheckNameAvailability.json                                                                                                         |
| [operationList.ts][operationlist]                                                         | Lists all of the available REST API operations. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/OperationList.json                                                                                                             |
| [serverDelete.ts][serverdelete]                                                           | Deletes a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerDelete.json                                                                                                                                            |
| [serverGet.ts][serverget]                                                                 | Gets information about a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerGet.json                                                                                                                                |
| [serverGetWithVnet.ts][servergetwithvnet]                                                 | Gets information about a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerGetWithVnet.json                                                                                                                        |
| [serverList.ts][serverlist]                                                               | List all the servers in a given subscription. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerList.json                                                                                                                  |
| [serverListByResourceGroup.ts][serverlistbyresourcegroup]                                 | List all the servers in a given resource group. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerListByResourceGroup.json                                                                                                 |
| [serverRestart.ts][serverrestart]                                                         | Restarts a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerRestart.json                                                                                                                                          |
| [serverRestartWithFailover.ts][serverrestartwithfailover]                                 | Restarts a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerRestartWithFailover.json                                                                                                                              |
| [serverStart.ts][serverstart]                                                             | Starts a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerStart.json                                                                                                                                              |
| [serverStop.ts][serverstop]                                                               | Stops a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerStop.json                                                                                                                                                |
| [serverUpdate.ts][serverupdate]                                                           | Updates an existing server. The request body can contain one to many of the properties present in the normal server definition. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerUpdate.json                              |
| [serverUpdateWithCustomerMaintenanceWindow.ts][serverupdatewithcustomermaintenancewindow] | Updates an existing server. The request body can contain one to many of the properties present in the normal server definition. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ServerUpdateWithCustomerMaintenanceWindow.json |
| [updateAUserConfiguration.ts][updateauserconfiguration]                                   | Updates a configuration of a server. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/ConfigurationUpdate.json                                                                                                                  |
| [virtualNetworkSubnetUsageList.ts][virtualnetworksubnetusagelist]                         | Get virtual network subnet usage for a given vNet resource id. x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2021-06-01/examples/VirtualNetworkSubnetUsage.json                                                                                  |

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
node dist/capabilitiesList.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/capabilitiesList.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[capabilitieslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/capabilitiesList.ts
[configurationget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/configurationGet.ts
[configurationlist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/configurationList.ts
[createadatabase]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/createADatabase.ts
[createadatabaseasapointintimerestore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/createADatabaseAsAPointInTimeRestore.ts
[createanewserver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/createANewServer.ts
[deleteadatabase]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/deleteADatabase.ts
[firewallrulecreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/firewallRuleCreate.ts
[firewallruledelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/firewallRuleDelete.ts
[firewallrulelist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/firewallRuleList.ts
[getadatabase]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/getADatabase.ts
[getprivatednszonesuffix]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/getPrivateDnsZoneSuffix.ts
[listdatabasesinaserver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/listDatabasesInAServer.ts
[nameavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/nameAvailability.ts
[operationlist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/operationList.ts
[serverdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverDelete.ts
[serverget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverGet.ts
[servergetwithvnet]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverGetWithVnet.ts
[serverlist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverList.ts
[serverlistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverListByResourceGroup.ts
[serverrestart]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverRestart.ts
[serverrestartwithfailover]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverRestartWithFailover.ts
[serverstart]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverStart.ts
[serverstop]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverStop.ts
[serverupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverUpdate.ts
[serverupdatewithcustomermaintenancewindow]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/serverUpdateWithCustomerMaintenanceWindow.ts
[updateauserconfiguration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/updateAUserConfiguration.ts
[virtualnetworksubnetusagelist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/arm-postgresql-flexible/samples/v5/typescript/src/virtualNetworkSubnetUsageList.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-postgresql-flexible?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/postgresql/arm-postgresql-flexible/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

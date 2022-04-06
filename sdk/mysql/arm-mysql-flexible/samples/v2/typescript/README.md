# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [backupsGetSample.ts][backupsgetsample]                                                       | List all the backups for a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/BackupGet.json                                                                                           |
| [backupsListByServerSample.ts][backupslistbyserversample]                                     | List all the backups for a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/BackupsListByServer.json                                                                                 |
| [checkNameAvailabilityExecuteSample.ts][checknameavailabilityexecutesample]                   | Check the availability of name for server x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/CheckNameAvailability.json                                                                              |
| [checkVirtualNetworkSubnetUsageExecuteSample.ts][checkvirtualnetworksubnetusageexecutesample] | Get virtual network subnet usage for a given vNet resource id. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/CheckVirtualNetworkSubnetUsage.json                                                |
| [configurationsBatchUpdateSample.ts][configurationsbatchupdatesample]                         | Update a list of configurations in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ConfigurationsBatchUpdate.json                                                                 |
| [configurationsGetSample.ts][configurationsgetsample]                                         | Gets information about a configuration of server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ConfigurationGet.json                                                                           |
| [configurationsListByServerSample.ts][configurationslistbyserversample]                       | List all the configurations in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ConfigurationsListByServer.json                                                                    |
| [configurationsUpdateSample.ts][configurationsupdatesample]                                   | Updates a configuration of a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ConfigurationUpdate.json                                                                                     |
| [databasesCreateOrUpdateSample.ts][databasescreateorupdatesample]                             | Creates a new database or updates an existing database. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/DatabaseCreate.json                                                                       |
| [databasesDeleteSample.ts][databasesdeletesample]                                             | Deletes a database. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/DatabaseDelete.json                                                                                                           |
| [databasesGetSample.ts][databasesgetsample]                                                   | Gets information about a database. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/DatabaseGet.json                                                                                               |
| [databasesListByServerSample.ts][databaseslistbyserversample]                                 | List all the databases in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/DatabasesListByServer.json                                                                              |
| [firewallRulesCreateOrUpdateSample.ts][firewallrulescreateorupdatesample]                     | Creates a new firewall rule or updates an existing firewall rule. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/FirewallRuleCreate.json                                                         |
| [firewallRulesDeleteSample.ts][firewallrulesdeletesample]                                     | Deletes a firewall rule. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/FirewallRuleDelete.json                                                                                                  |
| [firewallRulesGetSample.ts][firewallrulesgetsample]                                           | Gets information about a server firewall rule. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/FirewallRuleGet.json                                                                               |
| [firewallRulesListByServerSample.ts][firewallruleslistbyserversample]                         | List all the firewall rules in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/FirewallRulesListByServer.json                                                                     |
| [getPrivateDnsZoneSuffixExecuteSample.ts][getprivatednszonesuffixexecutesample]               | Get private DNS zone suffix in the cloud. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/GetPrivateDnsZoneSuffix.json                                                                            |
| [locationBasedCapabilitiesListSample.ts][locationbasedcapabilitieslistsample]                 | Get capabilities at specified location in a given subscription. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/CapabilitiesByLocationList.json                                                   |
| [operationsListSample.ts][operationslistsample]                                               | Lists all of the available REST API operations. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/OperationsList.json                                                                               |
| [replicasListByServerSample.ts][replicaslistbyserversample]                                   | List all the replicas for a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ReplicasListByServer.json                                                                               |
| [serversCreateSample.ts][serverscreatesample]                                                 | Creates a new server or updates an existing server. The update action will overwrite the existing server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ServerCreate.json                       |
| [serversDeleteSample.ts][serversdeletesample]                                                 | Deletes a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ServerDelete.json                                                                                                               |
| [serversFailoverSample.ts][serversfailoversample]                                             | Manual failover a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ServerFailover.json                                                                                                     |
| [serversGetSample.ts][serversgetsample]                                                       | Gets information about a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ServerGet.json                                                                                                   |
| [serversListByResourceGroupSample.ts][serverslistbyresourcegroupsample]                       | List all the servers in a given resource group. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ServersListByResourceGroup.json                                                                   |
| [serversListSample.ts][serverslistsample]                                                     | List all the servers in a given subscription. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ServersList.json                                                                                    |
| [serversRestartSample.ts][serversrestartsample]                                               | Restarts a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ServerRestart.json                                                                                                             |
| [serversStartSample.ts][serversstartsample]                                                   | Starts a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ServerStart.json                                                                                                                 |
| [serversStopSample.ts][serversstopsample]                                                     | Stops a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ServerStop.json                                                                                                                   |
| [serversUpdateSample.ts][serversupdatesample]                                                 | Updates an existing server. The request body can contain one to many of the properties present in the normal server definition. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2021-05-01/examples/ServerUpdate.json |

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
node dist/backupsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/backupsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[backupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/backupsGetSample.ts
[backupslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/backupsListByServerSample.ts
[checknameavailabilityexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/checkNameAvailabilityExecuteSample.ts
[checkvirtualnetworksubnetusageexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/checkVirtualNetworkSubnetUsageExecuteSample.ts
[configurationsbatchupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/configurationsBatchUpdateSample.ts
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/configurationsGetSample.ts
[configurationslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/configurationsListByServerSample.ts
[configurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/configurationsUpdateSample.ts
[databasescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/databasesCreateOrUpdateSample.ts
[databasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/databasesDeleteSample.ts
[databasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/databasesGetSample.ts
[databaseslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/databasesListByServerSample.ts
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/firewallRulesCreateOrUpdateSample.ts
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/firewallRulesDeleteSample.ts
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/firewallRulesGetSample.ts
[firewallruleslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/firewallRulesListByServerSample.ts
[getprivatednszonesuffixexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/getPrivateDnsZoneSuffixExecuteSample.ts
[locationbasedcapabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/locationBasedCapabilitiesListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/operationsListSample.ts
[replicaslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/replicasListByServerSample.ts
[serverscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/serversCreateSample.ts
[serversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/serversDeleteSample.ts
[serversfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/serversFailoverSample.ts
[serversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/serversGetSample.ts
[serverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/serversListByResourceGroupSample.ts
[serverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/serversListSample.ts
[serversrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/serversRestartSample.ts
[serversstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/serversStartSample.ts
[serversstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/serversStopSample.ts
[serversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v2/typescript/src/serversUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-mysql-flexible?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mysql/arm-mysql-flexible/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

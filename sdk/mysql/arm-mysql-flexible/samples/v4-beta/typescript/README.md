# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureAdAdministratorsCreateOrUpdateSample.ts][azureadadministratorscreateorupdatesample]                 | Creates or updates an existing Azure Active Directory administrator. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/AAD/preview/2021-12-01-preview/examples/AzureADAdministratorCreate.json                                                          |
| [azureAdAdministratorsDeleteSample.ts][azureadadministratorsdeletesample]                                 | Deletes an Azure AD Administrator. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/AAD/preview/2021-12-01-preview/examples/AzureADAdministratorDelete.json                                                                                            |
| [azureAdAdministratorsGetSample.ts][azureadadministratorsgetsample]                                       | Gets information about an azure ad administrator. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/AAD/preview/2021-12-01-preview/examples/AzureADAdministratorGet.json                                                                                |
| [azureAdAdministratorsListByServerSample.ts][azureadadministratorslistbyserversample]                     | List all the AAD administrators in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/AAD/preview/2021-12-01-preview/examples/AzureADAdministratorsListByServer.json                                                                     |
| [backupAndExportCreateSample.ts][backupandexportcreatesample]                                             | Exports the backup of the given server by creating a backup if not existing. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2022-09-30-preview/examples/BackupAndExport.json                                                         |
| [backupAndExportValidateBackupSample.ts][backupandexportvalidatebackupsample]                             | Validates if backup can be performed for given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2022-09-30-preview/examples/ValidateBackup.json                                                                                |
| [backupsGetSample.ts][backupsgetsample]                                                                   | List all the backups for a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2022-09-30-preview/examples/BackupGet.json                                                                                                   |
| [backupsListByServerSample.ts][backupslistbyserversample]                                                 | List all the backups for a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2022-09-30-preview/examples/BackupsListByServer.json                                                                                         |
| [backupsPutSample.ts][backupsputsample]                                                                   | Create backup for a given server with specified backup name. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2022-09-30-preview/examples/BackupPut.json                                                                               |
| [checkNameAvailabilityExecuteSample.ts][checknameavailabilityexecutesample]                               | Check the availability of name for server x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/CheckNameAvailability.json                                                                            |
| [checkNameAvailabilityWithoutLocationExecuteSample.ts][checknameavailabilitywithoutlocationexecutesample] | Check the availability of name for server x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/CheckNameAvailability.json                                                                            |
| [checkVirtualNetworkSubnetUsageExecuteSample.ts][checkvirtualnetworksubnetusageexecutesample]             | Get virtual network subnet usage for a given vNet resource id. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/CheckVirtualNetworkSubnetUsage.json                                              |
| [configurationsBatchUpdateSample.ts][configurationsbatchupdatesample]                                     | Update a list of configurations in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2021-12-01-preview/examples/ConfigurationsBatchUpdate.json                                                                  |
| [configurationsCreateOrUpdateSample.ts][configurationscreateorupdatesample]                               | Updates a configuration of a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2021-12-01-preview/examples/ConfigurationCreateOrUpdate.json                                                                              |
| [configurationsGetSample.ts][configurationsgetsample]                                                     | Gets information about a configuration of server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2021-12-01-preview/examples/ConfigurationGet.json                                                                            |
| [configurationsListByServerSample.ts][configurationslistbyserversample]                                   | List all the configurations in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2021-12-01-preview/examples/ConfigurationsListByServer.json                                                                     |
| [configurationsUpdateSample.ts][configurationsupdatesample]                                               | Updates a configuration of a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2021-12-01-preview/examples/ConfigurationUpdate.json                                                                                      |
| [databasesCreateOrUpdateSample.ts][databasescreateorupdatesample]                                         | Creates a new database or updates an existing database. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Databases/preview/2021-12-01-preview/examples/DatabaseCreate.json                                                                             |
| [databasesDeleteSample.ts][databasesdeletesample]                                                         | Deletes a database. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Databases/preview/2021-12-01-preview/examples/DatabaseDelete.json                                                                                                                 |
| [databasesGetSample.ts][databasesgetsample]                                                               | Gets information about a database. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Databases/preview/2021-12-01-preview/examples/DatabaseGet.json                                                                                                     |
| [databasesListByServerSample.ts][databaseslistbyserversample]                                             | List all the databases in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Databases/preview/2021-12-01-preview/examples/DatabasesListByServer.json                                                                                    |
| [firewallRulesCreateOrUpdateSample.ts][firewallrulescreateorupdatesample]                                 | Creates a new firewall rule or updates an existing firewall rule. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Firewall/preview/2021-12-01-preview/examples/FirewallRuleCreate.json                                                                |
| [firewallRulesDeleteSample.ts][firewallrulesdeletesample]                                                 | Deletes a firewall rule. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Firewall/preview/2021-12-01-preview/examples/FirewallRuleDelete.json                                                                                                         |
| [firewallRulesGetSample.ts][firewallrulesgetsample]                                                       | Gets information about a server firewall rule. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Firewall/preview/2021-12-01-preview/examples/FirewallRuleGet.json                                                                                      |
| [firewallRulesListByServerSample.ts][firewallruleslistbyserversample]                                     | List all the firewall rules in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Firewall/preview/2021-12-01-preview/examples/FirewallRulesListByServer.json                                                                            |
| [getPrivateDnsZoneSuffixExecuteSample.ts][getprivatednszonesuffixexecutesample]                           | Get private DNS zone suffix in the cloud. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/GetPrivateDnsZoneSuffix.json                                                                          |
| [locationBasedCapabilitiesListSample.ts][locationbasedcapabilitieslistsample]                             | Get capabilities at specified location in a given subscription. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/CapabilitiesByLocationList.json                                                 |
| [logFilesListByServerSample.ts][logfileslistbyserversample]                                               | List all the server log files in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/LogFiles/preview/2021-12-01-preview/examples/LogFilesListByServer.json                                                                               |
| [operationsListSample.ts][operationslistsample]                                                           | Lists all of the available REST API operations. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/OperationsList.json                                                                             |
| [replicasListByServerSample.ts][replicaslistbyserversample]                                               | List all the replicas for a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ReplicasListByServer.json                                                                               |
| [serversCreateSample.ts][serverscreatesample]                                                             | Creates a new server or updates an existing server. The update action will overwrite the existing server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerCreate.json                       |
| [serversDeleteSample.ts][serversdeletesample]                                                             | Deletes a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerDelete.json                                                                                                               |
| [serversFailoverSample.ts][serversfailoversample]                                                         | Manual failover a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerFailover.json                                                                                                     |
| [serversGetSample.ts][serversgetsample]                                                                   | Gets information about a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerGet.json                                                                                                   |
| [serversListByResourceGroupSample.ts][serverslistbyresourcegroupsample]                                   | List all the servers in a given resource group. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServersListByResourceGroup.json                                                                   |
| [serversListSample.ts][serverslistsample]                                                                 | List all the servers in a given subscription. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServersList.json                                                                                    |
| [serversResetGtidSample.ts][serversresetgtidsample]                                                       | Resets GTID on a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerResetGtid.json                                                                                                     |
| [serversRestartSample.ts][serversrestartsample]                                                           | Restarts a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerRestart.json                                                                                                             |
| [serversStartSample.ts][serversstartsample]                                                               | Starts a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerStart.json                                                                                                                 |
| [serversStopSample.ts][serversstopsample]                                                                 | Stops a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerStop.json                                                                                                                   |
| [serversUpdateSample.ts][serversupdatesample]                                                             | Updates an existing server. The request body can contain one to many of the properties present in the normal server definition. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerUpdate.json |

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
node dist/azureAdAdministratorsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MYSQL_SUBSCRIPTION_ID="<mysql subscription id>" MYSQL_RESOURCE_GROUP="<mysql resource group>" node dist/azureAdAdministratorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azureadadministratorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/azureAdAdministratorsCreateOrUpdateSample.ts
[azureadadministratorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/azureAdAdministratorsDeleteSample.ts
[azureadadministratorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/azureAdAdministratorsGetSample.ts
[azureadadministratorslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/azureAdAdministratorsListByServerSample.ts
[backupandexportcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/backupAndExportCreateSample.ts
[backupandexportvalidatebackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/backupAndExportValidateBackupSample.ts
[backupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/backupsGetSample.ts
[backupslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/backupsListByServerSample.ts
[backupsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/backupsPutSample.ts
[checknameavailabilityexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/checkNameAvailabilityExecuteSample.ts
[checknameavailabilitywithoutlocationexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/checkNameAvailabilityWithoutLocationExecuteSample.ts
[checkvirtualnetworksubnetusageexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/checkVirtualNetworkSubnetUsageExecuteSample.ts
[configurationsbatchupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/configurationsBatchUpdateSample.ts
[configurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/configurationsCreateOrUpdateSample.ts
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/configurationsGetSample.ts
[configurationslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/configurationsListByServerSample.ts
[configurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/configurationsUpdateSample.ts
[databasescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/databasesCreateOrUpdateSample.ts
[databasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/databasesDeleteSample.ts
[databasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/databasesGetSample.ts
[databaseslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/databasesListByServerSample.ts
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/firewallRulesCreateOrUpdateSample.ts
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/firewallRulesDeleteSample.ts
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/firewallRulesGetSample.ts
[firewallruleslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/firewallRulesListByServerSample.ts
[getprivatednszonesuffixexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/getPrivateDnsZoneSuffixExecuteSample.ts
[locationbasedcapabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/locationBasedCapabilitiesListSample.ts
[logfileslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/logFilesListByServerSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/operationsListSample.ts
[replicaslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/replicasListByServerSample.ts
[serverscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversCreateSample.ts
[serversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversDeleteSample.ts
[serversfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversFailoverSample.ts
[serversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversGetSample.ts
[serverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversListByResourceGroupSample.ts
[serverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversListSample.ts
[serversresetgtidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversResetGtidSample.ts
[serversrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversRestartSample.ts
[serversstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversStartSample.ts
[serversstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversStopSample.ts
[serversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-mysql-flexible?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mysql/arm-mysql-flexible/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

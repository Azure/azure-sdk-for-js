# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureAdAdministratorsCreateOrUpdateSample.js][azureadadministratorscreateorupdatesample]                 | Creates or updates an existing Azure Active Directory administrator. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/AAD/preview/2021-12-01-preview/examples/AzureADAdministratorCreate.json                                                          |
| [azureAdAdministratorsDeleteSample.js][azureadadministratorsdeletesample]                                 | Deletes an Azure AD Administrator. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/AAD/preview/2021-12-01-preview/examples/AzureADAdministratorDelete.json                                                                                            |
| [azureAdAdministratorsGetSample.js][azureadadministratorsgetsample]                                       | Gets information about an azure ad administrator. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/AAD/preview/2021-12-01-preview/examples/AzureADAdministratorGet.json                                                                                |
| [azureAdAdministratorsListByServerSample.js][azureadadministratorslistbyserversample]                     | List all the AAD administrators in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/AAD/preview/2021-12-01-preview/examples/AzureADAdministratorsListByServer.json                                                                     |
| [backupAndExportCreateSample.js][backupandexportcreatesample]                                             | Exports the backup of the given server by creating a backup if not existing. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2022-09-30-preview/examples/BackupAndExport.json                                                         |
| [backupAndExportValidateBackupSample.js][backupandexportvalidatebackupsample]                             | Validates if backup can be performed for given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2022-09-30-preview/examples/ValidateBackup.json                                                                                |
| [backupsGetSample.js][backupsgetsample]                                                                   | List all the backups for a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2022-09-30-preview/examples/BackupGet.json                                                                                                   |
| [backupsListByServerSample.js][backupslistbyserversample]                                                 | List all the backups for a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2022-09-30-preview/examples/BackupsListByServer.json                                                                                         |
| [backupsPutSample.js][backupsputsample]                                                                   | Create backup for a given server with specified backup name. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2022-09-30-preview/examples/BackupPut.json                                                                               |
| [checkNameAvailabilityExecuteSample.js][checknameavailabilityexecutesample]                               | Check the availability of name for server x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/CheckNameAvailability.json                                                                            |
| [checkNameAvailabilityWithoutLocationExecuteSample.js][checknameavailabilitywithoutlocationexecutesample] | Check the availability of name for server x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/CheckNameAvailability.json                                                                            |
| [checkVirtualNetworkSubnetUsageExecuteSample.js][checkvirtualnetworksubnetusageexecutesample]             | Get virtual network subnet usage for a given vNet resource id. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/CheckVirtualNetworkSubnetUsage.json                                              |
| [configurationsBatchUpdateSample.js][configurationsbatchupdatesample]                                     | Update a list of configurations in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2021-12-01-preview/examples/ConfigurationsBatchUpdate.json                                                                  |
| [configurationsCreateOrUpdateSample.js][configurationscreateorupdatesample]                               | Updates a configuration of a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2021-12-01-preview/examples/ConfigurationCreateOrUpdate.json                                                                              |
| [configurationsGetSample.js][configurationsgetsample]                                                     | Gets information about a configuration of server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2021-12-01-preview/examples/ConfigurationGet.json                                                                            |
| [configurationsListByServerSample.js][configurationslistbyserversample]                                   | List all the configurations in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2021-12-01-preview/examples/ConfigurationsListByServer.json                                                                     |
| [configurationsUpdateSample.js][configurationsupdatesample]                                               | Updates a configuration of a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2021-12-01-preview/examples/ConfigurationUpdate.json                                                                                      |
| [databasesCreateOrUpdateSample.js][databasescreateorupdatesample]                                         | Creates a new database or updates an existing database. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Databases/preview/2021-12-01-preview/examples/DatabaseCreate.json                                                                             |
| [databasesDeleteSample.js][databasesdeletesample]                                                         | Deletes a database. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Databases/preview/2021-12-01-preview/examples/DatabaseDelete.json                                                                                                                 |
| [databasesGetSample.js][databasesgetsample]                                                               | Gets information about a database. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Databases/preview/2021-12-01-preview/examples/DatabaseGet.json                                                                                                     |
| [databasesListByServerSample.js][databaseslistbyserversample]                                             | List all the databases in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Databases/preview/2021-12-01-preview/examples/DatabasesListByServer.json                                                                                    |
| [firewallRulesCreateOrUpdateSample.js][firewallrulescreateorupdatesample]                                 | Creates a new firewall rule or updates an existing firewall rule. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Firewall/preview/2021-12-01-preview/examples/FirewallRuleCreate.json                                                                |
| [firewallRulesDeleteSample.js][firewallrulesdeletesample]                                                 | Deletes a firewall rule. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Firewall/preview/2021-12-01-preview/examples/FirewallRuleDelete.json                                                                                                         |
| [firewallRulesGetSample.js][firewallrulesgetsample]                                                       | Gets information about a server firewall rule. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Firewall/preview/2021-12-01-preview/examples/FirewallRuleGet.json                                                                                      |
| [firewallRulesListByServerSample.js][firewallruleslistbyserversample]                                     | List all the firewall rules in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Firewall/preview/2021-12-01-preview/examples/FirewallRulesListByServer.json                                                                            |
| [getPrivateDnsZoneSuffixExecuteSample.js][getprivatednszonesuffixexecutesample]                           | Get private DNS zone suffix in the cloud. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/GetPrivateDnsZoneSuffix.json                                                                          |
| [locationBasedCapabilitiesListSample.js][locationbasedcapabilitieslistsample]                             | Get capabilities at specified location in a given subscription. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/CapabilitiesByLocationList.json                                                 |
| [logFilesListByServerSample.js][logfileslistbyserversample]                                               | List all the server log files in a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/LogFiles/preview/2021-12-01-preview/examples/LogFilesListByServer.json                                                                               |
| [operationsListSample.js][operationslistsample]                                                           | Lists all of the available REST API operations. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/preview/2021-12-01-preview/examples/OperationsList.json                                                                             |
| [replicasListByServerSample.js][replicaslistbyserversample]                                               | List all the replicas for a given server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ReplicasListByServer.json                                                                               |
| [serversCreateSample.js][serverscreatesample]                                                             | Creates a new server or updates an existing server. The update action will overwrite the existing server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerCreate.json                       |
| [serversDeleteSample.js][serversdeletesample]                                                             | Deletes a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerDelete.json                                                                                                               |
| [serversFailoverSample.js][serversfailoversample]                                                         | Manual failover a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerFailover.json                                                                                                     |
| [serversGetSample.js][serversgetsample]                                                                   | Gets information about a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerGet.json                                                                                                   |
| [serversListByResourceGroupSample.js][serverslistbyresourcegroupsample]                                   | List all the servers in a given resource group. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServersListByResourceGroup.json                                                                   |
| [serversListSample.js][serverslistsample]                                                                 | List all the servers in a given subscription. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServersList.json                                                                                    |
| [serversResetGtidSample.js][serversresetgtidsample]                                                       | Resets GTID on a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerResetGtid.json                                                                                                     |
| [serversRestartSample.js][serversrestartsample]                                                           | Restarts a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerRestart.json                                                                                                             |
| [serversStartSample.js][serversstartsample]                                                               | Starts a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerStart.json                                                                                                                 |
| [serversStopSample.js][serversstopsample]                                                                 | Stops a server. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerStop.json                                                                                                                   |
| [serversUpdateSample.js][serversupdatesample]                                                             | Updates an existing server. The request body can contain one to many of the properties present in the normal server definition. x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/preview/2022-09-30-preview/examples/ServerUpdate.json |

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
node azureAdAdministratorsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MYSQL_SUBSCRIPTION_ID="<mysql subscription id>" MYSQL_RESOURCE_GROUP="<mysql resource group>" node azureAdAdministratorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azureadadministratorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/azureAdAdministratorsCreateOrUpdateSample.js
[azureadadministratorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/azureAdAdministratorsDeleteSample.js
[azureadadministratorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/azureAdAdministratorsGetSample.js
[azureadadministratorslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/azureAdAdministratorsListByServerSample.js
[backupandexportcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/backupAndExportCreateSample.js
[backupandexportvalidatebackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/backupAndExportValidateBackupSample.js
[backupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/backupsGetSample.js
[backupslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/backupsListByServerSample.js
[backupsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/backupsPutSample.js
[checknameavailabilityexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/checkNameAvailabilityExecuteSample.js
[checknameavailabilitywithoutlocationexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/checkNameAvailabilityWithoutLocationExecuteSample.js
[checkvirtualnetworksubnetusageexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/checkVirtualNetworkSubnetUsageExecuteSample.js
[configurationsbatchupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/configurationsBatchUpdateSample.js
[configurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/configurationsCreateOrUpdateSample.js
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/configurationsGetSample.js
[configurationslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/configurationsListByServerSample.js
[configurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/configurationsUpdateSample.js
[databasescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/databasesCreateOrUpdateSample.js
[databasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/databasesDeleteSample.js
[databasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/databasesGetSample.js
[databaseslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/databasesListByServerSample.js
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/firewallRulesCreateOrUpdateSample.js
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/firewallRulesDeleteSample.js
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/firewallRulesGetSample.js
[firewallruleslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/firewallRulesListByServerSample.js
[getprivatednszonesuffixexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/getPrivateDnsZoneSuffixExecuteSample.js
[locationbasedcapabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/locationBasedCapabilitiesListSample.js
[logfileslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/logFilesListByServerSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/operationsListSample.js
[replicaslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/replicasListByServerSample.js
[serverscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversCreateSample.js
[serversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversDeleteSample.js
[serversfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversFailoverSample.js
[serversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversGetSample.js
[serverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversListByResourceGroupSample.js
[serverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversListSample.js
[serversresetgtidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversResetGtidSample.js
[serversrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversRestartSample.js
[serversstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversStartSample.js
[serversstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversStopSample.js
[serversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/javascript/serversUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-mysql-flexible?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mysql/arm-mysql-flexible/README.md

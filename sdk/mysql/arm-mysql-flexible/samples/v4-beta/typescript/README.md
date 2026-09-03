# @azure/arm-mysql-flexible client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-mysql-flexible in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [advancedThreatProtectionSettingsGetSample.ts][advancedthreatprotectionsettingsgetsample]                 | get a server's Advanced Threat Protection state x-ms-original-file: 2025-06-01-preview/AdvancedThreatProtectionSettingsGet.json                                                                                      |
| [advancedThreatProtectionSettingsListSample.ts][advancedthreatprotectionsettingslistsample]               | gets a list of server's Advanced Threat Protection states. x-ms-original-file: 2025-06-01-preview/AdvancedThreatProtectionSettingsList.json                                                                          |
| [advancedThreatProtectionSettingsUpdatePutSample.ts][advancedthreatprotectionsettingsupdateputsample]     | updates a server's Advanced Threat Protection state. x-ms-original-file: 2025-06-01-preview/AdvancedThreatProtectionSettingsPutDisabled.json                                                                         |
| [advancedThreatProtectionSettingsUpdateSample.ts][advancedthreatprotectionsettingsupdatesample]           | updates a server's Advanced Threat Protection state. x-ms-original-file: 2025-06-01-preview/AdvancedThreatProtectionSettingsPatchDisabled.json                                                                       |
| [azureADAdministratorsCreateOrUpdateSample.ts][azureadadministratorscreateorupdatesample]                 | creates or updates an existing Azure Active Directory administrator. x-ms-original-file: 2025-06-01-preview/AzureADAdministratorCreate.json                                                                          |
| [azureADAdministratorsDeleteSample.ts][azureadadministratorsdeletesample]                                 | deletes an Azure AD Administrator. x-ms-original-file: 2025-06-01-preview/AzureADAdministratorDelete.json                                                                                                            |
| [azureADAdministratorsGetSample.ts][azureadadministratorsgetsample]                                       | gets information about an azure ad administrator. x-ms-original-file: 2025-06-01-preview/AzureADAdministratorGet.json                                                                                                |
| [azureADAdministratorsListByServerSample.ts][azureadadministratorslistbyserversample]                     | list all the AAD administrators in a given server. x-ms-original-file: 2025-06-01-preview/AzureADAdministratorsListByServer.json                                                                                     |
| [backupAndExportCreateSample.ts][backupandexportcreatesample]                                             | exports the backup of the given server by creating a backup if not existing. x-ms-original-file: 2025-06-01-preview/BackupAndExport.json                                                                             |
| [backupAndExportValidateBackupSample.ts][backupandexportvalidatebackupsample]                             | validates if backup can be performed for given server. x-ms-original-file: 2025-06-01-preview/ValidateBackup.json                                                                                                    |
| [backupsGetSample.ts][backupsgetsample]                                                                   | list all the backups for a given server. x-ms-original-file: 2025-06-01-preview/BackupGet.json                                                                                                                       |
| [backupsListByServerSample.ts][backupslistbyserversample]                                                 | list all the backups for a given server. x-ms-original-file: 2025-06-01-preview/BackupsListByServer.json                                                                                                             |
| [backupsPutSample.ts][backupsputsample]                                                                   | create backup for a given server with specified backup name. x-ms-original-file: 2025-06-01-preview/BackupPut.json                                                                                                   |
| [checkNameAvailabilityExecuteSample.ts][checknameavailabilityexecutesample]                               | check the availability of name for server x-ms-original-file: 2025-06-01-preview/CheckNameAvailability.json                                                                                                          |
| [checkNameAvailabilityWithoutLocationExecuteSample.ts][checknameavailabilitywithoutlocationexecutesample] | check the availability of name for server x-ms-original-file: 2025-06-01-preview/CheckNameAvailabilityWithoutLocation.json                                                                                           |
| [checkVirtualNetworkSubnetUsageExecuteSample.ts][checkvirtualnetworksubnetusageexecutesample]             | get virtual network subnet usage for a given vNet resource id. x-ms-original-file: 2025-06-01-preview/CheckVirtualNetworkSubnetUsage.json                                                                            |
| [configurationsBatchUpdateSample.ts][configurationsbatchupdatesample]                                     | update a list of configurations in a given server. x-ms-original-file: 2025-06-01-preview/ConfigurationsBatchUpdate.json                                                                                             |
| [configurationsCreateOrUpdateSample.ts][configurationscreateorupdatesample]                               | updates a configuration of a server. x-ms-original-file: 2025-06-01-preview/ConfigurationCreateOrUpdate.json                                                                                                         |
| [configurationsGetSample.ts][configurationsgetsample]                                                     | gets information about a configuration of server. x-ms-original-file: 2025-06-01-preview/ConfigurationGet.json                                                                                                       |
| [configurationsListByServerSample.ts][configurationslistbyserversample]                                   | list all the configurations in a given server. x-ms-original-file: 2025-06-01-preview/ConfigurationsListByServer.json                                                                                                |
| [configurationsUpdateSample.ts][configurationsupdatesample]                                               | updates a configuration of a server. x-ms-original-file: 2025-06-01-preview/ConfigurationUpdate.json                                                                                                                 |
| [databasesCreateOrUpdateSample.ts][databasescreateorupdatesample]                                         | creates a new database or updates an existing database. x-ms-original-file: 2025-06-01-preview/DatabaseCreate.json                                                                                                   |
| [databasesDeleteSample.ts][databasesdeletesample]                                                         | deletes a database. x-ms-original-file: 2025-06-01-preview/DatabaseDelete.json                                                                                                                                       |
| [databasesGetSample.ts][databasesgetsample]                                                               | gets information about a database. x-ms-original-file: 2025-06-01-preview/DatabaseGet.json                                                                                                                           |
| [databasesListByServerSample.ts][databaseslistbyserversample]                                             | list all the databases in a given server. x-ms-original-file: 2025-06-01-preview/DatabasesListByServer.json                                                                                                          |
| [firewallRulesCreateOrUpdateSample.ts][firewallrulescreateorupdatesample]                                 | creates a new firewall rule or updates an existing firewall rule. x-ms-original-file: 2025-06-01-preview/FirewallRuleCreate.json                                                                                     |
| [firewallRulesDeleteSample.ts][firewallrulesdeletesample]                                                 | deletes a firewall rule. x-ms-original-file: 2025-06-01-preview/FirewallRuleDelete.json                                                                                                                              |
| [firewallRulesGetSample.ts][firewallrulesgetsample]                                                       | gets information about a server firewall rule. x-ms-original-file: 2025-06-01-preview/FirewallRuleGet.json                                                                                                           |
| [firewallRulesListByServerSample.ts][firewallruleslistbyserversample]                                     | list all the firewall rules in a given server. x-ms-original-file: 2025-06-01-preview/FirewallRulesListByServer.json                                                                                                 |
| [getPrivateDnsZoneSuffixExecuteSample.ts][getprivatednszonesuffixexecutesample]                           | get private DNS zone suffix in the cloud. x-ms-original-file: 2025-06-01-preview/GetPrivateDnsZoneSuffix.json                                                                                                        |
| [locationBasedCapabilitiesListSample.ts][locationbasedcapabilitieslistsample]                             | get capabilities at specified location in a given subscription. x-ms-original-file: 2025-06-01-preview/CapabilitiesByLocationList.json                                                                               |
| [locationBasedCapabilitySetGetSample.ts][locationbasedcapabilitysetgetsample]                             | get capabilities at specified location in a given subscription. x-ms-original-file: 2025-06-01-preview/CapabilitySetByLocation.json                                                                                  |
| [locationBasedCapabilitySetListSample.ts][locationbasedcapabilitysetlistsample]                           | get capabilities at specified location in a given subscription. x-ms-original-file: 2025-06-01-preview/CapabilitySetListByLocation.json                                                                              |
| [logFilesListByServerSample.ts][logfileslistbyserversample]                                               | list all the server log files in a given server. x-ms-original-file: 2025-06-01-preview/LogFilesListByServer.json                                                                                                    |
| [longRunningBackupCreateSample.ts][longrunningbackupcreatesample]                                         | create backup for a given server with specified backup name. x-ms-original-file: 2025-06-01-preview/LongRunningBackup.json                                                                                           |
| [longRunningBackupDeleteSample.ts][longrunningbackupdeletesample]                                         | delete backup for a given server with specified backup name x-ms-original-file: 2025-06-01-preview/LongRunningBackupDelete.json                                                                                      |
| [longRunningBackupsGetSample.ts][longrunningbackupsgetsample]                                             | get backup for a given server. x-ms-original-file: 2025-06-01-preview/LongRunningBackupGet.json                                                                                                                      |
| [longRunningBackupsListSample.ts][longrunningbackupslistsample]                                           | list all the backups for a given server. x-ms-original-file: 2025-06-01-preview/LongRunningBackupsListByServer.json                                                                                                  |
| [maintenancesListSample.ts][maintenanceslistsample]                                                       | list maintenances. x-ms-original-file: 2025-06-01-preview/MaintenancesListByServer.json                                                                                                                              |
| [maintenancesReadSample.ts][maintenancesreadsample]                                                       | read maintenance. x-ms-original-file: 2025-06-01-preview/MaintenanceRead.json                                                                                                                                        |
| [maintenancesUpdateSample.ts][maintenancesupdatesample]                                                   | update maintenances. x-ms-original-file: 2025-06-01-preview/MaintenanceUpdate.json                                                                                                                                   |
| [operationProgressGetSample.ts][operationprogressgetsample]                                               | get the operation result for a long running operation. x-ms-original-file: 2025-06-01-preview/OperationProgress_Get_BackupAndExport.json                                                                             |
| [operationResultsGetSample.ts][operationresultsgetsample]                                                 | get the operation result for a long running operation. x-ms-original-file: 2025-06-01-preview/OperationResults_Get.json                                                                                              |
| [operationsListSample.ts][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2025-06-01-preview/OperationsList.json                                                                                                                      |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]       | approve or reject a private endpoint connection with a given name. x-ms-original-file: 2025-06-01-preview/PrivateEndpointConnectionUpdate.json                                                                       |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                       | deletes a private endpoint connection with a given name. x-ms-original-file: 2025-06-01-preview/PrivateEndpointConnectionDelete.json                                                                                 |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                             | gets a private endpoint connection. x-ms-original-file: 2025-06-01-preview/PrivateEndpointConnectionGet.json                                                                                                         |
| [privateEndpointConnectionsListByServerSample.ts][privateendpointconnectionslistbyserversample]           | gets all private endpoint connections on a server. x-ms-original-file: 2025-06-01-preview/PrivateEndpointConnectionList.json                                                                                         |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                         | gets a private link resource for MySQL server. x-ms-original-file: 2025-06-01-preview/PrivateLinkResourcesGet.json                                                                                                   |
| [privateLinkResourcesListByServerSample.ts][privatelinkresourceslistbyserversample]                       | lists the private link resources for MySQL server. x-ms-original-file: 2025-06-01-preview/PrivateLinkResourcesList.json                                                                                              |
| [replicasListByServerSample.ts][replicaslistbyserversample]                                               | list all the replicas for a given server. x-ms-original-file: 2025-06-01-preview/ReplicasListByServer.json                                                                                                           |
| [serversCreateSample.ts][serverscreatesample]                                                             | creates a new server or updates an existing server. The update action will overwrite the existing server. x-ms-original-file: 2025-06-01-preview/ServerCreate.json                                                   |
| [serversDeleteSample.ts][serversdeletesample]                                                             | deletes a server. x-ms-original-file: 2025-06-01-preview/ServerDelete.json                                                                                                                                           |
| [serversDetachVNetSample.ts][serversdetachvnetsample]                                                     | detach VNet on a server. x-ms-original-file: 2025-06-01-preview/ServerDetachVNet.json                                                                                                                                |
| [serversFailoverSample.ts][serversfailoversample]                                                         | manual failover a server. x-ms-original-file: 2025-06-01-preview/ServerFailover.json                                                                                                                                 |
| [serversGetSample.ts][serversgetsample]                                                                   | gets information about a server. x-ms-original-file: 2025-06-01-preview/ServerGet.json                                                                                                                               |
| [serversListByResourceGroupSample.ts][serverslistbyresourcegroupsample]                                   | list all the servers in a given resource group. x-ms-original-file: 2025-06-01-preview/ServersListByResourceGroup.json                                                                                               |
| [serversListSample.ts][serverslistsample]                                                                 | list all the servers in a given subscription. x-ms-original-file: 2025-06-01-preview/ServersList.json                                                                                                                |
| [serversMigrationCutoverMigrationSample.ts][serversmigrationcutovermigrationsample]                       | cutover migration for MySQL import, it will switch source elastic server DNS to flexible server. x-ms-original-file: 2025-06-01-preview/CutoverMigration.json                                                        |
| [serversResetGtidSample.ts][serversresetgtidsample]                                                       | resets GTID on a server. x-ms-original-file: 2025-06-01-preview/ServerResetGtid.json                                                                                                                                 |
| [serversRestartSample.ts][serversrestartsample]                                                           | restarts a server. x-ms-original-file: 2025-06-01-preview/ServerRestart.json                                                                                                                                         |
| [serversStartSample.ts][serversstartsample]                                                               | starts a server. x-ms-original-file: 2025-06-01-preview/ServerStart.json                                                                                                                                             |
| [serversStopSample.ts][serversstopsample]                                                                 | stops a server. x-ms-original-file: 2025-06-01-preview/ServerStop.json                                                                                                                                               |
| [serversUpdateSample.ts][serversupdatesample]                                                             | updates an existing server. The request body can contain one to many of the properties present in the normal server definition. x-ms-original-file: 2025-06-01-preview/MaintenancePolicyPatchOptInVirtualCanary.json |
| [serversValidateEstimateHighAvailabilitySample.ts][serversvalidateestimatehighavailabilitysample]         | validate a deployment of high availability. x-ms-original-file: 2025-06-01-preview/ServerValidateEstimateHighAvailability.json                                                                                       |

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
node dist/advancedThreatProtectionSettingsGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/advancedThreatProtectionSettingsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[advancedthreatprotectionsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/advancedThreatProtectionSettingsGetSample.ts
[advancedthreatprotectionsettingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/advancedThreatProtectionSettingsListSample.ts
[advancedthreatprotectionsettingsupdateputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/advancedThreatProtectionSettingsUpdatePutSample.ts
[advancedthreatprotectionsettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/advancedThreatProtectionSettingsUpdateSample.ts
[azureadadministratorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/azureADAdministratorsCreateOrUpdateSample.ts
[azureadadministratorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/azureADAdministratorsDeleteSample.ts
[azureadadministratorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/azureADAdministratorsGetSample.ts
[azureadadministratorslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/azureADAdministratorsListByServerSample.ts
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
[locationbasedcapabilitysetgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/locationBasedCapabilitySetGetSample.ts
[locationbasedcapabilitysetlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/locationBasedCapabilitySetListSample.ts
[logfileslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/logFilesListByServerSample.ts
[longrunningbackupcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/longRunningBackupCreateSample.ts
[longrunningbackupdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/longRunningBackupDeleteSample.ts
[longrunningbackupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/longRunningBackupsGetSample.ts
[longrunningbackupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/longRunningBackupsListSample.ts
[maintenanceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/maintenancesListSample.ts
[maintenancesreadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/maintenancesReadSample.ts
[maintenancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/maintenancesUpdateSample.ts
[operationprogressgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/operationProgressGetSample.ts
[operationresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/operationResultsGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/privateEndpointConnectionsListByServerSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/privateLinkResourcesListByServerSample.ts
[replicaslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/replicasListByServerSample.ts
[serverscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversCreateSample.ts
[serversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversDeleteSample.ts
[serversdetachvnetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversDetachVNetSample.ts
[serversfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversFailoverSample.ts
[serversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversGetSample.ts
[serverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversListByResourceGroupSample.ts
[serverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversListSample.ts
[serversmigrationcutovermigrationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversMigrationCutoverMigrationSample.ts
[serversresetgtidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversResetGtidSample.ts
[serversrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversRestartSample.ts
[serversstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversStartSample.ts
[serversstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversStopSample.ts
[serversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversUpdateSample.ts
[serversvalidateestimatehighavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4-beta/typescript/src/serversValidateEstimateHighAvailabilitySample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-mysql-flexible?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mysql/arm-mysql-flexible/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

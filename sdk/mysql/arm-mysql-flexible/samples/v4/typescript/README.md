# @azure/arm-mysql-flexible client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-mysql-flexible in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [advancedThreatProtectionSettingsGetSample.ts][advancedthreatprotectionsettingsgetsample]                 | get a server's Advanced Threat Protection state x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsGet.json                                                                                      |
| [advancedThreatProtectionSettingsListSample.ts][advancedthreatprotectionsettingslistsample]               | gets a list of server's Advanced Threat Protection states. x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsList.json                                                                          |
| [advancedThreatProtectionSettingsUpdatePutSample.ts][advancedthreatprotectionsettingsupdateputsample]     | updates a server's Advanced Threat Protection state. x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsPutDisabled.json                                                                         |
| [advancedThreatProtectionSettingsUpdateSample.ts][advancedthreatprotectionsettingsupdatesample]           | updates a server's Advanced Threat Protection state. x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsPatchDisabled.json                                                                       |
| [azureADAdministratorsCreateOrUpdateSample.ts][azureadadministratorscreateorupdatesample]                 | creates or updates an existing Azure Active Directory administrator. x-ms-original-file: 2024-12-30/AzureADAdministratorCreate.json                                                                          |
| [azureADAdministratorsDeleteSample.ts][azureadadministratorsdeletesample]                                 | deletes an Azure AD Administrator. x-ms-original-file: 2024-12-30/AzureADAdministratorDelete.json                                                                                                            |
| [azureADAdministratorsGetSample.ts][azureadadministratorsgetsample]                                       | gets information about an azure ad administrator. x-ms-original-file: 2024-12-30/AzureADAdministratorGet.json                                                                                                |
| [azureADAdministratorsListByServerSample.ts][azureadadministratorslistbyserversample]                     | list all the AAD administrators in a given server. x-ms-original-file: 2024-12-30/AzureADAdministratorsListByServer.json                                                                                     |
| [backupAndExportCreateSample.ts][backupandexportcreatesample]                                             | exports the backup of the given server by creating a backup if not existing. x-ms-original-file: 2024-12-30/BackupAndExport.json                                                                             |
| [backupAndExportValidateBackupSample.ts][backupandexportvalidatebackupsample]                             | validates if backup can be performed for given server. x-ms-original-file: 2024-12-30/ValidateBackup.json                                                                                                    |
| [backupsGetSample.ts][backupsgetsample]                                                                   | list all the backups for a given server. x-ms-original-file: 2024-12-30/BackupGet.json                                                                                                                       |
| [backupsListByServerSample.ts][backupslistbyserversample]                                                 | list all the backups for a given server. x-ms-original-file: 2024-12-30/BackupsListByServer.json                                                                                                             |
| [backupsPutSample.ts][backupsputsample]                                                                   | create backup for a given server with specified backup name. x-ms-original-file: 2024-12-30/BackupPut.json                                                                                                   |
| [checkNameAvailabilityExecuteSample.ts][checknameavailabilityexecutesample]                               | check the availability of name for server x-ms-original-file: 2024-12-30/CheckNameAvailability.json                                                                                                          |
| [checkNameAvailabilityWithoutLocationExecuteSample.ts][checknameavailabilitywithoutlocationexecutesample] | check the availability of name for server x-ms-original-file: 2024-12-30/CheckNameAvailabilityWithoutLocation.json                                                                                           |
| [checkVirtualNetworkSubnetUsageExecuteSample.ts][checkvirtualnetworksubnetusageexecutesample]             | get virtual network subnet usage for a given vNet resource id. x-ms-original-file: 2024-12-30/CheckVirtualNetworkSubnetUsage.json                                                                            |
| [configurationsBatchUpdateSample.ts][configurationsbatchupdatesample]                                     | update a list of configurations in a given server. x-ms-original-file: 2024-12-30/ConfigurationsBatchUpdate.json                                                                                             |
| [configurationsCreateOrUpdateSample.ts][configurationscreateorupdatesample]                               | updates a configuration of a server. x-ms-original-file: 2024-12-30/ConfigurationCreateOrUpdate.json                                                                                                         |
| [configurationsGetSample.ts][configurationsgetsample]                                                     | gets information about a configuration of server. x-ms-original-file: 2024-12-30/ConfigurationGet.json                                                                                                       |
| [configurationsListByServerSample.ts][configurationslistbyserversample]                                   | list all the configurations in a given server. x-ms-original-file: 2024-12-30/ConfigurationsListByServer.json                                                                                                |
| [configurationsUpdateSample.ts][configurationsupdatesample]                                               | updates a configuration of a server. x-ms-original-file: 2024-12-30/ConfigurationUpdate.json                                                                                                                 |
| [databasesCreateOrUpdateSample.ts][databasescreateorupdatesample]                                         | creates a new database or updates an existing database. x-ms-original-file: 2024-12-30/DatabaseCreate.json                                                                                                   |
| [databasesDeleteSample.ts][databasesdeletesample]                                                         | deletes a database. x-ms-original-file: 2024-12-30/DatabaseDelete.json                                                                                                                                       |
| [databasesGetSample.ts][databasesgetsample]                                                               | gets information about a database. x-ms-original-file: 2024-12-30/DatabaseGet.json                                                                                                                           |
| [databasesListByServerSample.ts][databaseslistbyserversample]                                             | list all the databases in a given server. x-ms-original-file: 2024-12-30/DatabasesListByServer.json                                                                                                          |
| [firewallRulesCreateOrUpdateSample.ts][firewallrulescreateorupdatesample]                                 | creates a new firewall rule or updates an existing firewall rule. x-ms-original-file: 2024-12-30/FirewallRuleCreate.json                                                                                     |
| [firewallRulesDeleteSample.ts][firewallrulesdeletesample]                                                 | deletes a firewall rule. x-ms-original-file: 2024-12-30/FirewallRuleDelete.json                                                                                                                              |
| [firewallRulesGetSample.ts][firewallrulesgetsample]                                                       | gets information about a server firewall rule. x-ms-original-file: 2024-12-30/FirewallRuleGet.json                                                                                                           |
| [firewallRulesListByServerSample.ts][firewallruleslistbyserversample]                                     | list all the firewall rules in a given server. x-ms-original-file: 2024-12-30/FirewallRulesListByServer.json                                                                                                 |
| [getPrivateDnsZoneSuffixExecuteSample.ts][getprivatednszonesuffixexecutesample]                           | get private DNS zone suffix in the cloud. x-ms-original-file: 2024-12-30/GetPrivateDnsZoneSuffix.json                                                                                                        |
| [locationBasedCapabilitiesListSample.ts][locationbasedcapabilitieslistsample]                             | get capabilities at specified location in a given subscription. x-ms-original-file: 2024-12-30/CapabilitiesByLocationList.json                                                                               |
| [locationBasedCapabilitySetGetSample.ts][locationbasedcapabilitysetgetsample]                             | get capabilities at specified location in a given subscription. x-ms-original-file: 2024-12-30/CapabilitySetByLocation.json                                                                                  |
| [locationBasedCapabilitySetListSample.ts][locationbasedcapabilitysetlistsample]                           | get capabilities at specified location in a given subscription. x-ms-original-file: 2024-12-30/CapabilitySetListByLocation.json                                                                              |
| [logFilesListByServerSample.ts][logfileslistbyserversample]                                               | list all the server log files in a given server. x-ms-original-file: 2024-12-30/LogFilesListByServer.json                                                                                                    |
| [longRunningBackupCreateSample.ts][longrunningbackupcreatesample]                                         | create backup for a given server with specified backup name. x-ms-original-file: 2024-12-30/LongRunningBackup.json                                                                                           |
| [longRunningBackupsGetSample.ts][longrunningbackupsgetsample]                                             | get backup for a given server. x-ms-original-file: 2024-12-30/LongRunningBackupGet.json                                                                                                                      |
| [longRunningBackupsListSample.ts][longrunningbackupslistsample]                                           | list all the backups for a given server. x-ms-original-file: 2024-12-30/LongRunningBackupsListByServer.json                                                                                                  |
| [maintenancesListSample.ts][maintenanceslistsample]                                                       | list maintenances. x-ms-original-file: 2024-12-30/MaintenancesListByServer.json                                                                                                                              |
| [maintenancesReadSample.ts][maintenancesreadsample]                                                       | read maintenance. x-ms-original-file: 2024-12-30/MaintenanceRead.json                                                                                                                                        |
| [maintenancesUpdateSample.ts][maintenancesupdatesample]                                                   | update maintenances. x-ms-original-file: 2024-12-30/MaintenanceUpdate.json                                                                                                                                   |
| [operationProgressGetSample.ts][operationprogressgetsample]                                               | get the operation result for a long running operation. x-ms-original-file: 2024-12-30/OperationProgress_Get_BackupAndExport.json                                                                             |
| [operationResultsGetSample.ts][operationresultsgetsample]                                                 | get the operation result for a long running operation. x-ms-original-file: 2024-12-30/OperationResults_Get.json                                                                                              |
| [operationsListSample.ts][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2024-12-30/OperationsList.json                                                                                                                      |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]       | approve or reject a private endpoint connection with a given name. x-ms-original-file: 2024-12-30/PrivateEndpointConnectionUpdate.json                                                                       |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                       | deletes a private endpoint connection with a given name. x-ms-original-file: 2024-12-30/PrivateEndpointConnectionDelete.json                                                                                 |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                             | gets a private endpoint connection. x-ms-original-file: 2024-12-30/PrivateEndpointConnectionGet.json                                                                                                         |
| [privateEndpointConnectionsListByServerSample.ts][privateendpointconnectionslistbyserversample]           | gets all private endpoint connections on a server. x-ms-original-file: 2024-12-30/PrivateEndpointConnectionList.json                                                                                         |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                         | gets a private link resource for MySQL server. x-ms-original-file: 2024-12-30/PrivateLinkResourcesGet.json                                                                                                   |
| [privateLinkResourcesListByServerSample.ts][privatelinkresourceslistbyserversample]                       | lists the private link resources for MySQL server. x-ms-original-file: 2024-12-30/PrivateLinkResourcesList.json                                                                                              |
| [replicasListByServerSample.ts][replicaslistbyserversample]                                               | list all the replicas for a given server. x-ms-original-file: 2024-12-30/ReplicasListByServer.json                                                                                                           |
| [serversCreateSample.ts][serverscreatesample]                                                             | creates a new server or updates an existing server. The update action will overwrite the existing server. x-ms-original-file: 2024-12-30/ServerCreate.json                                                   |
| [serversDeleteSample.ts][serversdeletesample]                                                             | deletes a server. x-ms-original-file: 2024-12-30/ServerDelete.json                                                                                                                                           |
| [serversDetachVNetSample.ts][serversdetachvnetsample]                                                     | detach VNet on a server. x-ms-original-file: 2024-12-30/ServerDetachVNet.json                                                                                                                                |
| [serversFailoverSample.ts][serversfailoversample]                                                         | manual failover a server. x-ms-original-file: 2024-12-30/ServerFailover.json                                                                                                                                 |
| [serversGetSample.ts][serversgetsample]                                                                   | gets information about a server. x-ms-original-file: 2024-12-30/ServerGet.json                                                                                                                               |
| [serversListByResourceGroupSample.ts][serverslistbyresourcegroupsample]                                   | list all the servers in a given resource group. x-ms-original-file: 2024-12-30/ServersListByResourceGroup.json                                                                                               |
| [serversListSample.ts][serverslistsample]                                                                 | list all the servers in a given subscription. x-ms-original-file: 2024-12-30/ServersList.json                                                                                                                |
| [serversMigrationCutoverMigrationSample.ts][serversmigrationcutovermigrationsample]                       | cutover migration for MySQL import, it will switch source elastic server DNS to flexible server. x-ms-original-file: 2024-12-30/CutoverMigration.json                                                        |
| [serversResetGtidSample.ts][serversresetgtidsample]                                                       | resets GTID on a server. x-ms-original-file: 2024-12-30/ServerResetGtid.json                                                                                                                                 |
| [serversRestartSample.ts][serversrestartsample]                                                           | restarts a server. x-ms-original-file: 2024-12-30/ServerRestart.json                                                                                                                                         |
| [serversStartSample.ts][serversstartsample]                                                               | starts a server. x-ms-original-file: 2024-12-30/ServerStart.json                                                                                                                                             |
| [serversStopSample.ts][serversstopsample]                                                                 | stops a server. x-ms-original-file: 2024-12-30/ServerStop.json                                                                                                                                               |
| [serversUpdateSample.ts][serversupdatesample]                                                             | updates an existing server. The request body can contain one to many of the properties present in the normal server definition. x-ms-original-file: 2024-12-30/MaintenancePolicyPatchOptInVirtualCanary.json |
| [serversValidateEstimateHighAvailabilitySample.ts][serversvalidateestimatehighavailabilitysample]         | validate a deployment of high availability. x-ms-original-file: 2024-12-30/ServerValidateEstimateHighAvailability.json                                                                                       |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/advancedThreatProtectionSettingsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[advancedthreatprotectionsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/advancedThreatProtectionSettingsGetSample.ts
[advancedthreatprotectionsettingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/advancedThreatProtectionSettingsListSample.ts
[advancedthreatprotectionsettingsupdateputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/advancedThreatProtectionSettingsUpdatePutSample.ts
[advancedthreatprotectionsettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/advancedThreatProtectionSettingsUpdateSample.ts
[azureadadministratorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/azureADAdministratorsCreateOrUpdateSample.ts
[azureadadministratorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/azureADAdministratorsDeleteSample.ts
[azureadadministratorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/azureADAdministratorsGetSample.ts
[azureadadministratorslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/azureADAdministratorsListByServerSample.ts
[backupandexportcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/backupAndExportCreateSample.ts
[backupandexportvalidatebackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/backupAndExportValidateBackupSample.ts
[backupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/backupsGetSample.ts
[backupslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/backupsListByServerSample.ts
[backupsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/backupsPutSample.ts
[checknameavailabilityexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/checkNameAvailabilityExecuteSample.ts
[checknameavailabilitywithoutlocationexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/checkNameAvailabilityWithoutLocationExecuteSample.ts
[checkvirtualnetworksubnetusageexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/checkVirtualNetworkSubnetUsageExecuteSample.ts
[configurationsbatchupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/configurationsBatchUpdateSample.ts
[configurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/configurationsCreateOrUpdateSample.ts
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/configurationsGetSample.ts
[configurationslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/configurationsListByServerSample.ts
[configurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/configurationsUpdateSample.ts
[databasescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/databasesCreateOrUpdateSample.ts
[databasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/databasesDeleteSample.ts
[databasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/databasesGetSample.ts
[databaseslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/databasesListByServerSample.ts
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/firewallRulesCreateOrUpdateSample.ts
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/firewallRulesDeleteSample.ts
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/firewallRulesGetSample.ts
[firewallruleslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/firewallRulesListByServerSample.ts
[getprivatednszonesuffixexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/getPrivateDnsZoneSuffixExecuteSample.ts
[locationbasedcapabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/locationBasedCapabilitiesListSample.ts
[locationbasedcapabilitysetgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/locationBasedCapabilitySetGetSample.ts
[locationbasedcapabilitysetlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/locationBasedCapabilitySetListSample.ts
[logfileslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/logFilesListByServerSample.ts
[longrunningbackupcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/longRunningBackupCreateSample.ts
[longrunningbackupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/longRunningBackupsGetSample.ts
[longrunningbackupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/longRunningBackupsListSample.ts
[maintenanceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/maintenancesListSample.ts
[maintenancesreadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/maintenancesReadSample.ts
[maintenancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/maintenancesUpdateSample.ts
[operationprogressgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/operationProgressGetSample.ts
[operationresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/operationResultsGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/privateEndpointConnectionsListByServerSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/privateLinkResourcesListByServerSample.ts
[replicaslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/replicasListByServerSample.ts
[serverscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversCreateSample.ts
[serversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversDeleteSample.ts
[serversdetachvnetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversDetachVNetSample.ts
[serversfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversFailoverSample.ts
[serversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversGetSample.ts
[serverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversListByResourceGroupSample.ts
[serverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversListSample.ts
[serversmigrationcutovermigrationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversMigrationCutoverMigrationSample.ts
[serversresetgtidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversResetGtidSample.ts
[serversrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversRestartSample.ts
[serversstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversStartSample.ts
[serversstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversStopSample.ts
[serversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversUpdateSample.ts
[serversvalidateestimatehighavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/typescript/src/serversValidateEstimateHighAvailabilitySample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-mysql-flexible?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mysql/arm-mysql-flexible/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

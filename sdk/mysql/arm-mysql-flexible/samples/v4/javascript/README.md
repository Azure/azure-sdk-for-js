# @azure/arm-mysql-flexible client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-mysql-flexible in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [advancedThreatProtectionSettingsGetSample.js][advancedthreatprotectionsettingsgetsample]                 | get a server's Advanced Threat Protection state x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsGet.json                                                                                      |
| [advancedThreatProtectionSettingsListSample.js][advancedthreatprotectionsettingslistsample]               | gets a list of server's Advanced Threat Protection states. x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsList.json                                                                          |
| [advancedThreatProtectionSettingsUpdatePutSample.js][advancedthreatprotectionsettingsupdateputsample]     | updates a server's Advanced Threat Protection state. x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsPutDisabled.json                                                                         |
| [advancedThreatProtectionSettingsUpdateSample.js][advancedthreatprotectionsettingsupdatesample]           | updates a server's Advanced Threat Protection state. x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsPatchDisabled.json                                                                       |
| [azureADAdministratorsCreateOrUpdateSample.js][azureadadministratorscreateorupdatesample]                 | creates or updates an existing Azure Active Directory administrator. x-ms-original-file: 2024-12-30/AzureADAdministratorCreate.json                                                                          |
| [azureADAdministratorsDeleteSample.js][azureadadministratorsdeletesample]                                 | deletes an Azure AD Administrator. x-ms-original-file: 2024-12-30/AzureADAdministratorDelete.json                                                                                                            |
| [azureADAdministratorsGetSample.js][azureadadministratorsgetsample]                                       | gets information about an azure ad administrator. x-ms-original-file: 2024-12-30/AzureADAdministratorGet.json                                                                                                |
| [azureADAdministratorsListByServerSample.js][azureadadministratorslistbyserversample]                     | list all the AAD administrators in a given server. x-ms-original-file: 2024-12-30/AzureADAdministratorsListByServer.json                                                                                     |
| [backupAndExportCreateSample.js][backupandexportcreatesample]                                             | exports the backup of the given server by creating a backup if not existing. x-ms-original-file: 2024-12-30/BackupAndExport.json                                                                             |
| [backupAndExportValidateBackupSample.js][backupandexportvalidatebackupsample]                             | validates if backup can be performed for given server. x-ms-original-file: 2024-12-30/ValidateBackup.json                                                                                                    |
| [backupsGetSample.js][backupsgetsample]                                                                   | list all the backups for a given server. x-ms-original-file: 2024-12-30/BackupGet.json                                                                                                                       |
| [backupsListByServerSample.js][backupslistbyserversample]                                                 | list all the backups for a given server. x-ms-original-file: 2024-12-30/BackupsListByServer.json                                                                                                             |
| [backupsPutSample.js][backupsputsample]                                                                   | create backup for a given server with specified backup name. x-ms-original-file: 2024-12-30/BackupPut.json                                                                                                   |
| [checkNameAvailabilityExecuteSample.js][checknameavailabilityexecutesample]                               | check the availability of name for server x-ms-original-file: 2024-12-30/CheckNameAvailability.json                                                                                                          |
| [checkNameAvailabilityWithoutLocationExecuteSample.js][checknameavailabilitywithoutlocationexecutesample] | check the availability of name for server x-ms-original-file: 2024-12-30/CheckNameAvailabilityWithoutLocation.json                                                                                           |
| [checkVirtualNetworkSubnetUsageExecuteSample.js][checkvirtualnetworksubnetusageexecutesample]             | get virtual network subnet usage for a given vNet resource id. x-ms-original-file: 2024-12-30/CheckVirtualNetworkSubnetUsage.json                                                                            |
| [configurationsBatchUpdateSample.js][configurationsbatchupdatesample]                                     | update a list of configurations in a given server. x-ms-original-file: 2024-12-30/ConfigurationsBatchUpdate.json                                                                                             |
| [configurationsCreateOrUpdateSample.js][configurationscreateorupdatesample]                               | updates a configuration of a server. x-ms-original-file: 2024-12-30/ConfigurationCreateOrUpdate.json                                                                                                         |
| [configurationsGetSample.js][configurationsgetsample]                                                     | gets information about a configuration of server. x-ms-original-file: 2024-12-30/ConfigurationGet.json                                                                                                       |
| [configurationsListByServerSample.js][configurationslistbyserversample]                                   | list all the configurations in a given server. x-ms-original-file: 2024-12-30/ConfigurationsListByServer.json                                                                                                |
| [configurationsUpdateSample.js][configurationsupdatesample]                                               | updates a configuration of a server. x-ms-original-file: 2024-12-30/ConfigurationUpdate.json                                                                                                                 |
| [databasesCreateOrUpdateSample.js][databasescreateorupdatesample]                                         | creates a new database or updates an existing database. x-ms-original-file: 2024-12-30/DatabaseCreate.json                                                                                                   |
| [databasesDeleteSample.js][databasesdeletesample]                                                         | deletes a database. x-ms-original-file: 2024-12-30/DatabaseDelete.json                                                                                                                                       |
| [databasesGetSample.js][databasesgetsample]                                                               | gets information about a database. x-ms-original-file: 2024-12-30/DatabaseGet.json                                                                                                                           |
| [databasesListByServerSample.js][databaseslistbyserversample]                                             | list all the databases in a given server. x-ms-original-file: 2024-12-30/DatabasesListByServer.json                                                                                                          |
| [firewallRulesCreateOrUpdateSample.js][firewallrulescreateorupdatesample]                                 | creates a new firewall rule or updates an existing firewall rule. x-ms-original-file: 2024-12-30/FirewallRuleCreate.json                                                                                     |
| [firewallRulesDeleteSample.js][firewallrulesdeletesample]                                                 | deletes a firewall rule. x-ms-original-file: 2024-12-30/FirewallRuleDelete.json                                                                                                                              |
| [firewallRulesGetSample.js][firewallrulesgetsample]                                                       | gets information about a server firewall rule. x-ms-original-file: 2024-12-30/FirewallRuleGet.json                                                                                                           |
| [firewallRulesListByServerSample.js][firewallruleslistbyserversample]                                     | list all the firewall rules in a given server. x-ms-original-file: 2024-12-30/FirewallRulesListByServer.json                                                                                                 |
| [getPrivateDnsZoneSuffixExecuteSample.js][getprivatednszonesuffixexecutesample]                           | get private DNS zone suffix in the cloud. x-ms-original-file: 2024-12-30/GetPrivateDnsZoneSuffix.json                                                                                                        |
| [locationBasedCapabilitiesListSample.js][locationbasedcapabilitieslistsample]                             | get capabilities at specified location in a given subscription. x-ms-original-file: 2024-12-30/CapabilitiesByLocationList.json                                                                               |
| [locationBasedCapabilitySetGetSample.js][locationbasedcapabilitysetgetsample]                             | get capabilities at specified location in a given subscription. x-ms-original-file: 2024-12-30/CapabilitySetByLocation.json                                                                                  |
| [locationBasedCapabilitySetListSample.js][locationbasedcapabilitysetlistsample]                           | get capabilities at specified location in a given subscription. x-ms-original-file: 2024-12-30/CapabilitySetListByLocation.json                                                                              |
| [logFilesListByServerSample.js][logfileslistbyserversample]                                               | list all the server log files in a given server. x-ms-original-file: 2024-12-30/LogFilesListByServer.json                                                                                                    |
| [longRunningBackupCreateSample.js][longrunningbackupcreatesample]                                         | create backup for a given server with specified backup name. x-ms-original-file: 2024-12-30/LongRunningBackup.json                                                                                           |
| [longRunningBackupsGetSample.js][longrunningbackupsgetsample]                                             | get backup for a given server. x-ms-original-file: 2024-12-30/LongRunningBackupGet.json                                                                                                                      |
| [longRunningBackupsListSample.js][longrunningbackupslistsample]                                           | list all the backups for a given server. x-ms-original-file: 2024-12-30/LongRunningBackupsListByServer.json                                                                                                  |
| [maintenancesListSample.js][maintenanceslistsample]                                                       | list maintenances. x-ms-original-file: 2024-12-30/MaintenancesListByServer.json                                                                                                                              |
| [maintenancesReadSample.js][maintenancesreadsample]                                                       | read maintenance. x-ms-original-file: 2024-12-30/MaintenanceRead.json                                                                                                                                        |
| [maintenancesUpdateSample.js][maintenancesupdatesample]                                                   | update maintenances. x-ms-original-file: 2024-12-30/MaintenanceUpdate.json                                                                                                                                   |
| [operationProgressGetSample.js][operationprogressgetsample]                                               | get the operation result for a long running operation. x-ms-original-file: 2024-12-30/OperationProgress_Get_BackupAndExport.json                                                                             |
| [operationResultsGetSample.js][operationresultsgetsample]                                                 | get the operation result for a long running operation. x-ms-original-file: 2024-12-30/OperationResults_Get.json                                                                                              |
| [operationsListSample.js][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2024-12-30/OperationsList.json                                                                                                                      |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample]       | approve or reject a private endpoint connection with a given name. x-ms-original-file: 2024-12-30/PrivateEndpointConnectionUpdate.json                                                                       |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                       | deletes a private endpoint connection with a given name. x-ms-original-file: 2024-12-30/PrivateEndpointConnectionDelete.json                                                                                 |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                             | gets a private endpoint connection. x-ms-original-file: 2024-12-30/PrivateEndpointConnectionGet.json                                                                                                         |
| [privateEndpointConnectionsListByServerSample.js][privateendpointconnectionslistbyserversample]           | gets all private endpoint connections on a server. x-ms-original-file: 2024-12-30/PrivateEndpointConnectionList.json                                                                                         |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                                         | gets a private link resource for MySQL server. x-ms-original-file: 2024-12-30/PrivateLinkResourcesGet.json                                                                                                   |
| [privateLinkResourcesListByServerSample.js][privatelinkresourceslistbyserversample]                       | lists the private link resources for MySQL server. x-ms-original-file: 2024-12-30/PrivateLinkResourcesList.json                                                                                              |
| [replicasListByServerSample.js][replicaslistbyserversample]                                               | list all the replicas for a given server. x-ms-original-file: 2024-12-30/ReplicasListByServer.json                                                                                                           |
| [serversCreateSample.js][serverscreatesample]                                                             | creates a new server or updates an existing server. The update action will overwrite the existing server. x-ms-original-file: 2024-12-30/ServerCreate.json                                                   |
| [serversDeleteSample.js][serversdeletesample]                                                             | deletes a server. x-ms-original-file: 2024-12-30/ServerDelete.json                                                                                                                                           |
| [serversDetachVNetSample.js][serversdetachvnetsample]                                                     | detach VNet on a server. x-ms-original-file: 2024-12-30/ServerDetachVNet.json                                                                                                                                |
| [serversFailoverSample.js][serversfailoversample]                                                         | manual failover a server. x-ms-original-file: 2024-12-30/ServerFailover.json                                                                                                                                 |
| [serversGetSample.js][serversgetsample]                                                                   | gets information about a server. x-ms-original-file: 2024-12-30/ServerGet.json                                                                                                                               |
| [serversListByResourceGroupSample.js][serverslistbyresourcegroupsample]                                   | list all the servers in a given resource group. x-ms-original-file: 2024-12-30/ServersListByResourceGroup.json                                                                                               |
| [serversListSample.js][serverslistsample]                                                                 | list all the servers in a given subscription. x-ms-original-file: 2024-12-30/ServersList.json                                                                                                                |
| [serversMigrationCutoverMigrationSample.js][serversmigrationcutovermigrationsample]                       | cutover migration for MySQL import, it will switch source elastic server DNS to flexible server. x-ms-original-file: 2024-12-30/CutoverMigration.json                                                        |
| [serversResetGtidSample.js][serversresetgtidsample]                                                       | resets GTID on a server. x-ms-original-file: 2024-12-30/ServerResetGtid.json                                                                                                                                 |
| [serversRestartSample.js][serversrestartsample]                                                           | restarts a server. x-ms-original-file: 2024-12-30/ServerRestart.json                                                                                                                                         |
| [serversStartSample.js][serversstartsample]                                                               | starts a server. x-ms-original-file: 2024-12-30/ServerStart.json                                                                                                                                             |
| [serversStopSample.js][serversstopsample]                                                                 | stops a server. x-ms-original-file: 2024-12-30/ServerStop.json                                                                                                                                               |
| [serversUpdateSample.js][serversupdatesample]                                                             | updates an existing server. The request body can contain one to many of the properties present in the normal server definition. x-ms-original-file: 2024-12-30/MaintenancePolicyPatchOptInVirtualCanary.json |
| [serversValidateEstimateHighAvailabilitySample.js][serversvalidateestimatehighavailabilitysample]         | validate a deployment of high availability. x-ms-original-file: 2024-12-30/ServerValidateEstimateHighAvailability.json                                                                                       |

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
node advancedThreatProtectionSettingsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node advancedThreatProtectionSettingsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[advancedthreatprotectionsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/advancedThreatProtectionSettingsGetSample.js
[advancedthreatprotectionsettingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/advancedThreatProtectionSettingsListSample.js
[advancedthreatprotectionsettingsupdateputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/advancedThreatProtectionSettingsUpdatePutSample.js
[advancedthreatprotectionsettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/advancedThreatProtectionSettingsUpdateSample.js
[azureadadministratorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/azureADAdministratorsCreateOrUpdateSample.js
[azureadadministratorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/azureADAdministratorsDeleteSample.js
[azureadadministratorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/azureADAdministratorsGetSample.js
[azureadadministratorslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/azureADAdministratorsListByServerSample.js
[backupandexportcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/backupAndExportCreateSample.js
[backupandexportvalidatebackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/backupAndExportValidateBackupSample.js
[backupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/backupsGetSample.js
[backupslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/backupsListByServerSample.js
[backupsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/backupsPutSample.js
[checknameavailabilityexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/checkNameAvailabilityExecuteSample.js
[checknameavailabilitywithoutlocationexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/checkNameAvailabilityWithoutLocationExecuteSample.js
[checkvirtualnetworksubnetusageexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/checkVirtualNetworkSubnetUsageExecuteSample.js
[configurationsbatchupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/configurationsBatchUpdateSample.js
[configurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/configurationsCreateOrUpdateSample.js
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/configurationsGetSample.js
[configurationslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/configurationsListByServerSample.js
[configurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/configurationsUpdateSample.js
[databasescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/databasesCreateOrUpdateSample.js
[databasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/databasesDeleteSample.js
[databasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/databasesGetSample.js
[databaseslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/databasesListByServerSample.js
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/firewallRulesCreateOrUpdateSample.js
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/firewallRulesDeleteSample.js
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/firewallRulesGetSample.js
[firewallruleslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/firewallRulesListByServerSample.js
[getprivatednszonesuffixexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/getPrivateDnsZoneSuffixExecuteSample.js
[locationbasedcapabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/locationBasedCapabilitiesListSample.js
[locationbasedcapabilitysetgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/locationBasedCapabilitySetGetSample.js
[locationbasedcapabilitysetlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/locationBasedCapabilitySetListSample.js
[logfileslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/logFilesListByServerSample.js
[longrunningbackupcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/longRunningBackupCreateSample.js
[longrunningbackupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/longRunningBackupsGetSample.js
[longrunningbackupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/longRunningBackupsListSample.js
[maintenanceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/maintenancesListSample.js
[maintenancesreadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/maintenancesReadSample.js
[maintenancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/maintenancesUpdateSample.js
[operationprogressgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/operationProgressGetSample.js
[operationresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/operationResultsGetSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/operationsListSample.js
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/privateEndpointConnectionsListByServerSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/privateLinkResourcesListByServerSample.js
[replicaslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/replicasListByServerSample.js
[serverscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversCreateSample.js
[serversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversDeleteSample.js
[serversdetachvnetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversDetachVNetSample.js
[serversfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversFailoverSample.js
[serversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversGetSample.js
[serverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversListByResourceGroupSample.js
[serverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversListSample.js
[serversmigrationcutovermigrationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversMigrationCutoverMigrationSample.js
[serversresetgtidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversResetGtidSample.js
[serversrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversRestartSample.js
[serversstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversStartSample.js
[serversstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversStopSample.js
[serversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversUpdateSample.js
[serversvalidateestimatehighavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mysql/arm-mysql-flexible/samples/v4/javascript/serversValidateEstimateHighAvailabilitySample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-mysql-flexible?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mysql/arm-mysql-flexible/README.md

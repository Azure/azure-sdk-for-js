# @azure/arm-automation client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-automation in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agentRegistrationInformationGetSample.js][agentregistrationinformationgetsample]                                       | retrieve the automation agent registration information. x-ms-original-file: 2024-10-23/getAgentRegistration.json                                                                     |
| [agentRegistrationInformationRegenerateKeySample.js][agentregistrationinformationregeneratekeysample]                   | regenerate a primary or secondary agent registration key x-ms-original-file: 2024-10-23/regenerateAgentRegistrationKey.json                                                          |
| [convertGraphRunbookContentSample.js][convertgraphrunbookcontentsample]                                                 | post operation to serialize or deserialize GraphRunbookContent x-ms-original-file: 2024-10-23/deserializeGraphRunbookContent.json                                                    |
| [deletedAutomationAccountsListBySubscriptionSample.js][deletedautomationaccountslistbysubscriptionsample]               | retrieve deleted automation account. x-ms-original-file: 2024-10-23/getDeletedAutomationAccount.json                                                                                 |
| [dscNodeConfigurationListByAutomationAccountSample.js][dscnodeconfigurationlistbyautomationaccountsample]               | retrieve a list of dsc node configurations. x-ms-original-file: 2024-10-23/listDscNodeConfigurations.json                                                                            |
| [fieldsListByTypeSample.js][fieldslistbytypesample]                                                                     | retrieve a list of fields of a given type identified by module name. x-ms-original-file: 2024-10-23/listFieldsByModuleAndType.json                                                   |
| [hybridRunbookWorkersCreateSample.js][hybridrunbookworkerscreatesample]                                                 | create a hybrid runbook worker. x-ms-original-file: 2024-10-23/putHybridRunbookWorker.json                                                                                           |
| [hybridRunbookWorkersDeleteSample.js][hybridrunbookworkersdeletesample]                                                 | delete a hybrid runbook worker. x-ms-original-file: 2024-10-23/deleteHybridRunbookWorker.json                                                                                        |
| [hybridRunbookWorkersGetSample.js][hybridrunbookworkersgetsample]                                                       | retrieve a hybrid runbook worker. x-ms-original-file: 2024-10-23/getHybridRunbookWorker.json                                                                                         |
| [hybridRunbookWorkersListByHybridRunbookWorkerGroupSample.js][hybridrunbookworkerslistbyhybridrunbookworkergroupsample] | retrieve a list of hybrid runbook workers. x-ms-original-file: 2024-10-23/listHybridRunbookWorker.json                                                                               |
| [hybridRunbookWorkersMoveSample.js][hybridrunbookworkersmovesample]                                                     | move a hybrid worker to a different group. x-ms-original-file: 2024-10-23/moveHybridRunbookWorker.json                                                                               |
| [hybridRunbookWorkersPatchSample.js][hybridrunbookworkerspatchsample]                                                   | update a hybrid runbook worker. x-ms-original-file: 2024-10-23/patchHybridRunbookWorker.json                                                                                         |
| [keysListByAutomationAccountSample.js][keyslistbyautomationaccountsample]                                               | retrieve the automation keys for an account. x-ms-original-file: 2024-10-23/listAutomationAccountKeys.json                                                                           |
| [nodeCountInformationGetSample.js][nodecountinformationgetsample]                                                       | retrieve counts for Dsc Nodes. x-ms-original-file: 2024-10-23/listPagedDscNodeConfigurationCounts.json                                                                               |
| [nodeReportsGetContentSample.js][nodereportsgetcontentsample]                                                           | retrieve the Dsc node reports by node id and report id. x-ms-original-file: 2024-10-23/getDscNodeReportContent.json                                                                  |
| [nodeReportsGetSample.js][nodereportsgetsample]                                                                         | retrieve the Dsc node report data by node id and report id. x-ms-original-file: 2024-10-23/getDscNodeReport.json                                                                     |
| [nodeReportsListByNodeSample.js][nodereportslistbynodesample]                                                           | retrieve the Dsc node report list by node id. x-ms-original-file: 2024-10-23/listDscNodeReportsByNode.json                                                                           |
| [objectDataTypesListFieldsByModuleAndTypeSample.js][objectdatatypeslistfieldsbymoduleandtypesample]                     | retrieve a list of fields of a given type identified by module name. x-ms-original-file: 2024-10-23/ObjectDataTypeslistFieldsByModuleAndType.json                                    |
| [objectDataTypesListFieldsByTypeSample.js][objectdatatypeslistfieldsbytypesample]                                       | retrieve a list of fields of a given type across all accessible modules. x-ms-original-file: 2024-10-23/listFieldsByType.json                                                        |
| [operationsListSample.js][operationslistsample]                                                                         | lists all of the available Automation REST API operations. x-ms-original-file: 2024-10-23/listRestAPIOperations.json                                                                 |
| [packageCreateOrUpdateSample.js][packagecreateorupdatesample]                                                           | create or update the package identified by package name. x-ms-original-file: 2024-10-23/package/createOrUpdatePackage.json                                                           |
| [packageDeleteSample.js][packagedeletesample]                                                                           | delete the package by name. x-ms-original-file: 2024-10-23/package/deletePackage.json                                                                                                |
| [packageGetSample.js][packagegetsample]                                                                                 | retrieve the Package identified by Package name. x-ms-original-file: 2024-10-23/package/getPackage.json                                                                              |
| [packageListByRuntimeEnvironmentSample.js][packagelistbyruntimeenvironmentsample]                                       | retrieve the a list of Packages x-ms-original-file: 2024-10-23/package/listPackagesByRuntimeEnvironment.json                                                                         |
| [packageUpdateSample.js][packageupdatesample]                                                                           | update the Package identified by Package name. x-ms-original-file: 2024-10-23/package/updatePackage.json                                                                             |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample]                     | approve or reject a private endpoint connection with a given name. x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionUpdate.json                     |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                                     | deletes a private endpoint connection with a given name. x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionDelete.json                               |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                           | gets a private endpoint connection. x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionGet.json                                                       |
| [privateEndpointConnectionsListByAutomationAccountSample.js][privateendpointconnectionslistbyautomationaccountsample]   | list all private endpoint connections on a Automation account. x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionListGet.json                        |
| [privateLinkResourcesListAutomationSample.js][privatelinkresourceslistautomationsample]                                 | gets the private link resources that need to be created for Automation account. x-ms-original-file: 2024-10-23/PrivateLinkResourceListGet.json                                       |
| [python2PackageCreateOrUpdateSample.js][python2packagecreateorupdatesample]                                             | create or Update the python 2 package identified by package name. x-ms-original-file: 2024-10-23/createOrUpdatePython2Package.json                                                   |
| [python2PackageDeleteSample.js][python2packagedeletesample]                                                             | delete the python 2 package by name. x-ms-original-file: 2024-10-23/deletePython2Package.json                                                                                        |
| [python2PackageGetSample.js][python2packagegetsample]                                                                   | retrieve the python 2 package identified by package name. x-ms-original-file: 2024-10-23/getPython2Package.json                                                                      |
| [python2PackageListByAutomationAccountSample.js][python2packagelistbyautomationaccountsample]                           | retrieve a list of python 2 packages. x-ms-original-file: 2024-10-23/listPython2PackagesByAutomationAccount.json                                                                     |
| [python2PackageUpdateSample.js][python2packageupdatesample]                                                             | update the python 2 package identified by package name. x-ms-original-file: 2024-10-23/updatePython2Package.json                                                                     |
| [python3PackageCreateOrUpdateSample.js][python3packagecreateorupdatesample]                                             | create or Update the python 3 package identified by package name. x-ms-original-file: 2024-10-23/createOrUpdatePython3Package.json                                                   |
| [python3PackageDeleteSample.js][python3packagedeletesample]                                                             | delete the python 3 package by name. x-ms-original-file: 2024-10-23/deletePython3Package.json                                                                                        |
| [python3PackageGetSample.js][python3packagegetsample]                                                                   | retrieve the python 3 package identified by package name. x-ms-original-file: 2024-10-23/getPython3Package.json                                                                      |
| [python3PackageListByAutomationAccountSample.js][python3packagelistbyautomationaccountsample]                           | retrieve a list of python 3 packages. x-ms-original-file: 2024-10-23/listPython3PackagesByAutomationAccount.json                                                                     |
| [python3PackageUpdateSample.js][python3packageupdatesample]                                                             | update the python 3 package identified by package name. x-ms-original-file: 2024-10-23/updatePython3Package.json                                                                     |
| [runbookGetContentSample.js][runbookgetcontentsample]                                                                   | retrieve the content of runbook identified by runbook name. x-ms-original-file: 2024-10-23/runbook/getRunbookContent.json                                                            |
| [runbookPublishSample.js][runbookpublishsample]                                                                         | publish runbook draft. x-ms-original-file: 2024-10-23/runbook/publishRunbook.json                                                                                                    |
| [runtimeEnvironmentsCreateSample.js][runtimeenvironmentscreatesample]                                                   | create or update Runtime Environment x-ms-original-file: 2024-10-23/runtimeEnvironment/createRuntimeEnvironment.json                                                                 |
| [runtimeEnvironmentsDeleteSample.js][runtimeenvironmentsdeletesample]                                                   | delete the Runtime Environment. x-ms-original-file: 2024-10-23/runtimeEnvironment/deleteRuntimeEnvironment.json                                                                      |
| [runtimeEnvironmentsGetSample.js][runtimeenvironmentsgetsample]                                                         | get information about the Runtime Environment x-ms-original-file: 2024-10-23/runtimeEnvironment/getRuntimeEnvironment.json                                                           |
| [runtimeEnvironmentsListByAutomationAccountSample.js][runtimeenvironmentslistbyautomationaccountsample]                 | retrieve a list of RuntimeEnvironments. x-ms-original-file: 2024-10-23/runtimeEnvironment/listRuntimeEnvironmentsByAutomationAccount.json                                            |
| [runtimeEnvironmentsUpdateSample.js][runtimeenvironmentsupdatesample]                                                   | update an Runtime Environment. x-ms-original-file: 2024-10-23/runtimeEnvironment/updateRuntimeEnvironment.json                                                                       |
| [softwareUpdateConfigurationMachineRunsGetByIdSample.js][softwareupdateconfigurationmachinerunsgetbyidsample]           | get a single software update configuration machine run by Id. x-ms-original-file: 2024-10-23/softwareUpdateConfigurationMachineRun/getSoftwareUpdateConfigurationMachineRunById.json |
| [softwareUpdateConfigurationMachineRunsListSample.js][softwareupdateconfigurationmachinerunslistsample]                 | return list of software update configuration machine runs x-ms-original-file: 2024-10-23/softwareUpdateConfigurationMachineRun/listSoftwareUpdateConfigurationMachineRuns.json       |
| [softwareUpdateConfigurationRunsGetByIdSample.js][softwareupdateconfigurationrunsgetbyidsample]                         | get a single software update configuration Run by Id. x-ms-original-file: 2024-10-23/softwareUpdateConfigurationRun/getSoftwareUpdateConfigurationRunById.json                       |
| [softwareUpdateConfigurationRunsListSample.js][softwareupdateconfigurationrunslistsample]                               | return list of software update configuration runs x-ms-original-file: 2024-10-23/softwareUpdateConfigurationRun/listFailedSoftwareUpdateConfigurationRuns.json                       |
| [softwareUpdateConfigurationsCreateSample.js][softwareupdateconfigurationscreatesample]                                 | create a new software update configuration with the name given in the URI. x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/createSoftwareUpdateConfiguration.json         |
| [softwareUpdateConfigurationsDeleteSample.js][softwareupdateconfigurationsdeletesample]                                 | delete a specific software update configuration. x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/deleteSoftwareUpdateConfiguration.json                                   |
| [softwareUpdateConfigurationsGetByNameSample.js][softwareupdateconfigurationsgetbynamesample]                           | get a single software update configuration by name. x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/getSoftwareUpdateConfigurationByName.json                             |
| [softwareUpdateConfigurationsListSample.js][softwareupdateconfigurationslistsample]                                     | get all software update configurations for the account. x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/listSoftwareUpdateConfigurations.json                             |
| [sourceControlSyncJobStreamsGetSample.js][sourcecontrolsyncjobstreamsgetsample]                                         | retrieve a sync job stream identified by stream id. x-ms-original-file: 2024-10-23/sourceControlSyncJobStreams/getSourceControlSyncJobStreamsByStreamId.json                         |
| [sourceControlSyncJobStreamsListBySyncJobSample.js][sourcecontrolsyncjobstreamslistbysyncjobsample]                     | retrieve a list of sync job streams identified by sync job id. x-ms-original-file: 2024-10-23/sourceControlSyncJobStreams/getSourceControlSyncJobStreams.json                        |
| [testJobStreamsGetSample.js][testjobstreamsgetsample]                                                                   | retrieve a test job stream of the test job identified by runbook name and stream id. x-ms-original-file: 2024-10-23/runbook/getTestJobStream.json                                    |
| [testJobStreamsListByTestJobSample.js][testjobstreamslistbytestjobsample]                                               | retrieve a list of test job streams identified by runbook name. x-ms-original-file: 2024-10-23/runbook/listTestJobStreamsByJob.json                                                  |
| [usagesListByAutomationAccountSample.js][usageslistbyautomationaccountsample]                                           | retrieve the usage for the account id. x-ms-original-file: 2024-10-23/getUsagesOfAutomationAccount.json                                                                              |

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
node agentRegistrationInformationGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node agentRegistrationInformationGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentregistrationinformationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/agentRegistrationInformationGetSample.js
[agentregistrationinformationregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/agentRegistrationInformationRegenerateKeySample.js
[convertgraphrunbookcontentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/convertGraphRunbookContentSample.js
[deletedautomationaccountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/deletedAutomationAccountsListBySubscriptionSample.js
[dscnodeconfigurationlistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/dscNodeConfigurationListByAutomationAccountSample.js
[fieldslistbytypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/fieldsListByTypeSample.js
[hybridrunbookworkerscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/hybridRunbookWorkersCreateSample.js
[hybridrunbookworkersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/hybridRunbookWorkersDeleteSample.js
[hybridrunbookworkersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/hybridRunbookWorkersGetSample.js
[hybridrunbookworkerslistbyhybridrunbookworkergroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/hybridRunbookWorkersListByHybridRunbookWorkerGroupSample.js
[hybridrunbookworkersmovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/hybridRunbookWorkersMoveSample.js
[hybridrunbookworkerspatchsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/hybridRunbookWorkersPatchSample.js
[keyslistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/keysListByAutomationAccountSample.js
[nodecountinformationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/nodeCountInformationGetSample.js
[nodereportsgetcontentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/nodeReportsGetContentSample.js
[nodereportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/nodeReportsGetSample.js
[nodereportslistbynodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/nodeReportsListByNodeSample.js
[objectdatatypeslistfieldsbymoduleandtypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/objectDataTypesListFieldsByModuleAndTypeSample.js
[objectdatatypeslistfieldsbytypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/objectDataTypesListFieldsByTypeSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/operationsListSample.js
[packagecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/packageCreateOrUpdateSample.js
[packagedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/packageDeleteSample.js
[packagegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/packageGetSample.js
[packagelistbyruntimeenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/packageListByRuntimeEnvironmentSample.js
[packageupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/packageUpdateSample.js
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/privateEndpointConnectionsListByAutomationAccountSample.js
[privatelinkresourceslistautomationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/privateLinkResourcesListAutomationSample.js
[python2packagecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/python2PackageCreateOrUpdateSample.js
[python2packagedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/python2PackageDeleteSample.js
[python2packagegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/python2PackageGetSample.js
[python2packagelistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/python2PackageListByAutomationAccountSample.js
[python2packageupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/python2PackageUpdateSample.js
[python3packagecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/python3PackageCreateOrUpdateSample.js
[python3packagedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/python3PackageDeleteSample.js
[python3packagegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/python3PackageGetSample.js
[python3packagelistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/python3PackageListByAutomationAccountSample.js
[python3packageupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/python3PackageUpdateSample.js
[runbookgetcontentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/runbookGetContentSample.js
[runbookpublishsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/runbookPublishSample.js
[runtimeenvironmentscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/runtimeEnvironmentsCreateSample.js
[runtimeenvironmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/runtimeEnvironmentsDeleteSample.js
[runtimeenvironmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/runtimeEnvironmentsGetSample.js
[runtimeenvironmentslistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/runtimeEnvironmentsListByAutomationAccountSample.js
[runtimeenvironmentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/runtimeEnvironmentsUpdateSample.js
[softwareupdateconfigurationmachinerunsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/softwareUpdateConfigurationMachineRunsGetByIdSample.js
[softwareupdateconfigurationmachinerunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/softwareUpdateConfigurationMachineRunsListSample.js
[softwareupdateconfigurationrunsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/softwareUpdateConfigurationRunsGetByIdSample.js
[softwareupdateconfigurationrunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/softwareUpdateConfigurationRunsListSample.js
[softwareupdateconfigurationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/softwareUpdateConfigurationsCreateSample.js
[softwareupdateconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/softwareUpdateConfigurationsDeleteSample.js
[softwareupdateconfigurationsgetbynamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/softwareUpdateConfigurationsGetByNameSample.js
[softwareupdateconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/softwareUpdateConfigurationsListSample.js
[sourcecontrolsyncjobstreamsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/sourceControlSyncJobStreamsGetSample.js
[sourcecontrolsyncjobstreamslistbysyncjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/sourceControlSyncJobStreamsListBySyncJobSample.js
[testjobstreamsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/testJobStreamsGetSample.js
[testjobstreamslistbytestjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/testJobStreamsListByTestJobSample.js
[usageslistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/javascript/usagesListByAutomationAccountSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-automation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/automation/arm-automation/README.md

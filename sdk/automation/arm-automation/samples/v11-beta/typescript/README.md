# @azure/arm-automation client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-automation in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agentRegistrationInformationGetSample.ts][agentregistrationinformationgetsample]                                       | retrieve the automation agent registration information. x-ms-original-file: 2024-10-23/getAgentRegistration.json                                                                     |
| [agentRegistrationInformationRegenerateKeySample.ts][agentregistrationinformationregeneratekeysample]                   | regenerate a primary or secondary agent registration key x-ms-original-file: 2024-10-23/regenerateAgentRegistrationKey.json                                                          |
| [convertGraphRunbookContentSample.ts][convertgraphrunbookcontentsample]                                                 | post operation to serialize or deserialize GraphRunbookContent x-ms-original-file: 2024-10-23/deserializeGraphRunbookContent.json                                                    |
| [deletedAutomationAccountsListBySubscriptionSample.ts][deletedautomationaccountslistbysubscriptionsample]               | retrieve deleted automation account. x-ms-original-file: 2024-10-23/getDeletedAutomationAccount.json                                                                                 |
| [dscNodeConfigurationListByAutomationAccountSample.ts][dscnodeconfigurationlistbyautomationaccountsample]               | retrieve a list of dsc node configurations. x-ms-original-file: 2024-10-23/listDscNodeConfigurations.json                                                                            |
| [fieldsListByTypeSample.ts][fieldslistbytypesample]                                                                     | retrieve a list of fields of a given type identified by module name. x-ms-original-file: 2024-10-23/listFieldsByModuleAndType.json                                                   |
| [hybridRunbookWorkersCreateSample.ts][hybridrunbookworkerscreatesample]                                                 | create a hybrid runbook worker. x-ms-original-file: 2024-10-23/putHybridRunbookWorker.json                                                                                           |
| [hybridRunbookWorkersDeleteSample.ts][hybridrunbookworkersdeletesample]                                                 | delete a hybrid runbook worker. x-ms-original-file: 2024-10-23/deleteHybridRunbookWorker.json                                                                                        |
| [hybridRunbookWorkersGetSample.ts][hybridrunbookworkersgetsample]                                                       | retrieve a hybrid runbook worker. x-ms-original-file: 2024-10-23/getHybridRunbookWorker.json                                                                                         |
| [hybridRunbookWorkersListByHybridRunbookWorkerGroupSample.ts][hybridrunbookworkerslistbyhybridrunbookworkergroupsample] | retrieve a list of hybrid runbook workers. x-ms-original-file: 2024-10-23/listHybridRunbookWorker.json                                                                               |
| [hybridRunbookWorkersMoveSample.ts][hybridrunbookworkersmovesample]                                                     | move a hybrid worker to a different group. x-ms-original-file: 2024-10-23/moveHybridRunbookWorker.json                                                                               |
| [hybridRunbookWorkersPatchSample.ts][hybridrunbookworkerspatchsample]                                                   | update a hybrid runbook worker. x-ms-original-file: 2024-10-23/patchHybridRunbookWorker.json                                                                                         |
| [keysListByAutomationAccountSample.ts][keyslistbyautomationaccountsample]                                               | retrieve the automation keys for an account. x-ms-original-file: 2024-10-23/listAutomationAccountKeys.json                                                                           |
| [nodeCountInformationGetSample.ts][nodecountinformationgetsample]                                                       | retrieve counts for Dsc Nodes. x-ms-original-file: 2024-10-23/listPagedDscNodeConfigurationCounts.json                                                                               |
| [nodeReportsGetContentSample.ts][nodereportsgetcontentsample]                                                           | retrieve the Dsc node reports by node id and report id. x-ms-original-file: 2024-10-23/getDscNodeReportContent.json                                                                  |
| [nodeReportsGetSample.ts][nodereportsgetsample]                                                                         | retrieve the Dsc node report data by node id and report id. x-ms-original-file: 2024-10-23/getDscNodeReport.json                                                                     |
| [nodeReportsListByNodeSample.ts][nodereportslistbynodesample]                                                           | retrieve the Dsc node report list by node id. x-ms-original-file: 2024-10-23/listDscNodeReportsByNode.json                                                                           |
| [objectDataTypesListFieldsByModuleAndTypeSample.ts][objectdatatypeslistfieldsbymoduleandtypesample]                     | retrieve a list of fields of a given type identified by module name. x-ms-original-file: 2024-10-23/ObjectDataTypeslistFieldsByModuleAndType.json                                    |
| [objectDataTypesListFieldsByTypeSample.ts][objectdatatypeslistfieldsbytypesample]                                       | retrieve a list of fields of a given type across all accessible modules. x-ms-original-file: 2024-10-23/listFieldsByType.json                                                        |
| [operationsListSample.ts][operationslistsample]                                                                         | lists all of the available Automation REST API operations. x-ms-original-file: 2024-10-23/listRestAPIOperations.json                                                                 |
| [packageCreateOrUpdateSample.ts][packagecreateorupdatesample]                                                           | create or update the package identified by package name. x-ms-original-file: 2024-10-23/package/createOrUpdatePackage.json                                                           |
| [packageDeleteSample.ts][packagedeletesample]                                                                           | delete the package by name. x-ms-original-file: 2024-10-23/package/deletePackage.json                                                                                                |
| [packageGetSample.ts][packagegetsample]                                                                                 | retrieve the Package identified by Package name. x-ms-original-file: 2024-10-23/package/getPackage.json                                                                              |
| [packageListByRuntimeEnvironmentSample.ts][packagelistbyruntimeenvironmentsample]                                       | retrieve the a list of Packages x-ms-original-file: 2024-10-23/package/listPackagesByRuntimeEnvironment.json                                                                         |
| [packageUpdateSample.ts][packageupdatesample]                                                                           | update the Package identified by Package name. x-ms-original-file: 2024-10-23/package/updatePackage.json                                                                             |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]                     | approve or reject a private endpoint connection with a given name. x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionUpdate.json                     |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                     | deletes a private endpoint connection with a given name. x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionDelete.json                               |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                           | gets a private endpoint connection. x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionGet.json                                                       |
| [privateEndpointConnectionsListByAutomationAccountSample.ts][privateendpointconnectionslistbyautomationaccountsample]   | list all private endpoint connections on a Automation account. x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionListGet.json                        |
| [privateLinkResourcesListAutomationSample.ts][privatelinkresourceslistautomationsample]                                 | gets the private link resources that need to be created for Automation account. x-ms-original-file: 2024-10-23/PrivateLinkResourceListGet.json                                       |
| [python2PackageCreateOrUpdateSample.ts][python2packagecreateorupdatesample]                                             | create or Update the python 2 package identified by package name. x-ms-original-file: 2024-10-23/createOrUpdatePython2Package.json                                                   |
| [python2PackageDeleteSample.ts][python2packagedeletesample]                                                             | delete the python 2 package by name. x-ms-original-file: 2024-10-23/deletePython2Package.json                                                                                        |
| [python2PackageGetSample.ts][python2packagegetsample]                                                                   | retrieve the python 2 package identified by package name. x-ms-original-file: 2024-10-23/getPython2Package.json                                                                      |
| [python2PackageListByAutomationAccountSample.ts][python2packagelistbyautomationaccountsample]                           | retrieve a list of python 2 packages. x-ms-original-file: 2024-10-23/listPython2PackagesByAutomationAccount.json                                                                     |
| [python2PackageUpdateSample.ts][python2packageupdatesample]                                                             | update the python 2 package identified by package name. x-ms-original-file: 2024-10-23/updatePython2Package.json                                                                     |
| [python3PackageCreateOrUpdateSample.ts][python3packagecreateorupdatesample]                                             | create or Update the python 3 package identified by package name. x-ms-original-file: 2024-10-23/createOrUpdatePython3Package.json                                                   |
| [python3PackageDeleteSample.ts][python3packagedeletesample]                                                             | delete the python 3 package by name. x-ms-original-file: 2024-10-23/deletePython3Package.json                                                                                        |
| [python3PackageGetSample.ts][python3packagegetsample]                                                                   | retrieve the python 3 package identified by package name. x-ms-original-file: 2024-10-23/getPython3Package.json                                                                      |
| [python3PackageListByAutomationAccountSample.ts][python3packagelistbyautomationaccountsample]                           | retrieve a list of python 3 packages. x-ms-original-file: 2024-10-23/listPython3PackagesByAutomationAccount.json                                                                     |
| [python3PackageUpdateSample.ts][python3packageupdatesample]                                                             | update the python 3 package identified by package name. x-ms-original-file: 2024-10-23/updatePython3Package.json                                                                     |
| [runbookGetContentSample.ts][runbookgetcontentsample]                                                                   | retrieve the content of runbook identified by runbook name. x-ms-original-file: 2024-10-23/runbook/getRunbookContent.json                                                            |
| [runbookPublishSample.ts][runbookpublishsample]                                                                         | publish runbook draft. x-ms-original-file: 2024-10-23/runbook/publishRunbook.json                                                                                                    |
| [runtimeEnvironmentsCreateSample.ts][runtimeenvironmentscreatesample]                                                   | create or update Runtime Environment x-ms-original-file: 2024-10-23/runtimeEnvironment/createRuntimeEnvironment.json                                                                 |
| [runtimeEnvironmentsDeleteSample.ts][runtimeenvironmentsdeletesample]                                                   | delete the Runtime Environment. x-ms-original-file: 2024-10-23/runtimeEnvironment/deleteRuntimeEnvironment.json                                                                      |
| [runtimeEnvironmentsGetSample.ts][runtimeenvironmentsgetsample]                                                         | get information about the Runtime Environment x-ms-original-file: 2024-10-23/runtimeEnvironment/getRuntimeEnvironment.json                                                           |
| [runtimeEnvironmentsListByAutomationAccountSample.ts][runtimeenvironmentslistbyautomationaccountsample]                 | retrieve a list of RuntimeEnvironments. x-ms-original-file: 2024-10-23/runtimeEnvironment/listRuntimeEnvironmentsByAutomationAccount.json                                            |
| [runtimeEnvironmentsUpdateSample.ts][runtimeenvironmentsupdatesample]                                                   | update an Runtime Environment. x-ms-original-file: 2024-10-23/runtimeEnvironment/updateRuntimeEnvironment.json                                                                       |
| [softwareUpdateConfigurationMachineRunsGetByIdSample.ts][softwareupdateconfigurationmachinerunsgetbyidsample]           | get a single software update configuration machine run by Id. x-ms-original-file: 2024-10-23/softwareUpdateConfigurationMachineRun/getSoftwareUpdateConfigurationMachineRunById.json |
| [softwareUpdateConfigurationMachineRunsListSample.ts][softwareupdateconfigurationmachinerunslistsample]                 | return list of software update configuration machine runs x-ms-original-file: 2024-10-23/softwareUpdateConfigurationMachineRun/listSoftwareUpdateConfigurationMachineRuns.json       |
| [softwareUpdateConfigurationRunsGetByIdSample.ts][softwareupdateconfigurationrunsgetbyidsample]                         | get a single software update configuration Run by Id. x-ms-original-file: 2024-10-23/softwareUpdateConfigurationRun/getSoftwareUpdateConfigurationRunById.json                       |
| [softwareUpdateConfigurationRunsListSample.ts][softwareupdateconfigurationrunslistsample]                               | return list of software update configuration runs x-ms-original-file: 2024-10-23/softwareUpdateConfigurationRun/listFailedSoftwareUpdateConfigurationRuns.json                       |
| [softwareUpdateConfigurationsCreateSample.ts][softwareupdateconfigurationscreatesample]                                 | create a new software update configuration with the name given in the URI. x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/createSoftwareUpdateConfiguration.json         |
| [softwareUpdateConfigurationsDeleteSample.ts][softwareupdateconfigurationsdeletesample]                                 | delete a specific software update configuration. x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/deleteSoftwareUpdateConfiguration.json                                   |
| [softwareUpdateConfigurationsGetByNameSample.ts][softwareupdateconfigurationsgetbynamesample]                           | get a single software update configuration by name. x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/getSoftwareUpdateConfigurationByName.json                             |
| [softwareUpdateConfigurationsListSample.ts][softwareupdateconfigurationslistsample]                                     | get all software update configurations for the account. x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/listSoftwareUpdateConfigurations.json                             |
| [sourceControlSyncJobStreamsGetSample.ts][sourcecontrolsyncjobstreamsgetsample]                                         | retrieve a sync job stream identified by stream id. x-ms-original-file: 2024-10-23/sourceControlSyncJobStreams/getSourceControlSyncJobStreamsByStreamId.json                         |
| [sourceControlSyncJobStreamsListBySyncJobSample.ts][sourcecontrolsyncjobstreamslistbysyncjobsample]                     | retrieve a list of sync job streams identified by sync job id. x-ms-original-file: 2024-10-23/sourceControlSyncJobStreams/getSourceControlSyncJobStreams.json                        |
| [testJobStreamsGetSample.ts][testjobstreamsgetsample]                                                                   | retrieve a test job stream of the test job identified by runbook name and stream id. x-ms-original-file: 2024-10-23/runbook/getTestJobStream.json                                    |
| [testJobStreamsListByTestJobSample.ts][testjobstreamslistbytestjobsample]                                               | retrieve a list of test job streams identified by runbook name. x-ms-original-file: 2024-10-23/runbook/listTestJobStreamsByJob.json                                                  |
| [usagesListByAutomationAccountSample.ts][usageslistbyautomationaccountsample]                                           | retrieve the usage for the account id. x-ms-original-file: 2024-10-23/getUsagesOfAutomationAccount.json                                                                              |

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
node dist/agentRegistrationInformationGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/agentRegistrationInformationGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentregistrationinformationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/agentRegistrationInformationGetSample.ts
[agentregistrationinformationregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/agentRegistrationInformationRegenerateKeySample.ts
[convertgraphrunbookcontentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/convertGraphRunbookContentSample.ts
[deletedautomationaccountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/deletedAutomationAccountsListBySubscriptionSample.ts
[dscnodeconfigurationlistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/dscNodeConfigurationListByAutomationAccountSample.ts
[fieldslistbytypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/fieldsListByTypeSample.ts
[hybridrunbookworkerscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/hybridRunbookWorkersCreateSample.ts
[hybridrunbookworkersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/hybridRunbookWorkersDeleteSample.ts
[hybridrunbookworkersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/hybridRunbookWorkersGetSample.ts
[hybridrunbookworkerslistbyhybridrunbookworkergroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/hybridRunbookWorkersListByHybridRunbookWorkerGroupSample.ts
[hybridrunbookworkersmovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/hybridRunbookWorkersMoveSample.ts
[hybridrunbookworkerspatchsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/hybridRunbookWorkersPatchSample.ts
[keyslistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/keysListByAutomationAccountSample.ts
[nodecountinformationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/nodeCountInformationGetSample.ts
[nodereportsgetcontentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/nodeReportsGetContentSample.ts
[nodereportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/nodeReportsGetSample.ts
[nodereportslistbynodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/nodeReportsListByNodeSample.ts
[objectdatatypeslistfieldsbymoduleandtypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/objectDataTypesListFieldsByModuleAndTypeSample.ts
[objectdatatypeslistfieldsbytypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/objectDataTypesListFieldsByTypeSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/operationsListSample.ts
[packagecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/packageCreateOrUpdateSample.ts
[packagedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/packageDeleteSample.ts
[packagegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/packageGetSample.ts
[packagelistbyruntimeenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/packageListByRuntimeEnvironmentSample.ts
[packageupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/packageUpdateSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/privateEndpointConnectionsListByAutomationAccountSample.ts
[privatelinkresourceslistautomationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/privateLinkResourcesListAutomationSample.ts
[python2packagecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/python2PackageCreateOrUpdateSample.ts
[python2packagedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/python2PackageDeleteSample.ts
[python2packagegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/python2PackageGetSample.ts
[python2packagelistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/python2PackageListByAutomationAccountSample.ts
[python2packageupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/python2PackageUpdateSample.ts
[python3packagecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/python3PackageCreateOrUpdateSample.ts
[python3packagedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/python3PackageDeleteSample.ts
[python3packagegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/python3PackageGetSample.ts
[python3packagelistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/python3PackageListByAutomationAccountSample.ts
[python3packageupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/python3PackageUpdateSample.ts
[runbookgetcontentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/runbookGetContentSample.ts
[runbookpublishsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/runbookPublishSample.ts
[runtimeenvironmentscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/runtimeEnvironmentsCreateSample.ts
[runtimeenvironmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/runtimeEnvironmentsDeleteSample.ts
[runtimeenvironmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/runtimeEnvironmentsGetSample.ts
[runtimeenvironmentslistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/runtimeEnvironmentsListByAutomationAccountSample.ts
[runtimeenvironmentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/runtimeEnvironmentsUpdateSample.ts
[softwareupdateconfigurationmachinerunsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/softwareUpdateConfigurationMachineRunsGetByIdSample.ts
[softwareupdateconfigurationmachinerunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/softwareUpdateConfigurationMachineRunsListSample.ts
[softwareupdateconfigurationrunsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/softwareUpdateConfigurationRunsGetByIdSample.ts
[softwareupdateconfigurationrunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/softwareUpdateConfigurationRunsListSample.ts
[softwareupdateconfigurationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/softwareUpdateConfigurationsCreateSample.ts
[softwareupdateconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/softwareUpdateConfigurationsDeleteSample.ts
[softwareupdateconfigurationsgetbynamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/softwareUpdateConfigurationsGetByNameSample.ts
[softwareupdateconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/softwareUpdateConfigurationsListSample.ts
[sourcecontrolsyncjobstreamsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/sourceControlSyncJobStreamsGetSample.ts
[sourcecontrolsyncjobstreamslistbysyncjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/sourceControlSyncJobStreamsListBySyncJobSample.ts
[testjobstreamsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/testJobStreamsGetSample.ts
[testjobstreamslistbytestjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/testJobStreamsListByTestJobSample.ts
[usageslistbyautomationaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/automation/arm-automation/samples/v11-beta/typescript/src/usagesListByAutomationAccountSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-automation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/automation/arm-automation/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

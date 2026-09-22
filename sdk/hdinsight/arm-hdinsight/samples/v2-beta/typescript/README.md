# @azure/arm-hdinsight client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-hdinsight in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [applicationsCreateSample.ts][applicationscreatesample]                                                       | creates applications for the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/CreateApplication.json                                                                                                                                 |
| [applicationsDeleteSample.ts][applicationsdeletesample]                                                       | deletes the specified application on the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/DeleteApplication.json                                                                                                                     |
| [applicationsGetAzureAsyncOperationStatusSample.ts][applicationsgetazureasyncoperationstatussample]           | gets the async operation status. x-ms-original-file: 2025-01-15-preview/GetApplicationCreationAsyncOperationStatus.json                                                                                                                       |
| [applicationsGetSample.ts][applicationsgetsample]                                                             | gets properties of the specified application. x-ms-original-file: 2025-01-15-preview/GetApplicationCreated.json                                                                                                                               |
| [applicationsListByClusterSample.ts][applicationslistbyclustersample]                                         | lists all of the applications for the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/GetAllApplications.json                                                                                                                       |
| [clustersCreateSample.ts][clusterscreatesample]                                                               | creates a new HDInsight cluster with the specified parameters. x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithADLSGen2Msi.json                                                                                              |
| [clustersDeleteSample.ts][clustersdeletesample]                                                               | deletes the specified HDInsight cluster. x-ms-original-file: 2025-01-15-preview/DeleteLinuxHadoopCluster.json                                                                                                                                 |
| [clustersExecuteScriptActionsSample.ts][clustersexecutescriptactionssample]                                   | executes script actions on the specified HDInsight cluster. x-ms-original-file: 2025-01-15-preview/PostExecuteScriptAction.json                                                                                                               |
| [clustersGetAzureAsyncOperationStatusSample.ts][clustersgetazureasyncoperationstatussample]                   | the the async operation status. x-ms-original-file: 2025-01-15-preview/GetClusterCreatingAsyncOperationStatus.json                                                                                                                            |
| [clustersGetGatewaySettingsSample.ts][clustersgetgatewaysettingssample]                                       | gets the gateway settings for the specified cluster. x-ms-original-file: 2025-01-15-preview/HDI_Clusters_GetGatewaySettings.json                                                                                                              |
| [clustersGetSample.ts][clustersgetsample]                                                                     | gets the specified cluster. x-ms-original-file: 2025-01-15-preview/GetLinuxHadoopCluster.json                                                                                                                                                 |
| [clustersListByResourceGroupSample.ts][clusterslistbyresourcegroupsample]                                     | lists the HDInsight clusters in a resource group. x-ms-original-file: 2025-01-15-preview/GetLinuxHadoopAllClustersInResourceGroup.json                                                                                                        |
| [clustersListSample.ts][clusterslistsample]                                                                   | lists all the HDInsight clusters under the subscription. x-ms-original-file: 2025-01-15-preview/GetLinuxHadoopAllClusters.json                                                                                                                |
| [clustersResizeSample.ts][clustersresizesample]                                                               | resizes the specified HDInsight cluster to the specified size. x-ms-original-file: 2025-01-15-preview/ResizeLinuxHadoopCluster.json                                                                                                           |
| [clustersRotateDiskEncryptionKeySample.ts][clustersrotatediskencryptionkeysample]                             | rotate disk encryption key of the specified HDInsight cluster. x-ms-original-file: 2025-01-15-preview/RotateLinuxHadoopClusterDiskEncryptionKey.json                                                                                          |
| [clustersUpdateAutoScaleConfigurationSample.ts][clustersupdateautoscaleconfigurationsample]                   | updates the Autoscale Configuration for HDInsight cluster. x-ms-original-file: 2025-01-15-preview/DisableClusterAutoScale.json                                                                                                                |
| [clustersUpdateGatewaySettingsSample.ts][clustersupdategatewaysettingssample]                                 | configures the gateway settings on the specified cluster. x-ms-original-file: 2025-01-15-preview/HDI_Clusters_UpdateGatewaySettings_Enable.json                                                                                               |
| [clustersUpdateIdentityCertificateSample.ts][clustersupdateidentitycertificatesample]                         | updates the cluster identity certificate. x-ms-original-file: 2025-01-15-preview/HDI_Clusters_UpdateClusterIdentityCertificate.json                                                                                                           |
| [clustersUpdateSample.ts][clustersupdatesample]                                                               | patch HDInsight cluster with the specified parameters. x-ms-original-file: 2025-01-15-preview/PatchLinuxHadoopCluster.json                                                                                                                    |
| [configurationsGetSample.ts][configurationsgetsample]                                                         | the configuration object for the specified cluster. This API is not recommended and might be removed in the future. Please consider using List configurations API instead. x-ms-original-file: 2025-01-15-preview/HDI_Configurations_Get.json |
| [configurationsListSample.ts][configurationslistsample]                                                       | gets all configuration information for an HDI cluster. x-ms-original-file: 2025-01-15-preview/HDI_Configurations_List.json                                                                                                                    |
| [configurationsUpdateSample.ts][configurationsupdatesample]                                                   | configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead. x-ms-original-file: 2025-01-15-preview/ChangeHttpConnectivityDisable.json                        |
| [extensionsCreateSample.ts][extensionscreatesample]                                                           | creates an HDInsight cluster extension. x-ms-original-file: 2025-01-15-preview/CreateExtension.json                                                                                                                                           |
| [extensionsDeleteSample.ts][extensionsdeletesample]                                                           | deletes the specified extension for HDInsight cluster. x-ms-original-file: 2025-01-15-preview/DeleteExtension.json                                                                                                                            |
| [extensionsDisableAzureMonitorAgentSample.ts][extensionsdisableazuremonitoragentsample]                       | disables the Azure Monitor Agent on the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/DisableLinuxClusterAzureMonitorAgent.json                                                                                                   |
| [extensionsDisableAzureMonitorSample.ts][extensionsdisableazuremonitorsample]                                 | disables the Azure Monitor on the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/DisableLinuxClusterAzureMonitor.json                                                                                                              |
| [extensionsDisableMonitoringSample.ts][extensionsdisablemonitoringsample]                                     | disables the Operations Management Suite (OMS) on the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/DisableLinuxClusterMonitoring.json                                                                                            |
| [extensionsEnableAzureMonitorAgentSample.ts][extensionsenableazuremonitoragentsample]                         | enables the Azure Monitor Agent on the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/EnableLinuxClusterAzureMonitorAgent.json                                                                                                     |
| [extensionsEnableAzureMonitorSample.ts][extensionsenableazuremonitorsample]                                   | enables the Azure Monitor on the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/EnableLinuxClusterAzureMonitor.json                                                                                                                |
| [extensionsEnableMonitoringSample.ts][extensionsenablemonitoringsample]                                       | enables the Operations Management Suite (OMS) on the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/EnableLinuxClusterMonitoring.json                                                                                              |
| [extensionsGetAzureAsyncOperationStatusSample.ts][extensionsgetazureasyncoperationstatussample]               | gets the async operation status. x-ms-original-file: 2025-01-15-preview/GetExtensionCreationAsyncOperationStatus.json                                                                                                                         |
| [extensionsGetAzureMonitorAgentStatusSample.ts][extensionsgetazuremonitoragentstatussample]                   | gets the status of Azure Monitor Agent on the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/GetLinuxClusterAzureMonitorAgentStatus.json                                                                                           |
| [extensionsGetAzureMonitorStatusSample.ts][extensionsgetazuremonitorstatussample]                             | gets the status of Azure Monitor on the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/GetLinuxClusterAzureMonitorStatus.json                                                                                                      |
| [extensionsGetMonitoringStatusSample.ts][extensionsgetmonitoringstatussample]                                 | gets the status of Operations Management Suite (OMS) on the HDInsight cluster. x-ms-original-file: 2025-01-15-preview/GetLinuxClusterMonitoringStatus.json                                                                                    |
| [extensionsGetSample.ts][extensionsgetsample]                                                                 | gets the extension properties for the specified HDInsight cluster extension. x-ms-original-file: 2025-01-15-preview/GetExtension.json                                                                                                         |
| [locationsCheckNameAvailabilitySample.ts][locationschecknameavailabilitysample]                               | check the cluster name is available or not. x-ms-original-file: 2025-01-15-preview/HDI_Locations_CheckClusterNameAvailability.json                                                                                                            |
| [locationsGetAzureAsyncOperationStatusSample.ts][locationsgetazureasyncoperationstatussample]                 | get the async operation status. x-ms-original-file: 2025-01-15-preview/HDI_Locations_GetAsyncOperationStatus.json                                                                                                                             |
| [locationsGetCapabilitiesSample.ts][locationsgetcapabilitiessample]                                           | gets the capabilities for the specified location. x-ms-original-file: 2025-01-15-preview/GetHDInsightCapabilities.json                                                                                                                        |
| [locationsListBillingSpecsSample.ts][locationslistbillingspecssample]                                         | lists the billingSpecs for the specified subscription and location. x-ms-original-file: 2025-01-15-preview/HDI_Locations_ListBillingSpecs.json                                                                                                |
| [locationsListUsagesSample.ts][locationslistusagessample]                                                     | lists the usages for the specified location. x-ms-original-file: 2025-01-15-preview/GetHDInsightUsages.json                                                                                                                                   |
| [locationsValidateClusterCreateRequestSample.ts][locationsvalidateclustercreaterequestsample]                 | validate the cluster create request spec is valid or not. x-ms-original-file: 2025-01-15-preview/HDI_Locations_ValidateClusterCreateRequest.json                                                                                              |
| [operationsListSample.ts][operationslistsample]                                                               | lists all of the available HDInsight REST API operations. x-ms-original-file: 2025-01-15-preview/ListHDInsightOperations.json                                                                                                                 |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]           | approve or reject a private endpoint connection manually. x-ms-original-file: 2025-01-15-preview/ApprovePrivateEndpointConnection.json                                                                                                        |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                           | deletes the specific private endpoint connection. x-ms-original-file: 2025-01-15-preview/DeletePrivateEndpointConnection.json                                                                                                                 |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                 | gets the specific private endpoint connection. x-ms-original-file: 2025-01-15-preview/GetPrivateEndpointConnection.json                                                                                                                       |
| [privateEndpointConnectionsListByClusterSample.ts][privateendpointconnectionslistbyclustersample]             | lists the private endpoint connections for a HDInsight cluster. x-ms-original-file: 2025-01-15-preview/GetAllPrivateEndpointConnectionsInCluster.json                                                                                         |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                             | gets the specific private link resource. x-ms-original-file: 2025-01-15-preview/GetPrivateLinkResource.json                                                                                                                                   |
| [privateLinkResourcesListByClusterSample.ts][privatelinkresourceslistbyclustersample]                         | lists the private link resources in a HDInsight cluster. x-ms-original-file: 2025-01-15-preview/GetAllPrivateLinkResourcesInCluster.json                                                                                                      |
| [scriptActionsDeleteSample.ts][scriptactionsdeletesample]                                                     | deletes a specified persisted script action of the cluster. x-ms-original-file: 2025-01-15-preview/DeleteScriptAction.json                                                                                                                    |
| [scriptActionsGetExecutionAsyncOperationStatusSample.ts][scriptactionsgetexecutionasyncoperationstatussample] | gets the async operation status of execution operation. x-ms-original-file: 2025-01-15-preview/GetScriptExecutionAsyncOperationStatus.json                                                                                                    |
| [scriptActionsGetExecutionDetailSample.ts][scriptactionsgetexecutiondetailsample]                             | gets the script execution detail for the given script execution ID. x-ms-original-file: 2025-01-15-preview/GetScriptActionById.json                                                                                                           |
| [scriptActionsListByClusterSample.ts][scriptactionslistbyclustersample]                                       | lists all the persisted script actions for the specified cluster. x-ms-original-file: 2025-01-15-preview/GetLinuxHadoopScriptAction.json                                                                                                      |
| [scriptExecutionHistoryListByClusterSample.ts][scriptexecutionhistorylistbyclustersample]                     | lists all scripts' execution history for the specified cluster. x-ms-original-file: 2025-01-15-preview/GetScriptExecutionHistory.json                                                                                                         |
| [scriptExecutionHistoryPromoteSample.ts][scriptexecutionhistorypromotesample]                                 | promotes the specified ad-hoc script execution to a persisted script. x-ms-original-file: 2025-01-15-preview/PromoteLinuxHadoopScriptAction.json                                                                                              |
| [virtualMachinesGetAsyncOperationStatusSample.ts][virtualmachinesgetasyncoperationstatussample]               | gets the async operation status. x-ms-original-file: 2025-01-15-preview/GetRestartHostsAsyncOperationStatus.json                                                                                                                              |
| [virtualMachinesListHostsSample.ts][virtualmachineslisthostssample]                                           | lists the HDInsight clusters hosts x-ms-original-file: 2025-01-15-preview/GetClusterVirtualMachines.json                                                                                                                                      |
| [virtualMachinesRestartHostsSample.ts][virtualmachinesrestarthostssample]                                     | restarts the specified HDInsight cluster hosts. x-ms-original-file: 2025-01-15-preview/RestartVirtualMachinesOperation.json                                                                                                                   |

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
node dist/applicationsCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/applicationsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applicationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/applicationsCreateSample.ts
[applicationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/applicationsDeleteSample.ts
[applicationsgetazureasyncoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/applicationsGetAzureAsyncOperationStatusSample.ts
[applicationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/applicationsGetSample.ts
[applicationslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/applicationsListByClusterSample.ts
[clusterscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersCreateSample.ts
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersDeleteSample.ts
[clustersexecutescriptactionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersExecuteScriptActionsSample.ts
[clustersgetazureasyncoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersGetAzureAsyncOperationStatusSample.ts
[clustersgetgatewaysettingssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersGetGatewaySettingsSample.ts
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersGetSample.ts
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersListByResourceGroupSample.ts
[clusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersListSample.ts
[clustersresizesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersResizeSample.ts
[clustersrotatediskencryptionkeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersRotateDiskEncryptionKeySample.ts
[clustersupdateautoscaleconfigurationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersUpdateAutoScaleConfigurationSample.ts
[clustersupdategatewaysettingssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersUpdateGatewaySettingsSample.ts
[clustersupdateidentitycertificatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersUpdateIdentityCertificateSample.ts
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/clustersUpdateSample.ts
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/configurationsGetSample.ts
[configurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/configurationsListSample.ts
[configurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/configurationsUpdateSample.ts
[extensionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsCreateSample.ts
[extensionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsDeleteSample.ts
[extensionsdisableazuremonitoragentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsDisableAzureMonitorAgentSample.ts
[extensionsdisableazuremonitorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsDisableAzureMonitorSample.ts
[extensionsdisablemonitoringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsDisableMonitoringSample.ts
[extensionsenableazuremonitoragentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsEnableAzureMonitorAgentSample.ts
[extensionsenableazuremonitorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsEnableAzureMonitorSample.ts
[extensionsenablemonitoringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsEnableMonitoringSample.ts
[extensionsgetazureasyncoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsGetAzureAsyncOperationStatusSample.ts
[extensionsgetazuremonitoragentstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsGetAzureMonitorAgentStatusSample.ts
[extensionsgetazuremonitorstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsGetAzureMonitorStatusSample.ts
[extensionsgetmonitoringstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsGetMonitoringStatusSample.ts
[extensionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/extensionsGetSample.ts
[locationschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/locationsCheckNameAvailabilitySample.ts
[locationsgetazureasyncoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/locationsGetAzureAsyncOperationStatusSample.ts
[locationsgetcapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/locationsGetCapabilitiesSample.ts
[locationslistbillingspecssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/locationsListBillingSpecsSample.ts
[locationslistusagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/locationsListUsagesSample.ts
[locationsvalidateclustercreaterequestsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/locationsValidateClusterCreateRequestSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/privateEndpointConnectionsListByClusterSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/privateLinkResourcesListByClusterSample.ts
[scriptactionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/scriptActionsDeleteSample.ts
[scriptactionsgetexecutionasyncoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/scriptActionsGetExecutionAsyncOperationStatusSample.ts
[scriptactionsgetexecutiondetailsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/scriptActionsGetExecutionDetailSample.ts
[scriptactionslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/scriptActionsListByClusterSample.ts
[scriptexecutionhistorylistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/scriptExecutionHistoryListByClusterSample.ts
[scriptexecutionhistorypromotesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/scriptExecutionHistoryPromoteSample.ts
[virtualmachinesgetasyncoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/virtualMachinesGetAsyncOperationStatusSample.ts
[virtualmachineslisthostssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/virtualMachinesListHostsSample.ts
[virtualmachinesrestarthostssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hdinsight/arm-hdinsight/samples/v2-beta/typescript/src/virtualMachinesRestartHostsSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hdinsight?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hdinsight/arm-hdinsight/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

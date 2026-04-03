# @azure/arm-azurestackhci client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-azurestackhci in some common scenarios.

| **File Name**                                                                                                                           | **Description**                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [arcSettingsConsentAndInstallDefaultExtensionsSample.ts][arcsettingsconsentandinstalldefaultextensionssample]                           | add consent time for default extensions and initiate extensions installation x-ms-original-file: 2026-02-01/ConsentAndInstallDefaultExtensions.json |
| [arcSettingsCreateIdentitySample.ts][arcsettingscreateidentitysample]                                                                   | create Aad identity for arc settings. x-ms-original-file: 2026-02-01/CreateArcIdentity.json                                                         |
| [arcSettingsCreateSample.ts][arcsettingscreatesample]                                                                                   | create ArcSetting for HCI cluster. x-ms-original-file: 2026-02-01/PutArcSetting.json                                                                |
| [arcSettingsDeleteSample.ts][arcsettingsdeletesample]                                                                                   | delete ArcSetting resource details of HCI Cluster. x-ms-original-file: 2026-02-01/DeleteArcSetting.json                                             |
| [arcSettingsGeneratePasswordSample.ts][arcsettingsgeneratepasswordsample]                                                               | generate password for arc settings. x-ms-original-file: 2026-02-01/GeneratePassword.json                                                            |
| [arcSettingsGetSample.ts][arcsettingsgetsample]                                                                                         | get ArcSetting resource details of HCI Cluster. x-ms-original-file: 2026-02-01/GetArcSetting.json                                                   |
| [arcSettingsInitializeDisableProcessSample.ts][arcsettingsinitializedisableprocesssample]                                               | initializes ARC Disable process on the cluster x-ms-original-file: 2026-02-01/InitializeDisableProcess.json                                         |
| [arcSettingsListByClusterSample.ts][arcsettingslistbyclustersample]                                                                     | get ArcSetting resources of HCI Cluster. x-ms-original-file: 2026-02-01/ListArcSettingsByCluster.json                                               |
| [arcSettingsReconcileSample.ts][arcsettingsreconcilesample]                                                                             | reconcile Arc Settings with information related to all nodes. x-ms-original-file: 2026-02-01/reconcileArcSettings.json                              |
| [arcSettingsUpdateSample.ts][arcsettingsupdatesample]                                                                                   | update ArcSettings for HCI cluster. x-ms-original-file: 2026-02-01/PatchArcSetting.json                                                             |
| [clustersConfigureRemoteSupportSample.ts][clustersconfigureremotesupportsample]                                                         | configure RemoteSupport on a cluster x-ms-original-file: 2026-02-01/ConfigureRemoteSupport.json                                                     |
| [clustersCreateIdentitySample.ts][clusterscreateidentitysample]                                                                         | create cluster identity. x-ms-original-file: 2026-02-01/CreateClusterIdentity.json                                                                  |
| [clustersCreateSample.ts][clusterscreatesample]                                                                                         | create an HCI cluster. x-ms-original-file: 2026-02-01/CreateCluster.json                                                                            |
| [clustersDeleteSample.ts][clustersdeletesample]                                                                                         | delete an HCI cluster. x-ms-original-file: 2026-02-01/DeleteCluster.json                                                                            |
| [clustersExtendSoftwareAssuranceBenefitSample.ts][clustersextendsoftwareassurancebenefitsample]                                         | extends Software Assurance Benefit to a cluster x-ms-original-file: 2026-02-01/ExtendSoftwareAssuranceBenefit.json                                  |
| [clustersGetSample.ts][clustersgetsample]                                                                                               | get HCI cluster. x-ms-original-file: 2026-02-01/GetCluster.json                                                                                     |
| [clustersListByResourceGroupSample.ts][clusterslistbyresourcegroupsample]                                                               | list all HCI clusters in a resource group. x-ms-original-file: 2026-02-01/ListClustersByResourceGroup.json                                          |
| [clustersListBySubscriptionSample.ts][clusterslistbysubscriptionsample]                                                                 | list all HCI clusters in a subscription. x-ms-original-file: 2026-02-01/ListClustersBySubscription.json                                             |
| [clustersTriggerLogCollectionSample.ts][clusterstriggerlogcollectionsample]                                                             | trigger Log Collection on a cluster x-ms-original-file: 2026-02-01/TriggerLogCollection.json                                                        |
| [clustersUpdateSample.ts][clustersupdatesample]                                                                                         | update an HCI cluster. x-ms-original-file: 2026-02-01/UpdateCluster.json                                                                            |
| [clustersUpdateSecretsLocationsSample.ts][clustersupdatesecretslocationssample]                                                         | update cluster secrets locations. x-ms-original-file: 2026-02-01/Clusters_UpdateSecretsLocations.json                                               |
| [clustersUploadCertificateSample.ts][clustersuploadcertificatesample]                                                                   | upload certificate. x-ms-original-file: 2026-02-01/UploadCertificate.json                                                                           |
| [deploymentSettingsCreateOrUpdateSample.ts][deploymentsettingscreateorupdatesample]                                                     | create a DeploymentSetting x-ms-original-file: 2026-02-01/PutDeploymentSettings.json                                                                |
| [deploymentSettingsDeleteSample.ts][deploymentsettingsdeletesample]                                                                     | delete a DeploymentSetting x-ms-original-file: 2026-02-01/DeleteDeploymentSettings.json                                                             |
| [deploymentSettingsGetSample.ts][deploymentsettingsgetsample]                                                                           | get a DeploymentSetting x-ms-original-file: 2026-02-01/GetDeploymentSettings.json                                                                   |
| [deploymentSettingsListByClustersSample.ts][deploymentsettingslistbyclusterssample]                                                     | list DeploymentSetting resources by Clusters x-ms-original-file: 2026-02-01/ListDeploymentSettingsByCluster.json                                    |
| [edgeDeviceJobsCreateOrUpdateSample.ts][edgedevicejobscreateorupdatesample]                                                             | create a EdgeDeviceJob x-ms-original-file: 2026-02-01/EdgeDeviceJobs_CreateOrUpdate_CollectLog.json                                                 |
| [edgeDeviceJobsDeleteSample.ts][edgedevicejobsdeletesample]                                                                             | delete a EdgeDeviceJob x-ms-original-file: 2026-02-01/EdgeDeviceJobs_Delete.json                                                                    |
| [edgeDeviceJobsGetSample.ts][edgedevicejobsgetsample]                                                                                   | get a EdgeDeviceJob x-ms-original-file: 2026-02-01/EdgeDeviceJobs_Get_RemoteSupport.json                                                            |
| [edgeDeviceJobsListByEdgeDeviceSample.ts][edgedevicejobslistbyedgedevicesample]                                                         | list EdgeDeviceJob resources by EdgeDevice x-ms-original-file: 2026-02-01/EdgeDeviceJobs_ListByEdgeDevice.json                                      |
| [edgeDevicesCreateOrUpdateSample.ts][edgedevicescreateorupdatesample]                                                                   | create a EdgeDevice x-ms-original-file: 2026-02-01/CreateHciEdgeDevice.json                                                                         |
| [edgeDevicesDeleteSample.ts][edgedevicesdeletesample]                                                                                   | delete a EdgeDevice x-ms-original-file: 2026-02-01/DeleteEdgeDevices.json                                                                           |
| [edgeDevicesGetSample.ts][edgedevicesgetsample]                                                                                         | get a EdgeDevice x-ms-original-file: 2026-02-01/GetEdgeDevices.json                                                                                 |
| [edgeDevicesListSample.ts][edgedeviceslistsample]                                                                                       | list EdgeDevice resources by parent x-ms-original-file: 2026-02-01/ListEdgeDevices.json                                                             |
| [edgeDevicesValidateSample.ts][edgedevicesvalidatesample]                                                                               | a long-running resource action. x-ms-original-file: 2026-02-01/ValidateEdgeDevices.json                                                             |
| [extensionsCreateSample.ts][extensionscreatesample]                                                                                     | create Extension for HCI cluster. x-ms-original-file: 2026-02-01/PutExtension.json                                                                  |
| [extensionsDeleteSample.ts][extensionsdeletesample]                                                                                     | delete particular Arc Extension of HCI Cluster. x-ms-original-file: 2026-02-01/DeleteExtension.json                                                 |
| [extensionsGetSample.ts][extensionsgetsample]                                                                                           | get particular Arc Extension of HCI Cluster. x-ms-original-file: 2026-02-01/GetExtension.json                                                       |
| [extensionsListByArcSettingSample.ts][extensionslistbyarcsettingsample]                                                                 | list all Extensions under ArcSetting resource. x-ms-original-file: 2026-02-01/ListExtensionsByArcSetting.json                                       |
| [extensionsUpdateSample.ts][extensionsupdatesample]                                                                                     | update Extension for HCI cluster. x-ms-original-file: 2026-02-01/PatchExtension.json                                                                |
| [extensionsUpgradeSample.ts][extensionsupgradesample]                                                                                   | upgrade a particular Arc Extension of HCI Cluster. x-ms-original-file: 2026-02-01/Extensions_Upgrade.json                                           |
| [offersGetSample.ts][offersgetsample]                                                                                                   | get Offer resource details within a publisher of HCI Cluster. x-ms-original-file: 2026-02-01/GetOffer.json                                          |
| [offersListByClusterSample.ts][offerslistbyclustersample]                                                                               | list Offers available across publishers for the HCI Cluster. x-ms-original-file: 2026-02-01/ListOffersByCluster.json                                |
| [offersListByPublisherSample.ts][offerslistbypublishersample]                                                                           | list Offers available for a publisher within the HCI Cluster. x-ms-original-file: 2026-02-01/ListOffersByPublisher.json                             |
| [operationsListSample.ts][operationslistsample]                                                                                         | list the operations for the provider x-ms-original-file: 2026-02-01/Operations_List.json                                                            |
| [securitySettingsCreateOrUpdateSample.ts][securitysettingscreateorupdatesample]                                                         | create a security setting x-ms-original-file: 2026-02-01/PutSecuritySettings.json                                                                   |
| [securitySettingsDeleteSample.ts][securitysettingsdeletesample]                                                                         | delete a SecuritySetting x-ms-original-file: 2026-02-01/DeleteSecuritySettings.json                                                                 |
| [securitySettingsGetSample.ts][securitysettingsgetsample]                                                                               | get a SecuritySetting x-ms-original-file: 2026-02-01/GetSecuritySettings.json                                                                       |
| [securitySettingsListByClustersSample.ts][securitysettingslistbyclusterssample]                                                         | list SecuritySetting resources by Clusters x-ms-original-file: 2026-02-01/ListSecuritySettingsByCluster.json                                        |
| [skusGetSample.ts][skusgetsample]                                                                                                       | get SKU resource details within a offer of HCI Cluster. x-ms-original-file: 2026-02-01/GetSku.json                                                  |
| [skusListByOfferSample.ts][skuslistbyoffersample]                                                                                       | list Skus available for a offer within the HCI Cluster. x-ms-original-file: 2026-02-01/ListSkusByOffer.json                                         |
| [updateRunsDeleteSample.ts][updaterunsdeletesample]                                                                                     | delete specified Update Run x-ms-original-file: 2026-02-01/DeleteUpdateRuns.json                                                                    |
| [updateRunsGetSample.ts][updaterunsgetsample]                                                                                           | get the Update run for a specified update x-ms-original-file: 2026-02-01/GetUpdateRuns.json                                                         |
| [updateRunsListSample.ts][updaterunslistsample]                                                                                         | list all Update runs for a specified update x-ms-original-file: 2026-02-01/ListUpdateRuns.json                                                      |
| [updateRunsPutSample.ts][updaterunsputsample]                                                                                           | put Update runs for a specified update x-ms-original-file: 2026-02-01/PutUpdateRuns.json                                                            |
| [updateSummariesDeleteSample.ts][updatesummariesdeletesample]                                                                           | delete Update Summaries x-ms-original-file: 2026-02-01/DeleteUpdateSummaries.json                                                                   |
| [updateSummariesGetSample.ts][updatesummariesgetsample]                                                                                 | get all Update summaries under the HCI cluster x-ms-original-file: 2026-02-01/GetUpdateSummaries.json                                               |
| [updateSummariesListSample.ts][updatesummarieslistsample]                                                                               | list all Update summaries under the HCI cluster x-ms-original-file: 2026-02-01/ListUpdateSummaries.json                                             |
| [updateSummariesPutSample.ts][updatesummariesputsample]                                                                                 | put Update summaries under the HCI cluster x-ms-original-file: 2026-02-01/PutUpdateSummaries.json                                                   |
| [updatesDeleteSample.ts][updatesdeletesample]                                                                                           | delete specified Update x-ms-original-file: 2026-02-01/DeleteUpdates.json                                                                           |
| [updatesGetSample.ts][updatesgetsample]                                                                                                 | get specified Update x-ms-original-file: 2026-02-01/GetUpdates.json                                                                                 |
| [updatesListSample.ts][updateslistsample]                                                                                               | list all Updates x-ms-original-file: 2026-02-01/ListUpdates.json                                                                                    |
| [updatesPostSample.ts][updatespostsample]                                                                                               | apply Update x-ms-original-file: 2026-02-01/PostUpdates.json                                                                                        |
| [updatesPutSample.ts][updatesputsample]                                                                                                 | put specified Update x-ms-original-file: 2026-02-01/PutUpdates.json                                                                                 |
| [validatedSolutionRecipesGetSample.ts][validatedsolutionrecipesgetsample]                                                               | get a validated solution recipe. x-ms-original-file: 2026-02-01/ValidatedSolutionRecipes_Get.json                                                   |
| [validatedSolutionRecipesListBySubscriptionLocationResourceSample.ts][validatedsolutionrecipeslistbysubscriptionlocationresourcesample] | list all validated solution recipes. x-ms-original-file: 2026-02-01/ValidatedSolutionRecipes_ListBySubscriptionLocationResource.json                |

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
node dist/arcSettingsConsentAndInstallDefaultExtensionsSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/arcSettingsConsentAndInstallDefaultExtensionsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[arcsettingsconsentandinstalldefaultextensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/arcSettingsConsentAndInstallDefaultExtensionsSample.ts
[arcsettingscreateidentitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/arcSettingsCreateIdentitySample.ts
[arcsettingscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/arcSettingsCreateSample.ts
[arcsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/arcSettingsDeleteSample.ts
[arcsettingsgeneratepasswordsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/arcSettingsGeneratePasswordSample.ts
[arcsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/arcSettingsGetSample.ts
[arcsettingsinitializedisableprocesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/arcSettingsInitializeDisableProcessSample.ts
[arcsettingslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/arcSettingsListByClusterSample.ts
[arcsettingsreconcilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/arcSettingsReconcileSample.ts
[arcsettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/arcSettingsUpdateSample.ts
[clustersconfigureremotesupportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersConfigureRemoteSupportSample.ts
[clusterscreateidentitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersCreateIdentitySample.ts
[clusterscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersCreateSample.ts
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersDeleteSample.ts
[clustersextendsoftwareassurancebenefitsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersExtendSoftwareAssuranceBenefitSample.ts
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersGetSample.ts
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersListByResourceGroupSample.ts
[clusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersListBySubscriptionSample.ts
[clusterstriggerlogcollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersTriggerLogCollectionSample.ts
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersUpdateSample.ts
[clustersupdatesecretslocationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersUpdateSecretsLocationsSample.ts
[clustersuploadcertificatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/clustersUploadCertificateSample.ts
[deploymentsettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/deploymentSettingsCreateOrUpdateSample.ts
[deploymentsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/deploymentSettingsDeleteSample.ts
[deploymentsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/deploymentSettingsGetSample.ts
[deploymentsettingslistbyclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/deploymentSettingsListByClustersSample.ts
[edgedevicejobscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/edgeDeviceJobsCreateOrUpdateSample.ts
[edgedevicejobsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/edgeDeviceJobsDeleteSample.ts
[edgedevicejobsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/edgeDeviceJobsGetSample.ts
[edgedevicejobslistbyedgedevicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/edgeDeviceJobsListByEdgeDeviceSample.ts
[edgedevicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/edgeDevicesCreateOrUpdateSample.ts
[edgedevicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/edgeDevicesDeleteSample.ts
[edgedevicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/edgeDevicesGetSample.ts
[edgedeviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/edgeDevicesListSample.ts
[edgedevicesvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/edgeDevicesValidateSample.ts
[extensionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/extensionsCreateSample.ts
[extensionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/extensionsDeleteSample.ts
[extensionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/extensionsGetSample.ts
[extensionslistbyarcsettingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/extensionsListByArcSettingSample.ts
[extensionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/extensionsUpdateSample.ts
[extensionsupgradesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/extensionsUpgradeSample.ts
[offersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/offersGetSample.ts
[offerslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/offersListByClusterSample.ts
[offerslistbypublishersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/offersListByPublisherSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/operationsListSample.ts
[securitysettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/securitySettingsCreateOrUpdateSample.ts
[securitysettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/securitySettingsDeleteSample.ts
[securitysettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/securitySettingsGetSample.ts
[securitysettingslistbyclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/securitySettingsListByClustersSample.ts
[skusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/skusGetSample.ts
[skuslistbyoffersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/skusListByOfferSample.ts
[updaterunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updateRunsDeleteSample.ts
[updaterunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updateRunsGetSample.ts
[updaterunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updateRunsListSample.ts
[updaterunsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updateRunsPutSample.ts
[updatesummariesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updateSummariesDeleteSample.ts
[updatesummariesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updateSummariesGetSample.ts
[updatesummarieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updateSummariesListSample.ts
[updatesummariesputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updateSummariesPutSample.ts
[updatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updatesDeleteSample.ts
[updatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updatesGetSample.ts
[updateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updatesListSample.ts
[updatespostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updatesPostSample.ts
[updatesputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/updatesPutSample.ts
[validatedsolutionrecipesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/validatedSolutionRecipesGetSample.ts
[validatedsolutionrecipeslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/typescript/src/validatedSolutionRecipesListBySubscriptionLocationResourceSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-azurestackhci?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azurestackhci/arm-azurestackhci/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

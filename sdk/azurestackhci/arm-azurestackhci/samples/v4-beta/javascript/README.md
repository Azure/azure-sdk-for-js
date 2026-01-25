# @azure/arm-azurestackhci client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-azurestackhci in some common scenarios.

| **File Name**                                                                                                                           | **Description**                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [arcSettingsConsentAndInstallDefaultExtensionsSample.js][arcsettingsconsentandinstalldefaultextensionssample]                           | add consent time for default extensions and initiate extensions installation x-ms-original-file: 2025-12-01-preview/ConsentAndInstallDefaultExtensions.json |
| [arcSettingsCreateIdentitySample.js][arcsettingscreateidentitysample]                                                                   | create Aad identity for arc settings. x-ms-original-file: 2025-12-01-preview/CreateArcIdentity.json                                                         |
| [arcSettingsCreateSample.js][arcsettingscreatesample]                                                                                   | create ArcSetting for HCI cluster. x-ms-original-file: 2025-12-01-preview/PutArcSetting.json                                                                |
| [arcSettingsDeleteSample.js][arcsettingsdeletesample]                                                                                   | delete ArcSetting resource details of HCI Cluster. x-ms-original-file: 2025-12-01-preview/DeleteArcSetting.json                                             |
| [arcSettingsGeneratePasswordSample.js][arcsettingsgeneratepasswordsample]                                                               | generate password for arc settings. x-ms-original-file: 2025-12-01-preview/GeneratePassword.json                                                            |
| [arcSettingsGetSample.js][arcsettingsgetsample]                                                                                         | get ArcSetting resource details of HCI Cluster. x-ms-original-file: 2025-12-01-preview/GetArcSetting.json                                                   |
| [arcSettingsInitializeDisableProcessSample.js][arcsettingsinitializedisableprocesssample]                                               | initializes ARC Disable process on the cluster x-ms-original-file: 2025-12-01-preview/InitializeDisableProcess.json                                         |
| [arcSettingsListByClusterSample.js][arcsettingslistbyclustersample]                                                                     | get ArcSetting resources of HCI Cluster. x-ms-original-file: 2025-12-01-preview/ListArcSettingsByCluster.json                                               |
| [arcSettingsReconcileSample.js][arcsettingsreconcilesample]                                                                             | reconcile Arc Settings with information related to all nodes. x-ms-original-file: 2025-12-01-preview/reconcileArcSettings.json                              |
| [arcSettingsUpdateSample.js][arcsettingsupdatesample]                                                                                   | update ArcSettings for HCI cluster. x-ms-original-file: 2025-12-01-preview/PatchArcSetting.json                                                             |
| [clustersChangeRingSample.js][clusterschangeringsample]                                                                                 | changes ring of a cluster x-ms-original-file: 2025-12-01-preview/ChangeClusterRing.json                                                                     |
| [clustersConfigureRemoteSupportSample.js][clustersconfigureremotesupportsample]                                                         | configure RemoteSupport on a cluster x-ms-original-file: 2025-12-01-preview/ConfigureRemoteSupport.json                                                     |
| [clustersCreateIdentitySample.js][clusterscreateidentitysample]                                                                         | create cluster identity. x-ms-original-file: 2025-12-01-preview/CreateClusterIdentity.json                                                                  |
| [clustersCreateSample.js][clusterscreatesample]                                                                                         | create an HCI cluster. x-ms-original-file: 2025-12-01-preview/CreateCluster.json                                                                            |
| [clustersDeleteSample.js][clustersdeletesample]                                                                                         | delete an HCI cluster. x-ms-original-file: 2025-12-01-preview/DeleteCluster.json                                                                            |
| [clustersExtendSoftwareAssuranceBenefitSample.js][clustersextendsoftwareassurancebenefitsample]                                         | extends Software Assurance Benefit to a cluster x-ms-original-file: 2025-12-01-preview/ExtendSoftwareAssuranceBenefit.json                                  |
| [clustersGetSample.js][clustersgetsample]                                                                                               | get HCI cluster. x-ms-original-file: 2025-12-01-preview/GetCluster.json                                                                                     |
| [clustersListByResourceGroupSample.js][clusterslistbyresourcegroupsample]                                                               | list all HCI clusters in a resource group. x-ms-original-file: 2025-12-01-preview/ListClustersByResourceGroup.json                                          |
| [clustersListBySubscriptionSample.js][clusterslistbysubscriptionsample]                                                                 | list all HCI clusters in a subscription. x-ms-original-file: 2025-12-01-preview/ListClustersBySubscription.json                                             |
| [clustersTriggerLogCollectionSample.js][clusterstriggerlogcollectionsample]                                                             | trigger Log Collection on a cluster x-ms-original-file: 2025-12-01-preview/TriggerLogCollection.json                                                        |
| [clustersUpdateSample.js][clustersupdatesample]                                                                                         | update an HCI cluster. x-ms-original-file: 2025-12-01-preview/UpdateCluster.json                                                                            |
| [clustersUpdateSecretsLocationsSample.js][clustersupdatesecretslocationssample]                                                         | update cluster secrets locations. x-ms-original-file: 2025-12-01-preview/Clusters_UpdateSecretsLocations.json                                               |
| [clustersUploadCertificateSample.js][clustersuploadcertificatesample]                                                                   | upload certificate. x-ms-original-file: 2025-12-01-preview/UploadCertificate.json                                                                           |
| [deploymentSettingsCreateOrUpdateSample.js][deploymentsettingscreateorupdatesample]                                                     | create a DeploymentSetting x-ms-original-file: 2025-12-01-preview/PutDeploymentSettings.json                                                                |
| [deploymentSettingsDeleteSample.js][deploymentsettingsdeletesample]                                                                     | delete a DeploymentSetting x-ms-original-file: 2025-12-01-preview/DeleteDeploymentSettings.json                                                             |
| [deploymentSettingsGetSample.js][deploymentsettingsgetsample]                                                                           | get a DeploymentSetting x-ms-original-file: 2025-12-01-preview/GetDeploymentSettings.json                                                                   |
| [deploymentSettingsListByClustersSample.js][deploymentsettingslistbyclusterssample]                                                     | list DeploymentSetting resources by Clusters x-ms-original-file: 2025-12-01-preview/ListDeploymentSettingsByCluster.json                                    |
| [edgeDeviceJobsCreateOrUpdateSample.js][edgedevicejobscreateorupdatesample]                                                             | create a EdgeDeviceJob x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_CreateOrUpdate_CollectLog.json                                                 |
| [edgeDeviceJobsDeleteSample.js][edgedevicejobsdeletesample]                                                                             | delete a EdgeDeviceJob x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_Delete.json                                                                    |
| [edgeDeviceJobsGetSample.js][edgedevicejobsgetsample]                                                                                   | get a EdgeDeviceJob x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_Get_RemoteSupport.json                                                            |
| [edgeDeviceJobsListByEdgeDeviceSample.js][edgedevicejobslistbyedgedevicesample]                                                         | list EdgeDeviceJob resources by EdgeDevice x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_ListByEdgeDevice.json                                      |
| [edgeDevicesCreateOrUpdateSample.js][edgedevicescreateorupdatesample]                                                                   | create a EdgeDevice x-ms-original-file: 2025-12-01-preview/CreateHciEdgeDevice.json                                                                         |
| [edgeDevicesDeleteSample.js][edgedevicesdeletesample]                                                                                   | delete a EdgeDevice x-ms-original-file: 2025-12-01-preview/DeleteEdgeDevices.json                                                                           |
| [edgeDevicesGetSample.js][edgedevicesgetsample]                                                                                         | get a EdgeDevice x-ms-original-file: 2025-12-01-preview/GetEdgeDevices.json                                                                                 |
| [edgeDevicesListSample.js][edgedeviceslistsample]                                                                                       | list EdgeDevice resources by parent x-ms-original-file: 2025-12-01-preview/ListEdgeDevices.json                                                             |
| [edgeDevicesValidateSample.js][edgedevicesvalidatesample]                                                                               | a long-running resource action. x-ms-original-file: 2025-12-01-preview/ValidateEdgeDevices.json                                                             |
| [edgeMachineJobsCreateOrUpdateSample.js][edgemachinejobscreateorupdatesample]                                                           | create a EdgeMachineJob x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_CreateOrUpdate_CollectLog.json                                               |
| [edgeMachineJobsDeleteSample.js][edgemachinejobsdeletesample]                                                                           | delete a EdgeMachineJob x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_Delete_MaximumSet_Gen.json                                                   |
| [edgeMachineJobsGetSample.js][edgemachinejobsgetsample]                                                                                 | get a EdgeMachineJob x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_Get_CollectLog.json                                                             |
| [edgeMachineJobsListSample.js][edgemachinejobslistsample]                                                                               | list EdgeMachineJob resources by EdgeMachines x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_List_MaximumSet_Gen.json                               |
| [edgeMachinesCreateOrUpdateSample.js][edgemachinescreateorupdatesample]                                                                 | create or update an edge machine. x-ms-original-file: 2025-12-01-preview/EdgeMachines_CreateOrUpdate.json                                                   |
| [edgeMachinesDeleteSample.js][edgemachinesdeletesample]                                                                                 | delete an edge machine. x-ms-original-file: 2025-12-01-preview/EdgeMachines_Delete.json                                                                     |
| [edgeMachinesGetSample.js][edgemachinesgetsample]                                                                                       | get an edge machine. x-ms-original-file: 2025-12-01-preview/EdgeMachines_Get.json                                                                           |
| [edgeMachinesListByResourceGroupSample.js][edgemachineslistbyresourcegroupsample]                                                       | list all edge machines in a resource group. x-ms-original-file: 2025-12-01-preview/EdgeMachines_ListByResourceGroup.json                                    |
| [edgeMachinesListBySubscriptionSample.js][edgemachineslistbysubscriptionsample]                                                         | list all edge machines in a subscription. x-ms-original-file: 2025-12-01-preview/EdgeMachines_ListBySubscription.json                                       |
| [edgeMachinesUpdateSample.js][edgemachinesupdatesample]                                                                                 | update an edge machine. x-ms-original-file: 2025-12-01-preview/EdgeMachines_Update.json                                                                     |
| [extensionsCreateSample.js][extensionscreatesample]                                                                                     | create Extension for HCI cluster. x-ms-original-file: 2025-12-01-preview/PutExtension.json                                                                  |
| [extensionsDeleteSample.js][extensionsdeletesample]                                                                                     | delete particular Arc Extension of HCI Cluster. x-ms-original-file: 2025-12-01-preview/DeleteExtension.json                                                 |
| [extensionsGetSample.js][extensionsgetsample]                                                                                           | get particular Arc Extension of HCI Cluster. x-ms-original-file: 2025-12-01-preview/GetExtension.json                                                       |
| [extensionsListByArcSettingSample.js][extensionslistbyarcsettingsample]                                                                 | list all Extensions under ArcSetting resource. x-ms-original-file: 2025-12-01-preview/ListExtensionsByArcSetting.json                                       |
| [extensionsUpdateSample.js][extensionsupdatesample]                                                                                     | update Extension for HCI cluster. x-ms-original-file: 2025-12-01-preview/PatchExtension.json                                                                |
| [extensionsUpgradeSample.js][extensionsupgradesample]                                                                                   | upgrade a particular Arc Extension of HCI Cluster. x-ms-original-file: 2025-12-01-preview/Extensions_Upgrade.json                                           |
| [kubernetesVersionsListBySubscriptionLocationResourceSample.js][kubernetesversionslistbysubscriptionlocationresourcesample]             | list all kubernetes versions. x-ms-original-file: 2025-12-01-preview/KubernetesVersions_ListBySubscriptionLocationResource_MaximumSet_Gen.json              |
| [offersGetSample.js][offersgetsample]                                                                                                   | get Offer resource details within a publisher of HCI Cluster. x-ms-original-file: 2025-12-01-preview/GetOffer.json                                          |
| [offersListByClusterSample.js][offerslistbyclustersample]                                                                               | list Offers available across publishers for the HCI Cluster. x-ms-original-file: 2025-12-01-preview/ListOffersByCluster.json                                |
| [offersListByPublisherSample.js][offerslistbypublishersample]                                                                           | list Offers available for a publisher within the HCI Cluster. x-ms-original-file: 2025-12-01-preview/ListOffersByPublisher.json                             |
| [operationsListSample.js][operationslistsample]                                                                                         | list the operations for the provider x-ms-original-file: 2025-12-01-preview/Operations_List.json                                                            |
| [osImagesGetSample.js][osimagesgetsample]                                                                                               | get a os image. x-ms-original-file: 2025-12-01-preview/OsImages_Get_MaximumSet_Gen.json                                                                     |
| [osImagesListBySubscriptionLocationResourceSample.js][osimageslistbysubscriptionlocationresourcesample]                                 | list all os images. x-ms-original-file: 2025-12-01-preview/OsImages_ListBySubscriptionLocationResource_MaximumSet_Gen.json                                  |
| [ownershipVouchersValidateSample.js][ownershipvouchersvalidatesample]                                                                   | validates ownership vouchers. x-ms-original-file: 2025-12-01-preview/ValidateOwnershipVouchers_ByResourceGroup.json                                         |
| [platformUpdatesGetSample.js][platformupdatesgetsample]                                                                                 | get a platform update. x-ms-original-file: 2025-12-01-preview/PlatformUpdates_Get_MaximumSet_Gen.json                                                       |
| [platformUpdatesListSample.js][platformupdateslistsample]                                                                               | list all platform updates. x-ms-original-file: 2025-12-01-preview/PlatformUpdates_ListByLocation_MaximumSet_Gen.json                                        |
| [publishersGetSample.js][publishersgetsample]                                                                                           | get Publisher resource details of HCI Cluster. x-ms-original-file: 2025-12-01-preview/GetPublisher.json                                                     |
| [publishersListByClusterSample.js][publisherslistbyclustersample]                                                                       | list Publishers available for the HCI Cluster. x-ms-original-file: 2025-12-01-preview/ListPublishersByCluster.json                                          |
| [securitySettingsCreateOrUpdateSample.js][securitysettingscreateorupdatesample]                                                         | create a security setting x-ms-original-file: 2025-12-01-preview/PutSecuritySettings.json                                                                   |
| [securitySettingsDeleteSample.js][securitysettingsdeletesample]                                                                         | delete a SecuritySetting x-ms-original-file: 2025-12-01-preview/DeleteSecuritySettings.json                                                                 |
| [securitySettingsGetSample.js][securitysettingsgetsample]                                                                               | get a SecuritySetting x-ms-original-file: 2025-12-01-preview/GetSecuritySettings.json                                                                       |
| [securitySettingsListByClustersSample.js][securitysettingslistbyclusterssample]                                                         | list SecuritySetting resources by Clusters x-ms-original-file: 2025-12-01-preview/ListSecuritySettingsByCluster.json                                        |
| [skusGetSample.js][skusgetsample]                                                                                                       | get SKU resource details within a offer of HCI Cluster. x-ms-original-file: 2025-12-01-preview/GetSku.json                                                  |
| [skusListByOfferSample.js][skuslistbyoffersample]                                                                                       | list Skus available for a offer within the HCI Cluster. x-ms-original-file: 2025-12-01-preview/ListSkusByOffer.json                                         |
| [updateContentsGetSample.js][updatecontentsgetsample]                                                                                   | gets content for an update. x-ms-original-file: 2025-12-01-preview/UpdateContents_Get_MaximumSet_Gen.json                                                   |
| [updateContentsListSample.js][updatecontentslistsample]                                                                                 | list all update contents. x-ms-original-file: 2025-12-01-preview/UpdateContents_ListByLocation_MaximumSet_Gen.json                                          |
| [updateRunsDeleteSample.js][updaterunsdeletesample]                                                                                     | delete specified Update Run x-ms-original-file: 2025-12-01-preview/DeleteUpdateRuns.json                                                                    |
| [updateRunsGetSample.js][updaterunsgetsample]                                                                                           | get the Update run for a specified update x-ms-original-file: 2025-12-01-preview/GetUpdateRuns.json                                                         |
| [updateRunsListSample.js][updaterunslistsample]                                                                                         | list all Update runs for a specified update x-ms-original-file: 2025-12-01-preview/ListUpdateRuns.json                                                      |
| [updateRunsPutSample.js][updaterunsputsample]                                                                                           | put Update runs for a specified update x-ms-original-file: 2025-12-01-preview/PutUpdateRuns.json                                                            |
| [updateSummariesDeleteSample.js][updatesummariesdeletesample]                                                                           | delete Update Summaries x-ms-original-file: 2025-12-01-preview/DeleteUpdateSummaries.json                                                                   |
| [updateSummariesGetSample.js][updatesummariesgetsample]                                                                                 | get all Update summaries under the HCI cluster x-ms-original-file: 2025-12-01-preview/GetUpdateSummaries.json                                               |
| [updateSummariesListSample.js][updatesummarieslistsample]                                                                               | list all Update summaries under the HCI cluster x-ms-original-file: 2025-12-01-preview/ListUpdateSummaries.json                                             |
| [updateSummariesPutSample.js][updatesummariesputsample]                                                                                 | put Update summaries under the HCI cluster x-ms-original-file: 2025-12-01-preview/PutUpdateSummaries.json                                                   |
| [updatesDeleteSample.js][updatesdeletesample]                                                                                           | delete specified Update x-ms-original-file: 2025-12-01-preview/DeleteUpdates.json                                                                           |
| [updatesGetSample.js][updatesgetsample]                                                                                                 | get specified Update x-ms-original-file: 2025-12-01-preview/GetUpdates.json                                                                                 |
| [updatesListSample.js][updateslistsample]                                                                                               | list all Updates x-ms-original-file: 2025-12-01-preview/ListUpdates.json                                                                                    |
| [updatesPostSample.js][updatespostsample]                                                                                               | apply Update x-ms-original-file: 2025-12-01-preview/PostUpdates.json                                                                                        |
| [updatesPutSample.js][updatesputsample]                                                                                                 | put specified Update x-ms-original-file: 2025-12-01-preview/PutUpdates.json                                                                                 |
| [validatedSolutionRecipesGetSample.js][validatedsolutionrecipesgetsample]                                                               | get a validated solution recipe. x-ms-original-file: 2025-12-01-preview/ValidatedSolutionRecipes_Get.json                                                   |
| [validatedSolutionRecipesListBySubscriptionLocationResourceSample.js][validatedsolutionrecipeslistbysubscriptionlocationresourcesample] | list all validated solution recipes. x-ms-original-file: 2025-12-01-preview/ValidatedSolutionRecipes_ListBySubscriptionLocationResource.json                |

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
node arcSettingsConsentAndInstallDefaultExtensionsSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node arcSettingsConsentAndInstallDefaultExtensionsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[arcsettingsconsentandinstalldefaultextensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/arcSettingsConsentAndInstallDefaultExtensionsSample.js
[arcsettingscreateidentitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/arcSettingsCreateIdentitySample.js
[arcsettingscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/arcSettingsCreateSample.js
[arcsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/arcSettingsDeleteSample.js
[arcsettingsgeneratepasswordsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/arcSettingsGeneratePasswordSample.js
[arcsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/arcSettingsGetSample.js
[arcsettingsinitializedisableprocesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/arcSettingsInitializeDisableProcessSample.js
[arcsettingslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/arcSettingsListByClusterSample.js
[arcsettingsreconcilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/arcSettingsReconcileSample.js
[arcsettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/arcSettingsUpdateSample.js
[clusterschangeringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersChangeRingSample.js
[clustersconfigureremotesupportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersConfigureRemoteSupportSample.js
[clusterscreateidentitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersCreateIdentitySample.js
[clusterscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersCreateSample.js
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersDeleteSample.js
[clustersextendsoftwareassurancebenefitsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersExtendSoftwareAssuranceBenefitSample.js
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersGetSample.js
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersListByResourceGroupSample.js
[clusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersListBySubscriptionSample.js
[clusterstriggerlogcollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersTriggerLogCollectionSample.js
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersUpdateSample.js
[clustersupdatesecretslocationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersUpdateSecretsLocationsSample.js
[clustersuploadcertificatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/clustersUploadCertificateSample.js
[deploymentsettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/deploymentSettingsCreateOrUpdateSample.js
[deploymentsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/deploymentSettingsDeleteSample.js
[deploymentsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/deploymentSettingsGetSample.js
[deploymentsettingslistbyclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/deploymentSettingsListByClustersSample.js
[edgedevicejobscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeDeviceJobsCreateOrUpdateSample.js
[edgedevicejobsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeDeviceJobsDeleteSample.js
[edgedevicejobsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeDeviceJobsGetSample.js
[edgedevicejobslistbyedgedevicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeDeviceJobsListByEdgeDeviceSample.js
[edgedevicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeDevicesCreateOrUpdateSample.js
[edgedevicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeDevicesDeleteSample.js
[edgedevicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeDevicesGetSample.js
[edgedeviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeDevicesListSample.js
[edgedevicesvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeDevicesValidateSample.js
[edgemachinejobscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeMachineJobsCreateOrUpdateSample.js
[edgemachinejobsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeMachineJobsDeleteSample.js
[edgemachinejobsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeMachineJobsGetSample.js
[edgemachinejobslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeMachineJobsListSample.js
[edgemachinescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeMachinesCreateOrUpdateSample.js
[edgemachinesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeMachinesDeleteSample.js
[edgemachinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeMachinesGetSample.js
[edgemachineslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeMachinesListByResourceGroupSample.js
[edgemachineslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeMachinesListBySubscriptionSample.js
[edgemachinesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/edgeMachinesUpdateSample.js
[extensionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/extensionsCreateSample.js
[extensionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/extensionsDeleteSample.js
[extensionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/extensionsGetSample.js
[extensionslistbyarcsettingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/extensionsListByArcSettingSample.js
[extensionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/extensionsUpdateSample.js
[extensionsupgradesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/extensionsUpgradeSample.js
[kubernetesversionslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/kubernetesVersionsListBySubscriptionLocationResourceSample.js
[offersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/offersGetSample.js
[offerslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/offersListByClusterSample.js
[offerslistbypublishersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/offersListByPublisherSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/operationsListSample.js
[osimagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/osImagesGetSample.js
[osimageslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/osImagesListBySubscriptionLocationResourceSample.js
[ownershipvouchersvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/ownershipVouchersValidateSample.js
[platformupdatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/platformUpdatesGetSample.js
[platformupdateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/platformUpdatesListSample.js
[publishersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/publishersGetSample.js
[publisherslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/publishersListByClusterSample.js
[securitysettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/securitySettingsCreateOrUpdateSample.js
[securitysettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/securitySettingsDeleteSample.js
[securitysettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/securitySettingsGetSample.js
[securitysettingslistbyclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/securitySettingsListByClustersSample.js
[skusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/skusGetSample.js
[skuslistbyoffersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/skusListByOfferSample.js
[updatecontentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updateContentsGetSample.js
[updatecontentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updateContentsListSample.js
[updaterunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updateRunsDeleteSample.js
[updaterunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updateRunsGetSample.js
[updaterunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updateRunsListSample.js
[updaterunsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updateRunsPutSample.js
[updatesummariesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updateSummariesDeleteSample.js
[updatesummariesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updateSummariesGetSample.js
[updatesummarieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updateSummariesListSample.js
[updatesummariesputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updateSummariesPutSample.js
[updatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updatesDeleteSample.js
[updatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updatesGetSample.js
[updateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updatesListSample.js
[updatespostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updatesPostSample.js
[updatesputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/updatesPutSample.js
[validatedsolutionrecipesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/validatedSolutionRecipesGetSample.js
[validatedsolutionrecipeslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/javascript/validatedSolutionRecipesListBySubscriptionLocationResourceSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-azurestackhci?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azurestackhci/arm-azurestackhci/README.md

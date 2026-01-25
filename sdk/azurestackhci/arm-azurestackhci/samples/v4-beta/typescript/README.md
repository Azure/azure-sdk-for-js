# @azure/arm-azurestackhci client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-azurestackhci in some common scenarios.

| **File Name**                                                                                                                           | **Description**                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [arcSettingsConsentAndInstallDefaultExtensionsSample.ts][arcsettingsconsentandinstalldefaultextensionssample]                           | add consent time for default extensions and initiate extensions installation x-ms-original-file: 2025-12-01-preview/ConsentAndInstallDefaultExtensions.json |
| [arcSettingsCreateIdentitySample.ts][arcsettingscreateidentitysample]                                                                   | create Aad identity for arc settings. x-ms-original-file: 2025-12-01-preview/CreateArcIdentity.json                                                         |
| [arcSettingsCreateSample.ts][arcsettingscreatesample]                                                                                   | create ArcSetting for HCI cluster. x-ms-original-file: 2025-12-01-preview/PutArcSetting.json                                                                |
| [arcSettingsDeleteSample.ts][arcsettingsdeletesample]                                                                                   | delete ArcSetting resource details of HCI Cluster. x-ms-original-file: 2025-12-01-preview/DeleteArcSetting.json                                             |
| [arcSettingsGeneratePasswordSample.ts][arcsettingsgeneratepasswordsample]                                                               | generate password for arc settings. x-ms-original-file: 2025-12-01-preview/GeneratePassword.json                                                            |
| [arcSettingsGetSample.ts][arcsettingsgetsample]                                                                                         | get ArcSetting resource details of HCI Cluster. x-ms-original-file: 2025-12-01-preview/GetArcSetting.json                                                   |
| [arcSettingsInitializeDisableProcessSample.ts][arcsettingsinitializedisableprocesssample]                                               | initializes ARC Disable process on the cluster x-ms-original-file: 2025-12-01-preview/InitializeDisableProcess.json                                         |
| [arcSettingsListByClusterSample.ts][arcsettingslistbyclustersample]                                                                     | get ArcSetting resources of HCI Cluster. x-ms-original-file: 2025-12-01-preview/ListArcSettingsByCluster.json                                               |
| [arcSettingsReconcileSample.ts][arcsettingsreconcilesample]                                                                             | reconcile Arc Settings with information related to all nodes. x-ms-original-file: 2025-12-01-preview/reconcileArcSettings.json                              |
| [arcSettingsUpdateSample.ts][arcsettingsupdatesample]                                                                                   | update ArcSettings for HCI cluster. x-ms-original-file: 2025-12-01-preview/PatchArcSetting.json                                                             |
| [clustersChangeRingSample.ts][clusterschangeringsample]                                                                                 | changes ring of a cluster x-ms-original-file: 2025-12-01-preview/ChangeClusterRing.json                                                                     |
| [clustersConfigureRemoteSupportSample.ts][clustersconfigureremotesupportsample]                                                         | configure RemoteSupport on a cluster x-ms-original-file: 2025-12-01-preview/ConfigureRemoteSupport.json                                                     |
| [clustersCreateIdentitySample.ts][clusterscreateidentitysample]                                                                         | create cluster identity. x-ms-original-file: 2025-12-01-preview/CreateClusterIdentity.json                                                                  |
| [clustersCreateSample.ts][clusterscreatesample]                                                                                         | create an HCI cluster. x-ms-original-file: 2025-12-01-preview/CreateCluster.json                                                                            |
| [clustersDeleteSample.ts][clustersdeletesample]                                                                                         | delete an HCI cluster. x-ms-original-file: 2025-12-01-preview/DeleteCluster.json                                                                            |
| [clustersExtendSoftwareAssuranceBenefitSample.ts][clustersextendsoftwareassurancebenefitsample]                                         | extends Software Assurance Benefit to a cluster x-ms-original-file: 2025-12-01-preview/ExtendSoftwareAssuranceBenefit.json                                  |
| [clustersGetSample.ts][clustersgetsample]                                                                                               | get HCI cluster. x-ms-original-file: 2025-12-01-preview/GetCluster.json                                                                                     |
| [clustersListByResourceGroupSample.ts][clusterslistbyresourcegroupsample]                                                               | list all HCI clusters in a resource group. x-ms-original-file: 2025-12-01-preview/ListClustersByResourceGroup.json                                          |
| [clustersListBySubscriptionSample.ts][clusterslistbysubscriptionsample]                                                                 | list all HCI clusters in a subscription. x-ms-original-file: 2025-12-01-preview/ListClustersBySubscription.json                                             |
| [clustersTriggerLogCollectionSample.ts][clusterstriggerlogcollectionsample]                                                             | trigger Log Collection on a cluster x-ms-original-file: 2025-12-01-preview/TriggerLogCollection.json                                                        |
| [clustersUpdateSample.ts][clustersupdatesample]                                                                                         | update an HCI cluster. x-ms-original-file: 2025-12-01-preview/UpdateCluster.json                                                                            |
| [clustersUpdateSecretsLocationsSample.ts][clustersupdatesecretslocationssample]                                                         | update cluster secrets locations. x-ms-original-file: 2025-12-01-preview/Clusters_UpdateSecretsLocations.json                                               |
| [clustersUploadCertificateSample.ts][clustersuploadcertificatesample]                                                                   | upload certificate. x-ms-original-file: 2025-12-01-preview/UploadCertificate.json                                                                           |
| [deploymentSettingsCreateOrUpdateSample.ts][deploymentsettingscreateorupdatesample]                                                     | create a DeploymentSetting x-ms-original-file: 2025-12-01-preview/PutDeploymentSettings.json                                                                |
| [deploymentSettingsDeleteSample.ts][deploymentsettingsdeletesample]                                                                     | delete a DeploymentSetting x-ms-original-file: 2025-12-01-preview/DeleteDeploymentSettings.json                                                             |
| [deploymentSettingsGetSample.ts][deploymentsettingsgetsample]                                                                           | get a DeploymentSetting x-ms-original-file: 2025-12-01-preview/GetDeploymentSettings.json                                                                   |
| [deploymentSettingsListByClustersSample.ts][deploymentsettingslistbyclusterssample]                                                     | list DeploymentSetting resources by Clusters x-ms-original-file: 2025-12-01-preview/ListDeploymentSettingsByCluster.json                                    |
| [edgeDeviceJobsCreateOrUpdateSample.ts][edgedevicejobscreateorupdatesample]                                                             | create a EdgeDeviceJob x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_CreateOrUpdate_CollectLog.json                                                 |
| [edgeDeviceJobsDeleteSample.ts][edgedevicejobsdeletesample]                                                                             | delete a EdgeDeviceJob x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_Delete.json                                                                    |
| [edgeDeviceJobsGetSample.ts][edgedevicejobsgetsample]                                                                                   | get a EdgeDeviceJob x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_Get_RemoteSupport.json                                                            |
| [edgeDeviceJobsListByEdgeDeviceSample.ts][edgedevicejobslistbyedgedevicesample]                                                         | list EdgeDeviceJob resources by EdgeDevice x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_ListByEdgeDevice.json                                      |
| [edgeDevicesCreateOrUpdateSample.ts][edgedevicescreateorupdatesample]                                                                   | create a EdgeDevice x-ms-original-file: 2025-12-01-preview/CreateHciEdgeDevice.json                                                                         |
| [edgeDevicesDeleteSample.ts][edgedevicesdeletesample]                                                                                   | delete a EdgeDevice x-ms-original-file: 2025-12-01-preview/DeleteEdgeDevices.json                                                                           |
| [edgeDevicesGetSample.ts][edgedevicesgetsample]                                                                                         | get a EdgeDevice x-ms-original-file: 2025-12-01-preview/GetEdgeDevices.json                                                                                 |
| [edgeDevicesListSample.ts][edgedeviceslistsample]                                                                                       | list EdgeDevice resources by parent x-ms-original-file: 2025-12-01-preview/ListEdgeDevices.json                                                             |
| [edgeDevicesValidateSample.ts][edgedevicesvalidatesample]                                                                               | a long-running resource action. x-ms-original-file: 2025-12-01-preview/ValidateEdgeDevices.json                                                             |
| [edgeMachineJobsCreateOrUpdateSample.ts][edgemachinejobscreateorupdatesample]                                                           | create a EdgeMachineJob x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_CreateOrUpdate_CollectLog.json                                               |
| [edgeMachineJobsDeleteSample.ts][edgemachinejobsdeletesample]                                                                           | delete a EdgeMachineJob x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_Delete_MaximumSet_Gen.json                                                   |
| [edgeMachineJobsGetSample.ts][edgemachinejobsgetsample]                                                                                 | get a EdgeMachineJob x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_Get_CollectLog.json                                                             |
| [edgeMachineJobsListSample.ts][edgemachinejobslistsample]                                                                               | list EdgeMachineJob resources by EdgeMachines x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_List_MaximumSet_Gen.json                               |
| [edgeMachinesCreateOrUpdateSample.ts][edgemachinescreateorupdatesample]                                                                 | create or update an edge machine. x-ms-original-file: 2025-12-01-preview/EdgeMachines_CreateOrUpdate.json                                                   |
| [edgeMachinesDeleteSample.ts][edgemachinesdeletesample]                                                                                 | delete an edge machine. x-ms-original-file: 2025-12-01-preview/EdgeMachines_Delete.json                                                                     |
| [edgeMachinesGetSample.ts][edgemachinesgetsample]                                                                                       | get an edge machine. x-ms-original-file: 2025-12-01-preview/EdgeMachines_Get.json                                                                           |
| [edgeMachinesListByResourceGroupSample.ts][edgemachineslistbyresourcegroupsample]                                                       | list all edge machines in a resource group. x-ms-original-file: 2025-12-01-preview/EdgeMachines_ListByResourceGroup.json                                    |
| [edgeMachinesListBySubscriptionSample.ts][edgemachineslistbysubscriptionsample]                                                         | list all edge machines in a subscription. x-ms-original-file: 2025-12-01-preview/EdgeMachines_ListBySubscription.json                                       |
| [edgeMachinesUpdateSample.ts][edgemachinesupdatesample]                                                                                 | update an edge machine. x-ms-original-file: 2025-12-01-preview/EdgeMachines_Update.json                                                                     |
| [extensionsCreateSample.ts][extensionscreatesample]                                                                                     | create Extension for HCI cluster. x-ms-original-file: 2025-12-01-preview/PutExtension.json                                                                  |
| [extensionsDeleteSample.ts][extensionsdeletesample]                                                                                     | delete particular Arc Extension of HCI Cluster. x-ms-original-file: 2025-12-01-preview/DeleteExtension.json                                                 |
| [extensionsGetSample.ts][extensionsgetsample]                                                                                           | get particular Arc Extension of HCI Cluster. x-ms-original-file: 2025-12-01-preview/GetExtension.json                                                       |
| [extensionsListByArcSettingSample.ts][extensionslistbyarcsettingsample]                                                                 | list all Extensions under ArcSetting resource. x-ms-original-file: 2025-12-01-preview/ListExtensionsByArcSetting.json                                       |
| [extensionsUpdateSample.ts][extensionsupdatesample]                                                                                     | update Extension for HCI cluster. x-ms-original-file: 2025-12-01-preview/PatchExtension.json                                                                |
| [extensionsUpgradeSample.ts][extensionsupgradesample]                                                                                   | upgrade a particular Arc Extension of HCI Cluster. x-ms-original-file: 2025-12-01-preview/Extensions_Upgrade.json                                           |
| [kubernetesVersionsListBySubscriptionLocationResourceSample.ts][kubernetesversionslistbysubscriptionlocationresourcesample]             | list all kubernetes versions. x-ms-original-file: 2025-12-01-preview/KubernetesVersions_ListBySubscriptionLocationResource_MaximumSet_Gen.json              |
| [offersGetSample.ts][offersgetsample]                                                                                                   | get Offer resource details within a publisher of HCI Cluster. x-ms-original-file: 2025-12-01-preview/GetOffer.json                                          |
| [offersListByClusterSample.ts][offerslistbyclustersample]                                                                               | list Offers available across publishers for the HCI Cluster. x-ms-original-file: 2025-12-01-preview/ListOffersByCluster.json                                |
| [offersListByPublisherSample.ts][offerslistbypublishersample]                                                                           | list Offers available for a publisher within the HCI Cluster. x-ms-original-file: 2025-12-01-preview/ListOffersByPublisher.json                             |
| [operationsListSample.ts][operationslistsample]                                                                                         | list the operations for the provider x-ms-original-file: 2025-12-01-preview/Operations_List.json                                                            |
| [osImagesGetSample.ts][osimagesgetsample]                                                                                               | get a os image. x-ms-original-file: 2025-12-01-preview/OsImages_Get_MaximumSet_Gen.json                                                                     |
| [osImagesListBySubscriptionLocationResourceSample.ts][osimageslistbysubscriptionlocationresourcesample]                                 | list all os images. x-ms-original-file: 2025-12-01-preview/OsImages_ListBySubscriptionLocationResource_MaximumSet_Gen.json                                  |
| [ownershipVouchersValidateSample.ts][ownershipvouchersvalidatesample]                                                                   | validates ownership vouchers. x-ms-original-file: 2025-12-01-preview/ValidateOwnershipVouchers_ByResourceGroup.json                                         |
| [platformUpdatesGetSample.ts][platformupdatesgetsample]                                                                                 | get a platform update. x-ms-original-file: 2025-12-01-preview/PlatformUpdates_Get_MaximumSet_Gen.json                                                       |
| [platformUpdatesListSample.ts][platformupdateslistsample]                                                                               | list all platform updates. x-ms-original-file: 2025-12-01-preview/PlatformUpdates_ListByLocation_MaximumSet_Gen.json                                        |
| [publishersGetSample.ts][publishersgetsample]                                                                                           | get Publisher resource details of HCI Cluster. x-ms-original-file: 2025-12-01-preview/GetPublisher.json                                                     |
| [publishersListByClusterSample.ts][publisherslistbyclustersample]                                                                       | list Publishers available for the HCI Cluster. x-ms-original-file: 2025-12-01-preview/ListPublishersByCluster.json                                          |
| [securitySettingsCreateOrUpdateSample.ts][securitysettingscreateorupdatesample]                                                         | create a security setting x-ms-original-file: 2025-12-01-preview/PutSecuritySettings.json                                                                   |
| [securitySettingsDeleteSample.ts][securitysettingsdeletesample]                                                                         | delete a SecuritySetting x-ms-original-file: 2025-12-01-preview/DeleteSecuritySettings.json                                                                 |
| [securitySettingsGetSample.ts][securitysettingsgetsample]                                                                               | get a SecuritySetting x-ms-original-file: 2025-12-01-preview/GetSecuritySettings.json                                                                       |
| [securitySettingsListByClustersSample.ts][securitysettingslistbyclusterssample]                                                         | list SecuritySetting resources by Clusters x-ms-original-file: 2025-12-01-preview/ListSecuritySettingsByCluster.json                                        |
| [skusGetSample.ts][skusgetsample]                                                                                                       | get SKU resource details within a offer of HCI Cluster. x-ms-original-file: 2025-12-01-preview/GetSku.json                                                  |
| [skusListByOfferSample.ts][skuslistbyoffersample]                                                                                       | list Skus available for a offer within the HCI Cluster. x-ms-original-file: 2025-12-01-preview/ListSkusByOffer.json                                         |
| [updateContentsGetSample.ts][updatecontentsgetsample]                                                                                   | gets content for an update. x-ms-original-file: 2025-12-01-preview/UpdateContents_Get_MaximumSet_Gen.json                                                   |
| [updateContentsListSample.ts][updatecontentslistsample]                                                                                 | list all update contents. x-ms-original-file: 2025-12-01-preview/UpdateContents_ListByLocation_MaximumSet_Gen.json                                          |
| [updateRunsDeleteSample.ts][updaterunsdeletesample]                                                                                     | delete specified Update Run x-ms-original-file: 2025-12-01-preview/DeleteUpdateRuns.json                                                                    |
| [updateRunsGetSample.ts][updaterunsgetsample]                                                                                           | get the Update run for a specified update x-ms-original-file: 2025-12-01-preview/GetUpdateRuns.json                                                         |
| [updateRunsListSample.ts][updaterunslistsample]                                                                                         | list all Update runs for a specified update x-ms-original-file: 2025-12-01-preview/ListUpdateRuns.json                                                      |
| [updateRunsPutSample.ts][updaterunsputsample]                                                                                           | put Update runs for a specified update x-ms-original-file: 2025-12-01-preview/PutUpdateRuns.json                                                            |
| [updateSummariesDeleteSample.ts][updatesummariesdeletesample]                                                                           | delete Update Summaries x-ms-original-file: 2025-12-01-preview/DeleteUpdateSummaries.json                                                                   |
| [updateSummariesGetSample.ts][updatesummariesgetsample]                                                                                 | get all Update summaries under the HCI cluster x-ms-original-file: 2025-12-01-preview/GetUpdateSummaries.json                                               |
| [updateSummariesListSample.ts][updatesummarieslistsample]                                                                               | list all Update summaries under the HCI cluster x-ms-original-file: 2025-12-01-preview/ListUpdateSummaries.json                                             |
| [updateSummariesPutSample.ts][updatesummariesputsample]                                                                                 | put Update summaries under the HCI cluster x-ms-original-file: 2025-12-01-preview/PutUpdateSummaries.json                                                   |
| [updatesDeleteSample.ts][updatesdeletesample]                                                                                           | delete specified Update x-ms-original-file: 2025-12-01-preview/DeleteUpdates.json                                                                           |
| [updatesGetSample.ts][updatesgetsample]                                                                                                 | get specified Update x-ms-original-file: 2025-12-01-preview/GetUpdates.json                                                                                 |
| [updatesListSample.ts][updateslistsample]                                                                                               | list all Updates x-ms-original-file: 2025-12-01-preview/ListUpdates.json                                                                                    |
| [updatesPostSample.ts][updatespostsample]                                                                                               | apply Update x-ms-original-file: 2025-12-01-preview/PostUpdates.json                                                                                        |
| [updatesPutSample.ts][updatesputsample]                                                                                                 | put specified Update x-ms-original-file: 2025-12-01-preview/PutUpdates.json                                                                                 |
| [validatedSolutionRecipesGetSample.ts][validatedsolutionrecipesgetsample]                                                               | get a validated solution recipe. x-ms-original-file: 2025-12-01-preview/ValidatedSolutionRecipes_Get.json                                                   |
| [validatedSolutionRecipesListBySubscriptionLocationResourceSample.ts][validatedsolutionrecipeslistbysubscriptionlocationresourcesample] | list all validated solution recipes. x-ms-original-file: 2025-12-01-preview/ValidatedSolutionRecipes_ListBySubscriptionLocationResource.json                |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/arcSettingsConsentAndInstallDefaultExtensionsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[arcsettingsconsentandinstalldefaultextensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/arcSettingsConsentAndInstallDefaultExtensionsSample.ts
[arcsettingscreateidentitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/arcSettingsCreateIdentitySample.ts
[arcsettingscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/arcSettingsCreateSample.ts
[arcsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/arcSettingsDeleteSample.ts
[arcsettingsgeneratepasswordsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/arcSettingsGeneratePasswordSample.ts
[arcsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/arcSettingsGetSample.ts
[arcsettingsinitializedisableprocesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/arcSettingsInitializeDisableProcessSample.ts
[arcsettingslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/arcSettingsListByClusterSample.ts
[arcsettingsreconcilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/arcSettingsReconcileSample.ts
[arcsettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/arcSettingsUpdateSample.ts
[clusterschangeringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersChangeRingSample.ts
[clustersconfigureremotesupportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersConfigureRemoteSupportSample.ts
[clusterscreateidentitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersCreateIdentitySample.ts
[clusterscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersCreateSample.ts
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersDeleteSample.ts
[clustersextendsoftwareassurancebenefitsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersExtendSoftwareAssuranceBenefitSample.ts
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersGetSample.ts
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersListByResourceGroupSample.ts
[clusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersListBySubscriptionSample.ts
[clusterstriggerlogcollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersTriggerLogCollectionSample.ts
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersUpdateSample.ts
[clustersupdatesecretslocationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersUpdateSecretsLocationsSample.ts
[clustersuploadcertificatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/clustersUploadCertificateSample.ts
[deploymentsettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/deploymentSettingsCreateOrUpdateSample.ts
[deploymentsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/deploymentSettingsDeleteSample.ts
[deploymentsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/deploymentSettingsGetSample.ts
[deploymentsettingslistbyclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/deploymentSettingsListByClustersSample.ts
[edgedevicejobscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeDeviceJobsCreateOrUpdateSample.ts
[edgedevicejobsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeDeviceJobsDeleteSample.ts
[edgedevicejobsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeDeviceJobsGetSample.ts
[edgedevicejobslistbyedgedevicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeDeviceJobsListByEdgeDeviceSample.ts
[edgedevicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeDevicesCreateOrUpdateSample.ts
[edgedevicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeDevicesDeleteSample.ts
[edgedevicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeDevicesGetSample.ts
[edgedeviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeDevicesListSample.ts
[edgedevicesvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeDevicesValidateSample.ts
[edgemachinejobscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeMachineJobsCreateOrUpdateSample.ts
[edgemachinejobsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeMachineJobsDeleteSample.ts
[edgemachinejobsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeMachineJobsGetSample.ts
[edgemachinejobslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeMachineJobsListSample.ts
[edgemachinescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeMachinesCreateOrUpdateSample.ts
[edgemachinesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeMachinesDeleteSample.ts
[edgemachinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeMachinesGetSample.ts
[edgemachineslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeMachinesListByResourceGroupSample.ts
[edgemachineslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeMachinesListBySubscriptionSample.ts
[edgemachinesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/edgeMachinesUpdateSample.ts
[extensionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/extensionsCreateSample.ts
[extensionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/extensionsDeleteSample.ts
[extensionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/extensionsGetSample.ts
[extensionslistbyarcsettingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/extensionsListByArcSettingSample.ts
[extensionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/extensionsUpdateSample.ts
[extensionsupgradesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/extensionsUpgradeSample.ts
[kubernetesversionslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/kubernetesVersionsListBySubscriptionLocationResourceSample.ts
[offersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/offersGetSample.ts
[offerslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/offersListByClusterSample.ts
[offerslistbypublishersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/offersListByPublisherSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/operationsListSample.ts
[osimagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/osImagesGetSample.ts
[osimageslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/osImagesListBySubscriptionLocationResourceSample.ts
[ownershipvouchersvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/ownershipVouchersValidateSample.ts
[platformupdatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/platformUpdatesGetSample.ts
[platformupdateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/platformUpdatesListSample.ts
[publishersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/publishersGetSample.ts
[publisherslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/publishersListByClusterSample.ts
[securitysettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/securitySettingsCreateOrUpdateSample.ts
[securitysettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/securitySettingsDeleteSample.ts
[securitysettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/securitySettingsGetSample.ts
[securitysettingslistbyclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/securitySettingsListByClustersSample.ts
[skusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/skusGetSample.ts
[skuslistbyoffersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/skusListByOfferSample.ts
[updatecontentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updateContentsGetSample.ts
[updatecontentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updateContentsListSample.ts
[updaterunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updateRunsDeleteSample.ts
[updaterunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updateRunsGetSample.ts
[updaterunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updateRunsListSample.ts
[updaterunsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updateRunsPutSample.ts
[updatesummariesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updateSummariesDeleteSample.ts
[updatesummariesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updateSummariesGetSample.ts
[updatesummarieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updateSummariesListSample.ts
[updatesummariesputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updateSummariesPutSample.ts
[updatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updatesDeleteSample.ts
[updatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updatesGetSample.ts
[updateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updatesListSample.ts
[updatespostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updatesPostSample.ts
[updatesputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/updatesPutSample.ts
[validatedsolutionrecipesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/validatedSolutionRecipesGetSample.ts
[validatedsolutionrecipeslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4-beta/typescript/src/validatedSolutionRecipesListBySubscriptionLocationResourceSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-azurestackhci?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azurestackhci/arm-azurestackhci/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

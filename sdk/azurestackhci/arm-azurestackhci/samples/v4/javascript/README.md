# @azure/arm-azurestackhci client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-azurestackhci in some common scenarios.

| **File Name**                                                                                                                           | **Description**                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [arcSettingsConsentAndInstallDefaultExtensionsSample.js][arcsettingsconsentandinstalldefaultextensionssample]                           | add consent time for default extensions and initiate extensions installation x-ms-original-file: 2026-02-01/ConsentAndInstallDefaultExtensions.json |
| [arcSettingsCreateIdentitySample.js][arcsettingscreateidentitysample]                                                                   | create Aad identity for arc settings. x-ms-original-file: 2026-02-01/CreateArcIdentity.json                                                         |
| [arcSettingsCreateSample.js][arcsettingscreatesample]                                                                                   | create ArcSetting for HCI cluster. x-ms-original-file: 2026-02-01/PutArcSetting.json                                                                |
| [arcSettingsDeleteSample.js][arcsettingsdeletesample]                                                                                   | delete ArcSetting resource details of HCI Cluster. x-ms-original-file: 2026-02-01/DeleteArcSetting.json                                             |
| [arcSettingsGeneratePasswordSample.js][arcsettingsgeneratepasswordsample]                                                               | generate password for arc settings. x-ms-original-file: 2026-02-01/GeneratePassword.json                                                            |
| [arcSettingsGetSample.js][arcsettingsgetsample]                                                                                         | get ArcSetting resource details of HCI Cluster. x-ms-original-file: 2026-02-01/GetArcSetting.json                                                   |
| [arcSettingsInitializeDisableProcessSample.js][arcsettingsinitializedisableprocesssample]                                               | initializes ARC Disable process on the cluster x-ms-original-file: 2026-02-01/InitializeDisableProcess.json                                         |
| [arcSettingsListByClusterSample.js][arcsettingslistbyclustersample]                                                                     | get ArcSetting resources of HCI Cluster. x-ms-original-file: 2026-02-01/ListArcSettingsByCluster.json                                               |
| [arcSettingsReconcileSample.js][arcsettingsreconcilesample]                                                                             | reconcile Arc Settings with information related to all nodes. x-ms-original-file: 2026-02-01/reconcileArcSettings.json                              |
| [arcSettingsUpdateSample.js][arcsettingsupdatesample]                                                                                   | update ArcSettings for HCI cluster. x-ms-original-file: 2026-02-01/PatchArcSetting.json                                                             |
| [clustersConfigureRemoteSupportSample.js][clustersconfigureremotesupportsample]                                                         | configure RemoteSupport on a cluster x-ms-original-file: 2026-02-01/ConfigureRemoteSupport.json                                                     |
| [clustersCreateIdentitySample.js][clusterscreateidentitysample]                                                                         | create cluster identity. x-ms-original-file: 2026-02-01/CreateClusterIdentity.json                                                                  |
| [clustersCreateSample.js][clusterscreatesample]                                                                                         | create an HCI cluster. x-ms-original-file: 2026-02-01/CreateCluster.json                                                                            |
| [clustersDeleteSample.js][clustersdeletesample]                                                                                         | delete an HCI cluster. x-ms-original-file: 2026-02-01/DeleteCluster.json                                                                            |
| [clustersExtendSoftwareAssuranceBenefitSample.js][clustersextendsoftwareassurancebenefitsample]                                         | extends Software Assurance Benefit to a cluster x-ms-original-file: 2026-02-01/ExtendSoftwareAssuranceBenefit.json                                  |
| [clustersGetSample.js][clustersgetsample]                                                                                               | get HCI cluster. x-ms-original-file: 2026-02-01/GetCluster.json                                                                                     |
| [clustersListByResourceGroupSample.js][clusterslistbyresourcegroupsample]                                                               | list all HCI clusters in a resource group. x-ms-original-file: 2026-02-01/ListClustersByResourceGroup.json                                          |
| [clustersListBySubscriptionSample.js][clusterslistbysubscriptionsample]                                                                 | list all HCI clusters in a subscription. x-ms-original-file: 2026-02-01/ListClustersBySubscription.json                                             |
| [clustersTriggerLogCollectionSample.js][clusterstriggerlogcollectionsample]                                                             | trigger Log Collection on a cluster x-ms-original-file: 2026-02-01/TriggerLogCollection.json                                                        |
| [clustersUpdateSample.js][clustersupdatesample]                                                                                         | update an HCI cluster. x-ms-original-file: 2026-02-01/UpdateCluster.json                                                                            |
| [clustersUpdateSecretsLocationsSample.js][clustersupdatesecretslocationssample]                                                         | update cluster secrets locations. x-ms-original-file: 2026-02-01/Clusters_UpdateSecretsLocations.json                                               |
| [clustersUploadCertificateSample.js][clustersuploadcertificatesample]                                                                   | upload certificate. x-ms-original-file: 2026-02-01/UploadCertificate.json                                                                           |
| [deploymentSettingsCreateOrUpdateSample.js][deploymentsettingscreateorupdatesample]                                                     | create a DeploymentSetting x-ms-original-file: 2026-02-01/PutDeploymentSettings.json                                                                |
| [deploymentSettingsDeleteSample.js][deploymentsettingsdeletesample]                                                                     | delete a DeploymentSetting x-ms-original-file: 2026-02-01/DeleteDeploymentSettings.json                                                             |
| [deploymentSettingsGetSample.js][deploymentsettingsgetsample]                                                                           | get a DeploymentSetting x-ms-original-file: 2026-02-01/GetDeploymentSettings.json                                                                   |
| [deploymentSettingsListByClustersSample.js][deploymentsettingslistbyclusterssample]                                                     | list DeploymentSetting resources by Clusters x-ms-original-file: 2026-02-01/ListDeploymentSettingsByCluster.json                                    |
| [edgeDeviceJobsCreateOrUpdateSample.js][edgedevicejobscreateorupdatesample]                                                             | create a EdgeDeviceJob x-ms-original-file: 2026-02-01/EdgeDeviceJobs_CreateOrUpdate_CollectLog.json                                                 |
| [edgeDeviceJobsDeleteSample.js][edgedevicejobsdeletesample]                                                                             | delete a EdgeDeviceJob x-ms-original-file: 2026-02-01/EdgeDeviceJobs_Delete.json                                                                    |
| [edgeDeviceJobsGetSample.js][edgedevicejobsgetsample]                                                                                   | get a EdgeDeviceJob x-ms-original-file: 2026-02-01/EdgeDeviceJobs_Get_RemoteSupport.json                                                            |
| [edgeDeviceJobsListByEdgeDeviceSample.js][edgedevicejobslistbyedgedevicesample]                                                         | list EdgeDeviceJob resources by EdgeDevice x-ms-original-file: 2026-02-01/EdgeDeviceJobs_ListByEdgeDevice.json                                      |
| [edgeDevicesCreateOrUpdateSample.js][edgedevicescreateorupdatesample]                                                                   | create a EdgeDevice x-ms-original-file: 2026-02-01/CreateHciEdgeDevice.json                                                                         |
| [edgeDevicesDeleteSample.js][edgedevicesdeletesample]                                                                                   | delete a EdgeDevice x-ms-original-file: 2026-02-01/DeleteEdgeDevices.json                                                                           |
| [edgeDevicesGetSample.js][edgedevicesgetsample]                                                                                         | get a EdgeDevice x-ms-original-file: 2026-02-01/GetEdgeDevices.json                                                                                 |
| [edgeDevicesListSample.js][edgedeviceslistsample]                                                                                       | list EdgeDevice resources by parent x-ms-original-file: 2026-02-01/ListEdgeDevices.json                                                             |
| [edgeDevicesValidateSample.js][edgedevicesvalidatesample]                                                                               | a long-running resource action. x-ms-original-file: 2026-02-01/ValidateEdgeDevices.json                                                             |
| [extensionsCreateSample.js][extensionscreatesample]                                                                                     | create Extension for HCI cluster. x-ms-original-file: 2026-02-01/PutExtension.json                                                                  |
| [extensionsDeleteSample.js][extensionsdeletesample]                                                                                     | delete particular Arc Extension of HCI Cluster. x-ms-original-file: 2026-02-01/DeleteExtension.json                                                 |
| [extensionsGetSample.js][extensionsgetsample]                                                                                           | get particular Arc Extension of HCI Cluster. x-ms-original-file: 2026-02-01/GetExtension.json                                                       |
| [extensionsListByArcSettingSample.js][extensionslistbyarcsettingsample]                                                                 | list all Extensions under ArcSetting resource. x-ms-original-file: 2026-02-01/ListExtensionsByArcSetting.json                                       |
| [extensionsUpdateSample.js][extensionsupdatesample]                                                                                     | update Extension for HCI cluster. x-ms-original-file: 2026-02-01/PatchExtension.json                                                                |
| [extensionsUpgradeSample.js][extensionsupgradesample]                                                                                   | upgrade a particular Arc Extension of HCI Cluster. x-ms-original-file: 2026-02-01/Extensions_Upgrade.json                                           |
| [offersGetSample.js][offersgetsample]                                                                                                   | get Offer resource details within a publisher of HCI Cluster. x-ms-original-file: 2026-02-01/GetOffer.json                                          |
| [offersListByClusterSample.js][offerslistbyclustersample]                                                                               | list Offers available across publishers for the HCI Cluster. x-ms-original-file: 2026-02-01/ListOffersByCluster.json                                |
| [offersListByPublisherSample.js][offerslistbypublishersample]                                                                           | list Offers available for a publisher within the HCI Cluster. x-ms-original-file: 2026-02-01/ListOffersByPublisher.json                             |
| [operationsListSample.js][operationslistsample]                                                                                         | list the operations for the provider x-ms-original-file: 2026-02-01/Operations_List.json                                                            |
| [securitySettingsCreateOrUpdateSample.js][securitysettingscreateorupdatesample]                                                         | create a security setting x-ms-original-file: 2026-02-01/PutSecuritySettings.json                                                                   |
| [securitySettingsDeleteSample.js][securitysettingsdeletesample]                                                                         | delete a SecuritySetting x-ms-original-file: 2026-02-01/DeleteSecuritySettings.json                                                                 |
| [securitySettingsGetSample.js][securitysettingsgetsample]                                                                               | get a SecuritySetting x-ms-original-file: 2026-02-01/GetSecuritySettings.json                                                                       |
| [securitySettingsListByClustersSample.js][securitysettingslistbyclusterssample]                                                         | list SecuritySetting resources by Clusters x-ms-original-file: 2026-02-01/ListSecuritySettingsByCluster.json                                        |
| [skusGetSample.js][skusgetsample]                                                                                                       | get SKU resource details within a offer of HCI Cluster. x-ms-original-file: 2026-02-01/GetSku.json                                                  |
| [skusListByOfferSample.js][skuslistbyoffersample]                                                                                       | list Skus available for a offer within the HCI Cluster. x-ms-original-file: 2026-02-01/ListSkusByOffer.json                                         |
| [updateRunsDeleteSample.js][updaterunsdeletesample]                                                                                     | delete specified Update Run x-ms-original-file: 2026-02-01/DeleteUpdateRuns.json                                                                    |
| [updateRunsGetSample.js][updaterunsgetsample]                                                                                           | get the Update run for a specified update x-ms-original-file: 2026-02-01/GetUpdateRuns.json                                                         |
| [updateRunsListSample.js][updaterunslistsample]                                                                                         | list all Update runs for a specified update x-ms-original-file: 2026-02-01/ListUpdateRuns.json                                                      |
| [updateRunsPutSample.js][updaterunsputsample]                                                                                           | put Update runs for a specified update x-ms-original-file: 2026-02-01/PutUpdateRuns.json                                                            |
| [updateSummariesDeleteSample.js][updatesummariesdeletesample]                                                                           | delete Update Summaries x-ms-original-file: 2026-02-01/DeleteUpdateSummaries.json                                                                   |
| [updateSummariesGetSample.js][updatesummariesgetsample]                                                                                 | get all Update summaries under the HCI cluster x-ms-original-file: 2026-02-01/GetUpdateSummaries.json                                               |
| [updateSummariesListSample.js][updatesummarieslistsample]                                                                               | list all Update summaries under the HCI cluster x-ms-original-file: 2026-02-01/ListUpdateSummaries.json                                             |
| [updateSummariesPutSample.js][updatesummariesputsample]                                                                                 | put Update summaries under the HCI cluster x-ms-original-file: 2026-02-01/PutUpdateSummaries.json                                                   |
| [updatesDeleteSample.js][updatesdeletesample]                                                                                           | delete specified Update x-ms-original-file: 2026-02-01/DeleteUpdates.json                                                                           |
| [updatesGetSample.js][updatesgetsample]                                                                                                 | get specified Update x-ms-original-file: 2026-02-01/GetUpdates.json                                                                                 |
| [updatesListSample.js][updateslistsample]                                                                                               | list all Updates x-ms-original-file: 2026-02-01/ListUpdates.json                                                                                    |
| [updatesPostSample.js][updatespostsample]                                                                                               | apply Update x-ms-original-file: 2026-02-01/PostUpdates.json                                                                                        |
| [updatesPutSample.js][updatesputsample]                                                                                                 | put specified Update x-ms-original-file: 2026-02-01/PutUpdates.json                                                                                 |
| [validatedSolutionRecipesGetSample.js][validatedsolutionrecipesgetsample]                                                               | get a validated solution recipe. x-ms-original-file: 2026-02-01/ValidatedSolutionRecipes_Get.json                                                   |
| [validatedSolutionRecipesListBySubscriptionLocationResourceSample.js][validatedsolutionrecipeslistbysubscriptionlocationresourcesample] | list all validated solution recipes. x-ms-original-file: 2026-02-01/ValidatedSolutionRecipes_ListBySubscriptionLocationResource.json                |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node arcSettingsConsentAndInstallDefaultExtensionsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[arcsettingsconsentandinstalldefaultextensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/arcSettingsConsentAndInstallDefaultExtensionsSample.js
[arcsettingscreateidentitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/arcSettingsCreateIdentitySample.js
[arcsettingscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/arcSettingsCreateSample.js
[arcsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/arcSettingsDeleteSample.js
[arcsettingsgeneratepasswordsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/arcSettingsGeneratePasswordSample.js
[arcsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/arcSettingsGetSample.js
[arcsettingsinitializedisableprocesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/arcSettingsInitializeDisableProcessSample.js
[arcsettingslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/arcSettingsListByClusterSample.js
[arcsettingsreconcilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/arcSettingsReconcileSample.js
[arcsettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/arcSettingsUpdateSample.js
[clustersconfigureremotesupportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersConfigureRemoteSupportSample.js
[clusterscreateidentitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersCreateIdentitySample.js
[clusterscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersCreateSample.js
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersDeleteSample.js
[clustersextendsoftwareassurancebenefitsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersExtendSoftwareAssuranceBenefitSample.js
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersGetSample.js
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersListByResourceGroupSample.js
[clusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersListBySubscriptionSample.js
[clusterstriggerlogcollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersTriggerLogCollectionSample.js
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersUpdateSample.js
[clustersupdatesecretslocationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersUpdateSecretsLocationsSample.js
[clustersuploadcertificatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/clustersUploadCertificateSample.js
[deploymentsettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/deploymentSettingsCreateOrUpdateSample.js
[deploymentsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/deploymentSettingsDeleteSample.js
[deploymentsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/deploymentSettingsGetSample.js
[deploymentsettingslistbyclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/deploymentSettingsListByClustersSample.js
[edgedevicejobscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/edgeDeviceJobsCreateOrUpdateSample.js
[edgedevicejobsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/edgeDeviceJobsDeleteSample.js
[edgedevicejobsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/edgeDeviceJobsGetSample.js
[edgedevicejobslistbyedgedevicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/edgeDeviceJobsListByEdgeDeviceSample.js
[edgedevicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/edgeDevicesCreateOrUpdateSample.js
[edgedevicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/edgeDevicesDeleteSample.js
[edgedevicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/edgeDevicesGetSample.js
[edgedeviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/edgeDevicesListSample.js
[edgedevicesvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/edgeDevicesValidateSample.js
[extensionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/extensionsCreateSample.js
[extensionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/extensionsDeleteSample.js
[extensionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/extensionsGetSample.js
[extensionslistbyarcsettingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/extensionsListByArcSettingSample.js
[extensionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/extensionsUpdateSample.js
[extensionsupgradesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/extensionsUpgradeSample.js
[offersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/offersGetSample.js
[offerslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/offersListByClusterSample.js
[offerslistbypublishersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/offersListByPublisherSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/operationsListSample.js
[securitysettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/securitySettingsCreateOrUpdateSample.js
[securitysettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/securitySettingsDeleteSample.js
[securitysettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/securitySettingsGetSample.js
[securitysettingslistbyclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/securitySettingsListByClustersSample.js
[skusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/skusGetSample.js
[skuslistbyoffersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/skusListByOfferSample.js
[updaterunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updateRunsDeleteSample.js
[updaterunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updateRunsGetSample.js
[updaterunslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updateRunsListSample.js
[updaterunsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updateRunsPutSample.js
[updatesummariesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updateSummariesDeleteSample.js
[updatesummariesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updateSummariesGetSample.js
[updatesummarieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updateSummariesListSample.js
[updatesummariesputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updateSummariesPutSample.js
[updatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updatesDeleteSample.js
[updatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updatesGetSample.js
[updateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updatesListSample.js
[updatespostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updatesPostSample.js
[updatesputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/updatesPutSample.js
[validatedsolutionrecipesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/validatedSolutionRecipesGetSample.js
[validatedsolutionrecipeslistbysubscriptionlocationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v4/javascript/validatedSolutionRecipesListBySubscriptionLocationResourceSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-azurestackhci?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azurestackhci/arm-azurestackhci/README.md

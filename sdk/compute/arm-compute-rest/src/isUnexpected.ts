// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsList200Response,
  OperationsListdefaultResponse,
  UsageList200Response,
  UsageListdefaultResponse,
  VirtualMachineSizesList200Response,
  VirtualMachineSizesListdefaultResponse,
  VirtualMachineScaleSetsListByLocation200Response,
  VirtualMachineScaleSetsListByLocationdefaultResponse,
  VirtualMachineScaleSetsCreateOrUpdate200Response,
  VirtualMachineScaleSetsCreateOrUpdate201Response,
  VirtualMachineScaleSetsCreateOrUpdatedefaultResponse,
  VirtualMachineScaleSetsUpdate200Response,
  VirtualMachineScaleSetsUpdatedefaultResponse,
  VirtualMachineScaleSetsDelete200Response,
  VirtualMachineScaleSetsDelete202Response,
  VirtualMachineScaleSetsDelete204Response,
  VirtualMachineScaleSetsDeletedefaultResponse,
  VirtualMachineScaleSetsGet200Response,
  VirtualMachineScaleSetsGetdefaultResponse,
  VirtualMachineScaleSetsDeallocate200Response,
  VirtualMachineScaleSetsDeallocate202Response,
  VirtualMachineScaleSetsDeallocatedefaultResponse,
  VirtualMachineScaleSetsDeleteInstances200Response,
  VirtualMachineScaleSetsDeleteInstances202Response,
  VirtualMachineScaleSetsDeleteInstancesdefaultResponse,
  VirtualMachineScaleSetsGetInstanceView200Response,
  VirtualMachineScaleSetsGetInstanceViewdefaultResponse,
  VirtualMachineScaleSetsList200Response,
  VirtualMachineScaleSetsListdefaultResponse,
  VirtualMachineScaleSetsListAll200Response,
  VirtualMachineScaleSetsListAlldefaultResponse,
  VirtualMachineScaleSetsListSkus200Response,
  VirtualMachineScaleSetsListSkusdefaultResponse,
  VirtualMachineScaleSetsGetOSUpgradeHistory200Response,
  VirtualMachineScaleSetsGetOSUpgradeHistorydefaultResponse,
  VirtualMachineScaleSetsPowerOff200Response,
  VirtualMachineScaleSetsPowerOff202Response,
  VirtualMachineScaleSetsPowerOffdefaultResponse,
  VirtualMachineScaleSetsRestart200Response,
  VirtualMachineScaleSetsRestart202Response,
  VirtualMachineScaleSetsRestartdefaultResponse,
  VirtualMachineScaleSetsStart200Response,
  VirtualMachineScaleSetsStart202Response,
  VirtualMachineScaleSetsStartdefaultResponse,
  VirtualMachineScaleSetsRedeploy200Response,
  VirtualMachineScaleSetsRedeploy202Response,
  VirtualMachineScaleSetsRedeploydefaultResponse,
  VirtualMachineScaleSetsPerformMaintenance200Response,
  VirtualMachineScaleSetsPerformMaintenance202Response,
  VirtualMachineScaleSetsPerformMaintenancedefaultResponse,
  VirtualMachineScaleSetsUpdateInstances200Response,
  VirtualMachineScaleSetsUpdateInstances202Response,
  VirtualMachineScaleSetsUpdateInstancesdefaultResponse,
  VirtualMachineScaleSetsReimage200Response,
  VirtualMachineScaleSetsReimage202Response,
  VirtualMachineScaleSetsReimagedefaultResponse,
  VirtualMachineScaleSetsReimageAll200Response,
  VirtualMachineScaleSetsReimageAll202Response,
  VirtualMachineScaleSetsReimageAlldefaultResponse,
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalk200Response,
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkdefaultResponse,
  VirtualMachineScaleSetsConvertToSinglePlacementGroup200Response,
  VirtualMachineScaleSetsConvertToSinglePlacementGroupdefaultResponse,
  VirtualMachineScaleSetsSetOrchestrationServiceState200Response,
  VirtualMachineScaleSetsSetOrchestrationServiceState202Response,
  VirtualMachineScaleSetsSetOrchestrationServiceStatedefaultResponse,
  VirtualMachineScaleSetExtensionsCreateOrUpdate200Response,
  VirtualMachineScaleSetExtensionsCreateOrUpdate201Response,
  VirtualMachineScaleSetExtensionsCreateOrUpdatedefaultResponse,
  VirtualMachineScaleSetExtensionsUpdate200Response,
  VirtualMachineScaleSetExtensionsUpdate201Response,
  VirtualMachineScaleSetExtensionsUpdatedefaultResponse,
  VirtualMachineScaleSetExtensionsDelete200Response,
  VirtualMachineScaleSetExtensionsDelete202Response,
  VirtualMachineScaleSetExtensionsDelete204Response,
  VirtualMachineScaleSetExtensionsDeletedefaultResponse,
  VirtualMachineScaleSetExtensionsGet200Response,
  VirtualMachineScaleSetExtensionsGetdefaultResponse,
  VirtualMachineScaleSetExtensionsList200Response,
  VirtualMachineScaleSetExtensionsListdefaultResponse,
  VirtualMachineScaleSetRollingUpgradesCancel200Response,
  VirtualMachineScaleSetRollingUpgradesCancel202Response,
  VirtualMachineScaleSetRollingUpgradesCanceldefaultResponse,
  VirtualMachineScaleSetRollingUpgradesStartOSUpgrade200Response,
  VirtualMachineScaleSetRollingUpgradesStartOSUpgrade202Response,
  VirtualMachineScaleSetRollingUpgradesStartOSUpgradedefaultResponse,
  VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade200Response,
  VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade202Response,
  VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradedefaultResponse,
  VirtualMachineScaleSetRollingUpgradesGetLatest200Response,
  VirtualMachineScaleSetRollingUpgradesGetLatestdefaultResponse,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdate200Response,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdate201Response,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdatedefaultResponse,
  VirtualMachineScaleSetVMExtensionsUpdate200Response,
  VirtualMachineScaleSetVMExtensionsUpdatedefaultResponse,
  VirtualMachineScaleSetVMExtensionsDelete200Response,
  VirtualMachineScaleSetVMExtensionsDelete202Response,
  VirtualMachineScaleSetVMExtensionsDelete204Response,
  VirtualMachineScaleSetVMExtensionsDeletedefaultResponse,
  VirtualMachineScaleSetVMExtensionsGet200Response,
  VirtualMachineScaleSetVMExtensionsGetdefaultResponse,
  VirtualMachineScaleSetVMExtensionsList200Response,
  VirtualMachineScaleSetVMExtensionsListdefaultResponse,
  VirtualMachineScaleSetVMsReimage200Response,
  VirtualMachineScaleSetVMsReimage202Response,
  VirtualMachineScaleSetVMsReimagedefaultResponse,
  VirtualMachineScaleSetVMsReimageAll200Response,
  VirtualMachineScaleSetVMsReimageAll202Response,
  VirtualMachineScaleSetVMsReimageAlldefaultResponse,
  VirtualMachineScaleSetVMsDeallocate200Response,
  VirtualMachineScaleSetVMsDeallocate202Response,
  VirtualMachineScaleSetVMsDeallocatedefaultResponse,
  VirtualMachineScaleSetVMsUpdate200Response,
  VirtualMachineScaleSetVMsUpdate202Response,
  VirtualMachineScaleSetVMsUpdatedefaultResponse,
  VirtualMachineScaleSetVMsDelete200Response,
  VirtualMachineScaleSetVMsDelete202Response,
  VirtualMachineScaleSetVMsDelete204Response,
  VirtualMachineScaleSetVMsDeletedefaultResponse,
  VirtualMachineScaleSetVMsGet200Response,
  VirtualMachineScaleSetVMsGetdefaultResponse,
  VirtualMachineScaleSetVMsGetInstanceView200Response,
  VirtualMachineScaleSetVMsGetInstanceViewdefaultResponse,
  VirtualMachineScaleSetVMsList200Response,
  VirtualMachineScaleSetVMsListdefaultResponse,
  VirtualMachineScaleSetVMsPowerOff200Response,
  VirtualMachineScaleSetVMsPowerOff202Response,
  VirtualMachineScaleSetVMsPowerOffdefaultResponse,
  VirtualMachineScaleSetVMsRestart200Response,
  VirtualMachineScaleSetVMsRestart202Response,
  VirtualMachineScaleSetVMsRestartdefaultResponse,
  VirtualMachineScaleSetVMsStart200Response,
  VirtualMachineScaleSetVMsStart202Response,
  VirtualMachineScaleSetVMsStartdefaultResponse,
  VirtualMachineScaleSetVMsRedeploy200Response,
  VirtualMachineScaleSetVMsRedeploy202Response,
  VirtualMachineScaleSetVMsRedeploydefaultResponse,
  VirtualMachineScaleSetVMsRetrieveBootDiagnosticsData200Response,
  VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDatadefaultResponse,
  VirtualMachineScaleSetVMsPerformMaintenance200Response,
  VirtualMachineScaleSetVMsPerformMaintenance202Response,
  VirtualMachineScaleSetVMsPerformMaintenancedefaultResponse,
  VirtualMachineScaleSetVMsSimulateEviction204Response,
  VirtualMachineScaleSetVMsSimulateEvictiondefaultResponse,
  VirtualMachineExtensionsCreateOrUpdate200Response,
  VirtualMachineExtensionsCreateOrUpdate201Response,
  VirtualMachineExtensionsCreateOrUpdatedefaultResponse,
  VirtualMachineExtensionsUpdate200Response,
  VirtualMachineExtensionsUpdatedefaultResponse,
  VirtualMachineExtensionsDelete200Response,
  VirtualMachineExtensionsDelete202Response,
  VirtualMachineExtensionsDelete204Response,
  VirtualMachineExtensionsDeletedefaultResponse,
  VirtualMachineExtensionsGet200Response,
  VirtualMachineExtensionsGetdefaultResponse,
  VirtualMachineExtensionsList200Response,
  VirtualMachineExtensionsListdefaultResponse,
  VirtualMachinesListByLocation200Response,
  VirtualMachinesListByLocationdefaultResponse,
  VirtualMachinesCapture200Response,
  VirtualMachinesCapture202Response,
  VirtualMachinesCapturedefaultResponse,
  VirtualMachinesCreateOrUpdate200Response,
  VirtualMachinesCreateOrUpdate201Response,
  VirtualMachinesCreateOrUpdatedefaultResponse,
  VirtualMachinesUpdate200Response,
  VirtualMachinesUpdatedefaultResponse,
  VirtualMachinesDelete200Response,
  VirtualMachinesDelete202Response,
  VirtualMachinesDelete204Response,
  VirtualMachinesDeletedefaultResponse,
  VirtualMachinesGet200Response,
  VirtualMachinesGetdefaultResponse,
  VirtualMachinesInstanceView200Response,
  VirtualMachinesInstanceViewdefaultResponse,
  VirtualMachinesConvertToManagedDisks200Response,
  VirtualMachinesConvertToManagedDisks202Response,
  VirtualMachinesConvertToManagedDisksdefaultResponse,
  VirtualMachinesDeallocate200Response,
  VirtualMachinesDeallocate202Response,
  VirtualMachinesDeallocatedefaultResponse,
  VirtualMachinesGeneralize200Response,
  VirtualMachinesGeneralizedefaultResponse,
  VirtualMachinesList200Response,
  VirtualMachinesListdefaultResponse,
  VirtualMachinesListAll200Response,
  VirtualMachinesListAlldefaultResponse,
  VirtualMachinesListAvailableSizes200Response,
  VirtualMachinesListAvailableSizesdefaultResponse,
  VirtualMachinesPowerOff200Response,
  VirtualMachinesPowerOff202Response,
  VirtualMachinesPowerOffdefaultResponse,
  VirtualMachinesReapply200Response,
  VirtualMachinesReapply202Response,
  VirtualMachinesReapplydefaultResponse,
  VirtualMachinesRestart200Response,
  VirtualMachinesRestart202Response,
  VirtualMachinesRestartdefaultResponse,
  VirtualMachinesStart200Response,
  VirtualMachinesStart202Response,
  VirtualMachinesStartdefaultResponse,
  VirtualMachinesRedeploy200Response,
  VirtualMachinesRedeploy202Response,
  VirtualMachinesRedeploydefaultResponse,
  VirtualMachinesReimage200Response,
  VirtualMachinesReimage202Response,
  VirtualMachinesReimagedefaultResponse,
  VirtualMachinesRetrieveBootDiagnosticsData200Response,
  VirtualMachinesRetrieveBootDiagnosticsDatadefaultResponse,
  VirtualMachinesPerformMaintenance200Response,
  VirtualMachinesPerformMaintenance202Response,
  VirtualMachinesPerformMaintenancedefaultResponse,
  VirtualMachinesSimulateEviction204Response,
  VirtualMachinesSimulateEvictiondefaultResponse,
  VirtualMachinesAssessPatches200Response,
  VirtualMachinesAssessPatches202Response,
  VirtualMachinesAssessPatchesdefaultResponse,
  VirtualMachinesInstallPatches200Response,
  VirtualMachinesInstallPatches202Response,
  VirtualMachinesInstallPatchesdefaultResponse,
  VirtualMachineImagesGet200Response,
  VirtualMachineImagesGetdefaultResponse,
  VirtualMachineImagesList200Response,
  VirtualMachineImagesListdefaultResponse,
  VirtualMachineImagesListOffers200Response,
  VirtualMachineImagesListOffersdefaultResponse,
  VirtualMachineImagesListPublishers200Response,
  VirtualMachineImagesListPublishersdefaultResponse,
  VirtualMachineImagesListSkus200Response,
  VirtualMachineImagesListSkusdefaultResponse,
  VirtualMachineImagesListByEdgeZone200Response,
  VirtualMachineImagesListByEdgeZonedefaultResponse,
  VirtualMachineImagesEdgeZoneGet200Response,
  VirtualMachineImagesEdgeZoneGetdefaultResponse,
  VirtualMachineImagesEdgeZoneList200Response,
  VirtualMachineImagesEdgeZoneListdefaultResponse,
  VirtualMachineImagesEdgeZoneListOffers200Response,
  VirtualMachineImagesEdgeZoneListOffersdefaultResponse,
  VirtualMachineImagesEdgeZoneListPublishers200Response,
  VirtualMachineImagesEdgeZoneListPublishersdefaultResponse,
  VirtualMachineImagesEdgeZoneListSkus200Response,
  VirtualMachineImagesEdgeZoneListSkusdefaultResponse,
  VirtualMachineExtensionImagesGet200Response,
  VirtualMachineExtensionImagesGetdefaultResponse,
  VirtualMachineExtensionImagesListTypes200Response,
  VirtualMachineExtensionImagesListTypesdefaultResponse,
  VirtualMachineExtensionImagesListVersions200Response,
  VirtualMachineExtensionImagesListVersionsdefaultResponse,
  AvailabilitySetsCreateOrUpdate200Response,
  AvailabilitySetsCreateOrUpdatedefaultResponse,
  AvailabilitySetsUpdate200Response,
  AvailabilitySetsUpdatedefaultResponse,
  AvailabilitySetsDelete200Response,
  AvailabilitySetsDelete204Response,
  AvailabilitySetsDeletedefaultResponse,
  AvailabilitySetsGet200Response,
  AvailabilitySetsGetdefaultResponse,
  AvailabilitySetsListBySubscription200Response,
  AvailabilitySetsListBySubscriptiondefaultResponse,
  AvailabilitySetsList200Response,
  AvailabilitySetsListdefaultResponse,
  AvailabilitySetsListAvailableSizes200Response,
  AvailabilitySetsListAvailableSizesdefaultResponse,
  ProximityPlacementGroupsCreateOrUpdate200Response,
  ProximityPlacementGroupsCreateOrUpdate201Response,
  ProximityPlacementGroupsCreateOrUpdatedefaultResponse,
  ProximityPlacementGroupsUpdate200Response,
  ProximityPlacementGroupsUpdatedefaultResponse,
  ProximityPlacementGroupsDelete200Response,
  ProximityPlacementGroupsDeletedefaultResponse,
  ProximityPlacementGroupsGet200Response,
  ProximityPlacementGroupsGetdefaultResponse,
  ProximityPlacementGroupsListBySubscription200Response,
  ProximityPlacementGroupsListBySubscriptiondefaultResponse,
  ProximityPlacementGroupsListByResourceGroup200Response,
  ProximityPlacementGroupsListByResourceGroupdefaultResponse,
  DedicatedHostGroupsCreateOrUpdate200Response,
  DedicatedHostGroupsCreateOrUpdate201Response,
  DedicatedHostGroupsCreateOrUpdatedefaultResponse,
  DedicatedHostGroupsUpdate200Response,
  DedicatedHostGroupsUpdatedefaultResponse,
  DedicatedHostGroupsDelete200Response,
  DedicatedHostGroupsDelete204Response,
  DedicatedHostGroupsDeletedefaultResponse,
  DedicatedHostGroupsGet200Response,
  DedicatedHostGroupsGetdefaultResponse,
  DedicatedHostGroupsListByResourceGroup200Response,
  DedicatedHostGroupsListByResourceGroupdefaultResponse,
  DedicatedHostGroupsListBySubscription200Response,
  DedicatedHostGroupsListBySubscriptiondefaultResponse,
  DedicatedHostsCreateOrUpdate200Response,
  DedicatedHostsCreateOrUpdate201Response,
  DedicatedHostsCreateOrUpdatedefaultResponse,
  DedicatedHostsUpdate200Response,
  DedicatedHostsUpdatedefaultResponse,
  DedicatedHostsDelete200Response,
  DedicatedHostsDelete202Response,
  DedicatedHostsDelete204Response,
  DedicatedHostsDeletedefaultResponse,
  DedicatedHostsGet200Response,
  DedicatedHostsGetdefaultResponse,
  DedicatedHostsListByHostGroup200Response,
  DedicatedHostsListByHostGroupdefaultResponse,
  DedicatedHostsRestart200Response,
  DedicatedHostsRestartdefaultResponse,
  SshPublicKeysListBySubscription200Response,
  SshPublicKeysListBySubscriptiondefaultResponse,
  SshPublicKeysListByResourceGroup200Response,
  SshPublicKeysListByResourceGroupdefaultResponse,
  SshPublicKeysCreate200Response,
  SshPublicKeysCreate201Response,
  SshPublicKeysCreatedefaultResponse,
  SshPublicKeysUpdate200Response,
  SshPublicKeysUpdatedefaultResponse,
  SshPublicKeysDelete200Response,
  SshPublicKeysDelete204Response,
  SshPublicKeysDeletedefaultResponse,
  SshPublicKeysGet200Response,
  SshPublicKeysGetdefaultResponse,
  SshPublicKeysGenerateKeyPair200Response,
  SshPublicKeysGenerateKeyPairdefaultResponse,
  ImagesCreateOrUpdate200Response,
  ImagesCreateOrUpdate201Response,
  ImagesCreateOrUpdatedefaultResponse,
  ImagesUpdate200Response,
  ImagesUpdate201Response,
  ImagesUpdatedefaultResponse,
  ImagesDelete200Response,
  ImagesDelete202Response,
  ImagesDelete204Response,
  ImagesDeletedefaultResponse,
  ImagesGet200Response,
  ImagesGetdefaultResponse,
  ImagesListByResourceGroup200Response,
  ImagesListByResourceGroupdefaultResponse,
  ImagesList200Response,
  ImagesListdefaultResponse,
  RestorePointCollectionsCreateOrUpdate200Response,
  RestorePointCollectionsCreateOrUpdate201Response,
  RestorePointCollectionsCreateOrUpdatedefaultResponse,
  RestorePointCollectionsUpdate200Response,
  RestorePointCollectionsUpdatedefaultResponse,
  RestorePointCollectionsDelete200Response,
  RestorePointCollectionsDelete202Response,
  RestorePointCollectionsDelete204Response,
  RestorePointCollectionsDeletedefaultResponse,
  RestorePointCollectionsGet200Response,
  RestorePointCollectionsGetdefaultResponse,
  RestorePointCollectionsList200Response,
  RestorePointCollectionsListdefaultResponse,
  RestorePointCollectionsListAll200Response,
  RestorePointCollectionsListAlldefaultResponse,
  RestorePointsCreate201Response,
  RestorePointsCreatedefaultResponse,
  RestorePointsDelete200Response,
  RestorePointsDelete202Response,
  RestorePointsDelete204Response,
  RestorePointsDeletedefaultResponse,
  RestorePointsGet200Response,
  RestorePointsGetdefaultResponse,
  CapacityReservationGroupsCreateOrUpdate200Response,
  CapacityReservationGroupsCreateOrUpdate201Response,
  CapacityReservationGroupsCreateOrUpdatedefaultResponse,
  CapacityReservationGroupsUpdate200Response,
  CapacityReservationGroupsUpdatedefaultResponse,
  CapacityReservationGroupsDelete200Response,
  CapacityReservationGroupsDelete204Response,
  CapacityReservationGroupsDeletedefaultResponse,
  CapacityReservationGroupsGet200Response,
  CapacityReservationGroupsGetdefaultResponse,
  CapacityReservationGroupsListByResourceGroup200Response,
  CapacityReservationGroupsListByResourceGroupdefaultResponse,
  CapacityReservationGroupsListBySubscription200Response,
  CapacityReservationGroupsListBySubscriptiondefaultResponse,
  CapacityReservationsCreateOrUpdate200Response,
  CapacityReservationsCreateOrUpdate201Response,
  CapacityReservationsCreateOrUpdatedefaultResponse,
  CapacityReservationsUpdate200Response,
  CapacityReservationsUpdate202Response,
  CapacityReservationsUpdatedefaultResponse,
  CapacityReservationsDelete200Response,
  CapacityReservationsDelete202Response,
  CapacityReservationsDelete204Response,
  CapacityReservationsDeletedefaultResponse,
  CapacityReservationsGet200Response,
  CapacityReservationsGetdefaultResponse,
  CapacityReservationsListByCapacityReservationGroup200Response,
  CapacityReservationsListByCapacityReservationGroupdefaultResponse,
  LogAnalyticsExportRequestRateByInterval200Response,
  LogAnalyticsExportRequestRateByInterval202Response,
  LogAnalyticsExportRequestRateByIntervaldefaultResponse,
  LogAnalyticsExportThrottledRequests200Response,
  LogAnalyticsExportThrottledRequests202Response,
  LogAnalyticsExportThrottledRequestsdefaultResponse,
  VirtualMachineRunCommandsCreateOrUpdate200Response,
  VirtualMachineRunCommandsCreateOrUpdate201Response,
  VirtualMachineRunCommandsCreateOrUpdatedefaultResponse,
  VirtualMachineRunCommandsUpdate200Response,
  VirtualMachineRunCommandsUpdatedefaultResponse,
  VirtualMachineRunCommandsDelete200Response,
  VirtualMachineRunCommandsDelete202Response,
  VirtualMachineRunCommandsDelete204Response,
  VirtualMachineRunCommandsDeletedefaultResponse,
  VirtualMachineRunCommandsGetByVirtualMachine200Response,
  VirtualMachineRunCommandsGetByVirtualMachinedefaultResponse,
  VirtualMachineRunCommandsListByVirtualMachine200Response,
  VirtualMachineRunCommandsListByVirtualMachinedefaultResponse,
  VirtualMachineScaleSetVMRunCommandsCreateOrUpdate200Response,
  VirtualMachineScaleSetVMRunCommandsCreateOrUpdate201Response,
  VirtualMachineScaleSetVMRunCommandsCreateOrUpdatedefaultResponse,
  VirtualMachineScaleSetVMRunCommandsUpdate200Response,
  VirtualMachineScaleSetVMRunCommandsUpdatedefaultResponse,
  VirtualMachineScaleSetVMRunCommandsDelete200Response,
  VirtualMachineScaleSetVMRunCommandsDelete202Response,
  VirtualMachineScaleSetVMRunCommandsDelete204Response,
  VirtualMachineScaleSetVMRunCommandsDeletedefaultResponse,
  VirtualMachineScaleSetVMRunCommandsGet200Response,
  VirtualMachineScaleSetVMRunCommandsGetdefaultResponse,
  VirtualMachineScaleSetVMRunCommandsList200Response,
  VirtualMachineScaleSetVMRunCommandsListdefaultResponse,
  DiskAccessesCreateOrUpdate200Response,
  DiskAccessesCreateOrUpdate202Response,
  DiskAccessesCreateOrUpdatedefaultResponse,
  DiskAccessesUpdate200Response,
  DiskAccessesUpdate202Response,
  DiskAccessesUpdatedefaultResponse,
  DiskAccessesGet200Response,
  DiskAccessesGetdefaultResponse,
  DiskAccessesDelete200Response,
  DiskAccessesDelete202Response,
  DiskAccessesDelete204Response,
  DiskAccessesDeletedefaultResponse,
  DiskAccessesListByResourceGroup200Response,
  DiskAccessesListByResourceGroupdefaultResponse,
  DiskAccessesList200Response,
  DiskAccessesListdefaultResponse,
  DiskAccessesUpdateAPrivateEndpointConnection200Response,
  DiskAccessesUpdateAPrivateEndpointConnection202Response,
  DiskAccessesUpdateAPrivateEndpointConnectiondefaultResponse,
  DiskAccessesGetAPrivateEndpointConnection200Response,
  DiskAccessesGetAPrivateEndpointConnectiondefaultResponse,
  DiskAccessesDeleteAPrivateEndpointConnection200Response,
  DiskAccessesDeleteAPrivateEndpointConnection202Response,
  DiskAccessesDeleteAPrivateEndpointConnection204Response,
  DiskAccessesDeleteAPrivateEndpointConnectiondefaultResponse,
  DiskAccessesListPrivateEndpointConnections200Response,
  DiskAccessesListPrivateEndpointConnectionsdefaultResponse,
  DiskEncryptionSetsCreateOrUpdate200Response,
  DiskEncryptionSetsCreateOrUpdate202Response,
  DiskEncryptionSetsCreateOrUpdatedefaultResponse,
  DiskEncryptionSetsUpdate200Response,
  DiskEncryptionSetsUpdate202Response,
  DiskEncryptionSetsUpdatedefaultResponse,
  DiskEncryptionSetsGet200Response,
  DiskEncryptionSetsGetdefaultResponse,
  DiskEncryptionSetsDelete200Response,
  DiskEncryptionSetsDelete202Response,
  DiskEncryptionSetsDelete204Response,
  DiskEncryptionSetsDeletedefaultResponse,
  DiskEncryptionSetsListByResourceGroup200Response,
  DiskEncryptionSetsListByResourceGroupdefaultResponse,
  DiskEncryptionSetsList200Response,
  DiskEncryptionSetsListdefaultResponse,
  DiskEncryptionSetsListAssociatedResources200Response,
  DiskEncryptionSetsListAssociatedResourcesdefaultResponse,
  DiskRestorePointGet200Response,
  DiskRestorePointGetdefaultResponse,
  DiskRestorePointListByRestorePoint200Response,
  DiskRestorePointListByRestorePointdefaultResponse,
  DiskRestorePointGrantAccess200Response,
  DiskRestorePointGrantAccess202Response,
  DiskRestorePointGrantAccessdefaultResponse,
  DiskRestorePointRevokeAccess200Response,
  DiskRestorePointRevokeAccess202Response,
  DiskRestorePointRevokeAccessdefaultResponse,
  GalleriesCreateOrUpdate200Response,
  GalleriesCreateOrUpdate201Response,
  GalleriesCreateOrUpdate202Response,
  GalleriesCreateOrUpdatedefaultResponse,
  GalleriesUpdate200Response,
  GalleriesUpdatedefaultResponse,
  GalleriesGet200Response,
  GalleriesGetdefaultResponse,
  GalleriesDelete200Response,
  GalleriesDelete202Response,
  GalleriesDelete204Response,
  GalleriesDeletedefaultResponse,
  GalleriesListByResourceGroup200Response,
  GalleriesListByResourceGroupdefaultResponse,
  GalleriesList200Response,
  GalleriesListdefaultResponse,
  GalleryImagesCreateOrUpdate200Response,
  GalleryImagesCreateOrUpdate201Response,
  GalleryImagesCreateOrUpdate202Response,
  GalleryImagesCreateOrUpdatedefaultResponse,
  GalleryImagesUpdate200Response,
  GalleryImagesUpdatedefaultResponse,
  GalleryImagesGet200Response,
  GalleryImagesGetdefaultResponse,
  GalleryImagesDelete200Response,
  GalleryImagesDelete202Response,
  GalleryImagesDelete204Response,
  GalleryImagesDeletedefaultResponse,
  GalleryImagesListByGallery200Response,
  GalleryImagesListByGallerydefaultResponse,
  GalleryImageVersionsCreateOrUpdate200Response,
  GalleryImageVersionsCreateOrUpdate201Response,
  GalleryImageVersionsCreateOrUpdate202Response,
  GalleryImageVersionsCreateOrUpdatedefaultResponse,
  GalleryImageVersionsUpdate200Response,
  GalleryImageVersionsUpdatedefaultResponse,
  GalleryImageVersionsGet200Response,
  GalleryImageVersionsGetdefaultResponse,
  GalleryImageVersionsDelete200Response,
  GalleryImageVersionsDelete202Response,
  GalleryImageVersionsDelete204Response,
  GalleryImageVersionsDeletedefaultResponse,
  GalleryImageVersionsListByGalleryImage200Response,
  GalleryImageVersionsListByGalleryImagedefaultResponse,
  GalleryApplicationsCreateOrUpdate200Response,
  GalleryApplicationsCreateOrUpdate201Response,
  GalleryApplicationsCreateOrUpdate202Response,
  GalleryApplicationsCreateOrUpdatedefaultResponse,
  GalleryApplicationsUpdate200Response,
  GalleryApplicationsUpdatedefaultResponse,
  GalleryApplicationsGet200Response,
  GalleryApplicationsGetdefaultResponse,
  GalleryApplicationsDelete200Response,
  GalleryApplicationsDelete202Response,
  GalleryApplicationsDelete204Response,
  GalleryApplicationsDeletedefaultResponse,
  GalleryApplicationsListByGallery200Response,
  GalleryApplicationsListByGallerydefaultResponse,
  GalleryApplicationVersionsCreateOrUpdate200Response,
  GalleryApplicationVersionsCreateOrUpdate201Response,
  GalleryApplicationVersionsCreateOrUpdate202Response,
  GalleryApplicationVersionsCreateOrUpdatedefaultResponse,
  GalleryApplicationVersionsUpdate200Response,
  GalleryApplicationVersionsUpdatedefaultResponse,
  GalleryApplicationVersionsGet200Response,
  GalleryApplicationVersionsGetdefaultResponse,
  GalleryApplicationVersionsDelete200Response,
  GalleryApplicationVersionsDelete202Response,
  GalleryApplicationVersionsDelete204Response,
  GalleryApplicationVersionsDeletedefaultResponse,
  GalleryApplicationVersionsListByGalleryApplication200Response,
  GalleryApplicationVersionsListByGalleryApplicationdefaultResponse,
  GallerySharingProfileUpdate200Response,
  GallerySharingProfileUpdate202Response,
  GallerySharingProfileUpdatedefaultResponse,
  SharedGalleriesList200Response,
  SharedGalleriesListdefaultResponse,
  SharedGalleriesGet200Response,
  SharedGalleriesGetdefaultResponse,
  SharedGalleryImagesList200Response,
  SharedGalleryImagesListdefaultResponse,
  SharedGalleryImagesGet200Response,
  SharedGalleryImagesGetdefaultResponse,
  SharedGalleryImageVersionsList200Response,
  SharedGalleryImageVersionsListdefaultResponse,
  SharedGalleryImageVersionsGet200Response,
  SharedGalleryImageVersionsGetdefaultResponse,
  CommunityGalleriesGet200Response,
  CommunityGalleriesGetdefaultResponse,
  CommunityGalleryImagesGet200Response,
  CommunityGalleryImagesGetdefaultResponse,
  CommunityGalleryImagesList200Response,
  CommunityGalleryImagesListdefaultResponse,
  CommunityGalleryImageVersionsGet200Response,
  CommunityGalleryImageVersionsGetdefaultResponse,
  CommunityGalleryImageVersionsList200Response,
  CommunityGalleryImageVersionsListdefaultResponse,
  CloudServiceRoleInstancesDelete200Response,
  CloudServiceRoleInstancesDelete202Response,
  CloudServiceRoleInstancesDelete204Response,
  CloudServiceRoleInstancesDeletedefaultResponse,
  CloudServiceRoleInstancesGet200Response,
  CloudServiceRoleInstancesGetdefaultResponse,
  CloudServiceRoleInstancesGetInstanceView200Response,
  CloudServiceRoleInstancesGetInstanceViewdefaultResponse,
  CloudServiceRoleInstancesList200Response,
  CloudServiceRoleInstancesListdefaultResponse,
  CloudServiceRoleInstancesRestart200Response,
  CloudServiceRoleInstancesRestart202Response,
  CloudServiceRoleInstancesRestartdefaultResponse,
  CloudServiceRoleInstancesReimage200Response,
  CloudServiceRoleInstancesReimage202Response,
  CloudServiceRoleInstancesReimagedefaultResponse,
  CloudServiceRoleInstancesRebuild200Response,
  CloudServiceRoleInstancesRebuild202Response,
  CloudServiceRoleInstancesRebuilddefaultResponse,
  CloudServiceRoleInstancesGetRemoteDesktopFile200Response,
  CloudServiceRoleInstancesGetRemoteDesktopFiledefaultResponse,
  CloudServiceRolesGet200Response,
  CloudServiceRolesGetdefaultResponse,
  CloudServiceRolesList200Response,
  CloudServiceRolesListdefaultResponse,
  CloudServicesCreateOrUpdate200Response,
  CloudServicesCreateOrUpdate201Response,
  CloudServicesCreateOrUpdatedefaultResponse,
  CloudServicesUpdate200Response,
  CloudServicesUpdatedefaultResponse,
  CloudServicesDelete200Response,
  CloudServicesDelete202Response,
  CloudServicesDelete204Response,
  CloudServicesDeletedefaultResponse,
  CloudServicesGet200Response,
  CloudServicesGetdefaultResponse,
  CloudServicesGetInstanceView200Response,
  CloudServicesGetInstanceViewdefaultResponse,
  CloudServicesListAll200Response,
  CloudServicesListAlldefaultResponse,
  CloudServicesList200Response,
  CloudServicesListdefaultResponse,
  CloudServicesStart200Response,
  CloudServicesStart202Response,
  CloudServicesStartdefaultResponse,
  CloudServicesPowerOff200Response,
  CloudServicesPowerOff202Response,
  CloudServicesPowerOffdefaultResponse,
  CloudServicesRestart200Response,
  CloudServicesRestart202Response,
  CloudServicesRestartdefaultResponse,
  CloudServicesReimage200Response,
  CloudServicesReimage202Response,
  CloudServicesReimagedefaultResponse,
  CloudServicesRebuild200Response,
  CloudServicesRebuild202Response,
  CloudServicesRebuilddefaultResponse,
  CloudServicesDeleteInstances200Response,
  CloudServicesDeleteInstances202Response,
  CloudServicesDeleteInstancesdefaultResponse,
  CloudServicesUpdateDomainWalkUpdateDomain200Response,
  CloudServicesUpdateDomainWalkUpdateDomain202Response,
  CloudServicesUpdateDomainWalkUpdateDomaindefaultResponse,
  CloudServicesUpdateDomainGetUpdateDomain200Response,
  CloudServicesUpdateDomainGetUpdateDomaindefaultResponse,
  CloudServicesUpdateDomainListUpdateDomains200Response,
  CloudServicesUpdateDomainListUpdateDomainsdefaultResponse,
  CloudServiceOperatingSystemsGetOSVersion200Response,
  CloudServiceOperatingSystemsGetOSVersiondefaultResponse,
  CloudServiceOperatingSystemsListOSVersions200Response,
  CloudServiceOperatingSystemsListOSVersionsdefaultResponse,
  CloudServiceOperatingSystemsGetOSFamily200Response,
  CloudServiceOperatingSystemsGetOSFamilydefaultResponse,
  CloudServiceOperatingSystemsListOSFamilies200Response,
  CloudServiceOperatingSystemsListOSFamiliesdefaultResponse
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /providers/Microsoft.Compute/operations": ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/usages": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/vmSizes": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/virtualMachineScaleSets": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}": [
    "200",
    "202",
    "204"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/deallocate": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/deallocate": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/delete": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/delete": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/instanceView": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/virtualMachineScaleSets": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/skus": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osUpgradeHistory": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/poweroff": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/poweroff": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/restart": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/restart": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/start": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/start": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/redeploy": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/redeploy": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/performMaintenance": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/performMaintenance": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimage": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimage": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimageall": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimageall": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/forceRecoveryServiceFabricPlatformUpdateDomainWalk": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/convertToSinglePlacementGroup": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/setOrchestrationServiceState": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/setOrchestrationServiceState": [
    "200",
    "202"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}": [
    "200",
    "201"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/cancel": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/cancel": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osRollingUpgrade": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osRollingUpgrade": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensionRollingUpgrade": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensionRollingUpgrade": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/latest": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimage": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimage": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimageall": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimageall": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/deallocate": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/deallocate": [
    "200",
    "202"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/instanceView": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/poweroff": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/poweroff": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/restart": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/restart": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/start": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/start": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/redeploy": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/redeploy": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/retrieveBootDiagnosticsData": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/performMaintenance": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/performMaintenance": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/simulateEviction": [
    "204"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/runCommand": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/runCommand": [
    "200",
    "202"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/virtualMachines": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/capture": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/capture": [
    "200",
    "202"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/instanceView": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/convertToManagedDisks": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/convertToManagedDisks": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/deallocate": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/deallocate": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/generalize": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/virtualMachines": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/vmSizes": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reapply": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reapply": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/restart": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/restart": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/start": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/start": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/redeploy": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/redeploy": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reimage": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reimage": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/retrieveBootDiagnosticsData": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/performMaintenance": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/performMaintenance": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/simulateEviction": [
    "204"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/assessPatches": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/assessPatches": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/installPatches": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/installPatches": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommand": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommand": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/vmimages": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions/{version}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}": [
    "200",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/availabilitySets": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/vmSizes": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}": [
    "200",
    "201"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/proximityPlacementGroups": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}": [
    "200",
    "201"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}": [
    "200",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/hostGroups": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}/restart": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}/restart": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/sshPublicKeys": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}": [
    "200",
    "201"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}": [
    "200",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}/generateKeyPair": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}": [
    "200",
    "201"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/images": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}": [
    "200",
    "201"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/restorePointCollections": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}": [
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}": [
    "200",
    "202",
    "204"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}": [
    "200",
    "201"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}": [
    "200",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/capacityReservationGroups": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}": [
    "200",
    "202"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getRequestRateByInterval": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getRequestRateByInterval": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getThrottledRequests": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getThrottledRequests": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands/{commandId}": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}": [
    "200",
    "202",
    "204"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}": [
    "200",
    "202"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/disks": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/beginGetAccess": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/beginGetAccess": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/endGetAccess": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/endGetAccess": [
    "200",
    "202"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}": [
    "200",
    "202",
    "204"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}": [
    "200",
    "202"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/diskAccesses": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateLinkResources": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}": [
    "200",
    "202",
    "204"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}": [
    "200",
    "202",
    "204"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}": [
    "200",
    "202"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/diskEncryptionSets": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}/associatedResources": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/beginGetAccess": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/beginGetAccess": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/endGetAccess": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/endGetAccess": [
    "200",
    "202"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}": [
    "200",
    "202",
    "204"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}": [
    "200",
    "202"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/snapshots": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/beginGetAccess": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/beginGetAccess": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/endGetAccess": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/endGetAccess": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/skus": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}": [
    "200",
    "201",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}": [
    "200",
    "202",
    "204"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/galleries": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}": [
    "200",
    "201",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}": [
    "200",
    "202",
    "204"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}": [
    "200",
    "201",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}": [
    "200",
    "202",
    "204"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}": [
    "200",
    "201",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}": [
    "200",
    "202",
    "204"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}": [
    "200",
    "201",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}": [
    "200",
    "202",
    "204"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/share": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/share": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}/versions": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}/versions/{galleryImageVersionName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images/{galleryImageName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images/{galleryImageName}/versions": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/instanceView": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/restart": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/restart": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/reimage": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/reimage": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/rebuild": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/rebuild": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/remoteDesktopFile": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roles/{roleName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roles": [
    "200"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}": [
    "200",
    "201"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}": [
    "200"
  ],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}": [
    "200"
  ],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}": [
    "200",
    "202",
    "204"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/instanceView": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/cloudServices": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices": [
    "200"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/start": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/start": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/poweroff": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/poweroff": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/restart": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/restart": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/reimage": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/reimage": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/rebuild": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/rebuild": [
    "200",
    "202"
  ],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/delete": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/delete": [
    "200",
    "202"
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/updateDomains/{updateDomain}": [
    "200",
    "202"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/updateDomains/{updateDomain}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/updateDomains": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsVersions/{osVersionName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsVersions": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsFamilies/{osFamilyName}": [
    "200"
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsFamilies": [
    "200"
  ]
};

export function isUnexpected(
  response: OperationsList200Response | OperationsListdefaultResponse
): response is OperationsListdefaultResponse;
export function isUnexpected(
  response: UsageList200Response | UsageListdefaultResponse
): response is UsageListdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineSizesList200Response
    | VirtualMachineSizesListdefaultResponse
): response is VirtualMachineSizesListdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsListByLocation200Response
    | VirtualMachineScaleSetsListByLocationdefaultResponse
): response is VirtualMachineScaleSetsListByLocationdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsCreateOrUpdate200Response
    | VirtualMachineScaleSetsCreateOrUpdate201Response
    | VirtualMachineScaleSetsCreateOrUpdatedefaultResponse
): response is VirtualMachineScaleSetsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsUpdate200Response
    | VirtualMachineScaleSetsUpdatedefaultResponse
): response is VirtualMachineScaleSetsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsDelete200Response
    | VirtualMachineScaleSetsDelete202Response
    | VirtualMachineScaleSetsDelete204Response
    | VirtualMachineScaleSetsDeletedefaultResponse
): response is VirtualMachineScaleSetsDeletedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsGet200Response
    | VirtualMachineScaleSetsGetdefaultResponse
): response is VirtualMachineScaleSetsGetdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsDeallocate200Response
    | VirtualMachineScaleSetsDeallocate202Response
    | VirtualMachineScaleSetsDeallocatedefaultResponse
): response is VirtualMachineScaleSetsDeallocatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsDeleteInstances200Response
    | VirtualMachineScaleSetsDeleteInstances202Response
    | VirtualMachineScaleSetsDeleteInstancesdefaultResponse
): response is VirtualMachineScaleSetsDeleteInstancesdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsGetInstanceView200Response
    | VirtualMachineScaleSetsGetInstanceViewdefaultResponse
): response is VirtualMachineScaleSetsGetInstanceViewdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsList200Response
    | VirtualMachineScaleSetsListdefaultResponse
): response is VirtualMachineScaleSetsListdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsListAll200Response
    | VirtualMachineScaleSetsListAlldefaultResponse
): response is VirtualMachineScaleSetsListAlldefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsListSkus200Response
    | VirtualMachineScaleSetsListSkusdefaultResponse
): response is VirtualMachineScaleSetsListSkusdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsGetOSUpgradeHistory200Response
    | VirtualMachineScaleSetsGetOSUpgradeHistorydefaultResponse
): response is VirtualMachineScaleSetsGetOSUpgradeHistorydefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsPowerOff200Response
    | VirtualMachineScaleSetsPowerOff202Response
    | VirtualMachineScaleSetsPowerOffdefaultResponse
): response is VirtualMachineScaleSetsPowerOffdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsRestart200Response
    | VirtualMachineScaleSetsRestart202Response
    | VirtualMachineScaleSetsRestartdefaultResponse
): response is VirtualMachineScaleSetsRestartdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsStart200Response
    | VirtualMachineScaleSetsStart202Response
    | VirtualMachineScaleSetsStartdefaultResponse
): response is VirtualMachineScaleSetsStartdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsRedeploy200Response
    | VirtualMachineScaleSetsRedeploy202Response
    | VirtualMachineScaleSetsRedeploydefaultResponse
): response is VirtualMachineScaleSetsRedeploydefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsPerformMaintenance200Response
    | VirtualMachineScaleSetsPerformMaintenance202Response
    | VirtualMachineScaleSetsPerformMaintenancedefaultResponse
): response is VirtualMachineScaleSetsPerformMaintenancedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsUpdateInstances200Response
    | VirtualMachineScaleSetsUpdateInstances202Response
    | VirtualMachineScaleSetsUpdateInstancesdefaultResponse
): response is VirtualMachineScaleSetsUpdateInstancesdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsReimage200Response
    | VirtualMachineScaleSetsReimage202Response
    | VirtualMachineScaleSetsReimagedefaultResponse
): response is VirtualMachineScaleSetsReimagedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsReimageAll200Response
    | VirtualMachineScaleSetsReimageAll202Response
    | VirtualMachineScaleSetsReimageAlldefaultResponse
): response is VirtualMachineScaleSetsReimageAlldefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalk200Response
    | VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkdefaultResponse
): response is VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsConvertToSinglePlacementGroup200Response
    | VirtualMachineScaleSetsConvertToSinglePlacementGroupdefaultResponse
): response is VirtualMachineScaleSetsConvertToSinglePlacementGroupdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsSetOrchestrationServiceState200Response
    | VirtualMachineScaleSetsSetOrchestrationServiceState202Response
    | VirtualMachineScaleSetsSetOrchestrationServiceStatedefaultResponse
): response is VirtualMachineScaleSetsSetOrchestrationServiceStatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetExtensionsCreateOrUpdate200Response
    | VirtualMachineScaleSetExtensionsCreateOrUpdate201Response
    | VirtualMachineScaleSetExtensionsCreateOrUpdatedefaultResponse
): response is VirtualMachineScaleSetExtensionsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetExtensionsUpdate200Response
    | VirtualMachineScaleSetExtensionsUpdate201Response
    | VirtualMachineScaleSetExtensionsUpdatedefaultResponse
): response is VirtualMachineScaleSetExtensionsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetExtensionsDelete200Response
    | VirtualMachineScaleSetExtensionsDelete202Response
    | VirtualMachineScaleSetExtensionsDelete204Response
    | VirtualMachineScaleSetExtensionsDeletedefaultResponse
): response is VirtualMachineScaleSetExtensionsDeletedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetExtensionsGet200Response
    | VirtualMachineScaleSetExtensionsGetdefaultResponse
): response is VirtualMachineScaleSetExtensionsGetdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetExtensionsList200Response
    | VirtualMachineScaleSetExtensionsListdefaultResponse
): response is VirtualMachineScaleSetExtensionsListdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetRollingUpgradesCancel200Response
    | VirtualMachineScaleSetRollingUpgradesCancel202Response
    | VirtualMachineScaleSetRollingUpgradesCanceldefaultResponse
): response is VirtualMachineScaleSetRollingUpgradesCanceldefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgrade200Response
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgrade202Response
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgradedefaultResponse
): response is VirtualMachineScaleSetRollingUpgradesStartOSUpgradedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade200Response
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade202Response
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradedefaultResponse
): response is VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetRollingUpgradesGetLatest200Response
    | VirtualMachineScaleSetRollingUpgradesGetLatestdefaultResponse
): response is VirtualMachineScaleSetRollingUpgradesGetLatestdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdate200Response
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdate201Response
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdatedefaultResponse
): response is VirtualMachineScaleSetVMExtensionsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMExtensionsUpdate200Response
    | VirtualMachineScaleSetVMExtensionsUpdatedefaultResponse
): response is VirtualMachineScaleSetVMExtensionsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMExtensionsDelete200Response
    | VirtualMachineScaleSetVMExtensionsDelete202Response
    | VirtualMachineScaleSetVMExtensionsDelete204Response
    | VirtualMachineScaleSetVMExtensionsDeletedefaultResponse
): response is VirtualMachineScaleSetVMExtensionsDeletedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMExtensionsGet200Response
    | VirtualMachineScaleSetVMExtensionsGetdefaultResponse
): response is VirtualMachineScaleSetVMExtensionsGetdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMExtensionsList200Response
    | VirtualMachineScaleSetVMExtensionsListdefaultResponse
): response is VirtualMachineScaleSetVMExtensionsListdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsReimage200Response
    | VirtualMachineScaleSetVMsReimage202Response
    | VirtualMachineScaleSetVMsReimagedefaultResponse
): response is VirtualMachineScaleSetVMsReimagedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsReimageAll200Response
    | VirtualMachineScaleSetVMsReimageAll202Response
    | VirtualMachineScaleSetVMsReimageAlldefaultResponse
): response is VirtualMachineScaleSetVMsReimageAlldefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsDeallocate200Response
    | VirtualMachineScaleSetVMsDeallocate202Response
    | VirtualMachineScaleSetVMsDeallocatedefaultResponse
): response is VirtualMachineScaleSetVMsDeallocatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsUpdate200Response
    | VirtualMachineScaleSetVMsUpdate202Response
    | VirtualMachineScaleSetVMsUpdatedefaultResponse
): response is VirtualMachineScaleSetVMsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsDelete200Response
    | VirtualMachineScaleSetVMsDelete202Response
    | VirtualMachineScaleSetVMsDelete204Response
    | VirtualMachineScaleSetVMsDeletedefaultResponse
): response is VirtualMachineScaleSetVMsDeletedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsGet200Response
    | VirtualMachineScaleSetVMsGetdefaultResponse
): response is VirtualMachineScaleSetVMsGetdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsGetInstanceView200Response
    | VirtualMachineScaleSetVMsGetInstanceViewdefaultResponse
): response is VirtualMachineScaleSetVMsGetInstanceViewdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsList200Response
    | VirtualMachineScaleSetVMsListdefaultResponse
): response is VirtualMachineScaleSetVMsListdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsPowerOff200Response
    | VirtualMachineScaleSetVMsPowerOff202Response
    | VirtualMachineScaleSetVMsPowerOffdefaultResponse
): response is VirtualMachineScaleSetVMsPowerOffdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsRestart200Response
    | VirtualMachineScaleSetVMsRestart202Response
    | VirtualMachineScaleSetVMsRestartdefaultResponse
): response is VirtualMachineScaleSetVMsRestartdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsStart200Response
    | VirtualMachineScaleSetVMsStart202Response
    | VirtualMachineScaleSetVMsStartdefaultResponse
): response is VirtualMachineScaleSetVMsStartdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsRedeploy200Response
    | VirtualMachineScaleSetVMsRedeploy202Response
    | VirtualMachineScaleSetVMsRedeploydefaultResponse
): response is VirtualMachineScaleSetVMsRedeploydefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsRetrieveBootDiagnosticsData200Response
    | VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDatadefaultResponse
): response is VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDatadefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsPerformMaintenance200Response
    | VirtualMachineScaleSetVMsPerformMaintenance202Response
    | VirtualMachineScaleSetVMsPerformMaintenancedefaultResponse
): response is VirtualMachineScaleSetVMsPerformMaintenancedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsSimulateEviction204Response
    | VirtualMachineScaleSetVMsSimulateEvictiondefaultResponse
): response is VirtualMachineScaleSetVMsSimulateEvictiondefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionsCreateOrUpdate200Response
    | VirtualMachineExtensionsCreateOrUpdate201Response
    | VirtualMachineExtensionsCreateOrUpdatedefaultResponse
): response is VirtualMachineExtensionsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionsUpdate200Response
    | VirtualMachineExtensionsUpdatedefaultResponse
): response is VirtualMachineExtensionsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionsDelete200Response
    | VirtualMachineExtensionsDelete202Response
    | VirtualMachineExtensionsDelete204Response
    | VirtualMachineExtensionsDeletedefaultResponse
): response is VirtualMachineExtensionsDeletedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionsGet200Response
    | VirtualMachineExtensionsGetdefaultResponse
): response is VirtualMachineExtensionsGetdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionsList200Response
    | VirtualMachineExtensionsListdefaultResponse
): response is VirtualMachineExtensionsListdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesListByLocation200Response
    | VirtualMachinesListByLocationdefaultResponse
): response is VirtualMachinesListByLocationdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesCapture200Response
    | VirtualMachinesCapture202Response
    | VirtualMachinesCapturedefaultResponse
): response is VirtualMachinesCapturedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesCreateOrUpdate200Response
    | VirtualMachinesCreateOrUpdate201Response
    | VirtualMachinesCreateOrUpdatedefaultResponse
): response is VirtualMachinesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesUpdate200Response
    | VirtualMachinesUpdatedefaultResponse
): response is VirtualMachinesUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesDelete200Response
    | VirtualMachinesDelete202Response
    | VirtualMachinesDelete204Response
    | VirtualMachinesDeletedefaultResponse
): response is VirtualMachinesDeletedefaultResponse;
export function isUnexpected(
  response: VirtualMachinesGet200Response | VirtualMachinesGetdefaultResponse
): response is VirtualMachinesGetdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesInstanceView200Response
    | VirtualMachinesInstanceViewdefaultResponse
): response is VirtualMachinesInstanceViewdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesConvertToManagedDisks200Response
    | VirtualMachinesConvertToManagedDisks202Response
    | VirtualMachinesConvertToManagedDisksdefaultResponse
): response is VirtualMachinesConvertToManagedDisksdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesDeallocate200Response
    | VirtualMachinesDeallocate202Response
    | VirtualMachinesDeallocatedefaultResponse
): response is VirtualMachinesDeallocatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesGeneralize200Response
    | VirtualMachinesGeneralizedefaultResponse
): response is VirtualMachinesGeneralizedefaultResponse;
export function isUnexpected(
  response: VirtualMachinesList200Response | VirtualMachinesListdefaultResponse
): response is VirtualMachinesListdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesListAll200Response
    | VirtualMachinesListAlldefaultResponse
): response is VirtualMachinesListAlldefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesListAvailableSizes200Response
    | VirtualMachinesListAvailableSizesdefaultResponse
): response is VirtualMachinesListAvailableSizesdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesPowerOff200Response
    | VirtualMachinesPowerOff202Response
    | VirtualMachinesPowerOffdefaultResponse
): response is VirtualMachinesPowerOffdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesReapply200Response
    | VirtualMachinesReapply202Response
    | VirtualMachinesReapplydefaultResponse
): response is VirtualMachinesReapplydefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesRestart200Response
    | VirtualMachinesRestart202Response
    | VirtualMachinesRestartdefaultResponse
): response is VirtualMachinesRestartdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesStart200Response
    | VirtualMachinesStart202Response
    | VirtualMachinesStartdefaultResponse
): response is VirtualMachinesStartdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesRedeploy200Response
    | VirtualMachinesRedeploy202Response
    | VirtualMachinesRedeploydefaultResponse
): response is VirtualMachinesRedeploydefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesReimage200Response
    | VirtualMachinesReimage202Response
    | VirtualMachinesReimagedefaultResponse
): response is VirtualMachinesReimagedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesRetrieveBootDiagnosticsData200Response
    | VirtualMachinesRetrieveBootDiagnosticsDatadefaultResponse
): response is VirtualMachinesRetrieveBootDiagnosticsDatadefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesPerformMaintenance200Response
    | VirtualMachinesPerformMaintenance202Response
    | VirtualMachinesPerformMaintenancedefaultResponse
): response is VirtualMachinesPerformMaintenancedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesSimulateEviction204Response
    | VirtualMachinesSimulateEvictiondefaultResponse
): response is VirtualMachinesSimulateEvictiondefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesAssessPatches200Response
    | VirtualMachinesAssessPatches202Response
    | VirtualMachinesAssessPatchesdefaultResponse
): response is VirtualMachinesAssessPatchesdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesInstallPatches200Response
    | VirtualMachinesInstallPatches202Response
    | VirtualMachinesInstallPatchesdefaultResponse
): response is VirtualMachinesInstallPatchesdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesGet200Response
    | VirtualMachineImagesGetdefaultResponse
): response is VirtualMachineImagesGetdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesList200Response
    | VirtualMachineImagesListdefaultResponse
): response is VirtualMachineImagesListdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesListOffers200Response
    | VirtualMachineImagesListOffersdefaultResponse
): response is VirtualMachineImagesListOffersdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesListPublishers200Response
    | VirtualMachineImagesListPublishersdefaultResponse
): response is VirtualMachineImagesListPublishersdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesListSkus200Response
    | VirtualMachineImagesListSkusdefaultResponse
): response is VirtualMachineImagesListSkusdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesListByEdgeZone200Response
    | VirtualMachineImagesListByEdgeZonedefaultResponse
): response is VirtualMachineImagesListByEdgeZonedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesEdgeZoneGet200Response
    | VirtualMachineImagesEdgeZoneGetdefaultResponse
): response is VirtualMachineImagesEdgeZoneGetdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesEdgeZoneList200Response
    | VirtualMachineImagesEdgeZoneListdefaultResponse
): response is VirtualMachineImagesEdgeZoneListdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesEdgeZoneListOffers200Response
    | VirtualMachineImagesEdgeZoneListOffersdefaultResponse
): response is VirtualMachineImagesEdgeZoneListOffersdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesEdgeZoneListPublishers200Response
    | VirtualMachineImagesEdgeZoneListPublishersdefaultResponse
): response is VirtualMachineImagesEdgeZoneListPublishersdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesEdgeZoneListSkus200Response
    | VirtualMachineImagesEdgeZoneListSkusdefaultResponse
): response is VirtualMachineImagesEdgeZoneListSkusdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionImagesGet200Response
    | VirtualMachineExtensionImagesGetdefaultResponse
): response is VirtualMachineExtensionImagesGetdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionImagesListTypes200Response
    | VirtualMachineExtensionImagesListTypesdefaultResponse
): response is VirtualMachineExtensionImagesListTypesdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionImagesListVersions200Response
    | VirtualMachineExtensionImagesListVersionsdefaultResponse
): response is VirtualMachineExtensionImagesListVersionsdefaultResponse;
export function isUnexpected(
  response:
    | AvailabilitySetsCreateOrUpdate200Response
    | AvailabilitySetsCreateOrUpdatedefaultResponse
): response is AvailabilitySetsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | AvailabilitySetsUpdate200Response
    | AvailabilitySetsUpdatedefaultResponse
): response is AvailabilitySetsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | AvailabilitySetsDelete200Response
    | AvailabilitySetsDelete204Response
    | AvailabilitySetsDeletedefaultResponse
): response is AvailabilitySetsDeletedefaultResponse;
export function isUnexpected(
  response: AvailabilitySetsGet200Response | AvailabilitySetsGetdefaultResponse
): response is AvailabilitySetsGetdefaultResponse;
export function isUnexpected(
  response:
    | AvailabilitySetsListBySubscription200Response
    | AvailabilitySetsListBySubscriptiondefaultResponse
): response is AvailabilitySetsListBySubscriptiondefaultResponse;
export function isUnexpected(
  response:
    | AvailabilitySetsList200Response
    | AvailabilitySetsListdefaultResponse
): response is AvailabilitySetsListdefaultResponse;
export function isUnexpected(
  response:
    | AvailabilitySetsListAvailableSizes200Response
    | AvailabilitySetsListAvailableSizesdefaultResponse
): response is AvailabilitySetsListAvailableSizesdefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsCreateOrUpdate200Response
    | ProximityPlacementGroupsCreateOrUpdate201Response
    | ProximityPlacementGroupsCreateOrUpdatedefaultResponse
): response is ProximityPlacementGroupsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsUpdate200Response
    | ProximityPlacementGroupsUpdatedefaultResponse
): response is ProximityPlacementGroupsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsDelete200Response
    | ProximityPlacementGroupsDeletedefaultResponse
): response is ProximityPlacementGroupsDeletedefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsGet200Response
    | ProximityPlacementGroupsGetdefaultResponse
): response is ProximityPlacementGroupsGetdefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsListBySubscription200Response
    | ProximityPlacementGroupsListBySubscriptiondefaultResponse
): response is ProximityPlacementGroupsListBySubscriptiondefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsListByResourceGroup200Response
    | ProximityPlacementGroupsListByResourceGroupdefaultResponse
): response is ProximityPlacementGroupsListByResourceGroupdefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostGroupsCreateOrUpdate200Response
    | DedicatedHostGroupsCreateOrUpdate201Response
    | DedicatedHostGroupsCreateOrUpdatedefaultResponse
): response is DedicatedHostGroupsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostGroupsUpdate200Response
    | DedicatedHostGroupsUpdatedefaultResponse
): response is DedicatedHostGroupsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostGroupsDelete200Response
    | DedicatedHostGroupsDelete204Response
    | DedicatedHostGroupsDeletedefaultResponse
): response is DedicatedHostGroupsDeletedefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostGroupsGet200Response
    | DedicatedHostGroupsGetdefaultResponse
): response is DedicatedHostGroupsGetdefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostGroupsListByResourceGroup200Response
    | DedicatedHostGroupsListByResourceGroupdefaultResponse
): response is DedicatedHostGroupsListByResourceGroupdefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostGroupsListBySubscription200Response
    | DedicatedHostGroupsListBySubscriptiondefaultResponse
): response is DedicatedHostGroupsListBySubscriptiondefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostsCreateOrUpdate200Response
    | DedicatedHostsCreateOrUpdate201Response
    | DedicatedHostsCreateOrUpdatedefaultResponse
): response is DedicatedHostsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostsUpdate200Response
    | DedicatedHostsUpdatedefaultResponse
): response is DedicatedHostsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostsDelete200Response
    | DedicatedHostsDelete202Response
    | DedicatedHostsDelete204Response
    | DedicatedHostsDeletedefaultResponse
): response is DedicatedHostsDeletedefaultResponse;
export function isUnexpected(
  response: DedicatedHostsGet200Response | DedicatedHostsGetdefaultResponse
): response is DedicatedHostsGetdefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostsListByHostGroup200Response
    | DedicatedHostsListByHostGroupdefaultResponse
): response is DedicatedHostsListByHostGroupdefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostsRestart200Response
    | DedicatedHostsRestartdefaultResponse
): response is DedicatedHostsRestartdefaultResponse;
export function isUnexpected(
  response:
    | SshPublicKeysListBySubscription200Response
    | SshPublicKeysListBySubscriptiondefaultResponse
): response is SshPublicKeysListBySubscriptiondefaultResponse;
export function isUnexpected(
  response:
    | SshPublicKeysListByResourceGroup200Response
    | SshPublicKeysListByResourceGroupdefaultResponse
): response is SshPublicKeysListByResourceGroupdefaultResponse;
export function isUnexpected(
  response:
    | SshPublicKeysCreate200Response
    | SshPublicKeysCreate201Response
    | SshPublicKeysCreatedefaultResponse
): response is SshPublicKeysCreatedefaultResponse;
export function isUnexpected(
  response: SshPublicKeysUpdate200Response | SshPublicKeysUpdatedefaultResponse
): response is SshPublicKeysUpdatedefaultResponse;
export function isUnexpected(
  response:
    | SshPublicKeysDelete200Response
    | SshPublicKeysDelete204Response
    | SshPublicKeysDeletedefaultResponse
): response is SshPublicKeysDeletedefaultResponse;
export function isUnexpected(
  response: SshPublicKeysGet200Response | SshPublicKeysGetdefaultResponse
): response is SshPublicKeysGetdefaultResponse;
export function isUnexpected(
  response:
    | SshPublicKeysGenerateKeyPair200Response
    | SshPublicKeysGenerateKeyPairdefaultResponse
): response is SshPublicKeysGenerateKeyPairdefaultResponse;
export function isUnexpected(
  response:
    | ImagesCreateOrUpdate200Response
    | ImagesCreateOrUpdate201Response
    | ImagesCreateOrUpdatedefaultResponse
): response is ImagesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ImagesUpdate200Response
    | ImagesUpdate201Response
    | ImagesUpdatedefaultResponse
): response is ImagesUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ImagesDelete200Response
    | ImagesDelete202Response
    | ImagesDelete204Response
    | ImagesDeletedefaultResponse
): response is ImagesDeletedefaultResponse;
export function isUnexpected(
  response: ImagesGet200Response | ImagesGetdefaultResponse
): response is ImagesGetdefaultResponse;
export function isUnexpected(
  response:
    | ImagesListByResourceGroup200Response
    | ImagesListByResourceGroupdefaultResponse
): response is ImagesListByResourceGroupdefaultResponse;
export function isUnexpected(
  response: ImagesList200Response | ImagesListdefaultResponse
): response is ImagesListdefaultResponse;
export function isUnexpected(
  response:
    | RestorePointCollectionsCreateOrUpdate200Response
    | RestorePointCollectionsCreateOrUpdate201Response
    | RestorePointCollectionsCreateOrUpdatedefaultResponse
): response is RestorePointCollectionsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | RestorePointCollectionsUpdate200Response
    | RestorePointCollectionsUpdatedefaultResponse
): response is RestorePointCollectionsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | RestorePointCollectionsDelete200Response
    | RestorePointCollectionsDelete202Response
    | RestorePointCollectionsDelete204Response
    | RestorePointCollectionsDeletedefaultResponse
): response is RestorePointCollectionsDeletedefaultResponse;
export function isUnexpected(
  response:
    | RestorePointCollectionsGet200Response
    | RestorePointCollectionsGetdefaultResponse
): response is RestorePointCollectionsGetdefaultResponse;
export function isUnexpected(
  response:
    | RestorePointCollectionsList200Response
    | RestorePointCollectionsListdefaultResponse
): response is RestorePointCollectionsListdefaultResponse;
export function isUnexpected(
  response:
    | RestorePointCollectionsListAll200Response
    | RestorePointCollectionsListAlldefaultResponse
): response is RestorePointCollectionsListAlldefaultResponse;
export function isUnexpected(
  response: RestorePointsCreate201Response | RestorePointsCreatedefaultResponse
): response is RestorePointsCreatedefaultResponse;
export function isUnexpected(
  response:
    | RestorePointsDelete200Response
    | RestorePointsDelete202Response
    | RestorePointsDelete204Response
    | RestorePointsDeletedefaultResponse
): response is RestorePointsDeletedefaultResponse;
export function isUnexpected(
  response: RestorePointsGet200Response | RestorePointsGetdefaultResponse
): response is RestorePointsGetdefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsCreateOrUpdate200Response
    | CapacityReservationGroupsCreateOrUpdate201Response
    | CapacityReservationGroupsCreateOrUpdatedefaultResponse
): response is CapacityReservationGroupsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsUpdate200Response
    | CapacityReservationGroupsUpdatedefaultResponse
): response is CapacityReservationGroupsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsDelete200Response
    | CapacityReservationGroupsDelete204Response
    | CapacityReservationGroupsDeletedefaultResponse
): response is CapacityReservationGroupsDeletedefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsGet200Response
    | CapacityReservationGroupsGetdefaultResponse
): response is CapacityReservationGroupsGetdefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsListByResourceGroup200Response
    | CapacityReservationGroupsListByResourceGroupdefaultResponse
): response is CapacityReservationGroupsListByResourceGroupdefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsListBySubscription200Response
    | CapacityReservationGroupsListBySubscriptiondefaultResponse
): response is CapacityReservationGroupsListBySubscriptiondefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationsCreateOrUpdate200Response
    | CapacityReservationsCreateOrUpdate201Response
    | CapacityReservationsCreateOrUpdatedefaultResponse
): response is CapacityReservationsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationsUpdate200Response
    | CapacityReservationsUpdate202Response
    | CapacityReservationsUpdatedefaultResponse
): response is CapacityReservationsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationsDelete200Response
    | CapacityReservationsDelete202Response
    | CapacityReservationsDelete204Response
    | CapacityReservationsDeletedefaultResponse
): response is CapacityReservationsDeletedefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationsGet200Response
    | CapacityReservationsGetdefaultResponse
): response is CapacityReservationsGetdefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationsListByCapacityReservationGroup200Response
    | CapacityReservationsListByCapacityReservationGroupdefaultResponse
): response is CapacityReservationsListByCapacityReservationGroupdefaultResponse;
export function isUnexpected(
  response:
    | LogAnalyticsExportRequestRateByInterval200Response
    | LogAnalyticsExportRequestRateByInterval202Response
    | LogAnalyticsExportRequestRateByIntervaldefaultResponse
): response is LogAnalyticsExportRequestRateByIntervaldefaultResponse;
export function isUnexpected(
  response:
    | LogAnalyticsExportThrottledRequests200Response
    | LogAnalyticsExportThrottledRequests202Response
    | LogAnalyticsExportThrottledRequestsdefaultResponse
): response is LogAnalyticsExportThrottledRequestsdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineRunCommandsCreateOrUpdate200Response
    | VirtualMachineRunCommandsCreateOrUpdate201Response
    | VirtualMachineRunCommandsCreateOrUpdatedefaultResponse
): response is VirtualMachineRunCommandsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineRunCommandsUpdate200Response
    | VirtualMachineRunCommandsUpdatedefaultResponse
): response is VirtualMachineRunCommandsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineRunCommandsDelete200Response
    | VirtualMachineRunCommandsDelete202Response
    | VirtualMachineRunCommandsDelete204Response
    | VirtualMachineRunCommandsDeletedefaultResponse
): response is VirtualMachineRunCommandsDeletedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineRunCommandsGetByVirtualMachine200Response
    | VirtualMachineRunCommandsGetByVirtualMachinedefaultResponse
): response is VirtualMachineRunCommandsGetByVirtualMachinedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineRunCommandsListByVirtualMachine200Response
    | VirtualMachineRunCommandsListByVirtualMachinedefaultResponse
): response is VirtualMachineRunCommandsListByVirtualMachinedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdate200Response
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdate201Response
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdatedefaultResponse
): response is VirtualMachineScaleSetVMRunCommandsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMRunCommandsUpdate200Response
    | VirtualMachineScaleSetVMRunCommandsUpdatedefaultResponse
): response is VirtualMachineScaleSetVMRunCommandsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMRunCommandsDelete200Response
    | VirtualMachineScaleSetVMRunCommandsDelete202Response
    | VirtualMachineScaleSetVMRunCommandsDelete204Response
    | VirtualMachineScaleSetVMRunCommandsDeletedefaultResponse
): response is VirtualMachineScaleSetVMRunCommandsDeletedefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMRunCommandsGet200Response
    | VirtualMachineScaleSetVMRunCommandsGetdefaultResponse
): response is VirtualMachineScaleSetVMRunCommandsGetdefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMRunCommandsList200Response
    | VirtualMachineScaleSetVMRunCommandsListdefaultResponse
): response is VirtualMachineScaleSetVMRunCommandsListdefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesCreateOrUpdate200Response
    | DiskAccessesCreateOrUpdate202Response
    | DiskAccessesCreateOrUpdatedefaultResponse
): response is DiskAccessesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesUpdate200Response
    | DiskAccessesUpdate202Response
    | DiskAccessesUpdatedefaultResponse
): response is DiskAccessesUpdatedefaultResponse;
export function isUnexpected(
  response: DiskAccessesGet200Response | DiskAccessesGetdefaultResponse
): response is DiskAccessesGetdefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesDelete200Response
    | DiskAccessesDelete202Response
    | DiskAccessesDelete204Response
    | DiskAccessesDeletedefaultResponse
): response is DiskAccessesDeletedefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesListByResourceGroup200Response
    | DiskAccessesListByResourceGroupdefaultResponse
): response is DiskAccessesListByResourceGroupdefaultResponse;
export function isUnexpected(
  response: DiskAccessesList200Response | DiskAccessesListdefaultResponse
): response is DiskAccessesListdefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesUpdateAPrivateEndpointConnection200Response
    | DiskAccessesUpdateAPrivateEndpointConnection202Response
    | DiskAccessesUpdateAPrivateEndpointConnectiondefaultResponse
): response is DiskAccessesUpdateAPrivateEndpointConnectiondefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesGetAPrivateEndpointConnection200Response
    | DiskAccessesGetAPrivateEndpointConnectiondefaultResponse
): response is DiskAccessesGetAPrivateEndpointConnectiondefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesDeleteAPrivateEndpointConnection200Response
    | DiskAccessesDeleteAPrivateEndpointConnection202Response
    | DiskAccessesDeleteAPrivateEndpointConnection204Response
    | DiskAccessesDeleteAPrivateEndpointConnectiondefaultResponse
): response is DiskAccessesDeleteAPrivateEndpointConnectiondefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesListPrivateEndpointConnections200Response
    | DiskAccessesListPrivateEndpointConnectionsdefaultResponse
): response is DiskAccessesListPrivateEndpointConnectionsdefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsCreateOrUpdate200Response
    | DiskEncryptionSetsCreateOrUpdate202Response
    | DiskEncryptionSetsCreateOrUpdatedefaultResponse
): response is DiskEncryptionSetsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsUpdate200Response
    | DiskEncryptionSetsUpdate202Response
    | DiskEncryptionSetsUpdatedefaultResponse
): response is DiskEncryptionSetsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsGet200Response
    | DiskEncryptionSetsGetdefaultResponse
): response is DiskEncryptionSetsGetdefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsDelete200Response
    | DiskEncryptionSetsDelete202Response
    | DiskEncryptionSetsDelete204Response
    | DiskEncryptionSetsDeletedefaultResponse
): response is DiskEncryptionSetsDeletedefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsListByResourceGroup200Response
    | DiskEncryptionSetsListByResourceGroupdefaultResponse
): response is DiskEncryptionSetsListByResourceGroupdefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsList200Response
    | DiskEncryptionSetsListdefaultResponse
): response is DiskEncryptionSetsListdefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsListAssociatedResources200Response
    | DiskEncryptionSetsListAssociatedResourcesdefaultResponse
): response is DiskEncryptionSetsListAssociatedResourcesdefaultResponse;
export function isUnexpected(
  response: DiskRestorePointGet200Response | DiskRestorePointGetdefaultResponse
): response is DiskRestorePointGetdefaultResponse;
export function isUnexpected(
  response:
    | DiskRestorePointListByRestorePoint200Response
    | DiskRestorePointListByRestorePointdefaultResponse
): response is DiskRestorePointListByRestorePointdefaultResponse;
export function isUnexpected(
  response:
    | DiskRestorePointGrantAccess200Response
    | DiskRestorePointGrantAccess202Response
    | DiskRestorePointGrantAccessdefaultResponse
): response is DiskRestorePointGrantAccessdefaultResponse;
export function isUnexpected(
  response:
    | DiskRestorePointRevokeAccess200Response
    | DiskRestorePointRevokeAccess202Response
    | DiskRestorePointRevokeAccessdefaultResponse
): response is DiskRestorePointRevokeAccessdefaultResponse;
export function isUnexpected(
  response:
    | GalleriesCreateOrUpdate200Response
    | GalleriesCreateOrUpdate201Response
    | GalleriesCreateOrUpdate202Response
    | GalleriesCreateOrUpdatedefaultResponse
): response is GalleriesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: GalleriesUpdate200Response | GalleriesUpdatedefaultResponse
): response is GalleriesUpdatedefaultResponse;
export function isUnexpected(
  response: GalleriesGet200Response | GalleriesGetdefaultResponse
): response is GalleriesGetdefaultResponse;
export function isUnexpected(
  response:
    | GalleriesDelete200Response
    | GalleriesDelete202Response
    | GalleriesDelete204Response
    | GalleriesDeletedefaultResponse
): response is GalleriesDeletedefaultResponse;
export function isUnexpected(
  response:
    | GalleriesListByResourceGroup200Response
    | GalleriesListByResourceGroupdefaultResponse
): response is GalleriesListByResourceGroupdefaultResponse;
export function isUnexpected(
  response: GalleriesList200Response | GalleriesListdefaultResponse
): response is GalleriesListdefaultResponse;
export function isUnexpected(
  response:
    | GalleryImagesCreateOrUpdate200Response
    | GalleryImagesCreateOrUpdate201Response
    | GalleryImagesCreateOrUpdate202Response
    | GalleryImagesCreateOrUpdatedefaultResponse
): response is GalleryImagesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: GalleryImagesUpdate200Response | GalleryImagesUpdatedefaultResponse
): response is GalleryImagesUpdatedefaultResponse;
export function isUnexpected(
  response: GalleryImagesGet200Response | GalleryImagesGetdefaultResponse
): response is GalleryImagesGetdefaultResponse;
export function isUnexpected(
  response:
    | GalleryImagesDelete200Response
    | GalleryImagesDelete202Response
    | GalleryImagesDelete204Response
    | GalleryImagesDeletedefaultResponse
): response is GalleryImagesDeletedefaultResponse;
export function isUnexpected(
  response:
    | GalleryImagesListByGallery200Response
    | GalleryImagesListByGallerydefaultResponse
): response is GalleryImagesListByGallerydefaultResponse;
export function isUnexpected(
  response:
    | GalleryImageVersionsCreateOrUpdate200Response
    | GalleryImageVersionsCreateOrUpdate201Response
    | GalleryImageVersionsCreateOrUpdate202Response
    | GalleryImageVersionsCreateOrUpdatedefaultResponse
): response is GalleryImageVersionsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | GalleryImageVersionsUpdate200Response
    | GalleryImageVersionsUpdatedefaultResponse
): response is GalleryImageVersionsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | GalleryImageVersionsGet200Response
    | GalleryImageVersionsGetdefaultResponse
): response is GalleryImageVersionsGetdefaultResponse;
export function isUnexpected(
  response:
    | GalleryImageVersionsDelete200Response
    | GalleryImageVersionsDelete202Response
    | GalleryImageVersionsDelete204Response
    | GalleryImageVersionsDeletedefaultResponse
): response is GalleryImageVersionsDeletedefaultResponse;
export function isUnexpected(
  response:
    | GalleryImageVersionsListByGalleryImage200Response
    | GalleryImageVersionsListByGalleryImagedefaultResponse
): response is GalleryImageVersionsListByGalleryImagedefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationsCreateOrUpdate200Response
    | GalleryApplicationsCreateOrUpdate201Response
    | GalleryApplicationsCreateOrUpdate202Response
    | GalleryApplicationsCreateOrUpdatedefaultResponse
): response is GalleryApplicationsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationsUpdate200Response
    | GalleryApplicationsUpdatedefaultResponse
): response is GalleryApplicationsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationsGet200Response
    | GalleryApplicationsGetdefaultResponse
): response is GalleryApplicationsGetdefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationsDelete200Response
    | GalleryApplicationsDelete202Response
    | GalleryApplicationsDelete204Response
    | GalleryApplicationsDeletedefaultResponse
): response is GalleryApplicationsDeletedefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationsListByGallery200Response
    | GalleryApplicationsListByGallerydefaultResponse
): response is GalleryApplicationsListByGallerydefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationVersionsCreateOrUpdate200Response
    | GalleryApplicationVersionsCreateOrUpdate201Response
    | GalleryApplicationVersionsCreateOrUpdate202Response
    | GalleryApplicationVersionsCreateOrUpdatedefaultResponse
): response is GalleryApplicationVersionsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationVersionsUpdate200Response
    | GalleryApplicationVersionsUpdatedefaultResponse
): response is GalleryApplicationVersionsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationVersionsGet200Response
    | GalleryApplicationVersionsGetdefaultResponse
): response is GalleryApplicationVersionsGetdefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationVersionsDelete200Response
    | GalleryApplicationVersionsDelete202Response
    | GalleryApplicationVersionsDelete204Response
    | GalleryApplicationVersionsDeletedefaultResponse
): response is GalleryApplicationVersionsDeletedefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationVersionsListByGalleryApplication200Response
    | GalleryApplicationVersionsListByGalleryApplicationdefaultResponse
): response is GalleryApplicationVersionsListByGalleryApplicationdefaultResponse;
export function isUnexpected(
  response:
    | GallerySharingProfileUpdate200Response
    | GallerySharingProfileUpdate202Response
    | GallerySharingProfileUpdatedefaultResponse
): response is GallerySharingProfileUpdatedefaultResponse;
export function isUnexpected(
  response: SharedGalleriesList200Response | SharedGalleriesListdefaultResponse
): response is SharedGalleriesListdefaultResponse;
export function isUnexpected(
  response: SharedGalleriesGet200Response | SharedGalleriesGetdefaultResponse
): response is SharedGalleriesGetdefaultResponse;
export function isUnexpected(
  response:
    | SharedGalleryImagesList200Response
    | SharedGalleryImagesListdefaultResponse
): response is SharedGalleryImagesListdefaultResponse;
export function isUnexpected(
  response:
    | SharedGalleryImagesGet200Response
    | SharedGalleryImagesGetdefaultResponse
): response is SharedGalleryImagesGetdefaultResponse;
export function isUnexpected(
  response:
    | SharedGalleryImageVersionsList200Response
    | SharedGalleryImageVersionsListdefaultResponse
): response is SharedGalleryImageVersionsListdefaultResponse;
export function isUnexpected(
  response:
    | SharedGalleryImageVersionsGet200Response
    | SharedGalleryImageVersionsGetdefaultResponse
): response is SharedGalleryImageVersionsGetdefaultResponse;
export function isUnexpected(
  response:
    | CommunityGalleriesGet200Response
    | CommunityGalleriesGetdefaultResponse
): response is CommunityGalleriesGetdefaultResponse;
export function isUnexpected(
  response:
    | CommunityGalleryImagesGet200Response
    | CommunityGalleryImagesGetdefaultResponse
): response is CommunityGalleryImagesGetdefaultResponse;
export function isUnexpected(
  response:
    | CommunityGalleryImagesList200Response
    | CommunityGalleryImagesListdefaultResponse
): response is CommunityGalleryImagesListdefaultResponse;
export function isUnexpected(
  response:
    | CommunityGalleryImageVersionsGet200Response
    | CommunityGalleryImageVersionsGetdefaultResponse
): response is CommunityGalleryImageVersionsGetdefaultResponse;
export function isUnexpected(
  response:
    | CommunityGalleryImageVersionsList200Response
    | CommunityGalleryImageVersionsListdefaultResponse
): response is CommunityGalleryImageVersionsListdefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesDelete200Response
    | CloudServiceRoleInstancesDelete202Response
    | CloudServiceRoleInstancesDelete204Response
    | CloudServiceRoleInstancesDeletedefaultResponse
): response is CloudServiceRoleInstancesDeletedefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesGet200Response
    | CloudServiceRoleInstancesGetdefaultResponse
): response is CloudServiceRoleInstancesGetdefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesGetInstanceView200Response
    | CloudServiceRoleInstancesGetInstanceViewdefaultResponse
): response is CloudServiceRoleInstancesGetInstanceViewdefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesList200Response
    | CloudServiceRoleInstancesListdefaultResponse
): response is CloudServiceRoleInstancesListdefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesRestart200Response
    | CloudServiceRoleInstancesRestart202Response
    | CloudServiceRoleInstancesRestartdefaultResponse
): response is CloudServiceRoleInstancesRestartdefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesReimage200Response
    | CloudServiceRoleInstancesReimage202Response
    | CloudServiceRoleInstancesReimagedefaultResponse
): response is CloudServiceRoleInstancesReimagedefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesRebuild200Response
    | CloudServiceRoleInstancesRebuild202Response
    | CloudServiceRoleInstancesRebuilddefaultResponse
): response is CloudServiceRoleInstancesRebuilddefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesGetRemoteDesktopFile200Response
    | CloudServiceRoleInstancesGetRemoteDesktopFiledefaultResponse
): response is CloudServiceRoleInstancesGetRemoteDesktopFiledefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRolesGet200Response
    | CloudServiceRolesGetdefaultResponse
): response is CloudServiceRolesGetdefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRolesList200Response
    | CloudServiceRolesListdefaultResponse
): response is CloudServiceRolesListdefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesCreateOrUpdate200Response
    | CloudServicesCreateOrUpdate201Response
    | CloudServicesCreateOrUpdatedefaultResponse
): response is CloudServicesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: CloudServicesUpdate200Response | CloudServicesUpdatedefaultResponse
): response is CloudServicesUpdatedefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesDelete200Response
    | CloudServicesDelete202Response
    | CloudServicesDelete204Response
    | CloudServicesDeletedefaultResponse
): response is CloudServicesDeletedefaultResponse;
export function isUnexpected(
  response: CloudServicesGet200Response | CloudServicesGetdefaultResponse
): response is CloudServicesGetdefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesGetInstanceView200Response
    | CloudServicesGetInstanceViewdefaultResponse
): response is CloudServicesGetInstanceViewdefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesListAll200Response
    | CloudServicesListAlldefaultResponse
): response is CloudServicesListAlldefaultResponse;
export function isUnexpected(
  response: CloudServicesList200Response | CloudServicesListdefaultResponse
): response is CloudServicesListdefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesStart200Response
    | CloudServicesStart202Response
    | CloudServicesStartdefaultResponse
): response is CloudServicesStartdefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesPowerOff200Response
    | CloudServicesPowerOff202Response
    | CloudServicesPowerOffdefaultResponse
): response is CloudServicesPowerOffdefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesRestart200Response
    | CloudServicesRestart202Response
    | CloudServicesRestartdefaultResponse
): response is CloudServicesRestartdefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesReimage200Response
    | CloudServicesReimage202Response
    | CloudServicesReimagedefaultResponse
): response is CloudServicesReimagedefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesRebuild200Response
    | CloudServicesRebuild202Response
    | CloudServicesRebuilddefaultResponse
): response is CloudServicesRebuilddefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesDeleteInstances200Response
    | CloudServicesDeleteInstances202Response
    | CloudServicesDeleteInstancesdefaultResponse
): response is CloudServicesDeleteInstancesdefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesUpdateDomainWalkUpdateDomain200Response
    | CloudServicesUpdateDomainWalkUpdateDomain202Response
    | CloudServicesUpdateDomainWalkUpdateDomaindefaultResponse
): response is CloudServicesUpdateDomainWalkUpdateDomaindefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesUpdateDomainGetUpdateDomain200Response
    | CloudServicesUpdateDomainGetUpdateDomaindefaultResponse
): response is CloudServicesUpdateDomainGetUpdateDomaindefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesUpdateDomainListUpdateDomains200Response
    | CloudServicesUpdateDomainListUpdateDomainsdefaultResponse
): response is CloudServicesUpdateDomainListUpdateDomainsdefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceOperatingSystemsGetOSVersion200Response
    | CloudServiceOperatingSystemsGetOSVersiondefaultResponse
): response is CloudServiceOperatingSystemsGetOSVersiondefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceOperatingSystemsListOSVersions200Response
    | CloudServiceOperatingSystemsListOSVersionsdefaultResponse
): response is CloudServiceOperatingSystemsListOSVersionsdefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceOperatingSystemsGetOSFamily200Response
    | CloudServiceOperatingSystemsGetOSFamilydefaultResponse
): response is CloudServiceOperatingSystemsGetOSFamilydefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceOperatingSystemsListOSFamilies200Response
    | CloudServiceOperatingSystemsListOSFamiliesdefaultResponse
): response is CloudServiceOperatingSystemsListOSFamiliesdefaultResponse;
export function isUnexpected(
  response:
    | OperationsList200Response
    | OperationsListdefaultResponse
    | UsageList200Response
    | UsageListdefaultResponse
    | VirtualMachineSizesList200Response
    | VirtualMachineSizesListdefaultResponse
    | VirtualMachineScaleSetsListByLocation200Response
    | VirtualMachineScaleSetsListByLocationdefaultResponse
    | VirtualMachineScaleSetsCreateOrUpdate200Response
    | VirtualMachineScaleSetsCreateOrUpdate201Response
    | VirtualMachineScaleSetsCreateOrUpdatedefaultResponse
    | VirtualMachineScaleSetsUpdate200Response
    | VirtualMachineScaleSetsUpdatedefaultResponse
    | VirtualMachineScaleSetsDelete200Response
    | VirtualMachineScaleSetsDelete202Response
    | VirtualMachineScaleSetsDelete204Response
    | VirtualMachineScaleSetsDeletedefaultResponse
    | VirtualMachineScaleSetsGet200Response
    | VirtualMachineScaleSetsGetdefaultResponse
    | VirtualMachineScaleSetsDeallocate200Response
    | VirtualMachineScaleSetsDeallocate202Response
    | VirtualMachineScaleSetsDeallocatedefaultResponse
    | VirtualMachineScaleSetsDeleteInstances200Response
    | VirtualMachineScaleSetsDeleteInstances202Response
    | VirtualMachineScaleSetsDeleteInstancesdefaultResponse
    | VirtualMachineScaleSetsGetInstanceView200Response
    | VirtualMachineScaleSetsGetInstanceViewdefaultResponse
    | VirtualMachineScaleSetsList200Response
    | VirtualMachineScaleSetsListdefaultResponse
    | VirtualMachineScaleSetsListAll200Response
    | VirtualMachineScaleSetsListAlldefaultResponse
    | VirtualMachineScaleSetsListSkus200Response
    | VirtualMachineScaleSetsListSkusdefaultResponse
    | VirtualMachineScaleSetsGetOSUpgradeHistory200Response
    | VirtualMachineScaleSetsGetOSUpgradeHistorydefaultResponse
    | VirtualMachineScaleSetsPowerOff200Response
    | VirtualMachineScaleSetsPowerOff202Response
    | VirtualMachineScaleSetsPowerOffdefaultResponse
    | VirtualMachineScaleSetsRestart200Response
    | VirtualMachineScaleSetsRestart202Response
    | VirtualMachineScaleSetsRestartdefaultResponse
    | VirtualMachineScaleSetsStart200Response
    | VirtualMachineScaleSetsStart202Response
    | VirtualMachineScaleSetsStartdefaultResponse
    | VirtualMachineScaleSetsRedeploy200Response
    | VirtualMachineScaleSetsRedeploy202Response
    | VirtualMachineScaleSetsRedeploydefaultResponse
    | VirtualMachineScaleSetsPerformMaintenance200Response
    | VirtualMachineScaleSetsPerformMaintenance202Response
    | VirtualMachineScaleSetsPerformMaintenancedefaultResponse
    | VirtualMachineScaleSetsUpdateInstances200Response
    | VirtualMachineScaleSetsUpdateInstances202Response
    | VirtualMachineScaleSetsUpdateInstancesdefaultResponse
    | VirtualMachineScaleSetsReimage200Response
    | VirtualMachineScaleSetsReimage202Response
    | VirtualMachineScaleSetsReimagedefaultResponse
    | VirtualMachineScaleSetsReimageAll200Response
    | VirtualMachineScaleSetsReimageAll202Response
    | VirtualMachineScaleSetsReimageAlldefaultResponse
    | VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalk200Response
    | VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkdefaultResponse
    | VirtualMachineScaleSetsConvertToSinglePlacementGroup200Response
    | VirtualMachineScaleSetsConvertToSinglePlacementGroupdefaultResponse
    | VirtualMachineScaleSetsSetOrchestrationServiceState200Response
    | VirtualMachineScaleSetsSetOrchestrationServiceState202Response
    | VirtualMachineScaleSetsSetOrchestrationServiceStatedefaultResponse
    | VirtualMachineScaleSetExtensionsCreateOrUpdate200Response
    | VirtualMachineScaleSetExtensionsCreateOrUpdate201Response
    | VirtualMachineScaleSetExtensionsCreateOrUpdatedefaultResponse
    | VirtualMachineScaleSetExtensionsUpdate200Response
    | VirtualMachineScaleSetExtensionsUpdate201Response
    | VirtualMachineScaleSetExtensionsUpdatedefaultResponse
    | VirtualMachineScaleSetExtensionsDelete200Response
    | VirtualMachineScaleSetExtensionsDelete202Response
    | VirtualMachineScaleSetExtensionsDelete204Response
    | VirtualMachineScaleSetExtensionsDeletedefaultResponse
    | VirtualMachineScaleSetExtensionsGet200Response
    | VirtualMachineScaleSetExtensionsGetdefaultResponse
    | VirtualMachineScaleSetExtensionsList200Response
    | VirtualMachineScaleSetExtensionsListdefaultResponse
    | VirtualMachineScaleSetRollingUpgradesCancel200Response
    | VirtualMachineScaleSetRollingUpgradesCancel202Response
    | VirtualMachineScaleSetRollingUpgradesCanceldefaultResponse
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgrade200Response
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgrade202Response
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgradedefaultResponse
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade200Response
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade202Response
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradedefaultResponse
    | VirtualMachineScaleSetRollingUpgradesGetLatest200Response
    | VirtualMachineScaleSetRollingUpgradesGetLatestdefaultResponse
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdate200Response
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdate201Response
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdatedefaultResponse
    | VirtualMachineScaleSetVMExtensionsUpdate200Response
    | VirtualMachineScaleSetVMExtensionsUpdatedefaultResponse
    | VirtualMachineScaleSetVMExtensionsDelete200Response
    | VirtualMachineScaleSetVMExtensionsDelete202Response
    | VirtualMachineScaleSetVMExtensionsDelete204Response
    | VirtualMachineScaleSetVMExtensionsDeletedefaultResponse
    | VirtualMachineScaleSetVMExtensionsGet200Response
    | VirtualMachineScaleSetVMExtensionsGetdefaultResponse
    | VirtualMachineScaleSetVMExtensionsList200Response
    | VirtualMachineScaleSetVMExtensionsListdefaultResponse
    | VirtualMachineScaleSetVMsReimage200Response
    | VirtualMachineScaleSetVMsReimage202Response
    | VirtualMachineScaleSetVMsReimagedefaultResponse
    | VirtualMachineScaleSetVMsReimageAll200Response
    | VirtualMachineScaleSetVMsReimageAll202Response
    | VirtualMachineScaleSetVMsReimageAlldefaultResponse
    | VirtualMachineScaleSetVMsDeallocate200Response
    | VirtualMachineScaleSetVMsDeallocate202Response
    | VirtualMachineScaleSetVMsDeallocatedefaultResponse
    | VirtualMachineScaleSetVMsUpdate200Response
    | VirtualMachineScaleSetVMsUpdate202Response
    | VirtualMachineScaleSetVMsUpdatedefaultResponse
    | VirtualMachineScaleSetVMsDelete200Response
    | VirtualMachineScaleSetVMsDelete202Response
    | VirtualMachineScaleSetVMsDelete204Response
    | VirtualMachineScaleSetVMsDeletedefaultResponse
    | VirtualMachineScaleSetVMsGet200Response
    | VirtualMachineScaleSetVMsGetdefaultResponse
    | VirtualMachineScaleSetVMsGetInstanceView200Response
    | VirtualMachineScaleSetVMsGetInstanceViewdefaultResponse
    | VirtualMachineScaleSetVMsList200Response
    | VirtualMachineScaleSetVMsListdefaultResponse
    | VirtualMachineScaleSetVMsPowerOff200Response
    | VirtualMachineScaleSetVMsPowerOff202Response
    | VirtualMachineScaleSetVMsPowerOffdefaultResponse
    | VirtualMachineScaleSetVMsRestart200Response
    | VirtualMachineScaleSetVMsRestart202Response
    | VirtualMachineScaleSetVMsRestartdefaultResponse
    | VirtualMachineScaleSetVMsStart200Response
    | VirtualMachineScaleSetVMsStart202Response
    | VirtualMachineScaleSetVMsStartdefaultResponse
    | VirtualMachineScaleSetVMsRedeploy200Response
    | VirtualMachineScaleSetVMsRedeploy202Response
    | VirtualMachineScaleSetVMsRedeploydefaultResponse
    | VirtualMachineScaleSetVMsRetrieveBootDiagnosticsData200Response
    | VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDatadefaultResponse
    | VirtualMachineScaleSetVMsPerformMaintenance200Response
    | VirtualMachineScaleSetVMsPerformMaintenance202Response
    | VirtualMachineScaleSetVMsPerformMaintenancedefaultResponse
    | VirtualMachineScaleSetVMsSimulateEviction204Response
    | VirtualMachineScaleSetVMsSimulateEvictiondefaultResponse
    | VirtualMachineExtensionsCreateOrUpdate200Response
    | VirtualMachineExtensionsCreateOrUpdate201Response
    | VirtualMachineExtensionsCreateOrUpdatedefaultResponse
    | VirtualMachineExtensionsUpdate200Response
    | VirtualMachineExtensionsUpdatedefaultResponse
    | VirtualMachineExtensionsDelete200Response
    | VirtualMachineExtensionsDelete202Response
    | VirtualMachineExtensionsDelete204Response
    | VirtualMachineExtensionsDeletedefaultResponse
    | VirtualMachineExtensionsGet200Response
    | VirtualMachineExtensionsGetdefaultResponse
    | VirtualMachineExtensionsList200Response
    | VirtualMachineExtensionsListdefaultResponse
    | VirtualMachinesListByLocation200Response
    | VirtualMachinesListByLocationdefaultResponse
    | VirtualMachinesCapture200Response
    | VirtualMachinesCapture202Response
    | VirtualMachinesCapturedefaultResponse
    | VirtualMachinesCreateOrUpdate200Response
    | VirtualMachinesCreateOrUpdate201Response
    | VirtualMachinesCreateOrUpdatedefaultResponse
    | VirtualMachinesUpdate200Response
    | VirtualMachinesUpdatedefaultResponse
    | VirtualMachinesDelete200Response
    | VirtualMachinesDelete202Response
    | VirtualMachinesDelete204Response
    | VirtualMachinesDeletedefaultResponse
    | VirtualMachinesGet200Response
    | VirtualMachinesGetdefaultResponse
    | VirtualMachinesInstanceView200Response
    | VirtualMachinesInstanceViewdefaultResponse
    | VirtualMachinesConvertToManagedDisks200Response
    | VirtualMachinesConvertToManagedDisks202Response
    | VirtualMachinesConvertToManagedDisksdefaultResponse
    | VirtualMachinesDeallocate200Response
    | VirtualMachinesDeallocate202Response
    | VirtualMachinesDeallocatedefaultResponse
    | VirtualMachinesGeneralize200Response
    | VirtualMachinesGeneralizedefaultResponse
    | VirtualMachinesList200Response
    | VirtualMachinesListdefaultResponse
    | VirtualMachinesListAll200Response
    | VirtualMachinesListAlldefaultResponse
    | VirtualMachinesListAvailableSizes200Response
    | VirtualMachinesListAvailableSizesdefaultResponse
    | VirtualMachinesPowerOff200Response
    | VirtualMachinesPowerOff202Response
    | VirtualMachinesPowerOffdefaultResponse
    | VirtualMachinesReapply200Response
    | VirtualMachinesReapply202Response
    | VirtualMachinesReapplydefaultResponse
    | VirtualMachinesRestart200Response
    | VirtualMachinesRestart202Response
    | VirtualMachinesRestartdefaultResponse
    | VirtualMachinesStart200Response
    | VirtualMachinesStart202Response
    | VirtualMachinesStartdefaultResponse
    | VirtualMachinesRedeploy200Response
    | VirtualMachinesRedeploy202Response
    | VirtualMachinesRedeploydefaultResponse
    | VirtualMachinesReimage200Response
    | VirtualMachinesReimage202Response
    | VirtualMachinesReimagedefaultResponse
    | VirtualMachinesRetrieveBootDiagnosticsData200Response
    | VirtualMachinesRetrieveBootDiagnosticsDatadefaultResponse
    | VirtualMachinesPerformMaintenance200Response
    | VirtualMachinesPerformMaintenance202Response
    | VirtualMachinesPerformMaintenancedefaultResponse
    | VirtualMachinesSimulateEviction204Response
    | VirtualMachinesSimulateEvictiondefaultResponse
    | VirtualMachinesAssessPatches200Response
    | VirtualMachinesAssessPatches202Response
    | VirtualMachinesAssessPatchesdefaultResponse
    | VirtualMachinesInstallPatches200Response
    | VirtualMachinesInstallPatches202Response
    | VirtualMachinesInstallPatchesdefaultResponse
    | VirtualMachineImagesGet200Response
    | VirtualMachineImagesGetdefaultResponse
    | VirtualMachineImagesList200Response
    | VirtualMachineImagesListdefaultResponse
    | VirtualMachineImagesListOffers200Response
    | VirtualMachineImagesListOffersdefaultResponse
    | VirtualMachineImagesListPublishers200Response
    | VirtualMachineImagesListPublishersdefaultResponse
    | VirtualMachineImagesListSkus200Response
    | VirtualMachineImagesListSkusdefaultResponse
    | VirtualMachineImagesListByEdgeZone200Response
    | VirtualMachineImagesListByEdgeZonedefaultResponse
    | VirtualMachineImagesEdgeZoneGet200Response
    | VirtualMachineImagesEdgeZoneGetdefaultResponse
    | VirtualMachineImagesEdgeZoneList200Response
    | VirtualMachineImagesEdgeZoneListdefaultResponse
    | VirtualMachineImagesEdgeZoneListOffers200Response
    | VirtualMachineImagesEdgeZoneListOffersdefaultResponse
    | VirtualMachineImagesEdgeZoneListPublishers200Response
    | VirtualMachineImagesEdgeZoneListPublishersdefaultResponse
    | VirtualMachineImagesEdgeZoneListSkus200Response
    | VirtualMachineImagesEdgeZoneListSkusdefaultResponse
    | VirtualMachineExtensionImagesGet200Response
    | VirtualMachineExtensionImagesGetdefaultResponse
    | VirtualMachineExtensionImagesListTypes200Response
    | VirtualMachineExtensionImagesListTypesdefaultResponse
    | VirtualMachineExtensionImagesListVersions200Response
    | VirtualMachineExtensionImagesListVersionsdefaultResponse
    | AvailabilitySetsCreateOrUpdate200Response
    | AvailabilitySetsCreateOrUpdatedefaultResponse
    | AvailabilitySetsUpdate200Response
    | AvailabilitySetsUpdatedefaultResponse
    | AvailabilitySetsDelete200Response
    | AvailabilitySetsDelete204Response
    | AvailabilitySetsDeletedefaultResponse
    | AvailabilitySetsGet200Response
    | AvailabilitySetsGetdefaultResponse
    | AvailabilitySetsListBySubscription200Response
    | AvailabilitySetsListBySubscriptiondefaultResponse
    | AvailabilitySetsList200Response
    | AvailabilitySetsListdefaultResponse
    | AvailabilitySetsListAvailableSizes200Response
    | AvailabilitySetsListAvailableSizesdefaultResponse
    | ProximityPlacementGroupsCreateOrUpdate200Response
    | ProximityPlacementGroupsCreateOrUpdate201Response
    | ProximityPlacementGroupsCreateOrUpdatedefaultResponse
    | ProximityPlacementGroupsUpdate200Response
    | ProximityPlacementGroupsUpdatedefaultResponse
    | ProximityPlacementGroupsDelete200Response
    | ProximityPlacementGroupsDeletedefaultResponse
    | ProximityPlacementGroupsGet200Response
    | ProximityPlacementGroupsGetdefaultResponse
    | ProximityPlacementGroupsListBySubscription200Response
    | ProximityPlacementGroupsListBySubscriptiondefaultResponse
    | ProximityPlacementGroupsListByResourceGroup200Response
    | ProximityPlacementGroupsListByResourceGroupdefaultResponse
    | DedicatedHostGroupsCreateOrUpdate200Response
    | DedicatedHostGroupsCreateOrUpdate201Response
    | DedicatedHostGroupsCreateOrUpdatedefaultResponse
    | DedicatedHostGroupsUpdate200Response
    | DedicatedHostGroupsUpdatedefaultResponse
    | DedicatedHostGroupsDelete200Response
    | DedicatedHostGroupsDelete204Response
    | DedicatedHostGroupsDeletedefaultResponse
    | DedicatedHostGroupsGet200Response
    | DedicatedHostGroupsGetdefaultResponse
    | DedicatedHostGroupsListByResourceGroup200Response
    | DedicatedHostGroupsListByResourceGroupdefaultResponse
    | DedicatedHostGroupsListBySubscription200Response
    | DedicatedHostGroupsListBySubscriptiondefaultResponse
    | DedicatedHostsCreateOrUpdate200Response
    | DedicatedHostsCreateOrUpdate201Response
    | DedicatedHostsCreateOrUpdatedefaultResponse
    | DedicatedHostsUpdate200Response
    | DedicatedHostsUpdatedefaultResponse
    | DedicatedHostsDelete200Response
    | DedicatedHostsDelete202Response
    | DedicatedHostsDelete204Response
    | DedicatedHostsDeletedefaultResponse
    | DedicatedHostsGet200Response
    | DedicatedHostsGetdefaultResponse
    | DedicatedHostsListByHostGroup200Response
    | DedicatedHostsListByHostGroupdefaultResponse
    | DedicatedHostsRestart200Response
    | DedicatedHostsRestartdefaultResponse
    | SshPublicKeysListBySubscription200Response
    | SshPublicKeysListBySubscriptiondefaultResponse
    | SshPublicKeysListByResourceGroup200Response
    | SshPublicKeysListByResourceGroupdefaultResponse
    | SshPublicKeysCreate200Response
    | SshPublicKeysCreate201Response
    | SshPublicKeysCreatedefaultResponse
    | SshPublicKeysUpdate200Response
    | SshPublicKeysUpdatedefaultResponse
    | SshPublicKeysDelete200Response
    | SshPublicKeysDelete204Response
    | SshPublicKeysDeletedefaultResponse
    | SshPublicKeysGet200Response
    | SshPublicKeysGetdefaultResponse
    | SshPublicKeysGenerateKeyPair200Response
    | SshPublicKeysGenerateKeyPairdefaultResponse
    | ImagesCreateOrUpdate200Response
    | ImagesCreateOrUpdate201Response
    | ImagesCreateOrUpdatedefaultResponse
    | ImagesUpdate200Response
    | ImagesUpdate201Response
    | ImagesUpdatedefaultResponse
    | ImagesDelete200Response
    | ImagesDelete202Response
    | ImagesDelete204Response
    | ImagesDeletedefaultResponse
    | ImagesGet200Response
    | ImagesGetdefaultResponse
    | ImagesListByResourceGroup200Response
    | ImagesListByResourceGroupdefaultResponse
    | ImagesList200Response
    | ImagesListdefaultResponse
    | RestorePointCollectionsCreateOrUpdate200Response
    | RestorePointCollectionsCreateOrUpdate201Response
    | RestorePointCollectionsCreateOrUpdatedefaultResponse
    | RestorePointCollectionsUpdate200Response
    | RestorePointCollectionsUpdatedefaultResponse
    | RestorePointCollectionsDelete200Response
    | RestorePointCollectionsDelete202Response
    | RestorePointCollectionsDelete204Response
    | RestorePointCollectionsDeletedefaultResponse
    | RestorePointCollectionsGet200Response
    | RestorePointCollectionsGetdefaultResponse
    | RestorePointCollectionsList200Response
    | RestorePointCollectionsListdefaultResponse
    | RestorePointCollectionsListAll200Response
    | RestorePointCollectionsListAlldefaultResponse
    | RestorePointsCreate201Response
    | RestorePointsCreatedefaultResponse
    | RestorePointsDelete200Response
    | RestorePointsDelete202Response
    | RestorePointsDelete204Response
    | RestorePointsDeletedefaultResponse
    | RestorePointsGet200Response
    | RestorePointsGetdefaultResponse
    | CapacityReservationGroupsCreateOrUpdate200Response
    | CapacityReservationGroupsCreateOrUpdate201Response
    | CapacityReservationGroupsCreateOrUpdatedefaultResponse
    | CapacityReservationGroupsUpdate200Response
    | CapacityReservationGroupsUpdatedefaultResponse
    | CapacityReservationGroupsDelete200Response
    | CapacityReservationGroupsDelete204Response
    | CapacityReservationGroupsDeletedefaultResponse
    | CapacityReservationGroupsGet200Response
    | CapacityReservationGroupsGetdefaultResponse
    | CapacityReservationGroupsListByResourceGroup200Response
    | CapacityReservationGroupsListByResourceGroupdefaultResponse
    | CapacityReservationGroupsListBySubscription200Response
    | CapacityReservationGroupsListBySubscriptiondefaultResponse
    | CapacityReservationsCreateOrUpdate200Response
    | CapacityReservationsCreateOrUpdate201Response
    | CapacityReservationsCreateOrUpdatedefaultResponse
    | CapacityReservationsUpdate200Response
    | CapacityReservationsUpdate202Response
    | CapacityReservationsUpdatedefaultResponse
    | CapacityReservationsDelete200Response
    | CapacityReservationsDelete202Response
    | CapacityReservationsDelete204Response
    | CapacityReservationsDeletedefaultResponse
    | CapacityReservationsGet200Response
    | CapacityReservationsGetdefaultResponse
    | CapacityReservationsListByCapacityReservationGroup200Response
    | CapacityReservationsListByCapacityReservationGroupdefaultResponse
    | LogAnalyticsExportRequestRateByInterval200Response
    | LogAnalyticsExportRequestRateByInterval202Response
    | LogAnalyticsExportRequestRateByIntervaldefaultResponse
    | LogAnalyticsExportThrottledRequests200Response
    | LogAnalyticsExportThrottledRequests202Response
    | LogAnalyticsExportThrottledRequestsdefaultResponse
    | VirtualMachineRunCommandsCreateOrUpdate200Response
    | VirtualMachineRunCommandsCreateOrUpdate201Response
    | VirtualMachineRunCommandsCreateOrUpdatedefaultResponse
    | VirtualMachineRunCommandsUpdate200Response
    | VirtualMachineRunCommandsUpdatedefaultResponse
    | VirtualMachineRunCommandsDelete200Response
    | VirtualMachineRunCommandsDelete202Response
    | VirtualMachineRunCommandsDelete204Response
    | VirtualMachineRunCommandsDeletedefaultResponse
    | VirtualMachineRunCommandsGetByVirtualMachine200Response
    | VirtualMachineRunCommandsGetByVirtualMachinedefaultResponse
    | VirtualMachineRunCommandsListByVirtualMachine200Response
    | VirtualMachineRunCommandsListByVirtualMachinedefaultResponse
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdate200Response
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdate201Response
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdatedefaultResponse
    | VirtualMachineScaleSetVMRunCommandsUpdate200Response
    | VirtualMachineScaleSetVMRunCommandsUpdatedefaultResponse
    | VirtualMachineScaleSetVMRunCommandsDelete200Response
    | VirtualMachineScaleSetVMRunCommandsDelete202Response
    | VirtualMachineScaleSetVMRunCommandsDelete204Response
    | VirtualMachineScaleSetVMRunCommandsDeletedefaultResponse
    | VirtualMachineScaleSetVMRunCommandsGet200Response
    | VirtualMachineScaleSetVMRunCommandsGetdefaultResponse
    | VirtualMachineScaleSetVMRunCommandsList200Response
    | VirtualMachineScaleSetVMRunCommandsListdefaultResponse
    | DiskAccessesCreateOrUpdate200Response
    | DiskAccessesCreateOrUpdate202Response
    | DiskAccessesCreateOrUpdatedefaultResponse
    | DiskAccessesUpdate200Response
    | DiskAccessesUpdate202Response
    | DiskAccessesUpdatedefaultResponse
    | DiskAccessesGet200Response
    | DiskAccessesGetdefaultResponse
    | DiskAccessesDelete200Response
    | DiskAccessesDelete202Response
    | DiskAccessesDelete204Response
    | DiskAccessesDeletedefaultResponse
    | DiskAccessesListByResourceGroup200Response
    | DiskAccessesListByResourceGroupdefaultResponse
    | DiskAccessesList200Response
    | DiskAccessesListdefaultResponse
    | DiskAccessesUpdateAPrivateEndpointConnection200Response
    | DiskAccessesUpdateAPrivateEndpointConnection202Response
    | DiskAccessesUpdateAPrivateEndpointConnectiondefaultResponse
    | DiskAccessesGetAPrivateEndpointConnection200Response
    | DiskAccessesGetAPrivateEndpointConnectiondefaultResponse
    | DiskAccessesDeleteAPrivateEndpointConnection200Response
    | DiskAccessesDeleteAPrivateEndpointConnection202Response
    | DiskAccessesDeleteAPrivateEndpointConnection204Response
    | DiskAccessesDeleteAPrivateEndpointConnectiondefaultResponse
    | DiskAccessesListPrivateEndpointConnections200Response
    | DiskAccessesListPrivateEndpointConnectionsdefaultResponse
    | DiskEncryptionSetsCreateOrUpdate200Response
    | DiskEncryptionSetsCreateOrUpdate202Response
    | DiskEncryptionSetsCreateOrUpdatedefaultResponse
    | DiskEncryptionSetsUpdate200Response
    | DiskEncryptionSetsUpdate202Response
    | DiskEncryptionSetsUpdatedefaultResponse
    | DiskEncryptionSetsGet200Response
    | DiskEncryptionSetsGetdefaultResponse
    | DiskEncryptionSetsDelete200Response
    | DiskEncryptionSetsDelete202Response
    | DiskEncryptionSetsDelete204Response
    | DiskEncryptionSetsDeletedefaultResponse
    | DiskEncryptionSetsListByResourceGroup200Response
    | DiskEncryptionSetsListByResourceGroupdefaultResponse
    | DiskEncryptionSetsList200Response
    | DiskEncryptionSetsListdefaultResponse
    | DiskEncryptionSetsListAssociatedResources200Response
    | DiskEncryptionSetsListAssociatedResourcesdefaultResponse
    | DiskRestorePointGet200Response
    | DiskRestorePointGetdefaultResponse
    | DiskRestorePointListByRestorePoint200Response
    | DiskRestorePointListByRestorePointdefaultResponse
    | DiskRestorePointGrantAccess200Response
    | DiskRestorePointGrantAccess202Response
    | DiskRestorePointGrantAccessdefaultResponse
    | DiskRestorePointRevokeAccess200Response
    | DiskRestorePointRevokeAccess202Response
    | DiskRestorePointRevokeAccessdefaultResponse
    | GalleriesCreateOrUpdate200Response
    | GalleriesCreateOrUpdate201Response
    | GalleriesCreateOrUpdate202Response
    | GalleriesCreateOrUpdatedefaultResponse
    | GalleriesUpdate200Response
    | GalleriesUpdatedefaultResponse
    | GalleriesGet200Response
    | GalleriesGetdefaultResponse
    | GalleriesDelete200Response
    | GalleriesDelete202Response
    | GalleriesDelete204Response
    | GalleriesDeletedefaultResponse
    | GalleriesListByResourceGroup200Response
    | GalleriesListByResourceGroupdefaultResponse
    | GalleriesList200Response
    | GalleriesListdefaultResponse
    | GalleryImagesCreateOrUpdate200Response
    | GalleryImagesCreateOrUpdate201Response
    | GalleryImagesCreateOrUpdate202Response
    | GalleryImagesCreateOrUpdatedefaultResponse
    | GalleryImagesUpdate200Response
    | GalleryImagesUpdatedefaultResponse
    | GalleryImagesGet200Response
    | GalleryImagesGetdefaultResponse
    | GalleryImagesDelete200Response
    | GalleryImagesDelete202Response
    | GalleryImagesDelete204Response
    | GalleryImagesDeletedefaultResponse
    | GalleryImagesListByGallery200Response
    | GalleryImagesListByGallerydefaultResponse
    | GalleryImageVersionsCreateOrUpdate200Response
    | GalleryImageVersionsCreateOrUpdate201Response
    | GalleryImageVersionsCreateOrUpdate202Response
    | GalleryImageVersionsCreateOrUpdatedefaultResponse
    | GalleryImageVersionsUpdate200Response
    | GalleryImageVersionsUpdatedefaultResponse
    | GalleryImageVersionsGet200Response
    | GalleryImageVersionsGetdefaultResponse
    | GalleryImageVersionsDelete200Response
    | GalleryImageVersionsDelete202Response
    | GalleryImageVersionsDelete204Response
    | GalleryImageVersionsDeletedefaultResponse
    | GalleryImageVersionsListByGalleryImage200Response
    | GalleryImageVersionsListByGalleryImagedefaultResponse
    | GalleryApplicationsCreateOrUpdate200Response
    | GalleryApplicationsCreateOrUpdate201Response
    | GalleryApplicationsCreateOrUpdate202Response
    | GalleryApplicationsCreateOrUpdatedefaultResponse
    | GalleryApplicationsUpdate200Response
    | GalleryApplicationsUpdatedefaultResponse
    | GalleryApplicationsGet200Response
    | GalleryApplicationsGetdefaultResponse
    | GalleryApplicationsDelete200Response
    | GalleryApplicationsDelete202Response
    | GalleryApplicationsDelete204Response
    | GalleryApplicationsDeletedefaultResponse
    | GalleryApplicationsListByGallery200Response
    | GalleryApplicationsListByGallerydefaultResponse
    | GalleryApplicationVersionsCreateOrUpdate200Response
    | GalleryApplicationVersionsCreateOrUpdate201Response
    | GalleryApplicationVersionsCreateOrUpdate202Response
    | GalleryApplicationVersionsCreateOrUpdatedefaultResponse
    | GalleryApplicationVersionsUpdate200Response
    | GalleryApplicationVersionsUpdatedefaultResponse
    | GalleryApplicationVersionsGet200Response
    | GalleryApplicationVersionsGetdefaultResponse
    | GalleryApplicationVersionsDelete200Response
    | GalleryApplicationVersionsDelete202Response
    | GalleryApplicationVersionsDelete204Response
    | GalleryApplicationVersionsDeletedefaultResponse
    | GalleryApplicationVersionsListByGalleryApplication200Response
    | GalleryApplicationVersionsListByGalleryApplicationdefaultResponse
    | GallerySharingProfileUpdate200Response
    | GallerySharingProfileUpdate202Response
    | GallerySharingProfileUpdatedefaultResponse
    | SharedGalleriesList200Response
    | SharedGalleriesListdefaultResponse
    | SharedGalleriesGet200Response
    | SharedGalleriesGetdefaultResponse
    | SharedGalleryImagesList200Response
    | SharedGalleryImagesListdefaultResponse
    | SharedGalleryImagesGet200Response
    | SharedGalleryImagesGetdefaultResponse
    | SharedGalleryImageVersionsList200Response
    | SharedGalleryImageVersionsListdefaultResponse
    | SharedGalleryImageVersionsGet200Response
    | SharedGalleryImageVersionsGetdefaultResponse
    | CommunityGalleriesGet200Response
    | CommunityGalleriesGetdefaultResponse
    | CommunityGalleryImagesGet200Response
    | CommunityGalleryImagesGetdefaultResponse
    | CommunityGalleryImagesList200Response
    | CommunityGalleryImagesListdefaultResponse
    | CommunityGalleryImageVersionsGet200Response
    | CommunityGalleryImageVersionsGetdefaultResponse
    | CommunityGalleryImageVersionsList200Response
    | CommunityGalleryImageVersionsListdefaultResponse
    | CloudServiceRoleInstancesDelete200Response
    | CloudServiceRoleInstancesDelete202Response
    | CloudServiceRoleInstancesDelete204Response
    | CloudServiceRoleInstancesDeletedefaultResponse
    | CloudServiceRoleInstancesGet200Response
    | CloudServiceRoleInstancesGetdefaultResponse
    | CloudServiceRoleInstancesGetInstanceView200Response
    | CloudServiceRoleInstancesGetInstanceViewdefaultResponse
    | CloudServiceRoleInstancesList200Response
    | CloudServiceRoleInstancesListdefaultResponse
    | CloudServiceRoleInstancesRestart200Response
    | CloudServiceRoleInstancesRestart202Response
    | CloudServiceRoleInstancesRestartdefaultResponse
    | CloudServiceRoleInstancesReimage200Response
    | CloudServiceRoleInstancesReimage202Response
    | CloudServiceRoleInstancesReimagedefaultResponse
    | CloudServiceRoleInstancesRebuild200Response
    | CloudServiceRoleInstancesRebuild202Response
    | CloudServiceRoleInstancesRebuilddefaultResponse
    | CloudServiceRoleInstancesGetRemoteDesktopFile200Response
    | CloudServiceRoleInstancesGetRemoteDesktopFiledefaultResponse
    | CloudServiceRolesGet200Response
    | CloudServiceRolesGetdefaultResponse
    | CloudServiceRolesList200Response
    | CloudServiceRolesListdefaultResponse
    | CloudServicesCreateOrUpdate200Response
    | CloudServicesCreateOrUpdate201Response
    | CloudServicesCreateOrUpdatedefaultResponse
    | CloudServicesUpdate200Response
    | CloudServicesUpdatedefaultResponse
    | CloudServicesDelete200Response
    | CloudServicesDelete202Response
    | CloudServicesDelete204Response
    | CloudServicesDeletedefaultResponse
    | CloudServicesGet200Response
    | CloudServicesGetdefaultResponse
    | CloudServicesGetInstanceView200Response
    | CloudServicesGetInstanceViewdefaultResponse
    | CloudServicesListAll200Response
    | CloudServicesListAlldefaultResponse
    | CloudServicesList200Response
    | CloudServicesListdefaultResponse
    | CloudServicesStart200Response
    | CloudServicesStart202Response
    | CloudServicesStartdefaultResponse
    | CloudServicesPowerOff200Response
    | CloudServicesPowerOff202Response
    | CloudServicesPowerOffdefaultResponse
    | CloudServicesRestart200Response
    | CloudServicesRestart202Response
    | CloudServicesRestartdefaultResponse
    | CloudServicesReimage200Response
    | CloudServicesReimage202Response
    | CloudServicesReimagedefaultResponse
    | CloudServicesRebuild200Response
    | CloudServicesRebuild202Response
    | CloudServicesRebuilddefaultResponse
    | CloudServicesDeleteInstances200Response
    | CloudServicesDeleteInstances202Response
    | CloudServicesDeleteInstancesdefaultResponse
    | CloudServicesUpdateDomainWalkUpdateDomain200Response
    | CloudServicesUpdateDomainWalkUpdateDomain202Response
    | CloudServicesUpdateDomainWalkUpdateDomaindefaultResponse
    | CloudServicesUpdateDomainGetUpdateDomain200Response
    | CloudServicesUpdateDomainGetUpdateDomaindefaultResponse
    | CloudServicesUpdateDomainListUpdateDomains200Response
    | CloudServicesUpdateDomainListUpdateDomainsdefaultResponse
    | CloudServiceOperatingSystemsGetOSVersion200Response
    | CloudServiceOperatingSystemsGetOSVersiondefaultResponse
    | CloudServiceOperatingSystemsListOSVersions200Response
    | CloudServiceOperatingSystemsListOSVersionsdefaultResponse
    | CloudServiceOperatingSystemsGetOSFamily200Response
    | CloudServiceOperatingSystemsGetOSFamilydefaultResponse
    | CloudServiceOperatingSystemsListOSFamilies200Response
    | CloudServiceOperatingSystemsListOSFamiliesdefaultResponse
): response is
  | OperationsListdefaultResponse
  | UsageListdefaultResponse
  | VirtualMachineSizesListdefaultResponse
  | VirtualMachineScaleSetsListByLocationdefaultResponse
  | VirtualMachineScaleSetsCreateOrUpdatedefaultResponse
  | VirtualMachineScaleSetsUpdatedefaultResponse
  | VirtualMachineScaleSetsDeletedefaultResponse
  | VirtualMachineScaleSetsGetdefaultResponse
  | VirtualMachineScaleSetsDeallocatedefaultResponse
  | VirtualMachineScaleSetsDeleteInstancesdefaultResponse
  | VirtualMachineScaleSetsGetInstanceViewdefaultResponse
  | VirtualMachineScaleSetsListdefaultResponse
  | VirtualMachineScaleSetsListAlldefaultResponse
  | VirtualMachineScaleSetsListSkusdefaultResponse
  | VirtualMachineScaleSetsGetOSUpgradeHistorydefaultResponse
  | VirtualMachineScaleSetsPowerOffdefaultResponse
  | VirtualMachineScaleSetsRestartdefaultResponse
  | VirtualMachineScaleSetsStartdefaultResponse
  | VirtualMachineScaleSetsRedeploydefaultResponse
  | VirtualMachineScaleSetsPerformMaintenancedefaultResponse
  | VirtualMachineScaleSetsUpdateInstancesdefaultResponse
  | VirtualMachineScaleSetsReimagedefaultResponse
  | VirtualMachineScaleSetsReimageAlldefaultResponse
  | VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkdefaultResponse
  | VirtualMachineScaleSetsConvertToSinglePlacementGroupdefaultResponse
  | VirtualMachineScaleSetsSetOrchestrationServiceStatedefaultResponse
  | VirtualMachineScaleSetExtensionsCreateOrUpdatedefaultResponse
  | VirtualMachineScaleSetExtensionsUpdatedefaultResponse
  | VirtualMachineScaleSetExtensionsDeletedefaultResponse
  | VirtualMachineScaleSetExtensionsGetdefaultResponse
  | VirtualMachineScaleSetExtensionsListdefaultResponse
  | VirtualMachineScaleSetRollingUpgradesCanceldefaultResponse
  | VirtualMachineScaleSetRollingUpgradesStartOSUpgradedefaultResponse
  | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradedefaultResponse
  | VirtualMachineScaleSetRollingUpgradesGetLatestdefaultResponse
  | VirtualMachineScaleSetVMExtensionsCreateOrUpdatedefaultResponse
  | VirtualMachineScaleSetVMExtensionsUpdatedefaultResponse
  | VirtualMachineScaleSetVMExtensionsDeletedefaultResponse
  | VirtualMachineScaleSetVMExtensionsGetdefaultResponse
  | VirtualMachineScaleSetVMExtensionsListdefaultResponse
  | VirtualMachineScaleSetVMsReimagedefaultResponse
  | VirtualMachineScaleSetVMsReimageAlldefaultResponse
  | VirtualMachineScaleSetVMsDeallocatedefaultResponse
  | VirtualMachineScaleSetVMsUpdatedefaultResponse
  | VirtualMachineScaleSetVMsDeletedefaultResponse
  | VirtualMachineScaleSetVMsGetdefaultResponse
  | VirtualMachineScaleSetVMsGetInstanceViewdefaultResponse
  | VirtualMachineScaleSetVMsListdefaultResponse
  | VirtualMachineScaleSetVMsPowerOffdefaultResponse
  | VirtualMachineScaleSetVMsRestartdefaultResponse
  | VirtualMachineScaleSetVMsStartdefaultResponse
  | VirtualMachineScaleSetVMsRedeploydefaultResponse
  | VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDatadefaultResponse
  | VirtualMachineScaleSetVMsPerformMaintenancedefaultResponse
  | VirtualMachineScaleSetVMsSimulateEvictiondefaultResponse
  | VirtualMachineExtensionsCreateOrUpdatedefaultResponse
  | VirtualMachineExtensionsUpdatedefaultResponse
  | VirtualMachineExtensionsDeletedefaultResponse
  | VirtualMachineExtensionsGetdefaultResponse
  | VirtualMachineExtensionsListdefaultResponse
  | VirtualMachinesListByLocationdefaultResponse
  | VirtualMachinesCapturedefaultResponse
  | VirtualMachinesCreateOrUpdatedefaultResponse
  | VirtualMachinesUpdatedefaultResponse
  | VirtualMachinesDeletedefaultResponse
  | VirtualMachinesGetdefaultResponse
  | VirtualMachinesInstanceViewdefaultResponse
  | VirtualMachinesConvertToManagedDisksdefaultResponse
  | VirtualMachinesDeallocatedefaultResponse
  | VirtualMachinesGeneralizedefaultResponse
  | VirtualMachinesListdefaultResponse
  | VirtualMachinesListAlldefaultResponse
  | VirtualMachinesListAvailableSizesdefaultResponse
  | VirtualMachinesPowerOffdefaultResponse
  | VirtualMachinesReapplydefaultResponse
  | VirtualMachinesRestartdefaultResponse
  | VirtualMachinesStartdefaultResponse
  | VirtualMachinesRedeploydefaultResponse
  | VirtualMachinesReimagedefaultResponse
  | VirtualMachinesRetrieveBootDiagnosticsDatadefaultResponse
  | VirtualMachinesPerformMaintenancedefaultResponse
  | VirtualMachinesSimulateEvictiondefaultResponse
  | VirtualMachinesAssessPatchesdefaultResponse
  | VirtualMachinesInstallPatchesdefaultResponse
  | VirtualMachineImagesGetdefaultResponse
  | VirtualMachineImagesListdefaultResponse
  | VirtualMachineImagesListOffersdefaultResponse
  | VirtualMachineImagesListPublishersdefaultResponse
  | VirtualMachineImagesListSkusdefaultResponse
  | VirtualMachineImagesListByEdgeZonedefaultResponse
  | VirtualMachineImagesEdgeZoneGetdefaultResponse
  | VirtualMachineImagesEdgeZoneListdefaultResponse
  | VirtualMachineImagesEdgeZoneListOffersdefaultResponse
  | VirtualMachineImagesEdgeZoneListPublishersdefaultResponse
  | VirtualMachineImagesEdgeZoneListSkusdefaultResponse
  | VirtualMachineExtensionImagesGetdefaultResponse
  | VirtualMachineExtensionImagesListTypesdefaultResponse
  | VirtualMachineExtensionImagesListVersionsdefaultResponse
  | AvailabilitySetsCreateOrUpdatedefaultResponse
  | AvailabilitySetsUpdatedefaultResponse
  | AvailabilitySetsDeletedefaultResponse
  | AvailabilitySetsGetdefaultResponse
  | AvailabilitySetsListBySubscriptiondefaultResponse
  | AvailabilitySetsListdefaultResponse
  | AvailabilitySetsListAvailableSizesdefaultResponse
  | ProximityPlacementGroupsCreateOrUpdatedefaultResponse
  | ProximityPlacementGroupsUpdatedefaultResponse
  | ProximityPlacementGroupsDeletedefaultResponse
  | ProximityPlacementGroupsGetdefaultResponse
  | ProximityPlacementGroupsListBySubscriptiondefaultResponse
  | ProximityPlacementGroupsListByResourceGroupdefaultResponse
  | DedicatedHostGroupsCreateOrUpdatedefaultResponse
  | DedicatedHostGroupsUpdatedefaultResponse
  | DedicatedHostGroupsDeletedefaultResponse
  | DedicatedHostGroupsGetdefaultResponse
  | DedicatedHostGroupsListByResourceGroupdefaultResponse
  | DedicatedHostGroupsListBySubscriptiondefaultResponse
  | DedicatedHostsCreateOrUpdatedefaultResponse
  | DedicatedHostsUpdatedefaultResponse
  | DedicatedHostsDeletedefaultResponse
  | DedicatedHostsGetdefaultResponse
  | DedicatedHostsListByHostGroupdefaultResponse
  | DedicatedHostsRestartdefaultResponse
  | SshPublicKeysListBySubscriptiondefaultResponse
  | SshPublicKeysListByResourceGroupdefaultResponse
  | SshPublicKeysCreatedefaultResponse
  | SshPublicKeysUpdatedefaultResponse
  | SshPublicKeysDeletedefaultResponse
  | SshPublicKeysGetdefaultResponse
  | SshPublicKeysGenerateKeyPairdefaultResponse
  | ImagesCreateOrUpdatedefaultResponse
  | ImagesUpdatedefaultResponse
  | ImagesDeletedefaultResponse
  | ImagesGetdefaultResponse
  | ImagesListByResourceGroupdefaultResponse
  | ImagesListdefaultResponse
  | RestorePointCollectionsCreateOrUpdatedefaultResponse
  | RestorePointCollectionsUpdatedefaultResponse
  | RestorePointCollectionsDeletedefaultResponse
  | RestorePointCollectionsGetdefaultResponse
  | RestorePointCollectionsListdefaultResponse
  | RestorePointCollectionsListAlldefaultResponse
  | RestorePointsCreatedefaultResponse
  | RestorePointsDeletedefaultResponse
  | RestorePointsGetdefaultResponse
  | CapacityReservationGroupsCreateOrUpdatedefaultResponse
  | CapacityReservationGroupsUpdatedefaultResponse
  | CapacityReservationGroupsDeletedefaultResponse
  | CapacityReservationGroupsGetdefaultResponse
  | CapacityReservationGroupsListByResourceGroupdefaultResponse
  | CapacityReservationGroupsListBySubscriptiondefaultResponse
  | CapacityReservationsCreateOrUpdatedefaultResponse
  | CapacityReservationsUpdatedefaultResponse
  | CapacityReservationsDeletedefaultResponse
  | CapacityReservationsGetdefaultResponse
  | CapacityReservationsListByCapacityReservationGroupdefaultResponse
  | LogAnalyticsExportRequestRateByIntervaldefaultResponse
  | LogAnalyticsExportThrottledRequestsdefaultResponse
  | VirtualMachineRunCommandsCreateOrUpdatedefaultResponse
  | VirtualMachineRunCommandsUpdatedefaultResponse
  | VirtualMachineRunCommandsDeletedefaultResponse
  | VirtualMachineRunCommandsGetByVirtualMachinedefaultResponse
  | VirtualMachineRunCommandsListByVirtualMachinedefaultResponse
  | VirtualMachineScaleSetVMRunCommandsCreateOrUpdatedefaultResponse
  | VirtualMachineScaleSetVMRunCommandsUpdatedefaultResponse
  | VirtualMachineScaleSetVMRunCommandsDeletedefaultResponse
  | VirtualMachineScaleSetVMRunCommandsGetdefaultResponse
  | VirtualMachineScaleSetVMRunCommandsListdefaultResponse
  | DiskAccessesCreateOrUpdatedefaultResponse
  | DiskAccessesUpdatedefaultResponse
  | DiskAccessesGetdefaultResponse
  | DiskAccessesDeletedefaultResponse
  | DiskAccessesListByResourceGroupdefaultResponse
  | DiskAccessesListdefaultResponse
  | DiskAccessesUpdateAPrivateEndpointConnectiondefaultResponse
  | DiskAccessesGetAPrivateEndpointConnectiondefaultResponse
  | DiskAccessesDeleteAPrivateEndpointConnectiondefaultResponse
  | DiskAccessesListPrivateEndpointConnectionsdefaultResponse
  | DiskEncryptionSetsCreateOrUpdatedefaultResponse
  | DiskEncryptionSetsUpdatedefaultResponse
  | DiskEncryptionSetsGetdefaultResponse
  | DiskEncryptionSetsDeletedefaultResponse
  | DiskEncryptionSetsListByResourceGroupdefaultResponse
  | DiskEncryptionSetsListdefaultResponse
  | DiskEncryptionSetsListAssociatedResourcesdefaultResponse
  | DiskRestorePointGetdefaultResponse
  | DiskRestorePointListByRestorePointdefaultResponse
  | DiskRestorePointGrantAccessdefaultResponse
  | DiskRestorePointRevokeAccessdefaultResponse
  | GalleriesCreateOrUpdatedefaultResponse
  | GalleriesUpdatedefaultResponse
  | GalleriesGetdefaultResponse
  | GalleriesDeletedefaultResponse
  | GalleriesListByResourceGroupdefaultResponse
  | GalleriesListdefaultResponse
  | GalleryImagesCreateOrUpdatedefaultResponse
  | GalleryImagesUpdatedefaultResponse
  | GalleryImagesGetdefaultResponse
  | GalleryImagesDeletedefaultResponse
  | GalleryImagesListByGallerydefaultResponse
  | GalleryImageVersionsCreateOrUpdatedefaultResponse
  | GalleryImageVersionsUpdatedefaultResponse
  | GalleryImageVersionsGetdefaultResponse
  | GalleryImageVersionsDeletedefaultResponse
  | GalleryImageVersionsListByGalleryImagedefaultResponse
  | GalleryApplicationsCreateOrUpdatedefaultResponse
  | GalleryApplicationsUpdatedefaultResponse
  | GalleryApplicationsGetdefaultResponse
  | GalleryApplicationsDeletedefaultResponse
  | GalleryApplicationsListByGallerydefaultResponse
  | GalleryApplicationVersionsCreateOrUpdatedefaultResponse
  | GalleryApplicationVersionsUpdatedefaultResponse
  | GalleryApplicationVersionsGetdefaultResponse
  | GalleryApplicationVersionsDeletedefaultResponse
  | GalleryApplicationVersionsListByGalleryApplicationdefaultResponse
  | GallerySharingProfileUpdatedefaultResponse
  | SharedGalleriesListdefaultResponse
  | SharedGalleriesGetdefaultResponse
  | SharedGalleryImagesListdefaultResponse
  | SharedGalleryImagesGetdefaultResponse
  | SharedGalleryImageVersionsListdefaultResponse
  | SharedGalleryImageVersionsGetdefaultResponse
  | CommunityGalleriesGetdefaultResponse
  | CommunityGalleryImagesGetdefaultResponse
  | CommunityGalleryImagesListdefaultResponse
  | CommunityGalleryImageVersionsGetdefaultResponse
  | CommunityGalleryImageVersionsListdefaultResponse
  | CloudServiceRoleInstancesDeletedefaultResponse
  | CloudServiceRoleInstancesGetdefaultResponse
  | CloudServiceRoleInstancesGetInstanceViewdefaultResponse
  | CloudServiceRoleInstancesListdefaultResponse
  | CloudServiceRoleInstancesRestartdefaultResponse
  | CloudServiceRoleInstancesReimagedefaultResponse
  | CloudServiceRoleInstancesRebuilddefaultResponse
  | CloudServiceRoleInstancesGetRemoteDesktopFiledefaultResponse
  | CloudServiceRolesGetdefaultResponse
  | CloudServiceRolesListdefaultResponse
  | CloudServicesCreateOrUpdatedefaultResponse
  | CloudServicesUpdatedefaultResponse
  | CloudServicesDeletedefaultResponse
  | CloudServicesGetdefaultResponse
  | CloudServicesGetInstanceViewdefaultResponse
  | CloudServicesListAlldefaultResponse
  | CloudServicesListdefaultResponse
  | CloudServicesStartdefaultResponse
  | CloudServicesPowerOffdefaultResponse
  | CloudServicesRestartdefaultResponse
  | CloudServicesReimagedefaultResponse
  | CloudServicesRebuilddefaultResponse
  | CloudServicesDeleteInstancesdefaultResponse
  | CloudServicesUpdateDomainWalkUpdateDomaindefaultResponse
  | CloudServicesUpdateDomainGetUpdateDomaindefaultResponse
  | CloudServicesUpdateDomainListUpdateDomainsdefaultResponse
  | CloudServiceOperatingSystemsGetOSVersiondefaultResponse
  | CloudServiceOperatingSystemsListOSVersionsdefaultResponse
  | CloudServiceOperatingSystemsGetOSFamilydefaultResponse
  | CloudServiceOperatingSystemsListOSFamiliesdefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (
      candidateParts.length === pathParts.length &&
      hasParametrizedPath(key)
    ) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (
          candidateParts[i].startsWith("{") &&
          candidateParts[i].endsWith("}")
        ) {
          // If the current part of the candidate is a "template" part
          // it is a match with the actual path part on hand
          // skip as the parameterized part can match anything
          continue;
        }

        // If the candidate part is not a template and
        // the parts don't match mark the candidate as not found
        // to move on with the next candidate path.
        if (candidateParts[i] !== pathParts[i]) {
          found = false;
          break;
        }
      }

      // We finished evaluating the current candidate parts
      // if all parts matched we return the success values form
      // the path mapping.
      if (found) {
        return value;
      }
    }
  }

  // No match was found, return an empty array.
  return [];
}

function hasParametrizedPath(path: string): boolean {
  return path.includes("/{");
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}

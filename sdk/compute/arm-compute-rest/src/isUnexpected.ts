// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AvailabilitySetsCreateOrUpdate200Response,
  AvailabilitySetsCreateOrUpdateDefaultResponse,
  AvailabilitySetsDelete200Response,
  AvailabilitySetsDelete204Response,
  AvailabilitySetsDeleteDefaultResponse,
  AvailabilitySetsGet200Response,
  AvailabilitySetsGetDefaultResponse,
  AvailabilitySetsList200Response,
  AvailabilitySetsListAvailableSizes200Response,
  AvailabilitySetsListAvailableSizesDefaultResponse,
  AvailabilitySetsListBySubscription200Response,
  AvailabilitySetsListBySubscriptionDefaultResponse,
  AvailabilitySetsListDefaultResponse,
  AvailabilitySetsUpdate200Response,
  AvailabilitySetsUpdateDefaultResponse,
  CapacityReservationGroupsCreateOrUpdate200Response,
  CapacityReservationGroupsCreateOrUpdate201Response,
  CapacityReservationGroupsCreateOrUpdateDefaultResponse,
  CapacityReservationGroupsDelete200Response,
  CapacityReservationGroupsDelete204Response,
  CapacityReservationGroupsDeleteDefaultResponse,
  CapacityReservationGroupsGet200Response,
  CapacityReservationGroupsGetDefaultResponse,
  CapacityReservationGroupsListByResourceGroup200Response,
  CapacityReservationGroupsListByResourceGroupDefaultResponse,
  CapacityReservationGroupsListBySubscription200Response,
  CapacityReservationGroupsListBySubscriptionDefaultResponse,
  CapacityReservationGroupsUpdate200Response,
  CapacityReservationGroupsUpdateDefaultResponse,
  CapacityReservationsCreateOrUpdate200Response,
  CapacityReservationsCreateOrUpdate201Response,
  CapacityReservationsCreateOrUpdateDefaultResponse,
  CapacityReservationsDelete200Response,
  CapacityReservationsDelete202Response,
  CapacityReservationsDelete204Response,
  CapacityReservationsDeleteDefaultResponse,
  CapacityReservationsGet200Response,
  CapacityReservationsGetDefaultResponse,
  CapacityReservationsListByCapacityReservationGroup200Response,
  CapacityReservationsListByCapacityReservationGroupDefaultResponse,
  CapacityReservationsUpdate200Response,
  CapacityReservationsUpdate202Response,
  CapacityReservationsUpdateDefaultResponse,
  CloudServiceOperatingSystemsGetOSFamily200Response,
  CloudServiceOperatingSystemsGetOSFamilyDefaultResponse,
  CloudServiceOperatingSystemsGetOSVersion200Response,
  CloudServiceOperatingSystemsGetOSVersionDefaultResponse,
  CloudServiceOperatingSystemsListOSFamilies200Response,
  CloudServiceOperatingSystemsListOSFamiliesDefaultResponse,
  CloudServiceOperatingSystemsListOSVersions200Response,
  CloudServiceOperatingSystemsListOSVersionsDefaultResponse,
  CloudServiceRoleInstancesDelete200Response,
  CloudServiceRoleInstancesDelete202Response,
  CloudServiceRoleInstancesDelete204Response,
  CloudServiceRoleInstancesDeleteDefaultResponse,
  CloudServiceRoleInstancesGet200Response,
  CloudServiceRoleInstancesGetDefaultResponse,
  CloudServiceRoleInstancesGetInstanceView200Response,
  CloudServiceRoleInstancesGetInstanceViewDefaultResponse,
  CloudServiceRoleInstancesGetRemoteDesktopFile200Response,
  CloudServiceRoleInstancesGetRemoteDesktopFileDefaultResponse,
  CloudServiceRoleInstancesList200Response,
  CloudServiceRoleInstancesListDefaultResponse,
  CloudServiceRoleInstancesRebuild200Response,
  CloudServiceRoleInstancesRebuild202Response,
  CloudServiceRoleInstancesRebuildDefaultResponse,
  CloudServiceRoleInstancesReimage200Response,
  CloudServiceRoleInstancesReimage202Response,
  CloudServiceRoleInstancesReimageDefaultResponse,
  CloudServiceRoleInstancesRestart200Response,
  CloudServiceRoleInstancesRestart202Response,
  CloudServiceRoleInstancesRestartDefaultResponse,
  CloudServiceRolesGet200Response,
  CloudServiceRolesGetDefaultResponse,
  CloudServiceRolesList200Response,
  CloudServiceRolesListDefaultResponse,
  CloudServicesCreateOrUpdate200Response,
  CloudServicesCreateOrUpdate201Response,
  CloudServicesCreateOrUpdateDefaultResponse,
  CloudServicesDelete200Response,
  CloudServicesDelete202Response,
  CloudServicesDelete204Response,
  CloudServicesDeleteDefaultResponse,
  CloudServicesDeleteInstances200Response,
  CloudServicesDeleteInstances202Response,
  CloudServicesDeleteInstancesDefaultResponse,
  CloudServicesGet200Response,
  CloudServicesGetDefaultResponse,
  CloudServicesGetInstanceView200Response,
  CloudServicesGetInstanceViewDefaultResponse,
  CloudServicesList200Response,
  CloudServicesListAll200Response,
  CloudServicesListAllDefaultResponse,
  CloudServicesListDefaultResponse,
  CloudServicesPowerOff200Response,
  CloudServicesPowerOff202Response,
  CloudServicesPowerOffDefaultResponse,
  CloudServicesRebuild200Response,
  CloudServicesRebuild202Response,
  CloudServicesRebuildDefaultResponse,
  CloudServicesReimage200Response,
  CloudServicesReimage202Response,
  CloudServicesReimageDefaultResponse,
  CloudServicesRestart200Response,
  CloudServicesRestart202Response,
  CloudServicesRestartDefaultResponse,
  CloudServicesStart200Response,
  CloudServicesStart202Response,
  CloudServicesStartDefaultResponse,
  CloudServicesUpdate200Response,
  CloudServicesUpdateDefaultResponse,
  CloudServicesUpdateDomainGetUpdateDomain200Response,
  CloudServicesUpdateDomainGetUpdateDomainDefaultResponse,
  CloudServicesUpdateDomainListUpdateDomains200Response,
  CloudServicesUpdateDomainListUpdateDomainsDefaultResponse,
  CloudServicesUpdateDomainWalkUpdateDomain200Response,
  CloudServicesUpdateDomainWalkUpdateDomain202Response,
  CloudServicesUpdateDomainWalkUpdateDomainDefaultResponse,
  CommunityGalleriesGet200Response,
  CommunityGalleriesGetDefaultResponse,
  CommunityGalleryImageVersionsGet200Response,
  CommunityGalleryImageVersionsGetDefaultResponse,
  CommunityGalleryImageVersionsList200Response,
  CommunityGalleryImageVersionsListDefaultResponse,
  CommunityGalleryImagesGet200Response,
  CommunityGalleryImagesGetDefaultResponse,
  CommunityGalleryImagesList200Response,
  CommunityGalleryImagesListDefaultResponse,
  DedicatedHostGroupsCreateOrUpdate200Response,
  DedicatedHostGroupsCreateOrUpdate201Response,
  DedicatedHostGroupsCreateOrUpdateDefaultResponse,
  DedicatedHostGroupsDelete200Response,
  DedicatedHostGroupsDelete204Response,
  DedicatedHostGroupsDeleteDefaultResponse,
  DedicatedHostGroupsGet200Response,
  DedicatedHostGroupsGetDefaultResponse,
  DedicatedHostGroupsListByResourceGroup200Response,
  DedicatedHostGroupsListByResourceGroupDefaultResponse,
  DedicatedHostGroupsListBySubscription200Response,
  DedicatedHostGroupsListBySubscriptionDefaultResponse,
  DedicatedHostGroupsUpdate200Response,
  DedicatedHostGroupsUpdateDefaultResponse,
  DedicatedHostsCreateOrUpdate200Response,
  DedicatedHostsCreateOrUpdate201Response,
  DedicatedHostsCreateOrUpdateDefaultResponse,
  DedicatedHostsDelete200Response,
  DedicatedHostsDelete202Response,
  DedicatedHostsDelete204Response,
  DedicatedHostsDeleteDefaultResponse,
  DedicatedHostsGet200Response,
  DedicatedHostsGetDefaultResponse,
  DedicatedHostsListByHostGroup200Response,
  DedicatedHostsListByHostGroupDefaultResponse,
  DedicatedHostsRestart200Response,
  DedicatedHostsRestartDefaultResponse,
  DedicatedHostsUpdate200Response,
  DedicatedHostsUpdateDefaultResponse,
  DiskAccessesCreateOrUpdate200Response,
  DiskAccessesCreateOrUpdate202Response,
  DiskAccessesCreateOrUpdateDefaultResponse,
  DiskAccessesDelete200Response,
  DiskAccessesDelete202Response,
  DiskAccessesDelete204Response,
  DiskAccessesDeleteAPrivateEndpointConnection200Response,
  DiskAccessesDeleteAPrivateEndpointConnection202Response,
  DiskAccessesDeleteAPrivateEndpointConnection204Response,
  DiskAccessesDeleteAPrivateEndpointConnectionDefaultResponse,
  DiskAccessesDeleteDefaultResponse,
  DiskAccessesGet200Response,
  DiskAccessesGetAPrivateEndpointConnection200Response,
  DiskAccessesGetAPrivateEndpointConnectionDefaultResponse,
  DiskAccessesGetDefaultResponse,
  DiskAccessesList200Response,
  DiskAccessesListByResourceGroup200Response,
  DiskAccessesListByResourceGroupDefaultResponse,
  DiskAccessesListDefaultResponse,
  DiskAccessesListPrivateEndpointConnections200Response,
  DiskAccessesListPrivateEndpointConnectionsDefaultResponse,
  DiskAccessesUpdate200Response,
  DiskAccessesUpdate202Response,
  DiskAccessesUpdateAPrivateEndpointConnection200Response,
  DiskAccessesUpdateAPrivateEndpointConnection202Response,
  DiskAccessesUpdateAPrivateEndpointConnectionDefaultResponse,
  DiskAccessesUpdateDefaultResponse,
  DiskEncryptionSetsCreateOrUpdate200Response,
  DiskEncryptionSetsCreateOrUpdate202Response,
  DiskEncryptionSetsCreateOrUpdateDefaultResponse,
  DiskEncryptionSetsDelete200Response,
  DiskEncryptionSetsDelete202Response,
  DiskEncryptionSetsDelete204Response,
  DiskEncryptionSetsDeleteDefaultResponse,
  DiskEncryptionSetsGet200Response,
  DiskEncryptionSetsGetDefaultResponse,
  DiskEncryptionSetsList200Response,
  DiskEncryptionSetsListAssociatedResources200Response,
  DiskEncryptionSetsListAssociatedResourcesDefaultResponse,
  DiskEncryptionSetsListByResourceGroup200Response,
  DiskEncryptionSetsListByResourceGroupDefaultResponse,
  DiskEncryptionSetsListDefaultResponse,
  DiskEncryptionSetsUpdate200Response,
  DiskEncryptionSetsUpdate202Response,
  DiskEncryptionSetsUpdateDefaultResponse,
  DiskRestorePointGet200Response,
  DiskRestorePointGetDefaultResponse,
  DiskRestorePointGrantAccess200Response,
  DiskRestorePointGrantAccess202Response,
  DiskRestorePointGrantAccessDefaultResponse,
  DiskRestorePointListByRestorePoint200Response,
  DiskRestorePointListByRestorePointDefaultResponse,
  DiskRestorePointRevokeAccess200Response,
  DiskRestorePointRevokeAccess202Response,
  DiskRestorePointRevokeAccessDefaultResponse,
  GalleriesCreateOrUpdate200Response,
  GalleriesCreateOrUpdate201Response,
  GalleriesCreateOrUpdate202Response,
  GalleriesCreateOrUpdateDefaultResponse,
  GalleriesDelete200Response,
  GalleriesDelete202Response,
  GalleriesDelete204Response,
  GalleriesDeleteDefaultResponse,
  GalleriesGet200Response,
  GalleriesGetDefaultResponse,
  GalleriesList200Response,
  GalleriesListByResourceGroup200Response,
  GalleriesListByResourceGroupDefaultResponse,
  GalleriesListDefaultResponse,
  GalleriesUpdate200Response,
  GalleriesUpdateDefaultResponse,
  GalleryApplicationVersionsCreateOrUpdate200Response,
  GalleryApplicationVersionsCreateOrUpdate201Response,
  GalleryApplicationVersionsCreateOrUpdate202Response,
  GalleryApplicationVersionsCreateOrUpdateDefaultResponse,
  GalleryApplicationVersionsDelete200Response,
  GalleryApplicationVersionsDelete202Response,
  GalleryApplicationVersionsDelete204Response,
  GalleryApplicationVersionsDeleteDefaultResponse,
  GalleryApplicationVersionsGet200Response,
  GalleryApplicationVersionsGetDefaultResponse,
  GalleryApplicationVersionsListByGalleryApplication200Response,
  GalleryApplicationVersionsListByGalleryApplicationDefaultResponse,
  GalleryApplicationVersionsUpdate200Response,
  GalleryApplicationVersionsUpdateDefaultResponse,
  GalleryApplicationsCreateOrUpdate200Response,
  GalleryApplicationsCreateOrUpdate201Response,
  GalleryApplicationsCreateOrUpdate202Response,
  GalleryApplicationsCreateOrUpdateDefaultResponse,
  GalleryApplicationsDelete200Response,
  GalleryApplicationsDelete202Response,
  GalleryApplicationsDelete204Response,
  GalleryApplicationsDeleteDefaultResponse,
  GalleryApplicationsGet200Response,
  GalleryApplicationsGetDefaultResponse,
  GalleryApplicationsListByGallery200Response,
  GalleryApplicationsListByGalleryDefaultResponse,
  GalleryApplicationsUpdate200Response,
  GalleryApplicationsUpdateDefaultResponse,
  GalleryImageVersionsCreateOrUpdate200Response,
  GalleryImageVersionsCreateOrUpdate201Response,
  GalleryImageVersionsCreateOrUpdate202Response,
  GalleryImageVersionsCreateOrUpdateDefaultResponse,
  GalleryImageVersionsDelete200Response,
  GalleryImageVersionsDelete202Response,
  GalleryImageVersionsDelete204Response,
  GalleryImageVersionsDeleteDefaultResponse,
  GalleryImageVersionsGet200Response,
  GalleryImageVersionsGetDefaultResponse,
  GalleryImageVersionsListByGalleryImage200Response,
  GalleryImageVersionsListByGalleryImageDefaultResponse,
  GalleryImageVersionsUpdate200Response,
  GalleryImageVersionsUpdateDefaultResponse,
  GalleryImagesCreateOrUpdate200Response,
  GalleryImagesCreateOrUpdate201Response,
  GalleryImagesCreateOrUpdate202Response,
  GalleryImagesCreateOrUpdateDefaultResponse,
  GalleryImagesDelete200Response,
  GalleryImagesDelete202Response,
  GalleryImagesDelete204Response,
  GalleryImagesDeleteDefaultResponse,
  GalleryImagesGet200Response,
  GalleryImagesGetDefaultResponse,
  GalleryImagesListByGallery200Response,
  GalleryImagesListByGalleryDefaultResponse,
  GalleryImagesUpdate200Response,
  GalleryImagesUpdateDefaultResponse,
  GallerySharingProfileUpdate200Response,
  GallerySharingProfileUpdate202Response,
  GallerySharingProfileUpdateDefaultResponse,
  ImagesCreateOrUpdate200Response,
  ImagesCreateOrUpdate201Response,
  ImagesCreateOrUpdateDefaultResponse,
  ImagesDelete200Response,
  ImagesDelete202Response,
  ImagesDelete204Response,
  ImagesDeleteDefaultResponse,
  ImagesGet200Response,
  ImagesGetDefaultResponse,
  ImagesList200Response,
  ImagesListByResourceGroup200Response,
  ImagesListByResourceGroupDefaultResponse,
  ImagesListDefaultResponse,
  ImagesUpdate200Response,
  ImagesUpdate201Response,
  ImagesUpdateDefaultResponse,
  LogAnalyticsExportRequestRateByInterval200Response,
  LogAnalyticsExportRequestRateByInterval202Response,
  LogAnalyticsExportRequestRateByIntervalDefaultResponse,
  LogAnalyticsExportThrottledRequests200Response,
  LogAnalyticsExportThrottledRequests202Response,
  LogAnalyticsExportThrottledRequestsDefaultResponse,
  OperationsList200Response,
  OperationsListDefaultResponse,
  ProximityPlacementGroupsCreateOrUpdate200Response,
  ProximityPlacementGroupsCreateOrUpdate201Response,
  ProximityPlacementGroupsCreateOrUpdateDefaultResponse,
  ProximityPlacementGroupsDelete200Response,
  ProximityPlacementGroupsDeleteDefaultResponse,
  ProximityPlacementGroupsGet200Response,
  ProximityPlacementGroupsGetDefaultResponse,
  ProximityPlacementGroupsListByResourceGroup200Response,
  ProximityPlacementGroupsListByResourceGroupDefaultResponse,
  ProximityPlacementGroupsListBySubscription200Response,
  ProximityPlacementGroupsListBySubscriptionDefaultResponse,
  ProximityPlacementGroupsUpdate200Response,
  ProximityPlacementGroupsUpdateDefaultResponse,
  RestorePointCollectionsCreateOrUpdate200Response,
  RestorePointCollectionsCreateOrUpdate201Response,
  RestorePointCollectionsCreateOrUpdateDefaultResponse,
  RestorePointCollectionsDelete200Response,
  RestorePointCollectionsDelete202Response,
  RestorePointCollectionsDelete204Response,
  RestorePointCollectionsDeleteDefaultResponse,
  RestorePointCollectionsGet200Response,
  RestorePointCollectionsGetDefaultResponse,
  RestorePointCollectionsList200Response,
  RestorePointCollectionsListAll200Response,
  RestorePointCollectionsListAllDefaultResponse,
  RestorePointCollectionsListDefaultResponse,
  RestorePointCollectionsUpdate200Response,
  RestorePointCollectionsUpdateDefaultResponse,
  RestorePointsCreate201Response,
  RestorePointsCreateDefaultResponse,
  RestorePointsDelete200Response,
  RestorePointsDelete202Response,
  RestorePointsDelete204Response,
  RestorePointsDeleteDefaultResponse,
  RestorePointsGet200Response,
  RestorePointsGetDefaultResponse,
  SharedGalleriesGet200Response,
  SharedGalleriesGetDefaultResponse,
  SharedGalleriesList200Response,
  SharedGalleriesListDefaultResponse,
  SharedGalleryImageVersionsGet200Response,
  SharedGalleryImageVersionsGetDefaultResponse,
  SharedGalleryImageVersionsList200Response,
  SharedGalleryImageVersionsListDefaultResponse,
  SharedGalleryImagesGet200Response,
  SharedGalleryImagesGetDefaultResponse,
  SharedGalleryImagesList200Response,
  SharedGalleryImagesListDefaultResponse,
  SshPublicKeysCreate200Response,
  SshPublicKeysCreate201Response,
  SshPublicKeysCreateDefaultResponse,
  SshPublicKeysDelete200Response,
  SshPublicKeysDelete204Response,
  SshPublicKeysDeleteDefaultResponse,
  SshPublicKeysGenerateKeyPair200Response,
  SshPublicKeysGenerateKeyPairDefaultResponse,
  SshPublicKeysGet200Response,
  SshPublicKeysGetDefaultResponse,
  SshPublicKeysListByResourceGroup200Response,
  SshPublicKeysListByResourceGroupDefaultResponse,
  SshPublicKeysListBySubscription200Response,
  SshPublicKeysListBySubscriptionDefaultResponse,
  SshPublicKeysUpdate200Response,
  SshPublicKeysUpdateDefaultResponse,
  UsageList200Response,
  UsageListDefaultResponse,
  VirtualMachineExtensionImagesGet200Response,
  VirtualMachineExtensionImagesGetDefaultResponse,
  VirtualMachineExtensionImagesListTypes200Response,
  VirtualMachineExtensionImagesListTypesDefaultResponse,
  VirtualMachineExtensionImagesListVersions200Response,
  VirtualMachineExtensionImagesListVersionsDefaultResponse,
  VirtualMachineExtensionsCreateOrUpdate200Response,
  VirtualMachineExtensionsCreateOrUpdate201Response,
  VirtualMachineExtensionsCreateOrUpdateDefaultResponse,
  VirtualMachineExtensionsDelete200Response,
  VirtualMachineExtensionsDelete202Response,
  VirtualMachineExtensionsDelete204Response,
  VirtualMachineExtensionsDeleteDefaultResponse,
  VirtualMachineExtensionsGet200Response,
  VirtualMachineExtensionsGetDefaultResponse,
  VirtualMachineExtensionsList200Response,
  VirtualMachineExtensionsListDefaultResponse,
  VirtualMachineExtensionsUpdate200Response,
  VirtualMachineExtensionsUpdateDefaultResponse,
  VirtualMachineImagesEdgeZoneGet200Response,
  VirtualMachineImagesEdgeZoneGetDefaultResponse,
  VirtualMachineImagesEdgeZoneList200Response,
  VirtualMachineImagesEdgeZoneListDefaultResponse,
  VirtualMachineImagesEdgeZoneListOffers200Response,
  VirtualMachineImagesEdgeZoneListOffersDefaultResponse,
  VirtualMachineImagesEdgeZoneListPublishers200Response,
  VirtualMachineImagesEdgeZoneListPublishersDefaultResponse,
  VirtualMachineImagesEdgeZoneListSkus200Response,
  VirtualMachineImagesEdgeZoneListSkusDefaultResponse,
  VirtualMachineImagesGet200Response,
  VirtualMachineImagesGetDefaultResponse,
  VirtualMachineImagesList200Response,
  VirtualMachineImagesListByEdgeZone200Response,
  VirtualMachineImagesListByEdgeZoneDefaultResponse,
  VirtualMachineImagesListDefaultResponse,
  VirtualMachineImagesListOffers200Response,
  VirtualMachineImagesListOffersDefaultResponse,
  VirtualMachineImagesListPublishers200Response,
  VirtualMachineImagesListPublishersDefaultResponse,
  VirtualMachineImagesListSkus200Response,
  VirtualMachineImagesListSkusDefaultResponse,
  VirtualMachineRunCommandsCreateOrUpdate200Response,
  VirtualMachineRunCommandsCreateOrUpdate201Response,
  VirtualMachineRunCommandsCreateOrUpdateDefaultResponse,
  VirtualMachineRunCommandsDelete200Response,
  VirtualMachineRunCommandsDelete202Response,
  VirtualMachineRunCommandsDelete204Response,
  VirtualMachineRunCommandsDeleteDefaultResponse,
  VirtualMachineRunCommandsGetByVirtualMachine200Response,
  VirtualMachineRunCommandsGetByVirtualMachineDefaultResponse,
  VirtualMachineRunCommandsListByVirtualMachine200Response,
  VirtualMachineRunCommandsListByVirtualMachineDefaultResponse,
  VirtualMachineRunCommandsUpdate200Response,
  VirtualMachineRunCommandsUpdateDefaultResponse,
  VirtualMachineScaleSetExtensionsCreateOrUpdate200Response,
  VirtualMachineScaleSetExtensionsCreateOrUpdate201Response,
  VirtualMachineScaleSetExtensionsCreateOrUpdateDefaultResponse,
  VirtualMachineScaleSetExtensionsDelete200Response,
  VirtualMachineScaleSetExtensionsDelete202Response,
  VirtualMachineScaleSetExtensionsDelete204Response,
  VirtualMachineScaleSetExtensionsDeleteDefaultResponse,
  VirtualMachineScaleSetExtensionsGet200Response,
  VirtualMachineScaleSetExtensionsGetDefaultResponse,
  VirtualMachineScaleSetExtensionsList200Response,
  VirtualMachineScaleSetExtensionsListDefaultResponse,
  VirtualMachineScaleSetExtensionsUpdate200Response,
  VirtualMachineScaleSetExtensionsUpdate201Response,
  VirtualMachineScaleSetExtensionsUpdateDefaultResponse,
  VirtualMachineScaleSetRollingUpgradesCancel200Response,
  VirtualMachineScaleSetRollingUpgradesCancel202Response,
  VirtualMachineScaleSetRollingUpgradesCancelDefaultResponse,
  VirtualMachineScaleSetRollingUpgradesGetLatest200Response,
  VirtualMachineScaleSetRollingUpgradesGetLatestDefaultResponse,
  VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade200Response,
  VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade202Response,
  VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeDefaultResponse,
  VirtualMachineScaleSetRollingUpgradesStartOSUpgrade200Response,
  VirtualMachineScaleSetRollingUpgradesStartOSUpgrade202Response,
  VirtualMachineScaleSetRollingUpgradesStartOSUpgradeDefaultResponse,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdate200Response,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdate201Response,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdateDefaultResponse,
  VirtualMachineScaleSetVMExtensionsDelete200Response,
  VirtualMachineScaleSetVMExtensionsDelete202Response,
  VirtualMachineScaleSetVMExtensionsDelete204Response,
  VirtualMachineScaleSetVMExtensionsDeleteDefaultResponse,
  VirtualMachineScaleSetVMExtensionsGet200Response,
  VirtualMachineScaleSetVMExtensionsGetDefaultResponse,
  VirtualMachineScaleSetVMExtensionsList200Response,
  VirtualMachineScaleSetVMExtensionsListDefaultResponse,
  VirtualMachineScaleSetVMExtensionsUpdate200Response,
  VirtualMachineScaleSetVMExtensionsUpdateDefaultResponse,
  VirtualMachineScaleSetVMRunCommandsCreateOrUpdate200Response,
  VirtualMachineScaleSetVMRunCommandsCreateOrUpdate201Response,
  VirtualMachineScaleSetVMRunCommandsCreateOrUpdateDefaultResponse,
  VirtualMachineScaleSetVMRunCommandsDelete200Response,
  VirtualMachineScaleSetVMRunCommandsDelete202Response,
  VirtualMachineScaleSetVMRunCommandsDelete204Response,
  VirtualMachineScaleSetVMRunCommandsDeleteDefaultResponse,
  VirtualMachineScaleSetVMRunCommandsGet200Response,
  VirtualMachineScaleSetVMRunCommandsGetDefaultResponse,
  VirtualMachineScaleSetVMRunCommandsList200Response,
  VirtualMachineScaleSetVMRunCommandsListDefaultResponse,
  VirtualMachineScaleSetVMRunCommandsUpdate200Response,
  VirtualMachineScaleSetVMRunCommandsUpdateDefaultResponse,
  VirtualMachineScaleSetVMsDeallocate200Response,
  VirtualMachineScaleSetVMsDeallocate202Response,
  VirtualMachineScaleSetVMsDeallocateDefaultResponse,
  VirtualMachineScaleSetVMsDelete200Response,
  VirtualMachineScaleSetVMsDelete202Response,
  VirtualMachineScaleSetVMsDelete204Response,
  VirtualMachineScaleSetVMsDeleteDefaultResponse,
  VirtualMachineScaleSetVMsGet200Response,
  VirtualMachineScaleSetVMsGetDefaultResponse,
  VirtualMachineScaleSetVMsGetInstanceView200Response,
  VirtualMachineScaleSetVMsGetInstanceViewDefaultResponse,
  VirtualMachineScaleSetVMsList200Response,
  VirtualMachineScaleSetVMsListDefaultResponse,
  VirtualMachineScaleSetVMsPerformMaintenance200Response,
  VirtualMachineScaleSetVMsPerformMaintenance202Response,
  VirtualMachineScaleSetVMsPerformMaintenanceDefaultResponse,
  VirtualMachineScaleSetVMsPowerOff200Response,
  VirtualMachineScaleSetVMsPowerOff202Response,
  VirtualMachineScaleSetVMsPowerOffDefaultResponse,
  VirtualMachineScaleSetVMsRedeploy200Response,
  VirtualMachineScaleSetVMsRedeploy202Response,
  VirtualMachineScaleSetVMsRedeployDefaultResponse,
  VirtualMachineScaleSetVMsReimage200Response,
  VirtualMachineScaleSetVMsReimage202Response,
  VirtualMachineScaleSetVMsReimageAll200Response,
  VirtualMachineScaleSetVMsReimageAll202Response,
  VirtualMachineScaleSetVMsReimageAllDefaultResponse,
  VirtualMachineScaleSetVMsReimageDefaultResponse,
  VirtualMachineScaleSetVMsRestart200Response,
  VirtualMachineScaleSetVMsRestart202Response,
  VirtualMachineScaleSetVMsRestartDefaultResponse,
  VirtualMachineScaleSetVMsRetrieveBootDiagnosticsData200Response,
  VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataDefaultResponse,
  VirtualMachineScaleSetVMsSimulateEviction204Response,
  VirtualMachineScaleSetVMsSimulateEvictionDefaultResponse,
  VirtualMachineScaleSetVMsStart200Response,
  VirtualMachineScaleSetVMsStart202Response,
  VirtualMachineScaleSetVMsStartDefaultResponse,
  VirtualMachineScaleSetVMsUpdate200Response,
  VirtualMachineScaleSetVMsUpdate202Response,
  VirtualMachineScaleSetVMsUpdateDefaultResponse,
  VirtualMachineScaleSetsConvertToSinglePlacementGroup200Response,
  VirtualMachineScaleSetsConvertToSinglePlacementGroupDefaultResponse,
  VirtualMachineScaleSetsCreateOrUpdate200Response,
  VirtualMachineScaleSetsCreateOrUpdate201Response,
  VirtualMachineScaleSetsCreateOrUpdateDefaultResponse,
  VirtualMachineScaleSetsDeallocate200Response,
  VirtualMachineScaleSetsDeallocate202Response,
  VirtualMachineScaleSetsDeallocateDefaultResponse,
  VirtualMachineScaleSetsDelete200Response,
  VirtualMachineScaleSetsDelete202Response,
  VirtualMachineScaleSetsDelete204Response,
  VirtualMachineScaleSetsDeleteDefaultResponse,
  VirtualMachineScaleSetsDeleteInstances200Response,
  VirtualMachineScaleSetsDeleteInstances202Response,
  VirtualMachineScaleSetsDeleteInstancesDefaultResponse,
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalk200Response,
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkDefaultResponse,
  VirtualMachineScaleSetsGet200Response,
  VirtualMachineScaleSetsGetDefaultResponse,
  VirtualMachineScaleSetsGetInstanceView200Response,
  VirtualMachineScaleSetsGetInstanceViewDefaultResponse,
  VirtualMachineScaleSetsGetOSUpgradeHistory200Response,
  VirtualMachineScaleSetsGetOSUpgradeHistoryDefaultResponse,
  VirtualMachineScaleSetsList200Response,
  VirtualMachineScaleSetsListAll200Response,
  VirtualMachineScaleSetsListAllDefaultResponse,
  VirtualMachineScaleSetsListByLocation200Response,
  VirtualMachineScaleSetsListByLocationDefaultResponse,
  VirtualMachineScaleSetsListDefaultResponse,
  VirtualMachineScaleSetsListSkus200Response,
  VirtualMachineScaleSetsListSkusDefaultResponse,
  VirtualMachineScaleSetsPerformMaintenance200Response,
  VirtualMachineScaleSetsPerformMaintenance202Response,
  VirtualMachineScaleSetsPerformMaintenanceDefaultResponse,
  VirtualMachineScaleSetsPowerOff200Response,
  VirtualMachineScaleSetsPowerOff202Response,
  VirtualMachineScaleSetsPowerOffDefaultResponse,
  VirtualMachineScaleSetsRedeploy200Response,
  VirtualMachineScaleSetsRedeploy202Response,
  VirtualMachineScaleSetsRedeployDefaultResponse,
  VirtualMachineScaleSetsReimage200Response,
  VirtualMachineScaleSetsReimage202Response,
  VirtualMachineScaleSetsReimageAll200Response,
  VirtualMachineScaleSetsReimageAll202Response,
  VirtualMachineScaleSetsReimageAllDefaultResponse,
  VirtualMachineScaleSetsReimageDefaultResponse,
  VirtualMachineScaleSetsRestart200Response,
  VirtualMachineScaleSetsRestart202Response,
  VirtualMachineScaleSetsRestartDefaultResponse,
  VirtualMachineScaleSetsSetOrchestrationServiceState200Response,
  VirtualMachineScaleSetsSetOrchestrationServiceState202Response,
  VirtualMachineScaleSetsSetOrchestrationServiceStateDefaultResponse,
  VirtualMachineScaleSetsStart200Response,
  VirtualMachineScaleSetsStart202Response,
  VirtualMachineScaleSetsStartDefaultResponse,
  VirtualMachineScaleSetsUpdate200Response,
  VirtualMachineScaleSetsUpdateDefaultResponse,
  VirtualMachineScaleSetsUpdateInstances200Response,
  VirtualMachineScaleSetsUpdateInstances202Response,
  VirtualMachineScaleSetsUpdateInstancesDefaultResponse,
  VirtualMachineSizesList200Response,
  VirtualMachineSizesListDefaultResponse,
  VirtualMachinesAssessPatches200Response,
  VirtualMachinesAssessPatches202Response,
  VirtualMachinesAssessPatchesDefaultResponse,
  VirtualMachinesCapture200Response,
  VirtualMachinesCapture202Response,
  VirtualMachinesCaptureDefaultResponse,
  VirtualMachinesConvertToManagedDisks200Response,
  VirtualMachinesConvertToManagedDisks202Response,
  VirtualMachinesConvertToManagedDisksDefaultResponse,
  VirtualMachinesCreateOrUpdate200Response,
  VirtualMachinesCreateOrUpdate201Response,
  VirtualMachinesCreateOrUpdateDefaultResponse,
  VirtualMachinesDeallocate200Response,
  VirtualMachinesDeallocate202Response,
  VirtualMachinesDeallocateDefaultResponse,
  VirtualMachinesDelete200Response,
  VirtualMachinesDelete202Response,
  VirtualMachinesDelete204Response,
  VirtualMachinesDeleteDefaultResponse,
  VirtualMachinesGeneralize200Response,
  VirtualMachinesGeneralizeDefaultResponse,
  VirtualMachinesGet200Response,
  VirtualMachinesGetDefaultResponse,
  VirtualMachinesInstallPatches200Response,
  VirtualMachinesInstallPatches202Response,
  VirtualMachinesInstallPatchesDefaultResponse,
  VirtualMachinesInstanceView200Response,
  VirtualMachinesInstanceViewDefaultResponse,
  VirtualMachinesList200Response,
  VirtualMachinesListAll200Response,
  VirtualMachinesListAllDefaultResponse,
  VirtualMachinesListAvailableSizes200Response,
  VirtualMachinesListAvailableSizesDefaultResponse,
  VirtualMachinesListByLocation200Response,
  VirtualMachinesListByLocationDefaultResponse,
  VirtualMachinesListDefaultResponse,
  VirtualMachinesPerformMaintenance200Response,
  VirtualMachinesPerformMaintenance202Response,
  VirtualMachinesPerformMaintenanceDefaultResponse,
  VirtualMachinesPowerOff200Response,
  VirtualMachinesPowerOff202Response,
  VirtualMachinesPowerOffDefaultResponse,
  VirtualMachinesReapply200Response,
  VirtualMachinesReapply202Response,
  VirtualMachinesReapplyDefaultResponse,
  VirtualMachinesRedeploy200Response,
  VirtualMachinesRedeploy202Response,
  VirtualMachinesRedeployDefaultResponse,
  VirtualMachinesReimage200Response,
  VirtualMachinesReimage202Response,
  VirtualMachinesReimageDefaultResponse,
  VirtualMachinesRestart200Response,
  VirtualMachinesRestart202Response,
  VirtualMachinesRestartDefaultResponse,
  VirtualMachinesRetrieveBootDiagnosticsData200Response,
  VirtualMachinesRetrieveBootDiagnosticsDataDefaultResponse,
  VirtualMachinesSimulateEviction204Response,
  VirtualMachinesSimulateEvictionDefaultResponse,
  VirtualMachinesStart200Response,
  VirtualMachinesStart202Response,
  VirtualMachinesStartDefaultResponse,
  VirtualMachinesUpdate200Response,
  VirtualMachinesUpdateDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /providers/Microsoft.Compute/operations": ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/usages": [
    "200",
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/vmSizes": [
    "200",
  ],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/virtualMachineScaleSets":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}":
    ["200", "202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/deallocate":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/deallocate":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/delete":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/delete":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/instanceView":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/virtualMachineScaleSets": [
    "200",
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/skus":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osUpgradeHistory":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/poweroff":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/poweroff":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/restart":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/restart":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/start":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/start":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/redeploy":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/redeploy":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/performMaintenance":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/performMaintenance":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimage":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimage":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimageall":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimageall":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/forceRecoveryServiceFabricPlatformUpdateDomainWalk":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/convertToSinglePlacementGroup":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/setOrchestrationServiceState":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/setOrchestrationServiceState":
    ["200", "202"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}":
    ["200", "201"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/cancel":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/cancel":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osRollingUpgrade":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osRollingUpgrade":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensionRollingUpgrade":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensionRollingUpgrade":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/latest":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimage":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimage":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimageall":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimageall":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/deallocate":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/deallocate":
    ["200", "202"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/instanceView":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/poweroff":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/poweroff":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/restart":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/restart":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/start":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/start":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/redeploy":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/redeploy":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/retrieveBootDiagnosticsData":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/performMaintenance":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/performMaintenance":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/simulateEviction":
    ["204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/runCommand":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/runCommand":
    ["200", "202"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/virtualMachines":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/capture":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/capture":
    ["200", "202"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/instanceView":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/convertToManagedDisks":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/convertToManagedDisks":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/deallocate":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/deallocate":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/generalize":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/virtualMachines": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/vmSizes":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reapply":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reapply":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/restart":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/restart":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/start":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/start":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/redeploy":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/redeploy":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reimage":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reimage":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/retrieveBootDiagnosticsData":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/performMaintenance":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/performMaintenance":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/simulateEviction":
    ["204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/assessPatches":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/assessPatches":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/installPatches":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/installPatches":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommand":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommand":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/vmimages":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions/{version}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}":
    ["200", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/availabilitySets": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/vmSizes":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/proximityPlacementGroups": [
    "200",
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}":
    ["200", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/hostGroups": ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}/restart":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}/restart":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/sshPublicKeys": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}":
    ["200", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}/generateKeyPair":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}":
    ["200", "201"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/images": ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/restorePointCollections": [
    "200",
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}":
    ["201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}":
    ["200", "202", "204"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}":
    ["200", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/capacityReservationGroups": [
    "200",
  ],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations":
    ["200"],
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getRequestRateByInterval":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getRequestRateByInterval":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getThrottledRequests":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getThrottledRequests":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands/{commandId}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/disks": ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/beginGetAccess":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/beginGetAccess":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/endGetAccess":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/endGetAccess":
    ["200", "202"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/diskAccesses": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateLinkResources":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/diskEncryptionSets": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}/associatedResources":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/beginGetAccess":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/beginGetAccess":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/endGetAccess":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/endGetAccess":
    ["200", "202"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/snapshots": ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/beginGetAccess":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/beginGetAccess":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/endGetAccess":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/endGetAccess":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/skus": ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}":
    ["200", "201", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/galleries": ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}":
    ["200", "201", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}":
    ["200", "201", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}":
    ["200", "201", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}":
    ["200", "201", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/share":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/share":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}/versions":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}/versions/{galleryImageVersionName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images/{galleryImageName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images/{galleryImageName}/versions":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/instanceView":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/restart":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/restart":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/reimage":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/reimage":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/rebuild":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/rebuild":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/remoteDesktopFile":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roles/{roleName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roles":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}":
    ["200", "202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/instanceView":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/cloudServices": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/start":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/start":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/poweroff":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/poweroff":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/restart":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/restart":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/reimage":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/reimage":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/rebuild":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/rebuild":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/delete":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/delete":
    ["200", "202"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/updateDomains/{updateDomain}":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/updateDomains/{updateDomain}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/updateDomains":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsVersions/{osVersionName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsVersions":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsFamilies/{osFamilyName}":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsFamilies":
    ["200"],
};

export function isUnexpected(
  response: OperationsList200Response | OperationsListDefaultResponse,
): response is OperationsListDefaultResponse;
export function isUnexpected(
  response: UsageList200Response | UsageListDefaultResponse,
): response is UsageListDefaultResponse;
export function isUnexpected(
  response: VirtualMachineSizesList200Response | VirtualMachineSizesListDefaultResponse,
): response is VirtualMachineSizesListDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsListByLocation200Response
    | VirtualMachineScaleSetsListByLocationDefaultResponse,
): response is VirtualMachineScaleSetsListByLocationDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsCreateOrUpdate200Response
    | VirtualMachineScaleSetsCreateOrUpdate201Response
    | VirtualMachineScaleSetsCreateOrUpdateDefaultResponse,
): response is VirtualMachineScaleSetsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: VirtualMachineScaleSetsUpdate200Response | VirtualMachineScaleSetsUpdateDefaultResponse,
): response is VirtualMachineScaleSetsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsDelete200Response
    | VirtualMachineScaleSetsDelete202Response
    | VirtualMachineScaleSetsDelete204Response
    | VirtualMachineScaleSetsDeleteDefaultResponse,
): response is VirtualMachineScaleSetsDeleteDefaultResponse;
export function isUnexpected(
  response: VirtualMachineScaleSetsGet200Response | VirtualMachineScaleSetsGetDefaultResponse,
): response is VirtualMachineScaleSetsGetDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsDeallocate200Response
    | VirtualMachineScaleSetsDeallocate202Response
    | VirtualMachineScaleSetsDeallocateDefaultResponse,
): response is VirtualMachineScaleSetsDeallocateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsDeleteInstances200Response
    | VirtualMachineScaleSetsDeleteInstances202Response
    | VirtualMachineScaleSetsDeleteInstancesDefaultResponse,
): response is VirtualMachineScaleSetsDeleteInstancesDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsGetInstanceView200Response
    | VirtualMachineScaleSetsGetInstanceViewDefaultResponse,
): response is VirtualMachineScaleSetsGetInstanceViewDefaultResponse;
export function isUnexpected(
  response: VirtualMachineScaleSetsList200Response | VirtualMachineScaleSetsListDefaultResponse,
): response is VirtualMachineScaleSetsListDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsListAll200Response
    | VirtualMachineScaleSetsListAllDefaultResponse,
): response is VirtualMachineScaleSetsListAllDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsListSkus200Response
    | VirtualMachineScaleSetsListSkusDefaultResponse,
): response is VirtualMachineScaleSetsListSkusDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsGetOSUpgradeHistory200Response
    | VirtualMachineScaleSetsGetOSUpgradeHistoryDefaultResponse,
): response is VirtualMachineScaleSetsGetOSUpgradeHistoryDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsPowerOff200Response
    | VirtualMachineScaleSetsPowerOff202Response
    | VirtualMachineScaleSetsPowerOffDefaultResponse,
): response is VirtualMachineScaleSetsPowerOffDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsRestart200Response
    | VirtualMachineScaleSetsRestart202Response
    | VirtualMachineScaleSetsRestartDefaultResponse,
): response is VirtualMachineScaleSetsRestartDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsStart200Response
    | VirtualMachineScaleSetsStart202Response
    | VirtualMachineScaleSetsStartDefaultResponse,
): response is VirtualMachineScaleSetsStartDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsRedeploy200Response
    | VirtualMachineScaleSetsRedeploy202Response
    | VirtualMachineScaleSetsRedeployDefaultResponse,
): response is VirtualMachineScaleSetsRedeployDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsPerformMaintenance200Response
    | VirtualMachineScaleSetsPerformMaintenance202Response
    | VirtualMachineScaleSetsPerformMaintenanceDefaultResponse,
): response is VirtualMachineScaleSetsPerformMaintenanceDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsUpdateInstances200Response
    | VirtualMachineScaleSetsUpdateInstances202Response
    | VirtualMachineScaleSetsUpdateInstancesDefaultResponse,
): response is VirtualMachineScaleSetsUpdateInstancesDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsReimage200Response
    | VirtualMachineScaleSetsReimage202Response
    | VirtualMachineScaleSetsReimageDefaultResponse,
): response is VirtualMachineScaleSetsReimageDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsReimageAll200Response
    | VirtualMachineScaleSetsReimageAll202Response
    | VirtualMachineScaleSetsReimageAllDefaultResponse,
): response is VirtualMachineScaleSetsReimageAllDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalk200Response
    | VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkDefaultResponse,
): response is VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsConvertToSinglePlacementGroup200Response
    | VirtualMachineScaleSetsConvertToSinglePlacementGroupDefaultResponse,
): response is VirtualMachineScaleSetsConvertToSinglePlacementGroupDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetsSetOrchestrationServiceState200Response
    | VirtualMachineScaleSetsSetOrchestrationServiceState202Response
    | VirtualMachineScaleSetsSetOrchestrationServiceStateDefaultResponse,
): response is VirtualMachineScaleSetsSetOrchestrationServiceStateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetExtensionsCreateOrUpdate200Response
    | VirtualMachineScaleSetExtensionsCreateOrUpdate201Response
    | VirtualMachineScaleSetExtensionsCreateOrUpdateDefaultResponse,
): response is VirtualMachineScaleSetExtensionsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetExtensionsUpdate200Response
    | VirtualMachineScaleSetExtensionsUpdate201Response
    | VirtualMachineScaleSetExtensionsUpdateDefaultResponse,
): response is VirtualMachineScaleSetExtensionsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetExtensionsDelete200Response
    | VirtualMachineScaleSetExtensionsDelete202Response
    | VirtualMachineScaleSetExtensionsDelete204Response
    | VirtualMachineScaleSetExtensionsDeleteDefaultResponse,
): response is VirtualMachineScaleSetExtensionsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetExtensionsGet200Response
    | VirtualMachineScaleSetExtensionsGetDefaultResponse,
): response is VirtualMachineScaleSetExtensionsGetDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetExtensionsList200Response
    | VirtualMachineScaleSetExtensionsListDefaultResponse,
): response is VirtualMachineScaleSetExtensionsListDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetRollingUpgradesCancel200Response
    | VirtualMachineScaleSetRollingUpgradesCancel202Response
    | VirtualMachineScaleSetRollingUpgradesCancelDefaultResponse,
): response is VirtualMachineScaleSetRollingUpgradesCancelDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgrade200Response
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgrade202Response
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgradeDefaultResponse,
): response is VirtualMachineScaleSetRollingUpgradesStartOSUpgradeDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade200Response
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade202Response
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeDefaultResponse,
): response is VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetRollingUpgradesGetLatest200Response
    | VirtualMachineScaleSetRollingUpgradesGetLatestDefaultResponse,
): response is VirtualMachineScaleSetRollingUpgradesGetLatestDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdate200Response
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdate201Response
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdateDefaultResponse,
): response is VirtualMachineScaleSetVMExtensionsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMExtensionsUpdate200Response
    | VirtualMachineScaleSetVMExtensionsUpdateDefaultResponse,
): response is VirtualMachineScaleSetVMExtensionsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMExtensionsDelete200Response
    | VirtualMachineScaleSetVMExtensionsDelete202Response
    | VirtualMachineScaleSetVMExtensionsDelete204Response
    | VirtualMachineScaleSetVMExtensionsDeleteDefaultResponse,
): response is VirtualMachineScaleSetVMExtensionsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMExtensionsGet200Response
    | VirtualMachineScaleSetVMExtensionsGetDefaultResponse,
): response is VirtualMachineScaleSetVMExtensionsGetDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMExtensionsList200Response
    | VirtualMachineScaleSetVMExtensionsListDefaultResponse,
): response is VirtualMachineScaleSetVMExtensionsListDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsReimage200Response
    | VirtualMachineScaleSetVMsReimage202Response
    | VirtualMachineScaleSetVMsReimageDefaultResponse,
): response is VirtualMachineScaleSetVMsReimageDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsReimageAll200Response
    | VirtualMachineScaleSetVMsReimageAll202Response
    | VirtualMachineScaleSetVMsReimageAllDefaultResponse,
): response is VirtualMachineScaleSetVMsReimageAllDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsDeallocate200Response
    | VirtualMachineScaleSetVMsDeallocate202Response
    | VirtualMachineScaleSetVMsDeallocateDefaultResponse,
): response is VirtualMachineScaleSetVMsDeallocateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsUpdate200Response
    | VirtualMachineScaleSetVMsUpdate202Response
    | VirtualMachineScaleSetVMsUpdateDefaultResponse,
): response is VirtualMachineScaleSetVMsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsDelete200Response
    | VirtualMachineScaleSetVMsDelete202Response
    | VirtualMachineScaleSetVMsDelete204Response
    | VirtualMachineScaleSetVMsDeleteDefaultResponse,
): response is VirtualMachineScaleSetVMsDeleteDefaultResponse;
export function isUnexpected(
  response: VirtualMachineScaleSetVMsGet200Response | VirtualMachineScaleSetVMsGetDefaultResponse,
): response is VirtualMachineScaleSetVMsGetDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsGetInstanceView200Response
    | VirtualMachineScaleSetVMsGetInstanceViewDefaultResponse,
): response is VirtualMachineScaleSetVMsGetInstanceViewDefaultResponse;
export function isUnexpected(
  response: VirtualMachineScaleSetVMsList200Response | VirtualMachineScaleSetVMsListDefaultResponse,
): response is VirtualMachineScaleSetVMsListDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsPowerOff200Response
    | VirtualMachineScaleSetVMsPowerOff202Response
    | VirtualMachineScaleSetVMsPowerOffDefaultResponse,
): response is VirtualMachineScaleSetVMsPowerOffDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsRestart200Response
    | VirtualMachineScaleSetVMsRestart202Response
    | VirtualMachineScaleSetVMsRestartDefaultResponse,
): response is VirtualMachineScaleSetVMsRestartDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsStart200Response
    | VirtualMachineScaleSetVMsStart202Response
    | VirtualMachineScaleSetVMsStartDefaultResponse,
): response is VirtualMachineScaleSetVMsStartDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsRedeploy200Response
    | VirtualMachineScaleSetVMsRedeploy202Response
    | VirtualMachineScaleSetVMsRedeployDefaultResponse,
): response is VirtualMachineScaleSetVMsRedeployDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsRetrieveBootDiagnosticsData200Response
    | VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataDefaultResponse,
): response is VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsPerformMaintenance200Response
    | VirtualMachineScaleSetVMsPerformMaintenance202Response
    | VirtualMachineScaleSetVMsPerformMaintenanceDefaultResponse,
): response is VirtualMachineScaleSetVMsPerformMaintenanceDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMsSimulateEviction204Response
    | VirtualMachineScaleSetVMsSimulateEvictionDefaultResponse,
): response is VirtualMachineScaleSetVMsSimulateEvictionDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionsCreateOrUpdate200Response
    | VirtualMachineExtensionsCreateOrUpdate201Response
    | VirtualMachineExtensionsCreateOrUpdateDefaultResponse,
): response is VirtualMachineExtensionsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionsUpdate200Response
    | VirtualMachineExtensionsUpdateDefaultResponse,
): response is VirtualMachineExtensionsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionsDelete200Response
    | VirtualMachineExtensionsDelete202Response
    | VirtualMachineExtensionsDelete204Response
    | VirtualMachineExtensionsDeleteDefaultResponse,
): response is VirtualMachineExtensionsDeleteDefaultResponse;
export function isUnexpected(
  response: VirtualMachineExtensionsGet200Response | VirtualMachineExtensionsGetDefaultResponse,
): response is VirtualMachineExtensionsGetDefaultResponse;
export function isUnexpected(
  response: VirtualMachineExtensionsList200Response | VirtualMachineExtensionsListDefaultResponse,
): response is VirtualMachineExtensionsListDefaultResponse;
export function isUnexpected(
  response: VirtualMachinesListByLocation200Response | VirtualMachinesListByLocationDefaultResponse,
): response is VirtualMachinesListByLocationDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesCapture200Response
    | VirtualMachinesCapture202Response
    | VirtualMachinesCaptureDefaultResponse,
): response is VirtualMachinesCaptureDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesCreateOrUpdate200Response
    | VirtualMachinesCreateOrUpdate201Response
    | VirtualMachinesCreateOrUpdateDefaultResponse,
): response is VirtualMachinesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: VirtualMachinesUpdate200Response | VirtualMachinesUpdateDefaultResponse,
): response is VirtualMachinesUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesDelete200Response
    | VirtualMachinesDelete202Response
    | VirtualMachinesDelete204Response
    | VirtualMachinesDeleteDefaultResponse,
): response is VirtualMachinesDeleteDefaultResponse;
export function isUnexpected(
  response: VirtualMachinesGet200Response | VirtualMachinesGetDefaultResponse,
): response is VirtualMachinesGetDefaultResponse;
export function isUnexpected(
  response: VirtualMachinesInstanceView200Response | VirtualMachinesInstanceViewDefaultResponse,
): response is VirtualMachinesInstanceViewDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesConvertToManagedDisks200Response
    | VirtualMachinesConvertToManagedDisks202Response
    | VirtualMachinesConvertToManagedDisksDefaultResponse,
): response is VirtualMachinesConvertToManagedDisksDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesDeallocate200Response
    | VirtualMachinesDeallocate202Response
    | VirtualMachinesDeallocateDefaultResponse,
): response is VirtualMachinesDeallocateDefaultResponse;
export function isUnexpected(
  response: VirtualMachinesGeneralize200Response | VirtualMachinesGeneralizeDefaultResponse,
): response is VirtualMachinesGeneralizeDefaultResponse;
export function isUnexpected(
  response: VirtualMachinesList200Response | VirtualMachinesListDefaultResponse,
): response is VirtualMachinesListDefaultResponse;
export function isUnexpected(
  response: VirtualMachinesListAll200Response | VirtualMachinesListAllDefaultResponse,
): response is VirtualMachinesListAllDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesListAvailableSizes200Response
    | VirtualMachinesListAvailableSizesDefaultResponse,
): response is VirtualMachinesListAvailableSizesDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesPowerOff200Response
    | VirtualMachinesPowerOff202Response
    | VirtualMachinesPowerOffDefaultResponse,
): response is VirtualMachinesPowerOffDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesReapply200Response
    | VirtualMachinesReapply202Response
    | VirtualMachinesReapplyDefaultResponse,
): response is VirtualMachinesReapplyDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesRestart200Response
    | VirtualMachinesRestart202Response
    | VirtualMachinesRestartDefaultResponse,
): response is VirtualMachinesRestartDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesStart200Response
    | VirtualMachinesStart202Response
    | VirtualMachinesStartDefaultResponse,
): response is VirtualMachinesStartDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesRedeploy200Response
    | VirtualMachinesRedeploy202Response
    | VirtualMachinesRedeployDefaultResponse,
): response is VirtualMachinesRedeployDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesReimage200Response
    | VirtualMachinesReimage202Response
    | VirtualMachinesReimageDefaultResponse,
): response is VirtualMachinesReimageDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesRetrieveBootDiagnosticsData200Response
    | VirtualMachinesRetrieveBootDiagnosticsDataDefaultResponse,
): response is VirtualMachinesRetrieveBootDiagnosticsDataDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesPerformMaintenance200Response
    | VirtualMachinesPerformMaintenance202Response
    | VirtualMachinesPerformMaintenanceDefaultResponse,
): response is VirtualMachinesPerformMaintenanceDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesSimulateEviction204Response
    | VirtualMachinesSimulateEvictionDefaultResponse,
): response is VirtualMachinesSimulateEvictionDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesAssessPatches200Response
    | VirtualMachinesAssessPatches202Response
    | VirtualMachinesAssessPatchesDefaultResponse,
): response is VirtualMachinesAssessPatchesDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachinesInstallPatches200Response
    | VirtualMachinesInstallPatches202Response
    | VirtualMachinesInstallPatchesDefaultResponse,
): response is VirtualMachinesInstallPatchesDefaultResponse;
export function isUnexpected(
  response: VirtualMachineImagesGet200Response | VirtualMachineImagesGetDefaultResponse,
): response is VirtualMachineImagesGetDefaultResponse;
export function isUnexpected(
  response: VirtualMachineImagesList200Response | VirtualMachineImagesListDefaultResponse,
): response is VirtualMachineImagesListDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesListOffers200Response
    | VirtualMachineImagesListOffersDefaultResponse,
): response is VirtualMachineImagesListOffersDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesListPublishers200Response
    | VirtualMachineImagesListPublishersDefaultResponse,
): response is VirtualMachineImagesListPublishersDefaultResponse;
export function isUnexpected(
  response: VirtualMachineImagesListSkus200Response | VirtualMachineImagesListSkusDefaultResponse,
): response is VirtualMachineImagesListSkusDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesListByEdgeZone200Response
    | VirtualMachineImagesListByEdgeZoneDefaultResponse,
): response is VirtualMachineImagesListByEdgeZoneDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesEdgeZoneGet200Response
    | VirtualMachineImagesEdgeZoneGetDefaultResponse,
): response is VirtualMachineImagesEdgeZoneGetDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesEdgeZoneList200Response
    | VirtualMachineImagesEdgeZoneListDefaultResponse,
): response is VirtualMachineImagesEdgeZoneListDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesEdgeZoneListOffers200Response
    | VirtualMachineImagesEdgeZoneListOffersDefaultResponse,
): response is VirtualMachineImagesEdgeZoneListOffersDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesEdgeZoneListPublishers200Response
    | VirtualMachineImagesEdgeZoneListPublishersDefaultResponse,
): response is VirtualMachineImagesEdgeZoneListPublishersDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineImagesEdgeZoneListSkus200Response
    | VirtualMachineImagesEdgeZoneListSkusDefaultResponse,
): response is VirtualMachineImagesEdgeZoneListSkusDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionImagesGet200Response
    | VirtualMachineExtensionImagesGetDefaultResponse,
): response is VirtualMachineExtensionImagesGetDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionImagesListTypes200Response
    | VirtualMachineExtensionImagesListTypesDefaultResponse,
): response is VirtualMachineExtensionImagesListTypesDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineExtensionImagesListVersions200Response
    | VirtualMachineExtensionImagesListVersionsDefaultResponse,
): response is VirtualMachineExtensionImagesListVersionsDefaultResponse;
export function isUnexpected(
  response:
    | AvailabilitySetsCreateOrUpdate200Response
    | AvailabilitySetsCreateOrUpdateDefaultResponse,
): response is AvailabilitySetsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: AvailabilitySetsUpdate200Response | AvailabilitySetsUpdateDefaultResponse,
): response is AvailabilitySetsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | AvailabilitySetsDelete200Response
    | AvailabilitySetsDelete204Response
    | AvailabilitySetsDeleteDefaultResponse,
): response is AvailabilitySetsDeleteDefaultResponse;
export function isUnexpected(
  response: AvailabilitySetsGet200Response | AvailabilitySetsGetDefaultResponse,
): response is AvailabilitySetsGetDefaultResponse;
export function isUnexpected(
  response:
    | AvailabilitySetsListBySubscription200Response
    | AvailabilitySetsListBySubscriptionDefaultResponse,
): response is AvailabilitySetsListBySubscriptionDefaultResponse;
export function isUnexpected(
  response: AvailabilitySetsList200Response | AvailabilitySetsListDefaultResponse,
): response is AvailabilitySetsListDefaultResponse;
export function isUnexpected(
  response:
    | AvailabilitySetsListAvailableSizes200Response
    | AvailabilitySetsListAvailableSizesDefaultResponse,
): response is AvailabilitySetsListAvailableSizesDefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsCreateOrUpdate200Response
    | ProximityPlacementGroupsCreateOrUpdate201Response
    | ProximityPlacementGroupsCreateOrUpdateDefaultResponse,
): response is ProximityPlacementGroupsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsUpdate200Response
    | ProximityPlacementGroupsUpdateDefaultResponse,
): response is ProximityPlacementGroupsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsDelete200Response
    | ProximityPlacementGroupsDeleteDefaultResponse,
): response is ProximityPlacementGroupsDeleteDefaultResponse;
export function isUnexpected(
  response: ProximityPlacementGroupsGet200Response | ProximityPlacementGroupsGetDefaultResponse,
): response is ProximityPlacementGroupsGetDefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsListBySubscription200Response
    | ProximityPlacementGroupsListBySubscriptionDefaultResponse,
): response is ProximityPlacementGroupsListBySubscriptionDefaultResponse;
export function isUnexpected(
  response:
    | ProximityPlacementGroupsListByResourceGroup200Response
    | ProximityPlacementGroupsListByResourceGroupDefaultResponse,
): response is ProximityPlacementGroupsListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostGroupsCreateOrUpdate200Response
    | DedicatedHostGroupsCreateOrUpdate201Response
    | DedicatedHostGroupsCreateOrUpdateDefaultResponse,
): response is DedicatedHostGroupsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: DedicatedHostGroupsUpdate200Response | DedicatedHostGroupsUpdateDefaultResponse,
): response is DedicatedHostGroupsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostGroupsDelete200Response
    | DedicatedHostGroupsDelete204Response
    | DedicatedHostGroupsDeleteDefaultResponse,
): response is DedicatedHostGroupsDeleteDefaultResponse;
export function isUnexpected(
  response: DedicatedHostGroupsGet200Response | DedicatedHostGroupsGetDefaultResponse,
): response is DedicatedHostGroupsGetDefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostGroupsListByResourceGroup200Response
    | DedicatedHostGroupsListByResourceGroupDefaultResponse,
): response is DedicatedHostGroupsListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostGroupsListBySubscription200Response
    | DedicatedHostGroupsListBySubscriptionDefaultResponse,
): response is DedicatedHostGroupsListBySubscriptionDefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostsCreateOrUpdate200Response
    | DedicatedHostsCreateOrUpdate201Response
    | DedicatedHostsCreateOrUpdateDefaultResponse,
): response is DedicatedHostsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: DedicatedHostsUpdate200Response | DedicatedHostsUpdateDefaultResponse,
): response is DedicatedHostsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | DedicatedHostsDelete200Response
    | DedicatedHostsDelete202Response
    | DedicatedHostsDelete204Response
    | DedicatedHostsDeleteDefaultResponse,
): response is DedicatedHostsDeleteDefaultResponse;
export function isUnexpected(
  response: DedicatedHostsGet200Response | DedicatedHostsGetDefaultResponse,
): response is DedicatedHostsGetDefaultResponse;
export function isUnexpected(
  response: DedicatedHostsListByHostGroup200Response | DedicatedHostsListByHostGroupDefaultResponse,
): response is DedicatedHostsListByHostGroupDefaultResponse;
export function isUnexpected(
  response: DedicatedHostsRestart200Response | DedicatedHostsRestartDefaultResponse,
): response is DedicatedHostsRestartDefaultResponse;
export function isUnexpected(
  response:
    | SshPublicKeysListBySubscription200Response
    | SshPublicKeysListBySubscriptionDefaultResponse,
): response is SshPublicKeysListBySubscriptionDefaultResponse;
export function isUnexpected(
  response:
    | SshPublicKeysListByResourceGroup200Response
    | SshPublicKeysListByResourceGroupDefaultResponse,
): response is SshPublicKeysListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | SshPublicKeysCreate200Response
    | SshPublicKeysCreate201Response
    | SshPublicKeysCreateDefaultResponse,
): response is SshPublicKeysCreateDefaultResponse;
export function isUnexpected(
  response: SshPublicKeysUpdate200Response | SshPublicKeysUpdateDefaultResponse,
): response is SshPublicKeysUpdateDefaultResponse;
export function isUnexpected(
  response:
    | SshPublicKeysDelete200Response
    | SshPublicKeysDelete204Response
    | SshPublicKeysDeleteDefaultResponse,
): response is SshPublicKeysDeleteDefaultResponse;
export function isUnexpected(
  response: SshPublicKeysGet200Response | SshPublicKeysGetDefaultResponse,
): response is SshPublicKeysGetDefaultResponse;
export function isUnexpected(
  response: SshPublicKeysGenerateKeyPair200Response | SshPublicKeysGenerateKeyPairDefaultResponse,
): response is SshPublicKeysGenerateKeyPairDefaultResponse;
export function isUnexpected(
  response:
    | ImagesCreateOrUpdate200Response
    | ImagesCreateOrUpdate201Response
    | ImagesCreateOrUpdateDefaultResponse,
): response is ImagesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: ImagesUpdate200Response | ImagesUpdate201Response | ImagesUpdateDefaultResponse,
): response is ImagesUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ImagesDelete200Response
    | ImagesDelete202Response
    | ImagesDelete204Response
    | ImagesDeleteDefaultResponse,
): response is ImagesDeleteDefaultResponse;
export function isUnexpected(
  response: ImagesGet200Response | ImagesGetDefaultResponse,
): response is ImagesGetDefaultResponse;
export function isUnexpected(
  response: ImagesListByResourceGroup200Response | ImagesListByResourceGroupDefaultResponse,
): response is ImagesListByResourceGroupDefaultResponse;
export function isUnexpected(
  response: ImagesList200Response | ImagesListDefaultResponse,
): response is ImagesListDefaultResponse;
export function isUnexpected(
  response:
    | RestorePointCollectionsCreateOrUpdate200Response
    | RestorePointCollectionsCreateOrUpdate201Response
    | RestorePointCollectionsCreateOrUpdateDefaultResponse,
): response is RestorePointCollectionsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: RestorePointCollectionsUpdate200Response | RestorePointCollectionsUpdateDefaultResponse,
): response is RestorePointCollectionsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | RestorePointCollectionsDelete200Response
    | RestorePointCollectionsDelete202Response
    | RestorePointCollectionsDelete204Response
    | RestorePointCollectionsDeleteDefaultResponse,
): response is RestorePointCollectionsDeleteDefaultResponse;
export function isUnexpected(
  response: RestorePointCollectionsGet200Response | RestorePointCollectionsGetDefaultResponse,
): response is RestorePointCollectionsGetDefaultResponse;
export function isUnexpected(
  response: RestorePointCollectionsList200Response | RestorePointCollectionsListDefaultResponse,
): response is RestorePointCollectionsListDefaultResponse;
export function isUnexpected(
  response:
    | RestorePointCollectionsListAll200Response
    | RestorePointCollectionsListAllDefaultResponse,
): response is RestorePointCollectionsListAllDefaultResponse;
export function isUnexpected(
  response: RestorePointsCreate201Response | RestorePointsCreateDefaultResponse,
): response is RestorePointsCreateDefaultResponse;
export function isUnexpected(
  response:
    | RestorePointsDelete200Response
    | RestorePointsDelete202Response
    | RestorePointsDelete204Response
    | RestorePointsDeleteDefaultResponse,
): response is RestorePointsDeleteDefaultResponse;
export function isUnexpected(
  response: RestorePointsGet200Response | RestorePointsGetDefaultResponse,
): response is RestorePointsGetDefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsCreateOrUpdate200Response
    | CapacityReservationGroupsCreateOrUpdate201Response
    | CapacityReservationGroupsCreateOrUpdateDefaultResponse,
): response is CapacityReservationGroupsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsUpdate200Response
    | CapacityReservationGroupsUpdateDefaultResponse,
): response is CapacityReservationGroupsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsDelete200Response
    | CapacityReservationGroupsDelete204Response
    | CapacityReservationGroupsDeleteDefaultResponse,
): response is CapacityReservationGroupsDeleteDefaultResponse;
export function isUnexpected(
  response: CapacityReservationGroupsGet200Response | CapacityReservationGroupsGetDefaultResponse,
): response is CapacityReservationGroupsGetDefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsListByResourceGroup200Response
    | CapacityReservationGroupsListByResourceGroupDefaultResponse,
): response is CapacityReservationGroupsListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationGroupsListBySubscription200Response
    | CapacityReservationGroupsListBySubscriptionDefaultResponse,
): response is CapacityReservationGroupsListBySubscriptionDefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationsCreateOrUpdate200Response
    | CapacityReservationsCreateOrUpdate201Response
    | CapacityReservationsCreateOrUpdateDefaultResponse,
): response is CapacityReservationsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationsUpdate200Response
    | CapacityReservationsUpdate202Response
    | CapacityReservationsUpdateDefaultResponse,
): response is CapacityReservationsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationsDelete200Response
    | CapacityReservationsDelete202Response
    | CapacityReservationsDelete204Response
    | CapacityReservationsDeleteDefaultResponse,
): response is CapacityReservationsDeleteDefaultResponse;
export function isUnexpected(
  response: CapacityReservationsGet200Response | CapacityReservationsGetDefaultResponse,
): response is CapacityReservationsGetDefaultResponse;
export function isUnexpected(
  response:
    | CapacityReservationsListByCapacityReservationGroup200Response
    | CapacityReservationsListByCapacityReservationGroupDefaultResponse,
): response is CapacityReservationsListByCapacityReservationGroupDefaultResponse;
export function isUnexpected(
  response:
    | LogAnalyticsExportRequestRateByInterval200Response
    | LogAnalyticsExportRequestRateByInterval202Response
    | LogAnalyticsExportRequestRateByIntervalDefaultResponse,
): response is LogAnalyticsExportRequestRateByIntervalDefaultResponse;
export function isUnexpected(
  response:
    | LogAnalyticsExportThrottledRequests200Response
    | LogAnalyticsExportThrottledRequests202Response
    | LogAnalyticsExportThrottledRequestsDefaultResponse,
): response is LogAnalyticsExportThrottledRequestsDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineRunCommandsCreateOrUpdate200Response
    | VirtualMachineRunCommandsCreateOrUpdate201Response
    | VirtualMachineRunCommandsCreateOrUpdateDefaultResponse,
): response is VirtualMachineRunCommandsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineRunCommandsUpdate200Response
    | VirtualMachineRunCommandsUpdateDefaultResponse,
): response is VirtualMachineRunCommandsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineRunCommandsDelete200Response
    | VirtualMachineRunCommandsDelete202Response
    | VirtualMachineRunCommandsDelete204Response
    | VirtualMachineRunCommandsDeleteDefaultResponse,
): response is VirtualMachineRunCommandsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineRunCommandsGetByVirtualMachine200Response
    | VirtualMachineRunCommandsGetByVirtualMachineDefaultResponse,
): response is VirtualMachineRunCommandsGetByVirtualMachineDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineRunCommandsListByVirtualMachine200Response
    | VirtualMachineRunCommandsListByVirtualMachineDefaultResponse,
): response is VirtualMachineRunCommandsListByVirtualMachineDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdate200Response
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdate201Response
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdateDefaultResponse,
): response is VirtualMachineScaleSetVMRunCommandsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMRunCommandsUpdate200Response
    | VirtualMachineScaleSetVMRunCommandsUpdateDefaultResponse,
): response is VirtualMachineScaleSetVMRunCommandsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMRunCommandsDelete200Response
    | VirtualMachineScaleSetVMRunCommandsDelete202Response
    | VirtualMachineScaleSetVMRunCommandsDelete204Response
    | VirtualMachineScaleSetVMRunCommandsDeleteDefaultResponse,
): response is VirtualMachineScaleSetVMRunCommandsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMRunCommandsGet200Response
    | VirtualMachineScaleSetVMRunCommandsGetDefaultResponse,
): response is VirtualMachineScaleSetVMRunCommandsGetDefaultResponse;
export function isUnexpected(
  response:
    | VirtualMachineScaleSetVMRunCommandsList200Response
    | VirtualMachineScaleSetVMRunCommandsListDefaultResponse,
): response is VirtualMachineScaleSetVMRunCommandsListDefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesCreateOrUpdate200Response
    | DiskAccessesCreateOrUpdate202Response
    | DiskAccessesCreateOrUpdateDefaultResponse,
): response is DiskAccessesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesUpdate200Response
    | DiskAccessesUpdate202Response
    | DiskAccessesUpdateDefaultResponse,
): response is DiskAccessesUpdateDefaultResponse;
export function isUnexpected(
  response: DiskAccessesGet200Response | DiskAccessesGetDefaultResponse,
): response is DiskAccessesGetDefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesDelete200Response
    | DiskAccessesDelete202Response
    | DiskAccessesDelete204Response
    | DiskAccessesDeleteDefaultResponse,
): response is DiskAccessesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesListByResourceGroup200Response
    | DiskAccessesListByResourceGroupDefaultResponse,
): response is DiskAccessesListByResourceGroupDefaultResponse;
export function isUnexpected(
  response: DiskAccessesList200Response | DiskAccessesListDefaultResponse,
): response is DiskAccessesListDefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesUpdateAPrivateEndpointConnection200Response
    | DiskAccessesUpdateAPrivateEndpointConnection202Response
    | DiskAccessesUpdateAPrivateEndpointConnectionDefaultResponse,
): response is DiskAccessesUpdateAPrivateEndpointConnectionDefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesGetAPrivateEndpointConnection200Response
    | DiskAccessesGetAPrivateEndpointConnectionDefaultResponse,
): response is DiskAccessesGetAPrivateEndpointConnectionDefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesDeleteAPrivateEndpointConnection200Response
    | DiskAccessesDeleteAPrivateEndpointConnection202Response
    | DiskAccessesDeleteAPrivateEndpointConnection204Response
    | DiskAccessesDeleteAPrivateEndpointConnectionDefaultResponse,
): response is DiskAccessesDeleteAPrivateEndpointConnectionDefaultResponse;
export function isUnexpected(
  response:
    | DiskAccessesListPrivateEndpointConnections200Response
    | DiskAccessesListPrivateEndpointConnectionsDefaultResponse,
): response is DiskAccessesListPrivateEndpointConnectionsDefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsCreateOrUpdate200Response
    | DiskEncryptionSetsCreateOrUpdate202Response
    | DiskEncryptionSetsCreateOrUpdateDefaultResponse,
): response is DiskEncryptionSetsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsUpdate200Response
    | DiskEncryptionSetsUpdate202Response
    | DiskEncryptionSetsUpdateDefaultResponse,
): response is DiskEncryptionSetsUpdateDefaultResponse;
export function isUnexpected(
  response: DiskEncryptionSetsGet200Response | DiskEncryptionSetsGetDefaultResponse,
): response is DiskEncryptionSetsGetDefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsDelete200Response
    | DiskEncryptionSetsDelete202Response
    | DiskEncryptionSetsDelete204Response
    | DiskEncryptionSetsDeleteDefaultResponse,
): response is DiskEncryptionSetsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsListByResourceGroup200Response
    | DiskEncryptionSetsListByResourceGroupDefaultResponse,
): response is DiskEncryptionSetsListByResourceGroupDefaultResponse;
export function isUnexpected(
  response: DiskEncryptionSetsList200Response | DiskEncryptionSetsListDefaultResponse,
): response is DiskEncryptionSetsListDefaultResponse;
export function isUnexpected(
  response:
    | DiskEncryptionSetsListAssociatedResources200Response
    | DiskEncryptionSetsListAssociatedResourcesDefaultResponse,
): response is DiskEncryptionSetsListAssociatedResourcesDefaultResponse;
export function isUnexpected(
  response: DiskRestorePointGet200Response | DiskRestorePointGetDefaultResponse,
): response is DiskRestorePointGetDefaultResponse;
export function isUnexpected(
  response:
    | DiskRestorePointListByRestorePoint200Response
    | DiskRestorePointListByRestorePointDefaultResponse,
): response is DiskRestorePointListByRestorePointDefaultResponse;
export function isUnexpected(
  response:
    | DiskRestorePointGrantAccess200Response
    | DiskRestorePointGrantAccess202Response
    | DiskRestorePointGrantAccessDefaultResponse,
): response is DiskRestorePointGrantAccessDefaultResponse;
export function isUnexpected(
  response:
    | DiskRestorePointRevokeAccess200Response
    | DiskRestorePointRevokeAccess202Response
    | DiskRestorePointRevokeAccessDefaultResponse,
): response is DiskRestorePointRevokeAccessDefaultResponse;
export function isUnexpected(
  response:
    | GalleriesCreateOrUpdate200Response
    | GalleriesCreateOrUpdate201Response
    | GalleriesCreateOrUpdate202Response
    | GalleriesCreateOrUpdateDefaultResponse,
): response is GalleriesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: GalleriesUpdate200Response | GalleriesUpdateDefaultResponse,
): response is GalleriesUpdateDefaultResponse;
export function isUnexpected(
  response: GalleriesGet200Response | GalleriesGetDefaultResponse,
): response is GalleriesGetDefaultResponse;
export function isUnexpected(
  response:
    | GalleriesDelete200Response
    | GalleriesDelete202Response
    | GalleriesDelete204Response
    | GalleriesDeleteDefaultResponse,
): response is GalleriesDeleteDefaultResponse;
export function isUnexpected(
  response: GalleriesListByResourceGroup200Response | GalleriesListByResourceGroupDefaultResponse,
): response is GalleriesListByResourceGroupDefaultResponse;
export function isUnexpected(
  response: GalleriesList200Response | GalleriesListDefaultResponse,
): response is GalleriesListDefaultResponse;
export function isUnexpected(
  response:
    | GalleryImagesCreateOrUpdate200Response
    | GalleryImagesCreateOrUpdate201Response
    | GalleryImagesCreateOrUpdate202Response
    | GalleryImagesCreateOrUpdateDefaultResponse,
): response is GalleryImagesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: GalleryImagesUpdate200Response | GalleryImagesUpdateDefaultResponse,
): response is GalleryImagesUpdateDefaultResponse;
export function isUnexpected(
  response: GalleryImagesGet200Response | GalleryImagesGetDefaultResponse,
): response is GalleryImagesGetDefaultResponse;
export function isUnexpected(
  response:
    | GalleryImagesDelete200Response
    | GalleryImagesDelete202Response
    | GalleryImagesDelete204Response
    | GalleryImagesDeleteDefaultResponse,
): response is GalleryImagesDeleteDefaultResponse;
export function isUnexpected(
  response: GalleryImagesListByGallery200Response | GalleryImagesListByGalleryDefaultResponse,
): response is GalleryImagesListByGalleryDefaultResponse;
export function isUnexpected(
  response:
    | GalleryImageVersionsCreateOrUpdate200Response
    | GalleryImageVersionsCreateOrUpdate201Response
    | GalleryImageVersionsCreateOrUpdate202Response
    | GalleryImageVersionsCreateOrUpdateDefaultResponse,
): response is GalleryImageVersionsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: GalleryImageVersionsUpdate200Response | GalleryImageVersionsUpdateDefaultResponse,
): response is GalleryImageVersionsUpdateDefaultResponse;
export function isUnexpected(
  response: GalleryImageVersionsGet200Response | GalleryImageVersionsGetDefaultResponse,
): response is GalleryImageVersionsGetDefaultResponse;
export function isUnexpected(
  response:
    | GalleryImageVersionsDelete200Response
    | GalleryImageVersionsDelete202Response
    | GalleryImageVersionsDelete204Response
    | GalleryImageVersionsDeleteDefaultResponse,
): response is GalleryImageVersionsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | GalleryImageVersionsListByGalleryImage200Response
    | GalleryImageVersionsListByGalleryImageDefaultResponse,
): response is GalleryImageVersionsListByGalleryImageDefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationsCreateOrUpdate200Response
    | GalleryApplicationsCreateOrUpdate201Response
    | GalleryApplicationsCreateOrUpdate202Response
    | GalleryApplicationsCreateOrUpdateDefaultResponse,
): response is GalleryApplicationsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: GalleryApplicationsUpdate200Response | GalleryApplicationsUpdateDefaultResponse,
): response is GalleryApplicationsUpdateDefaultResponse;
export function isUnexpected(
  response: GalleryApplicationsGet200Response | GalleryApplicationsGetDefaultResponse,
): response is GalleryApplicationsGetDefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationsDelete200Response
    | GalleryApplicationsDelete202Response
    | GalleryApplicationsDelete204Response
    | GalleryApplicationsDeleteDefaultResponse,
): response is GalleryApplicationsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationsListByGallery200Response
    | GalleryApplicationsListByGalleryDefaultResponse,
): response is GalleryApplicationsListByGalleryDefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationVersionsCreateOrUpdate200Response
    | GalleryApplicationVersionsCreateOrUpdate201Response
    | GalleryApplicationVersionsCreateOrUpdate202Response
    | GalleryApplicationVersionsCreateOrUpdateDefaultResponse,
): response is GalleryApplicationVersionsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationVersionsUpdate200Response
    | GalleryApplicationVersionsUpdateDefaultResponse,
): response is GalleryApplicationVersionsUpdateDefaultResponse;
export function isUnexpected(
  response: GalleryApplicationVersionsGet200Response | GalleryApplicationVersionsGetDefaultResponse,
): response is GalleryApplicationVersionsGetDefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationVersionsDelete200Response
    | GalleryApplicationVersionsDelete202Response
    | GalleryApplicationVersionsDelete204Response
    | GalleryApplicationVersionsDeleteDefaultResponse,
): response is GalleryApplicationVersionsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | GalleryApplicationVersionsListByGalleryApplication200Response
    | GalleryApplicationVersionsListByGalleryApplicationDefaultResponse,
): response is GalleryApplicationVersionsListByGalleryApplicationDefaultResponse;
export function isUnexpected(
  response:
    | GallerySharingProfileUpdate200Response
    | GallerySharingProfileUpdate202Response
    | GallerySharingProfileUpdateDefaultResponse,
): response is GallerySharingProfileUpdateDefaultResponse;
export function isUnexpected(
  response: SharedGalleriesList200Response | SharedGalleriesListDefaultResponse,
): response is SharedGalleriesListDefaultResponse;
export function isUnexpected(
  response: SharedGalleriesGet200Response | SharedGalleriesGetDefaultResponse,
): response is SharedGalleriesGetDefaultResponse;
export function isUnexpected(
  response: SharedGalleryImagesList200Response | SharedGalleryImagesListDefaultResponse,
): response is SharedGalleryImagesListDefaultResponse;
export function isUnexpected(
  response: SharedGalleryImagesGet200Response | SharedGalleryImagesGetDefaultResponse,
): response is SharedGalleryImagesGetDefaultResponse;
export function isUnexpected(
  response:
    | SharedGalleryImageVersionsList200Response
    | SharedGalleryImageVersionsListDefaultResponse,
): response is SharedGalleryImageVersionsListDefaultResponse;
export function isUnexpected(
  response: SharedGalleryImageVersionsGet200Response | SharedGalleryImageVersionsGetDefaultResponse,
): response is SharedGalleryImageVersionsGetDefaultResponse;
export function isUnexpected(
  response: CommunityGalleriesGet200Response | CommunityGalleriesGetDefaultResponse,
): response is CommunityGalleriesGetDefaultResponse;
export function isUnexpected(
  response: CommunityGalleryImagesGet200Response | CommunityGalleryImagesGetDefaultResponse,
): response is CommunityGalleryImagesGetDefaultResponse;
export function isUnexpected(
  response: CommunityGalleryImagesList200Response | CommunityGalleryImagesListDefaultResponse,
): response is CommunityGalleryImagesListDefaultResponse;
export function isUnexpected(
  response:
    | CommunityGalleryImageVersionsGet200Response
    | CommunityGalleryImageVersionsGetDefaultResponse,
): response is CommunityGalleryImageVersionsGetDefaultResponse;
export function isUnexpected(
  response:
    | CommunityGalleryImageVersionsList200Response
    | CommunityGalleryImageVersionsListDefaultResponse,
): response is CommunityGalleryImageVersionsListDefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesDelete200Response
    | CloudServiceRoleInstancesDelete202Response
    | CloudServiceRoleInstancesDelete204Response
    | CloudServiceRoleInstancesDeleteDefaultResponse,
): response is CloudServiceRoleInstancesDeleteDefaultResponse;
export function isUnexpected(
  response: CloudServiceRoleInstancesGet200Response | CloudServiceRoleInstancesGetDefaultResponse,
): response is CloudServiceRoleInstancesGetDefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesGetInstanceView200Response
    | CloudServiceRoleInstancesGetInstanceViewDefaultResponse,
): response is CloudServiceRoleInstancesGetInstanceViewDefaultResponse;
export function isUnexpected(
  response: CloudServiceRoleInstancesList200Response | CloudServiceRoleInstancesListDefaultResponse,
): response is CloudServiceRoleInstancesListDefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesRestart200Response
    | CloudServiceRoleInstancesRestart202Response
    | CloudServiceRoleInstancesRestartDefaultResponse,
): response is CloudServiceRoleInstancesRestartDefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesReimage200Response
    | CloudServiceRoleInstancesReimage202Response
    | CloudServiceRoleInstancesReimageDefaultResponse,
): response is CloudServiceRoleInstancesReimageDefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesRebuild200Response
    | CloudServiceRoleInstancesRebuild202Response
    | CloudServiceRoleInstancesRebuildDefaultResponse,
): response is CloudServiceRoleInstancesRebuildDefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceRoleInstancesGetRemoteDesktopFile200Response
    | CloudServiceRoleInstancesGetRemoteDesktopFileDefaultResponse,
): response is CloudServiceRoleInstancesGetRemoteDesktopFileDefaultResponse;
export function isUnexpected(
  response: CloudServiceRolesGet200Response | CloudServiceRolesGetDefaultResponse,
): response is CloudServiceRolesGetDefaultResponse;
export function isUnexpected(
  response: CloudServiceRolesList200Response | CloudServiceRolesListDefaultResponse,
): response is CloudServiceRolesListDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesCreateOrUpdate200Response
    | CloudServicesCreateOrUpdate201Response
    | CloudServicesCreateOrUpdateDefaultResponse,
): response is CloudServicesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: CloudServicesUpdate200Response | CloudServicesUpdateDefaultResponse,
): response is CloudServicesUpdateDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesDelete200Response
    | CloudServicesDelete202Response
    | CloudServicesDelete204Response
    | CloudServicesDeleteDefaultResponse,
): response is CloudServicesDeleteDefaultResponse;
export function isUnexpected(
  response: CloudServicesGet200Response | CloudServicesGetDefaultResponse,
): response is CloudServicesGetDefaultResponse;
export function isUnexpected(
  response: CloudServicesGetInstanceView200Response | CloudServicesGetInstanceViewDefaultResponse,
): response is CloudServicesGetInstanceViewDefaultResponse;
export function isUnexpected(
  response: CloudServicesListAll200Response | CloudServicesListAllDefaultResponse,
): response is CloudServicesListAllDefaultResponse;
export function isUnexpected(
  response: CloudServicesList200Response | CloudServicesListDefaultResponse,
): response is CloudServicesListDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesStart200Response
    | CloudServicesStart202Response
    | CloudServicesStartDefaultResponse,
): response is CloudServicesStartDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesPowerOff200Response
    | CloudServicesPowerOff202Response
    | CloudServicesPowerOffDefaultResponse,
): response is CloudServicesPowerOffDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesRestart200Response
    | CloudServicesRestart202Response
    | CloudServicesRestartDefaultResponse,
): response is CloudServicesRestartDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesReimage200Response
    | CloudServicesReimage202Response
    | CloudServicesReimageDefaultResponse,
): response is CloudServicesReimageDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesRebuild200Response
    | CloudServicesRebuild202Response
    | CloudServicesRebuildDefaultResponse,
): response is CloudServicesRebuildDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesDeleteInstances200Response
    | CloudServicesDeleteInstances202Response
    | CloudServicesDeleteInstancesDefaultResponse,
): response is CloudServicesDeleteInstancesDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesUpdateDomainWalkUpdateDomain200Response
    | CloudServicesUpdateDomainWalkUpdateDomain202Response
    | CloudServicesUpdateDomainWalkUpdateDomainDefaultResponse,
): response is CloudServicesUpdateDomainWalkUpdateDomainDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesUpdateDomainGetUpdateDomain200Response
    | CloudServicesUpdateDomainGetUpdateDomainDefaultResponse,
): response is CloudServicesUpdateDomainGetUpdateDomainDefaultResponse;
export function isUnexpected(
  response:
    | CloudServicesUpdateDomainListUpdateDomains200Response
    | CloudServicesUpdateDomainListUpdateDomainsDefaultResponse,
): response is CloudServicesUpdateDomainListUpdateDomainsDefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceOperatingSystemsGetOSVersion200Response
    | CloudServiceOperatingSystemsGetOSVersionDefaultResponse,
): response is CloudServiceOperatingSystemsGetOSVersionDefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceOperatingSystemsListOSVersions200Response
    | CloudServiceOperatingSystemsListOSVersionsDefaultResponse,
): response is CloudServiceOperatingSystemsListOSVersionsDefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceOperatingSystemsGetOSFamily200Response
    | CloudServiceOperatingSystemsGetOSFamilyDefaultResponse,
): response is CloudServiceOperatingSystemsGetOSFamilyDefaultResponse;
export function isUnexpected(
  response:
    | CloudServiceOperatingSystemsListOSFamilies200Response
    | CloudServiceOperatingSystemsListOSFamiliesDefaultResponse,
): response is CloudServiceOperatingSystemsListOSFamiliesDefaultResponse;
export function isUnexpected(
  response:
    | OperationsList200Response
    | OperationsListDefaultResponse
    | UsageList200Response
    | UsageListDefaultResponse
    | VirtualMachineSizesList200Response
    | VirtualMachineSizesListDefaultResponse
    | VirtualMachineScaleSetsListByLocation200Response
    | VirtualMachineScaleSetsListByLocationDefaultResponse
    | VirtualMachineScaleSetsCreateOrUpdate200Response
    | VirtualMachineScaleSetsCreateOrUpdate201Response
    | VirtualMachineScaleSetsCreateOrUpdateDefaultResponse
    | VirtualMachineScaleSetsUpdate200Response
    | VirtualMachineScaleSetsUpdateDefaultResponse
    | VirtualMachineScaleSetsDelete200Response
    | VirtualMachineScaleSetsDelete202Response
    | VirtualMachineScaleSetsDelete204Response
    | VirtualMachineScaleSetsDeleteDefaultResponse
    | VirtualMachineScaleSetsGet200Response
    | VirtualMachineScaleSetsGetDefaultResponse
    | VirtualMachineScaleSetsDeallocate200Response
    | VirtualMachineScaleSetsDeallocate202Response
    | VirtualMachineScaleSetsDeallocateDefaultResponse
    | VirtualMachineScaleSetsDeleteInstances200Response
    | VirtualMachineScaleSetsDeleteInstances202Response
    | VirtualMachineScaleSetsDeleteInstancesDefaultResponse
    | VirtualMachineScaleSetsGetInstanceView200Response
    | VirtualMachineScaleSetsGetInstanceViewDefaultResponse
    | VirtualMachineScaleSetsList200Response
    | VirtualMachineScaleSetsListDefaultResponse
    | VirtualMachineScaleSetsListAll200Response
    | VirtualMachineScaleSetsListAllDefaultResponse
    | VirtualMachineScaleSetsListSkus200Response
    | VirtualMachineScaleSetsListSkusDefaultResponse
    | VirtualMachineScaleSetsGetOSUpgradeHistory200Response
    | VirtualMachineScaleSetsGetOSUpgradeHistoryDefaultResponse
    | VirtualMachineScaleSetsPowerOff200Response
    | VirtualMachineScaleSetsPowerOff202Response
    | VirtualMachineScaleSetsPowerOffDefaultResponse
    | VirtualMachineScaleSetsRestart200Response
    | VirtualMachineScaleSetsRestart202Response
    | VirtualMachineScaleSetsRestartDefaultResponse
    | VirtualMachineScaleSetsStart200Response
    | VirtualMachineScaleSetsStart202Response
    | VirtualMachineScaleSetsStartDefaultResponse
    | VirtualMachineScaleSetsRedeploy200Response
    | VirtualMachineScaleSetsRedeploy202Response
    | VirtualMachineScaleSetsRedeployDefaultResponse
    | VirtualMachineScaleSetsPerformMaintenance200Response
    | VirtualMachineScaleSetsPerformMaintenance202Response
    | VirtualMachineScaleSetsPerformMaintenanceDefaultResponse
    | VirtualMachineScaleSetsUpdateInstances200Response
    | VirtualMachineScaleSetsUpdateInstances202Response
    | VirtualMachineScaleSetsUpdateInstancesDefaultResponse
    | VirtualMachineScaleSetsReimage200Response
    | VirtualMachineScaleSetsReimage202Response
    | VirtualMachineScaleSetsReimageDefaultResponse
    | VirtualMachineScaleSetsReimageAll200Response
    | VirtualMachineScaleSetsReimageAll202Response
    | VirtualMachineScaleSetsReimageAllDefaultResponse
    | VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalk200Response
    | VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkDefaultResponse
    | VirtualMachineScaleSetsConvertToSinglePlacementGroup200Response
    | VirtualMachineScaleSetsConvertToSinglePlacementGroupDefaultResponse
    | VirtualMachineScaleSetsSetOrchestrationServiceState200Response
    | VirtualMachineScaleSetsSetOrchestrationServiceState202Response
    | VirtualMachineScaleSetsSetOrchestrationServiceStateDefaultResponse
    | VirtualMachineScaleSetExtensionsCreateOrUpdate200Response
    | VirtualMachineScaleSetExtensionsCreateOrUpdate201Response
    | VirtualMachineScaleSetExtensionsCreateOrUpdateDefaultResponse
    | VirtualMachineScaleSetExtensionsUpdate200Response
    | VirtualMachineScaleSetExtensionsUpdate201Response
    | VirtualMachineScaleSetExtensionsUpdateDefaultResponse
    | VirtualMachineScaleSetExtensionsDelete200Response
    | VirtualMachineScaleSetExtensionsDelete202Response
    | VirtualMachineScaleSetExtensionsDelete204Response
    | VirtualMachineScaleSetExtensionsDeleteDefaultResponse
    | VirtualMachineScaleSetExtensionsGet200Response
    | VirtualMachineScaleSetExtensionsGetDefaultResponse
    | VirtualMachineScaleSetExtensionsList200Response
    | VirtualMachineScaleSetExtensionsListDefaultResponse
    | VirtualMachineScaleSetRollingUpgradesCancel200Response
    | VirtualMachineScaleSetRollingUpgradesCancel202Response
    | VirtualMachineScaleSetRollingUpgradesCancelDefaultResponse
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgrade200Response
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgrade202Response
    | VirtualMachineScaleSetRollingUpgradesStartOSUpgradeDefaultResponse
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade200Response
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade202Response
    | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeDefaultResponse
    | VirtualMachineScaleSetRollingUpgradesGetLatest200Response
    | VirtualMachineScaleSetRollingUpgradesGetLatestDefaultResponse
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdate200Response
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdate201Response
    | VirtualMachineScaleSetVMExtensionsCreateOrUpdateDefaultResponse
    | VirtualMachineScaleSetVMExtensionsUpdate200Response
    | VirtualMachineScaleSetVMExtensionsUpdateDefaultResponse
    | VirtualMachineScaleSetVMExtensionsDelete200Response
    | VirtualMachineScaleSetVMExtensionsDelete202Response
    | VirtualMachineScaleSetVMExtensionsDelete204Response
    | VirtualMachineScaleSetVMExtensionsDeleteDefaultResponse
    | VirtualMachineScaleSetVMExtensionsGet200Response
    | VirtualMachineScaleSetVMExtensionsGetDefaultResponse
    | VirtualMachineScaleSetVMExtensionsList200Response
    | VirtualMachineScaleSetVMExtensionsListDefaultResponse
    | VirtualMachineScaleSetVMsReimage200Response
    | VirtualMachineScaleSetVMsReimage202Response
    | VirtualMachineScaleSetVMsReimageDefaultResponse
    | VirtualMachineScaleSetVMsReimageAll200Response
    | VirtualMachineScaleSetVMsReimageAll202Response
    | VirtualMachineScaleSetVMsReimageAllDefaultResponse
    | VirtualMachineScaleSetVMsDeallocate200Response
    | VirtualMachineScaleSetVMsDeallocate202Response
    | VirtualMachineScaleSetVMsDeallocateDefaultResponse
    | VirtualMachineScaleSetVMsUpdate200Response
    | VirtualMachineScaleSetVMsUpdate202Response
    | VirtualMachineScaleSetVMsUpdateDefaultResponse
    | VirtualMachineScaleSetVMsDelete200Response
    | VirtualMachineScaleSetVMsDelete202Response
    | VirtualMachineScaleSetVMsDelete204Response
    | VirtualMachineScaleSetVMsDeleteDefaultResponse
    | VirtualMachineScaleSetVMsGet200Response
    | VirtualMachineScaleSetVMsGetDefaultResponse
    | VirtualMachineScaleSetVMsGetInstanceView200Response
    | VirtualMachineScaleSetVMsGetInstanceViewDefaultResponse
    | VirtualMachineScaleSetVMsList200Response
    | VirtualMachineScaleSetVMsListDefaultResponse
    | VirtualMachineScaleSetVMsPowerOff200Response
    | VirtualMachineScaleSetVMsPowerOff202Response
    | VirtualMachineScaleSetVMsPowerOffDefaultResponse
    | VirtualMachineScaleSetVMsRestart200Response
    | VirtualMachineScaleSetVMsRestart202Response
    | VirtualMachineScaleSetVMsRestartDefaultResponse
    | VirtualMachineScaleSetVMsStart200Response
    | VirtualMachineScaleSetVMsStart202Response
    | VirtualMachineScaleSetVMsStartDefaultResponse
    | VirtualMachineScaleSetVMsRedeploy200Response
    | VirtualMachineScaleSetVMsRedeploy202Response
    | VirtualMachineScaleSetVMsRedeployDefaultResponse
    | VirtualMachineScaleSetVMsRetrieveBootDiagnosticsData200Response
    | VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataDefaultResponse
    | VirtualMachineScaleSetVMsPerformMaintenance200Response
    | VirtualMachineScaleSetVMsPerformMaintenance202Response
    | VirtualMachineScaleSetVMsPerformMaintenanceDefaultResponse
    | VirtualMachineScaleSetVMsSimulateEviction204Response
    | VirtualMachineScaleSetVMsSimulateEvictionDefaultResponse
    | VirtualMachineExtensionsCreateOrUpdate200Response
    | VirtualMachineExtensionsCreateOrUpdate201Response
    | VirtualMachineExtensionsCreateOrUpdateDefaultResponse
    | VirtualMachineExtensionsUpdate200Response
    | VirtualMachineExtensionsUpdateDefaultResponse
    | VirtualMachineExtensionsDelete200Response
    | VirtualMachineExtensionsDelete202Response
    | VirtualMachineExtensionsDelete204Response
    | VirtualMachineExtensionsDeleteDefaultResponse
    | VirtualMachineExtensionsGet200Response
    | VirtualMachineExtensionsGetDefaultResponse
    | VirtualMachineExtensionsList200Response
    | VirtualMachineExtensionsListDefaultResponse
    | VirtualMachinesListByLocation200Response
    | VirtualMachinesListByLocationDefaultResponse
    | VirtualMachinesCapture200Response
    | VirtualMachinesCapture202Response
    | VirtualMachinesCaptureDefaultResponse
    | VirtualMachinesCreateOrUpdate200Response
    | VirtualMachinesCreateOrUpdate201Response
    | VirtualMachinesCreateOrUpdateDefaultResponse
    | VirtualMachinesUpdate200Response
    | VirtualMachinesUpdateDefaultResponse
    | VirtualMachinesDelete200Response
    | VirtualMachinesDelete202Response
    | VirtualMachinesDelete204Response
    | VirtualMachinesDeleteDefaultResponse
    | VirtualMachinesGet200Response
    | VirtualMachinesGetDefaultResponse
    | VirtualMachinesInstanceView200Response
    | VirtualMachinesInstanceViewDefaultResponse
    | VirtualMachinesConvertToManagedDisks200Response
    | VirtualMachinesConvertToManagedDisks202Response
    | VirtualMachinesConvertToManagedDisksDefaultResponse
    | VirtualMachinesDeallocate200Response
    | VirtualMachinesDeallocate202Response
    | VirtualMachinesDeallocateDefaultResponse
    | VirtualMachinesGeneralize200Response
    | VirtualMachinesGeneralizeDefaultResponse
    | VirtualMachinesList200Response
    | VirtualMachinesListDefaultResponse
    | VirtualMachinesListAll200Response
    | VirtualMachinesListAllDefaultResponse
    | VirtualMachinesListAvailableSizes200Response
    | VirtualMachinesListAvailableSizesDefaultResponse
    | VirtualMachinesPowerOff200Response
    | VirtualMachinesPowerOff202Response
    | VirtualMachinesPowerOffDefaultResponse
    | VirtualMachinesReapply200Response
    | VirtualMachinesReapply202Response
    | VirtualMachinesReapplyDefaultResponse
    | VirtualMachinesRestart200Response
    | VirtualMachinesRestart202Response
    | VirtualMachinesRestartDefaultResponse
    | VirtualMachinesStart200Response
    | VirtualMachinesStart202Response
    | VirtualMachinesStartDefaultResponse
    | VirtualMachinesRedeploy200Response
    | VirtualMachinesRedeploy202Response
    | VirtualMachinesRedeployDefaultResponse
    | VirtualMachinesReimage200Response
    | VirtualMachinesReimage202Response
    | VirtualMachinesReimageDefaultResponse
    | VirtualMachinesRetrieveBootDiagnosticsData200Response
    | VirtualMachinesRetrieveBootDiagnosticsDataDefaultResponse
    | VirtualMachinesPerformMaintenance200Response
    | VirtualMachinesPerformMaintenance202Response
    | VirtualMachinesPerformMaintenanceDefaultResponse
    | VirtualMachinesSimulateEviction204Response
    | VirtualMachinesSimulateEvictionDefaultResponse
    | VirtualMachinesAssessPatches200Response
    | VirtualMachinesAssessPatches202Response
    | VirtualMachinesAssessPatchesDefaultResponse
    | VirtualMachinesInstallPatches200Response
    | VirtualMachinesInstallPatches202Response
    | VirtualMachinesInstallPatchesDefaultResponse
    | VirtualMachineImagesGet200Response
    | VirtualMachineImagesGetDefaultResponse
    | VirtualMachineImagesList200Response
    | VirtualMachineImagesListDefaultResponse
    | VirtualMachineImagesListOffers200Response
    | VirtualMachineImagesListOffersDefaultResponse
    | VirtualMachineImagesListPublishers200Response
    | VirtualMachineImagesListPublishersDefaultResponse
    | VirtualMachineImagesListSkus200Response
    | VirtualMachineImagesListSkusDefaultResponse
    | VirtualMachineImagesListByEdgeZone200Response
    | VirtualMachineImagesListByEdgeZoneDefaultResponse
    | VirtualMachineImagesEdgeZoneGet200Response
    | VirtualMachineImagesEdgeZoneGetDefaultResponse
    | VirtualMachineImagesEdgeZoneList200Response
    | VirtualMachineImagesEdgeZoneListDefaultResponse
    | VirtualMachineImagesEdgeZoneListOffers200Response
    | VirtualMachineImagesEdgeZoneListOffersDefaultResponse
    | VirtualMachineImagesEdgeZoneListPublishers200Response
    | VirtualMachineImagesEdgeZoneListPublishersDefaultResponse
    | VirtualMachineImagesEdgeZoneListSkus200Response
    | VirtualMachineImagesEdgeZoneListSkusDefaultResponse
    | VirtualMachineExtensionImagesGet200Response
    | VirtualMachineExtensionImagesGetDefaultResponse
    | VirtualMachineExtensionImagesListTypes200Response
    | VirtualMachineExtensionImagesListTypesDefaultResponse
    | VirtualMachineExtensionImagesListVersions200Response
    | VirtualMachineExtensionImagesListVersionsDefaultResponse
    | AvailabilitySetsCreateOrUpdate200Response
    | AvailabilitySetsCreateOrUpdateDefaultResponse
    | AvailabilitySetsUpdate200Response
    | AvailabilitySetsUpdateDefaultResponse
    | AvailabilitySetsDelete200Response
    | AvailabilitySetsDelete204Response
    | AvailabilitySetsDeleteDefaultResponse
    | AvailabilitySetsGet200Response
    | AvailabilitySetsGetDefaultResponse
    | AvailabilitySetsListBySubscription200Response
    | AvailabilitySetsListBySubscriptionDefaultResponse
    | AvailabilitySetsList200Response
    | AvailabilitySetsListDefaultResponse
    | AvailabilitySetsListAvailableSizes200Response
    | AvailabilitySetsListAvailableSizesDefaultResponse
    | ProximityPlacementGroupsCreateOrUpdate200Response
    | ProximityPlacementGroupsCreateOrUpdate201Response
    | ProximityPlacementGroupsCreateOrUpdateDefaultResponse
    | ProximityPlacementGroupsUpdate200Response
    | ProximityPlacementGroupsUpdateDefaultResponse
    | ProximityPlacementGroupsDelete200Response
    | ProximityPlacementGroupsDeleteDefaultResponse
    | ProximityPlacementGroupsGet200Response
    | ProximityPlacementGroupsGetDefaultResponse
    | ProximityPlacementGroupsListBySubscription200Response
    | ProximityPlacementGroupsListBySubscriptionDefaultResponse
    | ProximityPlacementGroupsListByResourceGroup200Response
    | ProximityPlacementGroupsListByResourceGroupDefaultResponse
    | DedicatedHostGroupsCreateOrUpdate200Response
    | DedicatedHostGroupsCreateOrUpdate201Response
    | DedicatedHostGroupsCreateOrUpdateDefaultResponse
    | DedicatedHostGroupsUpdate200Response
    | DedicatedHostGroupsUpdateDefaultResponse
    | DedicatedHostGroupsDelete200Response
    | DedicatedHostGroupsDelete204Response
    | DedicatedHostGroupsDeleteDefaultResponse
    | DedicatedHostGroupsGet200Response
    | DedicatedHostGroupsGetDefaultResponse
    | DedicatedHostGroupsListByResourceGroup200Response
    | DedicatedHostGroupsListByResourceGroupDefaultResponse
    | DedicatedHostGroupsListBySubscription200Response
    | DedicatedHostGroupsListBySubscriptionDefaultResponse
    | DedicatedHostsCreateOrUpdate200Response
    | DedicatedHostsCreateOrUpdate201Response
    | DedicatedHostsCreateOrUpdateDefaultResponse
    | DedicatedHostsUpdate200Response
    | DedicatedHostsUpdateDefaultResponse
    | DedicatedHostsDelete200Response
    | DedicatedHostsDelete202Response
    | DedicatedHostsDelete204Response
    | DedicatedHostsDeleteDefaultResponse
    | DedicatedHostsGet200Response
    | DedicatedHostsGetDefaultResponse
    | DedicatedHostsListByHostGroup200Response
    | DedicatedHostsListByHostGroupDefaultResponse
    | DedicatedHostsRestart200Response
    | DedicatedHostsRestartDefaultResponse
    | SshPublicKeysListBySubscription200Response
    | SshPublicKeysListBySubscriptionDefaultResponse
    | SshPublicKeysListByResourceGroup200Response
    | SshPublicKeysListByResourceGroupDefaultResponse
    | SshPublicKeysCreate200Response
    | SshPublicKeysCreate201Response
    | SshPublicKeysCreateDefaultResponse
    | SshPublicKeysUpdate200Response
    | SshPublicKeysUpdateDefaultResponse
    | SshPublicKeysDelete200Response
    | SshPublicKeysDelete204Response
    | SshPublicKeysDeleteDefaultResponse
    | SshPublicKeysGet200Response
    | SshPublicKeysGetDefaultResponse
    | SshPublicKeysGenerateKeyPair200Response
    | SshPublicKeysGenerateKeyPairDefaultResponse
    | ImagesCreateOrUpdate200Response
    | ImagesCreateOrUpdate201Response
    | ImagesCreateOrUpdateDefaultResponse
    | ImagesUpdate200Response
    | ImagesUpdate201Response
    | ImagesUpdateDefaultResponse
    | ImagesDelete200Response
    | ImagesDelete202Response
    | ImagesDelete204Response
    | ImagesDeleteDefaultResponse
    | ImagesGet200Response
    | ImagesGetDefaultResponse
    | ImagesListByResourceGroup200Response
    | ImagesListByResourceGroupDefaultResponse
    | ImagesList200Response
    | ImagesListDefaultResponse
    | RestorePointCollectionsCreateOrUpdate200Response
    | RestorePointCollectionsCreateOrUpdate201Response
    | RestorePointCollectionsCreateOrUpdateDefaultResponse
    | RestorePointCollectionsUpdate200Response
    | RestorePointCollectionsUpdateDefaultResponse
    | RestorePointCollectionsDelete200Response
    | RestorePointCollectionsDelete202Response
    | RestorePointCollectionsDelete204Response
    | RestorePointCollectionsDeleteDefaultResponse
    | RestorePointCollectionsGet200Response
    | RestorePointCollectionsGetDefaultResponse
    | RestorePointCollectionsList200Response
    | RestorePointCollectionsListDefaultResponse
    | RestorePointCollectionsListAll200Response
    | RestorePointCollectionsListAllDefaultResponse
    | RestorePointsCreate201Response
    | RestorePointsCreateDefaultResponse
    | RestorePointsDelete200Response
    | RestorePointsDelete202Response
    | RestorePointsDelete204Response
    | RestorePointsDeleteDefaultResponse
    | RestorePointsGet200Response
    | RestorePointsGetDefaultResponse
    | CapacityReservationGroupsCreateOrUpdate200Response
    | CapacityReservationGroupsCreateOrUpdate201Response
    | CapacityReservationGroupsCreateOrUpdateDefaultResponse
    | CapacityReservationGroupsUpdate200Response
    | CapacityReservationGroupsUpdateDefaultResponse
    | CapacityReservationGroupsDelete200Response
    | CapacityReservationGroupsDelete204Response
    | CapacityReservationGroupsDeleteDefaultResponse
    | CapacityReservationGroupsGet200Response
    | CapacityReservationGroupsGetDefaultResponse
    | CapacityReservationGroupsListByResourceGroup200Response
    | CapacityReservationGroupsListByResourceGroupDefaultResponse
    | CapacityReservationGroupsListBySubscription200Response
    | CapacityReservationGroupsListBySubscriptionDefaultResponse
    | CapacityReservationsCreateOrUpdate200Response
    | CapacityReservationsCreateOrUpdate201Response
    | CapacityReservationsCreateOrUpdateDefaultResponse
    | CapacityReservationsUpdate200Response
    | CapacityReservationsUpdate202Response
    | CapacityReservationsUpdateDefaultResponse
    | CapacityReservationsDelete200Response
    | CapacityReservationsDelete202Response
    | CapacityReservationsDelete204Response
    | CapacityReservationsDeleteDefaultResponse
    | CapacityReservationsGet200Response
    | CapacityReservationsGetDefaultResponse
    | CapacityReservationsListByCapacityReservationGroup200Response
    | CapacityReservationsListByCapacityReservationGroupDefaultResponse
    | LogAnalyticsExportRequestRateByInterval200Response
    | LogAnalyticsExportRequestRateByInterval202Response
    | LogAnalyticsExportRequestRateByIntervalDefaultResponse
    | LogAnalyticsExportThrottledRequests200Response
    | LogAnalyticsExportThrottledRequests202Response
    | LogAnalyticsExportThrottledRequestsDefaultResponse
    | VirtualMachineRunCommandsCreateOrUpdate200Response
    | VirtualMachineRunCommandsCreateOrUpdate201Response
    | VirtualMachineRunCommandsCreateOrUpdateDefaultResponse
    | VirtualMachineRunCommandsUpdate200Response
    | VirtualMachineRunCommandsUpdateDefaultResponse
    | VirtualMachineRunCommandsDelete200Response
    | VirtualMachineRunCommandsDelete202Response
    | VirtualMachineRunCommandsDelete204Response
    | VirtualMachineRunCommandsDeleteDefaultResponse
    | VirtualMachineRunCommandsGetByVirtualMachine200Response
    | VirtualMachineRunCommandsGetByVirtualMachineDefaultResponse
    | VirtualMachineRunCommandsListByVirtualMachine200Response
    | VirtualMachineRunCommandsListByVirtualMachineDefaultResponse
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdate200Response
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdate201Response
    | VirtualMachineScaleSetVMRunCommandsCreateOrUpdateDefaultResponse
    | VirtualMachineScaleSetVMRunCommandsUpdate200Response
    | VirtualMachineScaleSetVMRunCommandsUpdateDefaultResponse
    | VirtualMachineScaleSetVMRunCommandsDelete200Response
    | VirtualMachineScaleSetVMRunCommandsDelete202Response
    | VirtualMachineScaleSetVMRunCommandsDelete204Response
    | VirtualMachineScaleSetVMRunCommandsDeleteDefaultResponse
    | VirtualMachineScaleSetVMRunCommandsGet200Response
    | VirtualMachineScaleSetVMRunCommandsGetDefaultResponse
    | VirtualMachineScaleSetVMRunCommandsList200Response
    | VirtualMachineScaleSetVMRunCommandsListDefaultResponse
    | DiskAccessesCreateOrUpdate200Response
    | DiskAccessesCreateOrUpdate202Response
    | DiskAccessesCreateOrUpdateDefaultResponse
    | DiskAccessesUpdate200Response
    | DiskAccessesUpdate202Response
    | DiskAccessesUpdateDefaultResponse
    | DiskAccessesGet200Response
    | DiskAccessesGetDefaultResponse
    | DiskAccessesDelete200Response
    | DiskAccessesDelete202Response
    | DiskAccessesDelete204Response
    | DiskAccessesDeleteDefaultResponse
    | DiskAccessesListByResourceGroup200Response
    | DiskAccessesListByResourceGroupDefaultResponse
    | DiskAccessesList200Response
    | DiskAccessesListDefaultResponse
    | DiskAccessesUpdateAPrivateEndpointConnection200Response
    | DiskAccessesUpdateAPrivateEndpointConnection202Response
    | DiskAccessesUpdateAPrivateEndpointConnectionDefaultResponse
    | DiskAccessesGetAPrivateEndpointConnection200Response
    | DiskAccessesGetAPrivateEndpointConnectionDefaultResponse
    | DiskAccessesDeleteAPrivateEndpointConnection200Response
    | DiskAccessesDeleteAPrivateEndpointConnection202Response
    | DiskAccessesDeleteAPrivateEndpointConnection204Response
    | DiskAccessesDeleteAPrivateEndpointConnectionDefaultResponse
    | DiskAccessesListPrivateEndpointConnections200Response
    | DiskAccessesListPrivateEndpointConnectionsDefaultResponse
    | DiskEncryptionSetsCreateOrUpdate200Response
    | DiskEncryptionSetsCreateOrUpdate202Response
    | DiskEncryptionSetsCreateOrUpdateDefaultResponse
    | DiskEncryptionSetsUpdate200Response
    | DiskEncryptionSetsUpdate202Response
    | DiskEncryptionSetsUpdateDefaultResponse
    | DiskEncryptionSetsGet200Response
    | DiskEncryptionSetsGetDefaultResponse
    | DiskEncryptionSetsDelete200Response
    | DiskEncryptionSetsDelete202Response
    | DiskEncryptionSetsDelete204Response
    | DiskEncryptionSetsDeleteDefaultResponse
    | DiskEncryptionSetsListByResourceGroup200Response
    | DiskEncryptionSetsListByResourceGroupDefaultResponse
    | DiskEncryptionSetsList200Response
    | DiskEncryptionSetsListDefaultResponse
    | DiskEncryptionSetsListAssociatedResources200Response
    | DiskEncryptionSetsListAssociatedResourcesDefaultResponse
    | DiskRestorePointGet200Response
    | DiskRestorePointGetDefaultResponse
    | DiskRestorePointListByRestorePoint200Response
    | DiskRestorePointListByRestorePointDefaultResponse
    | DiskRestorePointGrantAccess200Response
    | DiskRestorePointGrantAccess202Response
    | DiskRestorePointGrantAccessDefaultResponse
    | DiskRestorePointRevokeAccess200Response
    | DiskRestorePointRevokeAccess202Response
    | DiskRestorePointRevokeAccessDefaultResponse
    | GalleriesCreateOrUpdate200Response
    | GalleriesCreateOrUpdate201Response
    | GalleriesCreateOrUpdate202Response
    | GalleriesCreateOrUpdateDefaultResponse
    | GalleriesUpdate200Response
    | GalleriesUpdateDefaultResponse
    | GalleriesGet200Response
    | GalleriesGetDefaultResponse
    | GalleriesDelete200Response
    | GalleriesDelete202Response
    | GalleriesDelete204Response
    | GalleriesDeleteDefaultResponse
    | GalleriesListByResourceGroup200Response
    | GalleriesListByResourceGroupDefaultResponse
    | GalleriesList200Response
    | GalleriesListDefaultResponse
    | GalleryImagesCreateOrUpdate200Response
    | GalleryImagesCreateOrUpdate201Response
    | GalleryImagesCreateOrUpdate202Response
    | GalleryImagesCreateOrUpdateDefaultResponse
    | GalleryImagesUpdate200Response
    | GalleryImagesUpdateDefaultResponse
    | GalleryImagesGet200Response
    | GalleryImagesGetDefaultResponse
    | GalleryImagesDelete200Response
    | GalleryImagesDelete202Response
    | GalleryImagesDelete204Response
    | GalleryImagesDeleteDefaultResponse
    | GalleryImagesListByGallery200Response
    | GalleryImagesListByGalleryDefaultResponse
    | GalleryImageVersionsCreateOrUpdate200Response
    | GalleryImageVersionsCreateOrUpdate201Response
    | GalleryImageVersionsCreateOrUpdate202Response
    | GalleryImageVersionsCreateOrUpdateDefaultResponse
    | GalleryImageVersionsUpdate200Response
    | GalleryImageVersionsUpdateDefaultResponse
    | GalleryImageVersionsGet200Response
    | GalleryImageVersionsGetDefaultResponse
    | GalleryImageVersionsDelete200Response
    | GalleryImageVersionsDelete202Response
    | GalleryImageVersionsDelete204Response
    | GalleryImageVersionsDeleteDefaultResponse
    | GalleryImageVersionsListByGalleryImage200Response
    | GalleryImageVersionsListByGalleryImageDefaultResponse
    | GalleryApplicationsCreateOrUpdate200Response
    | GalleryApplicationsCreateOrUpdate201Response
    | GalleryApplicationsCreateOrUpdate202Response
    | GalleryApplicationsCreateOrUpdateDefaultResponse
    | GalleryApplicationsUpdate200Response
    | GalleryApplicationsUpdateDefaultResponse
    | GalleryApplicationsGet200Response
    | GalleryApplicationsGetDefaultResponse
    | GalleryApplicationsDelete200Response
    | GalleryApplicationsDelete202Response
    | GalleryApplicationsDelete204Response
    | GalleryApplicationsDeleteDefaultResponse
    | GalleryApplicationsListByGallery200Response
    | GalleryApplicationsListByGalleryDefaultResponse
    | GalleryApplicationVersionsCreateOrUpdate200Response
    | GalleryApplicationVersionsCreateOrUpdate201Response
    | GalleryApplicationVersionsCreateOrUpdate202Response
    | GalleryApplicationVersionsCreateOrUpdateDefaultResponse
    | GalleryApplicationVersionsUpdate200Response
    | GalleryApplicationVersionsUpdateDefaultResponse
    | GalleryApplicationVersionsGet200Response
    | GalleryApplicationVersionsGetDefaultResponse
    | GalleryApplicationVersionsDelete200Response
    | GalleryApplicationVersionsDelete202Response
    | GalleryApplicationVersionsDelete204Response
    | GalleryApplicationVersionsDeleteDefaultResponse
    | GalleryApplicationVersionsListByGalleryApplication200Response
    | GalleryApplicationVersionsListByGalleryApplicationDefaultResponse
    | GallerySharingProfileUpdate200Response
    | GallerySharingProfileUpdate202Response
    | GallerySharingProfileUpdateDefaultResponse
    | SharedGalleriesList200Response
    | SharedGalleriesListDefaultResponse
    | SharedGalleriesGet200Response
    | SharedGalleriesGetDefaultResponse
    | SharedGalleryImagesList200Response
    | SharedGalleryImagesListDefaultResponse
    | SharedGalleryImagesGet200Response
    | SharedGalleryImagesGetDefaultResponse
    | SharedGalleryImageVersionsList200Response
    | SharedGalleryImageVersionsListDefaultResponse
    | SharedGalleryImageVersionsGet200Response
    | SharedGalleryImageVersionsGetDefaultResponse
    | CommunityGalleriesGet200Response
    | CommunityGalleriesGetDefaultResponse
    | CommunityGalleryImagesGet200Response
    | CommunityGalleryImagesGetDefaultResponse
    | CommunityGalleryImagesList200Response
    | CommunityGalleryImagesListDefaultResponse
    | CommunityGalleryImageVersionsGet200Response
    | CommunityGalleryImageVersionsGetDefaultResponse
    | CommunityGalleryImageVersionsList200Response
    | CommunityGalleryImageVersionsListDefaultResponse
    | CloudServiceRoleInstancesDelete200Response
    | CloudServiceRoleInstancesDelete202Response
    | CloudServiceRoleInstancesDelete204Response
    | CloudServiceRoleInstancesDeleteDefaultResponse
    | CloudServiceRoleInstancesGet200Response
    | CloudServiceRoleInstancesGetDefaultResponse
    | CloudServiceRoleInstancesGetInstanceView200Response
    | CloudServiceRoleInstancesGetInstanceViewDefaultResponse
    | CloudServiceRoleInstancesList200Response
    | CloudServiceRoleInstancesListDefaultResponse
    | CloudServiceRoleInstancesRestart200Response
    | CloudServiceRoleInstancesRestart202Response
    | CloudServiceRoleInstancesRestartDefaultResponse
    | CloudServiceRoleInstancesReimage200Response
    | CloudServiceRoleInstancesReimage202Response
    | CloudServiceRoleInstancesReimageDefaultResponse
    | CloudServiceRoleInstancesRebuild200Response
    | CloudServiceRoleInstancesRebuild202Response
    | CloudServiceRoleInstancesRebuildDefaultResponse
    | CloudServiceRoleInstancesGetRemoteDesktopFile200Response
    | CloudServiceRoleInstancesGetRemoteDesktopFileDefaultResponse
    | CloudServiceRolesGet200Response
    | CloudServiceRolesGetDefaultResponse
    | CloudServiceRolesList200Response
    | CloudServiceRolesListDefaultResponse
    | CloudServicesCreateOrUpdate200Response
    | CloudServicesCreateOrUpdate201Response
    | CloudServicesCreateOrUpdateDefaultResponse
    | CloudServicesUpdate200Response
    | CloudServicesUpdateDefaultResponse
    | CloudServicesDelete200Response
    | CloudServicesDelete202Response
    | CloudServicesDelete204Response
    | CloudServicesDeleteDefaultResponse
    | CloudServicesGet200Response
    | CloudServicesGetDefaultResponse
    | CloudServicesGetInstanceView200Response
    | CloudServicesGetInstanceViewDefaultResponse
    | CloudServicesListAll200Response
    | CloudServicesListAllDefaultResponse
    | CloudServicesList200Response
    | CloudServicesListDefaultResponse
    | CloudServicesStart200Response
    | CloudServicesStart202Response
    | CloudServicesStartDefaultResponse
    | CloudServicesPowerOff200Response
    | CloudServicesPowerOff202Response
    | CloudServicesPowerOffDefaultResponse
    | CloudServicesRestart200Response
    | CloudServicesRestart202Response
    | CloudServicesRestartDefaultResponse
    | CloudServicesReimage200Response
    | CloudServicesReimage202Response
    | CloudServicesReimageDefaultResponse
    | CloudServicesRebuild200Response
    | CloudServicesRebuild202Response
    | CloudServicesRebuildDefaultResponse
    | CloudServicesDeleteInstances200Response
    | CloudServicesDeleteInstances202Response
    | CloudServicesDeleteInstancesDefaultResponse
    | CloudServicesUpdateDomainWalkUpdateDomain200Response
    | CloudServicesUpdateDomainWalkUpdateDomain202Response
    | CloudServicesUpdateDomainWalkUpdateDomainDefaultResponse
    | CloudServicesUpdateDomainGetUpdateDomain200Response
    | CloudServicesUpdateDomainGetUpdateDomainDefaultResponse
    | CloudServicesUpdateDomainListUpdateDomains200Response
    | CloudServicesUpdateDomainListUpdateDomainsDefaultResponse
    | CloudServiceOperatingSystemsGetOSVersion200Response
    | CloudServiceOperatingSystemsGetOSVersionDefaultResponse
    | CloudServiceOperatingSystemsListOSVersions200Response
    | CloudServiceOperatingSystemsListOSVersionsDefaultResponse
    | CloudServiceOperatingSystemsGetOSFamily200Response
    | CloudServiceOperatingSystemsGetOSFamilyDefaultResponse
    | CloudServiceOperatingSystemsListOSFamilies200Response
    | CloudServiceOperatingSystemsListOSFamiliesDefaultResponse,
): response is
  | OperationsListDefaultResponse
  | UsageListDefaultResponse
  | VirtualMachineSizesListDefaultResponse
  | VirtualMachineScaleSetsListByLocationDefaultResponse
  | VirtualMachineScaleSetsCreateOrUpdateDefaultResponse
  | VirtualMachineScaleSetsUpdateDefaultResponse
  | VirtualMachineScaleSetsDeleteDefaultResponse
  | VirtualMachineScaleSetsGetDefaultResponse
  | VirtualMachineScaleSetsDeallocateDefaultResponse
  | VirtualMachineScaleSetsDeleteInstancesDefaultResponse
  | VirtualMachineScaleSetsGetInstanceViewDefaultResponse
  | VirtualMachineScaleSetsListDefaultResponse
  | VirtualMachineScaleSetsListAllDefaultResponse
  | VirtualMachineScaleSetsListSkusDefaultResponse
  | VirtualMachineScaleSetsGetOSUpgradeHistoryDefaultResponse
  | VirtualMachineScaleSetsPowerOffDefaultResponse
  | VirtualMachineScaleSetsRestartDefaultResponse
  | VirtualMachineScaleSetsStartDefaultResponse
  | VirtualMachineScaleSetsRedeployDefaultResponse
  | VirtualMachineScaleSetsPerformMaintenanceDefaultResponse
  | VirtualMachineScaleSetsUpdateInstancesDefaultResponse
  | VirtualMachineScaleSetsReimageDefaultResponse
  | VirtualMachineScaleSetsReimageAllDefaultResponse
  | VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkDefaultResponse
  | VirtualMachineScaleSetsConvertToSinglePlacementGroupDefaultResponse
  | VirtualMachineScaleSetsSetOrchestrationServiceStateDefaultResponse
  | VirtualMachineScaleSetExtensionsCreateOrUpdateDefaultResponse
  | VirtualMachineScaleSetExtensionsUpdateDefaultResponse
  | VirtualMachineScaleSetExtensionsDeleteDefaultResponse
  | VirtualMachineScaleSetExtensionsGetDefaultResponse
  | VirtualMachineScaleSetExtensionsListDefaultResponse
  | VirtualMachineScaleSetRollingUpgradesCancelDefaultResponse
  | VirtualMachineScaleSetRollingUpgradesStartOSUpgradeDefaultResponse
  | VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeDefaultResponse
  | VirtualMachineScaleSetRollingUpgradesGetLatestDefaultResponse
  | VirtualMachineScaleSetVMExtensionsCreateOrUpdateDefaultResponse
  | VirtualMachineScaleSetVMExtensionsUpdateDefaultResponse
  | VirtualMachineScaleSetVMExtensionsDeleteDefaultResponse
  | VirtualMachineScaleSetVMExtensionsGetDefaultResponse
  | VirtualMachineScaleSetVMExtensionsListDefaultResponse
  | VirtualMachineScaleSetVMsReimageDefaultResponse
  | VirtualMachineScaleSetVMsReimageAllDefaultResponse
  | VirtualMachineScaleSetVMsDeallocateDefaultResponse
  | VirtualMachineScaleSetVMsUpdateDefaultResponse
  | VirtualMachineScaleSetVMsDeleteDefaultResponse
  | VirtualMachineScaleSetVMsGetDefaultResponse
  | VirtualMachineScaleSetVMsGetInstanceViewDefaultResponse
  | VirtualMachineScaleSetVMsListDefaultResponse
  | VirtualMachineScaleSetVMsPowerOffDefaultResponse
  | VirtualMachineScaleSetVMsRestartDefaultResponse
  | VirtualMachineScaleSetVMsStartDefaultResponse
  | VirtualMachineScaleSetVMsRedeployDefaultResponse
  | VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataDefaultResponse
  | VirtualMachineScaleSetVMsPerformMaintenanceDefaultResponse
  | VirtualMachineScaleSetVMsSimulateEvictionDefaultResponse
  | VirtualMachineExtensionsCreateOrUpdateDefaultResponse
  | VirtualMachineExtensionsUpdateDefaultResponse
  | VirtualMachineExtensionsDeleteDefaultResponse
  | VirtualMachineExtensionsGetDefaultResponse
  | VirtualMachineExtensionsListDefaultResponse
  | VirtualMachinesListByLocationDefaultResponse
  | VirtualMachinesCaptureDefaultResponse
  | VirtualMachinesCreateOrUpdateDefaultResponse
  | VirtualMachinesUpdateDefaultResponse
  | VirtualMachinesDeleteDefaultResponse
  | VirtualMachinesGetDefaultResponse
  | VirtualMachinesInstanceViewDefaultResponse
  | VirtualMachinesConvertToManagedDisksDefaultResponse
  | VirtualMachinesDeallocateDefaultResponse
  | VirtualMachinesGeneralizeDefaultResponse
  | VirtualMachinesListDefaultResponse
  | VirtualMachinesListAllDefaultResponse
  | VirtualMachinesListAvailableSizesDefaultResponse
  | VirtualMachinesPowerOffDefaultResponse
  | VirtualMachinesReapplyDefaultResponse
  | VirtualMachinesRestartDefaultResponse
  | VirtualMachinesStartDefaultResponse
  | VirtualMachinesRedeployDefaultResponse
  | VirtualMachinesReimageDefaultResponse
  | VirtualMachinesRetrieveBootDiagnosticsDataDefaultResponse
  | VirtualMachinesPerformMaintenanceDefaultResponse
  | VirtualMachinesSimulateEvictionDefaultResponse
  | VirtualMachinesAssessPatchesDefaultResponse
  | VirtualMachinesInstallPatchesDefaultResponse
  | VirtualMachineImagesGetDefaultResponse
  | VirtualMachineImagesListDefaultResponse
  | VirtualMachineImagesListOffersDefaultResponse
  | VirtualMachineImagesListPublishersDefaultResponse
  | VirtualMachineImagesListSkusDefaultResponse
  | VirtualMachineImagesListByEdgeZoneDefaultResponse
  | VirtualMachineImagesEdgeZoneGetDefaultResponse
  | VirtualMachineImagesEdgeZoneListDefaultResponse
  | VirtualMachineImagesEdgeZoneListOffersDefaultResponse
  | VirtualMachineImagesEdgeZoneListPublishersDefaultResponse
  | VirtualMachineImagesEdgeZoneListSkusDefaultResponse
  | VirtualMachineExtensionImagesGetDefaultResponse
  | VirtualMachineExtensionImagesListTypesDefaultResponse
  | VirtualMachineExtensionImagesListVersionsDefaultResponse
  | AvailabilitySetsCreateOrUpdateDefaultResponse
  | AvailabilitySetsUpdateDefaultResponse
  | AvailabilitySetsDeleteDefaultResponse
  | AvailabilitySetsGetDefaultResponse
  | AvailabilitySetsListBySubscriptionDefaultResponse
  | AvailabilitySetsListDefaultResponse
  | AvailabilitySetsListAvailableSizesDefaultResponse
  | ProximityPlacementGroupsCreateOrUpdateDefaultResponse
  | ProximityPlacementGroupsUpdateDefaultResponse
  | ProximityPlacementGroupsDeleteDefaultResponse
  | ProximityPlacementGroupsGetDefaultResponse
  | ProximityPlacementGroupsListBySubscriptionDefaultResponse
  | ProximityPlacementGroupsListByResourceGroupDefaultResponse
  | DedicatedHostGroupsCreateOrUpdateDefaultResponse
  | DedicatedHostGroupsUpdateDefaultResponse
  | DedicatedHostGroupsDeleteDefaultResponse
  | DedicatedHostGroupsGetDefaultResponse
  | DedicatedHostGroupsListByResourceGroupDefaultResponse
  | DedicatedHostGroupsListBySubscriptionDefaultResponse
  | DedicatedHostsCreateOrUpdateDefaultResponse
  | DedicatedHostsUpdateDefaultResponse
  | DedicatedHostsDeleteDefaultResponse
  | DedicatedHostsGetDefaultResponse
  | DedicatedHostsListByHostGroupDefaultResponse
  | DedicatedHostsRestartDefaultResponse
  | SshPublicKeysListBySubscriptionDefaultResponse
  | SshPublicKeysListByResourceGroupDefaultResponse
  | SshPublicKeysCreateDefaultResponse
  | SshPublicKeysUpdateDefaultResponse
  | SshPublicKeysDeleteDefaultResponse
  | SshPublicKeysGetDefaultResponse
  | SshPublicKeysGenerateKeyPairDefaultResponse
  | ImagesCreateOrUpdateDefaultResponse
  | ImagesUpdateDefaultResponse
  | ImagesDeleteDefaultResponse
  | ImagesGetDefaultResponse
  | ImagesListByResourceGroupDefaultResponse
  | ImagesListDefaultResponse
  | RestorePointCollectionsCreateOrUpdateDefaultResponse
  | RestorePointCollectionsUpdateDefaultResponse
  | RestorePointCollectionsDeleteDefaultResponse
  | RestorePointCollectionsGetDefaultResponse
  | RestorePointCollectionsListDefaultResponse
  | RestorePointCollectionsListAllDefaultResponse
  | RestorePointsCreateDefaultResponse
  | RestorePointsDeleteDefaultResponse
  | RestorePointsGetDefaultResponse
  | CapacityReservationGroupsCreateOrUpdateDefaultResponse
  | CapacityReservationGroupsUpdateDefaultResponse
  | CapacityReservationGroupsDeleteDefaultResponse
  | CapacityReservationGroupsGetDefaultResponse
  | CapacityReservationGroupsListByResourceGroupDefaultResponse
  | CapacityReservationGroupsListBySubscriptionDefaultResponse
  | CapacityReservationsCreateOrUpdateDefaultResponse
  | CapacityReservationsUpdateDefaultResponse
  | CapacityReservationsDeleteDefaultResponse
  | CapacityReservationsGetDefaultResponse
  | CapacityReservationsListByCapacityReservationGroupDefaultResponse
  | LogAnalyticsExportRequestRateByIntervalDefaultResponse
  | LogAnalyticsExportThrottledRequestsDefaultResponse
  | VirtualMachineRunCommandsCreateOrUpdateDefaultResponse
  | VirtualMachineRunCommandsUpdateDefaultResponse
  | VirtualMachineRunCommandsDeleteDefaultResponse
  | VirtualMachineRunCommandsGetByVirtualMachineDefaultResponse
  | VirtualMachineRunCommandsListByVirtualMachineDefaultResponse
  | VirtualMachineScaleSetVMRunCommandsCreateOrUpdateDefaultResponse
  | VirtualMachineScaleSetVMRunCommandsUpdateDefaultResponse
  | VirtualMachineScaleSetVMRunCommandsDeleteDefaultResponse
  | VirtualMachineScaleSetVMRunCommandsGetDefaultResponse
  | VirtualMachineScaleSetVMRunCommandsListDefaultResponse
  | DiskAccessesCreateOrUpdateDefaultResponse
  | DiskAccessesUpdateDefaultResponse
  | DiskAccessesGetDefaultResponse
  | DiskAccessesDeleteDefaultResponse
  | DiskAccessesListByResourceGroupDefaultResponse
  | DiskAccessesListDefaultResponse
  | DiskAccessesUpdateAPrivateEndpointConnectionDefaultResponse
  | DiskAccessesGetAPrivateEndpointConnectionDefaultResponse
  | DiskAccessesDeleteAPrivateEndpointConnectionDefaultResponse
  | DiskAccessesListPrivateEndpointConnectionsDefaultResponse
  | DiskEncryptionSetsCreateOrUpdateDefaultResponse
  | DiskEncryptionSetsUpdateDefaultResponse
  | DiskEncryptionSetsGetDefaultResponse
  | DiskEncryptionSetsDeleteDefaultResponse
  | DiskEncryptionSetsListByResourceGroupDefaultResponse
  | DiskEncryptionSetsListDefaultResponse
  | DiskEncryptionSetsListAssociatedResourcesDefaultResponse
  | DiskRestorePointGetDefaultResponse
  | DiskRestorePointListByRestorePointDefaultResponse
  | DiskRestorePointGrantAccessDefaultResponse
  | DiskRestorePointRevokeAccessDefaultResponse
  | GalleriesCreateOrUpdateDefaultResponse
  | GalleriesUpdateDefaultResponse
  | GalleriesGetDefaultResponse
  | GalleriesDeleteDefaultResponse
  | GalleriesListByResourceGroupDefaultResponse
  | GalleriesListDefaultResponse
  | GalleryImagesCreateOrUpdateDefaultResponse
  | GalleryImagesUpdateDefaultResponse
  | GalleryImagesGetDefaultResponse
  | GalleryImagesDeleteDefaultResponse
  | GalleryImagesListByGalleryDefaultResponse
  | GalleryImageVersionsCreateOrUpdateDefaultResponse
  | GalleryImageVersionsUpdateDefaultResponse
  | GalleryImageVersionsGetDefaultResponse
  | GalleryImageVersionsDeleteDefaultResponse
  | GalleryImageVersionsListByGalleryImageDefaultResponse
  | GalleryApplicationsCreateOrUpdateDefaultResponse
  | GalleryApplicationsUpdateDefaultResponse
  | GalleryApplicationsGetDefaultResponse
  | GalleryApplicationsDeleteDefaultResponse
  | GalleryApplicationsListByGalleryDefaultResponse
  | GalleryApplicationVersionsCreateOrUpdateDefaultResponse
  | GalleryApplicationVersionsUpdateDefaultResponse
  | GalleryApplicationVersionsGetDefaultResponse
  | GalleryApplicationVersionsDeleteDefaultResponse
  | GalleryApplicationVersionsListByGalleryApplicationDefaultResponse
  | GallerySharingProfileUpdateDefaultResponse
  | SharedGalleriesListDefaultResponse
  | SharedGalleriesGetDefaultResponse
  | SharedGalleryImagesListDefaultResponse
  | SharedGalleryImagesGetDefaultResponse
  | SharedGalleryImageVersionsListDefaultResponse
  | SharedGalleryImageVersionsGetDefaultResponse
  | CommunityGalleriesGetDefaultResponse
  | CommunityGalleryImagesGetDefaultResponse
  | CommunityGalleryImagesListDefaultResponse
  | CommunityGalleryImageVersionsGetDefaultResponse
  | CommunityGalleryImageVersionsListDefaultResponse
  | CloudServiceRoleInstancesDeleteDefaultResponse
  | CloudServiceRoleInstancesGetDefaultResponse
  | CloudServiceRoleInstancesGetInstanceViewDefaultResponse
  | CloudServiceRoleInstancesListDefaultResponse
  | CloudServiceRoleInstancesRestartDefaultResponse
  | CloudServiceRoleInstancesReimageDefaultResponse
  | CloudServiceRoleInstancesRebuildDefaultResponse
  | CloudServiceRoleInstancesGetRemoteDesktopFileDefaultResponse
  | CloudServiceRolesGetDefaultResponse
  | CloudServiceRolesListDefaultResponse
  | CloudServicesCreateOrUpdateDefaultResponse
  | CloudServicesUpdateDefaultResponse
  | CloudServicesDeleteDefaultResponse
  | CloudServicesGetDefaultResponse
  | CloudServicesGetInstanceViewDefaultResponse
  | CloudServicesListAllDefaultResponse
  | CloudServicesListDefaultResponse
  | CloudServicesStartDefaultResponse
  | CloudServicesPowerOffDefaultResponse
  | CloudServicesRestartDefaultResponse
  | CloudServicesReimageDefaultResponse
  | CloudServicesRebuildDefaultResponse
  | CloudServicesDeleteInstancesDefaultResponse
  | CloudServicesUpdateDomainWalkUpdateDomainDefaultResponse
  | CloudServicesUpdateDomainGetUpdateDomainDefaultResponse
  | CloudServicesUpdateDomainListUpdateDomainsDefaultResponse
  | CloudServiceOperatingSystemsGetOSVersionDefaultResponse
  | CloudServiceOperatingSystemsListOSVersionsDefaultResponse
  | CloudServiceOperatingSystemsGetOSFamilyDefaultResponse
  | CloudServiceOperatingSystemsListOSFamiliesDefaultResponse {
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
    if (candidateParts.length === pathParts.length && hasParametrizedPath(key)) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.endsWith("}")) {
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

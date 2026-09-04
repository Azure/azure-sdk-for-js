# Release History

## 2.0.0-beta.1 (2026-07-29)
Compared with version 1.0.0

### Features Added
  - Added operation group RecoverableVolumeGroupsOperations
  - Added operation group SaaSOperationGroupOperations
  - Added operation group VolumeGroupSnapshotsOperations
  - Added operation group VolumeGroupsOperations
  - Added operation group VolumesOperations
  - Added operation ReservationsOperations.latestLinkedSaaS
  - Added operation ReservationsOperations.linkSaaS
  - Added operation StoragePoolsOperations.configurePlatformConsoleAuth
  - Added operation StoragePoolsOperations.listPlatformConsoleActivationCode
  - Added Interface ActivateSaaSRequest
  - Added Interface AzureVolumeProperties
  - Added Interface ConnectionParametersResponse
  - Added Interface DestroyedStateProperties
  - Added Interface IscsiConnectionParameters
  - Added Interface IscsiEndpoint
  - Added Interface LatestLinkedSaaSResponse
  - Added Interface LinkSaaSRequest
  - Added Interface PerformanceParameters
  - Added Interface PlatformConsoleAccessSettings
  - Added Interface PlatformConsoleActivationCode
  - Added Interface PlatformConsoleAuthConfig
  - Added Interface PlatformConsoleAuthResult
  - Added Interface PlatformConsoleSettings
  - Added Interface PlatformConsoleSubnet
  - Added Interface ProtectionParameters
  - Added Interface RecoverableVolumeGroup
  - Added Interface RecoverableVolumeGroupProperties
  - Added Interface RecoverableVolumeGroupsDeleteOptionalParams
  - Added Interface RecoverableVolumeGroupsGetOptionalParams
  - Added Interface RecoverableVolumeGroupsListByStoragePoolOptionalParams
  - Added Interface ReservationsLatestLinkedSaaSOptionalParams
  - Added Interface ReservationsLinkSaaSOptionalParams
  - Added Interface SaaSOperationGroupActivateResourceOptionalParams
  - Added Interface SaaSResourceDetailsResponse
  - Added Interface SshPlatformConsoleAuthConfig
  - Added Interface SshPlatformConsoleAuthResult
  - Added Interface StoragePoolsConfigurePlatformConsoleAuthOptionalParams
  - Added Interface StoragePoolsListPlatformConsoleActivationCodeOptionalParams
  - Added Interface Volume
  - Added Interface VolumeGroup
  - Added Interface VolumeGroupOverwriteRequest
  - Added Interface VolumeGroupProperties
  - Added Interface VolumeGroupsCreateOptionalParams
  - Added Interface VolumeGroupsDeleteOptionalParams
  - Added Interface VolumeGroupsGetOptionalParams
  - Added Interface VolumeGroupsGetStatusOptionalParams
  - Added Interface VolumeGroupsListByStoragePoolOptionalParams
  - Added Interface VolumeGroupsListConnectionParametersOptionalParams
  - Added Interface VolumeGroupSnapshot
  - Added Interface VolumeGroupSnapshotListRequest
  - Added Interface VolumeGroupSnapshotPostListResult
  - Added Interface VolumeGroupSnapshotProperties
  - Added Interface VolumeGroupSnapshotsCreateOptionalParams
  - Added Interface VolumeGroupSnapshotsDeleteOptionalParams
  - Added Interface VolumeGroupSnapshotsGetOptionalParams
  - Added Interface VolumeGroupSnapshotsListByVolumeGroupOptionalParams
  - Added Interface VolumeGroupSnapshotsListSnapshotsOptionalParams
  - Added Interface VolumeGroupsOverwriteOptionalParams
  - Added Interface VolumeGroupStatus
  - Added Interface VolumeGroupsUpdateOptionalParams
  - Added Interface VolumeGroupUpdate
  - Added Interface VolumeGroupUpdateProperties
  - Added Interface VolumeOverwriteRequest
  - Added Interface VolumesCreateOptionalParams
  - Added Interface VolumesDeleteOptionalParams
  - Added Interface VolumesGetOptionalParams
  - Added Interface VolumesListByVolumeGroupOptionalParams
  - Added Interface VolumeSnapshotInfo
  - Added Interface VolumeSnapshotSource
  - Added Interface VolumesOverwriteOptionalParams
  - Added Interface VolumesUpdateOptionalParams
  - Added Interface VolumeUpdate
  - Added Interface VolumeUpdateProperties
  - Interface BlockClientOptionalParams has a new optional parameter cloudSetting
  - Interface MarketplaceDetails has a new optional parameter saaSResourceId
  - Interface StoragePoolProperties has a new optional parameter platformConsoleSettings
  - Interface StoragePoolUpdateProperties has a new optional parameter platformConsoleSettings
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias PlatformConsoleAuthConfigUnion
  - Added Type Alias PlatformConsoleAuthResultUnion
  - Added Type Alias PlatformConsoleAuthType
  - Added Type Alias PlatformConsoleRole
  - Added Type Alias VolumeGroupSourceType
  - Added Type Alias VolumeSourceType
  - Added Enum AzureClouds
  - Added Enum KnownPlatformConsoleAuthType
  - Added Enum KnownPlatformConsoleRole
  - Added Enum KnownVolumeGroupSourceType
  - Added Enum KnownVolumeSourceType
  - Enum KnownVersions has a new value V20241001Preview
  - Enum KnownVersions has a new value V20241101Preview
  - Enum KnownVersions has a new value V20260101Preview
  - Enum KnownVersions has a new value V20260301Preview
  - Enum KnownVersions has a new value V20260501Preview

### Breaking Changes
  - Operation ReservationsOperations.create has a new signature
  - Operation ReservationsOperations.get has a new signature
  - Operation ReservationsOperations.listByResourceGroup has a new signature
  - Operation ReservationsOperations.listBySubscription has a new signature
  - Parameter offerDetails of interface MarketplaceDetails is now optional
  - Parameter user of interface ReservationPropertiesBaseResourceProperties is now optional

    
## 1.0.0 (2025-06-30)

### Features Added

This is the first stable version with the package of @azure/arm-purestorageblock

# Release History

## 19.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 19.0.0 (2022-06-06)
    
**Features**

  - Added operation CommunityGalleryImages.list
  - Added operation CommunityGalleryImageVersions.list
  - Added operation VirtualMachineImages.listByEdgeZone
  - Added Interface CommunityGalleryImageList
  - Added Interface CommunityGalleryImagesListNextOptionalParams
  - Added Interface CommunityGalleryImagesListOptionalParams
  - Added Interface CommunityGalleryImageVersionList
  - Added Interface CommunityGalleryImageVersionsListNextOptionalParams
  - Added Interface CommunityGalleryImageVersionsListOptionalParams
  - Added Interface CopyCompletionError
  - Added Interface SharedGalleryDiskImage
  - Added Interface SharedGalleryImageVersionStorageProfile
  - Added Interface UserArtifactSettings
  - Added Interface VirtualMachineImagesListByEdgeZoneOptionalParams
  - Added Interface VmImagesInEdgeZoneListResult
  - Added Type Alias CommunityGalleryImagesListNextResponse
  - Added Type Alias CommunityGalleryImagesListResponse
  - Added Type Alias CommunityGalleryImageVersionsListNextResponse
  - Added Type Alias CommunityGalleryImageVersionsListResponse
  - Added Type Alias CopyCompletionErrorReason
  - Added Type Alias GalleryProvisioningState
  - Added Type Alias SharedGalleryDataDiskImage
  - Added Type Alias SharedGalleryHostCaching
  - Added Type Alias SharedGalleryOSDiskImage
  - Added Type Alias VirtualMachineImagesListByEdgeZoneResponse
  - Interface DiskEncryptionSetUpdate has a new optional parameter federatedClientId
  - Interface EncryptionSetIdentity has a new optional parameter userAssignedIdentities
  - Interface ImageDiskReference has a new optional parameter communityGalleryImageId
  - Interface ImageDiskReference has a new optional parameter sharedGalleryImageId
  - Type Alias CommunityGalleryImage has a new parameter architecture
  - Type Alias CommunityGalleryImage has a new parameter privacyStatementUri
  - Type Alias CommunityGalleryImage has a new parameter eula
  - Type Alias CommunityGalleryImageVersion has a new parameter excludeFromLatest
  - Type Alias CommunityGalleryImageVersion has a new parameter storageProfile
  - Type Alias DiskEncryptionSet has a new parameter federatedClientId
  - Type Alias DiskRestorePoint has a new parameter securityProfile
  - Type Alias GalleryApplicationVersionPublishingProfile has a new parameter settings
  - Type Alias SharedGalleryImage has a new parameter architecture
  - Type Alias SharedGalleryImageVersion has a new parameter excludeFromLatest
  - Type Alias SharedGalleryImageVersion has a new parameter storageProfile
  - Type Alias Snapshot has a new parameter copyCompletionError
  - Added Enum KnownCopyCompletionErrorReason
  - Added Enum KnownGalleryProvisioningState
  - Added Enum KnownSharedGalleryHostCaching
  - Enum KnownDiskEncryptionSetIdentityType has a new value SystemAssignedUserAssigned
  - Enum KnownDiskEncryptionSetIdentityType has a new value UserAssigned
  - Enum KnownDiskStorageAccountTypes has a new value PremiumV2LRS
  - Enum KnownGallerySharingPermissionTypes has a new value Community

**Breaking Changes**

  - Removed Enum KnownGalleryApplicationVersionPropertiesProvisioningState
  - Removed Enum KnownGalleryImagePropertiesProvisioningState
  - Removed Enum KnownGalleryImageVersionPropertiesProvisioningState
  - Removed Enum KnownGalleryPropertiesProvisioningState
  - Enum KnownSharingProfileGroupTypes no longer has value Community
    
    
## 18.0.0 (2022-05-23)
    
**Features**

  - Added Interface DedicatedHostGroupPropertiesAdditionalCapabilities
  - Added Interface LinuxVMGuestPatchAutomaticByPlatformSettings
  - Added Interface ProximityPlacementGroupPropertiesIntent
  - Added Interface ResourceWithOptionalLocation
  - Added Interface WindowsVMGuestPatchAutomaticByPlatformSettings
  - Added Type Alias LinuxVMGuestPatchAutomaticByPlatformRebootSetting
  - Added Type Alias WindowsVMGuestPatchAutomaticByPlatformRebootSetting
  - Interface AutomaticOSUpgradePolicy has a new optional parameter useRollingUpgradePolicy
  - Interface DiskRestorePointReplicationStatus has a new optional parameter completionPercent
  - Interface LinuxPatchSettings has a new optional parameter automaticByPlatformSettings
  - Interface PatchSettings has a new optional parameter automaticByPlatformSettings
  - Interface VirtualMachineScaleSetDataDisk has a new optional parameter deleteOption
  - Interface VirtualMachineScaleSetOSDisk has a new optional parameter deleteOption
  - Interface VirtualMachineScaleSetUpdateOSDisk has a new optional parameter deleteOption
  - Interface VMGalleryApplication has a new optional parameter enableAutomaticUpgrade
  - Interface VMGalleryApplication has a new optional parameter treatFailureAsDeploymentFailure
  - Add parameters of ResourceWithOptionalLocation to TypeAlias VirtualMachineExtension
  - Type Alias DedicatedHostGroup has a new parameter additionalCapabilities
  - Type Alias DedicatedHostGroupUpdate has a new parameter additionalCapabilities
  - Type Alias ProximityPlacementGroup has a new parameter zones
  - Type Alias ProximityPlacementGroup has a new parameter intent
  - Type Alias VirtualMachineScaleSetVM has a new parameter identity
  - Added Enum KnownLinuxVMGuestPatchAutomaticByPlatformRebootSetting
  - Added Enum KnownWindowsVMGuestPatchAutomaticByPlatformRebootSetting
  - Enum KnownStorageAccountTypes has a new value PremiumV2LRS

**Breaking Changes**

  - Delete parameters of Resource in TypeAlias VirtualMachineExtension
    
## 17.3.1 (2022-04-06)

**features**

  -  Bug fix

## 17.3.0 (2022-03-02)
    
**Features**

  - Added Type Alias Architecture
  - Added Type Alias ArchitectureTypes
  - Added Type Alias DataAccessAuthMode
  - Interface DiskUpdate has a new optional parameter dataAccessAuthMode
  - Interface SnapshotUpdate has a new optional parameter dataAccessAuthMode
  - Interface SupportedCapabilities has a new optional parameter architecture
  - Type Alias Disk has a new parameter dataAccessAuthMode
  - Type Alias GalleryImage has a new parameter architecture
  - Type Alias GalleryImageUpdate has a new parameter architecture
  - Type Alias Snapshot has a new parameter dataAccessAuthMode
  - Type Alias VirtualMachineImage has a new parameter architecture
  - Added Enum KnownArchitecture
  - Added Enum KnownArchitectureTypes
  - Added Enum KnownDataAccessAuthMode
    
    
## 17.2.0 (2022-02-14)
    
**Features**

  - Added operation DedicatedHosts.beginRestart
  - Added operation DedicatedHosts.beginRestartAndWait
  - Added Interface CommunityGalleryInfo
  - Added Interface DedicatedHostsRestartOptionalParams
  - Added Interface DiskRestorePointInstanceView
  - Added Interface DiskRestorePointReplicationStatus
  - Added Interface GalleryExtendedLocation
  - Added Interface GalleryTargetExtendedLocation
  - Added Interface OSDiskImageSecurityProfile
  - Added Interface RegionalSharingStatus
  - Added Interface RestorePointInstanceView
  - Added Interface SharingStatus
  - Added Interface VirtualMachineScaleSetHardwareProfile
  - Added Interface VMDiskSecurityProfile
  - Added Type Alias ConfidentialVMEncryptionType
  - Added Type Alias GalleryExpandParams
  - Added Type Alias GalleryExtendedLocationType
  - Added Type Alias RepairAction
  - Added Type Alias RestorePointExpandOptions
  - Added Type Alias SecurityEncryptionTypes
  - Added Type Alias SharingState
  - Interface AutomaticRepairsPolicy has a new optional parameter repairAction
  - Interface GalleriesGetOptionalParams has a new optional parameter expand
  - Interface GalleryArtifactPublishingProfileBase has a new optional parameter targetExtendedLocations
  - Interface RestorePointsGetOptionalParams has a new optional parameter expand
  - Interface SharingProfile has a new optional parameter communityGalleryInfo
  - Interface VirtualMachineScaleSetManagedDiskParameters has a new optional parameter securityProfile
  - Interface VirtualMachineScaleSetOSProfile has a new optional parameter allowExtensionOperations
  - Interface VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams has a new optional parameter placementGroupId
  - Interface VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams has a new optional parameter zone
  - Interface VirtualMachineScaleSetUpdatePublicIPAddressConfiguration has a new optional parameter publicIPPrefix
  - Interface VirtualMachineScaleSetVMProfile has a new optional parameter hardwareProfile
  - Interface VirtualMachinesListAllNextOptionalParams has a new optional parameter filter
  - Interface VirtualMachinesListAllOptionalParams has a new optional parameter filter
  - Interface VirtualMachinesListNextOptionalParams has a new optional parameter filter
  - Interface VirtualMachinesListOptionalParams has a new optional parameter filter
  - Type Alias CapacityReservation has a new parameter timeCreated
  - Type Alias CapacityReservationUpdate has a new parameter timeCreated
  - Type Alias DedicatedHost has a new parameter timeCreated
  - Type Alias DedicatedHostUpdate has a new parameter timeCreated
  - Type Alias Gallery has a new parameter sharingStatus
  - Type Alias GalleryUpdate has a new parameter sharingStatus
  - Type Alias ImageReference has a new parameter communityGalleryImageId
  - Type Alias ManagedDiskParameters has a new parameter securityProfile
  - Type Alias OSDiskImageEncryption has a new parameter securityProfile
  - Type Alias RestorePoint has a new parameter sourceRestorePoint
  - Type Alias RestorePoint has a new parameter instanceView
  - Type Alias VirtualMachine has a new parameter timeCreated
  - Type Alias VirtualMachineExtension has a new parameter protectedSettingsFromKeyVault
  - Type Alias VirtualMachineExtensionUpdate has a new parameter protectedSettingsFromKeyVault
  - Type Alias VirtualMachineScaleSet has a new parameter timeCreated
  - Type Alias VirtualMachineScaleSetExtension has a new parameter protectedSettingsFromKeyVault
  - Type Alias VirtualMachineScaleSetExtensionUpdate has a new parameter protectedSettingsFromKeyVault
  - Type Alias VirtualMachineScaleSetVMExtension has a new parameter protectedSettingsFromKeyVault
  - Type Alias VirtualMachineScaleSetVMExtensionUpdate has a new parameter protectedSettingsFromKeyVault
  - Type Alias VirtualMachineUpdate has a new parameter timeCreated
  - Added Enum KnownConfidentialVMEncryptionType
  - Added Enum KnownGalleryExpandParams
  - Added Enum KnownGalleryExtendedLocationType
  - Added Enum KnownRepairAction
  - Added Enum KnownRestorePointExpandOptions
  - Added Enum KnownSecurityEncryptionTypes
  - Added Enum KnownSharingState
  - Enum KnownSecurityTypes has a new value ConfidentialVM
  - Enum KnownSharingProfileGroupTypes has a new value Community
  - Enum KnownSharingUpdateOperationTypes has a new value EnableCommunity
    
    
## 17.1.0 (2022-01-06)
    
**Features**

  - Interface AccessUri has a new optional parameter securityDataAccessSAS
  - Interface CreationData has a new optional parameter securityDataUri
  - Interface DiskSecurityProfile has a new optional parameter secureVMDiskEncryptionSetId
  - Interface GrantAccessData has a new optional parameter getSecureVMGuestStateSAS
  - Interface SnapshotUpdate has a new optional parameter supportedCapabilities
  - Type Alias DiskRestorePoint has a new parameter replicationState
  - Type Alias DiskRestorePoint has a new parameter sourceResourceLocation
  - Type Alias Snapshot has a new parameter securityProfile
  - Enum KnownDiskCreateOption has a new value ImportSecure
  - Enum KnownDiskCreateOption has a new value UploadPreparedSecure
  - Enum KnownDiskEncryptionSetType has a new value ConfidentialVmEncryptedWithCustomerKey
  - Enum KnownDiskSecurityTypes has a new value ConfidentialVMDiskEncryptedWithCustomerKey
  - Enum KnownDiskSecurityTypes has a new value ConfidentialVMDiskEncryptedWithPlatformKey
  - Enum KnownDiskSecurityTypes has a new value ConfidentialVMVmguestStateOnlyEncryptedWithPlatformKey
    
    
## 17.0.0 (2021-12-07)

The package of @azure/arm-compute is using our next generation design principles since version 17.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

# Release History
    
## 21.4.0 (2023-12-28)
    
**Features**

  - Added Type Alias ProvisionedBandwidthCopyOption
  - Interface CreationData has a new optional parameter provisionedBandwidthCopySpeed
  - Added Enum KnownProvisionedBandwidthCopyOption
  - Enum KnownDiskSecurityTypes has a new value ConfidentialVMNonPersistedTPM
    
    
## 21.3.0 (2023-12-08)
    
**Features**

  - Added operation DedicatedHosts.beginRedeploy
  - Added operation DedicatedHosts.beginRedeployAndWait
  - Added operation VirtualMachines.beginAttachDetachDataDisks
  - Added operation VirtualMachines.beginAttachDetachDataDisksAndWait
  - Added operation VirtualMachineScaleSets.beginApproveRollingUpgrade
  - Added operation VirtualMachineScaleSets.beginApproveRollingUpgradeAndWait
  - Added operation VirtualMachineScaleSetVMs.beginApproveRollingUpgrade
  - Added operation VirtualMachineScaleSetVMs.beginApproveRollingUpgradeAndWait
  - Added operation VirtualMachineScaleSetVMs.beginAttachDetachDataDisks
  - Added operation VirtualMachineScaleSetVMs.beginAttachDetachDataDisksAndWait
  - Added Interface AttachDetachDataDisksRequest
  - Added Interface CommunityGalleryMetadata
  - Added Interface DataDisksToAttach
  - Added Interface DataDisksToDetach
  - Added Interface DedicatedHostsRedeployHeaders
  - Added Interface DedicatedHostsRedeployOptionalParams
  - Added Interface EncryptionIdentity
  - Added Interface GalleryImageVersionUefiSettings
  - Added Interface ImageVersionSecurityProfile
  - Added Interface ProxyAgentSettings
  - Added Interface ResiliencyPolicy
  - Added Interface ResilientVMCreationPolicy
  - Added Interface ResilientVMDeletionPolicy
  - Added Interface ResourceSharingProfile
  - Added Interface SshGenerateKeyPairInputParameters
  - Added Interface UefiKey
  - Added Interface UefiKeySignatures
  - Added Interface VirtualMachinesAttachDetachDataDisksHeaders
  - Added Interface VirtualMachinesAttachDetachDataDisksOptionalParams
  - Added Interface VirtualMachineScaleSetsApproveRollingUpgradeHeaders
  - Added Interface VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams
  - Added Interface VirtualMachineScaleSetVMsApproveRollingUpgradeHeaders
  - Added Interface VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams
  - Added Interface VirtualMachineScaleSetVMsAttachDetachDataDisksHeaders
  - Added Interface VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams
  - Added Type Alias DedicatedHostsRedeployResponse
  - Added Type Alias Mode
  - Added Type Alias SshEncryptionTypes
  - Added Type Alias UefiKeyType
  - Added Type Alias UefiSignatureTemplateName
  - Added Type Alias VirtualMachinesAttachDetachDataDisksResponse
  - Added Type Alias VirtualMachineScaleSetsApproveRollingUpgradeResponse
  - Added Type Alias VirtualMachineScaleSetVMsApproveRollingUpgradeResponse
  - Added Type Alias VirtualMachineScaleSetVMsAttachDetachDataDisksResponse
  - Interface AutomaticOSUpgradePolicy has a new optional parameter osRollingUpgradeDeferral
  - Interface CapacityReservationGroup has a new optional parameter sharingProfile
  - Interface CapacityReservationGroupInstanceView has a new optional parameter sharedSubscriptionIds
  - Interface CapacityReservationGroupUpdate has a new optional parameter sharingProfile
  - Interface CommunityGallery has a new optional parameter artifactTags
  - Interface CommunityGallery has a new optional parameter communityMetadata
  - Interface CommunityGallery has a new optional parameter disclaimer
  - Interface CommunityGalleryImage has a new optional parameter artifactTags
  - Interface CommunityGalleryImage has a new optional parameter disclaimer
  - Interface CommunityGalleryImageVersion has a new optional parameter artifactTags
  - Interface CommunityGalleryImageVersion has a new optional parameter disclaimer
  - Interface GalleryImageVersion has a new optional parameter securityProfile
  - Interface GalleryImageVersionUpdate has a new optional parameter securityProfile
  - Interface RestorePointSourceVMStorageProfile has a new optional parameter diskControllerType
  - Interface SecurityProfile has a new optional parameter encryptionIdentity
  - Interface SecurityProfile has a new optional parameter proxyAgentSettings
  - Interface SharedGallery has a new optional parameter artifactTags
  - Interface SharedGalleryImage has a new optional parameter artifactTags
  - Interface SharedGalleryImageVersion has a new optional parameter artifactTags
  - Interface SshPublicKeysGenerateKeyPairOptionalParams has a new optional parameter parameters
  - Interface VirtualMachine has a new optional parameter etag
  - Interface VirtualMachine has a new optional parameter managedBy
  - Interface VirtualMachineInstanceView has a new optional parameter isVMInStandbyPool
  - Interface VirtualMachineScaleSet has a new optional parameter etag
  - Interface VirtualMachineScaleSet has a new optional parameter resiliencyPolicy
  - Interface VirtualMachineScaleSetsCreateOrUpdateOptionalParams has a new optional parameter ifMatch
  - Interface VirtualMachineScaleSetsCreateOrUpdateOptionalParams has a new optional parameter ifNoneMatch
  - Interface VirtualMachineScaleSetsUpdateOptionalParams has a new optional parameter ifMatch
  - Interface VirtualMachineScaleSetsUpdateOptionalParams has a new optional parameter ifNoneMatch
  - Interface VirtualMachineScaleSetUpdate has a new optional parameter resiliencyPolicy
  - Interface VirtualMachineScaleSetVM has a new optional parameter etag
  - Interface VirtualMachineScaleSetVMProfile has a new optional parameter timeCreated
  - Interface VirtualMachineScaleSetVMsUpdateOptionalParams has a new optional parameter ifMatch
  - Interface VirtualMachineScaleSetVMsUpdateOptionalParams has a new optional parameter ifNoneMatch
  - Interface VirtualMachinesCreateOrUpdateOptionalParams has a new optional parameter ifMatch
  - Interface VirtualMachinesCreateOrUpdateOptionalParams has a new optional parameter ifNoneMatch
  - Interface VirtualMachinesUpdateOptionalParams has a new optional parameter ifMatch
  - Interface VirtualMachinesUpdateOptionalParams has a new optional parameter ifNoneMatch
  - Added Enum KnownMode
  - Added Enum KnownSshEncryptionTypes
  - Added Enum KnownUefiKeyType
  - Added Enum KnownUefiSignatureTemplateName
  - Enum KnownConfidentialVMEncryptionType has a new value NonPersistedTPM
  - Enum KnownReplicationStatusTypes has a new value UefiSettings
  - Enum KnownSecurityEncryptionTypes has a new value NonPersistedTPM
    
    
## 21.2.0 (2023-08-14)
    
**Features**

  - Added Type Alias DomainNameLabelScopeTypes
  - Added Type Alias NetworkInterfaceAuxiliaryMode
  - Added Type Alias NetworkInterfaceAuxiliarySku
  - Interface CreationData has a new optional parameter elasticSanResourceId
  - Interface Disk has a new optional parameter lastOwnershipUpdateTime
  - Interface VirtualMachineNetworkInterfaceConfiguration has a new optional parameter auxiliaryMode
  - Interface VirtualMachineNetworkInterfaceConfiguration has a new optional parameter auxiliarySku
  - Interface VirtualMachinePublicIPAddressDnsSettingsConfiguration has a new optional parameter domainNameLabelScope
  - Interface VirtualMachineScaleSetNetworkConfiguration has a new optional parameter auxiliaryMode
  - Interface VirtualMachineScaleSetNetworkConfiguration has a new optional parameter auxiliarySku
  - Interface VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings has a new optional parameter domainNameLabelScope
  - Interface VirtualMachineScaleSetUpdateNetworkConfiguration has a new optional parameter auxiliaryMode
  - Interface VirtualMachineScaleSetUpdateNetworkConfiguration has a new optional parameter auxiliarySku
  - Interface VirtualMachineScaleSetVM has a new optional parameter timeCreated
  - Added Enum KnownDomainNameLabelScopeTypes
  - Added Enum KnownNetworkInterfaceAuxiliaryMode
  - Added Enum KnownNetworkInterfaceAuxiliarySku
  - Enum KnownDiskCreateOption has a new value CopyFromSanSnapshot
    
    
## 21.1.0 (2023-07-07)
    
**Features**

  - Added Type Alias FileFormat
  - Interface GrantAccessData has a new optional parameter fileFormat
  - Added Enum KnownFileFormat
    
    
## 21.0.0 (2023-05-17)
    
**Features**

  - Added operation DedicatedHosts.listAvailableSizes
  - Added operation VirtualMachineScaleSets.beginReapply
  - Added operation VirtualMachineScaleSets.beginReapplyAndWait
  - Added Interface CommunityGalleryImageIdentifier
  - Added Interface DedicatedHostSizeListResult
  - Added Interface DedicatedHostsListAvailableSizesOptionalParams
  - Added Interface DiskRestorePointAttributes
  - Added Interface RestorePointEncryption
  - Added Interface RunCommandManagedIdentity
  - Added Interface SecurityPostureReference
  - Added Interface VirtualMachineScaleSetsReapplyHeaders
  - Added Interface VirtualMachineScaleSetsReapplyOptionalParams
  - Added Type Alias DedicatedHostsListAvailableSizesResponse
  - Added Type Alias EdgeZoneStorageAccountType
  - Added Type Alias ExpandTypeForListVMs
  - Added Type Alias ExpandTypesForListVMs
  - Added Type Alias RestorePointEncryptionType
  - Interface DedicatedHostUpdate has a new optional parameter sku
  - Interface LinuxVMGuestPatchAutomaticByPlatformSettings has a new optional parameter bypassPlatformSafetyChecksOnUserSchedule
  - Interface RestorePointSourceMetadata has a new optional parameter hyperVGeneration
  - Interface RestorePointSourceVMDataDisk has a new optional parameter writeAcceleratorEnabled
  - Interface RestorePointSourceVmosDisk has a new optional parameter writeAcceleratorEnabled
  - Interface VirtualMachineExtension has a new optional parameter provisionAfterExtensions
  - Interface VirtualMachineRunCommand has a new optional parameter errorBlobManagedIdentity
  - Interface VirtualMachineRunCommand has a new optional parameter outputBlobManagedIdentity
  - Interface VirtualMachineRunCommand has a new optional parameter treatFailureAsDeploymentFailure
  - Interface VirtualMachineRunCommandScriptSource has a new optional parameter scriptUriManagedIdentity
  - Interface VirtualMachineRunCommandUpdate has a new optional parameter errorBlobManagedIdentity
  - Interface VirtualMachineRunCommandUpdate has a new optional parameter outputBlobManagedIdentity
  - Interface VirtualMachineRunCommandUpdate has a new optional parameter treatFailureAsDeploymentFailure
  - Interface VirtualMachineScaleSetsDeallocateOptionalParams has a new optional parameter hibernate
  - Interface VirtualMachineScaleSetUpdate has a new optional parameter priorityMixPolicy
  - Interface VirtualMachineScaleSetUpdate has a new optional parameter spotRestorePolicy
  - Interface VirtualMachineScaleSetVMExtension has a new optional parameter location
  - Interface VirtualMachineScaleSetVMExtension has a new optional parameter provisionAfterExtensions
  - Interface VirtualMachineScaleSetVMInstanceView has a new optional parameter computerName
  - Interface VirtualMachineScaleSetVMInstanceView has a new optional parameter hyperVGeneration
  - Interface VirtualMachineScaleSetVMInstanceView has a new optional parameter osName
  - Interface VirtualMachineScaleSetVMInstanceView has a new optional parameter osVersion
  - Interface VirtualMachineScaleSetVMProfile has a new optional parameter securityPostureReference
  - Interface VirtualMachinesListAllOptionalParams has a new optional parameter expand
  - Interface VirtualMachinesListOptionalParams has a new optional parameter expand
  - Interface WindowsVMGuestPatchAutomaticByPlatformSettings has a new optional parameter bypassPlatformSafetyChecksOnUserSchedule
  - Added Enum KnownEdgeZoneStorageAccountType
  - Added Enum KnownExpandTypeForListVMs
  - Added Enum KnownExpandTypesForListVMs
  - Added Enum KnownRestorePointEncryptionType

**Breaking Changes**

  - Type of parameter identifier of interface CommunityGalleryImage is changed from GalleryImageIdentifier to CommunityGalleryImageIdentifier
  - Type of parameter storageAccountType of interface GalleryTargetExtendedLocation is changed from StorageAccountType to EdgeZoneStorageAccountType
  - Type of parameter diskRestorePoint of interface RestorePointSourceVMDataDisk is changed from ApiEntityReference to DiskRestorePointAttributes
  - Type of parameter diskRestorePoint of interface RestorePointSourceVmosDisk is changed from ApiEntityReference to DiskRestorePointAttributes
    
    
## 20.0.0 (2023-01-05)
    
**Features**

  - Added Interface AlternativeOption
  - Added Interface GalleryApplicationCustomAction
  - Added Interface GalleryApplicationCustomActionParameter
  - Added Interface GalleryApplicationVersionSafetyProfile
  - Added Interface GalleryArtifactSafetyProfileBase
  - Added Interface GalleryArtifactVersionFullSource
  - Added Interface GalleryDiskImageSource
  - Added Interface GalleryImageVersionSafetyProfile
  - Added Interface ImageDeprecationStatus
  - Added Interface LatestGalleryImageVersion
  - Added Interface LoadBalancerFrontendIpConfiguration
  - Added Interface LoadBalancerFrontendIpConfigurationProperties
  - Added Interface OSImageNotificationProfile
  - Added Interface OSProfileProvisioningData
  - Added Interface PolicyViolation
  - Added Interface ServiceArtifactReference
  - Added Type Alias AlternativeType
  - Added Type Alias GalleryApplicationCustomActionParameterType
  - Added Type Alias ImageState
  - Added Type Alias PolicyViolationCategory
  - Interface CloudService has a new optional parameter zones
  - Interface GalleryApplication has a new optional parameter customActions
  - Interface GalleryApplicationUpdate has a new optional parameter customActions
  - Interface GalleryApplicationVersion has a new optional parameter safetyProfile
  - Interface GalleryApplicationVersionPublishingProfile has a new optional parameter customActions
  - Interface GalleryApplicationVersionUpdate has a new optional parameter safetyProfile
  - Interface GalleryImageVersion has a new optional parameter safetyProfile
  - Interface GalleryImageVersionUpdate has a new optional parameter safetyProfile
  - Interface RestorePointSourceMetadata has a new optional parameter userData
  - Interface RollingUpgradePolicy has a new optional parameter maxSurge
  - Interface RollingUpgradePolicy has a new optional parameter rollbackFailedInstancesOnPolicyBreach
  - Interface ScheduledEventsProfile has a new optional parameter osImageNotificationProfile
  - Interface SharedGalleryImage has a new optional parameter eula
  - Interface SharedGalleryImage has a new optional parameter privacyStatementUri
  - Interface TargetRegion has a new optional parameter excludeFromLatest
  - Interface VirtualMachineImage has a new optional parameter imageDeprecationStatus
  - Interface VirtualMachineReimageParameters has a new optional parameter exactVersion
  - Interface VirtualMachineReimageParameters has a new optional parameter osProfile
  - Interface VirtualMachineScaleSet has a new optional parameter constrainedMaximumCapacity
  - Interface VirtualMachineScaleSetOSProfile has a new optional parameter requireGuestProvisionSignal
  - Interface VirtualMachineScaleSetVMProfile has a new optional parameter serviceArtifactReference
  - Added Enum KnownAlternativeType
  - Added Enum KnownImageState
  - Added Enum KnownPolicyViolationCategory
  - Added function getContinuationToken

**Breaking Changes**

  - Interface AvailabilitySetsListBySubscriptionNextOptionalParams no longer has parameter expand
  - Interface CapacityReservationGroupsListByResourceGroupNextOptionalParams no longer has parameter expand
  - Interface CapacityReservationGroupsListBySubscriptionNextOptionalParams no longer has parameter expand
  - Interface CloudServiceRoleInstancesListNextOptionalParams no longer has parameter expand
  - Interface GalleryArtifactVersionSource no longer has parameter uri
  - Interface LoadBalancerConfigurationProperties no longer has parameter frontendIPConfigurations
  - Interface ResourceSkusListNextOptionalParams no longer has parameter filter
  - Interface ResourceSkusListNextOptionalParams no longer has parameter includeExtendedLocations
  - Interface SharedGalleriesListNextOptionalParams no longer has parameter sharedTo
  - Interface SharedGalleryImagesListNextOptionalParams no longer has parameter sharedTo
  - Interface SharedGalleryImageVersionsListNextOptionalParams no longer has parameter sharedTo
  - Interface VirtualMachineRunCommandsListByVirtualMachineNextOptionalParams no longer has parameter expand
  - Interface VirtualMachineScaleSetVMRunCommandsListNextOptionalParams no longer has parameter expand
  - Interface VirtualMachineScaleSetVMsListNextOptionalParams no longer has parameter expand
  - Interface VirtualMachineScaleSetVMsListNextOptionalParams no longer has parameter filter
  - Interface VirtualMachineScaleSetVMsListNextOptionalParams no longer has parameter select
  - Interface VirtualMachinesListAllNextOptionalParams no longer has parameter filter
  - Interface VirtualMachinesListAllNextOptionalParams no longer has parameter statusOnly
  - Interface VirtualMachinesListNextOptionalParams no longer has parameter filter
  - Interface LoadBalancerConfigurationProperties has a new required parameter frontendIpConfigurations
  - Type of parameter source of interface GalleryDiskImage is changed from GalleryArtifactVersionSource to GalleryDiskImageSource
  - Type of parameter source of interface GalleryImageVersionStorageProfile is changed from GalleryArtifactVersionSource to GalleryArtifactVersionFullSource
    
    
## 19.2.0 (2022-09-21)
    
**Features**

  - Added Interface PriorityMixPolicy
  - Added Type Alias DiskControllerTypes
  - Interface CapacityReservation has a new optional parameter platformFaultDomainCount
  - Interface CapacityReservationUpdate has a new optional parameter platformFaultDomainCount
  - Interface CapacityReservationUtilization has a new optional parameter currentCapacity
  - Interface CreationData has a new optional parameter performancePlus
  - Interface Disk has a new optional parameter burstingEnabledTime
  - Interface Disk has a new optional parameter optimizedForFrequentAttach
  - Interface DiskUpdate has a new optional parameter optimizedForFrequentAttach
  - Interface LinuxConfiguration has a new optional parameter enableVMAgentPlatformUpdates
  - Interface Snapshot has a new optional parameter incrementalSnapshotFamilyId
  - Interface StorageProfile has a new optional parameter diskControllerType
  - Interface SupportedCapabilities has a new optional parameter diskControllerTypes
  - Interface VirtualMachineNetworkInterfaceConfiguration has a new optional parameter disableTcpStateTracking
  - Interface VirtualMachineScaleSet has a new optional parameter priorityMixPolicy
  - Interface VirtualMachineScaleSetNetworkConfiguration has a new optional parameter disableTcpStateTracking
  - Interface VirtualMachineScaleSetStorageProfile has a new optional parameter diskControllerType
  - Interface VirtualMachineScaleSetUpdateNetworkConfiguration has a new optional parameter disableTcpStateTracking
  - Interface VirtualMachineScaleSetUpdateStorageProfile has a new optional parameter diskControllerType
  - Interface VirtualMachineScaleSetUpdateVMProfile has a new optional parameter hardwareProfile
  - Interface WindowsConfiguration has a new optional parameter enableVMAgentPlatformUpdates
  - Added Enum KnownDiskControllerTypes
    
    
## 19.1.0 (2022-06-27)
    
**Features**

  - Added Interface AvailabilitySet
  - Added Interface AvailabilitySetUpdate
  - Added Interface CapacityReservation
  - Added Interface CapacityReservationGroup
  - Added Interface CapacityReservationGroupUpdate
  - Added Interface CapacityReservationInstanceViewWithName
  - Added Interface CapacityReservationUpdate
  - Added Interface CommunityGallery
  - Added Interface CommunityGalleryImage
  - Added Interface CommunityGalleryImageVersion
  - Added Interface DataDiskImageEncryption
  - Added Interface DedicatedHost
  - Added Interface DedicatedHostGroup
  - Added Interface DedicatedHostGroupUpdate
  - Added Interface DedicatedHostInstanceViewWithName
  - Added Interface DedicatedHostUpdate
  - Added Interface Disk
  - Added Interface DiskAccess
  - Added Interface DiskEncryptionSet
  - Added Interface DiskEncryptionSetParameters
  - Added Interface DiskRestorePoint
  - Added Interface Gallery
  - Added Interface GalleryApplication
  - Added Interface GalleryApplicationUpdate
  - Added Interface GalleryApplicationVersion
  - Added Interface GalleryApplicationVersionPublishingProfile
  - Added Interface GalleryApplicationVersionUpdate
  - Added Interface GalleryDataDiskImage
  - Added Interface GalleryImage
  - Added Interface GalleryImageUpdate
  - Added Interface GalleryImageVersion
  - Added Interface GalleryImageVersionPublishingProfile
  - Added Interface GalleryImageVersionUpdate
  - Added Interface GalleryOSDiskImage
  - Added Interface GalleryUpdate
  - Added Interface Image_2
  - Added Interface ImageDataDisk
  - Added Interface ImageOSDisk
  - Added Interface ImageReference
  - Added Interface ImageUpdate
  - Added Interface ManagedDiskParameters
  - Added Interface NetworkInterfaceReference
  - Added Interface OSDiskImageEncryption
  - Added Interface PirSharedGalleryResource
  - Added Interface ProximityPlacementGroup
  - Added Interface ProximityPlacementGroupUpdate
  - Added Interface RequestRateByIntervalInput
  - Added Interface RestorePoint
  - Added Interface RestorePointCollection
  - Added Interface RestorePointCollectionUpdate
  - Added Interface RollingUpgradeStatusInfo
  - Added Interface RunCommandDocument
  - Added Interface SharedGallery
  - Added Interface SharedGalleryDataDiskImage
  - Added Interface SharedGalleryImage
  - Added Interface SharedGalleryImageVersion
  - Added Interface SharedGalleryOSDiskImage
  - Added Interface Snapshot
  - Added Interface SshPublicKeyResource
  - Added Interface SshPublicKeyUpdateResource
  - Added Interface SubResourceWithColocationStatus
  - Added Interface SystemData
  - Added Interface ThrottledRequestsInput
  - Added Interface VirtualMachine
  - Added Interface VirtualMachineCaptureResult
  - Added Interface VirtualMachineExtension
  - Added Interface VirtualMachineExtensionImage
  - Added Interface VirtualMachineExtensionUpdate
  - Added Interface VirtualMachineImage
  - Added Interface VirtualMachineImageResource
  - Added Interface VirtualMachineRunCommand
  - Added Interface VirtualMachineRunCommandUpdate
  - Added Interface VirtualMachineScaleSet
  - Added Interface VirtualMachineScaleSetExtension
  - Added Interface VirtualMachineScaleSetExtensionUpdate
  - Added Interface VirtualMachineScaleSetIPConfiguration
  - Added Interface VirtualMachineScaleSetNetworkConfiguration
  - Added Interface VirtualMachineScaleSetReimageParameters
  - Added Interface VirtualMachineScaleSetUpdate
  - Added Interface VirtualMachineScaleSetUpdateIPConfiguration
  - Added Interface VirtualMachineScaleSetUpdateNetworkConfiguration
  - Added Interface VirtualMachineScaleSetVM
  - Added Interface VirtualMachineScaleSetVMExtension
  - Added Interface VirtualMachineScaleSetVMExtensionUpdate
  - Added Interface VirtualMachineScaleSetVMReimageParameters
  - Added Interface VirtualMachineUpdate
  - Added Type Alias CloudServiceSlotType
  - Interface CloudService has a new optional parameter systemData
  - Interface CloudServiceNetworkProfile has a new optional parameter slotType
  - Added Enum KnownCloudServiceSlotType
    
    
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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).

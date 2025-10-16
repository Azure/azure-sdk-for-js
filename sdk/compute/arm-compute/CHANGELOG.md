# Release History

## 23.1.0 (2025-09-16)

### Features Added
  - Added operation VirtualMachineScaleSets.beginScaleOut
  - Added operation VirtualMachineScaleSets.beginScaleOutAndWait
  - Added Interface AllInstancesDown
  - Added Interface MaxInstancePercentPerZonePolicy
  - Added Interface ScheduleProfile
  - Added Interface VirtualMachineScaleSetsScaleOutHeaders
  - Added Interface VirtualMachineScaleSetsScaleOutOptionalParams
  - Added Interface VMScaleSetScaleOutInput
  - Added Interface VMScaleSetScaleOutInputProperties
  - Added Interface ZoneAllocationPolicy
  - Interface CapacityReservation has a new optional parameter scheduleProfile
  - Interface CapacityReservationGroup has a new optional parameter reservationType
  - Interface CapacityReservationGroupUpdate has a new optional parameter reservationType
  - Interface CapacityReservationUpdate has a new optional parameter scheduleProfile
  - Interface EventGridAndResourceGraph has a new optional parameter scheduledEventsApiVersion
  - Interface OrchestrationServiceSummary has a new optional parameter lastStatusChangeTime
  - Interface OrchestrationServiceSummary has a new optional parameter latestOperationStatus
  - Interface ProxyAgentSettings has a new optional parameter addProxyAgentExtension
  - Interface ResiliencyPolicy has a new optional parameter zoneAllocationPolicy
  - Interface ScheduledEventsPolicy has a new optional parameter allInstancesDown
  - Interface VirtualMachineNetworkInterfaceConfiguration has a new optional parameter tags
  - Interface VirtualMachinePublicIPAddressConfiguration has a new optional parameter tags
  - Interface VirtualMachineRunCommandScriptSource has a new optional parameter galleryScriptReferenceId
  - Interface VirtualMachineRunCommandScriptSource has a new optional parameter scriptShell
  - Interface VirtualMachineScaleSet has a new optional parameter highSpeedInterconnectPlacement
  - Interface VirtualMachineScaleSet has a new optional parameter placement
  - Interface VirtualMachineScaleSetNetworkConfiguration has a new optional parameter tags
  - Interface VirtualMachineScaleSetPublicIPAddressConfiguration has a new optional parameter tags
  - Interface VirtualMachineScaleSetUpdateNetworkConfiguration has a new optional parameter tags
  - Interface VirtualMachineScaleSetUpdatePublicIPAddressConfiguration has a new optional parameter tags
  - Interface WindowsParameters has a new optional parameter patchNameMasksToExclude
  - Interface WindowsParameters has a new optional parameter patchNameMasksToInclude
  - Added Type Alias HighSpeedInterconnectPlacement
  - Added Type Alias OrchestrationServiceOperationStatus
  - Added Type Alias ReservationType
  - Added Type Alias ScriptShellTypes
  - Added Enum KnownHighSpeedInterconnectPlacement
  - Added Enum KnownOrchestrationServiceOperationStatus
  - Added Enum KnownReservationType
  - Added Enum KnownScriptShellTypes
  - Enum KnownOrchestrationServiceNames has a new value AutomaticZoneRebalancing
  - Enum KnownZonePlacementPolicyType has a new value Auto

## 23.0.0 (2025-07-21)

### Features Added
  - Added Interface AvailabilityPolicy
  - Added Interface AvailabilitySetsConvertToVirtualMachineScaleSetHeaders
  - Added Interface CapacityReservationsCreateOrUpdateHeaders
  - Added Interface CapacityReservationsDeleteHeaders
  - Added Interface CapacityReservationsUpdateHeaders
  - Added Interface DedicatedHostsCreateOrUpdateHeaders
  - Added Interface DedicatedHostsDeleteHeaders
  - Added Interface DedicatedHostsRestartHeaders
  - Added Interface DedicatedHostsUpdateHeaders
  - Added Interface DiskAccessesCreateOrUpdateHeaders
  - Added Interface DiskAccessesDeleteAPrivateEndpointConnectionHeaders
  - Added Interface DiskAccessesDeleteHeaders
  - Added Interface DiskAccessesUpdateAPrivateEndpointConnectionHeaders
  - Added Interface DiskAccessesUpdateHeaders
  - Added Interface DiskEncryptionSetsCreateOrUpdateHeaders
  - Added Interface DiskEncryptionSetsDeleteHeaders
  - Added Interface DiskEncryptionSetsUpdateHeaders
  - Added Interface DiskRestorePointGrantAccessHeaders
  - Added Interface DiskRestorePointRevokeAccessHeaders
  - Added Interface DisksCreateOrUpdateHeaders
  - Added Interface DisksDeleteHeaders
  - Added Interface DisksGrantAccessHeaders
  - Added Interface DisksRevokeAccessHeaders
  - Added Interface DisksUpdateHeaders
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface GalleriesCreateOrUpdateHeaders
  - Added Interface GalleriesDeleteHeaders
  - Added Interface GalleriesUpdateHeaders
  - Added Interface GalleryApplicationsCreateOrUpdateHeaders
  - Added Interface GalleryApplicationsDeleteHeaders
  - Added Interface GalleryApplicationsUpdateHeaders
  - Added Interface GalleryApplicationVersionsCreateOrUpdateHeaders
  - Added Interface GalleryApplicationVersionsDeleteHeaders
  - Added Interface GalleryApplicationVersionsUpdateHeaders
  - Added Interface GalleryImagesCreateOrUpdateHeaders
  - Added Interface GalleryImagesDeleteHeaders
  - Added Interface GalleryImagesUpdateHeaders
  - Added Interface GalleryImageVersionsCreateOrUpdateHeaders
  - Added Interface GalleryImageVersionsDeleteHeaders
  - Added Interface GalleryImageVersionsUpdateHeaders
  - Added Interface GalleryInVMAccessControlProfilesCreateOrUpdateHeaders
  - Added Interface GalleryInVMAccessControlProfilesUpdateHeaders
  - Added Interface GalleryInVMAccessControlProfileVersionsCreateOrUpdateHeaders
  - Added Interface GalleryInVMAccessControlProfileVersionsUpdateHeaders
  - Added Interface GallerySharingProfileUpdateHeaders
  - Added Interface Image
  - Added Interface ImagesCreateOrUpdateHeaders
  - Added Interface ImagesDeleteHeaders
  - Added Interface ImagesUpdateHeaders
  - Added Interface LogAnalyticsExportRequestRateByIntervalHeaders
  - Added Interface LogAnalyticsExportThrottledRequestsHeaders
  - Added Interface Operation
  - Added Interface OperationDisplay
  - Added Interface OperationListResult
  - Added Interface RestorePointCollectionsDeleteHeaders
  - Added Interface RestorePointsCreateHeaders
  - Added Interface RestorePointsDeleteHeaders
  - Added Interface SnapshotsCreateOrUpdateHeaders
  - Added Interface SnapshotsDeleteHeaders
  - Added Interface SnapshotsGrantAccessHeaders
  - Added Interface SnapshotsRevokeAccessHeaders
  - Added Interface SnapshotsUpdateHeaders
  - Added Interface TrackedResource
  - Added Interface VirtualMachineExtensionsCreateOrUpdateHeaders
  - Added Interface VirtualMachineExtensionsDeleteHeaders
  - Added Interface VirtualMachineExtensionsUpdateHeaders
  - Added Interface VirtualMachineRunCommandsCreateOrUpdateHeaders
  - Added Interface VirtualMachineRunCommandsDeleteHeaders
  - Added Interface VirtualMachineRunCommandsUpdateHeaders
  - Added Interface VirtualMachinesAssessPatchesHeaders
  - Added Interface VirtualMachineScaleSetExtensionsCreateOrUpdateHeaders
  - Added Interface VirtualMachineScaleSetExtensionsDeleteHeaders
  - Added Interface VirtualMachineScaleSetExtensionsUpdateHeaders
  - Added Interface VirtualMachineScaleSetRollingUpgradesCancelHeaders
  - Added Interface VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeHeaders
  - Added Interface VirtualMachineScaleSetRollingUpgradesStartOSUpgradeHeaders
  - Added Interface VirtualMachineScaleSetsCreateOrUpdateHeaders
  - Added Interface VirtualMachineScaleSetsDeallocateHeaders
  - Added Interface VirtualMachineScaleSetsDeleteHeaders
  - Added Interface VirtualMachineScaleSetsDeleteInstancesHeaders
  - Added Interface VirtualMachineScaleSetsPerformMaintenanceHeaders
  - Added Interface VirtualMachineScaleSetsPowerOffHeaders
  - Added Interface VirtualMachineScaleSetsRedeployHeaders
  - Added Interface VirtualMachineScaleSetsReimageAllHeaders
  - Added Interface VirtualMachineScaleSetsReimageHeaders
  - Added Interface VirtualMachineScaleSetsRestartHeaders
  - Added Interface VirtualMachineScaleSetsSetOrchestrationServiceStateHeaders
  - Added Interface VirtualMachineScaleSetsStartHeaders
  - Added Interface VirtualMachineScaleSetsUpdateHeaders
  - Added Interface VirtualMachineScaleSetsUpdateInstancesHeaders
  - Added Interface VirtualMachineScaleSetVMExtensionsCreateOrUpdateHeaders
  - Added Interface VirtualMachineScaleSetVMExtensionsDeleteHeaders
  - Added Interface VirtualMachineScaleSetVMExtensionsUpdateHeaders
  - Added Interface VirtualMachineScaleSetVMRunCommandsCreateOrUpdateHeaders
  - Added Interface VirtualMachineScaleSetVMRunCommandsDeleteHeaders
  - Added Interface VirtualMachineScaleSetVMRunCommandsUpdateHeaders
  - Added Interface VirtualMachineScaleSetVMsDeallocateHeaders
  - Added Interface VirtualMachineScaleSetVMsDeleteHeaders
  - Added Interface VirtualMachineScaleSetVMsPerformMaintenanceHeaders
  - Added Interface VirtualMachineScaleSetVMsPowerOffHeaders
  - Added Interface VirtualMachineScaleSetVMsRedeployHeaders
  - Added Interface VirtualMachineScaleSetVMsReimageAllHeaders
  - Added Interface VirtualMachineScaleSetVMsReimageHeaders
  - Added Interface VirtualMachineScaleSetVMsRestartHeaders
  - Added Interface VirtualMachineScaleSetVMsRunCommandHeaders
  - Added Interface VirtualMachineScaleSetVMsStartHeaders
  - Added Interface VirtualMachineScaleSetVMsUpdateHeaders
  - Added Interface VirtualMachinesCaptureHeaders
  - Added Interface VirtualMachinesConvertToManagedDisksHeaders
  - Added Interface VirtualMachinesCreateOrUpdateHeaders
  - Added Interface VirtualMachinesDeallocateHeaders
  - Added Interface VirtualMachinesDeleteHeaders
  - Added Interface VirtualMachinesInstallPatchesHeaders
  - Added Interface VirtualMachinesMigrateToVMScaleSetHeaders
  - Added Interface VirtualMachinesPerformMaintenanceHeaders
  - Added Interface VirtualMachinesPowerOffHeaders
  - Added Interface VirtualMachinesReapplyHeaders
  - Added Interface VirtualMachinesRedeployHeaders
  - Added Interface VirtualMachinesReimageHeaders
  - Added Interface VirtualMachinesRestartHeaders
  - Added Interface VirtualMachinesRunCommandHeaders
  - Added Interface VirtualMachinesStartHeaders
  - Added Interface VirtualMachinesUpdateHeaders
  - Interface AccessUri has a new optional parameter securityMetadataAccessSAS
  - Interface AvailabilitySet has a new optional parameter systemData
  - Interface CapacityReservation has a new optional parameter systemData
  - Interface CapacityReservationGroup has a new optional parameter systemData
  - Interface CreationData has a new optional parameter instantAccessDurationMinutes
  - Interface CreationData has a new optional parameter securityMetadataUri
  - Interface DedicatedHost has a new optional parameter systemData
  - Interface DedicatedHostGroup has a new optional parameter systemData
  - Interface DedicatedHostSizeListResult has a new optional parameter nextLink
  - Interface DedicatedHostsRedeployHeaders has a new optional parameter retryAfter
  - Interface Disk has a new optional parameter availabilityPolicy
  - Interface Disk has a new optional parameter systemData
  - Interface DiskAccess has a new optional parameter systemData
  - Interface DiskEncryptionSet has a new optional parameter systemData
  - Interface DiskRestorePoint has a new optional parameter systemData
  - Interface DiskUpdate has a new optional parameter availabilityPolicy
  - Interface Gallery has a new optional parameter systemData
  - Interface GalleryApplication has a new optional parameter systemData
  - Interface GalleryApplicationVersion has a new optional parameter systemData
  - Interface GalleryImage has a new optional parameter systemData
  - Interface GalleryImageVersion has a new optional parameter systemData
  - Interface GalleryInVMAccessControlProfile has a new optional parameter systemData
  - Interface GalleryInVMAccessControlProfileVersion has a new optional parameter systemData
  - Interface GallerySoftDeletedResource has a new optional parameter systemData
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface ProximityPlacementGroup has a new optional parameter systemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface RestorePoint has a new optional parameter systemData
  - Interface RestorePointCollection has a new optional parameter systemData
  - Interface RollingUpgradeStatusInfo has a new optional parameter systemData
  - Interface Snapshot has a new optional parameter snapshotAccessState
  - Interface Snapshot has a new optional parameter systemData
  - Interface SnapshotUpdate has a new optional parameter snapshotAccessState
  - Interface SshPublicKeyResource has a new optional parameter systemData
  - Interface SupportedCapabilities has a new optional parameter supportedSecurityOption
  - Interface SystemData has a new optional parameter createdBy
  - Interface SystemData has a new optional parameter createdByType
  - Interface SystemData has a new optional parameter lastModifiedBy
  - Interface SystemData has a new optional parameter lastModifiedByType
  - Interface VirtualMachine has a new optional parameter systemData
  - Interface VirtualMachineExtension has a new optional parameter systemData
  - Interface VirtualMachineExtensionImage has a new optional parameter systemData
  - Interface VirtualMachineRunCommand has a new optional parameter systemData
  - Interface VirtualMachinesAttachDetachDataDisksHeaders has a new optional parameter retryAfter
  - Interface VirtualMachineScaleSet has a new optional parameter systemData
  - Interface VirtualMachineScaleSetsApproveRollingUpgradeHeaders has a new optional parameter retryAfter
  - Interface VirtualMachineScaleSetsReapplyHeaders has a new optional parameter retryAfter
  - Interface VirtualMachineScaleSetVM has a new optional parameter systemData
  - Interface VirtualMachineScaleSetVMsApproveRollingUpgradeHeaders has a new optional parameter retryAfter
  - Interface VirtualMachineScaleSetVMsAttachDetachDataDisksHeaders has a new optional parameter retryAfter
  - Interface VirtualMachineSizeListResult has a new optional parameter nextLink
  - Added Type Alias ActionType
  - Added Type Alias AvailabilityPolicyDiskDelay
  - Added Type Alias AvailabilitySetsConvertToVirtualMachineScaleSetResponse
  - Added Type Alias AvailabilitySetsListAvailableSizesNextResponse
  - Added Type Alias CreatedByType
  - Added Type Alias DedicatedHostsListAvailableSizesNextResponse
  - Added Type Alias DedicatedHostsRestartResponse
  - Added Type Alias OperationsListNextResponse
  - Added Type Alias Origin
  - Added Type Alias SnapshotAccessState
  - Added Type Alias SupportedSecurityOption
  - Added Type Alias VirtualMachineSizesListNextResponse
  - Added Type Alias VirtualMachinesListAvailableSizesNextResponse
  - Added Type Alias VirtualMachinesMigrateToVMScaleSetResponse
  - Added Enum KnownActionType
  - Added Enum KnownAvailabilityPolicyDiskDelay
  - Added Enum KnownCreatedByType
  - Added Enum KnownOrigin
  - Added Enum KnownSnapshotAccessState
  - Added Enum KnownSupportedSecurityOption

### Breaking Changes
  - Operation AvailabilitySets.beginConvertToVirtualMachineScaleSetAndWait has a new signature
  - Operation DedicatedHosts.beginRestartAndWait has a new signature
  - Operation VirtualMachines.beginMigrateToVMScaleSetAndWait has a new signature
  - Removed Interface ComputeOperationListResult
  - Removed Interface ComputeOperationValue
  - Removed Interface GalleryArtifactSource
  - Removed Interface Image_2
  - Removed Interface LatestGalleryImageVersion
  - Removed Interface ManagedArtifact
  - Removed Interface ProxyOnlyResource
  - Removed Interface VirtualMachineImagesWithPropertiesListResult
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Parameter value of interface PrivateEndpointConnectionListResult is now required
  - Parameter value of interface RestorePointCollectionListResult is now required
  - Parameter location of interface VirtualMachineExtension is now required
  - Removed Type Alias Expand
  - Removed Type Alias VirtualMachineImagesListWithPropertiesNextResponse
  - Type alias "VirtualMachineExtensionsUpdateResponse" has been changed
  - Type alias "VirtualMachineImagesListWithPropertiesResponse" has been changed
  - Type alias "VirtualMachinesUpdateResponse" has been changed
  - Removed Enum KnownExpand
  - Enum KnownOrchestrationServiceNames no longer has value DummyOrchestrationServiceName

    
## 22.4.0 (2025-03-18)
    
### Features Added

  - Added operation AvailabilitySets.beginConvertToVirtualMachineScaleSet
  - Added operation AvailabilitySets.beginConvertToVirtualMachineScaleSetAndWait
  - Added operation AvailabilitySets.cancelMigrationToVirtualMachineScaleSet
  - Added operation AvailabilitySets.startMigrationToVirtualMachineScaleSet
  - Added operation AvailabilitySets.validateMigrationToVirtualMachineScaleSet
  - Added operation VirtualMachineImages.listWithProperties
  - Added operation VirtualMachines.beginMigrateToVMScaleSet
  - Added operation VirtualMachines.beginMigrateToVMScaleSetAndWait
  - Added Interface AutomaticZoneRebalancingPolicy
  - Added Interface AvailabilitySetsCancelMigrationToVirtualMachineScaleSetOptionalParams
  - Added Interface AvailabilitySetsConvertToVirtualMachineScaleSetOptionalParams
  - Added Interface AvailabilitySetsStartMigrationToVirtualMachineScaleSetOptionalParams
  - Added Interface AvailabilitySetsValidateMigrationToVirtualMachineScaleSetOptionalParams
  - Added Interface ConvertToVirtualMachineScaleSetInput
  - Added Interface DefaultVirtualMachineScaleSetInfo
  - Added Interface HostEndpointSettings
  - Added Interface MigrateToVirtualMachineScaleSetInput
  - Added Interface MigrateVMToVirtualMachineScaleSetInput
  - Added Interface Placement
  - Added Interface VirtualMachineImagesListWithPropertiesNextOptionalParams
  - Added Interface VirtualMachineImagesListWithPropertiesOptionalParams
  - Added Interface VirtualMachineImagesWithPropertiesListResult
  - Added Interface VirtualMachineScaleSetMigrationInfo
  - Added Interface VirtualMachinesMigrateToVMScaleSetOptionalParams
  - Added Type Alias Expand
  - Added Type Alias Modes
  - Added Type Alias RebalanceBehavior
  - Added Type Alias RebalanceStrategy
  - Added Type Alias ResilientVMDeletionStatus
  - Added Type Alias VirtualMachineImagesListWithPropertiesNextResponse
  - Added Type Alias VirtualMachineImagesListWithPropertiesResponse
  - Added Type Alias ZonePlacementPolicyType
  - Interface AvailabilitySet has a new optional parameter virtualMachineScaleSetMigrationInfo
  - Interface AvailabilitySetUpdate has a new optional parameter virtualMachineScaleSetMigrationInfo
  - Interface ProxyAgentSettings has a new optional parameter imds
  - Interface ProxyAgentSettings has a new optional parameter wireServer
  - Interface ResiliencyPolicy has a new optional parameter automaticZoneRebalancingPolicy
  - Interface ScaleInPolicy has a new optional parameter prioritizeUnhealthyVMs
  - Interface SkuProfileVMSize has a new optional parameter rank
  - Interface StorageProfile has a new optional parameter alignRegionalDisksToVMZone
  - Interface VirtualMachine has a new optional parameter placement
  - Interface VirtualMachineScaleSetVM has a new optional parameter resilientVMDeletionStatus
  - Added Enum KnownExpand
  - Added Enum KnownModes
  - Added Enum KnownRebalanceBehavior
  - Added Enum KnownRebalanceStrategy
  - Added Enum KnownResilientVMDeletionStatus
  - Added Enum KnownZonePlacementPolicyType
  - Enum KnownAllocationStrategy has a new value Prioritized
  - Enum KnownNetworkApiVersion has a new value TwoThousandTwentyTwo1101
    
    
## 22.3.0 (2025-01-09)
    
### Features Added

  - Interface CloudServiceVaultCertificate has a new optional parameter isBootstrapCertificate
    
    
## 22.2.0 (2024-12-11)
    
### Features Added

  - Added operation group GalleryInVMAccessControlProfiles
  - Added operation group GalleryInVMAccessControlProfileVersions
  - Added operation group SoftDeletedResource
  - Added Interface AccessControlRules
  - Added Interface AccessControlRulesIdentity
  - Added Interface AccessControlRulesPrivilege
  - Added Interface AccessControlRulesRole
  - Added Interface AccessControlRulesRoleAssignment
  - Added Interface AdditionalReplicaSet
  - Added Interface ExecutedValidation
  - Added Interface GalleryIdentity
  - Added Interface GalleryInVMAccessControlProfile
  - Added Interface GalleryInVMAccessControlProfileList
  - Added Interface GalleryInVMAccessControlProfileProperties
  - Added Interface GalleryInVMAccessControlProfilesCreateOrUpdateOptionalParams
  - Added Interface GalleryInVMAccessControlProfilesDeleteHeaders
  - Added Interface GalleryInVMAccessControlProfilesDeleteOptionalParams
  - Added Interface GalleryInVMAccessControlProfilesGetOptionalParams
  - Added Interface GalleryInVMAccessControlProfilesListByGalleryNextOptionalParams
  - Added Interface GalleryInVMAccessControlProfilesListByGalleryOptionalParams
  - Added Interface GalleryInVMAccessControlProfilesUpdateOptionalParams
  - Added Interface GalleryInVMAccessControlProfileUpdate
  - Added Interface GalleryInVMAccessControlProfileVersion
  - Added Interface GalleryInVMAccessControlProfileVersionList
  - Added Interface GalleryInVMAccessControlProfileVersionProperties
  - Added Interface GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams
  - Added Interface GalleryInVMAccessControlProfileVersionsDeleteHeaders
  - Added Interface GalleryInVMAccessControlProfileVersionsDeleteOptionalParams
  - Added Interface GalleryInVMAccessControlProfileVersionsGetOptionalParams
  - Added Interface GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileNextOptionalParams
  - Added Interface GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileOptionalParams
  - Added Interface GalleryInVMAccessControlProfileVersionsUpdateOptionalParams
  - Added Interface GalleryInVMAccessControlProfileVersionUpdate
  - Added Interface GalleryResourceProfilePropertiesBase
  - Added Interface GalleryResourceProfileVersionPropertiesBase
  - Added Interface GallerySoftDeletedResource
  - Added Interface GallerySoftDeletedResourceList
  - Added Interface PlatformAttribute
  - Added Interface SoftDeletedResourceListByArtifactNameNextOptionalParams
  - Added Interface SoftDeletedResourceListByArtifactNameOptionalParams
  - Added Interface ValidationsProfile
  - Added Type Alias AccessControlRulesMode
  - Added Type Alias EndpointAccess
  - Added Type Alias EndpointTypes
  - Added Type Alias GalleryApplicationScriptRebootBehavior
  - Added Type Alias GalleryInVMAccessControlProfilesCreateOrUpdateResponse
  - Added Type Alias GalleryInVMAccessControlProfilesDeleteResponse
  - Added Type Alias GalleryInVMAccessControlProfilesGetResponse
  - Added Type Alias GalleryInVMAccessControlProfilesListByGalleryNextResponse
  - Added Type Alias GalleryInVMAccessControlProfilesListByGalleryResponse
  - Added Type Alias GalleryInVMAccessControlProfilesUpdateResponse
  - Added Type Alias GalleryInVMAccessControlProfileVersionsCreateOrUpdateResponse
  - Added Type Alias GalleryInVMAccessControlProfileVersionsDeleteResponse
  - Added Type Alias GalleryInVMAccessControlProfileVersionsGetResponse
  - Added Type Alias GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileNextResponse
  - Added Type Alias GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileResponse
  - Added Type Alias GalleryInVMAccessControlProfileVersionsUpdateResponse
  - Added Type Alias SoftDeletedArtifactTypes
  - Added Type Alias SoftDeletedResourceListByArtifactNameNextResponse
  - Added Type Alias SoftDeletedResourceListByArtifactNameResponse
  - Added Type Alias ValidationStatus
  - Interface Gallery has a new optional parameter identity
  - Interface GalleryImage has a new optional parameter allowUpdateImage
  - Interface GalleryImageFeature has a new optional parameter startsAtVersion
  - Interface GalleryImageUpdate has a new optional parameter allowUpdateImage
  - Interface GalleryImageVersion has a new optional parameter restore
  - Interface GalleryImageVersion has a new optional parameter validationsProfile
  - Interface GalleryImageVersionSafetyProfile has a new optional parameter blockDeletionBeforeEndOfLife
  - Interface GalleryImageVersionUpdate has a new optional parameter restore
  - Interface GalleryImageVersionUpdate has a new optional parameter validationsProfile
  - Interface GalleryList has a new optional parameter securityProfile
  - Interface GalleryUpdate has a new optional parameter identity
  - Interface TargetRegion has a new optional parameter additionalReplicaSets
  - Interface UserArtifactSettings has a new optional parameter scriptBehaviorAfterReboot
  - Added Enum KnownAccessControlRulesMode
  - Added Enum KnownEndpointAccess
  - Added Enum KnownGalleryApplicationScriptRebootBehavior
  - Added Enum KnownSoftDeletedArtifactTypes
  - Added Enum KnownValidationStatus
  - Enum KnownStorageAccountType has a new value PremiumV2LRS
    
    
## 22.1.0 (2024-08-12)
    
### Features Added

  - Added Interface SkuProfile
  - Added Interface SkuProfileVMSize
  - Added Type Alias AllocationStrategy
  - Added Type Alias ZonalPlatformFaultDomainAlignMode
  - Interface AvailabilitySet has a new optional parameter scheduledEventsPolicy
  - Interface AvailabilitySetUpdate has a new optional parameter scheduledEventsPolicy
  - Interface DiskRestorePoint has a new optional parameter logicalSectorSize
  - Interface VirtualMachineScaleSet has a new optional parameter skuProfile
  - Interface VirtualMachineScaleSet has a new optional parameter zonalPlatformFaultDomainAlignMode
  - Interface VirtualMachineScaleSetUpdate has a new optional parameter skuProfile
  - Interface VirtualMachineScaleSetUpdate has a new optional parameter zonalPlatformFaultDomainAlignMode
  - Interface VirtualMachineScaleSetUpdate has a new optional parameter zones
  - Added Enum KnownAllocationStrategy
  - Added Enum KnownZonalPlatformFaultDomainAlignMode
    
    
## 22.0.0 (2024-07-16)
    
### Features Added

  - Added Interface DiskPurchasePlan
  - Added Interface SecurityPostureReferenceUpdate
  - Interface SecurityPostureReference has a new optional parameter isOverridable
  - Interface VirtualMachineScaleSetUpdateVMProfile has a new optional parameter securityPostureReference

### Breaking Changes

  - Parameter id of interface SecurityPostureReference is now required
  - Type of parameter purchasePlan of interface Disk is changed from PurchasePlanAutoGenerated to DiskPurchasePlan
  - Type of parameter purchasePlan of interface DiskRestorePoint is changed from PurchasePlanAutoGenerated to DiskPurchasePlan
  - Type of parameter purchasePlan of interface DiskUpdate is changed from PurchasePlanAutoGenerated to DiskPurchasePlan
  - Type of parameter excludeExtensions of interface SecurityPostureReference is changed from VirtualMachineExtension[] to string[]
  - Type of parameter purchasePlan of interface Snapshot is changed from PurchasePlanAutoGenerated to DiskPurchasePlan
    
    
## 21.6.0 (2024-04-26)
    
### Features Added

  - Added Interface EventGridAndResourceGraph
  - Added Interface ScheduledEventsAdditionalPublishingTargets
  - Added Interface ScheduledEventsPolicy
  - Added Interface UserInitiatedReboot
  - Added Interface UserInitiatedRedeploy
  - Added Type Alias ResourceIdOptionsForGetCapacityReservationGroups
  - Interface CapacityReservationGroupsListBySubscriptionOptionalParams has a new optional parameter resourceIdsOnly
  - Interface DataDisk has a new optional parameter sourceResource
  - Interface DataDisksToAttach has a new optional parameter caching
  - Interface DataDisksToAttach has a new optional parameter deleteOption
  - Interface DataDisksToAttach has a new optional parameter diskEncryptionSet
  - Interface DataDisksToAttach has a new optional parameter writeAcceleratorEnabled
  - Interface VirtualMachine has a new optional parameter scheduledEventsPolicy
  - Interface VirtualMachineScaleSet has a new optional parameter scheduledEventsPolicy
  - Interface VirtualMachineScaleSetUpdateOSDisk has a new optional parameter diffDiskSettings
  - Interface VirtualMachineScaleSetVMReimageParameters has a new optional parameter forceUpdateOSDiskForEphemeral
  - Interface VirtualMachineUpdate has a new optional parameter scheduledEventsPolicy
  - Added Enum KnownResourceIdOptionsForGetCapacityReservationGroups
  - Enum KnownDiffDiskPlacement has a new value NvmeDisk
  - Enum KnownDiskCreateOptionTypes has a new value Copy
  - Enum KnownDiskCreateOptionTypes has a new value Restore
    
    
## 21.5.0 (2024-03-01)
    
### Features Added

  - Interface GalleryArtifactVersionFullSource has a new optional parameter virtualMachineId
    
    
## 21.4.0 (2023-12-28)
    
### Features Added

  - Added Type Alias ProvisionedBandwidthCopyOption
  - Interface CreationData has a new optional parameter provisionedBandwidthCopySpeed
  - Added Enum KnownProvisionedBandwidthCopyOption
  - Enum KnownDiskSecurityTypes has a new value ConfidentialVMNonPersistedTPM
    
    
## 21.3.0 (2023-12-08)
    
### Features Added

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
    
### Features Added

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
    
### Features Added

  - Added Type Alias FileFormat
  - Interface GrantAccessData has a new optional parameter fileFormat
  - Added Enum KnownFileFormat
    
    
## 21.0.0 (2023-05-17)
    
### Features Added

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

### Breaking Changes

  - Type of parameter identifier of interface CommunityGalleryImage is changed from GalleryImageIdentifier to CommunityGalleryImageIdentifier
  - Type of parameter storageAccountType of interface GalleryTargetExtendedLocation is changed from StorageAccountType to EdgeZoneStorageAccountType
  - Type of parameter diskRestorePoint of interface RestorePointSourceVMDataDisk is changed from ApiEntityReference to DiskRestorePointAttributes
  - Type of parameter diskRestorePoint of interface RestorePointSourceVmosDisk is changed from ApiEntityReference to DiskRestorePointAttributes
    
    
## 20.0.0 (2023-01-05)
    
### Features Added

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

### Breaking Changes

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
    
### Features Added

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
    
### Features Added

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
    
### Features Added

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

### Breaking Changes

  - Removed Enum KnownGalleryApplicationVersionPropertiesProvisioningState
  - Removed Enum KnownGalleryImagePropertiesProvisioningState
  - Removed Enum KnownGalleryImageVersionPropertiesProvisioningState
  - Removed Enum KnownGalleryPropertiesProvisioningState
  - Enum KnownSharingProfileGroupTypes no longer has value Community
    
    
## 18.0.0 (2022-05-23)
    
### Features Added

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

### Breaking Changes

  - Delete parameters of Resource in TypeAlias VirtualMachineExtension
    
## 17.3.1 (2022-04-06)

**features**

  -  Bug fix

## 17.3.0 (2022-03-02)
    
### Features Added

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
    
### Features Added

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
    
### Features Added

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

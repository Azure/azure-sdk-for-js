# Release History
    
## 17.2.0 (2022-01-24)
    
**Features**

  - Added operation DedicatedHosts.beginRestart
  - Added operation DedicatedHosts.beginRestartAndWait
  - Added Interface DedicatedHostsRestartOptionalParams
  - Added Interface DiskRestorePointInstanceView
  - Added Interface DiskRestorePointReplicationStatus
  - Added Interface RestorePointInstanceView
  - Added Interface VirtualMachineScaleSetHardwareProfile
  - Added Interface VMDiskSecurityProfile
  - Added Type Alias RepairAction
  - Added Type Alias RestorePointExpandOptions
  - Added Type Alias SecurityEncryptionTypes
  - Interface AutomaticRepairsPolicy has a new optional parameter repairAction
  - Interface RestorePointsGetOptionalParams has a new optional parameter expand
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
  - Type Alias ImageReference has a new parameter communityGalleryImageId
  - Type Alias ManagedDiskParameters has a new parameter securityProfile
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
  - Added Enum KnownRepairAction
  - Added Enum KnownRestorePointExpandOptions
  - Added Enum KnownSecurityEncryptionTypes
  - Enum KnownSecurityTypes has a new value ConfidentialVM
    
    
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

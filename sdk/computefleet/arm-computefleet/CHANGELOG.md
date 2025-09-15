# Release History

## 2.0.0-beta.1 (2025-09-15)
Compared with version 1.0.0

### Features Added
  - Added operation FleetsOperations.cancel
  - Added operation FleetsOperations.listVirtualMachines
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface FleetsCancelOptionalParams
  - Added Interface FleetsListVirtualMachinesOptionalParams
  - Added Interface VirtualMachine
  - Added Interface ZoneAllocationPolicy
  - Added Interface ZonePreference
  - Interface AzureFleetClientOptionalParams has a new optional parameter cloudSetting
  - Interface FleetProperties has a new optional parameter capacityType
  - Interface FleetProperties has a new optional parameter mode
  - Interface FleetProperties has a new optional parameter zoneAllocationPolicy
  - Interface VirtualMachineScaleSetDataDisk has a new optional parameter diskIopsReadWrite
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CapacityType
  - Added Type Alias FleetMode
  - Added Type Alias VMOperationStatus
  - Added Type Alias ZoneDistributionStrategy
  - Added Enum AzureClouds
  - Added Enum KnownCapacityType
  - Added Enum KnownFleetMode
  - Added Enum KnownVersions
  - Added Enum KnownVMOperationStatus
  - Added Enum KnownZoneDistributionStrategy
  - Enum KnownAcceleratorType has a new value Fpga
  - Enum KnownDiskControllerTypes has a new value Scsi

### Breaking Changes
  - Interface VirtualMachineScaleSet has a new required parameter name
  - Interface VirtualMachineScaleSetDataDisk no longer has parameter diskIOPSReadWrite
  - Enum KnownAcceleratorType no longer has value FPGA
  - Enum KnownDiskControllerTypes no longer has value SCSI

    
## 1.0.0 (2024-10-21)

### Features Added

This is the first stable version with the package of @azure/arm-computefleet.

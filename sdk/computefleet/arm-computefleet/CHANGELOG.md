# Release History

## 2.0.0-beta.1 (2025-08-05)
Compared with version 1.0.0

### Features Added
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Interface AzureFleetClientOptionalParams has a new optional parameter cloudSetting
  - Interface VirtualMachineScaleSetDataDisk has a new optional parameter diskIopsReadWrite
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions
  - Enum KnownAcceleratorType has a new value Fpga
  - Enum KnownDiskControllerTypes has a new value Scsi

### Breaking Changes
  - Interface VirtualMachineScaleSetDataDisk no longer has parameter diskIOPSReadWrite
  - Enum KnownAcceleratorType no longer has value FPGA
  - Enum KnownDiskControllerTypes no longer has value SCSI

    
## 1.0.0 (2024-10-21)

### Features Added

This is the first stable version with the package of @azure/arm-computefleet.

# Release History
    
## 2.0.0 (2025-05-16)
    
### Features Added

  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Interface VirtualMachineScaleSetDataDisk has a new optional parameter diskIopsReadWrite
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

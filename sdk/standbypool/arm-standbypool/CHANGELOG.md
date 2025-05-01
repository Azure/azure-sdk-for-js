# Release History
    
## 2.0.0 (2025-04-16)
    
### Features Added

  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface PoolContainerGroupStateCount
  - Added Interface PoolStatus
  - Added Interface PoolVirtualMachineStateCount
  - Added Interface StandbyContainerGroupPoolForecastValues
  - Added Interface StandbyContainerGroupPoolPrediction
  - Added Interface StandbyVirtualMachinePoolForecastValues
  - Added Interface StandbyVirtualMachinePoolPrediction
  - Added Type Alias HealthStateCode
  - Added Type Alias PoolContainerGroupState
  - Added Type Alias PoolVirtualMachineState
  - Interface ContainerGroupInstanceCountSummary has a new optional parameter zone
  - Interface StandbyContainerGroupPoolResourceProperties has a new optional parameter zones
  - Interface StandbyContainerGroupPoolResourceUpdateProperties has a new optional parameter zones
  - Interface StandbyContainerGroupPoolRuntimeViewResourceProperties has a new optional parameter prediction
  - Interface StandbyContainerGroupPoolRuntimeViewResourceProperties has a new optional parameter status
  - Interface StandbyVirtualMachinePoolRuntimeViewResourceProperties has a new optional parameter prediction
  - Interface StandbyVirtualMachinePoolRuntimeViewResourceProperties has a new optional parameter status
  - Added Enum KnownHealthStateCode
  - Added Enum KnownPoolContainerGroupState
  - Added Enum KnownPoolVirtualMachineState
  - Added Enum KnownVersions
  - Enum KnownVirtualMachineState has a new value Hibernated

### Breaking Changes

  - Type of parameter instanceCountsByState of interface ContainerGroupInstanceCountSummary is changed from PoolResourceStateCount[] to PoolContainerGroupStateCount[]
  - Type of parameter instanceCountsByState of interface VirtualMachineInstanceCountSummary is changed from PoolResourceStateCount[] to PoolVirtualMachineStateCount[]
    
## 1.0.1 (2024-11-04)

### Bugs Fixed

- Fix missing package information issue in user agent
    
## 1.0.0 (2024-09-11)

### Features Added

This is the first stable version with the package of @azure/arm-standbypool.

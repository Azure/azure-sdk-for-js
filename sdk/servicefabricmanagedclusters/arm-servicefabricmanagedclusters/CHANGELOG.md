# Release History

## 1.1.0-beta.3 (2026-11-23)
Compared with version 1.0.0

### Features Added
  - Added operation ManagedClustersOperations.getFaultSimulation
  - Added operation ManagedClustersOperations.listFaultSimulation
  - Added operation ManagedClustersOperations.startFaultSimulation
  - Added operation ManagedClustersOperations.stopFaultSimulation
  - Added operation NodeTypesOperations.getFaultSimulation
  - Added operation NodeTypesOperations.listFaultSimulation
  - Added operation NodeTypesOperations.reimageAllDisks
  - Added operation NodeTypesOperations.startFaultSimulation
  - Added operation NodeTypesOperations.stopFaultSimulation
  - Added Interface ApplyMaintenanceWindowRequest
  - Added Interface FaultSimulation
  - Added Interface FaultSimulationConstraints
  - Added Interface FaultSimulationContent
  - Added Interface FaultSimulationContentWrapper
  - Added Interface FaultSimulationDetails
  - Added Interface FaultSimulationIdContent
  - Added Interface HostEndpointSettings
  - Added Interface ManagedClustersGetFaultSimulationOptionalParams
  - Added Interface ManagedClustersListFaultSimulationOptionalParams
  - Added Interface ManagedClustersStartFaultSimulationOptionalParams
  - Added Interface ManagedClustersStopFaultSimulationOptionalParams
  - Added Interface NodeTypeFaultSimulation
  - Added Interface NodeTypesGetFaultSimulationOptionalParams
  - Added Interface NodeTypesListFaultSimulationOptionalParams
  - Added Interface NodeTypesReimageAllDisksOptionalParams
  - Added Interface NodeTypesStartFaultSimulationOptionalParams
  - Added Interface NodeTypesStopFaultSimulationOptionalParams
  - Added Interface ProxyAgentSettings
  - Added Interface ReimageAllDisksParameters
  - Added Interface ScaleInPolicy
  - Added Interface SkuProfile
  - Added Interface SkuProfileVmSize
  - Added Interface ZoneFaultSimulationContent
  - Interface ManagedApplyMaintenanceWindowPostOptionalParams has a new optional parameter body
  - Interface NodeType has a new optional parameter dataDiskCaching
  - Interface NodeType has a new optional parameter dataDiskIopsReadWrite
  - Interface NodeType has a new optional parameter dataDiskMBpsReadWrite
  - Interface NodeType has a new optional parameter dataDiskWriteAcceleratorEnabled
  - Interface NodeType has a new optional parameter proxyAgentSettings
  - Interface NodeType has a new optional parameter scaleInPolicy
  - Interface NodeType has a new optional parameter skuProfile
  - Interface NodeTypeProperties has a new optional parameter dataDiskCaching
  - Interface NodeTypeProperties has a new optional parameter dataDiskIopsReadWrite
  - Interface NodeTypeProperties has a new optional parameter dataDiskMBpsReadWrite
  - Interface NodeTypeProperties has a new optional parameter dataDiskWriteAcceleratorEnabled
  - Interface NodeTypeProperties has a new optional parameter proxyAgentSettings
  - Interface NodeTypeProperties has a new optional parameter scaleInPolicy
  - Interface NodeTypeProperties has a new optional parameter skuProfile
  - Interface VmssDataDisk has a new optional parameter caching
  - Interface VmssDataDisk has a new optional parameter diskIopsReadWrite
  - Interface VmssDataDisk has a new optional parameter diskMBpsReadWrite
  - Interface VmssDataDisk has a new optional parameter writeAcceleratorEnabled
  - Added Type Alias AllocationStrategy
  - Added Type Alias DiskCachingType
  - Added Type Alias FaultKind
  - Added Type Alias FaultSimulationContentUnion
  - Added Type Alias FaultSimulationStatus
  - Added Type Alias ScaleInPolicyMode
  - Added Type Alias SfmcOperationStatus
  - Added Enum KnownAllocationStrategy
  - Added Enum KnownDiskCachingType
  - Added Enum KnownFaultKind
  - Added Enum KnownFaultSimulationStatus
  - Added Enum KnownScaleInPolicyMode
  - Added Enum KnownSfmcOperationStatus
  - Enum KnownVersions has a new value V20241101Preview
  - Enum KnownVersions has a new value V20250301Preview
  - Enum KnownVersions has a new value V20250601Preview
  - Enum KnownVersions has a new value V20251001Preview
  - Enum KnownVersions has a new value V20260501Preview
  - Enum KnownVersions has a new value V20260901Preview

## 1.1.0-beta.2 (2026-08-31)
Compared with version 1.0.0

### Features Added
  - Added operation ManagedClustersOperations.getFaultSimulation
  - Added operation ManagedClustersOperations.listFaultSimulation
  - Added operation ManagedClustersOperations.startFaultSimulation
  - Added operation ManagedClustersOperations.stopFaultSimulation
  - Added operation NodeTypesOperations.getFaultSimulation
  - Added operation NodeTypesOperations.listFaultSimulation
  - Added operation NodeTypesOperations.startFaultSimulation
  - Added operation NodeTypesOperations.stopFaultSimulation
  - Added Interface ApplyMaintenanceWindowRequest
  - Added Interface FaultSimulation
  - Added Interface FaultSimulationConstraints
  - Added Interface FaultSimulationContent
  - Added Interface FaultSimulationContentWrapper
  - Added Interface FaultSimulationDetails
  - Added Interface FaultSimulationIdContent
  - Added Interface HostEndpointSettings
  - Added Interface ManagedClustersGetFaultSimulationOptionalParams
  - Added Interface ManagedClustersListFaultSimulationOptionalParams
  - Added Interface ManagedClustersStartFaultSimulationOptionalParams
  - Added Interface ManagedClustersStopFaultSimulationOptionalParams
  - Added Interface NodeTypeFaultSimulation
  - Added Interface NodeTypesGetFaultSimulationOptionalParams
  - Added Interface NodeTypesListFaultSimulationOptionalParams
  - Added Interface NodeTypesStartFaultSimulationOptionalParams
  - Added Interface NodeTypesStopFaultSimulationOptionalParams
  - Added Interface ProxyAgentSettings
  - Added Interface ScaleInPolicy
  - Added Interface ZoneFaultSimulationContent
  - Interface ManagedApplyMaintenanceWindowPostOptionalParams has a new optional parameter body
  - Interface NodeType has a new optional parameter proxyAgentSettings
  - Interface NodeType has a new optional parameter scaleInPolicy
  - Interface NodeTypeProperties has a new optional parameter proxyAgentSettings
  - Interface NodeTypeProperties has a new optional parameter scaleInPolicy
  - Added Type Alias FaultKind
  - Added Type Alias FaultSimulationContentUnion
  - Added Type Alias FaultSimulationStatus
  - Added Type Alias ScaleInPolicyMode
  - Added Type Alias SfmcOperationStatus
  - Added Enum KnownFaultKind
  - Added Enum KnownFaultSimulationStatus
  - Added Enum KnownScaleInPolicyMode
  - Added Enum KnownSfmcOperationStatus
  - Enum KnownVersions has a new value V20241101Preview
  - Enum KnownVersions has a new value V20250301Preview
  - Enum KnownVersions has a new value V20250601Preview
  - Enum KnownVersions has a new value V20251001Preview
  - Enum KnownVersions has a new value V20260501Preview

## 1.1.0-beta.1 (2026-05-19)
Compared with version 1.0.0

### Features Added
  - Added operation ManagedClustersOperations.getFaultSimulation
  - Added operation ManagedClustersOperations.listFaultSimulation
  - Added operation ManagedClustersOperations.startFaultSimulation
  - Added operation ManagedClustersOperations.stopFaultSimulation
  - Added operation NodeTypesOperations.getFaultSimulation
  - Added operation NodeTypesOperations.listFaultSimulation
  - Added operation NodeTypesOperations.startFaultSimulation
  - Added operation NodeTypesOperations.stopFaultSimulation
  - Added Interface ApplyMaintenanceWindowRequest
  - Added Interface FaultSimulation
  - Added Interface FaultSimulationConstraints
  - Added Interface FaultSimulationContent
  - Added Interface FaultSimulationContentWrapper
  - Added Interface FaultSimulationDetails
  - Added Interface FaultSimulationIdContent
  - Added Interface HostEndpointSettings
  - Added Interface ManagedClustersGetFaultSimulationOptionalParams
  - Added Interface ManagedClustersListFaultSimulationOptionalParams
  - Added Interface ManagedClustersStartFaultSimulationOptionalParams
  - Added Interface ManagedClustersStopFaultSimulationOptionalParams
  - Added Interface NodeTypeFaultSimulation
  - Added Interface NodeTypesGetFaultSimulationOptionalParams
  - Added Interface NodeTypesListFaultSimulationOptionalParams
  - Added Interface NodeTypesStartFaultSimulationOptionalParams
  - Added Interface NodeTypesStopFaultSimulationOptionalParams
  - Added Interface ProxyAgentSettings
  - Added Interface ScaleInPolicy
  - Added Interface ZoneFaultSimulationContent
  - Interface ManagedApplyMaintenanceWindowPostOptionalParams has a new optional parameter body
  - Interface NodeType has a new optional parameter proxyAgentSettings
  - Interface NodeType has a new optional parameter scaleInPolicy
  - Interface NodeTypeProperties has a new optional parameter proxyAgentSettings
  - Interface NodeTypeProperties has a new optional parameter scaleInPolicy
  - Added Type Alias FaultKind
  - Added Type Alias FaultSimulationContentUnion
  - Added Type Alias FaultSimulationStatus
  - Added Type Alias ScaleInPolicyMode
  - Added Type Alias SfmcOperationStatus
  - Added Enum KnownFaultKind
  - Added Enum KnownFaultSimulationStatus
  - Added Enum KnownScaleInPolicyMode
  - Added Enum KnownSfmcOperationStatus
  - Enum KnownVersions has a new value V20241101Preview
  - Enum KnownVersions has a new value V20250301Preview
  - Enum KnownVersions has a new value V20250601Preview
  - Enum KnownVersions has a new value V20251001Preview
  - Enum KnownVersions has a new value V20260501Preview

    
## 1.0.0 (2026-02-24)

### Features Added

This is the first stable version with the package of @azure/arm-servicefabricmanagedclusters

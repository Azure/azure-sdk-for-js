# Release History
    
## 3.1.0 (2022-04-19)
    
**Features**

  - Added Interface AgentConfiguration
  - Added Interface CloudMetadata
  - Added Interface ConfigurationExtension
  - Added Interface OSProfileLinuxConfiguration
  - Added Interface OSProfileWindowsConfiguration
  - Added Interface PrivateEndpointConnectionDataModel
  - Added Interface ServiceStatus
  - Added Interface ServiceStatuses
  - Added Type Alias AssessmentModeTypes
  - Added Type Alias PatchModeTypes
  - Interface HybridComputePrivateLinkScopeProperties has a new optional parameter privateEndpointConnections
  - Interface MachineExtensionProperties has a new optional parameter enableAutomaticUpgrade
  - Interface MachineProperties has a new optional parameter agentConfiguration
  - Interface MachineProperties has a new optional parameter cloudMetadata
  - Interface MachineProperties has a new optional parameter mssqlDiscovered
  - Interface MachineProperties has a new optional parameter osType
  - Interface MachineProperties has a new optional parameter serviceStatuses
  - Interface MachineUpdateProperties has a new optional parameter cloudMetadata
  - Interface MachineUpdateProperties has a new optional parameter osProfile
  - Interface OperationValue has a new optional parameter isDataAction
  - Interface OSProfile has a new optional parameter linuxConfiguration
  - Interface OSProfile has a new optional parameter windowsConfiguration
  - Interface PrivateEndpointConnectionProperties has a new optional parameter groupIds
  - Added Enum KnownAssessmentModeTypes
  - Added Enum KnownPatchModeTypes
    
    
## 3.0.0 (2022-01-18)

The package of @azure/arm-hybridcompute is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

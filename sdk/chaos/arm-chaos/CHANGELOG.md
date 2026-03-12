# Release History
    
## 2.0.0 (2025-05-27)
    
### Features Added

  - Added operation ExperimentsOperations.cancel
  - Added operation ExperimentsOperations.createOrUpdate
  - Added operation ExperimentsOperations.delete
  - Added operation ExperimentsOperations.start
  - Added operation ExperimentsOperations.update
  - Added Interface CapabilityProperties
  - Added Interface CapabilityTypeProperties
  - Added Interface ExperimentProperties
  - Added Interface ManagedServiceIdentity
  - Added Interface OperationStatusResult
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface TargetTypeProperties
  - Added Type Alias ContinuablePage
  - Added Type Alias ExperimentActionType
  - Added Type Alias ManagedServiceIdentityType
  - Interface Capability has a new optional parameter properties
  - Interface CapabilityType has a new optional parameter properties
  - Interface ExperimentExecution has a new optional parameter properties
  - Interface ExperimentExecutionDetails has a new optional parameter properties
  - Interface ExperimentExecutionDetailsProperties has a new optional parameter startedAt
  - Interface ExperimentExecutionDetailsProperties has a new optional parameter status
  - Interface ExperimentExecutionDetailsProperties has a new optional parameter stoppedAt
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownExperimentActionType
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownVersions
  - Added function restorePoller
  - Type of parameter tags of interface ExperimentUpdate is changed from {
        [propertyName: string]: string;
    } to Record<string, string>
  - Type of parameter properties of interface Target is changed from {
        [propertyName: string]: any;
    } to Record<string, any>
  - Type of parameter tags of interface TrackedResource is changed from {
        [propertyName: string]: string;
    } to Record<string, string>
  - Type of parameter type of interface ChaosExperimentAction is changed from "delay" | "discrete" | "continuous" to ExperimentActionType
  - Type of parameter type of interface ChaosTargetFilter is changed from "Simple" to FilterType
  - Type of parameter type of interface ChaosTargetSelector is changed from "List" | "Query" to SelectorType
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, unknown> to Record<string, any>
    
### Breaking Changes

  - Removed operation Experiments.beginCancel
  - Removed operation Experiments.beginCancelAndWait
  - Removed operation Experiments.beginCreateOrUpdate
  - Removed operation Experiments.beginCreateOrUpdateAndWait
  - Removed operation Experiments.beginDelete
  - Removed operation Experiments.beginDeleteAndWait
  - Removed operation Experiments.beginStart
  - Removed operation Experiments.beginStartAndWait
  - Removed operation Experiments.beginUpdate
  - Removed operation Experiments.beginUpdateAndWait
  - Class ChaosManagementClient has a new signature
  - Interface Capability no longer has parameter description
  - Interface Capability no longer has parameter parametersSchema
  - Interface Capability no longer has parameter publisher
  - Interface Capability no longer has parameter systemData
  - Interface Capability no longer has parameter targetType
  - Interface Capability no longer has parameter urn
  - Interface CapabilityType no longer has parameter azureRbacActions
  - Interface CapabilityType no longer has parameter azureRbacDataActions
  - Interface CapabilityType no longer has parameter description
  - Interface CapabilityType no longer has parameter displayName
  - Interface CapabilityType no longer has parameter kind
  - Interface CapabilityType no longer has parameter location
  - Interface CapabilityType no longer has parameter parametersSchema
  - Interface CapabilityType no longer has parameter publisher
  - Interface CapabilityType no longer has parameter runtimeProperties
  - Interface CapabilityType no longer has parameter systemData
  - Interface CapabilityType no longer has parameter targetType
  - Interface CapabilityType no longer has parameter urn
  - Interface ChaosManagementClientOptionalParams no longer has parameter $host
  - Interface ChaosManagementClientOptionalParams no longer has parameter endpoint
  - Interface Experiment no longer has parameter provisioningState
  - Interface Experiment no longer has parameter selectors
  - Interface Experiment no longer has parameter steps
  - Interface Experiment no longer has parameter systemData
  - Interface ExperimentExecution no longer has parameter id
  - Interface ExperimentExecution no longer has parameter name
  - Interface ExperimentExecution no longer has parameter startedAt
  - Interface ExperimentExecution no longer has parameter status
  - Interface ExperimentExecution no longer has parameter stoppedAt
  - Interface ExperimentExecution no longer has parameter type
  - Interface ExperimentExecutionDetails no longer has parameter failureReason
  - Interface ExperimentExecutionDetails no longer has parameter lastActionAt
  - Interface ExperimentExecutionDetails no longer has parameter runInformation
  - Interface ExperimentExecutionDetails no longer has parameter startedAt
  - Interface ExperimentExecutionDetails no longer has parameter status
  - Interface ExperimentExecutionDetails no longer has parameter stoppedAt
  - Interface ExperimentsCancelOptionalParams no longer has parameter resumeFrom
  - Interface ExperimentsCreateOrUpdateOptionalParams no longer has parameter resumeFrom
  - Interface ExperimentsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface ExperimentsStartOptionalParams no longer has parameter resumeFrom
  - Interface ExperimentsUpdateOptionalParams no longer has parameter resumeFrom
  - Interface Target no longer has parameter systemData
  - Interface TargetType no longer has parameter description
  - Interface TargetType no longer has parameter displayName
  - Interface TargetType no longer has parameter location
  - Interface TargetType no longer has parameter propertiesSchema
  - Interface TargetType no longer has parameter resourceTypes
  - Interface TargetType no longer has parameter systemData
  - Interface Experiment has a new required parameter properties
  - Interface TargetType has a new required parameter properties
  - Type of parameter identity of interface Experiment is changed from ResourceIdentity to ManagedServiceIdentity
  - Type of parameter identity of interface ExperimentUpdate is changed from ResourceIdentity to ManagedServiceIdentity
  - Class ChaosManagementClient no longer has parameter $host
  - Class ChaosManagementClient no longer has parameter apiVersion
  - Class ChaosManagementClient no longer has parameter subscriptionId
  - Removed function getContinuationToken
    
    
## 1.1.0 (2024-03-06)
    
### Features Added

  - Interface ExperimentUpdate has a new optional parameter tags
    
    
## 1.0.0 (2023-11-06)

The package of @azure/arm-chaos is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

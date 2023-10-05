# Release History

## 1.0.0-beta.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.4 (2023-08-04)
    
**Features**

  - Added operation Experiments.update
  - Added Interface ExperimentsUpdateOptionalParams
  - Added Interface ExperimentUpdate
  - Added Interface ListSelector
  - Added Interface QuerySelector
  - Added Interface UserAssignedIdentity
  - Added Type Alias ExperimentsUpdateResponse
  - Added Type Alias SelectorUnion
  - Added Type Alias TargetReferenceType
  - Interface CapabilityType has a new optional parameter azureRbacActions
  - Interface CapabilityType has a new optional parameter azureRbacDataActions
  - Interface ResourceIdentity has a new optional parameter userAssignedIdentities
  - Added Enum KnownSelectorType
  - Added Enum KnownTargetReferenceType
  - Class ChaosManagementClient has a new signature

**Breaking Changes**

  - Interface Selector no longer has parameter targets
  - Type of parameter selectors of interface Experiment is changed from Selector[] to SelectorUnion[]
  - Type of parameter type of interface Selector is changed from SelectorType to "List" | "Query"
  - Type of parameter type of interface TargetReference is changed from "ChaosTarget" to TargetReferenceType
    
    
## 1.0.0-beta.3 (2023-01-12)
    
**Features**

  - Interface CapabilitiesListNextOptionalParams no longer has parameter continuationToken
  - Interface CapabilityTypesListNextOptionalParams no longer has parameter continuationToken
  - Interface ExperimentsListAllNextOptionalParams no longer has parameter continuationToken
  - Interface ExperimentsListAllNextOptionalParams no longer has parameter running
  - Interface ExperimentsListNextOptionalParams no longer has parameter continuationToken
  - Interface ExperimentsListNextOptionalParams no longer has parameter running
  - Interface TargetsListNextOptionalParams no longer has parameter continuationToken
  - Interface TargetTypesListNextOptionalParams no longer has parameter continuationToken
    
    
## 1.0.0-beta.2 (2022-10-19)
    
**Features**

  - Added Interface Filter
  - Added Interface SimpleFilter
  - Added Interface SimpleFilterParameters
  - Added Type Alias FilterType
  - Added Type Alias FilterUnion
  - Interface Selector has a new optional parameter filter
  - Added Enum KnownFilterType
    
    
## 1.0.0-beta.1 (2022-09-13)

The package of @azure/arm-chaos is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).

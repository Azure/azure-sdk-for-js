# Release History

## 2.0.0 (2026-08-25)

### Features Added
  - Added Interface DeploymentResourceWhatIfPrediction
  - Interface DeploymentExtensionDefinition has a new optional parameter configHash
  - Interface DeploymentWhatIfProperties has a new optional parameter resourcePredictions
  - Interface ResourceReference has a new optional parameter symbolicNamePath
  - Interface TargetResource has a new optional parameter symbolicNamePath
  - Interface WhatIfChange has a new optional parameter resourceType
  - Enum KnownVersions has a new value V20260601

### Breaking Changes
  - Interface DeploymentExtensionConfigItem no longer has parameter type
  - Removed Type Alias ExtensionConfigPropertyType
  - Removed Enum KnownExtensionConfigPropertyType

    
## 1.0.0 (2026-07-16)

### Features Added

This is the first stable release of the @azure/arm-resourcesdeployments package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.

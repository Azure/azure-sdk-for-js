# Release History

## 1.0.0-beta.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.4 (2025-08-22)

### Other Changes

  - Other fixes

## 1.0.0-beta.3 (2023-05-29)
    
### Features Added

  - Added Interface ArtifactGenerationProperties
  - Added Interface GeneratePreviewArtifactsOptionalParams
  - Added Type Alias AuthorizationStatus
  - Added Type Alias DockerfileGenerationMode
  - Added Type Alias GeneratePreviewArtifactsResponse
  - Added Type Alias GenerationLanguage
  - Added Type Alias GenerationManifestType
  - Added Type Alias ManifestGenerationMode
  - Added Type Alias WorkflowRunStatus
  - Interface Workflow has a new optional parameter appName
  - Interface Workflow has a new optional parameter builderVersion
  - Interface Workflow has a new optional parameter dockerfileGenerationMode
  - Interface Workflow has a new optional parameter dockerfileOutputDirectory
  - Interface Workflow has a new optional parameter generationLanguage
  - Interface Workflow has a new optional parameter imageName
  - Interface Workflow has a new optional parameter imageTag
  - Interface Workflow has a new optional parameter languageVersion
  - Interface Workflow has a new optional parameter manifestGenerationMode
  - Interface Workflow has a new optional parameter manifestOutputDirectory
  - Interface Workflow has a new optional parameter manifestType
  - Interface Workflow has a new optional parameter namespacePropertiesArtifactGenerationPropertiesNamespace
  - Interface Workflow has a new optional parameter namespacePropertiesGithubWorkflowProfileNamespace
  - Interface Workflow has a new optional parameter port
  - Interface WorkflowRun has a new optional parameter workflowRunStatus
  - Added Enum KnownAuthorizationStatus
  - Added Enum KnownDockerfileGenerationMode
  - Added Enum KnownGenerationLanguage
  - Added Enum KnownGenerationManifestType
  - Added Enum KnownManifestGenerationMode
  - Added Enum KnownWorkflowRunStatus

### Breaking Changes

  - Interface Workflow no longer has parameter namespace
  - Type of parameter authStatus of interface Workflow is changed from ManifestType to AuthorizationStatus
    
    
## 1.0.0-beta.2 (2023-01-04)
    
### Features Added

  - Interface WorkflowListByResourceGroupNextOptionalParams no longer has parameter managedClusterResource
    
    
## 1.0.0-beta.1 (2022-10-18)

The package of @azure/arm-devhub is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).

# Release History

## 10.1.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 10.1.0-beta.3 (2022-05-18)
    
**Features**

  - Added operation group ConnectedRegistries
  - Added operation group ExportPipelines
  - Added operation group ImportPipelines
  - Added operation group PipelineRuns
  - Added operation group ScopeMaps
  - Added operation group Tokens
  - Added operation Registries.beginGenerateCredentials
  - Added operation Registries.beginGenerateCredentialsAndWait
  - Added Interface ActivationProperties
  - Added Interface ActiveDirectoryObject
  - Added Interface AzureADAuthenticationAsArmPolicy
  - Added Interface ConnectedRegistriesCreateOptionalParams
  - Added Interface ConnectedRegistriesDeactivateOptionalParams
  - Added Interface ConnectedRegistriesDeleteOptionalParams
  - Added Interface ConnectedRegistriesGetOptionalParams
  - Added Interface ConnectedRegistriesListNextOptionalParams
  - Added Interface ConnectedRegistriesListOptionalParams
  - Added Interface ConnectedRegistriesUpdateOptionalParams
  - Added Interface ConnectedRegistryListResult
  - Added Interface ConnectedRegistryUpdateParameters
  - Added Interface ExportPipelineListResult
  - Added Interface ExportPipelinesCreateOptionalParams
  - Added Interface ExportPipelinesDeleteOptionalParams
  - Added Interface ExportPipelinesGetOptionalParams
  - Added Interface ExportPipelinesListNextOptionalParams
  - Added Interface ExportPipelinesListOptionalParams
  - Added Interface ExportPipelineTargetProperties
  - Added Interface GenerateCredentialsParameters
  - Added Interface GenerateCredentialsResult
  - Added Interface ImportPipelineListResult
  - Added Interface ImportPipelinesCreateOptionalParams
  - Added Interface ImportPipelinesDeleteOptionalParams
  - Added Interface ImportPipelinesGetOptionalParams
  - Added Interface ImportPipelinesListNextOptionalParams
  - Added Interface ImportPipelinesListOptionalParams
  - Added Interface ImportPipelineSourceProperties
  - Added Interface LoggingProperties
  - Added Interface LoginServerProperties
  - Added Interface ParentProperties
  - Added Interface PipelineRunListResult
  - Added Interface PipelineRunRequest
  - Added Interface PipelineRunResponse
  - Added Interface PipelineRunsCreateOptionalParams
  - Added Interface PipelineRunsDeleteOptionalParams
  - Added Interface PipelineRunsGetOptionalParams
  - Added Interface PipelineRunsListNextOptionalParams
  - Added Interface PipelineRunsListOptionalParams
  - Added Interface PipelineRunSourceProperties
  - Added Interface PipelineRunTargetProperties
  - Added Interface PipelineSourceTriggerDescriptor
  - Added Interface PipelineSourceTriggerProperties
  - Added Interface PipelineTriggerDescriptor
  - Added Interface PipelineTriggerProperties
  - Added Interface ProgressProperties
  - Added Interface RegistriesGenerateCredentialsOptionalParams
  - Added Interface ScopeMapListResult
  - Added Interface ScopeMapsCreateOptionalParams
  - Added Interface ScopeMapsDeleteOptionalParams
  - Added Interface ScopeMapsGetOptionalParams
  - Added Interface ScopeMapsListNextOptionalParams
  - Added Interface ScopeMapsListOptionalParams
  - Added Interface ScopeMapsUpdateOptionalParams
  - Added Interface ScopeMapUpdateParameters
  - Added Interface SoftDeletePolicy
  - Added Interface StatusDetailProperties
  - Added Interface SyncProperties
  - Added Interface SyncUpdateProperties
  - Added Interface TlsCertificateProperties
  - Added Interface TlsProperties
  - Added Interface TokenCertificate
  - Added Interface TokenCredentialsProperties
  - Added Interface TokenListResult
  - Added Interface TokenPassword
  - Added Interface TokensCreateOptionalParams
  - Added Interface TokensDeleteOptionalParams
  - Added Interface TokensGetOptionalParams
  - Added Interface TokensListNextOptionalParams
  - Added Interface TokensListOptionalParams
  - Added Interface TokensUpdateOptionalParams
  - Added Interface TokenUpdateParameters
  - Added Type Alias ActivationStatus
  - Added Type Alias AuditLogStatus
  - Added Type Alias AzureADAuthenticationAsArmPolicyStatus
  - Added Type Alias CertificateType
  - Added Type Alias ConnectedRegistriesCreateResponse
  - Added Type Alias ConnectedRegistriesGetResponse
  - Added Type Alias ConnectedRegistriesListNextResponse
  - Added Type Alias ConnectedRegistriesListResponse
  - Added Type Alias ConnectedRegistriesUpdateResponse
  - Added Type Alias ConnectedRegistry
  - Added Type Alias ConnectedRegistryMode
  - Added Type Alias ConnectionState
  - Added Type Alias ExportPipeline
  - Added Type Alias ExportPipelinesCreateResponse
  - Added Type Alias ExportPipelinesGetResponse
  - Added Type Alias ExportPipelinesListNextResponse
  - Added Type Alias ExportPipelinesListResponse
  - Added Type Alias ImportPipeline
  - Added Type Alias ImportPipelinesCreateResponse
  - Added Type Alias ImportPipelinesGetResponse
  - Added Type Alias ImportPipelinesListNextResponse
  - Added Type Alias ImportPipelinesListResponse
  - Added Type Alias LogLevel
  - Added Type Alias PipelineOptions
  - Added Type Alias PipelineRun
  - Added Type Alias PipelineRunsCreateResponse
  - Added Type Alias PipelineRunsGetResponse
  - Added Type Alias PipelineRunsListNextResponse
  - Added Type Alias PipelineRunsListResponse
  - Added Type Alias PipelineRunSourceType
  - Added Type Alias PipelineRunTargetType
  - Added Type Alias PipelineSourceType
  - Added Type Alias RegistriesGenerateCredentialsResponse
  - Added Type Alias ScopeMap
  - Added Type Alias ScopeMapsCreateResponse
  - Added Type Alias ScopeMapsGetResponse
  - Added Type Alias ScopeMapsListNextResponse
  - Added Type Alias ScopeMapsListResponse
  - Added Type Alias ScopeMapsUpdateResponse
  - Added Type Alias TlsStatus
  - Added Type Alias Token
  - Added Type Alias TokenCertificateName
  - Added Type Alias TokenPasswordName
  - Added Type Alias TokensCreateResponse
  - Added Type Alias TokensGetResponse
  - Added Type Alias TokensListNextResponse
  - Added Type Alias TokensListResponse
  - Added Type Alias TokenStatus
  - Added Type Alias TokensUpdateResponse
  - Interface Policies has a new optional parameter azureADAuthenticationAsArmPolicy
  - Interface Policies has a new optional parameter softDeletePolicy
  - Interface RegistryUpdateParameters has a new optional parameter anonymousPullEnabled
  - Class ContainerRegistryManagementClient has a new parameter connectedRegistries
  - Class ContainerRegistryManagementClient has a new parameter exportPipelines
  - Class ContainerRegistryManagementClient has a new parameter importPipelines
  - Class ContainerRegistryManagementClient has a new parameter pipelineRuns
  - Class ContainerRegistryManagementClient has a new parameter scopeMaps
  - Class ContainerRegistryManagementClient has a new parameter tokens
  - Type Alias Registry has a new parameter anonymousPullEnabled
  - Added Enum KnownActivationStatus
  - Added Enum KnownAuditLogStatus
  - Added Enum KnownAzureADAuthenticationAsArmPolicyStatus
  - Added Enum KnownCertificateType
  - Added Enum KnownConnectedRegistryMode
  - Added Enum KnownConnectionState
  - Added Enum KnownLogLevel
  - Added Enum KnownPipelineOptions
  - Added Enum KnownPipelineRunSourceType
  - Added Enum KnownPipelineRunTargetType
  - Added Enum KnownPipelineSourceType
  - Added Enum KnownTlsStatus
  - Added Enum KnownTokenCertificateName
  - Added Enum KnownTokenPasswordName
  - Added Enum KnownTokenStatus
    
    
## 10.0.0 (2021-12-28)

The package of @azure/arm-containerregistry is using our next generation design principles since version 10.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

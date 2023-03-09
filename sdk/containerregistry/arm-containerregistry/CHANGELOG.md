# Release History

## 10.1.0-beta.6 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 10.1.0-beta.5 (2023-02-10)
    
**Features**

  - Added operation group CacheRules
  - Added operation group ConnectedRegistries
  - Added operation group CredentialSets
  - Added operation group ExportPipelines
  - Added operation group ImportPipelines
  - Added operation group PipelineRuns
  - Added operation group ScopeMaps
  - Added operation group Tokens
  - Added operation Registries.beginGenerateCredentials
  - Added operation Registries.beginGenerateCredentialsAndWait
  - Added Interface ActivationProperties
  - Added Interface ActiveDirectoryObject
  - Added Interface AgentPool
  - Added Interface AuthCredential
  - Added Interface AzureADAuthenticationAsArmPolicy
  - Added Interface CacheRule
  - Added Interface CacheRulesCreateHeaders
  - Added Interface CacheRulesCreateOptionalParams
  - Added Interface CacheRulesDeleteHeaders
  - Added Interface CacheRulesDeleteOptionalParams
  - Added Interface CacheRulesGetOptionalParams
  - Added Interface CacheRulesListNextOptionalParams
  - Added Interface CacheRulesListOptionalParams
  - Added Interface CacheRulesListResult
  - Added Interface CacheRulesUpdateHeaders
  - Added Interface CacheRulesUpdateOptionalParams
  - Added Interface CacheRuleUpdateParameters
  - Added Interface ConnectedRegistriesCreateHeaders
  - Added Interface ConnectedRegistriesCreateOptionalParams
  - Added Interface ConnectedRegistriesDeactivateHeaders
  - Added Interface ConnectedRegistriesDeactivateOptionalParams
  - Added Interface ConnectedRegistriesDeleteHeaders
  - Added Interface ConnectedRegistriesDeleteOptionalParams
  - Added Interface ConnectedRegistriesGetOptionalParams
  - Added Interface ConnectedRegistriesListNextOptionalParams
  - Added Interface ConnectedRegistriesListOptionalParams
  - Added Interface ConnectedRegistriesUpdateHeaders
  - Added Interface ConnectedRegistriesUpdateOptionalParams
  - Added Interface ConnectedRegistry
  - Added Interface ConnectedRegistryListResult
  - Added Interface ConnectedRegistryUpdateParameters
  - Added Interface CredentialHealth
  - Added Interface CredentialSet
  - Added Interface CredentialSetListResult
  - Added Interface CredentialSetsCreateHeaders
  - Added Interface CredentialSetsCreateOptionalParams
  - Added Interface CredentialSetsDeleteHeaders
  - Added Interface CredentialSetsDeleteOptionalParams
  - Added Interface CredentialSetsGetOptionalParams
  - Added Interface CredentialSetsListNextOptionalParams
  - Added Interface CredentialSetsListOptionalParams
  - Added Interface CredentialSetsUpdateHeaders
  - Added Interface CredentialSetsUpdateOptionalParams
  - Added Interface CredentialSetUpdateParameters
  - Added Interface DockerBuildRequest
  - Added Interface DockerBuildStep
  - Added Interface DockerBuildStepUpdateParameters
  - Added Interface EncodedTaskRunRequest
  - Added Interface EncodedTaskStep
  - Added Interface EncodedTaskStepUpdateParameters
  - Added Interface Event_2
  - Added Interface ExportPipeline
  - Added Interface ExportPipelineListResult
  - Added Interface ExportPipelinesCreateHeaders
  - Added Interface ExportPipelinesCreateOptionalParams
  - Added Interface ExportPipelinesDeleteHeaders
  - Added Interface ExportPipelinesDeleteOptionalParams
  - Added Interface ExportPipelinesGetOptionalParams
  - Added Interface ExportPipelinesListNextOptionalParams
  - Added Interface ExportPipelinesListOptionalParams
  - Added Interface ExportPipelineTargetProperties
  - Added Interface FileTaskRunRequest
  - Added Interface FileTaskStep
  - Added Interface FileTaskStepUpdateParameters
  - Added Interface GenerateCredentialsParameters
  - Added Interface GenerateCredentialsResult
  - Added Interface ImportPipeline
  - Added Interface ImportPipelineListResult
  - Added Interface ImportPipelinesCreateHeaders
  - Added Interface ImportPipelinesCreateOptionalParams
  - Added Interface ImportPipelinesDeleteHeaders
  - Added Interface ImportPipelinesDeleteOptionalParams
  - Added Interface ImportPipelinesGetOptionalParams
  - Added Interface ImportPipelinesListNextOptionalParams
  - Added Interface ImportPipelinesListOptionalParams
  - Added Interface ImportPipelineSourceProperties
  - Added Interface LoggingProperties
  - Added Interface LoginServerProperties
  - Added Interface ParentProperties
  - Added Interface PipelineRun
  - Added Interface PipelineRunListResult
  - Added Interface PipelineRunRequest
  - Added Interface PipelineRunResponse
  - Added Interface PipelineRunsCreateHeaders
  - Added Interface PipelineRunsCreateOptionalParams
  - Added Interface PipelineRunsDeleteHeaders
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
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionsCreateOrUpdateHeaders
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface ProgressProperties
  - Added Interface RegistriesCreateHeaders
  - Added Interface RegistriesDeleteHeaders
  - Added Interface RegistriesGenerateCredentialsHeaders
  - Added Interface RegistriesGenerateCredentialsOptionalParams
  - Added Interface RegistriesImportImageHeaders
  - Added Interface RegistriesUpdateHeaders
  - Added Interface Registry
  - Added Interface Replication
  - Added Interface ReplicationsCreateHeaders
  - Added Interface ReplicationsDeleteHeaders
  - Added Interface ReplicationsUpdateHeaders
  - Added Interface Run
  - Added Interface ScopeMap
  - Added Interface ScopeMapListResult
  - Added Interface ScopeMapsCreateHeaders
  - Added Interface ScopeMapsCreateOptionalParams
  - Added Interface ScopeMapsDeleteHeaders
  - Added Interface ScopeMapsDeleteOptionalParams
  - Added Interface ScopeMapsGetOptionalParams
  - Added Interface ScopeMapsListNextOptionalParams
  - Added Interface ScopeMapsListOptionalParams
  - Added Interface ScopeMapsUpdateHeaders
  - Added Interface ScopeMapsUpdateOptionalParams
  - Added Interface ScopeMapUpdateParameters
  - Added Interface SoftDeletePolicy
  - Added Interface StatusDetailProperties
  - Added Interface SyncProperties
  - Added Interface SyncUpdateProperties
  - Added Interface Task
  - Added Interface TaskRun
  - Added Interface TaskRunRequest
  - Added Interface TlsCertificateProperties
  - Added Interface TlsProperties
  - Added Interface Token
  - Added Interface TokenCertificate
  - Added Interface TokenCredentialsProperties
  - Added Interface TokenListResult
  - Added Interface TokenPassword
  - Added Interface TokensCreateHeaders
  - Added Interface TokensCreateOptionalParams
  - Added Interface TokensDeleteHeaders
  - Added Interface TokensDeleteOptionalParams
  - Added Interface TokensGetOptionalParams
  - Added Interface TokensListNextOptionalParams
  - Added Interface TokensListOptionalParams
  - Added Interface TokensUpdateHeaders
  - Added Interface TokensUpdateOptionalParams
  - Added Interface TokenUpdateParameters
  - Added Interface Webhook
  - Added Interface WebhooksCreateHeaders
  - Added Interface WebhooksDeleteHeaders
  - Added Interface WebhooksUpdateHeaders
  - Added Type Alias ActivationStatus
  - Added Type Alias AuditLogStatus
  - Added Type Alias AzureADAuthenticationAsArmPolicyStatus
  - Added Type Alias CacheRulesCreateResponse
  - Added Type Alias CacheRulesGetResponse
  - Added Type Alias CacheRulesListNextResponse
  - Added Type Alias CacheRulesListResponse
  - Added Type Alias CacheRulesUpdateResponse
  - Added Type Alias CertificateType
  - Added Type Alias ConnectedRegistriesCreateResponse
  - Added Type Alias ConnectedRegistriesGetResponse
  - Added Type Alias ConnectedRegistriesListNextResponse
  - Added Type Alias ConnectedRegistriesListResponse
  - Added Type Alias ConnectedRegistriesUpdateResponse
  - Added Type Alias ConnectedRegistryMode
  - Added Type Alias ConnectionState
  - Added Type Alias CredentialHealthStatus
  - Added Type Alias CredentialName
  - Added Type Alias CredentialSetsCreateResponse
  - Added Type Alias CredentialSetsGetResponse
  - Added Type Alias CredentialSetsListNextResponse
  - Added Type Alias CredentialSetsListResponse
  - Added Type Alias CredentialSetsUpdateResponse
  - Added Type Alias ExportPipelinesCreateResponse
  - Added Type Alias ExportPipelinesGetResponse
  - Added Type Alias ExportPipelinesListNextResponse
  - Added Type Alias ExportPipelinesListResponse
  - Added Type Alias ImportPipelinesCreateResponse
  - Added Type Alias ImportPipelinesGetResponse
  - Added Type Alias ImportPipelinesListNextResponse
  - Added Type Alias ImportPipelinesListResponse
  - Added Type Alias LogLevel
  - Added Type Alias PipelineOptions
  - Added Type Alias PipelineRunsCreateResponse
  - Added Type Alias PipelineRunsGetResponse
  - Added Type Alias PipelineRunsListNextResponse
  - Added Type Alias PipelineRunsListResponse
  - Added Type Alias PipelineRunSourceType
  - Added Type Alias PipelineRunTargetType
  - Added Type Alias PipelineSourceType
  - Added Type Alias RegistriesGenerateCredentialsResponse
  - Added Type Alias ScopeMapsCreateResponse
  - Added Type Alias ScopeMapsGetResponse
  - Added Type Alias ScopeMapsListNextResponse
  - Added Type Alias ScopeMapsListResponse
  - Added Type Alias ScopeMapsUpdateResponse
  - Added Type Alias TlsStatus
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
  - Added Enum KnownActivationStatus
  - Added Enum KnownAuditLogStatus
  - Added Enum KnownAzureADAuthenticationAsArmPolicyStatus
  - Added Enum KnownCertificateType
  - Added Enum KnownConnectedRegistryMode
  - Added Enum KnownConnectionState
  - Added Enum KnownCredentialHealthStatus
  - Added Enum KnownCredentialName
  - Added Enum KnownLogLevel
  - Added Enum KnownPipelineOptions
  - Added Enum KnownPipelineRunSourceType
  - Added Enum KnownPipelineRunTargetType
  - Added Enum KnownPipelineSourceType
  - Added Enum KnownTlsStatus
  - Added Enum KnownTokenCertificateName
  - Added Enum KnownTokenPasswordName
  - Added Enum KnownTokenStatus
  - Added function getContinuationToken
  - Interface RunsListNextOptionalParams no longer has parameter filter
  - Interface RunsListNextOptionalParams no longer has parameter top
    
    
## 10.0.0 (2021-12-28)

The package of @azure/arm-containerregistry is using our next generation design principles since version 10.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

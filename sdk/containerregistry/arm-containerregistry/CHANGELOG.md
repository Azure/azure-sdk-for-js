# Release History
    
## 11.0.0 (2023-02-27)
    
**Features**

  - Added operation group ScopeMaps
  - Added operation group Tokens
  - Added operation Registries.beginGenerateCredentials
  - Added operation Registries.beginGenerateCredentialsAndWait
  - Added Interface ActiveDirectoryObject
  - Added Interface Event_2
  - Added Interface GenerateCredentialsParameters
  - Added Interface GenerateCredentialsResult
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionsCreateOrUpdateHeaders
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
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
  - Added Type Alias RegistriesGenerateCredentialsResponse
  - Added Type Alias ScopeMapsCreateResponse
  - Added Type Alias ScopeMapsGetResponse
  - Added Type Alias ScopeMapsListNextResponse
  - Added Type Alias ScopeMapsListResponse
  - Added Type Alias ScopeMapsUpdateResponse
  - Added Type Alias TokenCertificateName
  - Added Type Alias TokenPasswordName
  - Added Type Alias TokensCreateResponse
  - Added Type Alias TokensGetResponse
  - Added Type Alias TokensListNextResponse
  - Added Type Alias TokensListResponse
  - Added Type Alias TokenStatus
  - Added Type Alias TokensUpdateResponse
  - Interface ContainerRegistryManagementClientOptionalParams has a new optional parameter apiVersion
  - Added Enum KnownTokenCertificateName
  - Added Enum KnownTokenPasswordName
  - Added Enum KnownTokenStatus
  - Added function getContinuationToken

**Breaking Changes**

  - Removed operation group AgentPools
  - Removed operation group Runs
  - Removed operation group TaskRuns
  - Removed operation group Tasks
  - Removed operation Registries.beginScheduleRun
  - Removed operation Registries.beginScheduleRunAndWait
  - Removed operation Registries.getBuildSourceUploadUrl
  - Class ContainerRegistryManagementClient no longer has parameter agentPools
  - Class ContainerRegistryManagementClient no longer has parameter runs
  - Class ContainerRegistryManagementClient no longer has parameter taskRuns
  - Class ContainerRegistryManagementClient no longer has parameter tasks
  - Removed Enum KnownArchitecture
  - Removed Enum KnownBaseImageDependencyType
  - Removed Enum KnownBaseImageTriggerType
  - Removed Enum KnownOS
  - Removed Enum KnownRunStatus
  - Removed Enum KnownRunType
  - Removed Enum KnownSecretObjectType
  - Removed Enum KnownSourceControlType
  - Removed Enum KnownSourceRegistryLoginMode
  - Removed Enum KnownSourceTriggerEvent
  - Removed Enum KnownStepType
  - Removed Enum KnownTaskStatus
  - Removed Enum KnownTokenType
  - Removed Enum KnownTriggerStatus
  - Removed Enum KnownUpdateTriggerPayloadType
  - Removed Enum KnownVariant
    
    
## 10.0.0 (2021-12-28)

The package of @azure/arm-containerregistry is using our next generation design principles since version 10.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

# Release History

## 2.2.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.2.0-beta.2 (2025-08-21)

### Other Changes

  - Other fixes

## 2.2.0-beta.1 (2024-10-16)
Compared with version 2.1.0
    
### Features Added

  - Added operation group ConfigurationNames
  - Added operation group Connector
  - Added operation group Linkers
  - Added Interface AccessKeyInfoBase
  - Added Interface AzureAppConfigProperties
  - Added Interface BasicErrorDryrunPrerequisiteResult
  - Added Interface ConfigurationInfo
  - Added Interface ConfigurationName
  - Added Interface ConfigurationNameItem
  - Added Interface ConfigurationNameResult
  - Added Interface ConfigurationNamesListNextOptionalParams
  - Added Interface ConfigurationNamesListOptionalParams
  - Added Interface ConfigurationResult
  - Added Interface ConfigurationStore
  - Added Interface ConnectorCreateDryrunOptionalParams
  - Added Interface ConnectorCreateOrUpdateOptionalParams
  - Added Interface ConnectorDeleteDryrunOptionalParams
  - Added Interface ConnectorDeleteOptionalParams
  - Added Interface ConnectorGenerateConfigurationsOptionalParams
  - Added Interface ConnectorGetDryrunOptionalParams
  - Added Interface ConnectorGetOptionalParams
  - Added Interface ConnectorListDryrunNextOptionalParams
  - Added Interface ConnectorListDryrunOptionalParams
  - Added Interface ConnectorListNextOptionalParams
  - Added Interface ConnectorListOptionalParams
  - Added Interface ConnectorUpdateDryrunOptionalParams
  - Added Interface ConnectorUpdateOptionalParams
  - Added Interface ConnectorValidateOptionalParams
  - Added Interface CreateOrUpdateDryrunParameters
  - Added Interface DaprConfigurationList
  - Added Interface DaprConfigurationResource
  - Added Interface DaprMetadata
  - Added Interface DaprProperties
  - Added Interface DatabaseAadAuthInfo
  - Added Interface DryrunList
  - Added Interface DryrunOperationPreview
  - Added Interface DryrunParameters
  - Added Interface DryrunPatch
  - Added Interface DryrunPrerequisiteResult
  - Added Interface DryrunResource
  - Added Interface EasyAuthMicrosoftEntraIDAuthInfo
  - Added Interface FabricPlatform
  - Added Interface FirewallRules
  - Added Interface LinkerProperties
  - Added Interface LinkersCreateDryrunOptionalParams
  - Added Interface LinkersDeleteDryrunOptionalParams
  - Added Interface LinkersGenerateConfigurationsOptionalParams
  - Added Interface LinkersGetDryrunOptionalParams
  - Added Interface LinkersListDaprConfigurationsNextOptionalParams
  - Added Interface LinkersListDaprConfigurationsOptionalParams
  - Added Interface LinkersListDryrunNextOptionalParams
  - Added Interface LinkersListDryrunOptionalParams
  - Added Interface LinkersUpdateDryrunOptionalParams
  - Added Interface PermissionsMissingDryrunPrerequisiteResult
  - Added Interface PublicNetworkSolution
  - Added Interface ResourceList
  - Added Interface SelfHostedServer
  - Added Interface UserAccountAuthInfo
  - Added Type Alias AccessKeyPermissions
  - Added Type Alias AllowType
  - Added Type Alias AuthMode
  - Added Type Alias ConfigurationNamesListNextResponse
  - Added Type Alias ConfigurationNamesListResponse
  - Added Type Alias ConnectorCreateDryrunResponse
  - Added Type Alias ConnectorCreateOrUpdateResponse
  - Added Type Alias ConnectorGenerateConfigurationsResponse
  - Added Type Alias ConnectorGetDryrunResponse
  - Added Type Alias ConnectorGetResponse
  - Added Type Alias ConnectorListDryrunNextResponse
  - Added Type Alias ConnectorListDryrunResponse
  - Added Type Alias ConnectorListNextResponse
  - Added Type Alias ConnectorListResponse
  - Added Type Alias ConnectorUpdateDryrunResponse
  - Added Type Alias ConnectorUpdateResponse
  - Added Type Alias ConnectorValidateResponse
  - Added Type Alias DaprBindingComponentDirection
  - Added Type Alias DaprMetadataRequired
  - Added Type Alias DeleteOrUpdateBehavior
  - Added Type Alias DryrunActionName
  - Added Type Alias DryrunParametersUnion
  - Added Type Alias DryrunPrerequisiteResultType
  - Added Type Alias DryrunPrerequisiteResultUnion
  - Added Type Alias DryrunPreviewOperationType
  - Added Type Alias LinkerConfigurationType
  - Added Type Alias LinkersCreateDryrunResponse
  - Added Type Alias LinkersGenerateConfigurationsResponse
  - Added Type Alias LinkersGetDryrunResponse
  - Added Type Alias LinkersListDaprConfigurationsNextResponse
  - Added Type Alias LinkersListDaprConfigurationsResponse
  - Added Type Alias LinkersListDryrunNextResponse
  - Added Type Alias LinkersListDryrunResponse
  - Added Type Alias LinkersUpdateDryrunResponse
  - Added Type Alias SecretSourceType
  - Interface AuthInfoBase has a new optional parameter authMode
  - Interface LinkerPatch has a new optional parameter configurationInfo
  - Interface LinkerPatch has a new optional parameter publicNetworkSolution
  - Interface LinkerResource has a new optional parameter configurationInfo
  - Interface LinkerResource has a new optional parameter publicNetworkSolution
  - Interface Resource has a new optional parameter systemData
  - Interface SecretStore has a new optional parameter keyVaultSecretName
  - Interface ServicePrincipalCertificateAuthInfo has a new optional parameter deleteOrUpdateBehavior
  - Interface ServicePrincipalCertificateAuthInfo has a new optional parameter roles
  - Interface ServicePrincipalSecretAuthInfo has a new optional parameter deleteOrUpdateBehavior
  - Interface ServicePrincipalSecretAuthInfo has a new optional parameter roles
  - Interface SourceConfiguration has a new optional parameter configType
  - Interface SourceConfiguration has a new optional parameter description
  - Interface SourceConfiguration has a new optional parameter keyVaultReferenceIdentity
  - Interface SystemAssignedIdentityAuthInfo has a new optional parameter deleteOrUpdateBehavior
  - Interface SystemAssignedIdentityAuthInfo has a new optional parameter roles
  - Interface UserAssignedIdentityAuthInfo has a new optional parameter deleteOrUpdateBehavior
  - Interface UserAssignedIdentityAuthInfo has a new optional parameter roles
  - Interface VNetSolution has a new optional parameter deleteOrUpdateBehavior
  - Type of parameter authType of interface AuthInfoBase is changed from "secret" | "userAssignedIdentity" | "systemAssignedIdentity" | "servicePrincipalSecret" | "servicePrincipalCertificate" to "accessKey" | "secret" | "userAssignedIdentity" | "systemAssignedIdentity" | "servicePrincipalSecret" | "servicePrincipalCertificate" | "userAccount" | "easyAuthMicrosoftEntraID"
  - Type of parameter type of interface AzureResourcePropertiesBase is changed from "KeyVault" to "KeyVault" | "AppConfig"
  - Type of parameter type of interface TargetServiceBase is changed from "AzureResource" | "ConfluentBootstrapServer" | "ConfluentSchemaRegistry" to "AzureResource" | "ConfluentBootstrapServer" | "FabricPlatform" | "SelfHostedServer" | "ConfluentSchemaRegistry"
  - Added Enum KnownAccessKeyPermissions
  - Added Enum KnownAllowType
  - Added Enum KnownAuthMode
  - Added Enum KnownDaprBindingComponentDirection
  - Added Enum KnownDaprMetadataRequired
  - Added Enum KnownDeleteOrUpdateBehavior
  - Added Enum KnownDryrunActionName
  - Added Enum KnownDryrunPrerequisiteResultType
  - Added Enum KnownDryrunPreviewOperationType
  - Added Enum KnownLinkerConfigurationType
  - Added Enum KnownSecretSourceType
  - Enum KnownActionType has a new value Enable
  - Enum KnownActionType has a new value OptOut
  - Enum KnownAuthType has a new value AccessKey
  - Enum KnownAuthType has a new value EasyAuthMicrosoftEntraID
  - Enum KnownAuthType has a new value UserAccount
  - Enum KnownAzureResourceType has a new value AppConfig
  - Enum KnownClientType has a new value Dapr
  - Enum KnownClientType has a new value JmsSpringBoot
  - Enum KnownClientType has a new value KafkaSpringBoot
  - Enum KnownTargetServiceType has a new value FabricPlatform
  - Enum KnownTargetServiceType has a new value SelfHostedServer
  - Interface LinkerResource no longer has parameter systemData
    
    
## 2.1.0 (2022-12-16)
    
### Features Added

  - Added Interface AzureKeyVaultProperties
  - Added Interface AzureResource
  - Added Interface ConfluentBootstrapServer
  - Added Interface ConfluentSchemaRegistry
  - Added Interface KeyVaultSecretReferenceSecretInfo
  - Added Interface KeyVaultSecretUriSecretInfo
  - Added Interface LinkerResource
  - Added Interface ProxyResource
  - Added Interface SecretAuthInfo
  - Added Interface ServicePrincipalCertificateAuthInfo
  - Added Interface ServicePrincipalSecretAuthInfo
  - Added Interface SystemAssignedIdentityAuthInfo
  - Added Interface UserAssignedIdentityAuthInfo
  - Added Interface ValueSecretInfo
  - Added function getContinuationToken
    
    
## 2.0.0 (2022-05-16)
    
### Features Added

  - Added Interface ValidateOperationResult
  - Enum KnownValidationResultStatus has a new value Failure

### Breaking Changes

  - Enum KnownValidationResultStatus no longer has value Failed
    
    
## 1.0.0 (2022-04-27)

The package of @azure/arm-servicelinker is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

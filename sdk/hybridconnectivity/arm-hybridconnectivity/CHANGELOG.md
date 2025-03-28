# Release History
    
## 2.0.0-beta.1 (2025-03-25)
    
### Features Added

  - Added operation group GenerateAwsTemplateOperations
  - Added operation group InventoryOperations
  - Added operation group PublicCloudConnectorsOperations
  - Added operation group SolutionConfigurationsOperations
  - Added operation group SolutionTypesOperations
  - Added Interface AADProfileProperties
  - Added Interface AwsCloudProfile
  - Added Interface AwsCloudProfileUpdate
  - Added Interface ExtensionResource
  - Added Interface GenerateAwsTemplatePostOptionalParams
  - Added Interface GenerateAwsTemplateRequest
  - Added Interface IngressProfileProperties
  - Added Interface InventoryGetOptionalParams
  - Added Interface InventoryListBySolutionConfigurationOptionalParams
  - Added Interface InventoryProperties
  - Added Interface InventoryResource
  - Added Interface OperationStatusResult
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PublicCloudConnector
  - Added Interface PublicCloudConnectorProperties
  - Added Interface PublicCloudConnectorPropertiesUpdate
  - Added Interface PublicCloudConnectorsCreateOrUpdateOptionalParams
  - Added Interface PublicCloudConnectorsDeleteOptionalParams
  - Added Interface PublicCloudConnectorsGetOptionalParams
  - Added Interface PublicCloudConnectorsListByResourceGroupOptionalParams
  - Added Interface PublicCloudConnectorsListBySubscriptionOptionalParams
  - Added Interface PublicCloudConnectorsTestPermissionsOptionalParams
  - Added Interface PublicCloudConnectorsUpdateOptionalParams
  - Added Interface PublicCloudConnectorUpdate
  - Added Interface RelayNamespaceAccessProperties
  - Added Interface RestorePollerOptions
  - Added Interface ServiceConfigurationProperties
  - Added Interface ServiceConfigurationPropertiesPatch
  - Added Interface SolutionConfiguration
  - Added Interface SolutionConfigurationProperties
  - Added Interface SolutionConfigurationPropertiesUpdate
  - Added Interface SolutionConfigurationsCreateOrUpdateOptionalParams
  - Added Interface SolutionConfigurationsDeleteOptionalParams
  - Added Interface SolutionConfigurationsGetOptionalParams
  - Added Interface SolutionConfigurationsListOptionalParams
  - Added Interface SolutionConfigurationsSyncNowOptionalParams
  - Added Interface SolutionConfigurationsUpdateOptionalParams
  - Added Interface SolutionConfigurationUpdate
  - Added Interface SolutionSettings
  - Added Interface SolutionTypeProperties
  - Added Interface SolutionTypeResource
  - Added Interface SolutionTypeSettings
  - Added Interface SolutionTypeSettingsProperties
  - Added Interface SolutionTypesGetOptionalParams
  - Added Interface SolutionTypesListByResourceGroupOptionalParams
  - Added Interface SolutionTypesListBySubscriptionOptionalParams
  - Added Interface TrackedResource
  - Added Interface TrackedResourceUpdate
  - Added Type Alias CloudNativeType
  - Added Type Alias ContinuablePage
  - Added Type Alias HostType
  - Added Type Alias ResourceProvisioningState
  - Added Type Alias SolutionConfigurationStatus
  - Interface EndpointAccessResource has a new optional parameter relay
  - Interface IngressGatewayResource has a new optional parameter ingress
  - Interface IngressGatewayResource has a new optional parameter relay
  - Interface ServiceConfigurationResource has a new optional parameter properties
  - Interface ServiceConfigurationResourcePatch has a new optional parameter properties
  - Added Enum KnownCloudNativeType
  - Added Enum KnownHostType
  - Added Enum KnownResourceProvisioningState
  - Added Enum KnownSolutionConfigurationStatus
  - Added Enum KnownVersions
  - Added function restorePoller
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, unknown> to Record<string, any>
  - Class HybridConnectivityManagementAPI has a new signature

### Breaking Changes

  - Interface EndpointAccessResource no longer has parameter accessKey
  - Interface EndpointAccessResource no longer has parameter expiresOn
  - Interface EndpointAccessResource no longer has parameter hybridConnectionName
  - Interface EndpointAccessResource no longer has parameter namespaceName
  - Interface EndpointAccessResource no longer has parameter namespaceNameSuffix
  - Interface EndpointAccessResource no longer has parameter serviceConfigurationToken
  - Interface HybridConnectivityManagementAPIOptionalParams no longer has parameter $host
  - Interface HybridConnectivityManagementAPIOptionalParams no longer has parameter endpoint
  - Interface IngressGatewayResource no longer has parameter accessKey
  - Interface IngressGatewayResource no longer has parameter expiresOn
  - Interface IngressGatewayResource no longer has parameter hostname
  - Interface IngressGatewayResource no longer has parameter hybridConnectionName
  - Interface IngressGatewayResource no longer has parameter namespaceName
  - Interface IngressGatewayResource no longer has parameter namespaceNameSuffix
  - Interface IngressGatewayResource no longer has parameter serverId
  - Interface IngressGatewayResource no longer has parameter serviceConfigurationToken
  - Interface IngressGatewayResource no longer has parameter tenantId
  - Interface ServiceConfigurationResource no longer has parameter port
  - Interface ServiceConfigurationResource no longer has parameter provisioningState
  - Interface ServiceConfigurationResource no longer has parameter resourceId
  - Interface ServiceConfigurationResource no longer has parameter serviceName
  - Interface ServiceConfigurationResourcePatch no longer has parameter port
  - Class HybridConnectivityManagementAPI no longer has parameter $host
  - Class HybridConnectivityManagementAPI no longer has parameter apiVersion
  - Removed function getContinuationToken
    
    
## 1.0.0 (2023-09-11)

The package of @azure/arm-hybridconnectivity is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

# Release History
    
## 4.0.0 (2022-11-03)
    
**Features**

  - Added operation group PrivateEndpointConnections
  - Added operation group PrivateLinkResources
  - Added operation Namespaces.createOrUpdateNetworkRuleSet
  - Added operation Namespaces.getNetworkRuleSet
  - Added Interface ConnectionState
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface NamespacesCreateOrUpdateNetworkRuleSetOptionalParams
  - Added Interface NamespacesGetNetworkRuleSetOptionalParams
  - Added Interface NetworkRuleSet
  - Added Interface NWRuleSetIpRules
  - Added Interface PrivateEndpoint
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionListResult
  - Added Interface PrivateEndpointConnectionsCreateOrUpdateOptionalParams
  - Added Interface PrivateEndpointConnectionsDeleteOptionalParams
  - Added Interface PrivateEndpointConnectionsGetOptionalParams
  - Added Interface PrivateEndpointConnectionsListNextOptionalParams
  - Added Interface PrivateEndpointConnectionsListOptionalParams
  - Added Interface PrivateLinkResource
  - Added Interface PrivateLinkResourcesGetOptionalParams
  - Added Interface PrivateLinkResourcesListOptionalParams
  - Added Interface PrivateLinkResourcesListResult
  - Added Interface ProxyResource
  - Added Interface SystemData
  - Added Type Alias CreatedByType
  - Added Type Alias DefaultAction
  - Added Type Alias EndPointProvisioningState
  - Added Type Alias NamespacesCreateOrUpdateNetworkRuleSetResponse
  - Added Type Alias NamespacesGetNetworkRuleSetResponse
  - Added Type Alias NetworkRuleIPAction
  - Added Type Alias PrivateEndpointConnectionsCreateOrUpdateResponse
  - Added Type Alias PrivateEndpointConnectionsGetResponse
  - Added Type Alias PrivateEndpointConnectionsListNextResponse
  - Added Type Alias PrivateEndpointConnectionsListResponse
  - Added Type Alias PrivateLinkConnectionStatus
  - Added Type Alias PrivateLinkResourcesGetResponse
  - Added Type Alias PrivateLinkResourcesListResponse
  - Added Type Alias PublicNetworkAccess
  - Added Type Alias SkuName
  - Added Type Alias SkuTier
  - Interface AuthorizationRule has a new optional parameter systemData
  - Interface ErrorResponse has a new optional parameter error
  - Interface HybridConnection has a new optional parameter systemData
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface Operation has a new optional parameter properties
  - Interface OperationDisplay has a new optional parameter description
  - Interface RelayNamespace has a new optional parameter privateEndpointConnections
  - Interface RelayNamespace has a new optional parameter publicNetworkAccess
  - Interface RelayNamespace has a new optional parameter status
  - Interface RelayNamespace has a new optional parameter systemData
  - Interface RelayUpdateParameters has a new optional parameter privateEndpointConnections
  - Interface RelayUpdateParameters has a new optional parameter publicNetworkAccess
  - Interface RelayUpdateParameters has a new optional parameter status
  - Interface WcfRelay has a new optional parameter systemData
  - Class RelayAPI has a new parameter privateEndpointConnections
  - Class RelayAPI has a new parameter privateLinkResources
  - Added Enum KnownAccessRights
  - Added Enum KnownCreatedByType
  - Added Enum KnownDefaultAction
  - Added Enum KnownEndPointProvisioningState
  - Added Enum KnownKeyType
  - Added Enum KnownNetworkRuleIPAction
  - Added Enum KnownPrivateLinkConnectionStatus
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownSkuName
  - Added Enum KnownSkuTier
  - Added Enum KnownUnavailableReason

**Breaking Changes**

  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter message
    
    
## 3.1.0 (2022-07-08)
    
**Features**

  - Added Interface AuthorizationRule
  - Added Interface HybridConnection
  - Added Interface RelayNamespace
  - Added Interface RelayUpdateParameters
  - Added Interface ResourceNamespacePatch
  - Added Interface TrackedResource
  - Added Interface WcfRelay
    
## 3.0.1 (2022-04-29)

**Features**

  - Bug fix

## 3.0.0 (2021-12-10)

The package of @azure/arm-relay is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

# Release History

## 4.0.0-beta.1 (2025-07-31)
Compared with version 3.1.1

### Features Added
  - Added operation group PrivateEndpointConnectionsOperations
  - Added operation group PrivateLinkResourcesOperations
  - Added operation NamespacesOperations.createOrUpdate
  - Added operation NamespacesOperations.createOrUpdateNetworkRuleSet
  - Added operation NamespacesOperations.delete
  - Added operation NamespacesOperations.getNetworkRuleSet
  - Added Interface AuthorizationRuleProperties
  - Added Interface ConnectionState
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface HybridConnectionProperties
  - Added Interface NamespacesCreateOrUpdateNetworkRuleSetOptionalParams
  - Added Interface NamespacesGetNetworkRuleSetOptionalParams
  - Added Interface NetworkRuleSet
  - Added Interface NetworkRuleSetProperties
  - Added Interface NWRuleSetIpRules
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateEndpoint
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateEndpointConnectionsCreateOrUpdateOptionalParams
  - Added Interface PrivateEndpointConnectionsDeleteOptionalParams
  - Added Interface PrivateEndpointConnectionsGetOptionalParams
  - Added Interface PrivateEndpointConnectionsListOptionalParams
  - Added Interface PrivateLinkResource
  - Added Interface PrivateLinkResourceProperties
  - Added Interface PrivateLinkResourcesGetOptionalParams
  - Added Interface PrivateLinkResourcesListOptionalParams
  - Added Interface PrivateLinkResourcesListResult
  - Added Interface ProxyResource
  - Added Interface RelayNamespaceProperties
  - Added Interface Resource_1
  - Added Interface RestorePollerOptions
  - Added Interface SystemData
  - Added Interface WcfRelayProperties
  - Interface AuthorizationRule has a new optional parameter location
  - Interface AuthorizationRule has a new optional parameter properties
  - Interface AuthorizationRule has a new optional parameter systemData
  - Interface ErrorResponse has a new optional parameter error
  - Interface HybridConnection has a new optional parameter location
  - Interface HybridConnection has a new optional parameter properties
  - Interface HybridConnection has a new optional parameter systemData
  - Interface Operation has a new optional parameter actionType
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface OperationDisplay has a new optional parameter description
  - Interface RelayAPIOptionalParams has a new optional parameter cloudSetting
  - Interface RelayNamespace has a new optional parameter properties
  - Interface RelayNamespace has a new optional parameter systemData
  - Interface RelayUpdateParameters has a new optional parameter properties
  - Interface Resource has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Interface WcfRelay has a new optional parameter location
  - Interface WcfRelay has a new optional parameter properties
  - Interface WcfRelay has a new optional parameter systemData
  - Added Type Alias ActionType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias DefaultAction
  - Added Type Alias EndPointProvisioningState
  - Added Type Alias KeyType
  - Added Type Alias NetworkRuleIPAction
  - Added Type Alias Origin
  - Added Type Alias PrivateLinkConnectionStatus
  - Added Type Alias PublicNetworkAccess
  - Added Type Alias SkuName
  - Added Type Alias SkuTier
  - Added function resourceSerializer_1
  - Added Enum AzureClouds
  - Added Enum KnownAccessRights
  - Added Enum KnownActionType
  - Added Enum KnownCreatedByType
  - Added Enum KnownDefaultAction
  - Added Enum KnownEndPointProvisioningState
  - Added Enum KnownKeyType
  - Added Enum KnownNetworkRuleIPAction
  - Added Enum KnownOrigin
  - Added Enum KnownPrivateLinkConnectionStatus
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownSkuName
  - Added Enum KnownSkuTier
  - Added Enum KnownUnavailableReason
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation Namespaces.beginCreateOrUpdate
  - Removed operation Namespaces.beginCreateOrUpdateAndWait
  - Removed operation Namespaces.beginDelete
  - Removed operation Namespaces.beginDeleteAndWait
  - Operation HybridConnections.createOrUpdateAuthorizationRule has a new signature
  - Operation HybridConnections.getAuthorizationRule has a new signature
  - Operation HybridConnections.regenerateKeys has a new signature
  - Operation Namespaces.checkNameAvailability has a new signature
  - Operation Namespaces.createOrUpdateAuthorizationRule has a new signature
  - Operation Namespaces.get has a new signature
  - Operation Namespaces.getAuthorizationRule has a new signature
  - Operation Namespaces.regenerateKeys has a new signature
  - Operation Namespaces.update has a new signature
  - Operation WCFRelays.createOrUpdateAuthorizationRule has a new signature
  - Operation WCFRelays.getAuthorizationRule has a new signature
  - Operation WCFRelays.regenerateKeys has a new signature
  - Class RelayAPI no longer has parameter $host
  - Class RelayAPI no longer has parameter apiVersion
  - Class RelayAPI no longer has parameter subscriptionId
  - Class RelayAPI no longer has parameter wCFRelays
  - Removed Interface AuthorizationRuleListResult
  - Removed Interface HybridConnectionListResult
  - Removed Interface OperationListResult
  - Removed Interface RelayNamespaceListResult
  - Removed Interface WcfRelaysListResult
  - Type of parameter keyType of interface RegenerateAccessKeyParameters is changed from KeyType_2 to KeyType
  - Type of parameter name of interface Sku is changed from "Standard" to SkuName
  - Type of parameter tier of interface Sku is changed from "Standard" to SkuTier
  - Interface AuthorizationRule no longer has parameter rights
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter message
  - Interface HybridConnection no longer has parameter createdAt
  - Interface HybridConnection no longer has parameter listenerCount
  - Interface HybridConnection no longer has parameter requiresClientAuthorization
  - Interface HybridConnection no longer has parameter updatedAt
  - Interface HybridConnection no longer has parameter userMetadata
  - Interface NamespacesCreateOrUpdateOptionalParams no longer has parameter resumeFrom
  - Interface NamespacesDeleteOptionalParams no longer has parameter resumeFrom
  - Interface RelayAPIOptionalParams no longer has parameter $host
  - Interface RelayAPIOptionalParams no longer has parameter endpoint
  - Interface RelayNamespace no longer has parameter createdAt
  - Interface RelayNamespace no longer has parameter metricId
  - Interface RelayNamespace no longer has parameter provisioningState
  - Interface RelayNamespace no longer has parameter serviceBusEndpoint
  - Interface RelayNamespace no longer has parameter updatedAt
  - Interface RelayUpdateParameters no longer has parameter createdAt
  - Interface RelayUpdateParameters no longer has parameter metricId
  - Interface RelayUpdateParameters no longer has parameter provisioningState
  - Interface RelayUpdateParameters no longer has parameter serviceBusEndpoint
  - Interface RelayUpdateParameters no longer has parameter updatedAt
  - Interface WcfRelay no longer has parameter createdAt
  - Interface WcfRelay no longer has parameter isDynamic
  - Interface WcfRelay no longer has parameter listenerCount
  - Interface WcfRelay no longer has parameter relayType
  - Interface WcfRelay no longer has parameter requiresClientAuthorization
  - Interface WcfRelay no longer has parameter requiresTransportSecurity
  - Interface WcfRelay no longer has parameter updatedAt
  - Interface WcfRelay no longer has parameter userMetadata
  - Removed Type Alias HybridConnectionsCreateOrUpdateAuthorizationRuleResponse
  - Removed Type Alias HybridConnectionsCreateOrUpdateResponse
  - Removed Type Alias HybridConnectionsGetAuthorizationRuleResponse
  - Removed Type Alias HybridConnectionsGetResponse
  - Removed Type Alias HybridConnectionsListAuthorizationRulesNextResponse
  - Removed Type Alias HybridConnectionsListAuthorizationRulesResponse
  - Removed Type Alias HybridConnectionsListByNamespaceNextResponse
  - Removed Type Alias HybridConnectionsListByNamespaceResponse
  - Removed Type Alias HybridConnectionsListKeysResponse
  - Removed Type Alias HybridConnectionsRegenerateKeysResponse
  - Removed Type Alias KeyType_2
  - Removed Type Alias NamespacesCheckNameAvailabilityResponse
  - Removed Type Alias NamespacesCreateOrUpdateAuthorizationRuleResponse
  - Removed Type Alias NamespacesCreateOrUpdateResponse
  - Removed Type Alias NamespacesGetAuthorizationRuleResponse
  - Removed Type Alias NamespacesGetResponse
  - Removed Type Alias NamespacesListAuthorizationRulesNextResponse
  - Removed Type Alias NamespacesListAuthorizationRulesResponse
  - Removed Type Alias NamespacesListByResourceGroupNextResponse
  - Removed Type Alias NamespacesListByResourceGroupResponse
  - Removed Type Alias NamespacesListKeysResponse
  - Removed Type Alias NamespacesListNextResponse
  - Removed Type Alias NamespacesListResponse
  - Removed Type Alias NamespacesRegenerateKeysResponse
  - Removed Type Alias NamespacesUpdateResponse
  - Removed Type Alias OperationsListNextResponse
  - Removed Type Alias OperationsListResponse
  - Removed Type Alias ProvisioningStateEnum
  - Removed Type Alias WCFRelaysCreateOrUpdateAuthorizationRuleResponse
  - Removed Type Alias WCFRelaysCreateOrUpdateResponse
  - Removed Type Alias WCFRelaysGetAuthorizationRuleResponse
  - Removed Type Alias WCFRelaysGetResponse
  - Removed Type Alias WCFRelaysListAuthorizationRulesNextResponse
  - Removed Type Alias WCFRelaysListAuthorizationRulesResponse
  - Removed Type Alias WCFRelaysListByNamespaceNextResponse
  - Removed Type Alias WCFRelaysListByNamespaceResponse
  - Removed Type Alias WCFRelaysListKeysResponse
  - Removed Type Alias WCFRelaysRegenerateKeysResponse
  - Type alias "AccessRights" has been changed
  - Type alias "UnavailableReason" has been changed
  - Removed function getContinuationToken

    
## 3.1.1 (2023-02-01)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 3.1.0 (2022-07-08)
    
### Features Added

  - Added Interface AuthorizationRule
  - Added Interface HybridConnection
  - Added Interface RelayNamespace
  - Added Interface RelayUpdateParameters
  - Added Interface ResourceNamespacePatch
  - Added Interface TrackedResource
  - Added Interface WcfRelay
    
## 3.0.1 (2022-04-29)

### Features Added

  - Bug fix

## 3.0.0 (2021-12-10)

The package of @azure/arm-relay is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

# Release History

## 7.0.0-beta.1 (2025-11-05)
Compared with version 6.1.0

### Features Added
  - Added operation group NetworkSecurityPerimeterConfigurationOperations
  - Added operation group NetworkSecurityPerimeterConfigurations
  - Added operation Namespaces.beginFailover
  - Added operation Namespaces.beginFailoverAndWait
  - Added Interface ConfidentialCompute
  - Added Interface FailOver
  - Added Interface GeoDataReplicationProperties
  - Added Interface MigrationConfigsCreateAndStartMigrationHeaders
  - Added Interface NamespaceReplicaLocation
  - Added Interface NamespacesCreateOrUpdateHeaders
  - Added Interface NamespacesDeleteHeaders
  - Added Interface NamespacesFailoverHeaders
  - Added Interface NamespacesFailoverOptionalParams
  - Added Interface NetworkSecurityPerimeter
  - Added Interface NetworkSecurityPerimeterConfiguration
  - Added Interface NetworkSecurityPerimeterConfigurationList
  - Added Interface NetworkSecurityPerimeterConfigurationListOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationPropertiesProfile
  - Added Interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation
  - Added Interface NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileOptionalParams
  - Added Interface NspAccessRule
  - Added Interface NspAccessRuleProperties
  - Added Interface NspAccessRulePropertiesSubscriptionsItem
  - Added Interface PlatformCapabilities
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface ProvisioningIssue
  - Added Interface ProvisioningIssueProperties
  - Interface ProxyResource has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface ResourceNamespacePatch has a new optional parameter systemData
  - Interface SBNamespace has a new optional parameter geoDataReplication
  - Interface SBNamespace has a new optional parameter minimumTlsVersion
  - Interface SBNamespace has a new optional parameter platformCapabilities
  - Interface SBNamespace has a new optional parameter premiumMessagingPartitions
  - Interface SBNamespace has a new optional parameter publicNetworkAccess
  - Interface SBNamespaceUpdateParameters has a new optional parameter systemData
  - Interface SBQueue has a new optional parameter userMetadata
  - Interface SBSubscription has a new optional parameter userMetadata
  - Interface SBTopic has a new optional parameter userMetadata
  - Interface TrackedResource has a new optional parameter systemData
  - Added Type Alias GeoDRRoleType
  - Added Type Alias KeyType
  - Added Type Alias Mode
  - Added Type Alias NamespacesFailoverResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationListNextResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationListResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationProvisioningState
  - Added Type Alias NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameResponse
  - Added Type Alias NspAccessRuleDirection
  - Added Type Alias PublicNetworkAccess
  - Added Type Alias ResourceAssociationAccessMode
  - Added Type Alias TlsVersion
  - Added Enum KnownGeoDRRoleType
  - Added Enum KnownMode
  - Added Enum KnownNetworkSecurityPerimeterConfigurationProvisioningState
  - Added Enum KnownNspAccessRuleDirection
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownResourceAssociationAccessMode
  - Added Enum KnownTlsVersion

### Breaking Changes
  - Removed Interface SqlRuleAction
  - Interface ProxyResource no longer has parameter location
  - Parameter value of interface ArmDisasterRecoveryListResult is now required
  - Parameter value of interface MigrationConfigListResult is now required
  - Parameter value of interface NetworkRuleSetListResult is now required
  - Parameter value of interface OperationListResult is now required
  - Parameter value of interface PrivateEndpointConnectionListResult is now required
  - Parameter value of interface PrivateLinkResourcesListResult is now required
  - Parameter value of interface RuleListResult is now required
  - Parameter value of interface SBAuthorizationRuleListResult is now required
  - Parameter value of interface SBNamespaceListResult is now required
  - Parameter value of interface SBQueueListResult is now required
  - Parameter value of interface SBSubscriptionListResult is now required
  - Parameter value of interface SBTopicListResult is now required
  - Removed Type Alias KeyType_2

    
## 6.2.0-beta.1 (2023-02-08)
    
### Features Added

  - Added Type Alias PublicNetworkAccess
  - Added Type Alias TlsVersion
  - Interface SBNamespace has a new optional parameter minimumTlsVersion
  - Interface SBNamespace has a new optional parameter premiumMessagingPartitions
  - Interface SBNamespace has a new optional parameter publicNetworkAccess
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownTlsVersion
    
    
## 6.1.0 (2022-12-09)
    
### Features Added

  - Added Interface ArmDisasterRecovery
  - Added Interface MigrationConfigProperties
  - Added Interface NetworkRuleSet
  - Added Interface PrivateEndpointConnection
  - Added Interface ResourceNamespacePatch
  - Added Interface Rule
  - Added Interface SBAuthorizationRule
  - Added Interface SBNamespace
  - Added Interface SBNamespaceUpdateParameters
  - Added Interface SBQueue
  - Added Interface SBSubscription
  - Added Interface SBTopic
  - Added Interface SqlRuleAction
  - Added Interface TrackedResource
  - Interface QueuesListByNamespaceNextOptionalParams no longer has parameter skip
  - Interface QueuesListByNamespaceNextOptionalParams no longer has parameter top
  - Interface RulesListBySubscriptionsNextOptionalParams no longer has parameter skip
  - Interface RulesListBySubscriptionsNextOptionalParams no longer has parameter top
  - Interface SubscriptionsListByTopicNextOptionalParams no longer has parameter skip
  - Interface SubscriptionsListByTopicNextOptionalParams no longer has parameter top
  - Interface TopicsListByNamespaceNextOptionalParams no longer has parameter skip
  - Interface TopicsListByNamespaceNextOptionalParams no longer has parameter top
    
    
## 6.0.0 (2022-05-01)
    
### Features Added

  - Added Interface ProxyResource
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface Operation has a new optional parameter properties
  - Interface OperationDisplay has a new optional parameter description
  - Add parameters of ProxyResource to TypeAlias ArmDisasterRecovery
  - Add parameters of ProxyResource to TypeAlias MigrationConfigProperties
  - Add parameters of ProxyResource to TypeAlias NetworkRuleSet
  - Add parameters of ProxyResource to TypeAlias PrivateEndpointConnection
  - Add parameters of ProxyResource to TypeAlias Rule
  - Add parameters of ProxyResource to TypeAlias SBAuthorizationRule
  - Add parameters of ProxyResource to TypeAlias SBQueue
  - Add parameters of ProxyResource to TypeAlias SBSubscription
  - Add parameters of ProxyResource to TypeAlias SBTopic
  - Type Alias SBNamespace has a new parameter alternateName
  - Type Alias SBNamespaceUpdateParameters has a new parameter alternateName

### Breaking Changes

  - Delete parameters of Resource in TypeAlias ArmDisasterRecovery
  - Delete parameters of Resource in TypeAlias MigrationConfigProperties
  - Delete parameters of Resource in TypeAlias NetworkRuleSet
  - Delete parameters of Resource in TypeAlias PrivateEndpointConnection
  - Delete parameters of Resource in TypeAlias Rule
  - Delete parameters of Resource in TypeAlias SBAuthorizationRule
  - Delete parameters of Resource in TypeAlias SBQueue
  - Delete parameters of Resource in TypeAlias SBSubscription
  - Delete parameters of Resource in TypeAlias SBTopic
  - Type Alias SBNamespaceUpdateParameters no longer has parameter zoneRedundant
    
    
## 5.0.0 (2021-12-14)

The package of @azure/arm-servicebus is using our next generation design principles since version 5.0.0-beta.2, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

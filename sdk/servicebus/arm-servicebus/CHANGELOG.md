# Release History
    
## 6.2.0-beta.1 (2023-02-08)
    
**Features**

  - Added Type Alias PublicNetworkAccess
  - Added Type Alias TlsVersion
  - Interface SBNamespace has a new optional parameter minimumTlsVersion
  - Interface SBNamespace has a new optional parameter premiumMessagingPartitions
  - Interface SBNamespace has a new optional parameter publicNetworkAccess
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownTlsVersion
    
    
## 6.1.0 (2022-12-09)
    
**Features**

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
    
**Features**

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

**Breaking Changes**

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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

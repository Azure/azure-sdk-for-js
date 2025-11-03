# Release History

## 7.0.0-beta.1 (2025-11-03)
Compared with version 6.1.0

### Features Added
  - Added operation group NetworkSecurityPerimeterConfigurationOperations
  - Added operation group NetworkSecurityPerimeterConfigurationsOperations
  - Added operation MigrationConfigsOperations.createAndStartMigration
  - Added operation NamespacesOperations.createOrUpdate
  - Added operation NamespacesOperations.delete
  - Added operation NamespacesOperations.failover
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added Interface ArmDisasterRecoveryProperties
  - Added Interface ConfidentialCompute
  - Added Interface FailOver
  - Added Interface FailOverProperties
  - Added Interface FailoverPropertiesProperties
  - Added Interface GeoDataReplicationProperties
  - Added Interface MigrationConfigPropertiesProperties
  - Added Interface NamespaceReplicaLocation
  - Added Interface NamespacesFailoverOptionalParams
  - Added Interface NetworkRuleSetProperties
  - Added Interface NetworkSecurityPerimeter
  - Added Interface NetworkSecurityPerimeterConfiguration
  - Added Interface NetworkSecurityPerimeterConfigurationListOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationProperties
  - Added Interface NetworkSecurityPerimeterConfigurationPropertiesProfile
  - Added Interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation
  - Added Interface NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileOptionalParams
  - Added Interface NspAccessRule
  - Added Interface NspAccessRuleProperties
  - Added Interface NspAccessRulePropertiesSubscriptionsItem
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PlatformCapabilities
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface ProvisioningIssue
  - Added Interface ProvisioningIssueProperties
  - Added Interface RestorePollerOptions
  - Added Interface Ruleproperties
  - Added Interface SBAuthorizationRuleProperties
  - Added Interface SBNamespaceProperties
  - Added Interface SBNamespaceUpdateProperties
  - Added Interface SBQueueProperties
  - Added Interface SBSubscriptionProperties
  - Added Interface SBTopicProperties
  - Interface ArmDisasterRecovery has a new optional parameter properties
  - Interface FailoverProperties has a new optional parameter properties
  - Interface MigrationConfigProperties has a new optional parameter properties
  - Interface NetworkRuleSet has a new optional parameter properties
  - Interface PrivateEndpointConnection has a new optional parameter properties
  - Interface PrivateLinkResource has a new optional parameter properties
  - Interface ProxyResource has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface ResourceNamespacePatch has a new optional parameter systemData
  - Interface Rule has a new optional parameter properties
  - Interface SBAuthorizationRule has a new optional parameter properties
  - Interface SBNamespace has a new optional parameter properties
  - Interface SBNamespaceUpdateParameters has a new optional parameter properties
  - Interface SBNamespaceUpdateParameters has a new optional parameter systemData
  - Interface SBQueue has a new optional parameter properties
  - Interface SBSubscription has a new optional parameter properties
  - Interface SBTopic has a new optional parameter properties
  - Interface TrackedResource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias GeoDRRoleType
  - Added Type Alias KeyType
  - Added Type Alias Mode
  - Added Type Alias NetworkSecurityPerimeterConfigurationProvisioningState
  - Added Type Alias NspAccessRuleDirection
  - Added Type Alias PublicNetworkAccess
  - Added Type Alias ResourceAssociationAccessMode
  - Added Type Alias TlsVersion
  - Added Enum AzureClouds
  - Added Enum KnownGeoDRRoleType
  - Added Enum KnownMode
  - Added Enum KnownNetworkSecurityPerimeterConfigurationProvisioningState
  - Added Enum KnownNspAccessRuleDirection
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownResourceAssociationAccessMode
  - Added Enum KnownTlsVersion
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation MigrationConfigs.beginCreateAndStartMigration
  - Removed operation MigrationConfigs.beginCreateAndStartMigrationAndWait
  - Removed operation Namespaces.beginCreateOrUpdate
  - Removed operation Namespaces.beginCreateOrUpdateAndWait
  - Removed operation Namespaces.beginDelete
  - Removed operation Namespaces.beginDeleteAndWait
  - Removed operation PrivateEndpointConnections.beginDelete
  - Removed operation PrivateEndpointConnections.beginDeleteAndWait
  - Operation DisasterRecoveryConfigs.failOver has a new signature
  - Removed Interface SqlRuleAction
  - Interface ArmDisasterRecovery no longer has parameter alternateName
  - Interface ArmDisasterRecovery no longer has parameter partnerNamespace
  - Interface ArmDisasterRecovery no longer has parameter pendingReplicationOperationsCount
  - Interface ArmDisasterRecovery no longer has parameter provisioningState
  - Interface ArmDisasterRecovery no longer has parameter role
  - Interface FailoverProperties no longer has parameter isSafeFailover
  - Interface MigrationConfigProperties no longer has parameter migrationState
  - Interface MigrationConfigProperties no longer has parameter pendingReplicationOperationsCount
  - Interface MigrationConfigProperties no longer has parameter postMigrationName
  - Interface MigrationConfigProperties no longer has parameter provisioningState
  - Interface MigrationConfigProperties no longer has parameter targetNamespace
  - Interface NetworkRuleSet no longer has parameter defaultAction
  - Interface NetworkRuleSet no longer has parameter ipRules
  - Interface NetworkRuleSet no longer has parameter publicNetworkAccess
  - Interface NetworkRuleSet no longer has parameter trustedServiceAccessEnabled
  - Interface NetworkRuleSet no longer has parameter virtualNetworkRules
  - Interface PrivateEndpointConnection no longer has parameter privateEndpoint
  - Interface PrivateEndpointConnection no longer has parameter privateLinkServiceConnectionState
  - Interface PrivateEndpointConnection no longer has parameter provisioningState
  - Interface PrivateLinkResource no longer has parameter groupId
  - Interface PrivateLinkResource no longer has parameter requiredMembers
  - Interface PrivateLinkResource no longer has parameter requiredZoneNames
  - Interface ProxyResource no longer has parameter location
  - Interface Rule no longer has parameter action
  - Interface Rule no longer has parameter correlationFilter
  - Interface Rule no longer has parameter filterType
  - Interface Rule no longer has parameter sqlFilter
  - Interface SBAuthorizationRule no longer has parameter rights
  - Interface SBNamespace no longer has parameter alternateName
  - Interface SBNamespace no longer has parameter createdAt
  - Interface SBNamespace no longer has parameter disableLocalAuth
  - Interface SBNamespace no longer has parameter encryption
  - Interface SBNamespace no longer has parameter metricId
  - Interface SBNamespace no longer has parameter privateEndpointConnections
  - Interface SBNamespace no longer has parameter provisioningState
  - Interface SBNamespace no longer has parameter serviceBusEndpoint
  - Interface SBNamespace no longer has parameter status
  - Interface SBNamespace no longer has parameter updatedAt
  - Interface SBNamespace no longer has parameter zoneRedundant
  - Interface SBNamespaceUpdateParameters no longer has parameter alternateName
  - Interface SBNamespaceUpdateParameters no longer has parameter createdAt
  - Interface SBNamespaceUpdateParameters no longer has parameter disableLocalAuth
  - Interface SBNamespaceUpdateParameters no longer has parameter encryption
  - Interface SBNamespaceUpdateParameters no longer has parameter metricId
  - Interface SBNamespaceUpdateParameters no longer has parameter privateEndpointConnections
  - Interface SBNamespaceUpdateParameters no longer has parameter provisioningState
  - Interface SBNamespaceUpdateParameters no longer has parameter serviceBusEndpoint
  - Interface SBNamespaceUpdateParameters no longer has parameter status
  - Interface SBNamespaceUpdateParameters no longer has parameter updatedAt
  - Interface SBQueue no longer has parameter accessedAt
  - Interface SBQueue no longer has parameter autoDeleteOnIdle
  - Interface SBQueue no longer has parameter countDetails
  - Interface SBQueue no longer has parameter createdAt
  - Interface SBQueue no longer has parameter deadLetteringOnMessageExpiration
  - Interface SBQueue no longer has parameter defaultMessageTimeToLive
  - Interface SBQueue no longer has parameter duplicateDetectionHistoryTimeWindow
  - Interface SBQueue no longer has parameter enableBatchedOperations
  - Interface SBQueue no longer has parameter enableExpress
  - Interface SBQueue no longer has parameter enablePartitioning
  - Interface SBQueue no longer has parameter forwardDeadLetteredMessagesTo
  - Interface SBQueue no longer has parameter forwardTo
  - Interface SBQueue no longer has parameter lockDuration
  - Interface SBQueue no longer has parameter maxDeliveryCount
  - Interface SBQueue no longer has parameter maxMessageSizeInKilobytes
  - Interface SBQueue no longer has parameter maxSizeInMegabytes
  - Interface SBQueue no longer has parameter messageCount
  - Interface SBQueue no longer has parameter requiresDuplicateDetection
  - Interface SBQueue no longer has parameter requiresSession
  - Interface SBQueue no longer has parameter sizeInBytes
  - Interface SBQueue no longer has parameter status
  - Interface SBQueue no longer has parameter updatedAt
  - Interface SBSubscription no longer has parameter accessedAt
  - Interface SBSubscription no longer has parameter autoDeleteOnIdle
  - Interface SBSubscription no longer has parameter clientAffineProperties
  - Interface SBSubscription no longer has parameter countDetails
  - Interface SBSubscription no longer has parameter createdAt
  - Interface SBSubscription no longer has parameter deadLetteringOnFilterEvaluationExceptions
  - Interface SBSubscription no longer has parameter deadLetteringOnMessageExpiration
  - Interface SBSubscription no longer has parameter defaultMessageTimeToLive
  - Interface SBSubscription no longer has parameter duplicateDetectionHistoryTimeWindow
  - Interface SBSubscription no longer has parameter enableBatchedOperations
  - Interface SBSubscription no longer has parameter forwardDeadLetteredMessagesTo
  - Interface SBSubscription no longer has parameter forwardTo
  - Interface SBSubscription no longer has parameter isClientAffine
  - Interface SBSubscription no longer has parameter lockDuration
  - Interface SBSubscription no longer has parameter maxDeliveryCount
  - Interface SBSubscription no longer has parameter messageCount
  - Interface SBSubscription no longer has parameter requiresSession
  - Interface SBSubscription no longer has parameter status
  - Interface SBSubscription no longer has parameter updatedAt
  - Interface SBTopic no longer has parameter accessedAt
  - Interface SBTopic no longer has parameter autoDeleteOnIdle
  - Interface SBTopic no longer has parameter countDetails
  - Interface SBTopic no longer has parameter createdAt
  - Interface SBTopic no longer has parameter defaultMessageTimeToLive
  - Interface SBTopic no longer has parameter duplicateDetectionHistoryTimeWindow
  - Interface SBTopic no longer has parameter enableBatchedOperations
  - Interface SBTopic no longer has parameter enableExpress
  - Interface SBTopic no longer has parameter enablePartitioning
  - Interface SBTopic no longer has parameter maxMessageSizeInKilobytes
  - Interface SBTopic no longer has parameter maxSizeInMegabytes
  - Interface SBTopic no longer has parameter requiresDuplicateDetection
  - Interface SBTopic no longer has parameter sizeInBytes
  - Interface SBTopic no longer has parameter status
  - Interface SBTopic no longer has parameter subscriptionCount
  - Interface SBTopic no longer has parameter supportOrdering
  - Interface SBTopic no longer has parameter updatedAt
  - Parameter value of interface PrivateLinkResourcesListResult is now required
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

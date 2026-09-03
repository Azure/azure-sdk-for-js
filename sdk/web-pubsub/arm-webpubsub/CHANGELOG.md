# Release History

## 2.0.0-beta.4 (2026-09-03)
Compared with version 1.2.0

### Features Added
  - Added operation group WebPubSubPersistentStoragesOperations
  - Added operation WebPubSubOperations.createOrUpdate
  - Added operation WebPubSubOperations.delete
  - Added operation WebPubSubOperations.regenerateKey
  - Added operation WebPubSubOperations.restart
  - Added operation WebPubSubOperations.update
  - Added operation WebPubSubCustomCertificatesOperations.createOrUpdate
  - Added operation WebPubSubCustomDomainsOperations.createOrUpdate
  - Added operation WebPubSubCustomDomainsOperations.delete
  - Added operation WebPubSubHubsOperations.createOrUpdate
  - Added operation WebPubSubHubsOperations.delete
  - Added operation WebPubSubPrivateEndpointConnectionsOperations.delete
  - Added operation WebPubSubReplicasOperations.createOrUpdate
  - Added operation WebPubSubReplicasOperations.restart
  - Added operation WebPubSubReplicasOperations.update
  - Added operation WebPubSubReplicaSharedPrivateLinkResourcesOperations.createOrUpdate
  - Added operation WebPubSubSharedPrivateLinkResourcesOperations.createOrUpdate
  - Added operation WebPubSubSharedPrivateLinkResourcesOperations.delete
  - Class WebPubSubManagementClient has a new constructor "constructor(credential: TokenCredential, options?: WebPubSubManagementClientOptionalParams);"
  - Added Interface ApplicationFirewallSettings
  - Added Interface ChatSettings
  - Added Interface ClientConnectionCountRule
  - Added Interface ClientTrafficControlRule
  - Added Interface CustomCertificateProperties
  - Added Interface CustomDomainProperties
  - Added Interface EventListener
  - Added Interface GroupPresenceEventFilters
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PersistentStorage
  - Added Interface PersistentStorageProperties
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface ReplicaProperties
  - Added Interface RestorePollerOptions
  - Added Interface SharedPrivateLinkResourceProperties
  - Added Interface SimplePollerLike
  - Added Interface ThrottleByJwtCustomClaimRule
  - Added Interface ThrottleByJwtSignatureRule
  - Added Interface ThrottleByUserIdRule
  - Added Interface TrafficThrottleByJwtCustomClaimRule
  - Added Interface TrafficThrottleByJwtSignatureRule
  - Added Interface TrafficThrottleByUserIdRule
  - Added Interface WebPubSubPersistentStoragesCreateOrUpdateOptionalParams
  - Added Interface WebPubSubPersistentStoragesDeleteOptionalParams
  - Added Interface WebPubSubPersistentStoragesGetOptionalParams
  - Added Interface WebPubSubPersistentStoragesListOptionalParams
  - Added Interface WebPubSubProperties
  - Interface EventHandler has a new optional parameter groupPresenceEvents
  - Interface OperationsListOptionalParams has a new optional parameter abortSignal
  - Interface OperationsListOptionalParams has a new optional parameter requestOptions
  - Interface OperationsListOptionalParams has a new optional parameter tracingOptions
  - Interface OperationsListOptionalParams has a new optional parameter onResponse
  - Interface SharedPrivateLinkResource has a new optional parameter fqdns
  - Interface UsagesListOptionalParams has a new optional parameter abortSignal
  - Interface UsagesListOptionalParams has a new optional parameter requestOptions
  - Interface UsagesListOptionalParams has a new optional parameter tracingOptions
  - Interface UsagesListOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubCheckNameAvailabilityOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubCheckNameAvailabilityOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubCheckNameAvailabilityOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubCheckNameAvailabilityOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubCustomCertificatesDeleteOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubCustomCertificatesDeleteOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubCustomCertificatesDeleteOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubCustomCertificatesDeleteOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubCustomCertificatesGetOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubCustomCertificatesGetOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubCustomCertificatesGetOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubCustomCertificatesGetOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubCustomCertificatesListOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubCustomCertificatesListOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubCustomCertificatesListOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubCustomCertificatesListOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubCustomDomainsGetOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubCustomDomainsGetOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubCustomDomainsGetOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubCustomDomainsGetOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubCustomDomainsListOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubCustomDomainsListOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubCustomDomainsListOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubCustomDomainsListOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubGetOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubGetOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubGetOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubGetOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubHubProperties has a new optional parameter chat
  - Interface WebPubSubHubsGetOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubHubsGetOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubHubsGetOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubHubsGetOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubHubsListOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubHubsListOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubHubsListOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubHubsListOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubListByResourceGroupOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubListByResourceGroupOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubListByResourceGroupOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubListByResourceGroupOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubListBySubscriptionOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubListBySubscriptionOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubListBySubscriptionOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubListBySubscriptionOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubListKeysOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubListKeysOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubListKeysOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubListKeysOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubListReplicaSkusOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubListReplicaSkusOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubListReplicaSkusOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubListReplicaSkusOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubListSkusOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubListSkusOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubListSkusOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubListSkusOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubPrivateEndpointConnectionsGetOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubPrivateEndpointConnectionsGetOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubPrivateEndpointConnectionsGetOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubPrivateEndpointConnectionsGetOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubPrivateEndpointConnectionsListOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubPrivateEndpointConnectionsListOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubPrivateEndpointConnectionsListOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubPrivateEndpointConnectionsListOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubPrivateEndpointConnectionsUpdateOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubPrivateEndpointConnectionsUpdateOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubPrivateEndpointConnectionsUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubPrivateEndpointConnectionsUpdateOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubPrivateLinkResourcesListOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubPrivateLinkResourcesListOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubPrivateLinkResourcesListOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubPrivateLinkResourcesListOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubReplicasDeleteOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubReplicasDeleteOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubReplicasDeleteOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubReplicasDeleteOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubReplicasGetOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubReplicasGetOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubReplicasGetOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubReplicasGetOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubReplicasListOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubReplicasListOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubReplicasListOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubReplicasListOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubResource has a new optional parameter applicationFirewall
  - Interface WebPubSubSharedPrivateLinkResourcesGetOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubSharedPrivateLinkResourcesGetOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubSharedPrivateLinkResourcesGetOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubSharedPrivateLinkResourcesGetOptionalParams has a new optional parameter onResponse
  - Interface WebPubSubSharedPrivateLinkResourcesListOptionalParams has a new optional parameter abortSignal
  - Interface WebPubSubSharedPrivateLinkResourcesListOptionalParams has a new optional parameter requestOptions
  - Interface WebPubSubSharedPrivateLinkResourcesListOptionalParams has a new optional parameter tracingOptions
  - Interface WebPubSubSharedPrivateLinkResourcesListOptionalParams has a new optional parameter onResponse
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ClientConnectionCountRuleDiscriminator
  - Added Type Alias ClientConnectionCountRuleUnion
  - Added Type Alias ClientTrafficControlRuleDiscriminator
  - Added Type Alias ClientTrafficControlRuleUnion
  - Added Type Alias GroupPresenceEventName
  - Added Type Alias KeyType
  - Added Enum AzureClouds
  - Added Enum KnownClientConnectionCountRuleDiscriminator
  - Added Enum KnownClientTrafficControlRuleDiscriminator
  - Added Enum KnownGroupPresenceEventName
  - Added Enum KnownVersions

### Breaking Changes
  - Operation WebPubSub.beginRestartAndWait has a new signature
  - Operation WebPubSubHubs.beginCreateOrUpdate has a new signature
  - Operation WebPubSubHubs.beginCreateOrUpdateAndWait has a new signature
  - Operation WebPubSubHubs.get has a new signature
  - Operation WebPubSubReplicas.beginRestartAndWait has a new signature
  - Removed Interface CustomCertificateList
  - Removed Interface CustomDomainList
  - Removed Interface EventListener_2
  - Removed Interface OperationList
  - Removed Interface PrivateEndpointConnectionList
  - Removed Interface PrivateLinkResourceList
  - Removed Interface ReplicaList
  - Removed Interface SharedPrivateLinkResourceList
  - Removed Interface SignalRServiceUsageList
  - Removed Interface WebPubSubHubList
  - Removed Interface WebPubSubResourceList
  - Type of parameter type of interface EventListenerEndpoint is changed from "EventHub" to EventListenerEndpointDiscriminator
  - Type of parameter type of interface EventListenerFilter is changed from "EventName" to EventListenerFilterDiscriminator
  - Type of parameter eventListeners of interface WebPubSubHubProperties is changed from EventListener_2[] to EventListener[]
  - Removed Type Alias KeyType_2
  - Type alias "EventListenerEndpointUnion" has been changed
  - Type alias "EventListenerFilterUnion" has been changed

## 2.0.0-beta.3 (2026-06-03)
Compared with version 1.2.0

### Features Added
  - Added operation WebPubSubOperations.createOrUpdate
  - Added operation WebPubSubOperations.delete
  - Added operation WebPubSubOperations.regenerateKey
  - Added operation WebPubSubOperations.restart
  - Added operation WebPubSubOperations.update
  - Added operation WebPubSubCustomCertificatesOperations.createOrUpdate
  - Added operation WebPubSubCustomDomainsOperations.createOrUpdate
  - Added operation WebPubSubCustomDomainsOperations.delete
  - Added operation WebPubSubHubsOperations.createOrUpdate
  - Added operation WebPubSubHubsOperations.delete
  - Added operation WebPubSubPrivateEndpointConnectionsOperations.delete
  - Added operation WebPubSubReplicasOperations.createOrUpdate
  - Added operation WebPubSubReplicasOperations.restart
  - Added operation WebPubSubReplicasOperations.update
  - Added operation WebPubSubReplicaSharedPrivateLinkResourcesOperations.createOrUpdate
  - Added operation WebPubSubSharedPrivateLinkResourcesOperations.createOrUpdate
  - Added operation WebPubSubSharedPrivateLinkResourcesOperations.delete
  - Class WebPubSubManagementClient has a new constructor "constructor(credential: TokenCredential, options?: WebPubSubManagementClientOptionalParams);"
  - Added Interface ApplicationFirewallSettings
  - Added Interface ClientConnectionCountRule
  - Added Interface ClientTrafficControlRule
  - Added Interface CustomCertificateProperties
  - Added Interface CustomDomainProperties
  - Added Interface EventListener
  - Added Interface GroupPresenceEventFilters
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface ReplicaProperties
  - Added Interface RestorePollerOptions
  - Added Interface SharedPrivateLinkResourceProperties
  - Added Interface SimplePollerLike
  - Added Interface ThrottleByJwtCustomClaimRule
  - Added Interface ThrottleByJwtSignatureRule
  - Added Interface ThrottleByUserIdRule
  - Added Interface TrafficThrottleByJwtCustomClaimRule
  - Added Interface TrafficThrottleByJwtSignatureRule
  - Added Interface TrafficThrottleByUserIdRule
  - Added Interface WebPubSubProperties
  - Interface EventHandler has a new optional parameter groupPresenceEvents
  - Interface SharedPrivateLinkResource has a new optional parameter fqdns
  - Interface WebPubSubResource has a new optional parameter applicationFirewall
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ClientConnectionCountRuleDiscriminator
  - Added Type Alias ClientConnectionCountRuleUnion
  - Added Type Alias ClientTrafficControlRuleDiscriminator
  - Added Type Alias ClientTrafficControlRuleUnion
  - Added Type Alias GroupPresenceEventName
  - Added Type Alias KeyType
  - Added Enum AzureClouds
  - Added Enum KnownClientConnectionCountRuleDiscriminator
  - Added Enum KnownClientTrafficControlRuleDiscriminator
  - Added Enum KnownGroupPresenceEventName
  - Added Enum KnownVersions

### Breaking Changes
  - Operation WebPubSub.beginRestartAndWait has a new signature
  - Operation WebPubSubHubs.beginCreateOrUpdate has a new signature
  - Operation WebPubSubHubs.beginCreateOrUpdateAndWait has a new signature
  - Operation WebPubSubHubs.get has a new signature
  - Operation WebPubSubReplicas.beginRestartAndWait has a new signature
  - Removed Interface CustomCertificateList
  - Removed Interface CustomDomainList
  - Removed Interface EventListener_2
  - Removed Interface OperationList
  - Removed Interface PrivateEndpointConnectionList
  - Removed Interface PrivateLinkResourceList
  - Removed Interface ReplicaList
  - Removed Interface SharedPrivateLinkResourceList
  - Removed Interface SignalRServiceUsageList
  - Removed Interface WebPubSubHubList
  - Removed Interface WebPubSubResourceList
  - Type of parameter type of interface EventListenerEndpoint is changed from "EventHub" to EventListenerEndpointDiscriminator
  - Type of parameter type of interface EventListenerFilter is changed from "EventName" to EventListenerFilterDiscriminator
  - Type of parameter eventListeners of interface WebPubSubHubProperties is changed from EventListener_2[] to EventListener[]
  - Removed Type Alias KeyType_2
  - Type alias "EventListenerEndpointUnion" has been changed
  - Type alias "EventListenerFilterUnion" has been changed

    
## 1.2.0 (2024-09-11)
    
### Features Added

  - Added operation group WebPubSubReplicas
  - Added operation group WebPubSubReplicaSharedPrivateLinkResources
  - Added operation WebPubSub.listReplicaSkus
  - Added Interface IPRule
  - Added Interface Replica
  - Added Interface ReplicaList
  - Added Interface WebPubSubListReplicaSkusOptionalParams
  - Added Interface WebPubSubRegenerateKeyHeaders
  - Added Interface WebPubSubReplicasCreateOrUpdateOptionalParams
  - Added Interface WebPubSubReplicasDeleteOptionalParams
  - Added Interface WebPubSubReplicasGetOptionalParams
  - Added Interface WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams
  - Added Interface WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams
  - Added Interface WebPubSubReplicaSharedPrivateLinkResourcesListNextOptionalParams
  - Added Interface WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams
  - Added Interface WebPubSubReplicasListNextOptionalParams
  - Added Interface WebPubSubReplicasListOptionalParams
  - Added Interface WebPubSubReplicasRestartHeaders
  - Added Interface WebPubSubReplicasRestartOptionalParams
  - Added Interface WebPubSubReplicasUpdateHeaders
  - Added Interface WebPubSubReplicasUpdateOptionalParams
  - Added Interface WebPubSubRestartHeaders
  - Added Interface WebPubSubSocketIOSettings
  - Added Interface WebPubSubUpdateHeaders
  - Added Type Alias ServiceKind
  - Added Type Alias WebPubSubListReplicaSkusResponse
  - Added Type Alias WebPubSubReplicasCreateOrUpdateResponse
  - Added Type Alias WebPubSubReplicasGetResponse
  - Added Type Alias WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateResponse
  - Added Type Alias WebPubSubReplicaSharedPrivateLinkResourcesGetResponse
  - Added Type Alias WebPubSubReplicaSharedPrivateLinkResourcesListNextResponse
  - Added Type Alias WebPubSubReplicaSharedPrivateLinkResourcesListResponse
  - Added Type Alias WebPubSubReplicasListNextResponse
  - Added Type Alias WebPubSubReplicasListResponse
  - Added Type Alias WebPubSubReplicasRestartResponse
  - Added Type Alias WebPubSubReplicasUpdateResponse
  - Added Type Alias WebPubSubRestartResponse
  - Interface Resource has a new optional parameter systemData
  - Interface WebPubSubHubProperties has a new optional parameter webSocketKeepAliveIntervalInSeconds
  - Interface WebPubSubNetworkACLs has a new optional parameter ipRules
  - Interface WebPubSubResource has a new optional parameter kind
  - Interface WebPubSubResource has a new optional parameter regionEndpointEnabled
  - Interface WebPubSubResource has a new optional parameter resourceStopped
  - Interface WebPubSubResource has a new optional parameter socketIO
  - Added Enum KnownServiceKind
  - Interface CustomCertificate no longer has parameter systemData
  - Interface CustomDomain no longer has parameter systemData
  - Interface PrivateEndpointConnection no longer has parameter systemData
  - Interface SharedPrivateLinkResource no longer has parameter systemData
  - Interface WebPubSubHub no longer has parameter systemData
  - Interface WebPubSubResource no longer has parameter systemData
  - Parameter location of interface TrackedResource is now required
    
    
## 2.0.0-beta.2 (2023-10-10)
    
### Features Added

  - Added operation group WebPubSubReplicas
  - Added operation WebPubSub.listReplicaSkus
  - Added Interface IPRule
  - Added Interface Replica
  - Added Interface ReplicaList
  - Added Interface WebPubSubListReplicaSkusOptionalParams
  - Added Interface WebPubSubRegenerateKeyHeaders
  - Added Interface WebPubSubReplicasCreateOrUpdateOptionalParams
  - Added Interface WebPubSubReplicasDeleteOptionalParams
  - Added Interface WebPubSubReplicasGetOptionalParams
  - Added Interface WebPubSubReplicasListNextOptionalParams
  - Added Interface WebPubSubReplicasListOptionalParams
  - Added Interface WebPubSubReplicasRestartHeaders
  - Added Interface WebPubSubReplicasRestartOptionalParams
  - Added Interface WebPubSubReplicasUpdateHeaders
  - Added Interface WebPubSubReplicasUpdateOptionalParams
  - Added Interface WebPubSubRestartHeaders
  - Added Interface WebPubSubUpdateHeaders
  - Added Type Alias ServiceKind
  - Added Type Alias WebPubSubListReplicaSkusResponse
  - Added Type Alias WebPubSubReplicasCreateOrUpdateResponse
  - Added Type Alias WebPubSubReplicasGetResponse
  - Added Type Alias WebPubSubReplicasListNextResponse
  - Added Type Alias WebPubSubReplicasListResponse
  - Added Type Alias WebPubSubReplicasRestartResponse
  - Added Type Alias WebPubSubReplicasUpdateResponse
  - Added Type Alias WebPubSubRestartResponse
  - Interface Resource has a new optional parameter systemData
  - Interface WebPubSubNetworkACLs has a new optional parameter ipRules
  - Interface WebPubSubResource has a new optional parameter kind
  - Interface WebPubSubResource has a new optional parameter regionEndpointEnabled
  - Interface WebPubSubResource has a new optional parameter resourceStopped
  - Added Enum KnownServiceKind

### Breaking Changes

  - Parameter location of interface TrackedResource is now required
    
    
## 2.0.0-beta.1 (2023-07-11)
    
### Features Added

  - Added operation group WebPubSubReplicas
  - Added operation WebPubSub.listReplicaSkus
  - Added Interface Replica
  - Added Interface ReplicaList
  - Added Interface WebPubSubListReplicaSkusOptionalParams
  - Added Interface WebPubSubRegenerateKeyHeaders
  - Added Interface WebPubSubReplicasCreateOrUpdateOptionalParams
  - Added Interface WebPubSubReplicasDeleteOptionalParams
  - Added Interface WebPubSubReplicasGetOptionalParams
  - Added Interface WebPubSubReplicasListNextOptionalParams
  - Added Interface WebPubSubReplicasListOptionalParams
  - Added Interface WebPubSubReplicasRestartHeaders
  - Added Interface WebPubSubReplicasRestartOptionalParams
  - Added Interface WebPubSubReplicasUpdateHeaders
  - Added Interface WebPubSubReplicasUpdateOptionalParams
  - Added Interface WebPubSubRestartHeaders
  - Added Interface WebPubSubUpdateHeaders
  - Added Type Alias ServiceKind
  - Added Type Alias WebPubSubListReplicaSkusResponse
  - Added Type Alias WebPubSubReplicasCreateOrUpdateResponse
  - Added Type Alias WebPubSubReplicasGetResponse
  - Added Type Alias WebPubSubReplicasListNextResponse
  - Added Type Alias WebPubSubReplicasListResponse
  - Added Type Alias WebPubSubReplicasRestartResponse
  - Added Type Alias WebPubSubReplicasUpdateResponse
  - Added Type Alias WebPubSubRestartResponse
  - Interface Resource has a new optional parameter systemData
  - Interface WebPubSubResource has a new optional parameter kind
  - Added Enum KnownServiceKind
  - Interface CustomCertificate no longer has parameter systemData
  - Interface CustomDomain no longer has parameter systemData
  - Interface PrivateEndpointConnection no longer has parameter systemData
  - Interface SharedPrivateLinkResource no longer has parameter systemData
  - Interface WebPubSubHub no longer has parameter systemData
  - Interface WebPubSubResource no longer has parameter systemData

### Breaking Changes

  - Parameter location of interface TrackedResource is now required
    
 
## 1.1.0 (2023-03-09)
    
### Features Added

  - Added operation group WebPubSubCustomCertificates
  - Added operation group WebPubSubCustomDomains
  - Added Interface CustomCertificate
  - Added Interface CustomCertificateList
  - Added Interface CustomDomain
  - Added Interface CustomDomainList
  - Added Interface EventHubEndpoint
  - Added Interface EventListener_2
  - Added Interface EventListenerEndpoint
  - Added Interface EventListenerFilter
  - Added Interface EventNameFilter
  - Added Interface PrivateEndpointACL
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface ResourceReference
  - Added Interface SharedPrivateLinkResource
  - Added Interface TrackedResource
  - Added Interface WebPubSubCustomCertificatesCreateOrUpdateOptionalParams
  - Added Interface WebPubSubCustomCertificatesDeleteOptionalParams
  - Added Interface WebPubSubCustomCertificatesGetOptionalParams
  - Added Interface WebPubSubCustomCertificatesListNextOptionalParams
  - Added Interface WebPubSubCustomCertificatesListOptionalParams
  - Added Interface WebPubSubCustomDomainsCreateOrUpdateOptionalParams
  - Added Interface WebPubSubCustomDomainsDeleteOptionalParams
  - Added Interface WebPubSubCustomDomainsGetOptionalParams
  - Added Interface WebPubSubCustomDomainsListNextOptionalParams
  - Added Interface WebPubSubCustomDomainsListOptionalParams
  - Added Interface WebPubSubHub
  - Added Interface WebPubSubResource
  - Added Type Alias EventListenerEndpointDiscriminator
  - Added Type Alias EventListenerEndpointUnion
  - Added Type Alias EventListenerFilterDiscriminator
  - Added Type Alias EventListenerFilterUnion
  - Added Type Alias WebPubSubCustomCertificatesCreateOrUpdateResponse
  - Added Type Alias WebPubSubCustomCertificatesGetResponse
  - Added Type Alias WebPubSubCustomCertificatesListNextResponse
  - Added Type Alias WebPubSubCustomCertificatesListResponse
  - Added Type Alias WebPubSubCustomDomainsCreateOrUpdateResponse
  - Added Type Alias WebPubSubCustomDomainsGetResponse
  - Added Type Alias WebPubSubCustomDomainsListNextResponse
  - Added Type Alias WebPubSubCustomDomainsListResponse
  - Interface WebPubSubHubProperties has a new optional parameter eventListeners
  - Added Enum KnownEventListenerEndpointDiscriminator
  - Added Enum KnownEventListenerFilterDiscriminator
  - Added function getContinuationToken
    
    
## 1.0.0 (2021-12-16)

- The package of @azure/arm-webpubsub is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).

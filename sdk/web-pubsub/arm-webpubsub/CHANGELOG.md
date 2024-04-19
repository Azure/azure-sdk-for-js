# Release History
    
## 2.0.0-beta.2 (2023-10-10)
    
**Features**

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

**Breaking Changes**

  - Parameter location of interface TrackedResource is now required
    
    
## 2.0.0-beta.1 (2023-07-11)
    
**Features**

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

**Breaking Changes**

  - Parameter location of interface TrackedResource is now required
    
 
## 1.1.0 (2023-03-09)
    
**Features**

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

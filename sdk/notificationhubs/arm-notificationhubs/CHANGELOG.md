# Release History
    
## 3.0.0-beta.1 (2024-03-12)
    
**Features**

  - Added operation group PrivateEndpointConnections
  - Added operation Namespaces.beginCreateOrUpdate
  - Added operation Namespaces.beginCreateOrUpdateAndWait
  - Added operation Namespaces.delete
  - Added operation Namespaces.getPnsCredentials
  - Added operation Namespaces.update
  - Added operation NotificationHubs.update
  - Added Interface AdmCredentialProperties
  - Added Interface ApnsCredentialProperties
  - Added Interface Availability
  - Added Interface BaiduCredentialProperties
  - Added Interface BrowserCredential
  - Added Interface BrowserCredentialProperties
  - Added Interface ConnectionDetails
  - Added Interface DebugSendResult
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface FcmV1Credential
  - Added Interface FcmV1CredentialProperties
  - Added Interface GcmCredentialProperties
  - Added Interface GroupConnectivityInformation
  - Added Interface IpRule
  - Added Interface LogSpecification
  - Added Interface MetricSpecification
  - Added Interface MpnsCredentialProperties
  - Added Interface NamespaceProperties
  - Added Interface NamespacesGetPnsCredentialsOptionalParams
  - Added Interface NamespacesUpdateOptionalParams
  - Added Interface NetworkAcls
  - Added Interface NotificationHubProperties
  - Added Interface NotificationHubsUpdateOptionalParams
  - Added Interface OperationProperties
  - Added Interface PnsCredentials
  - Added Interface PolicyKeyResource
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateEndpointConnectionResource
  - Added Interface PrivateEndpointConnectionResourceListResult
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface PrivateEndpointConnectionsDeleteOptionalParams
  - Added Interface PrivateEndpointConnectionsGetGroupIdOptionalParams
  - Added Interface PrivateEndpointConnectionsGetOptionalParams
  - Added Interface PrivateEndpointConnectionsListGroupIdsOptionalParams
  - Added Interface PrivateEndpointConnectionsListOptionalParams
  - Added Interface PrivateEndpointConnectionsUpdateOptionalParams
  - Added Interface PrivateLinkResource
  - Added Interface PrivateLinkResourceListResult
  - Added Interface PrivateLinkResourceProperties
  - Added Interface PrivateLinkServiceConnection
  - Added Interface ProxyResource
  - Added Interface PublicInternetAuthorizationRule
  - Added Interface RegistrationResult
  - Added Interface RemotePrivateEndpointConnection
  - Added Interface RemotePrivateLinkServiceConnectionState
  - Added Interface ServiceSpecification
  - Added Interface SystemData
  - Added Interface TrackedResource
  - Added Interface WnsCredentialProperties
  - Added Interface XiaomiCredential
  - Added Interface XiaomiCredentialProperties
  - Added Type Alias CreatedByType
  - Added Type Alias NamespacesGetPnsCredentialsResponse
  - Added Type Alias NamespaceStatus
  - Added Type Alias NamespacesUpdateResponse
  - Added Type Alias NotificationHubsUpdateResponse
  - Added Type Alias OperationProvisioningState
  - Added Type Alias PolicyKeyType
  - Added Type Alias PrivateEndpointConnectionProvisioningState
  - Added Type Alias PrivateEndpointConnectionsDeleteResponse
  - Added Type Alias PrivateEndpointConnectionsGetGroupIdResponse
  - Added Type Alias PrivateEndpointConnectionsGetResponse
  - Added Type Alias PrivateEndpointConnectionsListGroupIdsResponse
  - Added Type Alias PrivateEndpointConnectionsListResponse
  - Added Type Alias PrivateEndpointConnectionsUpdateResponse
  - Added Type Alias PrivateLinkConnectionStatus
  - Added Type Alias PublicNetworkAccess
  - Added Type Alias ReplicationRegion
  - Added Type Alias ZoneRedundancyPreference
  - Interface CheckAvailabilityResult has a new optional parameter location
  - Interface CheckAvailabilityResult has a new optional parameter sku
  - Interface CheckAvailabilityResult has a new optional parameter tags
  - Interface DebugSendResponse has a new optional parameter location
  - Interface DebugSendResponse has a new optional parameter properties
  - Interface DebugSendResponse has a new optional parameter tags
  - Interface ErrorResponse has a new optional parameter error
  - Interface NamespacePatchParameters has a new optional parameter properties
  - Interface NamespaceResource has a new optional parameter properties
  - Interface NamespacesCreateOrUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface NamespacesCreateOrUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface NamespacesListAllOptionalParams has a new optional parameter skipToken
  - Interface NamespacesListAllOptionalParams has a new optional parameter top
  - Interface NamespacesListOptionalParams has a new optional parameter skipToken
  - Interface NamespacesListOptionalParams has a new optional parameter top
  - Interface NotificationHubPatchParameters has a new optional parameter properties
  - Interface NotificationHubPatchParameters has a new optional parameter sku
  - Interface NotificationHubPatchParameters has a new optional parameter tags
  - Interface NotificationHubResource has a new optional parameter properties
  - Interface NotificationHubResource has a new optional parameter sku
  - Interface NotificationHubsListOptionalParams has a new optional parameter skipToken
  - Interface NotificationHubsListOptionalParams has a new optional parameter top
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter properties
  - Interface OperationDisplay has a new optional parameter description
  - Interface PnsCredentialsResource has a new optional parameter location
  - Interface PnsCredentialsResource has a new optional parameter properties
  - Interface PnsCredentialsResource has a new optional parameter tags
  - Interface Resource has a new optional parameter systemData
  - Interface SharedAccessAuthorizationRuleResource has a new optional parameter location
  - Interface SharedAccessAuthorizationRuleResource has a new optional parameter properties
  - Interface SharedAccessAuthorizationRuleResource has a new optional parameter tags
  - Added Enum KnownAccessRights
  - Added Enum KnownCreatedByType
  - Added Enum KnownNamespaceStatus
  - Added Enum KnownNamespaceType
  - Added Enum KnownOperationProvisioningState
  - Added Enum KnownPolicyKeyType
  - Added Enum KnownPrivateEndpointConnectionProvisioningState
  - Added Enum KnownPrivateLinkConnectionStatus
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownReplicationRegion
  - Added Enum KnownZoneRedundancyPreference

**Breaking Changes**

  - Removed operation Namespaces.beginDelete
  - Removed operation Namespaces.beginDeleteAndWait
  - Removed operation Namespaces.createOrUpdate
  - Removed operation Namespaces.patch
  - Removed operation NotificationHubs.patch
  - Operation Namespaces.createOrUpdateAuthorizationRule has a new signature
  - Operation Namespaces.regenerateKeys has a new signature
  - Operation NotificationHubs.createOrUpdate has a new signature
  - Operation NotificationHubs.createOrUpdateAuthorizationRule has a new signature
  - Operation NotificationHubs.regenerateKeys has a new signature
  - Interface AdmCredential no longer has parameter authTokenUrl
  - Interface AdmCredential no longer has parameter clientId
  - Interface AdmCredential no longer has parameter clientSecret
  - Interface ApnsCredential no longer has parameter apnsCertificate
  - Interface ApnsCredential no longer has parameter appId
  - Interface ApnsCredential no longer has parameter appName
  - Interface ApnsCredential no longer has parameter certificateKey
  - Interface ApnsCredential no longer has parameter endpoint
  - Interface ApnsCredential no longer has parameter keyId
  - Interface ApnsCredential no longer has parameter thumbprint
  - Interface ApnsCredential no longer has parameter token
  - Interface BaiduCredential no longer has parameter baiduApiKey
  - Interface BaiduCredential no longer has parameter baiduEndPoint
  - Interface BaiduCredential no longer has parameter baiduSecretKey
  - Interface DebugSendResponse no longer has parameter failure
  - Interface DebugSendResponse no longer has parameter results
  - Interface DebugSendResponse no longer has parameter success
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter message
  - Interface GcmCredential no longer has parameter gcmEndpoint
  - Interface GcmCredential no longer has parameter googleApiKey
  - Interface MpnsCredential no longer has parameter certificateKey
  - Interface MpnsCredential no longer has parameter mpnsCertificate
  - Interface MpnsCredential no longer has parameter thumbprint
  - Interface NamespaceResource no longer has parameter createdAt
  - Interface NamespaceResource no longer has parameter critical
  - Interface NamespaceResource no longer has parameter dataCenter
  - Interface NamespaceResource no longer has parameter enabled
  - Interface NamespaceResource no longer has parameter metricId
  - Interface NamespaceResource no longer has parameter namePropertiesName
  - Interface NamespaceResource no longer has parameter namespaceType
  - Interface NamespaceResource no longer has parameter provisioningState
  - Interface NamespaceResource no longer has parameter region
  - Interface NamespaceResource no longer has parameter scaleUnit
  - Interface NamespaceResource no longer has parameter serviceBusEndpoint
  - Interface NamespaceResource no longer has parameter status
  - Interface NamespaceResource no longer has parameter subscriptionId
  - Interface NamespaceResource no longer has parameter updatedAt
  - Interface NamespacesDeleteOptionalParams no longer has parameter resumeFrom
  - Interface NamespacesDeleteOptionalParams no longer has parameter updateIntervalInMs
  - Interface NotificationHubPatchParameters no longer has parameter admCredential
  - Interface NotificationHubPatchParameters no longer has parameter apnsCredential
  - Interface NotificationHubPatchParameters no longer has parameter authorizationRules
  - Interface NotificationHubPatchParameters no longer has parameter baiduCredential
  - Interface NotificationHubPatchParameters no longer has parameter gcmCredential
  - Interface NotificationHubPatchParameters no longer has parameter mpnsCredential
  - Interface NotificationHubPatchParameters no longer has parameter namePropertiesName
  - Interface NotificationHubPatchParameters no longer has parameter registrationTtl
  - Interface NotificationHubPatchParameters no longer has parameter wnsCredential
  - Interface NotificationHubResource no longer has parameter admCredential
  - Interface NotificationHubResource no longer has parameter apnsCredential
  - Interface NotificationHubResource no longer has parameter authorizationRules
  - Interface NotificationHubResource no longer has parameter baiduCredential
  - Interface NotificationHubResource no longer has parameter gcmCredential
  - Interface NotificationHubResource no longer has parameter mpnsCredential
  - Interface NotificationHubResource no longer has parameter namePropertiesName
  - Interface NotificationHubResource no longer has parameter registrationTtl
  - Interface NotificationHubResource no longer has parameter wnsCredential
  - Interface NotificationHubsDebugSendOptionalParams no longer has parameter parameters
  - Interface PnsCredentialsResource no longer has parameter admCredential
  - Interface PnsCredentialsResource no longer has parameter apnsCredential
  - Interface PnsCredentialsResource no longer has parameter baiduCredential
  - Interface PnsCredentialsResource no longer has parameter gcmCredential
  - Interface PnsCredentialsResource no longer has parameter mpnsCredential
  - Interface PnsCredentialsResource no longer has parameter wnsCredential
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter sku
  - Interface Resource no longer has parameter tags
  - Interface SharedAccessAuthorizationRuleResource no longer has parameter claimType
  - Interface SharedAccessAuthorizationRuleResource no longer has parameter claimValue
  - Interface SharedAccessAuthorizationRuleResource no longer has parameter createdTime
  - Interface SharedAccessAuthorizationRuleResource no longer has parameter keyName
  - Interface SharedAccessAuthorizationRuleResource no longer has parameter modifiedTime
  - Interface SharedAccessAuthorizationRuleResource no longer has parameter primaryKey
  - Interface SharedAccessAuthorizationRuleResource no longer has parameter revision
  - Interface SharedAccessAuthorizationRuleResource no longer has parameter rights
  - Interface SharedAccessAuthorizationRuleResource no longer has parameter secondaryKey
  - Interface WnsCredential no longer has parameter packageSid
  - Interface WnsCredential no longer has parameter secretKey
  - Interface WnsCredential no longer has parameter windowsLiveEndpoint
  - Interface AdmCredential has a new required parameter properties
  - Interface ApnsCredential has a new required parameter properties
  - Interface BaiduCredential has a new required parameter properties
  - Interface GcmCredential has a new required parameter properties
  - Interface MpnsCredential has a new required parameter properties
  - Interface NamespaceResource has a new required parameter sku
  - Interface WnsCredential has a new required parameter properties
  - Parameter rights of interface SharedAccessAuthorizationRuleProperties is now required
  - Type of parameter createdTime of interface SharedAccessAuthorizationRuleProperties is changed from string to Date
  - Type of parameter modifiedTime of interface SharedAccessAuthorizationRuleProperties is changed from string to Date
    
    
## 2.1.0 (2022-12-01)
    
**Features**

  - Added Interface CheckAvailabilityResult
  - Added Interface DebugSendResponse
  - Added Interface NamespaceCreateOrUpdateParameters
  - Added Interface NamespaceResource
  - Added Interface NotificationHubCreateOrUpdateParameters
  - Added Interface NotificationHubPatchParameters
  - Added Interface NotificationHubResource
  - Added Interface PnsCredentialsResource
  - Added Interface SharedAccessAuthorizationRuleResource
    
## 2.0.1 (2022-04-27)

**Features**

  - Bug fix

## 2.0.0 (2021-12-20)

The package of @azure/arm-notificationhubs is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).

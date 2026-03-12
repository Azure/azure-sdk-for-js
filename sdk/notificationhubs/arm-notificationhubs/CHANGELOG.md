# Release History

## 3.0.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.0.0-beta.2 (2025-08-22)

### Other Changes

  - Other fixes

## 3.0.0-beta.1 (2024-03-18)
    
### Features Added

  - Added operation group PrivateEndpointConnections
  - Added operation Namespaces.beginCreateOrUpdate
  - Added operation Namespaces.beginCreateOrUpdateAndWait
  - Added operation Namespaces.delete
  - Added operation Namespaces.getPnsCredentials
  - Added operation Namespaces.update
  - Added operation NotificationHubs.update
  - Added Interface Availability
  - Added Interface BrowserCredential
  - Added Interface ConnectionDetails
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface FcmV1Credential
  - Added Interface GroupConnectivityInformation
  - Added Interface IpRule
  - Added Interface LogSpecification
  - Added Interface MetricSpecification
  - Added Interface NamespaceProperties
  - Added Interface NamespacesGetPnsCredentialsOptionalParams
  - Added Interface NamespacesUpdateOptionalParams
  - Added Interface NetworkAcls
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
  - Added Interface XiaomiCredential
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
  - Interface DebugSendResponse has a new optional parameter tags
  - Interface ErrorResponse has a new optional parameter error
  - Interface NamespacePatchParameters has a new optional parameter properties
  - Interface NamespaceResource has a new optional parameter networkAcls
  - Interface NamespaceResource has a new optional parameter pnsCredentials
  - Interface NamespaceResource has a new optional parameter privateEndpointConnections
  - Interface NamespaceResource has a new optional parameter publicNetworkAccess
  - Interface NamespaceResource has a new optional parameter replicationRegion
  - Interface NamespaceResource has a new optional parameter zoneRedundancy
  - Interface NamespacesCreateOrUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface NamespacesCreateOrUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface NamespacesListAllOptionalParams has a new optional parameter skipToken
  - Interface NamespacesListAllOptionalParams has a new optional parameter top
  - Interface NamespacesListOptionalParams has a new optional parameter skipToken
  - Interface NamespacesListOptionalParams has a new optional parameter top
  - Interface NotificationHubPatchParameters has a new optional parameter browserCredential
  - Interface NotificationHubPatchParameters has a new optional parameter dailyMaxActiveDevices
  - Interface NotificationHubPatchParameters has a new optional parameter fcmV1Credential
  - Interface NotificationHubPatchParameters has a new optional parameter name
  - Interface NotificationHubPatchParameters has a new optional parameter sku
  - Interface NotificationHubPatchParameters has a new optional parameter tags
  - Interface NotificationHubPatchParameters has a new optional parameter xiaomiCredential
  - Interface NotificationHubResource has a new optional parameter browserCredential
  - Interface NotificationHubResource has a new optional parameter dailyMaxActiveDevices
  - Interface NotificationHubResource has a new optional parameter fcmV1Credential
  - Interface NotificationHubResource has a new optional parameter sku
  - Interface NotificationHubResource has a new optional parameter xiaomiCredential
  - Interface NotificationHubsListOptionalParams has a new optional parameter skipToken
  - Interface NotificationHubsListOptionalParams has a new optional parameter top
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter properties
  - Interface OperationDisplay has a new optional parameter description
  - Interface PnsCredentialsResource has a new optional parameter browserCredential
  - Interface PnsCredentialsResource has a new optional parameter fcmV1Credential
  - Interface PnsCredentialsResource has a new optional parameter location
  - Interface PnsCredentialsResource has a new optional parameter tags
  - Interface PnsCredentialsResource has a new optional parameter xiaomiCredential
  - Interface Resource has a new optional parameter systemData
  - Interface SharedAccessAuthorizationRuleResource has a new optional parameter location
  - Interface SharedAccessAuthorizationRuleResource has a new optional parameter tags
  - Interface WnsCredential has a new optional parameter certificateKey
  - Interface WnsCredential has a new optional parameter wnsCertificate
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

### Breaking Changes

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
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter message
  - Interface NamespacesDeleteOptionalParams no longer has parameter resumeFrom
  - Interface NamespacesDeleteOptionalParams no longer has parameter updateIntervalInMs
  - Interface NotificationHubPatchParameters no longer has parameter namePropertiesName
  - Interface NotificationHubsDebugSendOptionalParams no longer has parameter parameters
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter sku
  - Interface Resource no longer has parameter tags
  - Interface NamespaceResource has a new required parameter sku
  - Parameter authTokenUrl of interface AdmCredential is now required
  - Parameter clientId of interface AdmCredential is now required
  - Parameter clientSecret of interface AdmCredential is now required
  - Parameter endpoint of interface ApnsCredential is now required
  - Parameter baiduApiKey of interface BaiduCredential is now required
  - Parameter baiduEndPoint of interface BaiduCredential is now required
  - Parameter baiduSecretKey of interface BaiduCredential is now required
  - Parameter googleApiKey of interface GcmCredential is now required
  - Parameter certificateKey of interface MpnsCredential is now required
  - Parameter mpnsCertificate of interface MpnsCredential is now required
  - Parameter thumbprint of interface MpnsCredential is now required
  - Parameter rights of interface SharedAccessAuthorizationRuleProperties is now required
  - Type of parameter results of interface DebugSendResponse is changed from Record<string, unknown> to RegistrationResult[]
  - Type of parameter provisioningState of interface NamespaceResource is changed from string to OperationProvisioningState
  - Type of parameter status of interface NamespaceResource is changed from string to NamespaceStatus
  - Type of parameter createdTime of interface SharedAccessAuthorizationRuleProperties is changed from string to Date
  - Type of parameter modifiedTime of interface SharedAccessAuthorizationRuleProperties is changed from string to Date
  - Type of parameter createdTime of interface SharedAccessAuthorizationRuleResource is changed from string to Date
  - Type of parameter modifiedTime of interface SharedAccessAuthorizationRuleResource is changed from string to Date
    
    
## 2.1.0 (2022-12-01)
    
### Features Added

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

### Features Added

  - Bug fix

## 2.0.0 (2021-12-20)

The package of @azure/arm-notificationhubs is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

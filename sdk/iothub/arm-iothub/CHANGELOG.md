# Release History

## 7.0.0-beta.4 (2026-09-14)
Compared with version 6.3.0

### Features Added
  - Added operation IotHubOperations.manualFailover
  - Added operation IotHubResourceOperations.createOrUpdate
  - Added operation IotHubResourceOperations.delete
  - Added operation IotHubResourceOperations.update
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added operation PrivateEndpointConnectionsOperations.update
  - Class IotHubClient has a new constructor "constructor(credential: TokenCredential, options?: IotHubClientOptionalParams);"
  - Added Interface DeviceRegistry
  - Added Interface DeviceRegistryIdentity
  - Added Interface DeviceRegistryLinkingProperties
  - Added Interface EncryptionPropertiesDescription
  - Added Interface IotHubDetails
  - Added Interface IotHubPropertiesDeviceStreams
  - Added Interface IotHubResourceListEndpointHealthOptionalParams
  - Added Interface IotHubResourceListQuotaMetricsOptionalParams
  - Added Interface IotHubResourceListValidSkusOptionalParams
  - Added Interface KeyVaultKeyProperties
  - Added Interface MqttV5Settings
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateLinkResourcesOperationsGetOptionalParams
  - Added Interface PrivateLinkResourcesOperationsListOptionalParams
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface RootCertificateProperties
  - Added Interface RoutingEventStreamProperties
  - Added Interface SimplePollerLike
  - Added Interface TopicGroup
  - Added Interface TrackedResource
  - Interface CertificateDescription has a new optional parameter systemData
  - Interface CertificateProperties has a new optional parameter certificateAuthorityResourceId
  - Interface CertificatePropertiesWithNonce has a new optional parameter certificateAuthorityResourceId
  - Interface CertificatesCreateOrUpdateOptionalParams has a new optional parameter abortSignal
  - Interface CertificatesCreateOrUpdateOptionalParams has a new optional parameter requestOptions
  - Interface CertificatesCreateOrUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface CertificatesCreateOrUpdateOptionalParams has a new optional parameter onResponse
  - Interface CertificatesDeleteOptionalParams has a new optional parameter abortSignal
  - Interface CertificatesDeleteOptionalParams has a new optional parameter requestOptions
  - Interface CertificatesDeleteOptionalParams has a new optional parameter tracingOptions
  - Interface CertificatesDeleteOptionalParams has a new optional parameter onResponse
  - Interface CertificatesGenerateVerificationCodeOptionalParams has a new optional parameter abortSignal
  - Interface CertificatesGenerateVerificationCodeOptionalParams has a new optional parameter requestOptions
  - Interface CertificatesGenerateVerificationCodeOptionalParams has a new optional parameter tracingOptions
  - Interface CertificatesGenerateVerificationCodeOptionalParams has a new optional parameter onResponse
  - Interface CertificatesGetOptionalParams has a new optional parameter abortSignal
  - Interface CertificatesGetOptionalParams has a new optional parameter requestOptions
  - Interface CertificatesGetOptionalParams has a new optional parameter tracingOptions
  - Interface CertificatesGetOptionalParams has a new optional parameter onResponse
  - Interface CertificatesListByIotHubOptionalParams has a new optional parameter abortSignal
  - Interface CertificatesListByIotHubOptionalParams has a new optional parameter requestOptions
  - Interface CertificatesListByIotHubOptionalParams has a new optional parameter tracingOptions
  - Interface CertificatesListByIotHubOptionalParams has a new optional parameter onResponse
  - Interface CertificatesVerifyOptionalParams has a new optional parameter abortSignal
  - Interface CertificatesVerifyOptionalParams has a new optional parameter requestOptions
  - Interface CertificatesVerifyOptionalParams has a new optional parameter tracingOptions
  - Interface CertificatesVerifyOptionalParams has a new optional parameter onResponse
  - Interface EventHubConsumerGroupInfo has a new optional parameter systemData
  - Interface IotHubProperties has a new optional parameter connectionProfile
  - Interface IotHubProperties has a new optional parameter deviceHostName
  - Interface IotHubProperties has a new optional parameter deviceRegistry
  - Interface IotHubProperties has a new optional parameter deviceStreams
  - Interface IotHubProperties has a new optional parameter encryption
  - Interface IotHubProperties has a new optional parameter iotHubDetails
  - Interface IotHubProperties has a new optional parameter ipVersion
  - Interface IotHubProperties has a new optional parameter mqttV5Settings
  - Interface IotHubProperties has a new optional parameter rootCertificate
  - Interface IotHubProperties has a new optional parameter serviceHostName
  - Interface IotHubResourceCheckNameAvailabilityOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceCheckNameAvailabilityOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceCheckNameAvailabilityOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceCheckNameAvailabilityOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceCreateEventHubConsumerGroupOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceCreateEventHubConsumerGroupOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceCreateEventHubConsumerGroupOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceCreateEventHubConsumerGroupOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceDeleteEventHubConsumerGroupOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceDeleteEventHubConsumerGroupOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceDeleteEventHubConsumerGroupOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceDeleteEventHubConsumerGroupOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceExportDevicesOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceExportDevicesOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceExportDevicesOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceExportDevicesOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceGetEventHubConsumerGroupOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceGetEventHubConsumerGroupOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceGetEventHubConsumerGroupOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceGetEventHubConsumerGroupOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceGetJobOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceGetJobOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceGetJobOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceGetJobOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceGetKeysForKeyNameOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceGetKeysForKeyNameOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceGetKeysForKeyNameOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceGetKeysForKeyNameOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceGetOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceGetOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceGetOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceGetOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceGetStatsOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceGetStatsOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceGetStatsOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceGetStatsOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceImportDevicesOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceImportDevicesOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceImportDevicesOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceImportDevicesOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceListByResourceGroupOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceListByResourceGroupOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceListByResourceGroupOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceListByResourceGroupOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceListBySubscriptionOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceListBySubscriptionOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceListBySubscriptionOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceListBySubscriptionOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceListEventHubConsumerGroupsOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceListEventHubConsumerGroupsOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceListEventHubConsumerGroupsOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceListEventHubConsumerGroupsOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceListJobsOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceListJobsOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceListJobsOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceListJobsOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceListKeysOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceListKeysOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceListKeysOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceListKeysOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceTestAllRoutesOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceTestAllRoutesOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceTestAllRoutesOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceTestAllRoutesOptionalParams has a new optional parameter onResponse
  - Interface IotHubResourceTestRouteOptionalParams has a new optional parameter abortSignal
  - Interface IotHubResourceTestRouteOptionalParams has a new optional parameter requestOptions
  - Interface IotHubResourceTestRouteOptionalParams has a new optional parameter tracingOptions
  - Interface IotHubResourceTestRouteOptionalParams has a new optional parameter onResponse
  - Interface OperationsListOptionalParams has a new optional parameter abortSignal
  - Interface OperationsListOptionalParams has a new optional parameter requestOptions
  - Interface OperationsListOptionalParams has a new optional parameter tracingOptions
  - Interface OperationsListOptionalParams has a new optional parameter onResponse
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface PrivateEndpointConnectionsGetOptionalParams has a new optional parameter abortSignal
  - Interface PrivateEndpointConnectionsGetOptionalParams has a new optional parameter requestOptions
  - Interface PrivateEndpointConnectionsGetOptionalParams has a new optional parameter tracingOptions
  - Interface PrivateEndpointConnectionsGetOptionalParams has a new optional parameter onResponse
  - Interface PrivateEndpointConnectionsListOptionalParams has a new optional parameter abortSignal
  - Interface PrivateEndpointConnectionsListOptionalParams has a new optional parameter requestOptions
  - Interface PrivateEndpointConnectionsListOptionalParams has a new optional parameter tracingOptions
  - Interface PrivateEndpointConnectionsListOptionalParams has a new optional parameter onResponse
  - Interface Resource has a new optional parameter systemData
  - Interface ResourceProviderCommonGetSubscriptionQuotaOptionalParams has a new optional parameter abortSignal
  - Interface ResourceProviderCommonGetSubscriptionQuotaOptionalParams has a new optional parameter requestOptions
  - Interface ResourceProviderCommonGetSubscriptionQuotaOptionalParams has a new optional parameter tracingOptions
  - Interface ResourceProviderCommonGetSubscriptionQuotaOptionalParams has a new optional parameter onResponse
  - Interface RouteProperties has a new optional parameter dataSchema
  - Interface RoutingCosmosDBSqlApiProperties has a new optional parameter messagePayloadFormat
  - Interface RoutingEndpoints has a new optional parameter eventStreams
  - Interface RoutingEventHubProperties has a new optional parameter messagePayloadFormat
  - Interface RoutingServiceBusQueueEndpointProperties has a new optional parameter messagePayloadFormat
  - Interface RoutingServiceBusTopicEndpointProperties has a new optional parameter messagePayloadFormat
  - Interface RoutingStorageContainerProperties has a new optional parameter messagePayloadFormat
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ConnectionProfile
  - Added Type Alias DeviceRegistryIdentityType
  - Added Type Alias DeviceRegistryLinkingState
  - Added Type Alias EventStreamAuthenticationType
  - Added Type Alias GatewayVersion
  - Added Type Alias IpVersion
  - Added Type Alias MessagePayloadFormat
  - Added Enum AzureClouds
  - Added Enum KnownConnectionProfile
  - Added Enum KnownDeviceRegistryIdentityType
  - Added Enum KnownDeviceRegistryLinkingState
  - Added Enum KnownEventStreamAuthenticationType
  - Added Enum KnownGatewayVersion
  - Added Enum KnownIpVersion
  - Added Enum KnownMessagePayloadFormat
  - Added Enum KnownVersions
  - Enum KnownRoutingSource has a new value DigitalTwinChangeEvents
  - Enum KnownRoutingSource has a new value MqttBrokerMessages

### Breaking Changes
  - Removed Interface CertificateBodyDescription
  - Removed Interface IotHubResourceGetEndpointHealthOptionalParams
  - Removed Interface IotHubResourceGetQuotaMetricsOptionalParams
  - Removed Interface IotHubResourceGetValidSkusOptionalParams
  - Removed Interface PrivateLinkResourcesGetOptionalParams
  - Removed Interface PrivateLinkResourcesListOptionalParams
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags

## 7.0.0-beta.3 (2026-07-21)
Compared with version 6.3.0

### Features Added
  - Added operation IotHubOperations.manualFailover
  - Added operation IotHubResourceOperations.createOrUpdate
  - Added operation IotHubResourceOperations.delete
  - Added operation IotHubResourceOperations.update
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added operation PrivateEndpointConnectionsOperations.update
  - Class IotHubClient has a new constructor "constructor(credential: TokenCredential, options?: IotHubClientOptionalParams);"
  - Added Interface DeviceRegistry
  - Added Interface EncryptionPropertiesDescription
  - Added Interface IotHubDetails
  - Added Interface IotHubPropertiesDeviceStreams
  - Added Interface IotHubResourceListEndpointHealthOptionalParams
  - Added Interface IotHubResourceListQuotaMetricsOptionalParams
  - Added Interface IotHubResourceListValidSkusOptionalParams
  - Added Interface KeyVaultKeyProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateLinkResourcesOperationsGetOptionalParams
  - Added Interface PrivateLinkResourcesOperationsListOptionalParams
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface RootCertificateProperties
  - Added Interface RoutingEventStreamProperties
  - Added Interface SimplePollerLike
  - Added Interface TrackedResource
  - Interface CertificateDescription has a new optional parameter systemData
  - Interface CertificateProperties has a new optional parameter policyResourceId
  - Interface CertificatePropertiesWithNonce has a new optional parameter policyResourceId
  - Interface EventHubConsumerGroupInfo has a new optional parameter systemData
  - Interface IotHubProperties has a new optional parameter deviceHostName
  - Interface IotHubProperties has a new optional parameter deviceRegistry
  - Interface IotHubProperties has a new optional parameter deviceStreams
  - Interface IotHubProperties has a new optional parameter encryption
  - Interface IotHubProperties has a new optional parameter iotHubDetails
  - Interface IotHubProperties has a new optional parameter ipVersion
  - Interface IotHubProperties has a new optional parameter rootCertificate
  - Interface IotHubProperties has a new optional parameter serviceHostName
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface RoutingEndpoints has a new optional parameter eventStreams
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias EventStreamAuthenticationType
  - Added Type Alias GatewayVersion
  - Added Type Alias IpVersion
  - Added Enum AzureClouds
  - Added Enum KnownEventStreamAuthenticationType
  - Added Enum KnownGatewayVersion
  - Added Enum KnownIpVersion
  - Added Enum KnownVersions
  - Enum KnownRoutingSource has a new value DigitalTwinChangeEvents
  - Enum KnownRoutingSource has a new value MqttBrokerMessages

### Breaking Changes
  - Removed Interface CertificateBodyDescription
  - Removed Interface IotHubResourceGetEndpointHealthOptionalParams
  - Removed Interface IotHubResourceGetQuotaMetricsOptionalParams
  - Removed Interface IotHubResourceGetValidSkusOptionalParams
  - Removed Interface PrivateLinkResourcesGetOptionalParams
  - Removed Interface PrivateLinkResourcesListOptionalParams
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags

## 7.0.0-beta.2 (2026-06-08)
Compared with version 6.3.0

### Features Added
  - Added operation IotHubOperations.manualFailover
  - Added operation IotHubResourceOperations.createOrUpdate
  - Added operation IotHubResourceOperations.delete
  - Added operation IotHubResourceOperations.update
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added operation PrivateEndpointConnectionsOperations.update
  - Class IotHubClient has a new constructor "constructor(credential: TokenCredential, options?: IotHubClientOptionalParams);"
  - Added Interface DeviceRegistry
  - Added Interface EncryptionPropertiesDescription
  - Added Interface IotHubDetails
  - Added Interface IotHubPropertiesDeviceStreams
  - Added Interface IotHubResourceListEndpointHealthOptionalParams
  - Added Interface IotHubResourceListQuotaMetricsOptionalParams
  - Added Interface IotHubResourceListValidSkusOptionalParams
  - Added Interface KeyVaultKeyProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateLinkResourcesOperationsGetOptionalParams
  - Added Interface PrivateLinkResourcesOperationsListOptionalParams
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface RootCertificateProperties
  - Added Interface SimplePollerLike
  - Added Interface TrackedResource
  - Interface CertificateDescription has a new optional parameter systemData
  - Interface CertificateProperties has a new optional parameter policyResourceId
  - Interface CertificatePropertiesWithNonce has a new optional parameter policyResourceId
  - Interface EventHubConsumerGroupInfo has a new optional parameter systemData
  - Interface IotHubProperties has a new optional parameter deviceHostName
  - Interface IotHubProperties has a new optional parameter deviceRegistry
  - Interface IotHubProperties has a new optional parameter deviceStreams
  - Interface IotHubProperties has a new optional parameter encryption
  - Interface IotHubProperties has a new optional parameter iotHubDetails
  - Interface IotHubProperties has a new optional parameter ipVersion
  - Interface IotHubProperties has a new optional parameter rootCertificate
  - Interface IotHubProperties has a new optional parameter serviceHostName
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias GatewayVersion
  - Added Type Alias IpVersion
  - Added Enum AzureClouds
  - Added Enum KnownGatewayVersion
  - Added Enum KnownIpVersion
  - Added Enum KnownVersions
  - Enum KnownIotHubSku has a new value GEN2
  - Enum KnownRoutingSource has a new value DigitalTwinChangeEvents
  - Enum KnownRoutingSource has a new value MqttBrokerMessages

### Breaking Changes
  - Operation IotHubResource.beginCreateOrUpdate has a new signature
  - Operation IotHubResource.beginCreateOrUpdateAndWait has a new signature
  - Operation IotHubResource.beginDeleteAndWait has a new signature
  - Operation IotHubResource.beginUpdateAndWait has a new signature
  - Operation IotHubResource.get has a new signature
  - Removed Interface CertificateBodyDescription
  - Removed Interface IotHubResourceGetEndpointHealthOptionalParams
  - Removed Interface IotHubResourceGetQuotaMetricsOptionalParams
  - Removed Interface IotHubResourceGetValidSkusOptionalParams
  - Removed Interface PrivateLinkResourcesGetOptionalParams
  - Removed Interface PrivateLinkResourcesListOptionalParams
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Type alias "IotHubSkuTier" has been changed

## 7.0.0-beta.1 (2025-11-06)
Compared with version 6.3.0

### Features Added
  - Added Interface DeviceRegistry
  - Added Interface EncryptionPropertiesDescription
  - Added Interface IotHubPropertiesDeviceStreams
  - Added Interface IotHubResourceCreateOrUpdateHeaders
  - Added Interface IotHubResourceUpdateHeaders
  - Added Interface KeyVaultKeyProperties
  - Added Interface PrivateEndpointConnectionsUpdateHeaders
  - Added Interface RootCertificateProperties
  - Interface CertificateProperties has a new optional parameter policyResourceId
  - Interface CertificatePropertiesWithNonce has a new optional parameter policyResourceId
  - Interface IotHubProperties has a new optional parameter deviceRegistry
  - Interface IotHubProperties has a new optional parameter deviceStreams
  - Interface IotHubProperties has a new optional parameter encryption
  - Interface IotHubProperties has a new optional parameter ipVersion
  - Interface IotHubProperties has a new optional parameter rootCertificate
  - Added Type Alias IpVersion
  - Added Enum KnownIpVersion
  - Enum KnownIotHubSku has a new value GEN2
  - Enum KnownRoutingSource has a new value DigitalTwinChangeEvents
  - Enum KnownRoutingSource has a new value MqttBrokerMessages

### Breaking Changes
  - Operation IotHubResource.beginCreateOrUpdate has a new signature
  - Operation IotHubResource.beginCreateOrUpdateAndWait has a new signature
  - Operation IotHubResource.beginDeleteAndWait has a new signature
  - Operation IotHubResource.beginUpdateAndWait has a new signature
  - Operation IotHubResource.get has a new signature
  - Type alias "IotHubResourceUpdateResponse" has been changed
  - Type alias "IotHubSkuTier" has been changed

    
## 6.3.0 (2023-09-15)
    
### Features Added

  - Added Interface IotHubManualFailoverHeaders
  - Added Interface IotHubResourceDeleteHeaders
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface RoutingCosmosDBSqlApiProperties
  - Interface RoutingEndpoints has a new optional parameter cosmosDBSqlContainers
  - Added function getContinuationToken
    
    
## 6.2.0 (2022-08-18)
    
### Features Added

  - Added Interface IotHubDescription
    
## 6.1.2 (2022-06-14)

### Features Added

  - Bug fix
    
## 6.1.1 (2022-04-14)
    
### Features Added

  - Bug fix
    
## 6.1.0 (2022-02-15)
    
### Features Added

  - Added Interface SystemData
  - Added Type Alias CreatedByType
  - Interface IotHubProperties has a new optional parameter enableDataResidency
  - Type Alias IotHubDescription has a new parameter systemData
  - Added Enum KnownCreatedByType
    
    
## 6.0.0 (2021-12-17)

The package of @azure/arm-iothub is using our next generation design principles since version 6.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

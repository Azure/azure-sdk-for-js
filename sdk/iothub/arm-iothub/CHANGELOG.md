# Release History

## 7.0.0-beta.3 (2026-06-24)
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
  - Class IotHubClient no longer has parameter apiVersion
  - Class IotHubClient no longer has parameter subscriptionId
  - Removed Interface CertificateBodyDescription
  - Removed Interface IotHubResourceGetEndpointHealthOptionalParams
  - Removed Interface IotHubResourceGetQuotaMetricsOptionalParams
  - Removed Interface IotHubResourceGetValidSkusOptionalParams
  - Removed Interface PrivateLinkResourcesGetOptionalParams
  - Removed Interface PrivateLinkResourcesListOptionalParams
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Type alias "IotHubSkuTier" has been changed


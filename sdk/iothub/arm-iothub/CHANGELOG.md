# Release History

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

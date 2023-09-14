# Release History

## 6.3.0-beta.3 (2023-09-13)

**Features**

- Added Interface EncryptionPropertiesDescription
- Added Interface IotHubManualFailoverHeaders
- Added Interface IotHubPropertiesDeviceStreams
- Added Interface IotHubResourceCreateOrUpdateHeaders
- Added Interface IotHubResourceDeleteHeaders
- Added Interface IotHubResourceUpdateHeaders
- Added Interface KeyVaultKeyProperties
- Added Interface PrivateEndpointConnectionsDeleteHeaders
- Added Interface PrivateEndpointConnectionsUpdateHeaders
- Added Interface RootCertificateProperties
- Added Interface RoutingCosmosDBSqlApiProperties
- Added Type Alias IpVersion
- Interface IotHubProperties has a new optional parameter deviceStreams
- Interface IotHubProperties has a new optional parameter encryption
- Interface IotHubProperties has a new optional parameter ipVersion
- Interface IotHubProperties has a new optional parameter rootCertificate
- Interface RoutingEndpoints has a new optional parameter cosmosDBSqlContainers
- Add parameters of IotHubResourceUpdateHeaders to TypeAlias IotHubResourceUpdateResponse
- Added Enum KnownIpVersion
- Enum KnownRoutingSource has a new value DigitalTwinChangeEvents
- Enum KnownRoutingSource has a new value MqttBrokerMessages
- Added function getContinuationToken

## 6.3.0-beta.2 (2023-04-06)

**Features**

- Added Interface EncryptionPropertiesDescription
- Added Interface IotHubManualFailoverHeaders
- Added Interface IotHubPropertiesDeviceStreams
- Added Interface IotHubResourceCreateOrUpdateHeaders
- Added Interface IotHubResourceDeleteHeaders
- Added Interface IotHubResourceUpdateHeaders
- Added Interface KeyVaultKeyProperties
- Added Interface PrivateEndpointConnectionsDeleteHeaders
- Added Interface PrivateEndpointConnectionsUpdateHeaders
- Added Interface RootCertificateProperties
- Added Interface RoutingCosmosDBSqlApiProperties
- Added Type Alias IpVersion
- Interface IotHubProperties has a new optional parameter deviceStreams
- Interface IotHubProperties has a new optional parameter encryption
- Interface IotHubProperties has a new optional parameter ipVersion
- Interface IotHubProperties has a new optional parameter rootCertificate
- Interface RoutingEndpoints has a new optional parameter cosmosDBSqlCollections
- Add parameters of IotHubResourceUpdateHeaders to TypeAlias IotHubResourceUpdateResponse
- Added Enum KnownIpVersion
- Enum KnownRoutingSource has a new value DigitalTwinChangeEvents
- Enum KnownRoutingSource has a new value MqttBrokerMessages
- Added function getContinuationToken

## 6.3.0-beta.1 (2022-12-06)

**Features**

- Added Interface EncryptionPropertiesDescription
- Added Interface IotHubPropertiesDeviceStreams
- Added Interface IotHubResourceCreateOrUpdateHeaders
- Added Interface IotHubResourceDeleteHeaders
- Added Interface IotHubResourceUpdateHeaders
- Added Interface KeyVaultKeyProperties
- Added Interface PrivateEndpointConnectionsDeleteHeaders
- Added Interface PrivateEndpointConnectionsUpdateHeaders
- Added Interface RootCertificateProperties
- Added Interface RoutingCosmosDBSqlApiProperties
- Interface IotHubProperties has a new optional parameter deviceStreams
- Interface IotHubProperties has a new optional parameter encryption
- Interface IotHubProperties has a new optional parameter rootCertificate
- Interface RoutingEndpoints has a new optional parameter cosmosDBSqlCollections
- Add parameters of IotHubResourceUpdateHeaders to TypeAlias IotHubResourceUpdateResponse
- Enum KnownRoutingSource has a new value DigitalTwinChangeEvents
- Enum KnownRoutingSource has a new value MqttBrokerMessages

## 6.2.0 (2022-08-18)

**Features**

- Added Interface IotHubDescription

## 6.1.2 (2022-06-14)

**Features**

- Bug fix

## 6.1.1 (2022-04-14)

**Features**

- Bug fix

## 6.1.0 (2022-02-15)

**Features**

- Added Interface SystemData
- Added Type Alias CreatedByType
- Interface IotHubProperties has a new optional parameter enableDataResidency
- Type Alias IotHubDescription has a new parameter systemData
- Added Enum KnownCreatedByType

## 6.0.0 (2021-12-17)

The package of @azure/arm-iothub is using our next generation design principles since version 6.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

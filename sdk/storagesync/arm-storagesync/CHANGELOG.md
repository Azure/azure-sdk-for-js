# Release History
    
## 10.0.0 (2022-09-19)
    
**Features**

  - Added operation CloudEndpoints.afsShareMetadataCertificatePublicKeys
  - Added Interface CloudEndpoint
  - Added Interface CloudEndpointAfsShareMetadataCertificatePublicKeys
  - Added Interface CloudEndpointCreateParameters
  - Added Interface CloudEndpointsAfsShareMetadataCertificatePublicKeysHeaders
  - Added Interface CloudEndpointsAfsShareMetadataCertificatePublicKeysOptionalParams
  - Added Interface CloudTieringLowDiskMode
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface RegisteredServer
  - Added Interface RegisteredServerCreateParameters
  - Added Interface ServerEndpoint
  - Added Interface ServerEndpointCreateParameters
  - Added Interface StorageSyncService
  - Added Interface SyncGroup
  - Added Interface SyncGroupCreateParameters
  - Added Interface SystemData
  - Added Interface TrackedResource
  - Added Interface Workflow
  - Added Type Alias CloudEndpointsAfsShareMetadataCertificatePublicKeysResponse
  - Added Type Alias CloudTieringLowDiskModeState
  - Added Type Alias CreatedByType
  - Interface OperationResourceMetricSpecification has a new optional parameter supportedAggregationTypes
  - Interface Resource has a new optional parameter systemData
  - Interface ServerEndpointCloudTieringStatus has a new optional parameter lowDiskMode
  - Interface StorageSyncApiError has a new optional parameter innererror
  - Added Enum KnownCloudTieringLowDiskModeState
  - Added Enum KnownCreatedByType

**Breaking Changes**

  - Interface StorageSyncApiError no longer has parameter innerError
    
## 9.0.1 (2022-05-01)

**Features**

  - Bug fix
    
## 9.0.0 (2022-01-21)

The package of @azure/arm-storagesync is using our next generation design principles since version 9.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

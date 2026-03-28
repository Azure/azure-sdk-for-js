# Release History

## 2.2.0-beta.1 (2026-03-24)
Compared with version 2.1.0

### Features Added
  - Added operation group RpUnbilledPrefixesOperations
  - Added operation RegisteredPrefixesOperations.validate
  - Added Interface CdnPeeringPrefixProperties
  - Added Interface ConnectionMonitorTestProperties
  - Added Interface ConnectivityProbe
  - Added Interface ErrorAdditionalInfo
  - Added Interface OperationProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PeerAsnProperties
  - Added Interface PeeringLocationProperties
  - Added Interface PeeringProperties
  - Added Interface PeeringRegisteredAsnProperties
  - Added Interface PeeringRegisteredPrefixProperties
  - Added Interface PeeringServiceLocationProperties
  - Added Interface PeeringServicePrefixProperties
  - Added Interface PeeringServiceProperties
  - Added Interface PeeringServiceProviderProperties
  - Added Interface ProxyResource
  - Added Interface RegisteredPrefixesValidateOptionalParams
  - Added Interface RpUnbilledPrefix
  - Added Interface RpUnbilledPrefixesListOptionalParams
  - Added Interface SystemData
  - Added Interface TrackedResource
  - Interface CdnPeeringPrefix has a new optional parameter systemData
  - Interface ConnectionMonitorTest has a new optional parameter systemData
  - Interface ErrorDetail has a new optional parameter additionalInfo
  - Interface ErrorDetail has a new optional parameter details
  - Interface ErrorDetail has a new optional parameter target
  - Interface LegacyPeeringsListOptionalParams has a new optional parameter directPeeringType
  - Interface PeerAsn has a new optional parameter systemData
  - Interface Peering has a new optional parameter connectivityProbes
  - Interface Peering has a new optional parameter systemData
  - Interface PeeringLocation has a new optional parameter systemData
  - Interface PeeringRegisteredAsn has a new optional parameter systemData
  - Interface PeeringRegisteredPrefix has a new optional parameter systemData
  - Interface PeeringService has a new optional parameter systemData
  - Interface PeeringServiceCountry has a new optional parameter systemData
  - Interface PeeringServiceLocation has a new optional parameter systemData
  - Interface PeeringServicePrefix has a new optional parameter systemData
  - Interface PeeringServiceProvider has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias Protocol
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownProtocol
  - Added Enum KnownVersions
  - Enum KnownConnectionState has a new value ExternalBlocker
  - Enum KnownConnectionState has a new value TypeChangeInProgress
  - Enum KnownConnectionState has a new value TypeChangeRequested
  - Enum KnownDirectPeeringType has a new value EdgeZoneForOperators
  - Enum KnownDirectPeeringType has a new value PeerProp
  - Enum KnownPeeringLocationsDirectPeeringType has a new value EdgeZoneForOperators
  - Enum KnownPeeringLocationsDirectPeeringType has a new value PeerProp
  - Enum KnownProvisioningState has a new value Canceled

    
## 2.1.0 (2022-12-02)
    
### Features Added

  - Added Interface CdnPeeringPrefix
  - Added Interface ConnectionMonitorTest
  - Added Interface PeerAsn
  - Added Interface Peering
  - Added Interface PeeringLocation
  - Added Interface PeeringRegisteredAsn
  - Added Interface PeeringRegisteredPrefix
  - Added Interface PeeringService
  - Added Interface PeeringServiceCountry
  - Added Interface PeeringServiceLocation
  - Added Interface PeeringServicePrefix
  - Added Interface PeeringServiceProvider
    
## 2.0.1 (2022-04-27)

### Features Added

  - Bug fix
    
## 2.0.0 (2022-01-20)

The package of @azure/arm-peering is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

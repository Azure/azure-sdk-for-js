# Release History
    
## 2.1.0 (2022-08-09)
    
**Features**

  - Added operation RegisteredPrefixes.validate
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
  - Added Interface RegisteredPrefixesValidateOptionalParams
  - Added Type Alias RegisteredPrefixesValidateResponse
  - Interface LegacyPeeringsListNextOptionalParams has a new optional parameter directPeeringType
  - Interface LegacyPeeringsListOptionalParams has a new optional parameter directPeeringType
  - Enum KnownConnectionState has a new value TypeChangeInProgress
  - Enum KnownConnectionState has a new value TypeChangeRequested
  - Enum KnownDirectPeeringType has a new value EdgeZoneForOperators
  - Enum KnownPeeringLocationsDirectPeeringType has a new value EdgeZoneForOperators
    
## 2.0.1 (2022-04-27)

**Features**

  - Bug fix
    
## 2.0.0 (2022-01-20)

The package of @azure/arm-peering is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

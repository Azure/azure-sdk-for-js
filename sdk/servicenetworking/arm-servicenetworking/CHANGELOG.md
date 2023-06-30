# Release History

## 1.0.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.2 (2023-05-15)
    
**Features**

  - Added Interface AssociationSubnetUpdate
  - Added Interface ResourceId
  - Added Type Alias AssociationType
  - Interface AssociationUpdate has a new optional parameter associationType
  - Interface AssociationUpdate has a new optional parameter subnet
  - Interface Frontend has a new optional parameter fqdn
  - Added Enum KnownAssociationType

**Breaking Changes**

  - Interface AssociationUpdate no longer has parameter properties
  - Interface Frontend no longer has parameter ipAddressVersion
  - Interface Frontend no longer has parameter mode
  - Interface Frontend no longer has parameter publicIPAddress
  - Interface FrontendUpdate no longer has parameter properties
  - Interface TrafficControllerUpdate no longer has parameter properties
  - Type of parameter associationType of interface Association is changed from "subnets" to AssociationType
  - Type of parameter associations of interface TrafficController is changed from ResourceID[] to ResourceId[]
  - Type of parameter frontends of interface TrafficController is changed from ResourceID[] to ResourceId[]
    
    
## 1.0.0-beta.1 (2022-12-23)

The package of @azure/arm-servicenetworking is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

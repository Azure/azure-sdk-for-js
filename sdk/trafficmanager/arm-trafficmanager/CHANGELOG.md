# Release History

## 7.0.0-beta.1 (2026-04-14)
Compared with version 6.1.0

### Features Added
  - Added operation EndpointsOperations.updateV2
  - Added operation ProfilesOperations.updateV2
  - Added Interface EndpointProperties
  - Added Interface EndpointsUpdateV2OptionalParams
  - Added Interface EndpointUpdate
  - Added Interface GeographicHierarchyProperties
  - Added Interface HeatMapProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProfileProperties
  - Added Interface ProfilePropertiesUpdate
  - Added Interface ProfilesUpdateV2OptionalParams
  - Added Interface ProfileUpdate
  - Added Interface UserMetricsProperties
  - Interface Profile has a new optional parameter recordType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias HeatMapType
  - Added Type Alias RecordType
  - Added Enum AzureClouds
  - Added Enum KnownRecordType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation Endpoints.update
  - Removed operation Profiles.update
  - Operation HeatMap.get has a new signature
  - Removed Interface EndpointsUpdateOptionalParams
  - Removed Interface ProfilesUpdateOptionalParams

    
## 6.1.0 (2023-06-02)
    
### Features Added

  - Added operation Profiles.checkTrafficManagerNameAvailabilityV2
  - Added Interface Endpoint
  - Added Interface HeatMapModel
  - Added Interface Profile
  - Added Interface ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams
  - Added Interface ProxyResource
  - Added Interface TrackedResource
  - Added Interface TrafficManagerGeographicHierarchy
  - Added Interface UserMetricsModel
  - Added Type Alias AlwaysServe
  - Added Type Alias ProfilesCheckTrafficManagerNameAvailabilityV2Response
  - Added Enum KnownAlwaysServe
  - Enum KnownEndpointMonitorStatus has a new value Unmonitored
  - Added function getContinuationToken
    
## 6.0.1 (2022-05-05)

### Features Added

  - Bug fix
 
## 6.0.0 (2022-01-21)

The package of @azure/arm-trafficmanager is using our next generation design principles since version 6.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

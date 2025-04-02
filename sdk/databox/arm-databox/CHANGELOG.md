# Release History
    
## 5.1.0 (2025-03-17)
    
### Features Added

  - Added Interface DeviceCapabilityDetails
  - Added Interface DeviceCapabilityRequest
  - Added Interface DeviceCapabilityResponse
  - Added Interface JobDelayDetails
  - Added Type Alias DelayNotificationStatus
  - Added Type Alias ModelName
  - Added Type Alias PortalDelayErrorCode
  - Interface CreateOrderLimitForSubscriptionValidationRequest has a new optional parameter model
  - Interface DatacenterAddressRequest has a new optional parameter model
  - Interface DataTransferDetailsValidationRequest has a new optional parameter model
  - Interface JobResource has a new optional parameter allDevicesLost
  - Interface JobResource has a new optional parameter delayedStage
  - Interface JobStages has a new optional parameter delayInformation
  - Interface PreferencesValidationRequest has a new optional parameter model
  - Interface RegionConfigurationRequest has a new optional parameter deviceCapabilityRequest
  - Interface RegionConfigurationResponse has a new optional parameter deviceCapabilityResponse
  - Interface ScheduleAvailabilityRequest has a new optional parameter model
  - Interface Sku has a new optional parameter model
  - Interface SkuAvailabilityValidationRequest has a new optional parameter model
  - Interface SkuCapacity has a new optional parameter individualSkuUsable
  - Interface TransportAvailabilityRequest has a new optional parameter model
  - Interface ValidateAddress has a new optional parameter model
  - Added Enum KnownDelayNotificationStatus
  - Added Enum KnownPortalDelayErrorCode
  - Enum KnownDataCenterCode has a new value AMS25
  - Enum KnownDataCenterCode has a new value BL24
  - Enum KnownDataCenterCode has a new value CPQ21
  - Enum KnownDataCenterCode has a new value DSM11
  - Enum KnownDataCenterCode has a new value DXB23
  - Enum KnownDataCenterCode has a new value IDC5
  - Enum KnownDataCenterCode has a new value NTG20
  - Enum KnownDataCenterCode has a new value OSA23
  - Enum KnownDataCenterCode has a new value TYO23
    
    
## 5.0.0 (2023-05-10)

The package of @azure/arm-databox is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

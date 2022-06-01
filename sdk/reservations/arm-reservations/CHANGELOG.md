# Release History
    
## 7.1.0 (2022-04-20)
    
**Features**

  - Interface CurrentQuotaLimit has a new optional parameter id
  - Interface CurrentQuotaLimit has a new optional parameter name
  - Interface CurrentQuotaLimit has a new optional parameter type
  - Interface CurrentQuotaLimitBase has a new optional parameter id
  - Interface CurrentQuotaLimitBase has a new optional parameter name
  - Interface CurrentQuotaLimitBase has a new optional parameter type
  - Interface GetCatalogOptionalParams has a new optional parameter offerId
  - Interface GetCatalogOptionalParams has a new optional parameter planId
  - Interface GetCatalogOptionalParams has a new optional parameter publisherId
  - Interface QuotaRequestOneResourceSubmitResponse has a new optional parameter idPropertiesId
  - Interface QuotaRequestOneResourceSubmitResponse has a new optional parameter namePropertiesName
  - Interface QuotaRequestOneResourceSubmitResponse has a new optional parameter typePropertiesType
  - Interface ReservationOrderResponse has a new optional parameter benefitStartTime
  - Interface ReservationsProperties has a new optional parameter benefitStartTime
  - Interface ReservationSummary has a new optional parameter processingCount
  - Enum KnownDisplayProvisioningState has a new value Processing
  - Enum KnownReservationStatusCode has a new value Processing
  - Enum KnownReservedResourceType has a new value VirtualMachineSoftware
    
    
## 7.0.0 (2022-01-21)

The package of @azure/arm-reservations is using our next generation design principles since version 7.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

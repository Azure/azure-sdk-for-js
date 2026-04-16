# Release History

## 2.0.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.1 (2025-08-22)

### Other Changes

  - Other fixes

## 2.0.0 (2023-03-08)
    
### Features Added

  - Added Interface ContactProfileThirdPartyConfiguration
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Type Alias ContactsStatus
  - Interface ContactProfile has a new optional parameter thirdPartyConfigurations
  - Interface ContactProfilesCreateOrUpdateOptionalParams has a new optional parameter thirdPartyConfigurations
  - Interface ContactProfilesProperties has a new optional parameter thirdPartyConfigurations
  - Interface OperationResult has a new optional parameter nextLink
  - Interface OperationResult has a new optional parameter value
  - Added Enum KnownContactsStatus
  - Added Enum KnownStatus

### Breaking Changes

  - Removed operation AvailableGroundStations.get
  - Operation ContactProfiles.beginCreateOrUpdate has a new signature
  - Operation ContactProfiles.beginCreateOrUpdateAndWait has a new signature
  - Operation Spacecrafts.beginCreateOrUpdate has a new signature
  - Operation Spacecrafts.beginCreateOrUpdateAndWait has a new signature
  - Interface Contact no longer has parameter etag
  - Interface ContactProfile no longer has parameter etag
  - Interface ContactProfilesCreateOrUpdateOptionalParams no longer has parameter links
  - Interface ContactProfilesCreateOrUpdateOptionalParams no longer has parameter networkConfiguration
  - Interface Spacecraft no longer has parameter etag
  - Interface SpacecraftsCreateOrUpdateOptionalParams no longer has parameter links
  - Interface SpacecraftsCreateOrUpdateOptionalParams no longer has parameter titleLine
  - Interface SpacecraftsCreateOrUpdateOptionalParams no longer has parameter tleLine1
  - Interface SpacecraftsCreateOrUpdateOptionalParams no longer has parameter tleLine2
  - Parameter expirationDate of interface AuthorizedGroundstation is now required
  - Parameter groundStation of interface AuthorizedGroundstation is now required
  - Parameter contactProfile of interface Contact is now required
  - Parameter groundStationName of interface Contact is now required
  - Parameter reservationEndTime of interface Contact is now required
  - Parameter reservationStartTime of interface Contact is now required
  - Parameter links of interface ContactProfile is now required
  - Parameter networkConfiguration of interface ContactProfile is now required
  - Parameter id of interface ResourceReference is now required
  - Parameter links of interface Spacecraft is now required
  - Parameter titleLine of interface Spacecraft is now required
  - Parameter tleLine1 of interface Spacecraft is now required
  - Parameter tleLine2 of interface Spacecraft is now required
  - Type of parameter status of interface Contact is changed from Status to ContactsStatus
  - Removed Enum KnownApiVersionParameter
    
    
## 1.2.0 (2023-01-30)
    
### Features Added

  - Interface ContactProfilesListBySubscriptionNextOptionalParams no longer has parameter skiptoken
  - Interface ContactProfilesListNextOptionalParams no longer has parameter skiptoken
  - Interface ContactsListNextOptionalParams no longer has parameter skiptoken
  - Interface SpacecraftsListBySubscriptionNextOptionalParams no longer has parameter skiptoken
  - Interface SpacecraftsListNextOptionalParams no longer has parameter skiptoken
    
    
## 1.1.0 (2022-07-11)
    
### Features Added

  - Added Interface AvailableContactsProperties
  - Added Interface AvailableContactsSpacecraft
  - Added Interface AvailableGroundStationProperties
  - Added Interface Contact
  - Added Interface ContactParametersContactProfile
  - Added Interface ContactProfile
  - Added Interface ContactProfileProperties
  - Added Interface ContactsPropertiesContactProfile
  - Added Interface ProxyResource
  - Added Interface Spacecraft
  - Added Interface TrackedResource
    
    
## 1.0.0 (2022-06-02)

The package of @azure/arm-orbital is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).

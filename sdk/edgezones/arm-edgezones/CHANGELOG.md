# Release History

## 1.0.0-beta.5 (2026-03-04)
Compared with version 1.0.0-beta.3

### Features Added
  - Interface EdgeZonesClientOptionalParams has a new optional parameter cloudSetting
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownProvisioningState
  - Added Enum KnownVersions
  - Enum KnownOrigin has a new value System
  - Enum KnownOrigin has a new value User
  - Enum KnownOrigin has a new value UserSystem

### Breaking Changes
  - Removed Type Alias ResourceProvisioningState
  - Removed Enum KnownResourceProvisioningState
  - Enum KnownOrigin no longer has value "user,system"
  - Enum KnownOrigin no longer has value system
  - Enum KnownOrigin no longer has value user

    
## 1.0.0-beta.3 (2024-11-07)

### Bugs Fixed

- Fix missing package information issue in user agent

## 1.0.0-beta.2 (2024-07-26)

### Features Added

- disable hierarchy api subpath export and issue fix.

## 1.0.0-beta.1 (2024-07-09)

### Features Added

Initial release of the Azure Edgezones package

# Release History

## 1.0.1 (2024-09-09)

### Features Added
- refresh @azure-rest/iot-device-update sdk

## 1.0.0 (2022-09-09)

### Features Added
- Added filter to `listDeviceClasses` method
- Updated description for some methods to be more descriptive and less ambiguous

### Other Changes
- Removed filter from `listBestUpdatesForGroup` method

## 1.0.0-beta.2 (2022-07-08)

### Features Added

- Added `relatedFiles` and `downloadHandler` to `Update`
- Updated various model that reference update to include not only `updateId` but also update `description` and `friendlyName`
- Removed device tag concept
- Allow to filter by deployment status in the `listDevices` method
- Added ability to update device class friendly name
- Added ability to delete device class
- Added device class subgroups to groups
- Added new method to retrieve devices health information

## 1.0.0-beta.1 (2022-01-21)

  - Initial Release

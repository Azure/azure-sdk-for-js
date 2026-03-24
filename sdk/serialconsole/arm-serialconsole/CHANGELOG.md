# Release History

## 3.0.0-beta.1 (2026-03-24)
Compared with version 2.1.0

### Features Added
  - Added operation group SerialConsoleOperationGroupOperations
  - Added Interface DisableSerialConsoleResultProperties
  - Added Interface EnableSerialConsoleResultProperties
  - Added Interface SerialConsoleOperationGroupDisableConsoleOptionalParams
  - Added Interface SerialConsoleOperationGroupEnableConsoleOptionalParams
  - Added Interface SerialConsoleStatusProperties
  - Added Interface SerialPortProperties
  - Added Interface SystemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface SerialConsoleStatus has a new optional parameter properties
  - Interface SerialPort has a new optional parameter connectionState
  - Interface SerialPort has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias SerialPortConnectionState
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation SerialPorts.delete
  - Removed Interface DisableConsoleOptionalParams
  - Removed Interface EnableConsoleOptionalParams
  - Removed Interface SerialPortsDeleteOptionalParams
  - Interface SerialConsoleStatus no longer has parameter disabled

    
## 2.1.0 (2022-12-09)
    
### Features Added

  - Added Interface ProxyResource
  - Added Interface SerialPort
    
## 2.0.1 (2022-05-01)

### Features Added

  - Bug fix
    
## 2.0.0 (2022-01-21)

The package of @azure/arm-serialconsole is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

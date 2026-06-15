# Release History

## 3.0.0 (2026-06-15)

### Features Added
  - Added Interface DisableSerialConsoleResultProperties
  - Added Interface EnableSerialConsoleResultProperties
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
  - Removed Interface SerialPortsDeleteOptionalParams
  - Interface SerialConsoleStatus no longer has parameter disabled


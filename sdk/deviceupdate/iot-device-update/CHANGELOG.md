# Release History

## 1.1.0 (2026-08-05)

### Features Added

- Initial stable release of the Azure Device Update for IoT Hub client library
  for JavaScript, generated from TypeSpec.
- Added support for API version `2026-06-01`, including the new optional
  `downloadSecurity` property on `Deployment` so callers can choose the protocol
  the device should use when downloading update payload (defaults to `"https"`).

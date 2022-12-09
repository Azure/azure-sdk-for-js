# Release History

## 2.1.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.1.0-beta.2 (2022-11-28)
    
**Features**

  - Added Interface Action
  - Added Interface Key
  - Added Interface KeyReleasePolicy
  - Added Interface KeyRotationPolicyAttributes
  - Added Interface LifetimeAction
  - Added Interface ManagedHsm
  - Added Interface ManagedHsmsUpdateHeaders
  - Added Interface MhsmPrivateEndpointConnection
  - Added Interface MhsmPrivateLinkResource
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface RotationPolicy
  - Added Interface Secret
  - Added Interface SecretAttributes
  - Added Interface Trigger
  - Added Type Alias KeyRotationPolicyActionType
  - Interface KeyProperties has a new optional parameter releasePolicy
  - Interface KeyProperties has a new optional parameter rotationPolicy
  - Interface MhsmPrivateEndpointConnectionItem has a new optional parameter etag
  - Interface MhsmPrivateEndpointConnectionItem has a new optional parameter id
  - Enum KnownJsonWebKeyOperation has a new value Release
  - Enum KnownKeyPermissions has a new value Getrotationpolicy
  - Enum KnownKeyPermissions has a new value Release
  - Enum KnownKeyPermissions has a new value Rotate
  - Enum KnownKeyPermissions has a new value Setrotationpolicy
    
    
## 2.0.0 (2022-01-17)

The package of @azure/arm-keyvault is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

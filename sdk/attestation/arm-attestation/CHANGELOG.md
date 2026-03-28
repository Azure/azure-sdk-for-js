# Release History

## 3.0.0-beta.1 (2026-03-24)
Compared with version 2.1.0

### Features Added
  - Added operation group PrivateLinkResourcesOperations
  - Added Interface AttestationServicePatchSpecificParams
  - Added Interface JsonWebKey
  - Added Interface LogSpecification
  - Added Interface OperationProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResource
  - Added Interface PrivateLinkResourceListResult
  - Added Interface PrivateLinkResourceProperties
  - Added Interface PrivateLinkResourcesListByProviderOptionalParams
  - Added Interface ServiceSpecification
  - Added Interface StatusResult
  - Interface AttestationProvider has a new optional parameter publicNetworkAccess
  - Interface AttestationProvider has a new optional parameter tpmAttestationAuthentication
  - Interface AttestationServiceCreationSpecificParams has a new optional parameter publicNetworkAccess
  - Interface AttestationServiceCreationSpecificParams has a new optional parameter tpmAttestationAuthentication
  - Interface AttestationServicePatchParams has a new optional parameter properties
  - Interface OperationsDefinition has a new optional parameter properties
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias PublicNetworkAccessType
  - Added Type Alias TpmAttestationAuthenticationType
  - Added Enum AzureClouds
  - Added Enum KnownPublicNetworkAccessType
  - Added Enum KnownTpmAttestationAuthenticationType
  - Added Enum KnownVersions

### Breaking Changes
  - Operation Operations.list has a new signature
  - Removed Interface JsonWebKey_2
  - Removed Interface OperationList

    
## 2.1.0 (2022-11-16)
    
### Features Added

  - Added Interface AttestationProvider
  - Added Interface PrivateEndpointConnection
  - Added Interface TrackedResource
    
## 2.0.2 (2022-10-08)

### Bugs Fixed

  -  revert credential scopes

## 2.0.1 (2022-09-30)

### Bugs Fixed

  -  fix better user experience of credential scopes in government cloud

## 2.0.0 (2021-12-30)

The package of @azure/arm-attestation is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

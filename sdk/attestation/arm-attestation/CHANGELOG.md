# Release History

## 3.0.0 (2026-06-25)

### Features Added
  - Added operation group PrivateLinkResourcesOperations
  - Class AttestationManagementClient has a new constructor "constructor(credential: TokenCredential, options?: AttestationManagementClientOptionalParams);"
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
  - Class AttestationManagementClient no longer has parameter apiVersion
  - Class AttestationManagementClient no longer has parameter subscriptionId
  - Removed Interface JsonWebKey_2


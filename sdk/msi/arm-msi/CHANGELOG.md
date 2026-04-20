# Release History

## 3.0.0-beta.1 (2026-04-20)
Compared with version 2.2.0

### Features Added
  - Added Interface AssignmentRestrictions
  - Added Interface ClaimsMatchingExpression
  - Added Interface ExtensionResource
  - Added Interface FederatedIdentityCredentialProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface SystemAssignedIdentityProperties
  - Added Interface UserAssignedIdentityProperties
  - Interface FederatedIdentityCredential has a new optional parameter claimsMatchingExpression
  - Interface Identity has a new optional parameter properties
  - Interface IdentityUpdate has a new optional parameter assignmentRestrictions
  - Interface SystemAssignedIdentity has a new optional parameter properties
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Interface Identity no longer has parameter clientId
  - Interface Identity no longer has parameter isolationScope
  - Interface Identity no longer has parameter principalId
  - Interface Identity no longer has parameter tenantId
  - Interface SystemAssignedIdentity no longer has parameter clientId
  - Interface SystemAssignedIdentity no longer has parameter clientSecretUrl
  - Interface SystemAssignedIdentity no longer has parameter principalId
  - Interface SystemAssignedIdentity no longer has parameter tenantId

    
## 2.2.0 (2025-07-09)
    
### Features Added
  - Class ManagedServiceIdentityClient has a new constructor "constructor(credentials: coreAuth.TokenCredential, options?: ManagedServiceIdentityClientOptionalParams);"
  - Interface Identity has a new optional parameter isolationScope
  - Interface IdentityUpdate has a new optional parameter isolationScope
  - Added Type Alias IsolationScope
  - Added Enum KnownIsolationScope

    
    
## 2.1.0 (2023-02-03)
    
### Features Added

  - Added operation group FederatedIdentityCredentials
  - Added Interface FederatedIdentityCredential
  - Added Interface FederatedIdentityCredentialsCreateOrUpdateOptionalParams
  - Added Interface FederatedIdentityCredentialsDeleteOptionalParams
  - Added Interface FederatedIdentityCredentialsGetOptionalParams
  - Added Interface FederatedIdentityCredentialsListNextOptionalParams
  - Added Interface FederatedIdentityCredentialsListOptionalParams
  - Added Interface FederatedIdentityCredentialsListResult
  - Added Interface Identity
  - Added Interface IdentityUpdate
  - Added Interface ProxyResource
  - Added Interface SystemAssignedIdentity
  - Added Interface SystemData
  - Added Interface TrackedResource
  - Added Type Alias CreatedByType
  - Added Type Alias FederatedIdentityCredentialsCreateOrUpdateResponse
  - Added Type Alias FederatedIdentityCredentialsGetResponse
  - Added Type Alias FederatedIdentityCredentialsListNextResponse
  - Added Type Alias FederatedIdentityCredentialsListResponse
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownCreatedByType
  - Added function getContinuationToken
    
    
## 2.0.0 (2021-12-17)

The package of @azure/arm-msi is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

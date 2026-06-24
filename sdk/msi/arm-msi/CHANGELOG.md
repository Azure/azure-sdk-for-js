# Release History

## 3.0.0-beta.1 (2026-06-24)
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
  - Interface Identity has a new optional parameter assignmentRestrictions
  - Interface IdentityUpdate has a new optional parameter assignmentRestrictions
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Class ManagedServiceIdentityClient no longer has parameter apiVersion
  - Class ManagedServiceIdentityClient no longer has parameter subscriptionId


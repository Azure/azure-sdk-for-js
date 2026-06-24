# Release History

## 5.0.0-beta.2 (2026-06-24)
Compared with version 4.1.0

### Features Added
  - Added operation DomainServicesOperations.createOrUpdate
  - Added operation DomainServicesOperations.delete
  - Added operation DomainServicesOperations.unsuspend
  - Added operation DomainServicesOperations.update
  - Added operation OuContainerOperationGrpOperations.create
  - Added operation OuContainerOperationGrpOperations.delete
  - Added operation OuContainerOperationGrpOperations.update
  - Class DomainServicesResourceProvider has a new constructor "constructor(credential: TokenCredential, options?: DomainServicesResourceProviderOptionalParams);"
  - Added Interface DomainServiceProperties
  - Added Interface DomainServicesUnsuspendOptionalParams
  - Added Interface OuContainerOperationGrpCreateOptionalParams
  - Added Interface OuContainerOperationGrpDeleteOptionalParams
  - Added Interface OuContainerOperationGrpGetOptionalParams
  - Added Interface OuContainerOperationGrpListOptionalParams
  - Added Interface OuContainerOperationGrpUpdateOptionalParams
  - Added Interface OuContainerProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface UnsuspendDomainServiceResponse
  - Interface DomainSecuritySettings has a new optional parameter channelBinding
  - Interface DomainSecuritySettings has a new optional parameter ldapSigning
  - Interface DomainSecuritySettings has a new optional parameter syncOnPremSamAccountName
  - Interface DomainService has a new optional parameter syncApplicationId
  - Interface DomainService has a new optional parameter syncScope
  - Interface ReplicaSet has a new optional parameter selfUnsuspendCounter
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ChannelBinding
  - Added Type Alias LdapSigning
  - Added Type Alias SyncOnPremSamAccountName
  - Added Type Alias SyncScope
  - Added Enum AzureClouds
  - Added Enum KnownChannelBinding
  - Added Enum KnownLdapSigning
  - Added Enum KnownSyncOnPremSamAccountName
  - Added Enum KnownSyncScope
  - Added Enum KnownVersions

### Breaking Changes
  - Class DomainServicesResourceProvider no longer has parameter apiVersion
  - Class DomainServicesResourceProvider no longer has parameter ouContainerOperations
  - Class DomainServicesResourceProvider no longer has parameter subscriptionId
  - Removed Interface OuContainerCreateOptionalParams
  - Removed Interface OuContainerDeleteOptionalParams
  - Removed Interface OuContainerGetOptionalParams
  - Removed Interface OuContainerListOptionalParams
  - Removed Interface OuContainerOperations
  - Removed Interface OuContainerOperationsListOptionalParams
  - Removed Interface OuContainerUpdateOptionalParams
  - Interface Resource no longer has parameter etag
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags


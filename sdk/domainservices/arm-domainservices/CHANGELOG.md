# Release History

## 5.0.0-beta.1 (2026-06-08)
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
  - Class DomainServicesResourceProvider no longer has parameter ouContainerOperations
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

    
## 4.1.0 (2022-11-22)
    
### Features Added

  - Added Interface DomainService
  - Added Interface OuContainer
    
## 4.0.1 (2022-04-18)

**features**

  - Bug fix

## 4.0.0 (2022-01-13)

The package of @azure/arm-domainservices is using our next generation design principles since version 4.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

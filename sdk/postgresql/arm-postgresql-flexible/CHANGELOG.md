# Release History

## 7.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 7.0.0 (2023-01-09)
    
**Features**

  - Added operation group Administrators
  - Added operation group Backups
  - Added operation group CheckNameAvailabilityWithLocation
  - Added operation group Replicas
  - Added Interface ActiveDirectoryAdministrator
  - Added Interface ActiveDirectoryAdministratorAdd
  - Added Interface AdministratorListResult
  - Added Interface AdministratorsCreateHeaders
  - Added Interface AdministratorsCreateOptionalParams
  - Added Interface AdministratorsDeleteHeaders
  - Added Interface AdministratorsDeleteOptionalParams
  - Added Interface AdministratorsGetOptionalParams
  - Added Interface AdministratorsListByServerNextOptionalParams
  - Added Interface AdministratorsListByServerOptionalParams
  - Added Interface AuthConfig
  - Added Interface BackupsGetOptionalParams
  - Added Interface BackupsListByServerNextOptionalParams
  - Added Interface BackupsListByServerOptionalParams
  - Added Interface CheckNameAvailabilityRequest
  - Added Interface CheckNameAvailabilityResponse
  - Added Interface CheckNameAvailabilityWithLocationExecuteOptionalParams
  - Added Interface ConfigurationForUpdate
  - Added Interface ConfigurationsPutHeaders
  - Added Interface ConfigurationsUpdateHeaders
  - Added Interface DatabasesCreateHeaders
  - Added Interface DatabasesDeleteHeaders
  - Added Interface DataEncryption
  - Added Interface ErrorDetail
  - Added Interface FastProvisioningEditionCapability
  - Added Interface FirewallRulesCreateOrUpdateHeaders
  - Added Interface FirewallRulesDeleteHeaders
  - Added Interface ReplicasListByServerOptionalParams
  - Added Interface ServerBackup
  - Added Interface ServerBackupListResult
  - Added Interface ServersCreateHeaders
  - Added Interface ServersDeleteHeaders
  - Added Interface ServersRestartHeaders
  - Added Interface ServersStartHeaders
  - Added Interface ServersStopHeaders
  - Added Interface ServersUpdateHeaders
  - Added Interface StorageTierCapability
  - Added Interface UserAssignedIdentity
  - Added Interface UserIdentity
  - Added Type Alias ActiveDirectoryAuthEnum
  - Added Type Alias AdministratorsCreateResponse
  - Added Type Alias AdministratorsGetResponse
  - Added Type Alias AdministratorsListByServerNextResponse
  - Added Type Alias AdministratorsListByServerResponse
  - Added Type Alias ArmServerKeyType
  - Added Type Alias BackupsGetResponse
  - Added Type Alias BackupsListByServerNextResponse
  - Added Type Alias BackupsListByServerResponse
  - Added Type Alias CheckNameAvailabilityReason
  - Added Type Alias CheckNameAvailabilityWithLocationExecuteResponse
  - Added Type Alias IdentityType
  - Added Type Alias Origin
  - Added Type Alias PasswordAuthEnum
  - Added Type Alias PrincipalType
  - Added Type Alias ReplicasListByServerResponse
  - Added Type Alias ReplicationRole
  - Interface CapabilityProperties has a new optional parameter fastProvisioningSupported
  - Interface CapabilityProperties has a new optional parameter supportedFastProvisioningEditions
  - Interface CapabilityProperties has a new optional parameter supportedHAMode
  - Interface ErrorResponse has a new optional parameter error
  - Interface Resource has a new optional parameter systemData
  - Interface Server has a new optional parameter authConfig
  - Interface Server has a new optional parameter dataEncryption
  - Interface Server has a new optional parameter identity
  - Interface Server has a new optional parameter replicaCapacity
  - Interface Server has a new optional parameter replicationRole
  - Interface ServerForUpdate has a new optional parameter authConfig
  - Interface ServerForUpdate has a new optional parameter dataEncryption
  - Interface ServerForUpdate has a new optional parameter identity
  - Interface ServerForUpdate has a new optional parameter replicationRole
  - Interface ServerForUpdate has a new optional parameter version
  - Interface ServerVersionCapability has a new optional parameter supportedVersionsToUpgrade
  - Interface StorageMBCapability has a new optional parameter supportedUpgradableTierList
  - Interface VirtualNetworkSubnetUsageResult has a new optional parameter location
  - Interface VirtualNetworkSubnetUsageResult has a new optional parameter subscriptionId
  - Added Enum KnownActiveDirectoryAuthEnum
  - Added Enum KnownArmServerKeyType
  - Added Enum KnownCheckNameAvailabilityReason
  - Added Enum KnownIdentityType
  - Added Enum KnownOrigin
  - Added Enum KnownPasswordAuthEnum
  - Added Enum KnownPrincipalType
  - Added Enum KnownReplicationRole
  - Enum KnownCreateMode has a new value GeoRestore
  - Enum KnownCreateMode has a new value Replica
  - Enum KnownHighAvailabilityMode has a new value SameZone
  - Enum KnownServerVersion has a new value Fourteen

**Breaking Changes**

  - Operation CheckNameAvailability.execute has a new signature
  - Operation Configurations.beginUpdate has a new signature
  - Operation Configurations.beginUpdateAndWait has a new signature
  - Interface Configuration no longer has parameter systemData
  - Interface Database no longer has parameter systemData
  - Interface ErrorResponse no longer has parameter additionalInfo
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter details
  - Interface ErrorResponse no longer has parameter message
  - Interface ErrorResponse no longer has parameter target
  - Interface FirewallRule no longer has parameter systemData
  - Interface Server no longer has parameter systemData
  - Interface ServerForUpdate no longer has parameter location
  - Removed Enum KnownReason
    
    
## 6.1.0 (2022-12-22)
    
**Features**

  - Added Interface Configuration
  - Added Interface Database
  - Added Interface FirewallRule
  - Added Interface ProxyResource
  - Added Interface Server
  - Added Interface TrackedResource
  - Added function getContinuationToken
    
    
## 6.0.0 (2022-04-28)
    
**Features**

  - Added Interface PostgreSQLManagementFlexibleServerClientOptionalParams
  - Added Class PostgreSQLManagementFlexibleServerClient

**Breaking Changes**

  - Deleted Class PostgreSQLManagementClient
    
    
## 5.0.0 (2022-01-20)

The package of @azure/arm-postgresql-flexible is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

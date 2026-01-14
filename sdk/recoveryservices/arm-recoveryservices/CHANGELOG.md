# Release History

## 7.0.0 (2025-09-29)

### Features Added
  - Added operation group DeletedVaultsOperations
  - Added operation group PrivateLinkResourcesOperations
  - Added operation VaultsOperations.createOrUpdate
  - Added operation VaultsOperations.delete
  - Added operation VaultsOperations.update
  - Added Interface DeletedVault
  - Added Interface DeletedVaultProperties
  - Added Interface DeletedVaultsGetOperationStatusOptionalParams
  - Added Interface DeletedVaultsGetOptionalParams
  - Added Interface DeletedVaultsListBySubscriptionIdOptionalParams
  - Added Interface DeletedVaultsUndeleteOptionalParams
  - Added Interface DeletedVaultUndeleteInput
  - Added Interface DeletedVaultUndeleteInputProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateLinkResourceProperties
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface VaultExtendedInfo
  - Interface PatchTrackedResource has a new optional parameter systemData
  - Interface PatchVault has a new optional parameter systemData
  - Interface PrivateLinkResource has a new optional parameter properties
  - Interface PrivateLinkResource has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Interface VaultExtendedInfoResource has a new optional parameter properties
  - Interface VaultExtendedInfoResource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation Vaults.beginCreateOrUpdate
  - Removed operation Vaults.beginCreateOrUpdateAndWait
  - Removed operation Vaults.beginDelete
  - Removed operation Vaults.beginDeleteAndWait
  - Removed operation Vaults.beginUpdate
  - Removed operation Vaults.beginUpdateAndWait
  - Operation VaultCertificates.create has a new signature
  - Removed Interface ClientDiscoveryResponse
  - Removed Interface PrivateLinkResources
  - Removed Interface PrivateLinkResourcesOperationsOperations
  - Removed Interface ReplicationUsageList
  - Removed Interface VaultList
  - Removed Interface VaultUsageList
  - Type of parameter authType of interface ResourceCertificateDetails is changed from "AzureActiveDirectory" | "AccessControlService" to string
  - Interface PrivateLinkResource no longer has parameter groupId
  - Interface PrivateLinkResource no longer has parameter requiredMembers
  - Interface PrivateLinkResource no longer has parameter requiredZoneNames
  - Interface Resource no longer has parameter etag
  - Interface TrackedResource no longer has parameter etag
  - Interface VaultExtendedInfoResource no longer has parameter algorithm
  - Interface VaultExtendedInfoResource no longer has parameter encryptionKey
  - Interface VaultExtendedInfoResource no longer has parameter encryptionKeyThumbprint
  - Interface VaultExtendedInfoResource no longer has parameter integrityKey
  - Type alias "ResourceCertificateDetailsUnion" has been changed

    
## 6.1.0 (2025-06-11)
    
### Features Added

  - Added Interface AssociatedIdentity
  - Added Interface SourceScanConfiguration
  - Added Type Alias IdentityType
  - Added Type Alias State
  - Interface SecuritySettings has a new optional parameter sourceScanConfiguration
  - Added Enum KnownIdentityType
  - Added Enum KnownState
    
    
## 6.0.0 (2024-04-17)
    
### Features Added

  - Added operation Vaults.beginDelete
  - Added operation Vaults.beginDeleteAndWait
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface VaultsDeleteHeaders
  - Added Type Alias BcdrSecurityLevel
  - Added Type Alias EnhancedSecurityState
  - Added Type Alias VaultsDeleteResponse
  - Interface AzureMonitorAlertSettings has a new optional parameter alertsForAllFailoverIssues
  - Interface AzureMonitorAlertSettings has a new optional parameter alertsForAllReplicationIssues
  - Interface ClassicAlertSettings has a new optional parameter emailNotificationsForSiteRecovery
  - Interface SoftDeleteSettings has a new optional parameter enhancedSecurityState
  - Interface VaultProperties has a new optional parameter bcdrSecurityLevel
  - Interface VaultProperties has a new optional parameter resourceGuardOperationRequests
  - Interface VaultsCreateOrUpdateOptionalParams has a new optional parameter xMsAuthorizationAuxiliary
  - Interface VaultsDeleteOptionalParams has a new optional parameter resumeFrom
  - Interface VaultsDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Interface VaultsUpdateOptionalParams has a new optional parameter xMsAuthorizationAuxiliary
  - Added Enum KnownBcdrSecurityLevel
  - Added Enum KnownEnhancedSecurityState
  - Enum KnownStandardTierStorageRedundancy has a new value Invalid

### Breaking Changes

  - Removed operation Vaults.delete
    
    
## 5.4.0 (2023-08-29)
    
### Features Added

  - Added Interface SoftDeleteSettings
  - Added Type Alias MultiUserAuthorization
  - Added Type Alias SecureScoreLevel
  - Added Type Alias SoftDeleteState
  - Interface SecuritySettings has a new optional parameter multiUserAuthorization
  - Interface SecuritySettings has a new optional parameter softDeleteSettings
  - Interface VaultProperties has a new optional parameter secureScore
  - Added Enum KnownMultiUserAuthorization
  - Added Enum KnownSecureScoreLevel
  - Added Enum KnownSoftDeleteState
    
    
## 5.3.0 (2023-05-31)
    
### Features Added

  - Added Interface CrossSubscriptionRestoreSettings
  - Added Interface RestoreSettings
  - Added Type Alias CrossSubscriptionRestoreState
  - Interface VaultProperties has a new optional parameter restoreSettings
  - Added Enum KnownCrossSubscriptionRestoreState
    
    
## 5.2.0 (2023-02-07)
    
### Features Added

  - Added operation RecoveryServices.capabilities
  - Added Interface CapabilitiesProperties
  - Added Interface CapabilitiesResponse
  - Added Interface CapabilitiesResponseProperties
  - Added Interface DNSZone
  - Added Interface DNSZoneResponse
  - Added Interface ImmutabilitySettings
  - Added Interface RecoveryServicesCapabilitiesOptionalParams
  - Added Interface ResourceCapabilities
  - Added Interface ResourceCapabilitiesBase
  - Added Interface SecuritySettings
  - Added Type Alias ImmutabilityState
  - Added Type Alias PublicNetworkAccess
  - Added Type Alias RecoveryServicesCapabilitiesResponse
  - Added Type Alias VaultSubResourceType
  - Interface PrivateEndpointConnection has a new optional parameter groupIds
  - Interface VaultProperties has a new optional parameter publicNetworkAccess
  - Interface VaultProperties has a new optional parameter securitySettings
  - Added Enum KnownImmutabilityState
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownVaultSubResourceType
    
    
## 5.1.1 (2023-01-31)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token
  
### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 5.1.0 (2022-07-22)
    
### Features Added

  - Added Interface AzureMonitorAlertSettings
  - Added Interface ClassicAlertSettings
  - Added Interface MonitoringSettings
  - Added Interface PatchTrackedResource
  - Added Interface PatchVault
  - Added Interface ResourceCertificateAndAadDetails
  - Added Interface ResourceCertificateAndAcsDetails
  - Added Interface TrackedResource
  - Added Interface Vault
  - Added Interface VaultExtendedInfoResource
  - Added Interface VaultPropertiesRedundancySettings
  - Added Type Alias AlertsState
  - Added Type Alias BackupStorageVersion
  - Added Type Alias CrossRegionRestore
  - Added Type Alias StandardTierStorageRedundancy
  - Interface VaultProperties has a new optional parameter backupStorageVersion
  - Interface VaultProperties has a new optional parameter monitoringSettings
  - Interface VaultProperties has a new optional parameter redundancySettings
  - Added Enum KnownAlertsState
  - Added Enum KnownBackupStorageVersion
  - Added Enum KnownCrossRegionRestore
  - Added Enum KnownStandardTierStorageRedundancy
    
## 5.0.1 (2022-04-29)

### Features Added

  - Bug fix

## 5.0.0 (2021-12-10)

The package of @azure/arm-recoveryservices is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

# Release History
    
## 5.2.0 (2023-02-07)
    
**Features**

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

**Features**

  - Exposes `getContinuationToken` helper function to extract continuation token
  
**Bugs Fixed**

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 5.1.0 (2022-07-22)
    
**Features**

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

**Features**

  - Bug fix

## 5.0.0 (2021-12-10)

The package of @azure/arm-recoveryservices is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

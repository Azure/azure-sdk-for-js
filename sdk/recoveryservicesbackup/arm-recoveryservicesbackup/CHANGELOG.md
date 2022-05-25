# Release History

## 9.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 9.0.0 (2022-05-16)
    
**Breaking Changes**

  - Interface AzureIaaSVMProtectedItemExtendedInfo no longer has parameter newestRecoveryPointInArchive
  - Interface AzureIaaSVMProtectedItemExtendedInfo no longer has parameter oldestRecoveryPointInArchive
  - Interface AzureIaaSVMProtectedItemExtendedInfo no longer has parameter oldestRecoveryPointInVault
  - Interface AzureVmWorkloadProtectedItemExtendedInfo no longer has parameter newestRecoveryPointInArchive
  - Interface AzureVmWorkloadProtectedItemExtendedInfo no longer has parameter oldestRecoveryPointInArchive
  - Interface AzureVmWorkloadProtectedItemExtendedInfo no longer has parameter oldestRecoveryPointInVault
  - Interface SubProtectionPolicy no longer has parameter tieringPolicy
  - Removed Enum KnownTieringMode
    
    
## 8.2.0 (2022-05-11)
    
**Features**

  - Added Interface TieringPolicy
  - Added Type Alias TieringMode
  - Interface AzureIaaSVMProtectedItemExtendedInfo has a new optional parameter newestRecoveryPointInArchive
  - Interface AzureIaaSVMProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInArchive
  - Interface AzureIaaSVMProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInVault
  - Interface AzureVmWorkloadProtectedItemExtendedInfo has a new optional parameter newestRecoveryPointInArchive
  - Interface AzureVmWorkloadProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInArchive
  - Interface AzureVmWorkloadProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInVault
  - Interface SubProtectionPolicy has a new optional parameter tieringPolicy
  - Added Enum KnownTieringMode
    
## 8.1.1 (2022-04-29)

**Features**

  - Bug fix
    
## 8.1.0 (2022-02-14)
    
**Features**

  - Added Interface DailySchedule
  - Added Interface WeeklySchedule
  - Added Type Alias IaasvmPolicyType
  - Added Type Alias SimpleSchedulePolicyV2
  - Type Alias AzureIaaSVMProtectionPolicy has a new parameter policyType
  - Added Enum KnownIaasvmPolicyType
  - Enum KnownContainerType has a new value AzureWorkloadContainer
  - Enum KnownContainerType has a new value MicrosoftClassicComputeVirtualMachines
  - Enum KnownContainerType has a new value MicrosoftComputeVirtualMachines
  - Enum KnownProtectionIntentItemType has a new value AzureWorkloadAutoProtectionIntent
  - Enum KnownProtectionIntentItemType has a new value AzureWorkloadSQLAutoProtectionIntent
    
    
## 8.0.0 (2022-01-20)

The package of @azure/arm-recoveryservicesbackup is using our next generation design principles since version 8.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

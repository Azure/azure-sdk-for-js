# Release History

## 1.3.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.3.0-beta.2 (2024-04-16)
    
### Features Added

  - Added operation group ManagedCCFOperations
  - Added operation Ledger.beginBackup
  - Added operation Ledger.beginBackupAndWait
  - Added operation Ledger.beginRestore
  - Added operation Ledger.beginRestoreAndWait
  - Added Interface CertificateTags
  - Added Interface ConfidentialLedgerBackup
  - Added Interface ConfidentialLedgerBackupResponse
  - Added Interface ConfidentialLedgerRestore
  - Added Interface ConfidentialLedgerRestoreResponse
  - Added Interface DeploymentType
  - Added Interface LedgerBackupOptionalParams
  - Added Interface LedgerRestoreOptionalParams
  - Added Interface ManagedCCF
  - Added Interface ManagedCCFBackup
  - Added Interface ManagedCCFBackupOptionalParams
  - Added Interface ManagedCCFBackupResponse
  - Added Interface ManagedCCFCreateOptionalParams
  - Added Interface ManagedCCFDeleteOptionalParams
  - Added Interface ManagedCCFGetOptionalParams
  - Added Interface ManagedCCFList
  - Added Interface ManagedCCFListByResourceGroupNextOptionalParams
  - Added Interface ManagedCCFListByResourceGroupOptionalParams
  - Added Interface ManagedCCFListBySubscriptionNextOptionalParams
  - Added Interface ManagedCCFListBySubscriptionOptionalParams
  - Added Interface ManagedCCFProperties
  - Added Interface ManagedCCFRestore
  - Added Interface ManagedCCFRestoreOptionalParams
  - Added Interface ManagedCCFRestoreResponse
  - Added Interface ManagedCCFUpdateOptionalParams
  - Added Interface MemberIdentityCertificate
  - Added Interface TrackedResource
  - Added Type Alias LanguageRuntime
  - Added Type Alias LedgerBackupResponse
  - Added Type Alias LedgerRestoreResponse
  - Added Type Alias LedgerSku
  - Added Type Alias ManagedCCFBackupOperationResponse
  - Added Type Alias ManagedCCFCreateResponse
  - Added Type Alias ManagedCCFGetResponse
  - Added Type Alias ManagedCCFListByResourceGroupNextResponse
  - Added Type Alias ManagedCCFListByResourceGroupResponse
  - Added Type Alias ManagedCCFListBySubscriptionNextResponse
  - Added Type Alias ManagedCCFListBySubscriptionResponse
  - Added Type Alias ManagedCCFRestoreOperationResponse
  - Added Type Alias ManagedCCFUpdateResponse
  - Added Type Alias RunningState
  - Interface LedgerProperties has a new optional parameter ledgerSku
  - Interface LedgerProperties has a new optional parameter runningState
  - Added Enum KnownLanguageRuntime
  - Added Enum KnownLedgerSku
  - Added Enum KnownRunningState
  

## 1.3.0-beta.1 (2023-04-19)
    
### Features Added

  - Added operation group ManagedCCFOperations
  - Added Interface CertificateTags
  - Added Interface DeploymentType
  - Added Interface ManagedCCF
  - Added Interface ManagedCCFCreateOptionalParams
  - Added Interface ManagedCCFDeleteOptionalParams
  - Added Interface ManagedCCFGetOptionalParams
  - Added Interface ManagedCCFList
  - Added Interface ManagedCCFListByResourceGroupNextOptionalParams
  - Added Interface ManagedCCFListByResourceGroupOptionalParams
  - Added Interface ManagedCCFListBySubscriptionNextOptionalParams
  - Added Interface ManagedCCFListBySubscriptionOptionalParams
  - Added Interface ManagedCCFProperties
  - Added Interface ManagedCCFUpdateOptionalParams
  - Added Interface MemberIdentityCertificate
  - Added Interface TrackedResource
  - Added Type Alias LanguageRuntime
  - Added Type Alias ManagedCCFCreateResponse
  - Added Type Alias ManagedCCFGetResponse
  - Added Type Alias ManagedCCFListByResourceGroupNextResponse
  - Added Type Alias ManagedCCFListByResourceGroupResponse
  - Added Type Alias ManagedCCFListBySubscriptionNextResponse
  - Added Type Alias ManagedCCFListBySubscriptionResponse
  - Added Type Alias RunningState
  - Interface LedgerProperties has a new optional parameter runningState
  - Added Enum KnownLanguageRuntime
  - Added Enum KnownRunningState
    
    
## 1.2.0 (2023-01-12)
    
### Features Added

  - Interface LedgerListByResourceGroupNextOptionalParams no longer has parameter filter
  - Interface LedgerListBySubscriptionNextOptionalParams no longer has parameter filter
    
    
## 1.1.0 (2022-07-05)
    
### Features Added

  - Added Interface ConfidentialLedger
    
    
## 1.0.0 (2022-05-30)

The package of @azure/arm-confidentialledger is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).

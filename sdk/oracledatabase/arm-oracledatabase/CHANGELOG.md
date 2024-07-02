# Release History

## 1.0.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.2 (2024-06-17)
Compared with version 1.0.0-beta.1
    
### Features Added

  - Added operation group SystemVersions
  - Added operation AutonomousDatabases.beginRestore
  - Added operation AutonomousDatabases.beginRestoreAndWait
  - Added operation AutonomousDatabases.beginShrink
  - Added operation AutonomousDatabases.beginShrinkAndWait
  - Added Interface AutonomousDatabasesRestoreHeaders
  - Added Interface AutonomousDatabasesRestoreOptionalParams
  - Added Interface AutonomousDatabasesShrinkHeaders
  - Added Interface AutonomousDatabasesShrinkOptionalParams
  - Added Interface LongTermBackUpScheduleDetails
  - Added Interface NsgCidr
  - Added Interface PlanUpdate
  - Added Interface RestoreAutonomousDatabaseDetails
  - Added Interface SystemVersion
  - Added Interface SystemVersionListResult
  - Added Interface SystemVersionProperties
  - Added Interface SystemVersionsFilter
  - Added Interface SystemVersionsGetOptionalParams
  - Added Interface SystemVersionsListByLocationNextOptionalParams
  - Added Interface SystemVersionsListByLocationOptionalParams
  - Added Type Alias AutonomousDatabasesRestoreResponse
  - Added Type Alias AutonomousDatabasesShrinkResponse
  - Added Type Alias RepeatCadenceType
  - Added Type Alias SystemVersionsGetResponse
  - Added Type Alias SystemVersionsListByLocationNextResponse
  - Added Type Alias SystemVersionsListByLocationResponse
  - Interface AutonomousDatabaseBackupProperties has a new optional parameter autonomousDatabaseOcid
  - Interface AutonomousDatabaseBackupProperties has a new optional parameter backupType
  - Interface AutonomousDatabaseBackupProperties has a new optional parameter databaseSizeInTbs
  - Interface AutonomousDatabaseBackupProperties has a new optional parameter sizeInTbs
  - Interface AutonomousDatabaseBackupProperties has a new optional parameter timeStarted
  - Interface AutonomousDatabaseBaseProperties has a new optional parameter longTermBackupSchedule
  - Interface AutonomousDatabaseBaseProperties has a new optional parameter nextLongTermBackupTimeStamp
  - Interface AutonomousDatabaseUpdateProperties has a new optional parameter longTermBackupSchedule
  - Added Enum KnownRepeatCadenceType

### Breaking Changes

  - Interface AutonomousDatabaseBackupProperties no longer has parameter autonomousDatabaseId
  - Interface AutonomousDatabaseBackupProperties no longer has parameter databaseSizeInTBs
  - Interface AutonomousDatabaseBackupProperties no longer has parameter sizeInTBs
  - Interface AutonomousDatabaseBackupProperties no longer has parameter type
  - Type of parameter nsgCidrs of interface CloudVmClusterProperties is changed from NSGCidr[] to NsgCidr[]
  - Type of parameter plan of interface OracleSubscriptionUpdate is changed from ResourcePlanTypeUpdate to PlanUpdate
  - Removed Enum KnownVersions
    
    
## 1.0.0-beta.1 (2024-05-14)

The package of @azure/arm-oracledatabase is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

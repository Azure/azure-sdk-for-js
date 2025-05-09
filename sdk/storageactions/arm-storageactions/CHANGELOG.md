# Release History

## 1.0.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.2 (2025-04-18)
Compared with version 1.0.0-beta.1
    
### Features Added

  - Added Type Alias OnFailure
  - Added Type Alias OnSuccess
  - Added Enum KnownOnFailure
  - Added Enum KnownOnSuccess
  - Added Enum KnownProvisioningState

### Breaking Changes

  - Parameter identity of interface StorageTask is now required
  - Parameter properties of interface StorageTask is now required
  - Type of parameter maxpagesize of interface StorageTaskAssignmentListOptionalParams is changed from string to number
  - Type of parameter onFailure of interface StorageTaskOperation is changed from "break" to OnFailure
  - Type of parameter onSuccess of interface StorageTaskOperation is changed from "continue" to OnSuccess
  - Type of parameter maxpagesize of interface StorageTasksReportListOptionalParams is changed from string to number
    
    
## 1.0.0-beta.1 (2024-03-07)

The package of @azure/arm-storageactions is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).

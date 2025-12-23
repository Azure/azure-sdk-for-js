# Release History

## 1.0.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.2 (2025-08-22)

### Other Changes

  - Other fixes

## 1.0.1 (2025-02-10)

### Features Added

- refresh @azure-rest/developer-devcenter sdk

## 1.0.0 (2024-07-08)

This release targets Azure Dev Center 2023-04-01 General Available API, which is the same version as the previous 1.0.0-beta.3 release.

### Features Added

- Added output types:
    - DevBoxActionDelayResultStatusOutput
    - DevBoxActionTypeOutput
    - DevBoxProvisioningStateOutput 
    - EnvironmentProvisioningStateOutput
    - EnvironmentTypeEnableStatusOutput
    - HibernateSupportOutput
    - LocalAdminStatusOutput
    - OperationStateOutput
    - OsTypeOutput
    - ParameterTypeOutput
    - PoolHealthStatusOutput
    - PowerStateOutput
    - ScheduledFrequencyOutput
    - ScheduledTypeOutput 
    - SkuNameOutput
    - StopOnDisconnectEnableStatusOutput

### Breaking Changes

- Rename interfaces to match operation names in Dev Center API documentation
    - ListSchedules was renamed to ListSchedulesByPool
    - GetSchedule was renamed to GetScheduleByPool
    - ListDevBoxes was renamed to ListDevBoxesByUser
    - GetDevBox was renamed to GetDevBoxByUser
    - ListDevBoxActions was renamed to ListActions
    - GetDevBoxAction was renamed to GetAction
    - DelayAllActions was renamed to DelayActions
    - ListAllEnvironments was renamed to ListEnvironments
    - ListEnvironments was renamed to ListEnvironmentsByUser
    - GetEnvironment was renamed to GetEnvironmentByUser
    - CreateOrUpdateEnvironment was renamed to CreateOrReplaceEnvironment
    - ListCatalogs was renamed to ListCatalogsByProject
    - ListEnvironmentDefinitions was renamed to listEnvironmentDefinitionsByProject

## 1.0.0-beta.3 (2023-11-20)
This release updates the Azure DevCenter library to use the 2023-04-01 GA API.

### Breaking Changes

 - Environments client now works with "environment definitions" instead of "catalog items"
 - Creating a new environment requires passing `environmentDefinitionName` instead of `catalogItemName`
 - Creating a new environment requires passing an additional parameter `catalogName`

## 1.0.0-beta.2 (2023-02-07)

This release updates the Azure DevCenter library to use the 2022-11-11-preview API.

### Breaking Changes

- `createClient` now accepts an endpoint URI on construction rather than tenant ID + dev center name.

### Features Added

- Added upcoming actions APIs to dev boxes.
    - `/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/upcomingActions`
    - `/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/upcomingActions/{upcomingActionId}`
    - `/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/upcomingActions/{upcomingActionId}:skip`
    - `/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/upcomingActions/{upcomingActionId}:delay`

### Bugs Fixed
- Invalid response types removed from `DeleteDevBox`, `StartDevBox`, and `StopDevBox` APIs.
- Invalid `DeleteEnvironmentAction` API removed from `EnvironmentsClient`.
- Unimplemented artifacts APIs removed from `EnvironmentsClient`.

## 1.0.0-beta.1 (2022-11-11)

### Features Added
Initial release of the Azure DevCenter package

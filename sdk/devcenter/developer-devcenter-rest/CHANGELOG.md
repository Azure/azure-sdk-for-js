# Release History

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

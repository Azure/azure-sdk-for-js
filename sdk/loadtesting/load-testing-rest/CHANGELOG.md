# Release History

## 1.1.0-beta.1 (2025-03-20)

Updated the client library to use API Version 2025-05-01-preview. This adds all the capabilities that were introduced until this API version.

### Features Added

- Support for AutoStop Criteria
- Support for Quick Load Tests with RPS Inputs
- Support for URL Tests with JSON based test plans
- Support for Locust Load Tests
- Support for Multi Region Load Tests
- Support for Disabling Public IP Deployment for Private Load Tests
- Support for uploading ZIP Artifacts
- Support for all Test Profiles & Test Profile Run Scenarios

## 1.0.1 (2025-01-20)

### Other Changes

- Add NOT_VALIDATED to the list of terminal states for the file validation poller.

## 1.0.0 (2023-03-07)

First stable release of Azure Load Testing client library for Javascript.

## 1.0.0-beta.2 (2023-01-26)

Second preview release of Azure Load Testing client library for Javascript.

### Features Added

- Added `LoadTestClient.getLongRunningPoller` Long-Running operation helper

### Breaking Changes

- Added metric namespaces and metric dimensions
- File upload now uses `application/octet-stream` instead of `multipart/form-data`
- File upload now uses file name as primary identifier instead of `fileId`

## 1.0.0-beta.1 (2022-10-19)

### Features Added

Initial release of the Azure LoadTesting package

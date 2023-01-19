# Release History

## 1.0.0-beta.2 (Unreleased)

Second preview release of Azure Load Testing client library for Javascript.

### Features Added

- Added `LoadTestClient.beginUploadTestFile` and `LoadTestClient.beginCreateOrUpdateTestRun` Long-Running operation

### Breaking Changes

- Added metric namespaces and metric dimensions
- File upload now uses `application/octet-stream` instead of `multipart/form-data`
- File upload now uses file name as primary identifier instead of `fileId`

## 1.0.0-beta.1 (2022-10-19)

### Features Added

Initial release of the Azure LoadTesting package

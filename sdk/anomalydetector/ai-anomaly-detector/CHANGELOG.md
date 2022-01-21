# Release History

## 3.0.0-beta.6 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.0.0-beta.5 (2022-01-23)

- Fix release issues

## 3.0.0-beta.4 (2022-01-18)

- Introduced the new API `lastDetectAnomaly`
- Added 2 new optional properties: `imputeMode` & `imputeFixedValue` to the `DetectRequest` object.
- Added 1 new optional property: `severity` to the `DetectEntireResponse` & `DetectLastPointResponse` objects.
- Removed the optional property `errors` from the `VariableState` object.
- Refactored the optional property `contributors` to `interpretation` from the `AnomalyValue` object.
- Removed the `AnomalyContributor` & `AnomalyDetectorExportModelHeaders` objects.
- Modified the `FillNAMethod` object into an extensible enum.

## 3.0.0-beta.3 (2021-04-16)

- Introduced the following new APIs related to Mutivariate Models:trainMultivariateModel, getMultivariateModel, deleteMultivariateModel, detectAnomaly, getDetectionResult, exportModel, listMultivariateModel, listMultivariateModelNext.

## 3.0.0-beta.2 (2020-09-18)

- Fix missing types in package [#10916](https://github.com/Azure/azure-sdk-for-js/pull/10916)

## 3.0.0-preview.1 (2020-08-27)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html).

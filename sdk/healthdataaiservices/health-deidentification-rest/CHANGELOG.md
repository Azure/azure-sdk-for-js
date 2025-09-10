# Release History

## 1.0.0 (2025-07-01)

### Features Added

- Introduced `DeidentificationCustomizationOptions` and `DeidentificationJobCustomizationOptions` models.
    - Added `surrogate_locale` field in these models.
    - Moved `redaction_format` field into these models.
- Introduced `overwrite` property in `TargetStorageLocation` model, which allows a job to overwrite existing documents in the storage location. 

### Breaking Changes

- Changed method names in `DeidentificationClient` to match functionality:
    - Changed the `Deidentify` method name to `DeidentifyText`.
    - Changed the `CreateJob` method name to `DeidentifyDocuments`.
- Deprecated `DocumentDataType`.
- Changed `path` field to `location` in `SourceStorageLocation` and `TargetStorageLocation`.
- Changed `outputPrefix` behavior to no longer include the job's name by default.
- Deprecated `path` and `location` from `PhiTaggerResultOutput` model.

## 1.0.0-beta.1 (2024-08-15)

- Initial implementation of Azure Health Data Services de-identification service REST client library for JavaScript.

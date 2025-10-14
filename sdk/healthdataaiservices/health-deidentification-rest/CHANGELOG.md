# Release History

## 2.0.0-beta.1 (2025-10-14)
Compared with version 1.0.0

### Features Added
  - Added Class DeidentificationClient
  - Added Interface CancelJobOptionalParams
  - Added Interface DeidentificationClientOptionalParams
  - Added Interface DeidentificationDocumentDetails
  - Added Interface DeidentificationDocumentLocation
  - Added Interface DeidentificationResult
  - Added Interface DeidentifyDocumentsOptionalParams
  - Added Interface DeidentifyTextOptionalParams
  - Added Interface DeleteJobOptionalParams
  - Added Interface GetJobOptionalParams
  - Added Interface ListJobDocumentsOptionalParams
  - Added Interface ListJobsOptionalParams
  - Added Interface PhiEntity
  - Added Interface PhiTaggerResult
  - Added Interface RestorePollerOptions
  - Added Interface SimplePhiEntity
  - Added Interface StringIndex
  - Added Interface TaggedPhiEntities
  - Interface DeidentificationContent has a new optional parameter taggedEntities
  - Interface DeidentificationCustomizationOptions has a new optional parameter inputLocale
  - Interface DeidentificationJob has a new optional parameter error
  - Interface DeidentificationJob has a new optional parameter startedAt
  - Interface DeidentificationJob has a new optional parameter summary
  - Interface DeidentificationJobCustomizationOptions has a new optional parameter inputLocale
  - Added Type Alias PhiCategory
  - Added Type Alias TextEncodingType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed Routes interface
  - Removed Interface CancelJob
  - Removed Interface CancelJob200Response
  - Removed Interface CancelJobDefaultResponse
  - Removed Interface CancelJobHeaderParam
  - Removed Interface DeidentificationClientOptions
  - Removed Interface DeidentificationDocumentDetailsOutput
  - Removed Interface DeidentificationDocumentLocationOutput
  - Removed Interface DeidentificationJobCustomizationOptionsOutput
  - Removed Interface DeidentificationJobOutput
  - Removed Interface DeidentificationJobSummaryOutput
  - Removed Interface DeidentificationResultOutput
  - Removed Interface DeidentifyDocuments200Response
  - Removed Interface DeidentifyDocuments201Response
  - Removed Interface DeidentifyDocumentsBodyParam
  - Removed Interface DeidentifyDocumentsDefaultResponse
  - Removed Interface DeidentifyDocumentsHeaderParam
  - Removed Interface DeidentifyDocumentsLogicalResponse
  - Removed Interface DeidentifyText
  - Removed Interface DeidentifyText200Response
  - Removed Interface DeidentifyTextBodyParam
  - Removed Interface DeidentifyTextDefaultResponse
  - Removed Interface DeidentifyTextHeaderParam
  - Removed Interface DeleteJob204Response
  - Removed Interface DeleteJobDefaultResponse
  - Removed Interface DeleteJobHeaderParam
  - Removed Interface GetJob
  - Removed Interface GetJob200Response
  - Removed Interface GetJobDefaultResponse
  - Removed Interface GetJobHeaderParam
  - Removed Interface ListJobDocuments
  - Removed Interface ListJobDocuments200Response
  - Removed Interface ListJobDocumentsDefaultResponse
  - Removed Interface ListJobDocumentsHeaderParam
  - Removed Interface ListJobDocumentsQueryParam
  - Removed Interface ListJobDocumentsQueryParamProperties
  - Removed Interface ListJobs
  - Removed Interface ListJobs200Response
  - Removed Interface ListJobsDefaultResponse
  - Removed Interface ListJobsHeaderParam
  - Removed Interface ListJobsQueryParam
  - Removed Interface ListJobsQueryParamProperties
  - Removed Interface PagedDeidentificationDocumentDetailsOutput
  - Removed Interface PagedDeidentificationJobOutput
  - Removed Interface PagingOptions
  - Removed Interface PhiEntityOutput
  - Removed Interface PhiTaggerResultOutput
  - Removed Interface SimplePollerLike
  - Removed Interface SourceStorageLocationOutput
  - Removed Interface StringIndexOutput
  - Removed Interface TargetStorageLocationOutput
  - Interface DeidentificationJob has a new required parameter createdAt
  - Interface DeidentificationJob has a new required parameter lastUpdatedAt
  - Interface DeidentificationJob has a new required parameter name
  - Interface DeidentificationJob has a new required parameter status
  - Removed Type Alias CancelJobParameters
  - Removed Type Alias DeidentificationClient
  - Removed Type Alias DeidentificationOperationTypeOutput
  - Removed Type Alias DeidentifyDocumentsParameters
  - Removed Type Alias DeidentifyTextParameters
  - Removed Type Alias DeleteJobParameters
  - Removed Type Alias GetJobParameters
  - Removed Type Alias ListJobDocumentsParameters
  - Removed Type Alias ListJobsParameters
  - Removed Type Alias OperationStateOutput
  - Removed Type Alias PhiCategoryOutput
  - Type alias "DeidentificationOperationType" has been changed
  - Type alias "OperationState" has been changed
  - Removed function createClient
  - Removed function isUnexpected

## 1.1.0-beta.1 (2025-09-30)

### Features Added
- Added `DeidentificationOperationType.SurrogateOnly`, which returns output text where user-defined PHI entities are replaced with realistic replacement values. When using this operation, include `DeidentificationContent.taggedEntities`, which allows user input of PHI entities detected in the input text. The service will skip tagging and apply surrogation directly to the user-defined entities.
- Added `DeidentificationCustomizationOptions.inputLocale` to allow specifying the locale of the input text for TAG and REDACT operations.


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

# Release History

## 2.0.0 (2025-06-06)

Extending scope with inferences for scoring and assessment, quality measure and clinical guidance

### Features Added
- Added sample and test code for scoring and assessment, quality measure and clinical guidance.

### Breaking Changes

- for PatientDocumentOutput:
  - Adding guidanceOptions (default true) and qualityMeasureOptions (needed for Quality Measure Inferences).

- for azureHealthInsightsClient:
  - Adding ClientApiVersionPolicy

- for HealthInsightsErrorResponseOutput:
  - Retire 'requestId' and the response: RequestIdResponseHeaderOutput.

- for RequestIdResponseHeaderOutput:
  - Adding FollowupCommunicationInferenceOutput, ScoringAndAssessmentInferenceOutput, GuidanceInferenceOutput and QualityMeasureInferenceOutput.
  - Adding  FollowupCommunicationInferenceTypeOutput, ScoringAndAssessmentTypeOutput, GuidanceTypeOutput and QualityMeasureTypeOutput.

- for GetJobQueryParamProperties:
  - Replace 'string' by 'GetJobExpandQueryParam' with its definition.
  
- for CreateJobQueryParamProperties:
  - Replace 'string' by 'CreateJobExpandQueryParam' with its definition.

- for ClinicalDocumentTypeOutput:
  - Replace 'ClinicalDocumentTypeOutputEnum' by 'string'.

- for pollingHelper:
  - Adding imports for 'AbortSignalLike' and 'CancelOnProgress'
  - Replace 'RunningOperation' with 'LongRunningOperation'
  - Replace 'OperationResponse' with 'LroResponse'
  - Retire 'SimplePollerLike'

## 1.0.0 (2024-08-15)

 - GA release
 
 
 ### Features Added
- Added sample code for all Inference types
- Added tests for all Inference types
- Rename param endpoint to endpointParam
- Rename const baseUrl to endpointUrl

 ### Breaking Changes

- Client Changes
    - POST call replaced with PUT (this change is taken care of automatically by the SDK)
    - Adding TokenCredential remove KeyCredential
    - Credential through DefaultAzureCredential  and Managed Identities

- Request changes:
    - Renamed 'createdDateTime' into 'createdAt'
    - Patients 'info' renamed into Patients 'details'
    - Unique ID (String) required to be added in the request parameters as a unique job id
    - Renamed 'RadiologyInsightsResultOutput' into 'RadiologyInsightsJobOutput' with the status being a 'JobStatusOutput' in stead of a string
    - Retired 'RepeatabilityResultOutput'

- Response changes:
  - for RadiologyInsightsJobOutput
    - Renamed 'createdDateTime' into 'createdAt'
    - Renamed 'expirationDateTime' into 'expiresAt'
    - Renamed 'lastUpdateDateTime' into 'updatedAt'

  - for ElementOutput
    - added field 'kind' as a string

  - for ContactPointOutput
    - 'system' field is now a 'ContactPointSystemOutput' and no longer a string
    - 'use' field is now a 'ContactPointUseOutput' and no longer a string

  - for DomainResourceOutputParent
    - 'status' field is now a 'ObservationStatusCodeTypeOutput' and no longer a string, limited to 4 options (registered | preliminary | final | amended)

  - for ConditionOutput
    - 'status' field is now a 'ResearchStudyStatusCodeTypeOutput' and no longer a string

  - for FollowupRecommendationInferenceOutput
    - Renamed 'effectiveDateTime' field into 'effectiveAt'

  - for RecommendationFindingOutput
    - 'recommendationFindingStatus' field is now a RecommendationFindingStatusTypeOutput and no longer a string
    - 'extension' field added

  - for ProcedureRecommendationOutputParent
    - 'extension' field added

  - for FollowupCommunication
    - Renamed 'dateTime' field into 'communicatedAt'
    - 'recipient' field is now a 'MedicalProfessionalTypeOutput' and no longer a string[]

  - Subsitute Date objects by a string object (createdAt and birthDate).

## 1.0.0-beta.1 (2024-03-05)

### Other Changes

- Public Preview release
- Test example for Critical Result

The package of @azure-rest/health-insights-radiologyinsights is using our next generation design principles.
- First release of package, see [README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/README.md) for details.
- To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).
- To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).
- To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).

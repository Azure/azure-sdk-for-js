# Release History

## 1.0.0 (2024-05-07)

 - GA release
 
 ### Features Added
- Added sample code for all Inference types
- Added tests for all Inference types
- Rename param endpoint to endpointParam
- Rename const baseUrl to endpointUrl

 ### Breaking Changes

- Client Changes
    - POST call replaced with PUT (this change is taken care of automatically by the SDK)
    - Adding TokenCredential next to KeyCredential

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

## 1.0.0-beta.1 (2024-03-05)

### Other Changes

- Public Preview release
- Test example for Critical Result

The package of @azure-rest/health-insights-radiologyinsights is using our next generation design principles.
- First release of package, see [README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/README.md) for details.
- To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).
- To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).
- To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).

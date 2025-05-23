# Release History
    
## 3.3.0-beta.1 (2025-05-23)
Compared with version 3.2.0
    
### Features Added

  - Added operation group AdvisorScores
  - Added operation group Assessments
  - Added operation group AssessmentTypes
  - Added operation group ResiliencyReviews
  - Added operation group TriageRecommendations
  - Added operation group TriageResources
  - Added operation group Workloads
  - Added operation Recommendations.patch
  - Added Interface AdvisorScoreEntity
  - Added Interface AdvisorScoreEntityProperties
  - Added Interface AdvisorScoreResponse
  - Added Interface AdvisorScoresGetOptionalParams
  - Added Interface AdvisorScoresListOptionalParams
  - Added Interface AssessmentListResult
  - Added Interface AssessmentResult
  - Added Interface AssessmentsDeleteOptionalParams
  - Added Interface AssessmentsGetOptionalParams
  - Added Interface AssessmentsListNextOptionalParams
  - Added Interface AssessmentsListOptionalParams
  - Added Interface AssessmentsPutOptionalParams
  - Added Interface AssessmentTypeListResult
  - Added Interface AssessmentTypeResult
  - Added Interface AssessmentTypesListNextOptionalParams
  - Added Interface AssessmentTypesListOptionalParams
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface PredictionRequest
  - Added Interface PredictionResponse
  - Added Interface PredictOptionalParams
  - Added Interface ProxyResource
  - Added Interface RecommendationPropertiesResourceWorkload
  - Added Interface RecommendationPropertiesReview
  - Added Interface RecommendationRejectBody
  - Added Interface RecommendationsPatchOptionalParams
  - Added Interface ResiliencyReview
  - Added Interface ResiliencyReviewCollection
  - Added Interface ResiliencyReviewsGetOptionalParams
  - Added Interface ResiliencyReviewsListNextOptionalParams
  - Added Interface ResiliencyReviewsListOptionalParams
  - Added Interface ScoreEntity
  - Added Interface SystemData
  - Added Interface TimeSeriesEntityItem
  - Added Interface TrackedRecommendationProperties
  - Added Interface TrackedRecommendationPropertiesPayload
  - Added Interface TrackedRecommendationPropertiesPayloadProperties
  - Added Interface TriageRecommendation
  - Added Interface TriageRecommendationCollection
  - Added Interface TriageRecommendationsApproveTriageRecommendationOptionalParams
  - Added Interface TriageRecommendationsGetOptionalParams
  - Added Interface TriageRecommendationsListNextOptionalParams
  - Added Interface TriageRecommendationsListOptionalParams
  - Added Interface TriageRecommendationsRejectTriageRecommendationOptionalParams
  - Added Interface TriageRecommendationsResetTriageRecommendationOptionalParams
  - Added Interface TriageResource
  - Added Interface TriageResourceCollection
  - Added Interface TriageResourcesGetOptionalParams
  - Added Interface TriageResourcesListNextOptionalParams
  - Added Interface TriageResourcesListOptionalParams
  - Added Interface WorkloadListResult
  - Added Interface WorkloadResult
  - Added Interface WorkloadsListNextOptionalParams
  - Added Interface WorkloadsListOptionalParams
  - Added Type Alias AdvisorScoresGetResponse
  - Added Type Alias AdvisorScoresListResponse
  - Added Type Alias Aggregated
  - Added Type Alias AssessmentsGetResponse
  - Added Type Alias AssessmentsListNextResponse
  - Added Type Alias AssessmentsListResponse
  - Added Type Alias AssessmentsPutResponse
  - Added Type Alias AssessmentTypesListNextResponse
  - Added Type Alias AssessmentTypesListResponse
  - Added Type Alias CreatedByType
  - Added Type Alias Duration
  - Added Type Alias PredictionType
  - Added Type Alias PredictResponse
  - Added Type Alias Priority
  - Added Type Alias PriorityName
  - Added Type Alias Reason
  - Added Type Alias ReasonForRejectionName
  - Added Type Alias RecommendationsPatchResponse
  - Added Type Alias RecommendationStatusName
  - Added Type Alias ResiliencyReviewsGetResponse
  - Added Type Alias ResiliencyReviewsListNextResponse
  - Added Type Alias ResiliencyReviewsListResponse
  - Added Type Alias ReviewStatus
  - Added Type Alias State
  - Added Type Alias TriageRecommendationsGetResponse
  - Added Type Alias TriageRecommendationsListNextResponse
  - Added Type Alias TriageRecommendationsListResponse
  - Added Type Alias TriageResourcesGetResponse
  - Added Type Alias TriageResourcesListNextResponse
  - Added Type Alias TriageResourcesListResponse
  - Added Type Alias WorkloadsListNextResponse
  - Added Type Alias WorkloadsListResponse
  - Interface ConfigData has a new optional parameter duration
  - Interface Resource has a new optional parameter systemData
  - Interface ResourceRecommendationBase has a new optional parameter notes
  - Interface ResourceRecommendationBase has a new optional parameter resourceWorkload
  - Interface ResourceRecommendationBase has a new optional parameter review
  - Interface ResourceRecommendationBase has a new optional parameter sourceSystem
  - Interface ResourceRecommendationBase has a new optional parameter tracked
  - Interface ResourceRecommendationBase has a new optional parameter trackedProperties
  - Added Enum KnownAggregated
  - Added Enum KnownCreatedByType
  - Added Enum KnownDuration
  - Added Enum KnownPredictionType
  - Added Enum KnownPriority
  - Added Enum KnownPriorityName
  - Added Enum KnownReason
  - Added Enum KnownReasonForRejectionName
  - Added Enum KnownRecommendationStatusName
  - Added Enum KnownReviewStatus
  - Added Enum KnownState
    
## 3.2.0 (2023-08-03)

### Features Added

- Class AdvisorManagementClient has a new signature
- Interface RecommendationsListNextOptionalParams no longer has parameter filter
- Interface RecommendationsListNextOptionalParams no longer has parameter skipToken
- Interface RecommendationsListNextOptionalParams no longer has parameter top
- Interface SuppressionsListNextOptionalParams no longer has parameter skipToken
- Interface SuppressionsListNextOptionalParams no longer has parameter top

## 3.1.0 (2022-11-14)

### Features Added

- Added Interface ConfigData
- Added Interface ResourceRecommendationBase
- Added Interface SuppressionContract

## 3.0.3 (2022-10-08)

### Bugs Fixed

- revert credential scopes

## 3.0.2 (2022-09-30)

### Bugs Fixed

- fix better user experience of credential scopes in government cloud

## 3.0.1 (2022-03-22)

**features**

- bug fix

## 3.0.0 (2021-12-29)

The package of @azure/arm-advisor is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

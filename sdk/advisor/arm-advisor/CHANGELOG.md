# Release History

## 4.0.0-beta.1 (2026-06-03)
Compared with version 3.2.0

### Features Added
  - Added operation group AdvisorScoresOperations
  - Added operation group AssessmentsOperations
  - Added operation group AssessmentTypesOperations
  - Added operation group ResiliencyReviewsOperations
  - Added operation group TriageRecommendationsOperations
  - Added operation group TriageResourcesOperations
  - Added operation group WorkloadsOperations
  - Added operation RecommendationsOperations.listByTenant
  - Added operation RecommendationsOperations.update
  - Class AdvisorManagementClient has a new constructor "predict(predictionRequest: PredictionRequest, options?: PredictOptionalParams): Promise<PredictionResponse>;"
  - Added Interface AdvisorScoreEntity
  - Added Interface AdvisorScoreEntityProperties
  - Added Interface AdvisorScoresGetOptionalParams
  - Added Interface AdvisorScoresListOptionalParams
  - Added Interface AssessmentResult
  - Added Interface AssessmentResultProperties
  - Added Interface AssessmentsDeleteOptionalParams
  - Added Interface AssessmentsGetOptionalParams
  - Added Interface AssessmentsListOptionalParams
  - Added Interface AssessmentsPutOptionalParams
  - Added Interface AssessmentTypeResult
  - Added Interface AssessmentTypesListOptionalParams
  - Added Interface ConfigDataProperties
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface ExtensionResource
  - Added Interface MetadataEntityProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PredictionRequest
  - Added Interface PredictionRequestProperties
  - Added Interface PredictionResponse
  - Added Interface PredictionResponseProperties
  - Added Interface PredictOptionalParams
  - Added Interface ProxyResource
  - Added Interface RecommendationPatchPayload
  - Added Interface RecommendationProperties
  - Added Interface RecommendationPropertiesResourceWorkload
  - Added Interface RecommendationPropertiesReview
  - Added Interface RecommendationRejectBody
  - Added Interface RecommendationsListByTenantOptionalParams
  - Added Interface RecommendationStatePropertiesPayload
  - Added Interface RecommendationsUpdateOptionalParams
  - Added Interface ResiliencyReview
  - Added Interface ResiliencyReviewProperties
  - Added Interface ResiliencyReviewsGetOptionalParams
  - Added Interface ResiliencyReviewsListOptionalParams
  - Added Interface ScoreEntity
  - Added Interface SuppressionProperties
  - Added Interface SystemData
  - Added Interface TimeSeriesEntity
  - Added Interface TrackedRecommendationProperties
  - Added Interface TriageRecommendation
  - Added Interface TriageRecommendationProperties
  - Added Interface TriageRecommendationsApproveTriageRecommendationOptionalParams
  - Added Interface TriageRecommendationsGetOptionalParams
  - Added Interface TriageRecommendationsListOptionalParams
  - Added Interface TriageRecommendationsRejectTriageRecommendationOptionalParams
  - Added Interface TriageRecommendationsResetTriageRecommendationOptionalParams
  - Added Interface TriageResource
  - Added Interface TriageResourceProperties
  - Added Interface TriageResourcesGetOptionalParams
  - Added Interface TriageResourcesListOptionalParams
  - Added Interface WorkloadResult
  - Added Interface WorkloadsListOptionalParams
  - Interface ConfigData has a new optional parameter duration
  - Interface ConfigData has a new optional parameter systemData
  - Interface MetadataEntity has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface ResourceRecommendationBase has a new optional parameter completionType
  - Interface ResourceRecommendationBase has a new optional parameter control
  - Interface ResourceRecommendationBase has a new optional parameter createdTime
  - Interface ResourceRecommendationBase has a new optional parameter lastRefreshed
  - Interface ResourceRecommendationBase has a new optional parameter notes
  - Interface ResourceRecommendationBase has a new optional parameter postponedUntilDateTime
  - Interface ResourceRecommendationBase has a new optional parameter recommendationDismissReason
  - Interface ResourceRecommendationBase has a new optional parameter recommendationStatus
  - Interface ResourceRecommendationBase has a new optional parameter resourceWorkload
  - Interface ResourceRecommendationBase has a new optional parameter review
  - Interface ResourceRecommendationBase has a new optional parameter sourceSystem
  - Interface ResourceRecommendationBase has a new optional parameter suppressionId
  - Interface ResourceRecommendationBase has a new optional parameter trackedProperties
  - Interface ResourceRecommendationBase has a new optional parameter systemData
  - Interface SuppressionContract has a new optional parameter systemData
  - Added Type Alias Aggregated
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias Control
  - Added Type Alias CreatedByType
  - Added Type Alias Duration
  - Added Type Alias PredictionType
  - Added Type Alias Priority
  - Added Type Alias PriorityName
  - Added Type Alias ReasonForRejectionName
  - Added Type Alias RecommendationDismissReason
  - Added Type Alias RecommendationStatus
  - Added Type Alias RecommendationStatusName
  - Added Type Alias ReviewStatus
  - Added Enum AzureClouds
  - Added Enum KnownAggregated
  - Added Enum KnownControl
  - Added Enum KnownCreatedByType
  - Added Enum KnownDuration
  - Added Enum KnownPredictionType
  - Added Enum KnownPriority
  - Added Enum KnownPriorityName
  - Added Enum KnownReasonForRejectionName
  - Added Enum KnownRecommendationDismissReason
  - Added Enum KnownRecommendationStatus
  - Added Enum KnownRecommendationStatusName
  - Added Enum KnownReviewStatus
  - Added Enum KnownVersions

### Breaking Changes
  - Operation Recommendations.generate has a new signature
  - Class AdvisorManagementClient no longer has parameter apiVersion
  - Class AdvisorManagementClient no longer has parameter subscriptionId
  - Interface ResourceRecommendationBase no longer has parameter suppressionIds

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

# Release History

## 2.1.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.1.1 (2022-11-28)

**Features**

-  Exposes `getContinuationToken` helper function to extract continuation token

**Bugs Fixed**

- A series of small bug fixs relevant to authentication and apiVersion policy

## 2.1.0 (2022-11-01)
    
**Features**

  - Added operation group Schedules
  - Added Interface AutoForecastHorizon
  - Added Interface AutoMLJob
  - Added Interface AutoMLVertical
  - Added Interface AutoNCrossValidations
  - Added Interface AutoSeasonality
  - Added Interface AutoTargetLags
  - Added Interface AutoTargetRollingWindowSize
  - Added Interface Classification
  - Added Interface ClassificationTrainingSettings
  - Added Interface ColumnTransformer
  - Added Interface CronTrigger
  - Added Interface CustomForecastHorizon
  - Added Interface CustomNCrossValidations
  - Added Interface CustomSeasonality
  - Added Interface CustomTargetLags
  - Added Interface CustomTargetRollingWindowSize
  - Added Interface DeploymentResourceConfiguration
  - Added Interface EndpointScheduleAction
  - Added Interface FeaturizationSettings
  - Added Interface ForecastHorizon
  - Added Interface Forecasting
  - Added Interface ForecastingSettings
  - Added Interface ForecastingTrainingSettings
  - Added Interface ImageClassification
  - Added Interface ImageClassificationBase
  - Added Interface ImageClassificationMultilabel
  - Added Interface ImageInstanceSegmentation
  - Added Interface ImageLimitSettings
  - Added Interface ImageModelDistributionSettings
  - Added Interface ImageModelDistributionSettingsClassification
  - Added Interface ImageModelDistributionSettingsObjectDetection
  - Added Interface ImageModelSettings
  - Added Interface ImageModelSettingsClassification
  - Added Interface ImageModelSettingsObjectDetection
  - Added Interface ImageObjectDetection
  - Added Interface ImageObjectDetectionBase
  - Added Interface ImageSweepSettings
  - Added Interface ImageVertical
  - Added Interface JobResourceConfiguration
  - Added Interface JobScheduleAction
  - Added Interface NCrossValidations
  - Added Interface NlpVertical
  - Added Interface NlpVerticalFeaturizationSettings
  - Added Interface NlpVerticalLimitSettings
  - Added Interface RecurrenceSchedule
  - Added Interface RecurrenceTrigger
  - Added Interface Regression
  - Added Interface RegressionTrainingSettings
  - Added Interface Schedule
  - Added Interface ScheduleActionBase
  - Added Interface ScheduleProperties
  - Added Interface ScheduleResourceArmPaginatedResult
  - Added Interface SchedulesCreateOrUpdateHeaders
  - Added Interface SchedulesCreateOrUpdateOptionalParams
  - Added Interface SchedulesDeleteHeaders
  - Added Interface SchedulesDeleteOptionalParams
  - Added Interface SchedulesGetOptionalParams
  - Added Interface SchedulesListNextOptionalParams
  - Added Interface SchedulesListOptionalParams
  - Added Interface Seasonality
  - Added Interface StackEnsembleSettings
  - Added Interface TableVertical
  - Added Interface TableVerticalFeaturizationSettings
  - Added Interface TableVerticalLimitSettings
  - Added Interface TargetLags
  - Added Interface TargetRollingWindowSize
  - Added Interface TextClassification
  - Added Interface TextClassificationMultilabel
  - Added Interface TextNer
  - Added Interface TrainingSettings
  - Added Interface TriggerBase
  - Added Type Alias AutoMLVerticalUnion
  - Added Type Alias AutoRebuildSetting
  - Added Type Alias BlockedTransformers
  - Added Type Alias ClassificationModels
  - Added Type Alias ClassificationMultilabelPrimaryMetrics
  - Added Type Alias ClassificationPrimaryMetrics
  - Added Type Alias EgressPublicNetworkAccessType
  - Added Type Alias FeatureLags
  - Added Type Alias FeaturizationMode
  - Added Type Alias ForecastHorizonMode
  - Added Type Alias ForecastHorizonUnion
  - Added Type Alias ForecastingModels
  - Added Type Alias ForecastingPrimaryMetrics
  - Added Type Alias InstanceSegmentationPrimaryMetrics
  - Added Type Alias LearningRateScheduler
  - Added Type Alias LogVerbosity
  - Added Type Alias ModelSize
  - Added Type Alias NCrossValidationsMode
  - Added Type Alias NCrossValidationsUnion
  - Added Type Alias ObjectDetectionPrimaryMetrics
  - Added Type Alias PublicNetworkAccessType
  - Added Type Alias RecurrenceFrequency
  - Added Type Alias RegressionModels
  - Added Type Alias RegressionPrimaryMetrics
  - Added Type Alias ScheduleActionBaseUnion
  - Added Type Alias ScheduleActionType
  - Added Type Alias ScheduleListViewType
  - Added Type Alias ScheduleProvisioningStatus
  - Added Type Alias SchedulesCreateOrUpdateResponse
  - Added Type Alias SchedulesGetResponse
  - Added Type Alias SchedulesListNextResponse
  - Added Type Alias SchedulesListResponse
  - Added Type Alias SeasonalityMode
  - Added Type Alias SeasonalityUnion
  - Added Type Alias ShortSeriesHandlingConfiguration
  - Added Type Alias StackMetaLearnerType
  - Added Type Alias StochasticOptimizer
  - Added Type Alias TargetAggregationFunction
  - Added Type Alias TargetLagsMode
  - Added Type Alias TargetLagsUnion
  - Added Type Alias TargetRollingWindowSizeMode
  - Added Type Alias TargetRollingWindowSizeUnion
  - Added Type Alias TaskType
  - Added Type Alias TriggerBaseUnion
  - Added Type Alias TriggerType
  - Added Type Alias UseStl
  - Added Type Alias ValidationMetricType
  - Added Type Alias WeekDay
  - Interface ComputeStartStopSchedule has a new optional parameter cron
  - Interface ComputeStartStopSchedule has a new optional parameter recurrence
  - Interface ComputeStartStopSchedule has a new optional parameter status
  - Interface ComputeStartStopSchedule has a new optional parameter triggerType
  - Interface EnvironmentVersionProperties has a new optional parameter autoRebuild
  - Interface JobBaseProperties has a new optional parameter componentId
  - Interface OnlineDeploymentProperties has a new optional parameter egressPublicNetworkAccess
  - Interface OnlineEndpointProperties has a new optional parameter publicNetworkAccess
  - Interface PipelineJob has a new optional parameter sourceJobId
  - Class AzureMachineLearningWorkspaces has a new parameter schedules
  - Added Enum KnownAutoRebuildSetting
  - Added Enum KnownBlockedTransformers
  - Added Enum KnownClassificationModels
  - Added Enum KnownClassificationMultilabelPrimaryMetrics
  - Added Enum KnownClassificationPrimaryMetrics
  - Added Enum KnownEgressPublicNetworkAccessType
  - Added Enum KnownFeatureLags
  - Added Enum KnownFeaturizationMode
  - Added Enum KnownForecastHorizonMode
  - Added Enum KnownForecastingModels
  - Added Enum KnownForecastingPrimaryMetrics
  - Added Enum KnownInstanceSegmentationPrimaryMetrics
  - Added Enum KnownLearningRateScheduler
  - Added Enum KnownLogVerbosity
  - Added Enum KnownModelSize
  - Added Enum KnownNCrossValidationsMode
  - Added Enum KnownObjectDetectionPrimaryMetrics
  - Added Enum KnownPublicNetworkAccessType
  - Added Enum KnownRecurrenceFrequency
  - Added Enum KnownRegressionModels
  - Added Enum KnownRegressionPrimaryMetrics
  - Added Enum KnownScheduleActionType
  - Added Enum KnownScheduleListViewType
  - Added Enum KnownScheduleProvisioningStatus
  - Added Enum KnownSeasonalityMode
  - Added Enum KnownShortSeriesHandlingConfiguration
  - Added Enum KnownStackMetaLearnerType
  - Added Enum KnownStochasticOptimizer
  - Added Enum KnownTargetAggregationFunction
  - Added Enum KnownTargetLagsMode
  - Added Enum KnownTargetRollingWindowSizeMode
  - Added Enum KnownTaskType
  - Added Enum KnownTriggerType
  - Added Enum KnownUseStl
  - Added Enum KnownValidationMetricType
  - Added Enum KnownWeekDay
  - Enum KnownJobType has a new value AutoML
    
    
## 2.0.0 (2022-08-05)
    
**Breaking Changes**

  - Interface AzureBlobDatastore has a new required parameter datastoreType
  - Interface AzureDataLakeGen1Datastore has a new required parameter datastoreType
  - Interface AzureDataLakeGen2Datastore has a new required parameter datastoreType
  - Interface AzureFileDatastore has a new required parameter datastoreType
  - Interface CommandJob has a new required parameter jobType
  - Interface KubernetesOnlineDeployment has a new required parameter endpointComputeType
  - Interface ManagedOnlineDeployment has a new required parameter endpointComputeType
  - Interface MLTableData has a new required parameter dataType
  - Interface PipelineJob has a new required parameter jobType
  - Interface SweepJob has a new required parameter jobType
  - Interface UriFileDataVersion has a new required parameter dataType
  - Interface UriFolderDataVersion has a new required parameter dataType
    
    
## 1.0.0 (2022-07-13)

The package of @azure/arm-machinelearning is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).

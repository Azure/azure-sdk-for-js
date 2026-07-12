# Release History

## 1.0.0-beta.3 (2026-07-12)
Compared with version 1.0.0-beta.2

### Features Added
  - Added operation EntitiesOperations.addDataAnnotation
  - Added operation EntitiesOperations.getDataAnnotations
  - Added operation EntitiesOperations.getSignalRecommendations
  - Added Interface AddDataAnnotationRequest
  - Added Interface AzureResourceHealthSignal
  - Added Interface AzureResourceHealthSignalStatus
  - Added Interface DataAnnotation
  - Added Interface EntitiesAddDataAnnotationOptionalParams
  - Added Interface EntitiesGetDataAnnotationsOptionalParams
  - Added Interface EntitiesGetSignalRecommendationsOptionalParams
  - Added Interface GetDataAnnotationsRequest
  - Added Interface GetDataAnnotationsResponse
  - Added Interface GetSignalRecommendationsResponse
  - Added Interface SignalConfiguration
  - Interface AzureResourceSignals has a new optional parameter resourceHealth
  - Interface DiscoveryRuleProperties has a new optional parameter addResourceHealthSignal
  - Interface DiscoveryRulePropertiesCreate has a new optional parameter addResourceHealthSignal
  - Interface EntityHistoryRequest has a new optional parameter nextMarker
  - Interface EntityHistoryRequest has a new optional parameter top
  - Interface EntityHistoryResponse has a new optional parameter nextMarker
  - Interface SignalHistoryRequest has a new optional parameter nextMarker
  - Interface SignalHistoryRequest has a new optional parameter top
  - Interface SignalHistoryResponse has a new optional parameter nextMarker
  - Interface SignalStatus has a new optional parameter additionalContext
  - Interface ThresholdRuleV2 has a new optional parameter lookBackWindow
  - Interface ThresholdRuleV2 has a new optional parameter sensitivity
  - Added Type Alias DynamicThresholdSensitivity
  - Added Type Alias LookBackWindow
  - Added Type Alias ResourceHealthAvailabilityState
  - Added Type Alias ResourceHealthAvailabilityStateSignalBehavior
  - Added Type Alias ResourceHealthCategory
  - Added Type Alias ResourceHealthReasonChronicity
  - Added Type Alias ResourceHealthReasonType
  - Added Enum KnownDynamicThresholdSensitivity
  - Added Enum KnownLookBackWindow
  - Added Enum KnownResourceHealthAvailabilityState
  - Added Enum KnownResourceHealthAvailabilityStateSignalBehavior
  - Added Enum KnownResourceHealthCategory
  - Added Enum KnownResourceHealthReasonChronicity
  - Added Enum KnownResourceHealthReasonType
  - Enum KnownRefreshInterval has a new value PT15M
  - Enum KnownSignalOperator has a new value Dynamic
  - Enum KnownVersions has a new value V20260501Preview

### Breaking Changes
  - Operation EntitiesOperations.createOrUpdate has a new signature
  - Operation EntitiesOperations.get has a new signature
  - Operation EntitiesOperations.ingestHealthReport has a new signature
  - Operation EntitiesOperations.listByHealthModel has a new signature
  - Operation SignalDefinitionsOperations.createOrUpdate has a new signature
  - Operation SignalDefinitionsOperations.get has a new signature
  - Operation SignalDefinitionsOperations.listByHealthModel has a new signature
  - Interface AzureResourceSignal no longer has parameter dimension
  - Interface ResourceMetricSignalDefinitionProperties no longer has parameter dimension
  - Parameter threshold of interface ThresholdRuleV2 is now optional

    
## 1.0.0-beta.2 (2026-06-12)

### Features Added
  - Added operation EntitiesOperations.getHistory
  - Added operation EntitiesOperations.getSignalHistory
  - Added operation EntitiesOperations.ingestHealthReport
  - Added Interface ApplicationInsightsTopologySpecification
  - Added Interface AzureMonitorWorkspaceSignals
  - Added Interface AzureResourceSignal
  - Added Interface AzureResourceSignals
  - Added Interface DependenciesSignalGroupV2
  - Added Interface DiscoveryError
  - Added Interface DiscoveryRulePropertiesCreate
  - Added Interface DiscoveryRuleResourceCreate
  - Added Interface DiscoveryRuleSpecification
  - Added Interface EntitiesGetHistoryOptionalParams
  - Added Interface EntitiesGetSignalHistoryOptionalParams
  - Added Interface EntitiesIngestHealthReportOptionalParams
  - Added Interface EntityHistoryRequest
  - Added Interface EntityHistoryResponse
  - Added Interface ExternalSignal
  - Added Interface ExternalSignalGroup
  - Added Interface HealthReportEvaluationRule
  - Added Interface HealthReportRequest
  - Added Interface HealthStateTransition
  - Added Interface LogAnalyticsSignal
  - Added Interface LogAnalyticsSignals
  - Added Interface PrometheusMetricsSignal
  - Added Interface ResourceGraphQuerySpecification
  - Added Interface SignalGroups
  - Added Interface SignalHistoryDataPoint
  - Added Interface SignalHistoryRequest
  - Added Interface SignalHistoryResponse
  - Added Interface SignalInstanceProperties
  - Added Interface SignalStatus
  - Added Interface ThresholdRuleV2
  - Interface AuthenticationSettingsCreateOrUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface AuthenticationSettingsDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Interface CloudHealthClientOptionalParams has a new optional parameter cloudSetting
  - Interface DiscoveryRuleProperties has a new optional parameter error
  - Interface DiscoveryRulesCreateOrUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface DiscoveryRulesDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Interface EntitiesCreateOrUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface EntitiesDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Interface EntityProperties has a new optional parameter signalGroups
  - Interface EntityProperties has a new optional parameter tags
  - Interface LogAnalyticsQuerySignalDefinitionProperties has a new optional parameter tags
  - Interface PrometheusMetricsSignalDefinitionProperties has a new optional parameter tags
  - Interface RelationshipProperties has a new optional parameter tags
  - Interface RelationshipsCreateOrUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface RelationshipsDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Interface ResourceMetricSignalDefinitionProperties has a new optional parameter tags
  - Interface SignalDefinitionProperties has a new optional parameter tags
  - Interface SignalDefinitionsCreateOrUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface SignalDefinitionsDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias DependenciesAggregationUnit
  - Added Type Alias DiscoveryRuleKind
  - Added Type Alias DiscoveryRuleSpecificationUnion
  - Added Type Alias SignalInstancePropertiesUnion
  - Added Enum AzureClouds
  - Added Enum KnownDependenciesAggregationUnit
  - Added Enum KnownDiscoveryRuleKind
  - Enum KnownDependenciesAggregationType has a new value MaxNotHealthy
  - Enum KnownDependenciesAggregationType has a new value MinHealthy
  - Enum KnownHealthState has a new value Unhealthy
  - Enum KnownSignalKind has a new value ExternalSignal
  - Enum KnownSignalOperator has a new value Equal
  - Enum KnownSignalOperator has a new value GreaterThanOrEqual
  - Enum KnownSignalOperator has a new value LessThan
  - Enum KnownSignalOperator has a new value LessThanOrEqual
  - Enum KnownSignalOperator has a new value NotEqual
  - Enum KnownVersions has a new value V20260101Preview

### Breaking Changes
  - Operation DiscoveryRules.createOrUpdate has a new signature
  - Operation DiscoveryRules.get has a new signature
  - Operation DiscoveryRules.listByHealthModel has a new signature
  - Operation SignalDefinitions.createOrUpdate has a new signature
  - Operation SignalDefinitions.get has a new signature
  - Operation SignalDefinitions.listByHealthModel has a new signature
  - Removed Interface AzureMonitorWorkspaceSignalGroup
  - Removed Interface AzureResourceSignalGroup
  - Removed Interface DependenciesSignalGroup
  - Removed Interface DynamicDetectionRule
  - Removed Interface HealthModelUpdateProperties
  - Removed Interface LogAnalyticsSignalGroup
  - Removed Interface ModelDiscoverySettings
  - Removed Interface SignalAssignment
  - Removed Interface SignalGroup
  - Removed Interface ThresholdRule
  - Interface DiscoveryRuleProperties has a new required parameter specification
  - Type of parameter degradedRule of interface EvaluationRule is changed from ThresholdRule to ThresholdRuleV2
  - Type of parameter unhealthyRule of interface EvaluationRule is changed from ThresholdRule to ThresholdRuleV2
  - Interface DiscoveryRuleProperties no longer has parameter deletionDate
  - Interface DiscoveryRuleProperties no longer has parameter errorMessage
  - Interface DiscoveryRuleProperties no longer has parameter numberOfDiscoveredEntities
  - Interface DiscoveryRuleProperties no longer has parameter resourceGraphQuery
  - Interface EntityProperties no longer has parameter deletionDate
  - Interface EntityProperties no longer has parameter kind
  - Interface EntityProperties no longer has parameter labels
  - Interface EntityProperties no longer has parameter signals
  - Interface EvaluationRule no longer has parameter dynamicDetectionRule
  - Interface HealthModelProperties no longer has parameter dataplaneEndpoint
  - Interface HealthModelProperties no longer has parameter discovery
  - Interface HealthModelUpdate no longer has parameter properties
  - Interface LogAnalyticsQuerySignalDefinitionProperties no longer has parameter deletionDate
  - Interface LogAnalyticsQuerySignalDefinitionProperties no longer has parameter labels
  - Interface PrometheusMetricsSignalDefinitionProperties no longer has parameter deletionDate
  - Interface PrometheusMetricsSignalDefinitionProperties no longer has parameter labels
  - Interface RelationshipProperties no longer has parameter deletionDate
  - Interface RelationshipProperties no longer has parameter labels
  - Interface ResourceMetricSignalDefinitionProperties no longer has parameter deletionDate
  - Interface ResourceMetricSignalDefinitionProperties no longer has parameter labels
  - Interface SignalDefinitionProperties no longer has parameter deletionDate
  - Interface SignalDefinitionProperties no longer has parameter labels
  - Parameter unhealthyRule of interface EvaluationRule is now required
  - Removed Type Alias DynamicThresholdDirection
  - Removed Type Alias DynamicThresholdModel
  - Removed Enum KnownDynamicThresholdDirection
  - Removed Enum KnownDynamicThresholdModel
  - Enum KnownDependenciesAggregationType no longer has value Thresholds
  - Enum KnownHealthState no longer has value Error
  - Enum KnownSignalOperator no longer has value Equals
  - Enum KnownSignalOperator no longer has value GreaterOrEquals
  - Enum KnownSignalOperator no longer has value LowerOrEquals
  - Enum KnownSignalOperator no longer has value LowerThan

## 1.0.0-beta.1 (2025-06-04)

### Features Added

This is the first preview release of the @azure/arm-cloudhealth package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.

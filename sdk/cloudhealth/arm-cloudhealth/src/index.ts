// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CloudHealthClient } from "./cloudHealthClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  HealthModelUpdate,
  ProxyResource,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
} from "./models/index.js";
export type {
  DiscoveryRuleResourceCreate,
  DiscoveryRulePropertiesCreate,
} from "./models/customizations/index.js";
export type {
  HealthModel,
  HealthModelProperties,
  HealthModelProvisioningState,
  SignalDefinition,
  SignalDefinitionProperties,
  SignalDefinitionPropertiesUnion,
  SignalKind,
  RefreshInterval,
  EvaluationRule,
  ThresholdRuleV2,
  SignalOperator,
  DynamicThresholdSensitivity,
  LookBackWindow,
  ResourceMetricSignalDefinitionProperties,
  MetricAggregationType,
  LogAnalyticsQuerySignalDefinitionProperties,
  PrometheusMetricsSignalDefinitionProperties,
  AuthenticationSetting,
  AuthenticationSettingProperties,
  AuthenticationSettingPropertiesUnion,
  AuthenticationKind,
  ManagedIdentityAuthenticationSettingProperties,
  Entity,
  EntityProperties,
  EntityCoordinates,
  IconDefinition,
  EntityImpact,
  SignalGroups,
  AzureResourceSignals,
  AzureResourceSignal,
  AzureResourceHealthSignal,
  ResourceHealthAvailabilityStateSignalBehavior,
  AzureResourceHealthSignalStatus,
  HealthState,
  ResourceHealthAvailabilityState,
  ResourceHealthCategory,
  ResourceHealthReasonType,
  ResourceHealthReasonChronicity,
  LogAnalyticsSignals,
  LogAnalyticsSignal,
  AzureMonitorWorkspaceSignals,
  PrometheusMetricsSignal,
  DependenciesSignalGroupV2,
  DependenciesAggregationType,
  DependenciesAggregationUnit,
  ExternalSignalGroup,
  ExternalSignal,
  EntityAlerts,
  AlertConfiguration,
  AlertSeverity,
  SignalInstanceProperties,
  SignalInstancePropertiesUnion,
  SignalStatus,
  EntityHistoryRequest,
  EntityHistoryResponse,
  HealthStateTransition,
  SignalHistoryRequest,
  SignalHistoryResponse,
  SignalHistoryDataPoint,
  HealthReportRequest,
  HealthReportEvaluationRule,
  AddDataAnnotationRequest,
  DataAnnotation,
  GetDataAnnotationsRequest,
  GetDataAnnotationsResponse,
  GetSignalRecommendationsResponse,
  SignalConfiguration,
  Relationship,
  RelationshipProperties,
  DiscoveryRule,
  DiscoveryRuleProperties,
  DiscoveryRuleRelationshipDiscoveryBehavior,
  DiscoveryRuleRecommendedSignalsBehavior,
  DiscoveryRuleSpecification,
  DiscoveryRuleSpecificationUnion,
  DiscoveryRuleKind,
  ResourceGraphQuerySpecification,
  ApplicationInsightsTopologySpecification,
  DiscoveryError,
} from "./models/microsoft/cloudHealth/index.js";
export {
  KnownHealthModelProvisioningState,
  KnownSignalKind,
  KnownRefreshInterval,
  KnownSignalOperator,
  KnownDynamicThresholdSensitivity,
  KnownLookBackWindow,
  KnownMetricAggregationType,
  KnownAuthenticationKind,
  KnownEntityImpact,
  KnownResourceHealthAvailabilityStateSignalBehavior,
  KnownHealthState,
  KnownResourceHealthAvailabilityState,
  KnownResourceHealthCategory,
  KnownResourceHealthReasonType,
  KnownResourceHealthReasonChronicity,
  KnownDependenciesAggregationType,
  KnownDependenciesAggregationUnit,
  KnownAlertSeverity,
  KnownDiscoveryRuleRelationshipDiscoveryBehavior,
  KnownDiscoveryRuleRecommendedSignalsBehavior,
  KnownDiscoveryRuleKind,
} from "./models/microsoft/cloudHealth/index.js";
export type { CloudHealthClientOptionalParams } from "./api/index.js";
export type {
  AuthenticationSettingsListByHealthModelOptionalParams,
  AuthenticationSettingsDeleteOptionalParams,
  AuthenticationSettingsCreateOrUpdateOptionalParams,
  AuthenticationSettingsGetOptionalParams,
} from "./api/authenticationSettings/index.js";
export type {
  DiscoveryRulesListByHealthModelOptionalParams,
  DiscoveryRulesDeleteOptionalParams,
  DiscoveryRulesCreateOrUpdateOptionalParams,
  DiscoveryRulesGetOptionalParams,
} from "./api/discoveryRules/index.js";
export type {
  EntitiesGetSignalRecommendationsOptionalParams,
  EntitiesGetDataAnnotationsOptionalParams,
  EntitiesAddDataAnnotationOptionalParams,
  EntitiesIngestHealthReportOptionalParams,
  EntitiesGetSignalHistoryOptionalParams,
  EntitiesGetHistoryOptionalParams,
  EntitiesListByHealthModelOptionalParams,
  EntitiesDeleteOptionalParams,
  EntitiesCreateOrUpdateOptionalParams,
  EntitiesGetOptionalParams,
} from "./api/entities/index.js";
export type {
  HealthModelsListBySubscriptionOptionalParams,
  HealthModelsListByResourceGroupOptionalParams,
  HealthModelsDeleteOptionalParams,
  HealthModelsUpdateOptionalParams,
  HealthModelsCreateOptionalParams,
  HealthModelsGetOptionalParams,
} from "./api/healthModels/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  RelationshipsListByHealthModelOptionalParams,
  RelationshipsDeleteOptionalParams,
  RelationshipsCreateOrUpdateOptionalParams,
  RelationshipsGetOptionalParams,
} from "./api/relationships/index.js";
export type {
  SignalDefinitionsListByHealthModelOptionalParams,
  SignalDefinitionsDeleteOptionalParams,
  SignalDefinitionsCreateOrUpdateOptionalParams,
  SignalDefinitionsGetOptionalParams,
} from "./api/signalDefinitions/index.js";
export type {
  AuthenticationSettingsOperations,
  DiscoveryRulesOperations,
  EntitiesOperations,
  HealthModelsOperations,
  OperationsOperations,
  RelationshipsOperations,
  SignalDefinitionsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";

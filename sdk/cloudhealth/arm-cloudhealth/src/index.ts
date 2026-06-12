// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
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
  HealthModel,
  HealthModelProperties,
  HealthModelProvisioningState,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  HealthModelUpdate,
  SignalDefinition,
  SignalDefinitionProperties,
  SignalDefinitionPropertiesUnion,
  SignalKind,
  RefreshInterval,
  EvaluationRule,
  ThresholdRuleV2,
  SignalOperator,
  ResourceMetricSignalDefinitionProperties,
  MetricAggregationType,
  LogAnalyticsQuerySignalDefinitionProperties,
  PrometheusMetricsSignalDefinitionProperties,
  ProxyResource,
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
  LogAnalyticsSignals,
  LogAnalyticsSignal,
  AzureMonitorWorkspaceSignals,
  PrometheusMetricsSignal,
  DependenciesSignalGroupV2,
  DependenciesAggregationType,
  DependenciesAggregationUnit,
  ExternalSignalGroup,
  ExternalSignal,
  HealthState,
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
  DiscoveryRuleResourceCreate,
  DiscoveryRulePropertiesCreate,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownHealthModelProvisioningState,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownSignalKind,
  KnownRefreshInterval,
  KnownSignalOperator,
  KnownMetricAggregationType,
  KnownAuthenticationKind,
  KnownEntityImpact,
  KnownDependenciesAggregationType,
  KnownDependenciesAggregationUnit,
  KnownHealthState,
  KnownAlertSeverity,
  KnownDiscoveryRuleRelationshipDiscoveryBehavior,
  KnownDiscoveryRuleRecommendedSignalsBehavior,
  KnownDiscoveryRuleKind,
  KnownVersions,
} from "./models/index.js";
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

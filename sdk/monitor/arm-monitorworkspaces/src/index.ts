// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MonitorClient } from "./monitorClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  ArmOrigin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  AzureMonitorWorkspaceResource,
  AzureMonitorWorkspace,
  AzureMonitorWorkspaceMetrics,
  ResourceProvisioningState,
  AzureMonitorWorkspaceDefaultIngestionSettings,
  IngestionEndpoints,
  AzureMonitorWorkspaceEndpoints,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  PublicNetworkAccess,
  AzureMonitorWorkspaceActions,
  DefaultActionGroupResource,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  Resource,
  SystemData,
  CreatedByType,
  TrackedResource,
  AzureMonitorWorkspaceResourceUpdate,
  IssueResourceCreate,
  IssuePayloadCreate,
  Status,
  Background,
  BackgroundDetails,
  ProxyResource,
  IssueResource,
  IssueProperties,
  InvestigationMetadata,
  Notifications,
  IssueNotificationType,
  IssueNotificationTypeUnion,
  UpdateType,
  IssueCreationNotificationType,
  OnChangeNotificationType,
  TimeBasedUpdatesNotificationType,
  IssueResourceUpdate,
  IssuePropertiesUpdate,
  InvestigationResult,
  Origin,
  AddedByType,
  FetchInvestigationResultParameters,
  ListParameter,
  PagedRelatedAlert,
  RelatedAlert,
  Relevance,
  RelatedAlertsCreate,
  RelatedAlertCreate,
  RelatedAlerts,
  PagedRelatedResource,
  RelatedResource,
  RelatedResourcesCreate,
  RelatedResourceCreate,
  RelatedResources,
  BackgroundVisualization,
  BackgroundVisualizationCreate,
  MetricsContainerResource,
  MetricsContainer,
  MetricsLimits,
  MetricNamespaceResource,
  MetricNamespaceProperties,
  MetricConfigurationResource,
  MetricConfigurationProperties,
  MetricConfigurationType,
  MetricAggregationConfiguration,
  MetricAggregationFunctions,
  TraceContainerResource,
  TraceContainer,
  TraceMetricsState,
  TraceAssociationResource,
  TraceAssociation,
  ExtensionResource,
} from "./models/index.js";
export {
  KnownArmOrigin,
  KnownActionType,
  KnownResourceProvisioningState,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownPublicNetworkAccess,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownStatus,
  KnownUpdateType,
  KnownAddedByType,
  KnownRelevance,
  KnownMetricConfigurationType,
  KnownTraceMetricsState,
  KnownVersions,
} from "./models/index.js";
export type { MonitorClientOptionalParams } from "./api/index.js";
export type {
  AzureMonitorWorkspacesListBySubscriptionOptionalParams,
  AzureMonitorWorkspacesListByResourceGroupOptionalParams,
  AzureMonitorWorkspacesDeleteOptionalParams,
  AzureMonitorWorkspacesUpdateOptionalParams,
  AzureMonitorWorkspacesCreateOrUpdateOptionalParams,
  AzureMonitorWorkspacesGetOptionalParams,
} from "./api/azureMonitorWorkspaces/index.js";
export type {
  IssueSetBackgroundVisualizationOptionalParams,
  IssueFetchBackgroundVisualizationOptionalParams,
  IssueAddOrUpdateResourcesOptionalParams,
  IssueListResourcesOptionalParams,
  IssueAddOrUpdateAlertsOptionalParams,
  IssueListAlertsOptionalParams,
  IssueFetchInvestigationResultOptionalParams,
  IssueAddInvestigationResultOptionalParams,
  IssueListOptionalParams,
  IssueDeleteOptionalParams,
  IssueGetOptionalParams,
  IssueUpdateOptionalParams,
  IssueCreateOptionalParams,
} from "./api/issue/index.js";
export type {
  MetricConfigurationsListByMetricsContainerOptionalParams,
  MetricConfigurationsListByMetricNamespaceOptionalParams,
  MetricConfigurationsDeleteOptionalParams,
  MetricConfigurationsCreateOrUpdateOptionalParams,
  MetricConfigurationsGetOptionalParams,
} from "./api/metricConfigurations/index.js";
export type {
  MetricNamespacesListByMetricsContainerOptionalParams,
  MetricNamespacesGetOptionalParams,
} from "./api/metricNamespaces/index.js";
export type {
  MetricsContainersListByAzureMonitorWorkspaceOptionalParams,
  MetricsContainersCreateOrUpdateOptionalParams,
  MetricsContainersGetOptionalParams,
} from "./api/metricsContainers/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  TraceAssociationsListOptionalParams,
  TraceAssociationsDeleteOptionalParams,
  TraceAssociationsCreateOrUpdateOptionalParams,
  TraceAssociationsGetOptionalParams,
} from "./api/traceAssociations/index.js";
export type {
  TraceAssociationsAtResourceGroupListOptionalParams,
  TraceAssociationsAtResourceGroupDeleteOptionalParams,
  TraceAssociationsAtResourceGroupCreateOrUpdateOptionalParams,
  TraceAssociationsAtResourceGroupGetOptionalParams,
} from "./api/traceAssociationsAtResourceGroup/index.js";
export type {
  TraceAssociationsAtSubscriptionListOptionalParams,
  TraceAssociationsAtSubscriptionDeleteOptionalParams,
  TraceAssociationsAtSubscriptionCreateOrUpdateOptionalParams,
  TraceAssociationsAtSubscriptionGetOptionalParams,
} from "./api/traceAssociationsAtSubscription/index.js";
export type {
  TraceContainersListByAzureMonitorWorkspaceOptionalParams,
  TraceContainersDeleteOptionalParams,
  TraceContainersCreateOrUpdateOptionalParams,
  TraceContainersGetOptionalParams,
} from "./api/traceContainers/index.js";
export type {
  AzureMonitorWorkspacesOperations,
  IssueOperations,
  MetricConfigurationsOperations,
  MetricNamespacesOperations,
  MetricsContainersOperations,
  OperationsOperations,
  TraceAssociationsOperations,
  TraceAssociationsAtResourceGroupOperations,
  TraceAssociationsAtSubscriptionOperations,
  TraceContainersOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";

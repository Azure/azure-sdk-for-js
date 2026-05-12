// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
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
  Origin,
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
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  PublicNetworkAccess,
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
  Origin_1,
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
} from "./models/index.js";
export {
  KnownOrigin,
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
  MetricsContainersListByAzureMonitorWorkspaceOptionalParams,
  MetricsContainersCreateOrUpdateOptionalParams,
  MetricsContainersGetOptionalParams,
} from "./api/metricsContainers/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  AzureMonitorWorkspacesOperations,
  IssueOperations,
  MetricsContainersOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };

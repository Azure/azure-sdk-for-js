// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ImpactClient } from "./impactClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  UploadTokenResult,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  WorkloadImpact,
  WorkloadImpactProperties,
  ProvisioningState,
  Performance,
  ExpectedValueRange,
  MetricUnit,
  Connectivity,
  Protocol,
  SourceOrTarget,
  ErrorDetailProperties,
  Workload,
  Toolset,
  ConfidenceLevel,
  ClientIncidentDetails,
  IncidentSource,
  Severity,
  DetectionType,
  InsightCategoryGroup,
  InsightReference,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ImpactCategory,
  ImpactCategoryProperties,
  RequiredImpactProperties,
  Insight,
  InsightProperties,
  Content,
  ImpactDetails,
  Connector,
  ConnectorProperties,
  Platform,
  ManagedServiceIdentityOnlyUserAssigned,
  ManagedServiceIdentityTypeOnlyUserAssigned,
  UserAssignedIdentity,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownMetricUnit,
  KnownProtocol,
  KnownToolset,
  KnownConfidenceLevel,
  KnownIncidentSource,
  KnownSeverity,
  KnownDetectionType,
  KnownCreatedByType,
  KnownPlatform,
  KnownManagedServiceIdentityTypeOnlyUserAssigned,
  KnownVersions,
} from "./models/index.js";
export type { ImpactClientOptionalParams } from "./api/index.js";
export type {
  ConnectorsListBySubscriptionOptionalParams,
  ConnectorsDeleteOptionalParams,
  ConnectorsUpdateOptionalParams,
  ConnectorsCreateOrUpdateOptionalParams,
  ConnectorsGetOptionalParams,
} from "./api/connectors/index.js";
export type {
  ImpactCategoriesListBySubscriptionOptionalParams,
  ImpactCategoriesGetOptionalParams,
} from "./api/impactCategories/index.js";
export type {
  InsightsDeleteOptionalParams,
  InsightsCreateOptionalParams,
  InsightsListBySubscriptionOptionalParams,
  InsightsGetOptionalParams,
} from "./api/insights/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { UploadServiceGetUploadTokenOptionalParams } from "./api/uploadService/index.js";
export type {
  WorkloadImpactsListBySubscriptionOptionalParams,
  WorkloadImpactsDeleteOptionalParams,
  WorkloadImpactsGetOptionalParams,
  WorkloadImpactsCreateOptionalParams,
} from "./api/workloadImpacts/index.js";
export type {
  ConnectorsOperations,
  ImpactCategoriesOperations,
  InsightsOperations,
  OperationsOperations,
  UploadServiceOperations,
  WorkloadImpactsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";

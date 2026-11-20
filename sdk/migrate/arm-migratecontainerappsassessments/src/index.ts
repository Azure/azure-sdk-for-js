// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MigrateClient } from "./migrateClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  ContainerAppsAssessment,
  ContainerAppsAssessmentProperties,
  ProvisioningState,
  Scope,
  ScopeType,
  ContainerAppsAssessmentSettings,
  AzureCurrency,
  AssessmentSizingCriterion,
  PerformanceData,
  Percentile,
  TimeRange,
  SavingsSettings,
  SavingsOptions,
  AzureOffer,
  BillingSettings,
  LicensingProgram,
  EnvironmentType,
  ContainerAppsWorkloadProfileSku,
  ContainerAppsWorkloadProfileType,
  AssessmentDetails,
  AssessmentStatus,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  DownloadUrl,
  AssessedWebApplication,
  AssessedWebApplicationProperties,
  MigrateWorkloadType,
  Linkages,
  LinkageType,
  LinkageKind,
  RecommendationsMigrationIssuesMigrationSuitabilitySkus,
  Configuration,
  AzureTarget,
  RecommendedFor,
  StrategyType,
  MigrationPlatform,
  MigrationSuitability,
  CloudSuitabilityCommon,
  SecuritySuitability,
  CostDetailsCommon,
  NameValuePairCostType,
  CostType,
  SavingsDetailsCommon,
  NameValuePairSavingsType,
  SavingsType,
  MigrationIssues,
  MigrationIssuesCategory,
  MoreInformation,
  SkusMigrationSuitability,
  SkuKind,
  SkuType,
  SourceRecommendationMigrationSuitability,
  SkuDetails,
  NameValuePair,
  RecommendationResult,
  ComputeResource,
  WebServerType,
  ContainerAppsAssessmentOptions,
  ContainerAppsAssessmentOptionsProperties,
  ContainerAppsAssessmentOptionsOutboundEdgeGroup,
  ContainerAppsSummary,
  ContainerAppsSummaryProperties,
  SummaryType,
  SourceDetails,
  AssessmentSource,
  TargetDetails,
  TargetSourcePair,
  MigrationDetails,
  NameValuePairCloudSuitabilityCommon,
  MigrationType,
  ManagementDetails,
  AzureManagementOfferingType,
  ContainerAppsManagedEnvironment,
  ContainerAppsManagedEnvironmentProperties,
  ContainerApp,
  ContainerAppsCostDetail,
  ContainerAppsCostDetailProperties,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownScopeType,
  KnownAzureCurrency,
  KnownAssessmentSizingCriterion,
  KnownPercentile,
  KnownTimeRange,
  KnownSavingsOptions,
  KnownAzureOffer,
  KnownLicensingProgram,
  KnownEnvironmentType,
  KnownContainerAppsWorkloadProfileSku,
  KnownContainerAppsWorkloadProfileType,
  KnownAssessmentStatus,
  KnownCreatedByType,
  KnownMigrateWorkloadType,
  KnownLinkageType,
  KnownLinkageKind,
  KnownAzureTarget,
  KnownStrategyType,
  KnownMigrationPlatform,
  KnownCloudSuitabilityCommon,
  KnownCostType,
  KnownSavingsType,
  KnownMigrationIssuesCategory,
  KnownSkuKind,
  KnownSkuType,
  KnownWebServerType,
  KnownSummaryType,
  KnownAssessmentSource,
  KnownMigrationType,
  KnownAzureManagementOfferingType,
  KnownContainerAppsApiVersions,
} from "./models/index.js";
export type { MigrateClientOptionalParams } from "./api/index.js";
export type {
  AssessedWebApplicationOperationsListByParentOptionalParams,
  AssessedWebApplicationOperationsGetOptionalParams,
} from "./api/assessedWebApplicationOperations/index.js";
export type {
  ContainerAppsAssessmentOperationsDownloadUrlOptionalParams,
  ContainerAppsAssessmentOperationsDeleteOptionalParams,
  ContainerAppsAssessmentOperationsListByParentOptionalParams,
  ContainerAppsAssessmentOperationsGetOptionalParams,
  ContainerAppsAssessmentOperationsCreateOptionalParams,
} from "./api/containerAppsAssessmentOperations/index.js";
export type { ContainerAppsCostDetailOperationsListByParentOptionalParams } from "./api/containerAppsCostDetailOperations/index.js";
export type {
  ContainerAppsManagedEnvironmentOperationsListByParentOptionalParams,
  ContainerAppsManagedEnvironmentOperationsGetOptionalParams,
} from "./api/containerAppsManagedEnvironmentOperations/index.js";
export type {
  ContainerAppsOptionsOperationsListByParentOptionalParams,
  ContainerAppsOptionsOperationsGetOptionalParams,
} from "./api/containerAppsOptionsOperations/index.js";
export type {
  ContainerAppsSummaryOperationsListByParentOptionalParams,
  ContainerAppsSummaryOperationsGetOptionalParams,
} from "./api/containerAppsSummaryOperations/index.js";
export type {
  AssessedWebApplicationOperationsOperations,
  ContainerAppsAssessmentOperationsOperations,
  ContainerAppsCostDetailOperationsOperations,
  ContainerAppsManagedEnvironmentOperationsOperations,
  ContainerAppsOptionsOperationsOperations,
  ContainerAppsSummaryOperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";

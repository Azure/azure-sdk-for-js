// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ApplicationInsightsManagementClient } from "./applicationInsightsManagementClient.js";
export type {
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ProxyResource,
} from "./models/index.js";
export { KnownManagedServiceIdentityType, KnownCreatedByType } from "./models/index.js";
export type {
  ApplicationInsightsComponentAnalyticsItem,
  ItemScope,
  ItemType,
  ApplicationInsightsComponentAnalyticsItemProperties,
  ItemScopePath,
  ItemTypeParameter,
} from "./models/analyticsItems/index.js";
export {
  KnownItemScope,
  KnownItemType,
  KnownItemScopePath,
  KnownItemTypeParameter,
} from "./models/analyticsItems/index.js";
export type {
  TagsResource,
  WorkbookSharedTypeKind,
  ErrorResponseLinkedStorage,
  ErrorResponseLinkedStorageError,
  CategoryType,
} from "./models/applicationInsightsCommonTypes/index.js";
export {
  KnownWorkbookSharedTypeKind,
  KnownCategoryType,
} from "./models/applicationInsightsCommonTypes/index.js";
export type {
  Annotation,
  AnnotationError,
  InnerError,
  ApplicationInsightsComponentAPIKey,
  APIKeyRequest,
  ApplicationInsightsComponentExportConfiguration,
  ApplicationInsightsComponentExportRequest,
  ApplicationInsightsComponentBillingFeatures,
  ApplicationInsightsComponentDataVolumeCap,
  ApplicationInsightsComponentQuotaStatus,
  ApplicationInsightsComponentFeatureCapabilities,
  ApplicationInsightsComponentAvailableFeatures,
  ApplicationInsightsComponentFeature,
  ApplicationInsightsComponentFeatureCapability,
  ApplicationInsightsComponentProactiveDetectionConfiguration,
  ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions,
  WorkItemConfiguration,
  WorkItemConfigurationError,
  WorkItemCreateConfiguration,
} from "./models/componentAPIs/index.js";
export type {
  ComponentLinkedStorageAccounts,
  LinkedStorageAccountsProperties,
  StorageType,
  ComponentLinkedStorageAccountsPatch,
} from "./models/componentLinkedStorageAccountApi/index.js";
export { KnownStorageType } from "./models/componentLinkedStorageAccountApi/index.js";
export type {
  ApplicationInsightsComponent,
  ApplicationInsightsComponentProperties,
  ApplicationType,
  FlowType,
  RequestSource,
  PrivateLinkScopedResource,
  PublicNetworkAccessType,
  IngestionMode,
  ComponentsResource,
  ErrorResponseComponents,
  ErrorResponseComponentsError,
  ComponentPurgeBody,
  ComponentPurgeBodyFilters,
  ComponentPurgeResponse,
  ComponentPurgeStatusResponse,
  PurgeState,
} from "./models/components/index.js";
export {
  KnownApplicationType,
  KnownFlowType,
  KnownRequestSource,
  KnownPublicNetworkAccessType,
  KnownIngestionMode,
  KnownPurgeState,
} from "./models/components/index.js";
export type {
  DeletedWorkbook,
  DeletedWorkbookProperties,
  DeletedWorkbookResource,
  DeletedWorkbookError,
  DeletedWorkbookErrorDefinition,
  DeletedWorkbookInnerErrorTrace,
} from "./models/deletedWorkbookApi/index.js";
export type {
  ApplicationInsightsComponentFavorite,
  FavoriteType,
  FavoriteSourceType,
} from "./models/favorites/index.js";
export { KnownFavoriteSourceType } from "./models/favorites/index.js";
export type { LiveTokenResponse } from "./models/liveTokenApi/index.js";
export type { ApplicationInsightsComponentWebTestLocation } from "./models/webTestLocation/index.js";
export type {
  WebTest,
  WebTestKind,
  WebTestProperties,
  WebTestGeolocation,
  WebTestPropertiesConfiguration,
  WebTestPropertiesRequest,
  HeaderField,
  WebTestPropertiesValidationRules,
  WebTestPropertiesValidationRulesContentValidation,
  WebtestsResource,
} from "./models/webTestsApi/index.js";
export type {
  Operation,
  OperationDisplay,
  ErrorResponse,
  ErrorFieldContract,
} from "./models/workBookOperations/index.js";
export type {
  Workbook,
  WorkbookProperties,
  WorkbookResourceIdentity,
  WorkbookError,
  WorkbookErrorDefinition,
  WorkbookInnerErrorTrace,
  WorkbookUpdateParameters,
  WorkbookUpdateSharedTypeKind,
  WorkbookPropertiesUpdateParameters,
} from "./models/workbooksApi/index.js";
export { KnownWorkbookUpdateSharedTypeKind } from "./models/workbooksApi/index.js";
export type {
  WorkbookTemplate,
  WorkbookTemplateProperties,
  WorkbookTemplateGallery,
  WorkbookTemplateLocalizedGallery,
  WorkbookTemplateError,
  WorkbookTemplateErrorBody,
  WorkbookTemplateErrorFieldContract,
  WorkbookTemplateUpdateParameters,
} from "./models/workbookTemplatesApi/index.js";
export type { ApplicationInsightsManagementClientOptionalParams } from "./api/index.js";
export type {
  AnalyticsItemsDeleteOptionalParams,
  AnalyticsItemsPutOptionalParams,
  AnalyticsItemsGetOptionalParams,
  AnalyticsItemsListOptionalParams,
} from "./api/analyticsItems/index.js";
export type {
  AnnotationsGetOptionalParams,
  AnnotationsDeleteOptionalParams,
  AnnotationsCreateOptionalParams,
  AnnotationsListOptionalParams,
} from "./api/annotations/index.js";
export type {
  APIKeysGetOptionalParams,
  APIKeysDeleteOptionalParams,
  APIKeysCreateOptionalParams,
  APIKeysListOptionalParams,
} from "./api/apiKeys/index.js";
export type { ComponentAvailableFeaturesGetOptionalParams } from "./api/componentAvailableFeatures/index.js";
export type {
  ComponentCurrentBillingFeaturesUpdateOptionalParams,
  ComponentCurrentBillingFeaturesGetOptionalParams,
} from "./api/componentCurrentBillingFeatures/index.js";
export type { ComponentFeatureCapabilitiesGetOptionalParams } from "./api/componentFeatureCapabilities/index.js";
export type {
  ComponentLinkedStorageAccountsDeleteOptionalParams,
  ComponentLinkedStorageAccountsUpdateOptionalParams,
  ComponentLinkedStorageAccountsCreateAndUpdateOptionalParams,
  ComponentLinkedStorageAccountsGetOptionalParams,
} from "./api/componentLinkedStorageAccounts/index.js";
export type { ComponentQuotaStatusGetOptionalParams } from "./api/componentQuotaStatus/index.js";
export type {
  ComponentsGetPurgeStatusOptionalParams,
  ComponentsPurgeOptionalParams,
  ComponentsListOptionalParams,
  ComponentsListByResourceGroupOptionalParams,
  ComponentsDeleteOptionalParams,
  ComponentsUpdateTagsOptionalParams,
  ComponentsCreateOrUpdateOptionalParams,
  ComponentsGetOptionalParams,
} from "./api/components/index.js";
export type { DeletedWorkbooksListBySubscriptionOptionalParams } from "./api/deletedWorkbooks/index.js";
export type {
  ExportConfigurationsUpdateOptionalParams,
  ExportConfigurationsGetOptionalParams,
  ExportConfigurationsDeleteOptionalParams,
  ExportConfigurationsCreateOptionalParams,
  ExportConfigurationsListOptionalParams,
} from "./api/exportConfigurations/index.js";
export type {
  FavoritesDeleteOptionalParams,
  FavoritesUpdateOptionalParams,
  FavoritesAddOptionalParams,
  FavoritesGetOptionalParams,
  FavoritesListOptionalParams,
} from "./api/favorites/index.js";
export type { LiveTokenGetOptionalParams } from "./api/liveToken/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  ProactiveDetectionConfigurationsUpdateOptionalParams,
  ProactiveDetectionConfigurationsGetOptionalParams,
  ProactiveDetectionConfigurationsListOptionalParams,
} from "./api/proactiveDetectionConfigurations/index.js";
export type { WebTestLocationsListOptionalParams } from "./api/webTestLocations/index.js";
export type {
  WebTestsListByComponentOptionalParams,
  WebTestsListOptionalParams,
  WebTestsListByResourceGroupOptionalParams,
  WebTestsDeleteOptionalParams,
  WebTestsUpdateTagsOptionalParams,
  WebTestsCreateOrUpdateOptionalParams,
  WebTestsGetOptionalParams,
} from "./api/webTests/index.js";
export type {
  WorkbooksListByResourceGroupOptionalParams,
  WorkbooksRevisionGetOptionalParams,
  WorkbooksListRevisionsListOptionalParams,
  WorkbooksListBySubscriptionOptionalParams,
  WorkbooksDeleteOptionalParams,
  WorkbooksUpdateOptionalParams,
  WorkbooksCreateOrUpdateOptionalParams,
  WorkbooksGetOptionalParams,
} from "./api/workbooks/index.js";
export type {
  WorkbookTemplatesListByResourceGroupOptionalParams,
  WorkbookTemplatesDeleteOptionalParams,
  WorkbookTemplatesUpdateOptionalParams,
  WorkbookTemplatesCreateOrUpdateOptionalParams,
  WorkbookTemplatesGetOptionalParams,
} from "./api/workbookTemplates/index.js";
export type {
  WorkItemConfigurationsUpdateItemOptionalParams,
  WorkItemConfigurationsGetItemOptionalParams,
  WorkItemConfigurationsDeleteOptionalParams,
  WorkItemConfigurationsGetDefaultOptionalParams,
  WorkItemConfigurationsCreateOptionalParams,
  WorkItemConfigurationsListOptionalParams,
} from "./api/workItemConfigurations/index.js";
export type {
  AnalyticsItemsOperations,
  AnnotationsOperations,
  APIKeysOperations,
  ComponentAvailableFeaturesOperations,
  ComponentCurrentBillingFeaturesOperations,
  ComponentFeatureCapabilitiesOperations,
  ComponentLinkedStorageAccountsOperations,
  ComponentQuotaStatusOperations,
  ComponentsOperations,
  DeletedWorkbooksOperations,
  ExportConfigurationsOperations,
  FavoritesOperations,
  LiveTokenOperations,
  OperationsOperations,
  ProactiveDetectionConfigurationsOperations,
  WebTestLocationsOperations,
  WebTestsOperations,
  WorkbooksOperations,
  WorkbookTemplatesOperations,
  WorkItemConfigurationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";

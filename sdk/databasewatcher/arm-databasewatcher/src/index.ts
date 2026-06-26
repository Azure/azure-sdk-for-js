// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DatabaseWatcherClient } from "./databaseWatcherClient.js";
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
  Watcher,
  WatcherProperties,
  Datastore,
  KustoOfferingType,
  WatcherStatus,
  DatabaseWatcherProvisioningState,
  ManagedServiceIdentityV4,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  WatcherUpdate,
  WatcherUpdateProperties,
  ResourceProvisioningState,
  AlertRuleResource,
  AlertRuleResourceProperties,
  AlertRuleCreationProperties,
  ProxyResource,
  HealthValidation,
  HealthValidationProperties,
  ValidationStatus,
  ValidationIssue,
  Target,
  TargetProperties,
  TargetPropertiesUnion,
  TargetAuthenticationType,
  VaultSecret,
  SqlDbSingleDatabaseTargetProperties,
  SqlDbElasticPoolTargetProperties,
  SqlMiTargetProperties,
  SharedPrivateLinkResource,
  SharedPrivateLinkResourceProperties,
  SharedPrivateLinkResourceStatus,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownKustoOfferingType,
  KnownWatcherStatus,
  KnownDatabaseWatcherProvisioningState,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownResourceProvisioningState,
  KnownAlertRuleCreationProperties,
  KnownValidationStatus,
  KnownTargetAuthenticationType,
  KnownSharedPrivateLinkResourceStatus,
  KnownVersions,
} from "./models/index.js";
export type { DatabaseWatcherClientOptionalParams } from "./api/index.js";
export type {
  AlertRuleResourcesListByParentOptionalParams,
  AlertRuleResourcesDeleteOptionalParams,
  AlertRuleResourcesCreateOrUpdateOptionalParams,
  AlertRuleResourcesGetOptionalParams,
} from "./api/alertRuleResources/index.js";
export type {
  HealthValidationsStartValidationOptionalParams,
  HealthValidationsListByParentOptionalParams,
  HealthValidationsGetOptionalParams,
} from "./api/healthValidations/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SharedPrivateLinkResourcesListByWatcherOptionalParams,
  SharedPrivateLinkResourcesDeleteOptionalParams,
  SharedPrivateLinkResourcesCreateOptionalParams,
  SharedPrivateLinkResourcesGetOptionalParams,
} from "./api/sharedPrivateLinkResources/index.js";
export type {
  TargetsListByWatcherOptionalParams,
  TargetsDeleteOptionalParams,
  TargetsCreateOrUpdateOptionalParams,
  TargetsGetOptionalParams,
} from "./api/targets/index.js";
export type {
  WatchersStopOptionalParams,
  WatchersStartOptionalParams,
  WatchersListBySubscriptionOptionalParams,
  WatchersListByResourceGroupOptionalParams,
  WatchersDeleteOptionalParams,
  WatchersUpdateOptionalParams,
  WatchersCreateOrUpdateOptionalParams,
  WatchersGetOptionalParams,
} from "./api/watchers/index.js";
export type {
  AlertRuleResourcesOperations,
  HealthValidationsOperations,
  OperationsOperations,
  SharedPrivateLinkResourcesOperations,
  TargetsOperations,
  WatchersOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";

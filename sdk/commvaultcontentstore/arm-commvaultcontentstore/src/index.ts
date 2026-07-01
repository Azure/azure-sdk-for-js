// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ContentStoreClient } from "./contentStoreClient.js";
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
  CloudAccount,
  CloudAccountProperties,
  MarketplaceDetails,
  MarketplaceSubscriptionStatus,
  OfferDetails,
  UserDetails,
  ResourceProvisioningState,
  EntityInfo,
  EntityType,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  CloudAccountUpdate,
  CloudAccountUpdateProperties,
  SaaSData,
  LatestLinkedSaaSResponse,
  ActivateSaaSParameterRequest,
  SaaSResourceDetailsResponse,
  ProxyResource,
  Storage,
  StorageProperties,
  StorageType,
  Vendor,
  StorageClassType,
  CommvaultPlan,
  PlanProperties,
  StoragePlan,
  RetentionTime,
  BackupRuleType,
  ExtendedRetentionTime,
  Schedule,
  BackUpType,
  Frequency,
  WeekOfMonth,
  DayOfWeek,
  MonthOfYear,
  WeeklyDays,
  Retention,
  ProtectionGroup,
  ProtectionGroupProperties,
  ProtectionGroupResources,
  Rule,
  RuleProperty,
  Operator,
  MatchType,
  ProtectionStatus,
  StopBackupProtectionGroupRequest,
  RestoreProtectionItemRequest,
  RestoreType,
  VmDestinationInfo,
  VmInfo,
  VmTag,
  RestoreProtectionItemResponse,
  BackupProtectionGroupRequest,
  VmListItem,
  BackupOptions,
  BackupLevel,
  BackupProtectionGroupResponse,
  ProtectedItem,
  ProtectedItemProperties,
  RestorePoints,
  CountProtectedItemsRequest,
  CountProtectedItemsResponse,
  RoleMapping,
  RoleMappingProperties,
  RoleAssignment,
  RoleName,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownMarketplaceSubscriptionStatus,
  KnownResourceProvisioningState,
  KnownEntityType,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownStorageType,
  KnownVendor,
  KnownStorageClassType,
  KnownRetentionTime,
  KnownBackupRuleType,
  KnownBackUpType,
  KnownFrequency,
  KnownWeekOfMonth,
  KnownDayOfWeek,
  KnownMonthOfYear,
  KnownWeeklyDays,
  KnownRuleProperty,
  KnownOperator,
  KnownMatchType,
  KnownProtectionStatus,
  KnownRestoreType,
  KnownBackupLevel,
  KnownRoleName,
  KnownVersions,
} from "./models/index.js";
export type { ContentStoreClientOptionalParams } from "./api/index.js";
export type {
  CloudAccountsLatestLinkedSaaSOptionalParams,
  CloudAccountsLinkSaaSOptionalParams,
  CloudAccountsListBySubscriptionOptionalParams,
  CloudAccountsListByResourceGroupOptionalParams,
  CloudAccountsDeleteOptionalParams,
  CloudAccountsUpdateOptionalParams,
  CloudAccountsCreateOrUpdateOptionalParams,
  CloudAccountsGetOptionalParams,
} from "./api/cloudAccounts/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PlansListByCloudAccountOptionalParams,
  PlansDeleteOptionalParams,
  PlansCreateOrupdateOptionalParams,
  PlansGetOptionalParams,
} from "./api/plans/index.js";
export type {
  ProtectedItemsRestoreOptionalParams,
  ProtectedItemsGetRestorePointsOptionalParams,
  ProtectedItemsListByProtectionGroupOptionalParams,
  ProtectedItemsGetOptionalParams,
} from "./api/protectedItems/index.js";
export type { ProtectedItemsOperationGroupCountByProtectionGroupsOptionalParams } from "./api/protectedItemsOperationGroup/index.js";
export type {
  ProtectionGroupsBackupOptionalParams,
  ProtectionGroupsResumeBackupOptionalParams,
  ProtectionGroupsRestoreOptionalParams,
  ProtectionGroupsStopBackupOptionalParams,
  ProtectionGroupsListByCloudAccountOptionalParams,
  ProtectionGroupsDeleteOptionalParams,
  ProtectionGroupsCreateOrupdateOptionalParams,
  ProtectionGroupsGetOptionalParams,
} from "./api/protectionGroups/index.js";
export type {
  RoleMappingsListOptionalParams,
  RoleMappingsDeleteOptionalParams,
  RoleMappingsCreateOrUpdateOptionalParams,
  RoleMappingsGetOptionalParams,
} from "./api/roleMappings/index.js";
export type { SaaSOperationGroupActivateResourceOptionalParams } from "./api/saaSOperationGroup/index.js";
export type {
  StoragesListByCloudAccountOptionalParams,
  StoragesDeleteOptionalParams,
  StoragesCreateOrUpdateOptionalParams,
  StoragesGetOptionalParams,
} from "./api/storages/index.js";
export type {
  CloudAccountsOperations,
  OperationsOperations,
  PlansOperations,
  ProtectedItemsOperations,
  ProtectedItemsOperationGroupOperations,
  ProtectionGroupsOperations,
  RoleMappingsOperations,
  SaaSOperationGroupOperations,
  StoragesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";

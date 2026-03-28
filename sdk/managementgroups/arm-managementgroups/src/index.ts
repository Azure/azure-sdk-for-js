// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ManagementGroupsAPI } from "./managementGroupsAPI.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
  Reason,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  TenantBackfillStatusResult,
  Status,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ManagementGroup,
  ManagementGroupProperties,
  ManagementGroupDetails,
  ParentGroupInfo,
  ManagementGroupPathElement,
  ManagementGroupChildInfo,
  ManagementGroupChildType,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  CreateManagementGroupRequest,
  CreateManagementGroupProperties,
  CreateManagementGroupDetails,
  CreateParentGroupInfo,
  CreateManagementGroupChildInfo,
  ManagementGroupInfoProperties,
  PatchManagementGroupRequest,
  DescendantInfo,
  DescendantInfoProperties,
  DescendantParentGroupInfo,
  ManagementGroupInfo,
  HierarchySettingsList,
  HierarchySettingsInfo,
  HierarchySettingsProperties,
  HierarchySettings,
  CreateOrUpdateSettingsRequest,
  CreateOrUpdateSettingsProperties,
  SubscriptionUnderManagementGroup,
  SubscriptionUnderManagementGroupProperties,
  EntityInfo,
  EntityInfoProperties,
  EntityParentGroupInfo,
  Permissions,
  ManagementGroupExpandType,
  EntitySearchType,
  EntityViewParameterType,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownCreatedByType,
  KnownManagementGroupExpandType,
  KnownEntitySearchType,
  KnownEntityViewParameterType,
  KnownVersions,
} from "./models/index.js";
export type {
  ManagementGroupsAPIOptionalParams,
  TenantBackfillStatusOptionalParams,
  StartTenantBackfillOptionalParams,
  CheckNameAvailabilityOptionalParams,
} from "./api/index.js";
export type { EntitiesListOptionalParams } from "./api/entities/index.js";
export type {
  HierarchySettingsDeleteOptionalParams,
  HierarchySettingsUpdateOptionalParams,
  HierarchySettingsCreateOrUpdateOptionalParams,
  HierarchySettingsGetOptionalParams,
  HierarchySettingsListOptionalParams,
} from "./api/hierarchySettings/index.js";
export type {
  ManagementGroupsListOptionalParams,
  ManagementGroupsGetDescendantsOptionalParams,
  ManagementGroupsDeleteOptionalParams,
  ManagementGroupsUpdateOptionalParams,
  ManagementGroupsCreateOrUpdateOptionalParams,
  ManagementGroupsGetOptionalParams,
} from "./api/managementGroups/index.js";
export type {
  ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOptionalParams,
  ManagementGroupSubscriptionsDeleteOptionalParams,
  ManagementGroupSubscriptionsCreateOptionalParams,
  ManagementGroupSubscriptionsGetSubscriptionOptionalParams,
} from "./api/managementGroupSubscriptions/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  EntitiesOperations,
  HierarchySettingsOperations,
  ManagementGroupsOperations,
  ManagementGroupSubscriptionsOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };

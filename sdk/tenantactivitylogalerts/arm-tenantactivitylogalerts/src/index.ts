// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { TenantActivityLogAlertsManagementClient } from "./tenantActivityLogAlertsManagementClient.js";
export type {
  TenantActivityLogAlertResource,
  AlertRuleProperties,
  AlertRuleAllOfCondition,
  AlertRuleAnyOfOrLeafCondition,
  AlertRuleLeafCondition,
  ActionList,
  ActionGroup,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  TenantAlertRulePatchObject,
  TenantAlertRulePatchProperties,
} from "./models/index.js";
export { KnownCreatedByType, KnownVersions } from "./models/index.js";
export type { TenantActivityLogAlertsManagementClientOptionalParams } from "./api/index.js";
export type {
  TenantActivityLogAlertsListByManagementGroupOptionalParams,
  TenantActivityLogAlertsDeleteOptionalParams,
  TenantActivityLogAlertsUpdateOptionalParams,
  TenantActivityLogAlertsCreateOrUpdateOptionalParams,
  TenantActivityLogAlertsGetOptionalParams,
  TenantActivityLogAlertsListByTenantOptionalParams,
} from "./api/tenantActivityLogAlerts/index.js";
export type { TenantActivityLogAlertsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };

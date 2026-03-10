// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AlertsManagementClient } from "./alertsManagementClient.js";
export type {
  PrometheusRuleGroupResource,
  PrometheusRuleGroupProperties,
  PrometheusRule,
  PrometheusRuleGroupAction,
  PrometheusRuleResolveConfiguration,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  PrometheusRuleGroupResourcePatchParameters,
  PrometheusRuleGroupResourcePatchParametersProperties,
} from "./models/index.js";
export { KnownCreatedByType, KnownVersions } from "./models/index.js";
export type { AlertsManagementClientOptionalParams } from "./api/index.js";
export type {
  PrometheusRuleGroupsListBySubscriptionOptionalParams,
  PrometheusRuleGroupsListByResourceGroupOptionalParams,
  PrometheusRuleGroupsDeleteOptionalParams,
  PrometheusRuleGroupsUpdateOptionalParams,
  PrometheusRuleGroupsCreateOrUpdateOptionalParams,
  PrometheusRuleGroupsGetOptionalParams,
} from "./api/prometheusRuleGroups/index.js";
export type { PrometheusRuleGroupsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };

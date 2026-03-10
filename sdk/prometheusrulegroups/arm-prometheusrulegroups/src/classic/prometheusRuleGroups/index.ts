// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AlertsManagementContext } from "../../api/alertsManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/prometheusRuleGroups/operations.js";
import type {
  PrometheusRuleGroupsListBySubscriptionOptionalParams,
  PrometheusRuleGroupsListByResourceGroupOptionalParams,
  PrometheusRuleGroupsDeleteOptionalParams,
  PrometheusRuleGroupsUpdateOptionalParams,
  PrometheusRuleGroupsCreateOrUpdateOptionalParams,
  PrometheusRuleGroupsGetOptionalParams,
} from "../../api/prometheusRuleGroups/options.js";
import type {
  PrometheusRuleGroupResource,
  PrometheusRuleGroupResourcePatchParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrometheusRuleGroups operations. */
export interface PrometheusRuleGroupsOperations {
  /** Retrieve Prometheus all rule group definitions in a subscription. */
  listBySubscription: (
    options?: PrometheusRuleGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PrometheusRuleGroupResource>;
  /** Retrieve Prometheus rule group definitions in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PrometheusRuleGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PrometheusRuleGroupResource>;
  /** Delete a Prometheus rule group definition. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    ruleGroupName: string,
    options?: PrometheusRuleGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an Prometheus rule group definition. */
  update: (
    resourceGroupName: string,
    ruleGroupName: string,
    parameters: PrometheusRuleGroupResourcePatchParameters,
    options?: PrometheusRuleGroupsUpdateOptionalParams,
  ) => Promise<PrometheusRuleGroupResource>;
  /** Create or update a Prometheus rule group definition. */
  createOrUpdate: (
    resourceGroupName: string,
    ruleGroupName: string,
    parameters: PrometheusRuleGroupResource,
    options?: PrometheusRuleGroupsCreateOrUpdateOptionalParams,
  ) => Promise<PrometheusRuleGroupResource>;
  /** Retrieve a Prometheus rule group definition. */
  get: (
    resourceGroupName: string,
    ruleGroupName: string,
    options?: PrometheusRuleGroupsGetOptionalParams,
  ) => Promise<PrometheusRuleGroupResource>;
}

function _getPrometheusRuleGroups(context: AlertsManagementContext) {
  return {
    listBySubscription: (options?: PrometheusRuleGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PrometheusRuleGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      ruleGroupName: string,
      options?: PrometheusRuleGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ruleGroupName, options),
    update: (
      resourceGroupName: string,
      ruleGroupName: string,
      parameters: PrometheusRuleGroupResourcePatchParameters,
      options?: PrometheusRuleGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, ruleGroupName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      ruleGroupName: string,
      parameters: PrometheusRuleGroupResource,
      options?: PrometheusRuleGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, ruleGroupName, parameters, options),
    get: (
      resourceGroupName: string,
      ruleGroupName: string,
      options?: PrometheusRuleGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, ruleGroupName, options),
  };
}

export function _getPrometheusRuleGroupsOperations(
  context: AlertsManagementContext,
): PrometheusRuleGroupsOperations {
  return {
    ..._getPrometheusRuleGroups(context),
  };
}

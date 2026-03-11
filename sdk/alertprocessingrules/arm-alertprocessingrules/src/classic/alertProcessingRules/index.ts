// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AlertsManagementContext } from "../../api/alertsManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  getByName,
} from "../../api/alertProcessingRules/operations.js";
import type {
  AlertProcessingRulesListBySubscriptionOptionalParams,
  AlertProcessingRulesListByResourceGroupOptionalParams,
  AlertProcessingRulesDeleteOptionalParams,
  AlertProcessingRulesUpdateOptionalParams,
  AlertProcessingRulesCreateOrUpdateOptionalParams,
  AlertProcessingRulesGetByNameOptionalParams,
} from "../../api/alertProcessingRules/options.js";
import type { AlertProcessingRule, PatchObject } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AlertProcessingRules operations. */
export interface AlertProcessingRulesOperations {
  /** List all alert processing rules in a subscription. */
  listBySubscription: (
    options?: AlertProcessingRulesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AlertProcessingRule>;
  /** List all alert processing rules in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AlertProcessingRulesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AlertProcessingRule>;
  /** Delete an alert processing rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    alertProcessingRuleName: string,
    options?: AlertProcessingRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Enable, disable, or update tags for an alert processing rule. */
  update: (
    resourceGroupName: string,
    alertProcessingRuleName: string,
    alertProcessingRulePatch: PatchObject,
    options?: AlertProcessingRulesUpdateOptionalParams,
  ) => Promise<AlertProcessingRule>;
  /** Create or update an alert processing rule. */
  createOrUpdate: (
    resourceGroupName: string,
    alertProcessingRuleName: string,
    alertProcessingRule: AlertProcessingRule,
    options?: AlertProcessingRulesCreateOrUpdateOptionalParams,
  ) => Promise<AlertProcessingRule>;
  /** Get an alert processing rule by name. */
  getByName: (
    resourceGroupName: string,
    alertProcessingRuleName: string,
    options?: AlertProcessingRulesGetByNameOptionalParams,
  ) => Promise<AlertProcessingRule>;
}

function _getAlertProcessingRules(context: AlertsManagementContext) {
  return {
    listBySubscription: (options?: AlertProcessingRulesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AlertProcessingRulesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      alertProcessingRuleName: string,
      options?: AlertProcessingRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, alertProcessingRuleName, options),
    update: (
      resourceGroupName: string,
      alertProcessingRuleName: string,
      alertProcessingRulePatch: PatchObject,
      options?: AlertProcessingRulesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        alertProcessingRuleName,
        alertProcessingRulePatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      alertProcessingRuleName: string,
      alertProcessingRule: AlertProcessingRule,
      options?: AlertProcessingRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        alertProcessingRuleName,
        alertProcessingRule,
        options,
      ),
    getByName: (
      resourceGroupName: string,
      alertProcessingRuleName: string,
      options?: AlertProcessingRulesGetByNameOptionalParams,
    ) => getByName(context, resourceGroupName, alertProcessingRuleName, options),
  };
}

export function _getAlertProcessingRulesOperations(
  context: AlertsManagementContext,
): AlertProcessingRulesOperations {
  return {
    ..._getAlertProcessingRules(context),
  };
}

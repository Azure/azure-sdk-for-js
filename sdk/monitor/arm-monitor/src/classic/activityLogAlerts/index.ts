// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listBySubscriptionId,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/activityLogAlerts/operations.js";
import type {
  ActivityLogAlertsListBySubscriptionIdOptionalParams,
  ActivityLogAlertsListByResourceGroupOptionalParams,
  ActivityLogAlertsDeleteOptionalParams,
  ActivityLogAlertsUpdateOptionalParams,
  ActivityLogAlertsCreateOrUpdateOptionalParams,
  ActivityLogAlertsGetOptionalParams,
} from "../../api/activityLogAlerts/options.js";
import type {
  MicrosoftActivityLogAlertsActivityLogAlertResource,
  MicrosoftActivityLogAlertsAlertRulePatchObject,
} from "../../models/microsoft/activityLogAlerts/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ActivityLogAlerts operations. */
export interface ActivityLogAlertsOperations {
  /** Get a list of all Activity Log Alert rules in a subscription. */
  listBySubscriptionId: (
    options?: ActivityLogAlertsListBySubscriptionIdOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftActivityLogAlertsActivityLogAlertResource>;
  /** Get a list of all Activity Log Alert rules in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ActivityLogAlertsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftActivityLogAlertsActivityLogAlertResource>;
  /** Delete an Activity Log Alert rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    activityLogAlertName: string,
    options?: ActivityLogAlertsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates 'tags' and 'enabled' fields in an existing Alert rule. This method is used to update the Alert rule tags, and to enable or disable the Alert rule. To update other fields use CreateOrUpdate operation. */
  update: (
    resourceGroupName: string,
    activityLogAlertName: string,
    activityLogAlertRulePatch: MicrosoftActivityLogAlertsAlertRulePatchObject,
    options?: ActivityLogAlertsUpdateOptionalParams,
  ) => Promise<MicrosoftActivityLogAlertsActivityLogAlertResource>;
  /** Create a new Activity Log Alert rule or update an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    activityLogAlertName: string,
    activityLogAlertRule: MicrosoftActivityLogAlertsActivityLogAlertResource,
    options?: ActivityLogAlertsCreateOrUpdateOptionalParams,
  ) => Promise<MicrosoftActivityLogAlertsActivityLogAlertResource>;
  /** Get an Activity Log Alert rule. */
  get: (
    resourceGroupName: string,
    activityLogAlertName: string,
    options?: ActivityLogAlertsGetOptionalParams,
  ) => Promise<MicrosoftActivityLogAlertsActivityLogAlertResource>;
}

function _getActivityLogAlerts(context: MonitorContext) {
  return {
    listBySubscriptionId: (options?: ActivityLogAlertsListBySubscriptionIdOptionalParams) =>
      listBySubscriptionId(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ActivityLogAlertsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      activityLogAlertName: string,
      options?: ActivityLogAlertsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, activityLogAlertName, options),
    update: (
      resourceGroupName: string,
      activityLogAlertName: string,
      activityLogAlertRulePatch: MicrosoftActivityLogAlertsAlertRulePatchObject,
      options?: ActivityLogAlertsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, activityLogAlertName, activityLogAlertRulePatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      activityLogAlertName: string,
      activityLogAlertRule: MicrosoftActivityLogAlertsActivityLogAlertResource,
      options?: ActivityLogAlertsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        activityLogAlertName,
        activityLogAlertRule,
        options,
      ),
    get: (
      resourceGroupName: string,
      activityLogAlertName: string,
      options?: ActivityLogAlertsGetOptionalParams,
    ) => get(context, resourceGroupName, activityLogAlertName, options),
  };
}

export function _getActivityLogAlertsOperations(
  context: MonitorContext,
): ActivityLogAlertsOperations {
  return {
    ..._getActivityLogAlerts(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/metricAlerts/operations.js";
import type {
  MetricAlertsListBySubscriptionOptionalParams,
  MetricAlertsListByResourceGroupOptionalParams,
  MetricAlertsDeleteOptionalParams,
  MetricAlertsUpdateOptionalParams,
  MetricAlertsCreateOrUpdateOptionalParams,
  MetricAlertsGetOptionalParams,
} from "../../api/metricAlerts/options.js";
import type {
  MetricAlertApiMetricAlertResource,
  MetricAlertApiMetricAlertResourcePatch,
} from "../../models/metricAlertApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MetricAlerts operations. */
export interface MetricAlertsOperations {
  /** Retrieve alert rule definitions in a subscription. */
  listBySubscription: (
    options?: MetricAlertsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<MetricAlertApiMetricAlertResource>;
  /** Retrieve alert rule definitions in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MetricAlertsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MetricAlertApiMetricAlertResource>;
  /** Delete an alert rule definition. */
  delete: (
    resourceGroupName: string,
    ruleName: string,
    options?: MetricAlertsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an metric alert definition. */
  update: (
    resourceGroupName: string,
    ruleName: string,
    parameters: MetricAlertApiMetricAlertResourcePatch,
    options?: MetricAlertsUpdateOptionalParams,
  ) => Promise<MetricAlertApiMetricAlertResource>;
  /** Create or update an metric alert definition. */
  createOrUpdate: (
    resourceGroupName: string,
    ruleName: string,
    parameters: MetricAlertApiMetricAlertResource,
    options?: MetricAlertsCreateOrUpdateOptionalParams,
  ) => Promise<MetricAlertApiMetricAlertResource>;
  /** Retrieve an alert rule definition. */
  get: (
    resourceGroupName: string,
    ruleName: string,
    options?: MetricAlertsGetOptionalParams,
  ) => Promise<MetricAlertApiMetricAlertResource>;
}

function _getMetricAlerts(context: MonitorContext) {
  return {
    listBySubscription: (options?: MetricAlertsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MetricAlertsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      ruleName: string,
      options?: MetricAlertsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ruleName, options),
    update: (
      resourceGroupName: string,
      ruleName: string,
      parameters: MetricAlertApiMetricAlertResourcePatch,
      options?: MetricAlertsUpdateOptionalParams,
    ) => update(context, resourceGroupName, ruleName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      ruleName: string,
      parameters: MetricAlertApiMetricAlertResource,
      options?: MetricAlertsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, ruleName, parameters, options),
    get: (resourceGroupName: string, ruleName: string, options?: MetricAlertsGetOptionalParams) =>
      get(context, resourceGroupName, ruleName, options),
  };
}

export function _getMetricAlertsOperations(context: MonitorContext): MetricAlertsOperations {
  return {
    ..._getMetricAlerts(context),
  };
}

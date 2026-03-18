// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AlertsManagementContext } from "../../api/alertsManagementContext.js";
import {
  getSummary,
  metaData,
  getEnrichments,
  getHistory,
  changeState,
  getAll,
  getById,
  getAllTenant,
  changeStateTenant,
  getHistoryTenant,
  getByIdTenant,
} from "../../api/alerts/operations.js";
import type {
  AlertsGetSummaryOptionalParams,
  AlertsMetaDataOptionalParams,
  AlertsGetEnrichmentsOptionalParams,
  AlertsGetHistoryOptionalParams,
  AlertsChangeStateOptionalParams,
  AlertsGetAllOptionalParams,
  AlertsGetByIdOptionalParams,
  AlertsGetAllTenantOptionalParams,
  AlertsChangeStateTenantOptionalParams,
  AlertsGetHistoryTenantOptionalParams,
  AlertsGetByIdTenantOptionalParams,
} from "../../api/alerts/options.js";
import type {
  Alert,
  AlertState,
  AlertModification,
  AlertEnrichmentResponse,
  AlertsMetaData,
  AlertsSummary,
  Identifier,
  AlertsSummaryGroupByFields,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Alerts operations. */
export interface AlertsOperations {
  /** Get a summarized count of your alerts grouped by various parameters (e.g. grouping by 'Severity' returns the count of alerts for each severity). */
  getSummary: (
    scope: string,
    groupby: AlertsSummaryGroupByFields,
    options?: AlertsGetSummaryOptionalParams,
  ) => Promise<AlertsSummary>;
  /** List alerts meta data information based on value of identifier parameter. */
  metaData: (
    identifier: Identifier,
    options?: AlertsMetaDataOptionalParams,
  ) => Promise<AlertsMetaData>;
  /** Get the enrichments of an alert. It returns a collection of one object named default. */
  getEnrichments: (
    scope: string,
    alertId: string,
    options?: AlertsGetEnrichmentsOptionalParams,
  ) => PagedAsyncIterableIterator<AlertEnrichmentResponse>;
  /** Get the history of an alert, which captures any monitor condition changes (Fired/Resolved), alert state changes (New/Acknowledged/Closed) and applied action rules for that particular alert. If scope is a deleted resource then please use scope as parent resource of the delete resource. For example if my alert id is '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/virtualMachines/vm1/providers/Microsoft.AlertsManagement/alerts/{alertId}' and 'vm1' is deleted then if you want to get history of this particular alert then use parent resource of scope. So in this example get history call will look like this: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AlertsManagement/alerts/{alertId}/history'. */
  getHistory: (
    scope: string,
    alertId: string,
    options?: AlertsGetHistoryOptionalParams,
  ) => Promise<AlertModification>;
  /** Change the state of an alert. If scope is a deleted resource then please use scope as parent resource of the delete resource. For example if my alert id is '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/virtualMachines/vm1/providers/Microsoft.AlertsManagement/alerts/{alertId}' and 'vm1' is deleted then if you want to change state of this particular alert then use parent resource of scope. So in this example change state call will look like this: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AlertsManagement/alerts/{alertId}'. */
  changeState: (
    scope: string,
    alertId: string,
    newState: AlertState,
    options?: AlertsChangeStateOptionalParams,
  ) => Promise<Alert>;
  /** List all existing alerts, where the results can be filtered on the basis of multiple parameters (e.g. time range). The results can then be sorted on the basis specific fields, with the default being lastModifiedDateTime. */
  getAll: (
    scope: string,
    options?: AlertsGetAllOptionalParams,
  ) => PagedAsyncIterableIterator<Alert>;
  /** Get information related to a specific alert. If scope is a deleted resource then please use scope as parent resource of the delete resource. For example if my alert id is '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/virtualMachines/vm1/providers/Microsoft.AlertsManagement/alerts/{alertId}' and 'vm1' is deleted then if you want to get alert by id then use parent resource of scope. So in this example get alert by id call will look like this: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AlertsManagement/alerts/{alertId}'. */
  getById: (
    scope: string,
    alertId: string,
    options?: AlertsGetByIdOptionalParams,
  ) => Promise<Alert>;
  /** List all existing alerts, where the results can be filtered on the basis of multiple parameters (e.g. time range). The results can then be sorted on the basis specific fields, with the default being lastModifiedDateTime. */
  getAllTenant: (options?: AlertsGetAllTenantOptionalParams) => PagedAsyncIterableIterator<Alert>;
  /** Change the state of an alert. */
  changeStateTenant: (
    alertId: string,
    newState: AlertState,
    options?: AlertsChangeStateTenantOptionalParams,
  ) => Promise<Alert>;
  /** Get the history of an alert, which captures any monitor condition changes (Fired/Resolved), alert state changes (New/Acknowledged/Closed) and applied action rules for that particular alert. */
  getHistoryTenant: (
    alertId: string,
    options?: AlertsGetHistoryTenantOptionalParams,
  ) => Promise<AlertModification>;
  /** Get information related to a specific alert. */
  getByIdTenant: (alertId: string, options?: AlertsGetByIdTenantOptionalParams) => Promise<Alert>;
}

function _getAlerts(context: AlertsManagementContext) {
  return {
    getSummary: (
      scope: string,
      groupby: AlertsSummaryGroupByFields,
      options?: AlertsGetSummaryOptionalParams,
    ) => getSummary(context, scope, groupby, options),
    metaData: (identifier: Identifier, options?: AlertsMetaDataOptionalParams) =>
      metaData(context, identifier, options),
    getEnrichments: (
      scope: string,
      alertId: string,
      options?: AlertsGetEnrichmentsOptionalParams,
    ) => getEnrichments(context, scope, alertId, options),
    getHistory: (scope: string, alertId: string, options?: AlertsGetHistoryOptionalParams) =>
      getHistory(context, scope, alertId, options),
    changeState: (
      scope: string,
      alertId: string,
      newState: AlertState,
      options?: AlertsChangeStateOptionalParams,
    ) => changeState(context, scope, alertId, newState, options),
    getAll: (scope: string, options?: AlertsGetAllOptionalParams) =>
      getAll(context, scope, options),
    getById: (scope: string, alertId: string, options?: AlertsGetByIdOptionalParams) =>
      getById(context, scope, alertId, options),
    getAllTenant: (options?: AlertsGetAllTenantOptionalParams) => getAllTenant(context, options),
    changeStateTenant: (
      alertId: string,
      newState: AlertState,
      options?: AlertsChangeStateTenantOptionalParams,
    ) => changeStateTenant(context, alertId, newState, options),
    getHistoryTenant: (alertId: string, options?: AlertsGetHistoryTenantOptionalParams) =>
      getHistoryTenant(context, alertId, options),
    getByIdTenant: (alertId: string, options?: AlertsGetByIdTenantOptionalParams) =>
      getByIdTenant(context, alertId, options),
  };
}

export function _getAlertsOperations(context: AlertsManagementContext): AlertsOperations {
  return {
    ..._getAlerts(context),
  };
}

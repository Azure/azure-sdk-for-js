// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { refreshAll, refresh, listForScope, update, get } from "../../api/alerts/operations.js";
import type {
  AlertsRefreshAllOptionalParams,
  AlertsRefreshOptionalParams,
  AlertsListForScopeOptionalParams,
  AlertsUpdateOptionalParams,
  AlertsGetOptionalParams,
} from "../../api/alerts/options.js";
import type {
  Alert,
  AlertOperationResult,
} from "../../models/microsoft/roleManagementAlerts/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Alerts operations. */
export interface AlertsOperations {
  /** Refresh all alerts for a resource scope. */
  refreshAll: (
    scope: string,
    options?: AlertsRefreshAllOptionalParams,
  ) => PollerLike<OperationState<AlertOperationResult>, AlertOperationResult>;
  /** @deprecated use refreshAll instead */
  beginRefreshAll: (
    scope: string,
    options?: AlertsRefreshAllOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AlertOperationResult>, AlertOperationResult>>;
  /** @deprecated use refreshAll instead */
  beginRefreshAllAndWait: (
    scope: string,
    options?: AlertsRefreshAllOptionalParams,
  ) => Promise<AlertOperationResult>;
  /** Refresh an alert. */
  refresh: (
    scope: string,
    alertId: string,
    options?: AlertsRefreshOptionalParams,
  ) => PollerLike<OperationState<AlertOperationResult>, AlertOperationResult>;
  /** @deprecated use refresh instead */
  beginRefresh: (
    scope: string,
    alertId: string,
    options?: AlertsRefreshOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AlertOperationResult>, AlertOperationResult>>;
  /** @deprecated use refresh instead */
  beginRefreshAndWait: (
    scope: string,
    alertId: string,
    options?: AlertsRefreshOptionalParams,
  ) => Promise<AlertOperationResult>;
  /** Gets alerts for a resource scope. */
  listForScope: (
    scope: string,
    options?: AlertsListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<Alert>;
  /** Update an alert. */
  update: (
    scope: string,
    alertId: string,
    parameters: Alert,
    options?: AlertsUpdateOptionalParams,
  ) => Promise<void>;
  /** Get the specified alert. */
  get: (scope: string, alertId: string, options?: AlertsGetOptionalParams) => Promise<Alert>;
}

function _getAlerts(context: AuthorizationManagementContext) {
  return {
    refreshAll: (scope: string, options?: AlertsRefreshAllOptionalParams) =>
      refreshAll(context, scope, options),
    beginRefreshAll: async (scope: string, options?: AlertsRefreshAllOptionalParams) => {
      const poller = refreshAll(context, scope, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshAllAndWait: async (scope: string, options?: AlertsRefreshAllOptionalParams) => {
      return await refreshAll(context, scope, options);
    },
    refresh: (scope: string, alertId: string, options?: AlertsRefreshOptionalParams) =>
      refresh(context, scope, alertId, options),
    beginRefresh: async (scope: string, alertId: string, options?: AlertsRefreshOptionalParams) => {
      const poller = refresh(context, scope, alertId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshAndWait: async (
      scope: string,
      alertId: string,
      options?: AlertsRefreshOptionalParams,
    ) => {
      return await refresh(context, scope, alertId, options);
    },
    listForScope: (scope: string, options?: AlertsListForScopeOptionalParams) =>
      listForScope(context, scope, options),
    update: (
      scope: string,
      alertId: string,
      parameters: Alert,
      options?: AlertsUpdateOptionalParams,
    ) => update(context, scope, alertId, parameters, options),
    get: (scope: string, alertId: string, options?: AlertsGetOptionalParams) =>
      get(context, scope, alertId, options),
  };
}

export function _getAlertsOperations(context: AuthorizationManagementContext): AlertsOperations {
  return {
    ..._getAlerts(context),
  };
}

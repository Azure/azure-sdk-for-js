// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { listForScope, update, get } from "../../api/alertConfigurations/operations.js";
import type {
  AlertConfigurationsListForScopeOptionalParams,
  AlertConfigurationsUpdateOptionalParams,
  AlertConfigurationsGetOptionalParams,
} from "../../api/alertConfigurations/options.js";
import type { AlertConfiguration } from "../../models/microsoft/roleManagementAlerts/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AlertConfigurations operations. */
export interface AlertConfigurationsOperations {
  /** Gets alert configurations for a resource scope. */
  listForScope: (
    scope: string,
    options?: AlertConfigurationsListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<AlertConfiguration>;
  /** Update an alert configuration. */
  update: (
    scope: string,
    alertId: string,
    parameters: AlertConfiguration,
    options?: AlertConfigurationsUpdateOptionalParams,
  ) => Promise<void>;
  /** Get the specified alert configuration. */
  get: (
    scope: string,
    alertId: string,
    options?: AlertConfigurationsGetOptionalParams,
  ) => Promise<AlertConfiguration>;
}

function _getAlertConfigurations(context: AuthorizationManagementContext) {
  return {
    listForScope: (scope: string, options?: AlertConfigurationsListForScopeOptionalParams) =>
      listForScope(context, scope, options),
    update: (
      scope: string,
      alertId: string,
      parameters: AlertConfiguration,
      options?: AlertConfigurationsUpdateOptionalParams,
    ) => update(context, scope, alertId, parameters, options),
    get: (scope: string, alertId: string, options?: AlertConfigurationsGetOptionalParams) =>
      get(context, scope, alertId, options),
  };
}

export function _getAlertConfigurationsOperations(
  context: AuthorizationManagementContext,
): AlertConfigurationsOperations {
  return {
    ..._getAlertConfigurations(context),
  };
}

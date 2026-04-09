// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { remediate, listForScope, get } from "../../api/alertIncidents/operations.js";
import type {
  AlertIncidentsRemediateOptionalParams,
  AlertIncidentsListForScopeOptionalParams,
  AlertIncidentsGetOptionalParams,
} from "../../api/alertIncidents/options.js";
import type { AlertIncident } from "../../models/microsoft/roleManagementAlerts/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AlertIncidents operations. */
export interface AlertIncidentsOperations {
  /** Remediate an alert incident. */
  remediate: (
    scope: string,
    alertId: string,
    alertIncidentId: string,
    options?: AlertIncidentsRemediateOptionalParams,
  ) => Promise<void>;
  /** Gets alert incidents for a resource scope. */
  listForScope: (
    scope: string,
    alertId: string,
    options?: AlertIncidentsListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<AlertIncident>;
  /** Get the specified alert incident. */
  get: (
    scope: string,
    alertId: string,
    alertIncidentId: string,
    options?: AlertIncidentsGetOptionalParams,
  ) => Promise<AlertIncident>;
}

function _getAlertIncidents(context: AuthorizationManagementContext) {
  return {
    remediate: (
      scope: string,
      alertId: string,
      alertIncidentId: string,
      options?: AlertIncidentsRemediateOptionalParams,
    ) => remediate(context, scope, alertId, alertIncidentId, options),
    listForScope: (
      scope: string,
      alertId: string,
      options?: AlertIncidentsListForScopeOptionalParams,
    ) => listForScope(context, scope, alertId, options),
    get: (
      scope: string,
      alertId: string,
      alertIncidentId: string,
      options?: AlertIncidentsGetOptionalParams,
    ) => get(context, scope, alertId, alertIncidentId, options),
  };
}

export function _getAlertIncidentsOperations(
  context: AuthorizationManagementContext,
): AlertIncidentsOperations {
  return {
    ..._getAlertIncidents(context),
  };
}

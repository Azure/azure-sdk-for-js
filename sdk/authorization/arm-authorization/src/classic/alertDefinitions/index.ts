// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { listForScope, get } from "../../api/alertDefinitions/operations.js";
import type {
  AlertDefinitionsListForScopeOptionalParams,
  AlertDefinitionsGetOptionalParams,
} from "../../api/alertDefinitions/options.js";
import type { AlertDefinition } from "../../models/microsoft/roleManagementAlerts/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AlertDefinitions operations. */
export interface AlertDefinitionsOperations {
  /** Gets alert definitions for a resource scope. */
  listForScope: (
    scope: string,
    options?: AlertDefinitionsListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<AlertDefinition>;
  /** Get the specified alert definition. */
  get: (
    scope: string,
    alertDefinitionId: string,
    options?: AlertDefinitionsGetOptionalParams,
  ) => Promise<AlertDefinition>;
}

function _getAlertDefinitions(context: AuthorizationManagementContext) {
  return {
    listForScope: (scope: string, options?: AlertDefinitionsListForScopeOptionalParams) =>
      listForScope(context, scope, options),
    get: (scope: string, alertDefinitionId: string, options?: AlertDefinitionsGetOptionalParams) =>
      get(context, scope, alertDefinitionId, options),
  };
}

export function _getAlertDefinitionsOperations(
  context: AuthorizationManagementContext,
): AlertDefinitionsOperations {
  return {
    ..._getAlertDefinitions(context),
  };
}

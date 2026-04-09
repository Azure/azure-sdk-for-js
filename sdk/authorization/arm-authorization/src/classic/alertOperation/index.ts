// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { get } from "../../api/alertOperation/operations.js";
import type { AlertOperationGetOptionalParams } from "../../api/alertOperation/options.js";
import type { AlertOperationResult } from "../../models/microsoft/roleManagementAlerts/models.js";

/** Interface representing a AlertOperation operations. */
export interface AlertOperationOperations {
  /** Get the specified alert operation. */
  get: (
    scope: string,
    operationId: string,
    options?: AlertOperationGetOptionalParams,
  ) => Promise<AlertOperationResult>;
}

function _getAlertOperation(context: AuthorizationManagementContext) {
  return {
    get: (scope: string, operationId: string, options?: AlertOperationGetOptionalParams) =>
      get(context, scope, operationId, options),
  };
}

export function _getAlertOperationOperations(
  context: AuthorizationManagementContext,
): AlertOperationOperations {
  return {
    ..._getAlertOperation(context),
  };
}

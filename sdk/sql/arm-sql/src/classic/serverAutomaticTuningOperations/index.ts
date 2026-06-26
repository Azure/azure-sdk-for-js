// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { update, get } from "../../api/serverAutomaticTuningOperations/operations.js";
import {
  ServerAutomaticTuningOperationsUpdateOptionalParams,
  ServerAutomaticTuningOperationsGetOptionalParams,
} from "../../api/serverAutomaticTuningOperations/options.js";
import { ServerAutomaticTuning } from "../../models/models.js";

/** Interface representing a ServerAutomaticTuningOperations operations. */
export interface ServerAutomaticTuningOperationsOperations {
  /** Update automatic tuning options on server. */
  update: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerAutomaticTuning,
    options?: ServerAutomaticTuningOperationsUpdateOptionalParams,
  ) => Promise<ServerAutomaticTuning>;
  /** Retrieves server automatic tuning options. */
  get: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerAutomaticTuningOperationsGetOptionalParams,
  ) => Promise<ServerAutomaticTuning>;
}

function _getServerAutomaticTuningOperations(context: SqlManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerAutomaticTuning,
      options?: ServerAutomaticTuningOperationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerAutomaticTuningOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, options),
  };
}

export function _getServerAutomaticTuningOperationsOperations(
  context: SqlManagementContext,
): ServerAutomaticTuningOperationsOperations {
  return {
    ..._getServerAutomaticTuningOperations(context),
  };
}

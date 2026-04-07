// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { update, get } from "../../api/serverAutomaticTuning/operations.js";
import type {
  ServerAutomaticTuningUpdateOptionalParams,
  ServerAutomaticTuningGetOptionalParams,
} from "../../api/serverAutomaticTuning/options.js";
import type { ServerAutomaticTuning } from "../../models/models.js";

/** Interface representing a ServerAutomaticTuning operations. */
export interface ServerAutomaticTuningOperations {
  /** Update automatic tuning options on server. */
  update: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerAutomaticTuning,
    options?: ServerAutomaticTuningUpdateOptionalParams,
  ) => Promise<ServerAutomaticTuning>;
  /** Retrieves server automatic tuning options. */
  get: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerAutomaticTuningGetOptionalParams,
  ) => Promise<ServerAutomaticTuning>;
}

function _getServerAutomaticTuning(context: SqlContext) {
  return {
    update: (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerAutomaticTuning,
      options?: ServerAutomaticTuningUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerAutomaticTuningGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, options),
  };
}

export function _getServerAutomaticTuningOperations(
  context: SqlContext,
): ServerAutomaticTuningOperations {
  return {
    ..._getServerAutomaticTuning(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { cutoverMigration } from "../../api/serversMigration/operations.js";
import type { ServersMigrationCutoverMigrationOptionalParams } from "../../api/serversMigration/options.js";
import type { Server } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServersMigration operations. */
export interface ServersMigrationOperations {
  /** Cutover migration for MySQL import, it will switch source elastic server DNS to flexible server. */
  cutoverMigration: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersMigrationCutoverMigrationOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
}

function _getServersMigration(context: MySQLManagementFlexibleServerContext) {
  return {
    cutoverMigration: (
      resourceGroupName: string,
      serverName: string,
      options?: ServersMigrationCutoverMigrationOptionalParams,
    ) => cutoverMigration(context, resourceGroupName, serverName, options),
  };
}

export function _getServersMigrationOperations(
  context: MySQLManagementFlexibleServerContext,
): ServersMigrationOperations {
  return {
    ..._getServersMigration(context),
  };
}

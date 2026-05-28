// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { cutoverMigration } from "../../api/serversMigration/operations.js";
import { ServersMigrationCutoverMigrationOptionalParams } from "../../api/serversMigration/options.js";
import { Server } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServersMigration operations. */
export interface ServersMigrationOperations {
  /** Cutover migration for MySQL import, it will switch source elastic server DNS to flexible server. */
  cutoverMigration: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersMigrationCutoverMigrationOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** @deprecated use cutoverMigration instead */
  beginCutoverMigration: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersMigrationCutoverMigrationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Server>, Server>>;
  /** @deprecated use cutoverMigration instead */
  beginCutoverMigrationAndWait: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersMigrationCutoverMigrationOptionalParams,
  ) => Promise<Server>;
}

function _getServersMigration(context: MySQLManagementFlexibleServerContext) {
  return {
    cutoverMigration: (
      resourceGroupName: string,
      serverName: string,
      options?: ServersMigrationCutoverMigrationOptionalParams,
    ) => cutoverMigration(context, resourceGroupName, serverName, options),
    beginCutoverMigration: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersMigrationCutoverMigrationOptionalParams,
    ) => {
      const poller = cutoverMigration(context, resourceGroupName, serverName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCutoverMigrationAndWait: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersMigrationCutoverMigrationOptionalParams,
    ) => {
      return await cutoverMigration(context, resourceGroupName, serverName, options);
    },
  };
}

export function _getServersMigrationOperations(
  context: MySQLManagementFlexibleServerContext,
): ServersMigrationOperations {
  return {
    ..._getServersMigration(context),
  };
}

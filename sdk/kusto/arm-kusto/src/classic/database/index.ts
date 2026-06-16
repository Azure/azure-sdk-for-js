// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import { inviteFollower } from "../../api/database/operations.js";
import type { DatabaseInviteFollowerOptionalParams } from "../../api/database/options.js";
import type {
  DatabaseInviteFollowerRequest,
  DatabaseInviteFollowerResult,
} from "../../models/models.js";

/** Interface representing a Database operations. */
export interface DatabaseOperations {
  /** Generates an invitation token that allows attaching a follower database to this database. */
  inviteFollower: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseInviteFollowerRequest,
    options?: DatabaseInviteFollowerOptionalParams,
  ) => Promise<DatabaseInviteFollowerResult>;
}

function _getDatabase(context: KustoManagementContext) {
  return {
    inviteFollower: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DatabaseInviteFollowerRequest,
      options?: DatabaseInviteFollowerOptionalParams,
    ) => inviteFollower(context, resourceGroupName, clusterName, databaseName, parameters, options),
  };
}

export function _getDatabaseOperations(context: KustoManagementContext): DatabaseOperations {
  return {
    ..._getDatabase(context),
  };
}

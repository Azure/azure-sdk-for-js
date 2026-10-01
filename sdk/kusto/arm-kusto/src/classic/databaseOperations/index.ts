// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import { inviteFollower } from "../../api/databaseOperations/operations.js";
import type { DatabaseOperationsInviteFollowerOptionalParams } from "../../api/databaseOperations/options.js";
import type {
  DatabaseInviteFollowerRequest,
  DatabaseInviteFollowerResult,
} from "../../models/models.js";

/** Interface representing a DatabaseOperations operations. */
export interface DatabaseOperationsOperations {
  /** Generates an invitation token that allows attaching a follower database to this database. */
  inviteFollower: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseInviteFollowerRequest,
    options?: DatabaseOperationsInviteFollowerOptionalParams,
  ) => Promise<DatabaseInviteFollowerResult>;
}

function _getDatabaseOperations(context: KustoManagementContext) {
  return {
    inviteFollower: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DatabaseInviteFollowerRequest,
      options?: DatabaseOperationsInviteFollowerOptionalParams,
    ) => inviteFollower(context, resourceGroupName, clusterName, databaseName, parameters, options),
  };
}

export function _getDatabaseOperationsOperations(
  context: KustoManagementContext,
): DatabaseOperationsOperations {
  return {
    ..._getDatabaseOperations(context),
  };
}

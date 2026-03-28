// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import { cancel, list, start, get } from "../../api/migration/operations.js";
import type {
  MigrationCancelOptionalParams,
  MigrationListOptionalParams,
  MigrationStartOptionalParams,
  MigrationGetOptionalParams,
} from "../../api/migration/options.js";
import type { Migration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Migration operations. */
export interface MigrationOperations {
  /** Cancel or rollback the migration operation in a Redis Enterprise cluster. */
  cancel: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets information about all migrations attempts in a Redis Enterprise cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationListOptionalParams,
  ) => PagedAsyncIterableIterator<Migration>;
  /** Starts a new migration */
  start: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Migration,
    options?: MigrationStartOptionalParams,
  ) => PollerLike<OperationState<Migration>, Migration>;
  /** Gets information about a migration in a Redis Enterprise cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationGetOptionalParams,
  ) => Promise<Migration>;
}

function _getMigration(context: RedisEnterpriseManagementContext) {
  return {
    cancel: (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationCancelOptionalParams,
    ) => cancel(context, resourceGroupName, clusterName, options),
    list: (resourceGroupName: string, clusterName: string, options?: MigrationListOptionalParams) =>
      list(context, resourceGroupName, clusterName, options),
    start: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Migration,
      options?: MigrationStartOptionalParams,
    ) => start(context, resourceGroupName, clusterName, parameters, options),
    get: (resourceGroupName: string, clusterName: string, options?: MigrationGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getMigrationOperations(
  context: RedisEnterpriseManagementContext,
): MigrationOperations {
  return {
    ..._getMigration(context),
  };
}

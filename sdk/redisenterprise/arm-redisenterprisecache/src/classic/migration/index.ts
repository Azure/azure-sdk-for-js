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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Migration operations. */
export interface MigrationOperations {
  /** Cancel or rollback the migration operation in a Redis Enterprise cluster. */
  cancel: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationCancelOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Migration,
    options?: MigrationStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Migration>, Migration>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Migration,
    options?: MigrationStartOptionalParams,
  ) => Promise<Migration>;
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
    beginCancel: async (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, clusterName, options);
    },
    list: (resourceGroupName: string, clusterName: string, options?: MigrationListOptionalParams) =>
      list(context, resourceGroupName, clusterName, options),
    start: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Migration,
      options?: MigrationStartOptionalParams,
    ) => start(context, resourceGroupName, clusterName, parameters, options),
    beginStart: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Migration,
      options?: MigrationStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Migration,
      options?: MigrationStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, clusterName, parameters, options);
    },
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

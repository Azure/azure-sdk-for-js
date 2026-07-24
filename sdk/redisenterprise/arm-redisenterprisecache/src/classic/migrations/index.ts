// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import { validate, cancel, list, start, get } from "../../api/migrations/operations.js";
import type {
  MigrationsValidateOptionalParams,
  MigrationsCancelOptionalParams,
  MigrationsListOptionalParams,
  MigrationsStartOptionalParams,
  MigrationsGetOptionalParams,
} from "../../api/migrations/options.js";
import type {
  Migration,
  MigrationValidationRequest,
  MigrationValidationResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Migrations operations. */
export interface MigrationsOperations {
  /** Validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource. */
  validate: (
    resourceGroupName: string,
    clusterName: string,
    body: MigrationValidationRequest,
    options?: MigrationsValidateOptionalParams,
  ) => Promise<MigrationValidationResponse>;
  /** Cancel or rollback the migration operation in a Redis Enterprise cluster. */
  cancel: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsCancelOptionalParams,
  ) => Promise<void>;
  /** Gets information about all migrations attempts in a Redis Enterprise cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Migration>;
  /** Starts a new migration */
  start: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Migration,
    options?: MigrationsStartOptionalParams,
  ) => PollerLike<OperationState<Migration>, Migration>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Migration,
    options?: MigrationsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Migration>, Migration>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Migration,
    options?: MigrationsStartOptionalParams,
  ) => Promise<Migration>;
  /** Gets information about a migration in a Redis Enterprise cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsGetOptionalParams,
  ) => Promise<Migration>;
}

function _getMigrations(context: RedisEnterpriseManagementContext) {
  return {
    validate: (
      resourceGroupName: string,
      clusterName: string,
      body: MigrationValidationRequest,
      options?: MigrationsValidateOptionalParams,
    ) => validate(context, resourceGroupName, clusterName, body, options),
    cancel: (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, clusterName, options),
    beginCancel: async (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationsCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationsCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, clusterName, options);
    },
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    start: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Migration,
      options?: MigrationsStartOptionalParams,
    ) => start(context, resourceGroupName, clusterName, parameters, options),
    beginStart: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Migration,
      options?: MigrationsStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Migration,
      options?: MigrationsStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, clusterName, parameters, options);
    },
    get: (resourceGroupName: string, clusterName: string, options?: MigrationsGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getMigrationsOperations(
  context: RedisEnterpriseManagementContext,
): MigrationsOperations {
  return {
    ..._getMigrations(context),
  };
}

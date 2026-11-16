// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import {
  validate,
  unlinkMigratedEndpoint,
  undo,
  list,
  start,
  get,
} from "../../api/migrations/operations.js";
import type {
  MigrationsValidateOptionalParams,
  MigrationsUnlinkMigratedEndpointOptionalParams,
  MigrationsUndoOptionalParams,
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
  /** Unlinks the migrated endpoint from the Azure Managed Redis cluster that was migrated from Azure Cache for Redis, removing the source cache endpoint that was redirected to this cluster during migration. */
  unlinkMigratedEndpoint: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsUnlinkMigratedEndpointOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use unlinkMigratedEndpoint instead */
  beginUnlinkMigratedEndpoint: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsUnlinkMigratedEndpointOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use unlinkMigratedEndpoint instead */
  beginUnlinkMigratedEndpointAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsUnlinkMigratedEndpointOptionalParams,
  ) => Promise<void>;
  /** Cancel or rollback the migration operation in a Redis Enterprise cluster. */
  undo: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsUndoOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use undo instead */
  beginUndo: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsUndoOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use undo instead */
  beginUndoAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: MigrationsUndoOptionalParams,
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
    unlinkMigratedEndpoint: (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationsUnlinkMigratedEndpointOptionalParams,
    ) => unlinkMigratedEndpoint(context, resourceGroupName, clusterName, options),
    beginUnlinkMigratedEndpoint: async (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationsUnlinkMigratedEndpointOptionalParams,
    ) => {
      const poller = unlinkMigratedEndpoint(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUnlinkMigratedEndpointAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationsUnlinkMigratedEndpointOptionalParams,
    ) => {
      return await unlinkMigratedEndpoint(context, resourceGroupName, clusterName, options);
    },
    undo: (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationsUndoOptionalParams,
    ) => undo(context, resourceGroupName, clusterName, options),
    beginUndo: async (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationsUndoOptionalParams,
    ) => {
      const poller = undo(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUndoAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: MigrationsUndoOptionalParams,
    ) => {
      return await undo(context, resourceGroupName, clusterName, options);
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

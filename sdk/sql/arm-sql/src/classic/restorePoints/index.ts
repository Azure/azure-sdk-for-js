// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { create, listByDatabase, $delete, get } from "../../api/restorePoints/operations.js";
import type {
  RestorePointsCreateOptionalParams,
  RestorePointsListByDatabaseOptionalParams,
  RestorePointsDeleteOptionalParams,
  RestorePointsGetOptionalParams,
} from "../../api/restorePoints/options.js";
import type { RestorePoint, CreateDatabaseRestorePointDefinition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RestorePoints operations. */
export interface RestorePointsOperations {
  /** Creates a restore point for a data warehouse. */
  create: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: CreateDatabaseRestorePointDefinition,
    options?: RestorePointsCreateOptionalParams,
  ) => PollerLike<OperationState<RestorePoint>, RestorePoint>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: CreateDatabaseRestorePointDefinition,
    options?: RestorePointsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RestorePoint>, RestorePoint>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: CreateDatabaseRestorePointDefinition,
    options?: RestorePointsCreateOptionalParams,
  ) => Promise<RestorePoint>;
  /** Gets a list of database restore points. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: RestorePointsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<RestorePoint>;
  /** Deletes a restore point. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    restorePointName: string,
    options?: RestorePointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets a restore point. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    restorePointName: string,
    options?: RestorePointsGetOptionalParams,
  ) => Promise<RestorePoint>;
}

function _getRestorePoints(context: SqlManagementContext) {
  return {
    create: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: CreateDatabaseRestorePointDefinition,
      options?: RestorePointsCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, databaseName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: CreateDatabaseRestorePointDefinition,
      options?: RestorePointsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: CreateDatabaseRestorePointDefinition,
      options?: RestorePointsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        parameters,
        options,
      );
    },
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: RestorePointsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      restorePointName: string,
      options?: RestorePointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, databaseName, restorePointName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      restorePointName: string,
      options?: RestorePointsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, restorePointName, options),
  };
}

export function _getRestorePointsOperations(
  context: SqlManagementContext,
): RestorePointsOperations {
  return {
    ..._getRestorePoints(context),
  };
}

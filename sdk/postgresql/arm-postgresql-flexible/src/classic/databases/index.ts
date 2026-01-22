// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { listByServer, $delete, create, get } from "../../api/databases/operations.js";
import type {
  DatabasesListByServerOptionalParams,
  DatabasesDeleteOptionalParams,
  DatabasesCreateOptionalParams,
  DatabasesGetOptionalParams,
} from "../../api/databases/options.js";
import type { Database } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Databases operations. */
export interface DatabasesOperations {
  /** Lists all databases in a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: DatabasesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<Database>;
  /** Deletes an existing database. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new database. */
  create: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Database>, Database>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOptionalParams,
  ) => Promise<Database>;
  /** Gets information about an existing database. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesGetOptionalParams,
  ) => Promise<Database>;
}

function _getDatabases(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: DatabasesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, databaseName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, databaseName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, databaseName, options);
    },
    create: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, databaseName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOptionalParams,
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
      parameters: Database,
      options?: DatabasesCreateOptionalParams,
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
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getDatabasesOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): DatabasesOperations {
  return {
    ..._getDatabases(context),
  };
}

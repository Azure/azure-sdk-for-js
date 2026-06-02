// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByDatabase, createOrUpdate, get } from "../../api/databaseExtensions/operations.js";
import type {
  DatabaseExtensionsListByDatabaseOptionalParams,
  DatabaseExtensionsCreateOrUpdateOptionalParams,
  DatabaseExtensionsGetOptionalParams,
} from "../../api/databaseExtensions/options.js";
import type {
  DatabaseExtensions,
  ImportExportExtensionsOperationResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatabaseExtensions operations. */
export interface DatabaseExtensionsOperations {
  /** List database extension. This will return an empty list as it is not supported. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseExtensionsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ImportExportExtensionsOperationResult>;
  /** Perform a database extension operation, like database import, database export, or polybase import */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    extensionName: string,
    parameters: DatabaseExtensions,
    options?: DatabaseExtensionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ImportExportExtensionsOperationResult>,
    ImportExportExtensionsOperationResult
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    extensionName: string,
    parameters: DatabaseExtensions,
    options?: DatabaseExtensionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ImportExportExtensionsOperationResult>,
      ImportExportExtensionsOperationResult
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    extensionName: string,
    parameters: DatabaseExtensions,
    options?: DatabaseExtensionsCreateOrUpdateOptionalParams,
  ) => Promise<ImportExportExtensionsOperationResult>;
  /** Gets a database extension. This will return resource not found as it is not supported. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    extensionName: string,
    options?: DatabaseExtensionsGetOptionalParams,
  ) => Promise<void>;
}

function _getDatabaseExtensions(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseExtensionsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      extensionName: string,
      parameters: DatabaseExtensions,
      options?: DatabaseExtensionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        extensionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      extensionName: string,
      parameters: DatabaseExtensions,
      options?: DatabaseExtensionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        extensionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      extensionName: string,
      parameters: DatabaseExtensions,
      options?: DatabaseExtensionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        extensionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      extensionName: string,
      options?: DatabaseExtensionsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, extensionName, options),
  };
}

export function _getDatabaseExtensionsOperations(
  context: SqlManagementContext,
): DatabaseExtensionsOperations {
  return {
    ..._getDatabaseExtensions(context),
  };
}

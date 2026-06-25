// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/databaseExtensionsOperations/operations.js";
import {
  DatabaseExtensionsOperationsListByDatabaseOptionalParams,
  DatabaseExtensionsOperationsCreateOrUpdateOptionalParams,
  DatabaseExtensionsOperationsGetOptionalParams,
} from "../../api/databaseExtensionsOperations/options.js";
import { DatabaseExtensions, ImportExportExtensionsOperationResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatabaseExtensionsOperations operations. */
export interface DatabaseExtensionsOperationsOperations {
  /** List database extension. This will return an empty list as it is not supported. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseExtensionsOperationsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ImportExportExtensionsOperationResult>;
  /** Perform a database extension operation, like database import, database export, or polybase import */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    extensionName: string,
    parameters: DatabaseExtensions,
    options?: DatabaseExtensionsOperationsCreateOrUpdateOptionalParams,
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
    options?: DatabaseExtensionsOperationsCreateOrUpdateOptionalParams,
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
    options?: DatabaseExtensionsOperationsCreateOrUpdateOptionalParams,
  ) => Promise<ImportExportExtensionsOperationResult>;
  /** Gets a database extension. This will return resource not found as it is not supported. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    extensionName: string,
    options?: DatabaseExtensionsOperationsGetOptionalParams,
  ) => Promise<void>;
}

function _getDatabaseExtensionsOperations(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseExtensionsOperationsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      extensionName: string,
      parameters: DatabaseExtensions,
      options?: DatabaseExtensionsOperationsCreateOrUpdateOptionalParams,
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
      options?: DatabaseExtensionsOperationsCreateOrUpdateOptionalParams,
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
      options?: DatabaseExtensionsOperationsCreateOrUpdateOptionalParams,
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
      options?: DatabaseExtensionsOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, extensionName, options),
  };
}

export function _getDatabaseExtensionsOperationsOperations(
  context: SqlManagementContext,
): DatabaseExtensionsOperationsOperations {
  return {
    ..._getDatabaseExtensionsOperations(context),
  };
}

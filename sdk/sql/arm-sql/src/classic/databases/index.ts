// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByElasticPool,
  listInaccessibleByServer,
  upgradeDataWarehouse,
  resume,
  pause,
  rename,
  $import,
  failover,
  $export,
  listByServer,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/databases/operations.js";
import type {
  DatabasesListByElasticPoolOptionalParams,
  DatabasesListInaccessibleByServerOptionalParams,
  DatabasesUpgradeDataWarehouseOptionalParams,
  DatabasesResumeOptionalParams,
  DatabasesPauseOptionalParams,
  DatabasesRenameOptionalParams,
  DatabasesImportOptionalParams,
  DatabasesFailoverOptionalParams,
  DatabasesExportOptionalParams,
  DatabasesListByServerOptionalParams,
  DatabasesDeleteOptionalParams,
  DatabasesUpdateOptionalParams,
  DatabasesCreateOrUpdateOptionalParams,
  DatabasesGetOptionalParams,
} from "../../api/databases/options.js";
import type {
  Database,
  DatabaseUpdate,
  ExportDatabaseDefinition,
  ImportExportOperationResult,
  ImportExistingDatabaseDefinition,
  ResourceMoveDefinition,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Databases operations. */
export interface DatabasesOperations {
  /** Gets a list of databases in an elastic pool. */
  listByElasticPool: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: DatabasesListByElasticPoolOptionalParams,
  ) => PagedAsyncIterableIterator<Database>;
  /** Gets a list of inaccessible databases in a logical server */
  listInaccessibleByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: DatabasesListInaccessibleByServerOptionalParams,
  ) => PagedAsyncIterableIterator<Database>;
  /** Upgrades a data warehouse. */
  upgradeDataWarehouse: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesUpgradeDataWarehouseOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use upgradeDataWarehouse instead */
  beginUpgradeDataWarehouse: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesUpgradeDataWarehouseOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use upgradeDataWarehouse instead */
  beginUpgradeDataWarehouseAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesUpgradeDataWarehouseOptionalParams,
  ) => Promise<void>;
  /** Resumes a database. */
  resume: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesResumeOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** @deprecated use resume instead */
  beginResume: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesResumeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Database>, Database>>;
  /** @deprecated use resume instead */
  beginResumeAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesResumeOptionalParams,
  ) => Promise<Database>;
  /** Pauses a database. */
  pause: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesPauseOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** @deprecated use pause instead */
  beginPause: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesPauseOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Database>, Database>>;
  /** @deprecated use pause instead */
  beginPauseAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesPauseOptionalParams,
  ) => Promise<Database>;
  /** Renames a database. */
  rename: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: ResourceMoveDefinition,
    options?: DatabasesRenameOptionalParams,
  ) => Promise<void>;
  /** Imports a bacpac into a new database. */
  /**
   *  @fixme Import is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  import: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: ImportExistingDatabaseDefinition,
    options?: DatabasesImportOptionalParams,
  ) => PollerLike<OperationState<ImportExportOperationResult>, ImportExportOperationResult>;
  /** @deprecated use import instead */
  beginImport: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: ImportExistingDatabaseDefinition,
    options?: DatabasesImportOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ImportExportOperationResult>, ImportExportOperationResult>
  >;
  /** @deprecated use import instead */
  beginImportAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: ImportExistingDatabaseDefinition,
    options?: DatabasesImportOptionalParams,
  ) => Promise<ImportExportOperationResult>;
  /** Failovers a database. */
  failover: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesFailoverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesFailoverOptionalParams,
  ) => Promise<void>;
  /** Exports a database. */
  /**
   *  @fixme export is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  export: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: ExportDatabaseDefinition,
    options?: DatabasesExportOptionalParams,
  ) => PollerLike<OperationState<ImportExportOperationResult>, ImportExportOperationResult>;
  /** @deprecated use export instead */
  beginExport: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: ExportDatabaseDefinition,
    options?: DatabasesExportOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ImportExportOperationResult>, ImportExportOperationResult>
  >;
  /** @deprecated use export instead */
  beginExportAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: ExportDatabaseDefinition,
    options?: DatabasesExportOptionalParams,
  ) => Promise<ImportExportOperationResult>;
  /** Gets a list of databases. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: DatabasesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<Database>;
  /** Deletes the database. */
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
  /** Updates an existing database. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: DatabaseUpdate,
    options?: DatabasesUpdateOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: DatabaseUpdate,
    options?: DatabasesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Database>, Database>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: DatabaseUpdate,
    options?: DatabasesUpdateOptionalParams,
  ) => Promise<Database>;
  /** Creates a new database or updates an existing database. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Database>, Database>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOrUpdateOptionalParams,
  ) => Promise<Database>;
  /** Gets a database. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesGetOptionalParams,
  ) => Promise<Database>;
}

function _getDatabases(context: SqlManagementContext) {
  return {
    listByElasticPool: (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      options?: DatabasesListByElasticPoolOptionalParams,
    ) => listByElasticPool(context, resourceGroupName, serverName, elasticPoolName, options),
    listInaccessibleByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: DatabasesListInaccessibleByServerOptionalParams,
    ) => listInaccessibleByServer(context, resourceGroupName, serverName, options),
    upgradeDataWarehouse: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesUpgradeDataWarehouseOptionalParams,
    ) => upgradeDataWarehouse(context, resourceGroupName, serverName, databaseName, options),
    beginUpgradeDataWarehouse: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesUpgradeDataWarehouseOptionalParams,
    ) => {
      const poller = upgradeDataWarehouse(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpgradeDataWarehouseAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesUpgradeDataWarehouseOptionalParams,
    ) => {
      return await upgradeDataWarehouse(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        options,
      );
    },
    resume: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesResumeOptionalParams,
    ) => resume(context, resourceGroupName, serverName, databaseName, options),
    beginResume: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesResumeOptionalParams,
    ) => {
      const poller = resume(context, resourceGroupName, serverName, databaseName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResumeAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesResumeOptionalParams,
    ) => {
      return await resume(context, resourceGroupName, serverName, databaseName, options);
    },
    pause: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesPauseOptionalParams,
    ) => pause(context, resourceGroupName, serverName, databaseName, options),
    beginPause: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesPauseOptionalParams,
    ) => {
      const poller = pause(context, resourceGroupName, serverName, databaseName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPauseAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesPauseOptionalParams,
    ) => {
      return await pause(context, resourceGroupName, serverName, databaseName, options);
    },
    rename: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: ResourceMoveDefinition,
      options?: DatabasesRenameOptionalParams,
    ) => rename(context, resourceGroupName, serverName, databaseName, parameters, options),
    import: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: ImportExistingDatabaseDefinition,
      options?: DatabasesImportOptionalParams,
    ) => $import(context, resourceGroupName, serverName, databaseName, parameters, options),
    beginImport: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: ImportExistingDatabaseDefinition,
      options?: DatabasesImportOptionalParams,
    ) => {
      const poller = $import(
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
    beginImportAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: ImportExistingDatabaseDefinition,
      options?: DatabasesImportOptionalParams,
    ) => {
      return await $import(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        parameters,
        options,
      );
    },
    failover: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesFailoverOptionalParams,
    ) => failover(context, resourceGroupName, serverName, databaseName, options),
    beginFailover: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesFailoverOptionalParams,
    ) => {
      const poller = failover(context, resourceGroupName, serverName, databaseName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, serverName, databaseName, options);
    },
    export: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: ExportDatabaseDefinition,
      options?: DatabasesExportOptionalParams,
    ) => $export(context, resourceGroupName, serverName, databaseName, parameters, options),
    beginExport: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: ExportDatabaseDefinition,
      options?: DatabasesExportOptionalParams,
    ) => {
      const poller = $export(
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
    beginExportAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: ExportDatabaseDefinition,
      options?: DatabasesExportOptionalParams,
    ) => {
      return await $export(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        parameters,
        options,
      );
    },
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
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: DatabaseUpdate,
      options?: DatabasesUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, databaseName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: DatabaseUpdate,
      options?: DatabasesUpdateOptionalParams,
    ) => {
      const poller = update(
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
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: DatabaseUpdate,
      options?: DatabasesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, databaseName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
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
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
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

export function _getDatabasesOperations(context: SqlManagementContext): DatabasesOperations {
  return {
    ..._getDatabases(context),
  };
}

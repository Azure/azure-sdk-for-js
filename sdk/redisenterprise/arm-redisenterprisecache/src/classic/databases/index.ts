// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import {
  upgradeDBRedisVersion,
  flush,
  forceLinkToReplicationGroup,
  forceUnlink,
  $export,
  $import,
  regenerateKey,
  listKeys,
  listByCluster,
  $delete,
  update,
  create,
  get,
} from "../../api/databases/operations.js";
import type {
  DatabasesUpgradeDBRedisVersionOptionalParams,
  DatabasesFlushOptionalParams,
  DatabasesForceLinkToReplicationGroupOptionalParams,
  DatabasesForceUnlinkOptionalParams,
  DatabasesExportOptionalParams,
  DatabasesImportOptionalParams,
  DatabasesRegenerateKeyOptionalParams,
  DatabasesListKeysOptionalParams,
  DatabasesListByClusterOptionalParams,
  DatabasesDeleteOptionalParams,
  DatabasesUpdateOptionalParams,
  DatabasesCreateOptionalParams,
  DatabasesGetOptionalParams,
} from "../../api/databases/options.js";
import type {
  Database,
  DatabaseUpdate,
  AccessKeys,
  RegenerateKeyParameters,
  ImportClusterParameters,
  ExportClusterParameters,
  ForceUnlinkParameters,
  ForceLinkParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Databases operations. */
export interface DatabasesOperations {
  /** Upgrades the database Redis version to the latest available. */
  upgradeDBRedisVersion: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesUpgradeDBRedisVersionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Flushes all the keys in this database and also from its linked databases. */
  flush: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesFlushOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Forcibly recreates an existing database on the specified cluster, and rejoins it to an existing replication group. **IMPORTANT NOTE:** All data in this database will be discarded, and the database will temporarily be unavailable while rejoining the replication group. */
  forceLinkToReplicationGroup: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ForceLinkParameters,
    options?: DatabasesForceLinkToReplicationGroupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Forcibly removes the link to the specified database resource. */
  forceUnlink: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ForceUnlinkParameters,
    options?: DatabasesForceUnlinkOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Exports a database file from target database. */
  /**
   *  @fixme export is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  export: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ExportClusterParameters,
    options?: DatabasesExportOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Imports database files to target database. */
  /**
   *  @fixme import is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  import: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ImportClusterParameters,
    options?: DatabasesImportOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Regenerates the Redis Enterprise database's access keys. */
  regenerateKey: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: RegenerateKeyParameters,
    options?: DatabasesRegenerateKeyOptionalParams,
  ) => PollerLike<OperationState<AccessKeys>, AccessKeys>;
  /** Retrieves the access keys for the Redis Enterprise database. */
  listKeys: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets all databases in the specified Redis Enterprise cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: DatabasesListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<Database>;
  /** Deletes a single database */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a database */
  update: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseUpdate,
    options?: DatabasesUpdateOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** Creates a database */
  create: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** Gets information about a database in a Redis Enterprise cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesGetOptionalParams,
  ) => Promise<Database>;
}

function _getDatabases(context: RedisEnterpriseManagementContext) {
  return {
    upgradeDBRedisVersion: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesUpgradeDBRedisVersionOptionalParams,
    ) => upgradeDBRedisVersion(context, resourceGroupName, clusterName, databaseName, options),
    flush: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesFlushOptionalParams,
    ) => flush(context, resourceGroupName, clusterName, databaseName, options),
    forceLinkToReplicationGroup: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ForceLinkParameters,
      options?: DatabasesForceLinkToReplicationGroupOptionalParams,
    ) =>
      forceLinkToReplicationGroup(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      ),
    forceUnlink: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ForceUnlinkParameters,
      options?: DatabasesForceUnlinkOptionalParams,
    ) => forceUnlink(context, resourceGroupName, clusterName, databaseName, parameters, options),
    export: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ExportClusterParameters,
      options?: DatabasesExportOptionalParams,
    ) => $export(context, resourceGroupName, clusterName, databaseName, parameters, options),
    import: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ImportClusterParameters,
      options?: DatabasesImportOptionalParams,
    ) => $import(context, resourceGroupName, clusterName, databaseName, parameters, options),
    regenerateKey: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: RegenerateKeyParameters,
      options?: DatabasesRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, clusterName, databaseName, parameters, options),
    listKeys: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, clusterName, databaseName, options),
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: DatabasesListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, databaseName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DatabaseUpdate,
      options?: DatabasesUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, databaseName, parameters, options),
    create: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, databaseName, parameters, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, databaseName, options),
  };
}

export function _getDatabasesOperations(
  context: RedisEnterpriseManagementContext,
): DatabasesOperations {
  return {
    ..._getDatabases(context),
  };
}

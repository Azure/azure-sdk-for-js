// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
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
import {
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
import {
  Database,
  DatabaseUpdate,
  AccessKeys,
  RegenerateKeyParameters,
  ImportClusterParameters,
  ExportClusterParameters,
  ForceUnlinkParameters,
  ForceLinkParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Databases operations. */
export interface DatabasesOperations {
  /** Upgrades the database Redis version to the latest available. */
  upgradeDBRedisVersion: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesUpgradeDBRedisVersionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use upgradeDBRedisVersion instead */
  beginUpgradeDBRedisVersion: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesUpgradeDBRedisVersionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use upgradeDBRedisVersion instead */
  beginUpgradeDBRedisVersionAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesUpgradeDBRedisVersionOptionalParams,
  ) => Promise<void>;
  /** Flushes all the keys in this database and also from its linked databases. */
  flush: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesFlushOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use flush instead */
  beginFlush: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesFlushOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use flush instead */
  beginFlushAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesFlushOptionalParams,
  ) => Promise<void>;
  /** Forcibly recreates an existing database on the specified cluster, and rejoins it to an existing replication group. **IMPORTANT NOTE:** All data in this database will be discarded, and the database will temporarily be unavailable while rejoining the replication group. */
  forceLinkToReplicationGroup: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ForceLinkParameters,
    options?: DatabasesForceLinkToReplicationGroupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use forceLinkToReplicationGroup instead */
  beginForceLinkToReplicationGroup: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ForceLinkParameters,
    options?: DatabasesForceLinkToReplicationGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use forceLinkToReplicationGroup instead */
  beginForceLinkToReplicationGroupAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ForceLinkParameters,
    options?: DatabasesForceLinkToReplicationGroupOptionalParams,
  ) => Promise<void>;
  /** Forcibly removes the link to the specified database resource. */
  forceUnlink: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ForceUnlinkParameters,
    options?: DatabasesForceUnlinkOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use forceUnlink instead */
  beginForceUnlink: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ForceUnlinkParameters,
    options?: DatabasesForceUnlinkOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use forceUnlink instead */
  beginForceUnlinkAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ForceUnlinkParameters,
    options?: DatabasesForceUnlinkOptionalParams,
  ) => Promise<void>;
  /** Exports a database file from target database. */
  export: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ExportClusterParameters,
    options?: DatabasesExportOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use export instead */
  beginExport: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ExportClusterParameters,
    options?: DatabasesExportOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use export instead */
  beginExportAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ExportClusterParameters,
    options?: DatabasesExportOptionalParams,
  ) => Promise<void>;
  /** Imports database files to target database. */
  import: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ImportClusterParameters,
    options?: DatabasesImportOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use import instead */
  beginImport: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ImportClusterParameters,
    options?: DatabasesImportOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use import instead */
  beginImportAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: ImportClusterParameters,
    options?: DatabasesImportOptionalParams,
  ) => Promise<void>;
  /** Regenerates the Redis Enterprise database's access keys. */
  regenerateKey: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: RegenerateKeyParameters,
    options?: DatabasesRegenerateKeyOptionalParams,
  ) => PollerLike<OperationState<AccessKeys>, AccessKeys>;
  /** @deprecated use regenerateKey instead */
  beginRegenerateKey: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: RegenerateKeyParameters,
    options?: DatabasesRegenerateKeyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessKeys>, AccessKeys>>;
  /** @deprecated use regenerateKey instead */
  beginRegenerateKeyAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: RegenerateKeyParameters,
    options?: DatabasesRegenerateKeyOptionalParams,
  ) => Promise<AccessKeys>;
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
  delete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a database */
  update: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseUpdate,
    options?: DatabasesUpdateOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseUpdate,
    options?: DatabasesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Database>, Database>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseUpdate,
    options?: DatabasesUpdateOptionalParams,
  ) => Promise<Database>;
  /** Creates a database */
  create: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Database>, Database>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOptionalParams,
  ) => Promise<Database>;
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
    beginUpgradeDBRedisVersion: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesUpgradeDBRedisVersionOptionalParams,
    ) => {
      const poller = upgradeDBRedisVersion(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpgradeDBRedisVersionAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesUpgradeDBRedisVersionOptionalParams,
    ) => {
      return await upgradeDBRedisVersion(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        options,
      );
    },
    flush: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesFlushOptionalParams,
    ) => flush(context, resourceGroupName, clusterName, databaseName, options),
    beginFlush: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesFlushOptionalParams,
    ) => {
      const poller = flush(context, resourceGroupName, clusterName, databaseName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFlushAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesFlushOptionalParams,
    ) => {
      return await flush(context, resourceGroupName, clusterName, databaseName, options);
    },
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
    beginForceLinkToReplicationGroup: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ForceLinkParameters,
      options?: DatabasesForceLinkToReplicationGroupOptionalParams,
    ) => {
      const poller = forceLinkToReplicationGroup(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginForceLinkToReplicationGroupAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ForceLinkParameters,
      options?: DatabasesForceLinkToReplicationGroupOptionalParams,
    ) => {
      return await forceLinkToReplicationGroup(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
    },
    forceUnlink: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ForceUnlinkParameters,
      options?: DatabasesForceUnlinkOptionalParams,
    ) => forceUnlink(context, resourceGroupName, clusterName, databaseName, parameters, options),
    beginForceUnlink: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ForceUnlinkParameters,
      options?: DatabasesForceUnlinkOptionalParams,
    ) => {
      const poller = forceUnlink(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginForceUnlinkAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ForceUnlinkParameters,
      options?: DatabasesForceUnlinkOptionalParams,
    ) => {
      return await forceUnlink(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
    },
    export: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ExportClusterParameters,
      options?: DatabasesExportOptionalParams,
    ) => $export(context, resourceGroupName, clusterName, databaseName, parameters, options),
    beginExport: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ExportClusterParameters,
      options?: DatabasesExportOptionalParams,
    ) => {
      const poller = $export(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExportAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ExportClusterParameters,
      options?: DatabasesExportOptionalParams,
    ) => {
      return await $export(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
    },
    import: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ImportClusterParameters,
      options?: DatabasesImportOptionalParams,
    ) => $import(context, resourceGroupName, clusterName, databaseName, parameters, options),
    beginImport: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ImportClusterParameters,
      options?: DatabasesImportOptionalParams,
    ) => {
      const poller = $import(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginImportAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: ImportClusterParameters,
      options?: DatabasesImportOptionalParams,
    ) => {
      return await $import(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
    },
    regenerateKey: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: RegenerateKeyParameters,
      options?: DatabasesRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, clusterName, databaseName, parameters, options),
    beginRegenerateKey: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: RegenerateKeyParameters,
      options?: DatabasesRegenerateKeyOptionalParams,
    ) => {
      const poller = regenerateKey(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRegenerateKeyAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: RegenerateKeyParameters,
      options?: DatabasesRegenerateKeyOptionalParams,
    ) => {
      return await regenerateKey(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, databaseName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, databaseName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DatabaseUpdate,
      options?: DatabasesUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, databaseName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DatabaseUpdate,
      options?: DatabasesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DatabaseUpdate,
      options?: DatabasesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, databaseName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
    },
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByServer,
  failoverAllowDataLoss,
  failover,
  listByDatabase,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/replicationLinks/operations.js";
import type {
  ReplicationLinksListByServerOptionalParams,
  ReplicationLinksFailoverAllowDataLossOptionalParams,
  ReplicationLinksFailoverOptionalParams,
  ReplicationLinksListByDatabaseOptionalParams,
  ReplicationLinksDeleteOptionalParams,
  ReplicationLinksUpdateOptionalParams,
  ReplicationLinksCreateOrUpdateOptionalParams,
  ReplicationLinksGetOptionalParams,
} from "../../api/replicationLinks/options.js";
import type { ReplicationLink, ReplicationLinkUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationLinks operations. */
export interface ReplicationLinksOperations {
  /** Gets a list of replication links. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ReplicationLinksListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ReplicationLink>;
  /** Fails over from the current primary server to this server allowing data loss. */
  failoverAllowDataLoss: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    options?: ReplicationLinksFailoverAllowDataLossOptionalParams,
  ) => PollerLike<OperationState<ReplicationLink>, ReplicationLink>;
  /** @deprecated use failoverAllowDataLoss instead */
  beginFailoverAllowDataLoss: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    options?: ReplicationLinksFailoverAllowDataLossOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ReplicationLink>, ReplicationLink>>;
  /** @deprecated use failoverAllowDataLoss instead */
  beginFailoverAllowDataLossAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    options?: ReplicationLinksFailoverAllowDataLossOptionalParams,
  ) => Promise<ReplicationLink>;
  /** Fails over from the current primary server to this server. */
  failover: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    options?: ReplicationLinksFailoverOptionalParams,
  ) => PollerLike<OperationState<ReplicationLink>, ReplicationLink>;
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    options?: ReplicationLinksFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ReplicationLink>, ReplicationLink>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    options?: ReplicationLinksFailoverOptionalParams,
  ) => Promise<ReplicationLink>;
  /** Gets a list of replication links on database. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: ReplicationLinksListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ReplicationLink>;
  /** Deletes the replication link. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    options?: ReplicationLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    options?: ReplicationLinksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    options?: ReplicationLinksDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the replication link type. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    parameters: ReplicationLinkUpdate,
    options?: ReplicationLinksUpdateOptionalParams,
  ) => PollerLike<OperationState<ReplicationLink>, ReplicationLink>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    parameters: ReplicationLinkUpdate,
    options?: ReplicationLinksUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ReplicationLink>, ReplicationLink>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    parameters: ReplicationLinkUpdate,
    options?: ReplicationLinksUpdateOptionalParams,
  ) => Promise<ReplicationLink>;
  /** Updates the replication link type. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    parameters: ReplicationLink,
    options?: ReplicationLinksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ReplicationLink>, ReplicationLink>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    parameters: ReplicationLink,
    options?: ReplicationLinksCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ReplicationLink>, ReplicationLink>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    parameters: ReplicationLink,
    options?: ReplicationLinksCreateOrUpdateOptionalParams,
  ) => Promise<ReplicationLink>;
  /** Gets a replication link. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    linkId: string,
    options?: ReplicationLinksGetOptionalParams,
  ) => Promise<ReplicationLink>;
}

function _getReplicationLinks(context: SqlContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ReplicationLinksListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    failoverAllowDataLoss: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      options?: ReplicationLinksFailoverAllowDataLossOptionalParams,
    ) =>
      failoverAllowDataLoss(context, resourceGroupName, serverName, databaseName, linkId, options),
    beginFailoverAllowDataLoss: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      options?: ReplicationLinksFailoverAllowDataLossOptionalParams,
    ) => {
      const poller = failoverAllowDataLoss(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        linkId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAllowDataLossAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      options?: ReplicationLinksFailoverAllowDataLossOptionalParams,
    ) => {
      return await failoverAllowDataLoss(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        linkId,
        options,
      );
    },
    failover: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      options?: ReplicationLinksFailoverOptionalParams,
    ) => failover(context, resourceGroupName, serverName, databaseName, linkId, options),
    beginFailover: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      options?: ReplicationLinksFailoverOptionalParams,
    ) => {
      const poller = failover(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        linkId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      options?: ReplicationLinksFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, serverName, databaseName, linkId, options);
    },
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: ReplicationLinksListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      options?: ReplicationLinksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, databaseName, linkId, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      options?: ReplicationLinksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, databaseName, linkId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      options?: ReplicationLinksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, databaseName, linkId, options);
    },
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      parameters: ReplicationLinkUpdate,
      options?: ReplicationLinksUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, databaseName, linkId, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      parameters: ReplicationLinkUpdate,
      options?: ReplicationLinksUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        linkId,
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
      linkId: string,
      parameters: ReplicationLinkUpdate,
      options?: ReplicationLinksUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        linkId,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      parameters: ReplicationLink,
      options?: ReplicationLinksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        linkId,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      parameters: ReplicationLink,
      options?: ReplicationLinksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        linkId,
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
      linkId: string,
      parameters: ReplicationLink,
      options?: ReplicationLinksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        linkId,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      linkId: string,
      options?: ReplicationLinksGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, linkId, options),
  };
}

export function _getReplicationLinksOperations(context: SqlContext): ReplicationLinksOperations {
  return {
    ..._getReplicationLinks(context),
  };
}

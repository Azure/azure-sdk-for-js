// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  failover,
  listByServer,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/elasticPools/operations.js";
import type {
  ElasticPoolsFailoverOptionalParams,
  ElasticPoolsListByServerOptionalParams,
  ElasticPoolsDeleteOptionalParams,
  ElasticPoolsUpdateOptionalParams,
  ElasticPoolsCreateOrUpdateOptionalParams,
  ElasticPoolsGetOptionalParams,
} from "../../api/elasticPools/options.js";
import type { ElasticPool, ElasticPoolUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ElasticPools operations. */
export interface ElasticPoolsOperations {
  /** Failovers an elastic pool. */
  failover: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: ElasticPoolsFailoverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: ElasticPoolsFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: ElasticPoolsFailoverOptionalParams,
  ) => Promise<void>;
  /** Gets all elastic pools in a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ElasticPoolsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticPool>;
  /** Deletes an elastic pool. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: ElasticPoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: ElasticPoolsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: ElasticPoolsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an elastic pool. */
  update: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    parameters: ElasticPoolUpdate,
    options?: ElasticPoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticPool>, ElasticPool>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    parameters: ElasticPoolUpdate,
    options?: ElasticPoolsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ElasticPool>, ElasticPool>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    parameters: ElasticPoolUpdate,
    options?: ElasticPoolsUpdateOptionalParams,
  ) => Promise<ElasticPool>;
  /** Creates or updates an elastic pool. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    parameters: ElasticPool,
    options?: ElasticPoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticPool>, ElasticPool>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    parameters: ElasticPool,
    options?: ElasticPoolsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ElasticPool>, ElasticPool>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    parameters: ElasticPool,
    options?: ElasticPoolsCreateOrUpdateOptionalParams,
  ) => Promise<ElasticPool>;
  /** Gets an elastic pool. */
  get: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: ElasticPoolsGetOptionalParams,
  ) => Promise<ElasticPool>;
}

function _getElasticPools(context: SqlManagementContext) {
  return {
    failover: (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      options?: ElasticPoolsFailoverOptionalParams,
    ) => failover(context, resourceGroupName, serverName, elasticPoolName, options),
    beginFailover: async (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      options?: ElasticPoolsFailoverOptionalParams,
    ) => {
      const poller = failover(context, resourceGroupName, serverName, elasticPoolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      options?: ElasticPoolsFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, serverName, elasticPoolName, options);
    },
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ElasticPoolsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      options?: ElasticPoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, elasticPoolName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      options?: ElasticPoolsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, elasticPoolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      options?: ElasticPoolsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, elasticPoolName, options);
    },
    update: (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      parameters: ElasticPoolUpdate,
      options?: ElasticPoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, elasticPoolName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      parameters: ElasticPoolUpdate,
      options?: ElasticPoolsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serverName,
        elasticPoolName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      parameters: ElasticPoolUpdate,
      options?: ElasticPoolsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serverName,
        elasticPoolName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      parameters: ElasticPool,
      options?: ElasticPoolsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serverName, elasticPoolName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      parameters: ElasticPool,
      options?: ElasticPoolsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        elasticPoolName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      parameters: ElasticPool,
      options?: ElasticPoolsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        elasticPoolName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      options?: ElasticPoolsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, elasticPoolName, options),
  };
}

export function _getElasticPoolsOperations(context: SqlManagementContext): ElasticPoolsOperations {
  return {
    ..._getElasticPools(context),
  };
}

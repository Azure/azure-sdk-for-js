// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  tryPlannedBeforeForcedFailover,
  forceFailoverAllowDataLoss,
  failover,
  listByServer,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/failoverGroups/operations.js";
import type {
  FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams,
  FailoverGroupsForceFailoverAllowDataLossOptionalParams,
  FailoverGroupsFailoverOptionalParams,
  FailoverGroupsListByServerOptionalParams,
  FailoverGroupsDeleteOptionalParams,
  FailoverGroupsUpdateOptionalParams,
  FailoverGroupsCreateOrUpdateOptionalParams,
  FailoverGroupsGetOptionalParams,
} from "../../api/failoverGroups/options.js";
import type { FailoverGroup, FailoverGroupUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FailoverGroups operations. */
export interface FailoverGroupsOperations {
  /** Fails over from the current primary server to this server. This operation tries planned before forced failover but might still result in data loss. */
  tryPlannedBeforeForcedFailover: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams,
  ) => PollerLike<OperationState<FailoverGroup>, FailoverGroup>;
  /** @deprecated use tryPlannedBeforeForcedFailover instead */
  beginTryPlannedBeforeForcedFailover: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FailoverGroup>, FailoverGroup>>;
  /** @deprecated use tryPlannedBeforeForcedFailover instead */
  beginTryPlannedBeforeForcedFailoverAndWait: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams,
  ) => Promise<FailoverGroup>;
  /** Fails over from the current primary server to this server. This operation might result in data loss. */
  forceFailoverAllowDataLoss: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsForceFailoverAllowDataLossOptionalParams,
  ) => PollerLike<OperationState<FailoverGroup>, FailoverGroup>;
  /** @deprecated use forceFailoverAllowDataLoss instead */
  beginForceFailoverAllowDataLoss: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsForceFailoverAllowDataLossOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FailoverGroup>, FailoverGroup>>;
  /** @deprecated use forceFailoverAllowDataLoss instead */
  beginForceFailoverAllowDataLossAndWait: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsForceFailoverAllowDataLossOptionalParams,
  ) => Promise<FailoverGroup>;
  /** Fails over from the current primary server to this server. */
  failover: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsFailoverOptionalParams,
  ) => PollerLike<OperationState<FailoverGroup>, FailoverGroup>;
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FailoverGroup>, FailoverGroup>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsFailoverOptionalParams,
  ) => Promise<FailoverGroup>;
  /** Lists the failover groups in a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: FailoverGroupsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<FailoverGroup>;
  /** Deletes a failover group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a failover group. */
  update: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    parameters: FailoverGroupUpdate,
    options?: FailoverGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<FailoverGroup>, FailoverGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    parameters: FailoverGroupUpdate,
    options?: FailoverGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FailoverGroup>, FailoverGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    parameters: FailoverGroupUpdate,
    options?: FailoverGroupsUpdateOptionalParams,
  ) => Promise<FailoverGroup>;
  /** Creates or updates a failover group. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    parameters: FailoverGroup,
    options?: FailoverGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FailoverGroup>, FailoverGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    parameters: FailoverGroup,
    options?: FailoverGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FailoverGroup>, FailoverGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    parameters: FailoverGroup,
    options?: FailoverGroupsCreateOrUpdateOptionalParams,
  ) => Promise<FailoverGroup>;
  /** Gets a failover group. */
  get: (
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: FailoverGroupsGetOptionalParams,
  ) => Promise<FailoverGroup>;
}

function _getFailoverGroups(context: SqlContext) {
  return {
    tryPlannedBeforeForcedFailover: (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams,
    ) =>
      tryPlannedBeforeForcedFailover(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        options,
      ),
    beginTryPlannedBeforeForcedFailover: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams,
    ) => {
      const poller = tryPlannedBeforeForcedFailover(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTryPlannedBeforeForcedFailoverAndWait: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams,
    ) => {
      return await tryPlannedBeforeForcedFailover(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        options,
      );
    },
    forceFailoverAllowDataLoss: (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsForceFailoverAllowDataLossOptionalParams,
    ) =>
      forceFailoverAllowDataLoss(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        options,
      ),
    beginForceFailoverAllowDataLoss: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsForceFailoverAllowDataLossOptionalParams,
    ) => {
      const poller = forceFailoverAllowDataLoss(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginForceFailoverAllowDataLossAndWait: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsForceFailoverAllowDataLossOptionalParams,
    ) => {
      return await forceFailoverAllowDataLoss(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        options,
      );
    },
    failover: (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsFailoverOptionalParams,
    ) => failover(context, resourceGroupName, serverName, failoverGroupName, options),
    beginFailover: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsFailoverOptionalParams,
    ) => {
      const poller = failover(context, resourceGroupName, serverName, failoverGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, serverName, failoverGroupName, options);
    },
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: FailoverGroupsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, failoverGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, failoverGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, failoverGroupName, options);
    },
    update: (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      parameters: FailoverGroupUpdate,
      options?: FailoverGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, failoverGroupName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      parameters: FailoverGroupUpdate,
      options?: FailoverGroupsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      parameters: FailoverGroupUpdate,
      options?: FailoverGroupsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      parameters: FailoverGroup,
      options?: FailoverGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      parameters: FailoverGroup,
      options?: FailoverGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      parameters: FailoverGroup,
      options?: FailoverGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      failoverGroupName: string,
      options?: FailoverGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, failoverGroupName, options),
  };
}

export function _getFailoverGroupsOperations(context: SqlContext): FailoverGroupsOperations {
  return {
    ..._getFailoverGroups(context),
  };
}

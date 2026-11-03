// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  restart,
  stop,
  start,
  list,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/pools/operations.js";
import type {
  PoolsRestartOptionalParams,
  PoolsStopOptionalParams,
  PoolsStartOptionalParams,
  PoolsListOptionalParams,
  PoolsDeleteOptionalParams,
  PoolsUpdateOptionalParams,
  PoolsCreateOrReplaceOptionalParams,
  PoolsGetOptionalParams,
} from "../../api/pools/options.js";
import type { Pool, PoolCreateOrUpdate, PoolForPatchUpdateUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Pools operations. */
export interface PoolsOperations {
  /** Restarts the PostgreSQL container on all allocated nodes in a ready HorizonDB pool and applies pending dynamic and static parameter changes. This customer-initiated Restart is the only operation that applies static parameter changes or dynamic parameter changes requested with PendingReboot; Stop followed by Start and scheduled maintenance do not apply them. Power operations are supported only at pool scope in this API version; there is no cluster-level restart action. When the pool has no allocated nodes, the operation succeeds without restarting any nodes, pending changes are considered applied, parameterGroup.syncStatus becomes InSync, and the resulting configuration applies to nodes allocated later. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state. */
  restart: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsRestartOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Pool>, Pool>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsRestartOptionalParams,
  ) => Promise<Pool>;
  /** Stops a running HorizonDB pool and deallocates compute. Power operations are supported only at pool scope in this API version; there is no cluster-level stop action. Stop does not apply pending dynamic or static parameter changes; parameterGroup.syncStatus remains PendingReboot. A subsequent Start also preserves those pending changes. The operation succeeds as an idempotent no-op when the pool is already Stopped. It is allowed when the pool has no allocated nodes. The Pool-scoped ReadOnly Endpoint remains discoverable but has no routing destination while the Pool is Stopped. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state. */
  stop: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsStopOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Pool>, Pool>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsStopOptionalParams,
  ) => Promise<Pool>;
  /** Starts a stopped HorizonDB pool. Power operations are supported only at pool scope in this API version; there is no cluster-level start action. Start does not apply pending dynamic or static parameter changes; parameterGroup.syncStatus remains PendingReboot until a customer-initiated Restart. When the pool is already Ready, the operation succeeds as a true idempotent no-op and likewise leaves pending parameter changes pending. The operation is allowed when the pool has no allocated nodes. After the Pool is running, its Pool-scoped ReadOnly Endpoint routes only when at least one allocated node is not currently playing the read-write role. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state. */
  start: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsStartOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Pool>, Pool>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsStartOptionalParams,
  ) => Promise<Pool>;
  /** Lists all HorizonDB pools in a cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: PoolsListOptionalParams,
  ) => PagedAsyncIterableIterator<Pool>;
  /** Deletes a HorizonDB pool together with the Pool-scoped Endpoint whose associatedResourceId identifies that Pool and all FirewallRule children of that Endpoint. The Endpoint cannot outlive or be deleted independently from its Pool. When this is the Cluster's last surviving Pool, the service also disconnects every existing private endpoint connection associated with the Cluster by setting its privateLinkServiceConnectionState.status to Rejected and providing a description that the last Pool was deleted. The HorizonDB private endpoint connection resources remain available for inspection and cleanup, and customer-owned Microsoft.Network/privateEndpoints resources are not deleted. The delete long-running operation completes only after all required private endpoint disconnections have completed. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    properties: PoolForPatchUpdateUpdate,
    options?: PoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    properties: PoolForPatchUpdateUpdate,
    options?: PoolsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Pool>, Pool>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    properties: PoolForPatchUpdateUpdate,
    options?: PoolsUpdateOptionalParams,
  ) => Promise<Pool>;
  /** Creates a new HorizonDB pool or replaces an existing pool, including its node allocation, compute model, high-availability configuration, or associated parameter group. nodeCount and highAvailability.mode are required and have no service defaults. nodeCount must be 1 through 16. Disabled is valid only when nodeCount is 1. AnyZone and ZoneRedundant are valid only when nodeCount is 2 through 16. AnyZone permits same-zone or cross-zone placement, while ZoneRedundant requires nodes to be allocated across availability zones. Node allocation and high-availability reconfiguration are atomic: if all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. A pool name must differ from its parent cluster name because the Cluster-scoped ReadWrite Endpoint is named after the Cluster and the Pool-scoped ReadOnly Endpoint is named after the Pool; the service rejects a request whose names would collide. Creating a pool also creates exactly one service-managed Pool-scoped ReadOnly Endpoint representing that Pool and its network boundary. The Endpoint's associatedResourceId identifies the Pool, and the Endpoint cannot outlive or be deleted independently from it. When the first pool is created, the service automatically designates it to host the cluster's read-write node when an eligible node is available. A Cluster must contain at least one Pool before a private endpoint connection can be created or approved. This API version supports at most one pool per cluster; an attempt to create another pool is rejected with 409 Conflict. parameterGroup, parameterGroupResourceId, and applyMethod are required. When creating a new pool in this API version, parameterGroupResourceId must identify the corresponding default parameter group; a customer-created parameter group is rejected. When replacing an existing pool, the request can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated before the resource is changed. */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    resource: PoolCreateOrUpdate,
    options?: PoolsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    resource: PoolCreateOrUpdate,
    options?: PoolsCreateOrReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Pool>, Pool>>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    resource: PoolCreateOrUpdate,
    options?: PoolsCreateOrReplaceOptionalParams,
  ) => Promise<Pool>;
  /** Gets information about a HorizonDB pool. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: PoolsGetOptionalParams,
  ) => Promise<Pool>;
}

function _getPools(context: HorizonDbContext) {
  return {
    restart: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsRestartOptionalParams,
    ) => restart(context, resourceGroupName, clusterName, poolName, options),
    beginRestart: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, clusterName, poolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, clusterName, poolName, options);
    },
    stop: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsStopOptionalParams,
    ) => stop(context, resourceGroupName, clusterName, poolName, options),
    beginStop: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, clusterName, poolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, clusterName, poolName, options);
    },
    start: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsStartOptionalParams,
    ) => start(context, resourceGroupName, clusterName, poolName, options),
    beginStart: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, clusterName, poolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, clusterName, poolName, options);
    },
    list: (resourceGroupName: string, clusterName: string, options?: PoolsListOptionalParams) =>
      list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, poolName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, poolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, poolName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      properties: PoolForPatchUpdateUpdate,
      options?: PoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, poolName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      properties: PoolForPatchUpdateUpdate,
      options?: PoolsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, poolName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      properties: PoolForPatchUpdateUpdate,
      options?: PoolsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, poolName, properties, options);
    },
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      resource: PoolCreateOrUpdate,
      options?: PoolsCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, clusterName, poolName, resource, options),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      resource: PoolCreateOrUpdate,
      options?: PoolsCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      resource: PoolCreateOrUpdate,
      options?: PoolsCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: PoolsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, poolName, options),
  };
}

export function _getPoolsOperations(context: HorizonDbContext): PoolsOperations {
  return {
    ..._getPools(context),
  };
}

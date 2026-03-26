// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAssociatedResources,
  getPoolUsage,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/ipamPools/operations.js";
import type {
  IpamPoolsListAssociatedResourcesOptionalParams,
  IpamPoolsGetPoolUsageOptionalParams,
  IpamPoolsListOptionalParams,
  IpamPoolsDeleteOptionalParams,
  IpamPoolsUpdateOptionalParams,
  IpamPoolsCreateOptionalParams,
  IpamPoolsGetOptionalParams,
} from "../../api/ipamPools/options.js";
import type {
  IpamPool,
  PoolUsage,
  PoolAssociation,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IpamPools operations. */
export interface IpamPoolsOperations {
  /** List Associated Resource in the Pool. */
  listAssociatedResources: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    options?: IpamPoolsListAssociatedResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<PoolAssociation>;
  /** Get the Pool Usage. */
  getPoolUsage: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    options?: IpamPoolsGetPoolUsageOptionalParams,
  ) => Promise<PoolUsage>;
  /** Gets list of Pool resources at Network Manager level. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: IpamPoolsListOptionalParams,
  ) => PagedAsyncIterableIterator<IpamPool>;
  /** Delete the Pool resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    options?: IpamPoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    options?: IpamPoolsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    options?: IpamPoolsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the specific Pool resource. */
  update: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    options?: IpamPoolsUpdateOptionalParams,
  ) => Promise<IpamPool>;
  /** Creates/Updates the Pool resource. */
  create: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    body: IpamPool,
    options?: IpamPoolsCreateOptionalParams,
  ) => PollerLike<OperationState<IpamPool>, IpamPool>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    body: IpamPool,
    options?: IpamPoolsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IpamPool>, IpamPool>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    body: IpamPool,
    options?: IpamPoolsCreateOptionalParams,
  ) => Promise<IpamPool>;
  /** Gets the specific Pool resource. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    options?: IpamPoolsGetOptionalParams,
  ) => Promise<IpamPool>;
}

function _getIpamPools(context: NetworkManagementContext) {
  return {
    listAssociatedResources: (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      options?: IpamPoolsListAssociatedResourcesOptionalParams,
    ) => listAssociatedResources(context, resourceGroupName, networkManagerName, poolName, options),
    getPoolUsage: (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      options?: IpamPoolsGetPoolUsageOptionalParams,
    ) => getPoolUsage(context, resourceGroupName, networkManagerName, poolName, options),
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: IpamPoolsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      options?: IpamPoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, poolName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      options?: IpamPoolsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkManagerName, poolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      options?: IpamPoolsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkManagerName, poolName, options);
    },
    update: (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      options?: IpamPoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkManagerName, poolName, options),
    create: (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      body: IpamPool,
      options?: IpamPoolsCreateOptionalParams,
    ) => create(context, resourceGroupName, networkManagerName, poolName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      body: IpamPool,
      options?: IpamPoolsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        networkManagerName,
        poolName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      body: IpamPool,
      options?: IpamPoolsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, networkManagerName, poolName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      options?: IpamPoolsGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, poolName, options),
  };
}

export function _getIpamPoolsOperations(context: NetworkManagementContext): IpamPoolsOperations {
  return {
    ..._getIpamPools(context),
  };
}

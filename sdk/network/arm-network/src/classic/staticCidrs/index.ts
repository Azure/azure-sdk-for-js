// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, create, get } from "../../api/staticCidrs/operations.js";
import type {
  StaticCidrsListOptionalParams,
  StaticCidrsDeleteOptionalParams,
  StaticCidrsCreateOptionalParams,
  StaticCidrsGetOptionalParams,
} from "../../api/staticCidrs/options.js";
import type { StaticCidr } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StaticCidrs operations. */
export interface StaticCidrsOperations {
  /** Gets list of Static CIDR resources at Network Manager level. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    options?: StaticCidrsListOptionalParams,
  ) => PagedAsyncIterableIterator<StaticCidr>;
  /** Delete the Static CIDR resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    staticCidrName: string,
    options?: StaticCidrsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    staticCidrName: string,
    options?: StaticCidrsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    staticCidrName: string,
    options?: StaticCidrsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates/Updates the Static CIDR resource. */
  create: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    staticCidrName: string,
    options?: StaticCidrsCreateOptionalParams,
  ) => Promise<StaticCidr>;
  /** Gets the specific Static CIDR resource. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    poolName: string,
    staticCidrName: string,
    options?: StaticCidrsGetOptionalParams,
  ) => Promise<StaticCidr>;
}

function _getStaticCidrs(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      options?: StaticCidrsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, poolName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      staticCidrName: string,
      options?: StaticCidrsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, poolName, staticCidrName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      staticCidrName: string,
      options?: StaticCidrsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkManagerName,
        poolName,
        staticCidrName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      staticCidrName: string,
      options?: StaticCidrsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkManagerName,
        poolName,
        staticCidrName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      staticCidrName: string,
      options?: StaticCidrsCreateOptionalParams,
    ) => create(context, resourceGroupName, networkManagerName, poolName, staticCidrName, options),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      poolName: string,
      staticCidrName: string,
      options?: StaticCidrsGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, poolName, staticCidrName, options),
  };
}

export function _getStaticCidrsOperations(
  context: NetworkManagementContext,
): StaticCidrsOperations {
  return {
    ..._getStaticCidrs(context),
  };
}

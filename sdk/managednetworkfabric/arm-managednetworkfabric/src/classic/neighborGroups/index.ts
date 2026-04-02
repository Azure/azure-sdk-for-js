// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  resync,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/neighborGroups/operations.js";
import type {
  NeighborGroupsResyncOptionalParams,
  NeighborGroupsListBySubscriptionOptionalParams,
  NeighborGroupsListByResourceGroupOptionalParams,
  NeighborGroupsDeleteOptionalParams,
  NeighborGroupsUpdateOptionalParams,
  NeighborGroupsCreateOptionalParams,
  NeighborGroupsGetOptionalParams,
} from "../../api/neighborGroups/options.js";
import type {
  NeighborGroup,
  NeighborGroupPatch,
  NeighborGroupResyncResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NeighborGroups operations. */
export interface NeighborGroupsOperations {
  /** Resync the Neighbor Group after a configuration change. */
  resync: (
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsResyncOptionalParams,
  ) => PollerLike<OperationState<NeighborGroupResyncResponse>, NeighborGroupResyncResponse>;
  /** @deprecated use resync instead */
  beginResync: (
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsResyncOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<NeighborGroupResyncResponse>, NeighborGroupResyncResponse>
  >;
  /** @deprecated use resync instead */
  beginResyncAndWait: (
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsResyncOptionalParams,
  ) => Promise<NeighborGroupResyncResponse>;
  /** Displays NeighborGroups list by subscription GET method. */
  listBySubscription: (
    options?: NeighborGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NeighborGroup>;
  /** Displays NeighborGroups list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NeighborGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NeighborGroup>;
  /** Implements Neighbor Group DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the Neighbor Group. */
  update: (
    resourceGroupName: string,
    neighborGroupName: string,
    body: NeighborGroupPatch,
    options?: NeighborGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<NeighborGroup>, NeighborGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    neighborGroupName: string,
    body: NeighborGroupPatch,
    options?: NeighborGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NeighborGroup>, NeighborGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    neighborGroupName: string,
    body: NeighborGroupPatch,
    options?: NeighborGroupsUpdateOptionalParams,
  ) => Promise<NeighborGroup>;
  /** Implements the Neighbor Group PUT method. */
  create: (
    resourceGroupName: string,
    neighborGroupName: string,
    body: NeighborGroup,
    options?: NeighborGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<NeighborGroup>, NeighborGroup>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    neighborGroupName: string,
    body: NeighborGroup,
    options?: NeighborGroupsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NeighborGroup>, NeighborGroup>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    neighborGroupName: string,
    body: NeighborGroup,
    options?: NeighborGroupsCreateOptionalParams,
  ) => Promise<NeighborGroup>;
  /** Gets the Neighbor Group. */
  get: (
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsGetOptionalParams,
  ) => Promise<NeighborGroup>;
}

function _getNeighborGroups(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    resync: (
      resourceGroupName: string,
      neighborGroupName: string,
      options?: NeighborGroupsResyncOptionalParams,
    ) => resync(context, resourceGroupName, neighborGroupName, options),
    beginResync: async (
      resourceGroupName: string,
      neighborGroupName: string,
      options?: NeighborGroupsResyncOptionalParams,
    ) => {
      const poller = resync(context, resourceGroupName, neighborGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncAndWait: async (
      resourceGroupName: string,
      neighborGroupName: string,
      options?: NeighborGroupsResyncOptionalParams,
    ) => {
      return await resync(context, resourceGroupName, neighborGroupName, options);
    },
    listBySubscription: (options?: NeighborGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NeighborGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      neighborGroupName: string,
      options?: NeighborGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, neighborGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      neighborGroupName: string,
      options?: NeighborGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, neighborGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      neighborGroupName: string,
      options?: NeighborGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, neighborGroupName, options);
    },
    update: (
      resourceGroupName: string,
      neighborGroupName: string,
      body: NeighborGroupPatch,
      options?: NeighborGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, neighborGroupName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      neighborGroupName: string,
      body: NeighborGroupPatch,
      options?: NeighborGroupsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, neighborGroupName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      neighborGroupName: string,
      body: NeighborGroupPatch,
      options?: NeighborGroupsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, neighborGroupName, body, options);
    },
    create: (
      resourceGroupName: string,
      neighborGroupName: string,
      body: NeighborGroup,
      options?: NeighborGroupsCreateOptionalParams,
    ) => create(context, resourceGroupName, neighborGroupName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      neighborGroupName: string,
      body: NeighborGroup,
      options?: NeighborGroupsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, neighborGroupName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      neighborGroupName: string,
      body: NeighborGroup,
      options?: NeighborGroupsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, neighborGroupName, body, options);
    },
    get: (
      resourceGroupName: string,
      neighborGroupName: string,
      options?: NeighborGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, neighborGroupName, options),
  };
}

export function _getNeighborGroupsOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NeighborGroupsOperations {
  return {
    ..._getNeighborGroups(context),
  };
}

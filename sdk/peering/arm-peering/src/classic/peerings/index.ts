// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/peerings/operations.js";
import {
  PeeringsListBySubscriptionOptionalParams,
  PeeringsListByResourceGroupOptionalParams,
  PeeringsDeleteOptionalParams,
  PeeringsUpdateOptionalParams,
  PeeringsCreateOrUpdateOptionalParams,
  PeeringsGetOptionalParams,
} from "../../api/peerings/options.js";
import { Peering, ResourceTags } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Peerings operations. */
export interface PeeringsOperations {
  /** Lists all of the peerings under the given subscription. */
  listBySubscription: (
    options?: PeeringsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Peering>;
  /** Lists all of the peerings under the given subscription and resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PeeringsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Peering>;
  /** Deletes an existing peering with the specified name under the given subscription and resource group. */
  delete: (
    resourceGroupName: string,
    peeringName: string,
    options?: PeeringsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags for a peering with the specified name under the given subscription and resource group. */
  update: (
    resourceGroupName: string,
    peeringName: string,
    tags: ResourceTags,
    options?: PeeringsUpdateOptionalParams,
  ) => Promise<Peering>;
  /** Creates a new peering or updates an existing peering with the specified name under the given subscription and resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    peeringName: string,
    peering: Peering,
    options?: PeeringsCreateOrUpdateOptionalParams,
  ) => Promise<Peering>;
  /** Gets an existing peering with the specified name under the given subscription and resource group. */
  get: (
    resourceGroupName: string,
    peeringName: string,
    options?: PeeringsGetOptionalParams,
  ) => Promise<Peering>;
}

function _getPeerings(context: PeeringManagementContext) {
  return {
    listBySubscription: (options?: PeeringsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PeeringsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      peeringName: string,
      options?: PeeringsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, peeringName, options),
    update: (
      resourceGroupName: string,
      peeringName: string,
      tags: ResourceTags,
      options?: PeeringsUpdateOptionalParams,
    ) => update(context, resourceGroupName, peeringName, tags, options),
    createOrUpdate: (
      resourceGroupName: string,
      peeringName: string,
      peering: Peering,
      options?: PeeringsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, peeringName, peering, options),
    get: (resourceGroupName: string, peeringName: string, options?: PeeringsGetOptionalParams) =>
      get(context, resourceGroupName, peeringName, options),
  };
}

export function _getPeeringsOperations(context: PeeringManagementContext): PeeringsOperations {
  return {
    ..._getPeerings(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscoveryContext } from "../../api/discoveryContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/supercomputers/operations.js";
import type {
  SupercomputersListBySubscriptionOptionalParams,
  SupercomputersListByResourceGroupOptionalParams,
  SupercomputersDeleteOptionalParams,
  SupercomputersUpdateOptionalParams,
  SupercomputersCreateOrUpdateOptionalParams,
  SupercomputersGetOptionalParams,
} from "../../api/supercomputers/options.js";
import type { Supercomputer, SupercomputerUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Supercomputers operations. */
export interface SupercomputersOperations {
  /** List Supercomputer resources by subscription ID */
  listBySubscription: (
    options?: SupercomputersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Supercomputer>;
  /** List Supercomputer resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SupercomputersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Supercomputer>;
  /** Delete a Supercomputer */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    supercomputerName: string,
    options?: SupercomputersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Supercomputer */
  update: (
    resourceGroupName: string,
    supercomputerName: string,
    properties: SupercomputerUpdate,
    options?: SupercomputersUpdateOptionalParams,
  ) => PollerLike<OperationState<Supercomputer>, Supercomputer>;
  /** Create a Supercomputer */
  createOrUpdate: (
    resourceGroupName: string,
    supercomputerName: string,
    resource: Supercomputer,
    options?: SupercomputersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Supercomputer>, Supercomputer>;
  /** Get a Supercomputer */
  get: (
    resourceGroupName: string,
    supercomputerName: string,
    options?: SupercomputersGetOptionalParams,
  ) => Promise<Supercomputer>;
}

function _getSupercomputers(context: DiscoveryContext) {
  return {
    listBySubscription: (options?: SupercomputersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SupercomputersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      supercomputerName: string,
      options?: SupercomputersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, supercomputerName, options),
    update: (
      resourceGroupName: string,
      supercomputerName: string,
      properties: SupercomputerUpdate,
      options?: SupercomputersUpdateOptionalParams,
    ) => update(context, resourceGroupName, supercomputerName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      supercomputerName: string,
      resource: Supercomputer,
      options?: SupercomputersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, supercomputerName, resource, options),
    get: (
      resourceGroupName: string,
      supercomputerName: string,
      options?: SupercomputersGetOptionalParams,
    ) => get(context, resourceGroupName, supercomputerName, options),
  };
}

export function _getSupercomputersOperations(context: DiscoveryContext): SupercomputersOperations {
  return {
    ..._getSupercomputers(context),
  };
}

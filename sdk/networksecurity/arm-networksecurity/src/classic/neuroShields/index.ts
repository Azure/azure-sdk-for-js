// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/neuroShields/operations.js";
import type {
  NeuroShieldsListBySubscriptionOptionalParams,
  NeuroShieldsListByResourceGroupOptionalParams,
  NeuroShieldsDeleteOptionalParams,
  NeuroShieldsUpdateOptionalParams,
  NeuroShieldsCreateOrUpdateOptionalParams,
  NeuroShieldsGetOptionalParams,
} from "../../api/neuroShields/options.js";
import type { NeuroShieldResource, NeuroShieldPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NeuroShields operations. */
export interface NeuroShieldsOperations {
  /** Gets all NeuroShield resources in a subscription. */
  listBySubscription: (
    options?: NeuroShieldsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NeuroShieldResource>;
  /** Gets all NeuroShield resources in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NeuroShieldsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NeuroShieldResource>;
  /** Deletes a NeuroShield resource. */
  delete: (
    resourceGroupName: string,
    neuroShieldName: string,
    options?: NeuroShieldsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the tags or properties of a NeuroShield resource. */
  update: (
    resourceGroupName: string,
    neuroShieldName: string,
    properties: NeuroShieldPatch,
    options?: NeuroShieldsUpdateOptionalParams,
  ) => Promise<NeuroShieldResource>;
  /** Creates or updates a NeuroShield resource. */
  createOrUpdate: (
    resourceGroupName: string,
    neuroShieldName: string,
    resource: NeuroShieldResource,
    options?: NeuroShieldsCreateOrUpdateOptionalParams,
  ) => Promise<NeuroShieldResource>;
  /** Gets a NeuroShield resource. */
  get: (
    resourceGroupName: string,
    neuroShieldName: string,
    options?: NeuroShieldsGetOptionalParams,
  ) => Promise<NeuroShieldResource>;
}

function _getNeuroShields(context: NetworkSecurityManagementContext) {
  return {
    listBySubscription: (options?: NeuroShieldsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NeuroShieldsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      neuroShieldName: string,
      options?: NeuroShieldsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, neuroShieldName, options),
    update: (
      resourceGroupName: string,
      neuroShieldName: string,
      properties: NeuroShieldPatch,
      options?: NeuroShieldsUpdateOptionalParams,
    ) => update(context, resourceGroupName, neuroShieldName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      neuroShieldName: string,
      resource: NeuroShieldResource,
      options?: NeuroShieldsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, neuroShieldName, resource, options),
    get: (
      resourceGroupName: string,
      neuroShieldName: string,
      options?: NeuroShieldsGetOptionalParams,
    ) => get(context, resourceGroupName, neuroShieldName, options),
  };
}

export function _getNeuroShieldsOperations(
  context: NetworkSecurityManagementContext,
): NeuroShieldsOperations {
  return {
    ..._getNeuroShields(context),
  };
}

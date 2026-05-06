// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/racks/operations.js";
import {
  RacksListBySubscriptionOptionalParams,
  RacksListByResourceGroupOptionalParams,
  RacksDeleteOptionalParams,
  RacksUpdateOptionalParams,
  RacksCreateOrUpdateOptionalParams,
  RacksGetOptionalParams,
} from "../../api/racks/options.js";
import { OperationStatusResult, Rack } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Racks operations. */
export interface RacksOperations {
  /** Get a list of racks in the provided subscription. */
  listBySubscription: (
    options?: RacksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Rack>;
  /** Get a list of racks in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: RacksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Rack>;
  /** Delete the provided rack. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
  delete: (
    resourceGroupName: string,
    rackName: string,
    options?: RacksDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Patch properties of the provided rack, or update the tags associated with the rack. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    rackName: string,
    options?: RacksUpdateOptionalParams,
  ) => PollerLike<OperationState<Rack>, Rack>;
  /** Create a new rack or update properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
  createOrUpdate: (
    resourceGroupName: string,
    rackName: string,
    rackParameters: Rack,
    options?: RacksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Rack>, Rack>;
  /** Get properties of the provided rack. */
  get: (
    resourceGroupName: string,
    rackName: string,
    options?: RacksGetOptionalParams,
  ) => Promise<Rack>;
}

function _getRacks(context: NetworkCloudContext) {
  return {
    listBySubscription: (options?: RacksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: RacksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, rackName: string, options?: RacksDeleteOptionalParams) =>
      $delete(context, resourceGroupName, rackName, options),
    update: (resourceGroupName: string, rackName: string, options?: RacksUpdateOptionalParams) =>
      update(context, resourceGroupName, rackName, options),
    createOrUpdate: (
      resourceGroupName: string,
      rackName: string,
      rackParameters: Rack,
      options?: RacksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, rackName, rackParameters, options),
    get: (resourceGroupName: string, rackName: string, options?: RacksGetOptionalParams) =>
      get(context, resourceGroupName, rackName, options),
  };
}

export function _getRacksOperations(context: NetworkCloudContext): RacksOperations {
  return {
    ..._getRacks(context),
  };
}

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
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    rackName: string,
    options?: RacksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    rackName: string,
    options?: RacksDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Patch properties of the provided rack, or update the tags associated with the rack. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    rackName: string,
    options?: RacksUpdateOptionalParams,
  ) => PollerLike<OperationState<Rack>, Rack>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    rackName: string,
    options?: RacksUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Rack>, Rack>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    rackName: string,
    options?: RacksUpdateOptionalParams,
  ) => Promise<Rack>;
  /** Create a new rack or update properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
  createOrUpdate: (
    resourceGroupName: string,
    rackName: string,
    rackParameters: Rack,
    options?: RacksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Rack>, Rack>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    rackName: string,
    rackParameters: Rack,
    options?: RacksCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Rack>, Rack>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    rackName: string,
    rackParameters: Rack,
    options?: RacksCreateOrUpdateOptionalParams,
  ) => Promise<Rack>;
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
    beginDelete: async (
      resourceGroupName: string,
      rackName: string,
      options?: RacksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, rackName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      rackName: string,
      options?: RacksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, rackName, options);
    },
    update: (resourceGroupName: string, rackName: string, options?: RacksUpdateOptionalParams) =>
      update(context, resourceGroupName, rackName, options),
    beginUpdate: async (
      resourceGroupName: string,
      rackName: string,
      options?: RacksUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, rackName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      rackName: string,
      options?: RacksUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, rackName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      rackName: string,
      rackParameters: Rack,
      options?: RacksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, rackName, rackParameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      rackName: string,
      rackParameters: Rack,
      options?: RacksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, rackName, rackParameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      rackName: string,
      rackParameters: Rack,
      options?: RacksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, rackName, rackParameters, options);
    },
    get: (resourceGroupName: string, rackName: string, options?: RacksGetOptionalParams) =>
      get(context, resourceGroupName, rackName, options),
  };
}

export function _getRacksOperations(context: NetworkCloudContext): RacksOperations {
  return {
    ..._getRacks(context),
  };
}

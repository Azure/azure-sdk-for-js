// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  unprepareNetworkPolicies,
  prepareNetworkPolicies,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/subnets/operations.js";
import type {
  SubnetsUnprepareNetworkPoliciesOptionalParams,
  SubnetsPrepareNetworkPoliciesOptionalParams,
  SubnetsListOptionalParams,
  SubnetsDeleteOptionalParams,
  SubnetsCreateOrUpdateOptionalParams,
  SubnetsGetOptionalParams,
} from "../../api/subnets/options.js";
import type {
  Subnet,
  PrepareNetworkPoliciesRequest,
  UnprepareNetworkPoliciesRequest,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Subnets operations. */
export interface SubnetsOperations {
  /** Unprepares a subnet by removing network intent policies. */
  unprepareNetworkPolicies: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest,
    options?: SubnetsUnprepareNetworkPoliciesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use unprepareNetworkPolicies instead */
  beginUnprepareNetworkPolicies: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest,
    options?: SubnetsUnprepareNetworkPoliciesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use unprepareNetworkPolicies instead */
  beginUnprepareNetworkPoliciesAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest,
    options?: SubnetsUnprepareNetworkPoliciesOptionalParams,
  ) => Promise<void>;
  /** Prepares a subnet by applying network intent policies. */
  prepareNetworkPolicies: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest,
    options?: SubnetsPrepareNetworkPoliciesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use prepareNetworkPolicies instead */
  beginPrepareNetworkPolicies: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest,
    options?: SubnetsPrepareNetworkPoliciesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use prepareNetworkPolicies instead */
  beginPrepareNetworkPoliciesAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest,
    options?: SubnetsPrepareNetworkPoliciesOptionalParams,
  ) => Promise<void>;
  /** Gets all subnets in a virtual network. */
  list: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: SubnetsListOptionalParams,
  ) => PagedAsyncIterableIterator<Subnet>;
  /** Deletes the specified subnet. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: SubnetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: SubnetsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: SubnetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a subnet in the specified virtual network. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    subnetParameters: Subnet,
    options?: SubnetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Subnet>, Subnet>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    subnetParameters: Subnet,
    options?: SubnetsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Subnet>, Subnet>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    subnetParameters: Subnet,
    options?: SubnetsCreateOrUpdateOptionalParams,
  ) => Promise<Subnet>;
  /** Gets the specified subnet by virtual network and resource group. */
  get: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: SubnetsGetOptionalParams,
  ) => Promise<Subnet>;
}

function _getSubnets(context: NetworkManagementContext) {
  return {
    unprepareNetworkPolicies: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest,
      options?: SubnetsUnprepareNetworkPoliciesOptionalParams,
    ) =>
      unprepareNetworkPolicies(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        unprepareNetworkPoliciesRequestParameters,
        options,
      ),
    beginUnprepareNetworkPolicies: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest,
      options?: SubnetsUnprepareNetworkPoliciesOptionalParams,
    ) => {
      const poller = unprepareNetworkPolicies(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        unprepareNetworkPoliciesRequestParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUnprepareNetworkPoliciesAndWait: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest,
      options?: SubnetsUnprepareNetworkPoliciesOptionalParams,
    ) => {
      return await unprepareNetworkPolicies(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        unprepareNetworkPoliciesRequestParameters,
        options,
      );
    },
    prepareNetworkPolicies: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest,
      options?: SubnetsPrepareNetworkPoliciesOptionalParams,
    ) =>
      prepareNetworkPolicies(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        prepareNetworkPoliciesRequestParameters,
        options,
      ),
    beginPrepareNetworkPolicies: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest,
      options?: SubnetsPrepareNetworkPoliciesOptionalParams,
    ) => {
      const poller = prepareNetworkPolicies(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        prepareNetworkPoliciesRequestParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPrepareNetworkPoliciesAndWait: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest,
      options?: SubnetsPrepareNetworkPoliciesOptionalParams,
    ) => {
      return await prepareNetworkPolicies(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        prepareNetworkPoliciesRequestParameters,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: SubnetsListOptionalParams,
    ) => list(context, resourceGroupName, virtualNetworkName, options),
    delete: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: SubnetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualNetworkName, subnetName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: SubnetsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualNetworkName, subnetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: SubnetsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualNetworkName, subnetName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      subnetParameters: Subnet,
      options?: SubnetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        subnetParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      subnetParameters: Subnet,
      options?: SubnetsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        subnetParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      subnetParameters: Subnet,
      options?: SubnetsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        subnetParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: SubnetsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualNetworkName, subnetName, options),
  };
}

export function _getSubnetsOperations(context: NetworkManagementContext): SubnetsOperations {
  return {
    ..._getSubnets(context),
  };
}

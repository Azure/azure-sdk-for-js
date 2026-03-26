// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/loadBalancerBackendAddressPools/operations.js";
import type {
  LoadBalancerBackendAddressPoolsListOptionalParams,
  LoadBalancerBackendAddressPoolsDeleteOptionalParams,
  LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams,
  LoadBalancerBackendAddressPoolsGetOptionalParams,
} from "../../api/loadBalancerBackendAddressPools/options.js";
import type { BackendAddressPool } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LoadBalancerBackendAddressPools operations. */
export interface LoadBalancerBackendAddressPoolsOperations {
  /** Gets all the load balancer backed address pools. */
  list: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancerBackendAddressPoolsListOptionalParams,
  ) => PagedAsyncIterableIterator<BackendAddressPool>;
  /** Deletes the specified load balancer backend address pool. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    loadBalancerName: string,
    backendAddressPoolName: string,
    options?: LoadBalancerBackendAddressPoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    loadBalancerName: string,
    backendAddressPoolName: string,
    options?: LoadBalancerBackendAddressPoolsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    loadBalancerName: string,
    backendAddressPoolName: string,
    options?: LoadBalancerBackendAddressPoolsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a load balancer backend address pool. */
  createOrUpdate: (
    resourceGroupName: string,
    loadBalancerName: string,
    backendAddressPoolName: string,
    parameters: BackendAddressPool,
    options?: LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BackendAddressPool>, BackendAddressPool>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    loadBalancerName: string,
    backendAddressPoolName: string,
    parameters: BackendAddressPool,
    options?: LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BackendAddressPool>, BackendAddressPool>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    loadBalancerName: string,
    backendAddressPoolName: string,
    parameters: BackendAddressPool,
    options?: LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams,
  ) => Promise<BackendAddressPool>;
  /** Gets load balancer backend address pool. */
  get: (
    resourceGroupName: string,
    loadBalancerName: string,
    backendAddressPoolName: string,
    options?: LoadBalancerBackendAddressPoolsGetOptionalParams,
  ) => Promise<BackendAddressPool>;
}

function _getLoadBalancerBackendAddressPools(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancerBackendAddressPoolsListOptionalParams,
    ) => list(context, resourceGroupName, loadBalancerName, options),
    delete: (
      resourceGroupName: string,
      loadBalancerName: string,
      backendAddressPoolName: string,
      options?: LoadBalancerBackendAddressPoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, loadBalancerName, backendAddressPoolName, options),
    beginDelete: async (
      resourceGroupName: string,
      loadBalancerName: string,
      backendAddressPoolName: string,
      options?: LoadBalancerBackendAddressPoolsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        loadBalancerName,
        backendAddressPoolName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      loadBalancerName: string,
      backendAddressPoolName: string,
      options?: LoadBalancerBackendAddressPoolsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        loadBalancerName,
        backendAddressPoolName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      loadBalancerName: string,
      backendAddressPoolName: string,
      parameters: BackendAddressPool,
      options?: LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        loadBalancerName,
        backendAddressPoolName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      loadBalancerName: string,
      backendAddressPoolName: string,
      parameters: BackendAddressPool,
      options?: LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        loadBalancerName,
        backendAddressPoolName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      loadBalancerName: string,
      backendAddressPoolName: string,
      parameters: BackendAddressPool,
      options?: LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        loadBalancerName,
        backendAddressPoolName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      loadBalancerName: string,
      backendAddressPoolName: string,
      options?: LoadBalancerBackendAddressPoolsGetOptionalParams,
    ) => get(context, resourceGroupName, loadBalancerName, backendAddressPoolName, options),
  };
}

export function _getLoadBalancerBackendAddressPoolsOperations(
  context: NetworkManagementContext,
): LoadBalancerBackendAddressPoolsOperations {
  return {
    ..._getLoadBalancerBackendAddressPools(context),
  };
}

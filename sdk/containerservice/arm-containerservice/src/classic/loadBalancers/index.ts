// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listByManagedCluster,
  $delete,
  createOrUpdate,
  get,
} from "../../api/loadBalancers/operations.js";
import type {
  LoadBalancersListByManagedClusterOptionalParams,
  LoadBalancersDeleteOptionalParams,
  LoadBalancersCreateOrUpdateOptionalParams,
  LoadBalancersGetOptionalParams,
} from "../../api/loadBalancers/options.js";
import type { LoadBalancer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LoadBalancers operations. */
export interface LoadBalancersOperations {
  /** Gets a list of load balancers in the specified managed cluster. */
  listByManagedCluster: (
    resourceGroupName: string,
    resourceName: string,
    options?: LoadBalancersListByManagedClusterOptionalParams,
  ) => PagedAsyncIterableIterator<LoadBalancer>;
  /** Deletes a load balancer in the specified managed cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    loadBalancerName: string,
    options?: LoadBalancersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    loadBalancerName: string,
    options?: LoadBalancersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    loadBalancerName: string,
    options?: LoadBalancersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a load balancer in the specified managed cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    loadBalancerName: string,
    parameters: LoadBalancer,
    options?: LoadBalancersCreateOrUpdateOptionalParams,
  ) => Promise<LoadBalancer>;
  /** Gets the specified load balancer. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    loadBalancerName: string,
    options?: LoadBalancersGetOptionalParams,
  ) => Promise<LoadBalancer>;
}

function _getLoadBalancers(context: ContainerServiceContext) {
  return {
    listByManagedCluster: (
      resourceGroupName: string,
      resourceName: string,
      options?: LoadBalancersListByManagedClusterOptionalParams,
    ) => listByManagedCluster(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      loadBalancerName: string,
      options?: LoadBalancersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, loadBalancerName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      loadBalancerName: string,
      options?: LoadBalancersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, loadBalancerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      loadBalancerName: string,
      options?: LoadBalancersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, loadBalancerName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      loadBalancerName: string,
      parameters: LoadBalancer,
      options?: LoadBalancersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        loadBalancerName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      resourceName: string,
      loadBalancerName: string,
      options?: LoadBalancersGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, loadBalancerName, options),
  };
}

export function _getLoadBalancersOperations(
  context: ContainerServiceContext,
): LoadBalancersOperations {
  return {
    ..._getLoadBalancers(context),
  };
}

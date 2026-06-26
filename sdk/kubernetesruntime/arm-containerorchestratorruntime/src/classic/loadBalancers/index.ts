// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeContext } from "../../api/kubernetesRuntimeContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/loadBalancers/operations.js";
import {
  LoadBalancersListOptionalParams,
  LoadBalancersDeleteOptionalParams,
  LoadBalancersCreateOrUpdateOptionalParams,
  LoadBalancersGetOptionalParams,
} from "../../api/loadBalancers/options.js";
import { LoadBalancer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LoadBalancers operations. */
export interface LoadBalancersOperations {
  /** List LoadBalancer resources by parent */
  list: (
    resourceUri: string,
    options?: LoadBalancersListOptionalParams,
  ) => PagedAsyncIterableIterator<LoadBalancer>;
  /** Delete a LoadBalancer */
  delete: (
    resourceUri: string,
    loadBalancerName: string,
    options?: LoadBalancersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a LoadBalancer */
  createOrUpdate: (
    resourceUri: string,
    loadBalancerName: string,
    resource: LoadBalancer,
    options?: LoadBalancersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LoadBalancer>, LoadBalancer>;
  /** Get a LoadBalancer */
  get: (
    resourceUri: string,
    loadBalancerName: string,
    options?: LoadBalancersGetOptionalParams,
  ) => Promise<LoadBalancer>;
}

function _getLoadBalancers(context: KubernetesRuntimeContext) {
  return {
    list: (resourceUri: string, options?: LoadBalancersListOptionalParams) =>
      list(context, resourceUri, options),
    delete: (
      resourceUri: string,
      loadBalancerName: string,
      options?: LoadBalancersDeleteOptionalParams,
    ) => $delete(context, resourceUri, loadBalancerName, options),
    createOrUpdate: (
      resourceUri: string,
      loadBalancerName: string,
      resource: LoadBalancer,
      options?: LoadBalancersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, loadBalancerName, resource, options),
    get: (
      resourceUri: string,
      loadBalancerName: string,
      options?: LoadBalancersGetOptionalParams,
    ) => get(context, resourceUri, loadBalancerName, options),
  };
}

export function _getLoadBalancersOperations(
  context: KubernetesRuntimeContext,
): LoadBalancersOperations {
  return {
    ..._getLoadBalancers(context),
  };
}

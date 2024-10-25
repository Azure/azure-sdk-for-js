// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeContext } from "../../api/kubernetesRuntimeContext.js";
import {
  loadBalancersGet,
  loadBalancersCreateOrUpdate,
  loadBalancersDelete,
  loadBalancersList,
} from "../../api/loadBalancers/index.js";
import {
  LoadBalancersGetOptionalParams,
  LoadBalancersCreateOrUpdateOptionalParams,
  LoadBalancersDeleteOptionalParams,
  LoadBalancersListOptionalParams,
} from "../../api/options.js";
import { LoadBalancer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LoadBalancers operations. */
export interface LoadBalancersOperations {
  /** Get a LoadBalancer */
  get: (
    resourceUri: string,
    loadBalancerName: string,
    options?: LoadBalancersGetOptionalParams,
  ) => Promise<LoadBalancer>;
  /** Create a LoadBalancer */
  createOrUpdate: (
    resourceUri: string,
    loadBalancerName: string,
    resource: LoadBalancer,
    options?: LoadBalancersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LoadBalancer>, LoadBalancer>;
  /** Delete a LoadBalancer */
  delete: (
    resourceUri: string,
    loadBalancerName: string,
    options?: LoadBalancersDeleteOptionalParams,
  ) => Promise<void>;
  /** List LoadBalancer resources by parent */
  list: (
    resourceUri: string,
    options?: LoadBalancersListOptionalParams,
  ) => PagedAsyncIterableIterator<LoadBalancer>;
}

export function getLoadBalancers(context: KubernetesRuntimeContext) {
  return {
    get: (
      resourceUri: string,
      loadBalancerName: string,
      options?: LoadBalancersGetOptionalParams,
    ) => loadBalancersGet(context, resourceUri, loadBalancerName, options),
    createOrUpdate: (
      resourceUri: string,
      loadBalancerName: string,
      resource: LoadBalancer,
      options?: LoadBalancersCreateOrUpdateOptionalParams,
    ) =>
      loadBalancersCreateOrUpdate(
        context,
        resourceUri,
        loadBalancerName,
        resource,
        options,
      ),
    delete: (
      resourceUri: string,
      loadBalancerName: string,
      options?: LoadBalancersDeleteOptionalParams,
    ) => loadBalancersDelete(context, resourceUri, loadBalancerName, options),
    list: (resourceUri: string, options?: LoadBalancersListOptionalParams) =>
      loadBalancersList(context, resourceUri, options),
  };
}

export function getLoadBalancersOperations(
  context: KubernetesRuntimeContext,
): LoadBalancersOperations {
  return {
    ...getLoadBalancers(context),
  };
}

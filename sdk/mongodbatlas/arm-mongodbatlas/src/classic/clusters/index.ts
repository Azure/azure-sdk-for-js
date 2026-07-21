// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AtlasContext } from "../../api/atlasContext.js";
import { get, list, $delete, createOrUpdate } from "../../api/clusters/operations.js";
import type {
  ClustersGetOptionalParams,
  ClustersListOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersCreateOrUpdateOptionalParams,
} from "../../api/clusters/options.js";
import type { Cluster } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** Get a Cluster */
  get: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
  /** List Cluster resources by Project */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    options?: ClustersListOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Delete a Cluster */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Cluster */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    clusterName: string,
    resource: Cluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
}

function _getClusters(context: AtlasContext) {
  return {
    get: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      clusterName: string,
      options?: ClustersGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, projectName, clusterName, options),
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      options?: ClustersListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, projectName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, projectName, clusterName, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      clusterName: string,
      resource: Cluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        clusterName,
        resource,
        options,
      ),
  };
}

export function _getClustersOperations(context: AtlasContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}

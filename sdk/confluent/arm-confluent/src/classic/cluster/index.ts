// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import { $delete, createOrUpdate } from "../../api/cluster/operations.js";
import {
  ClusterDeleteOptionalParams,
  ClusterCreateOrUpdateOptionalParams,
} from "../../api/cluster/options.js";
import { SCClusterRecord } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Cluster operations. */
export interface ClusterOperations {
  /** Delete confluent cluster by id */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    options?: ClusterDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create confluent clusters */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    options?: ClusterCreateOrUpdateOptionalParams,
  ) => Promise<SCClusterRecord>;
}

function _getCluster(context: ConfluentManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      options?: ClusterDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, environmentId, clusterId, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      options?: ClusterCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        options,
      ),
  };
}

export function _getClusterOperations(context: ConfluentManagementContext): ClusterOperations {
  return {
    ..._getCluster(context),
  };
}
